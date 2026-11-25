import React, { useRef, useState, useEffect } from "react";
import {
  Edit3,
  Trash2,
  Download,
  Printer,
  Sparkles,
  Palette,
  Type,
  FileText,
  Copy,
  Check,
  Play,
  Image as ImageIcon,
  BookOpen,
  PenTool,
  RotateCcw,
} from "lucide-react";
import { RewardedAdModal } from "./RewardedAdModal";
import { Capacitor } from "@capacitor/core";
import { nativeAdMob } from "../services/admobService";

export const HandwrittenNotes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"textToHandwriting" | "touchCanvas">("textToHandwriting");

  // Mode 1: Text to Handwriting States
  const [subjectTitle, setSubjectTitle] = useState<string>("");
  const [studentQuestion, setStudentQuestion] = useState<string>(
    "Explain Newton's Three Laws of Motion with real-world examples."
  );
  const [studentAnswer, setStudentAnswer] = useState<string>(
    `**Answer:**\nNewton's Laws of Motion describe the relationship between the forces acting on a body and its motion.\n\n1. First Law (Law of Inertia):\nAn object remains at rest or in uniform motion unless acted upon by an external net force.\n• Example: A book resting on a table stays at rest until pushed.\n\n2. Second Law (F = ma):\nThe acceleration of an object is directly proportional to the net force applied and inversely proportional to its mass.\n• Formula: Force = Mass × Acceleration (F = m · a)\n\n3. Third Law (Action & Reaction):\nFor every action, there is an equal and opposite reaction.\n• Example: When swimming, pushing water backward propels you forward.`
  );
  const [inkColor, setInkColor] = useState<string>("#1e3a8a"); // Classic Blue
  const [paperStyle, setPaperStyle] = useState<"ruled" | "parchment" | "yellow">("ruled");
  const [fontFamily, setFontFamily] = useState<"handwriting" | "cursive" | "casualhand">("handwriting");
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [copied, setCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Mode 2: Touch Freehand Canvas States
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasColor, setCanvasColor] = useState("#1e3a8a");
  const [lineWidth, setLineWidth] = useState(3);

  // 15-second Ad Modal state
  const [showAdModal, setShowAdModal] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<"png" | "pdf" | "canvasPng" | null>(null);

  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const getFontClass = () => {
    if (fontFamily === "cursive") return "font-cursive";
    if (fontFamily === "casualhand") return "font-casualhand";
    return "font-handwriting";
  };

  const getSizeClass = () => {
    if (fontSize === "sm") return "text-base sm:text-lg leading-loose";
    if (fontSize === "lg") return "text-xl sm:text-2xl leading-loose";
    return "text-lg sm:text-xl leading-loose";
  };

  // Sample quick templates
  const sampleTopics = [
    {
      label: "Physics: Newton's Laws",
      q: "Explain Newton's Three Laws of Motion with real-world examples.",
      a: `**Answer:**\nNewton's Laws describe how forces dictate the motion of objects:\n\n1. First Law (Law of Inertia):\nAn object continues in its state of rest or uniform motion unless acted upon by an external net force.\n\n2. Second Law (F = ma):\nThe acceleration of an object is directly proportional to force and inversely to mass.\n• Equation: F = m × a\n\n3. Third Law (Action = Reaction):\nEvery action has an equal and opposite reaction. (e.g. Rocket propulsion, swimming).`,
    },
    {
      label: "Chemistry: Photosynthesis",
      q: "What is Photosynthesis? Write its balanced chemical equation.",
      a: `**Answer:**\nPhotosynthesis is the biological process by which green plants synthesize glucose using sunlight, water, and carbon dioxide.\n\n• Chemical Equation:\n6CO₂ + 6H₂O + Sunlight ➔ C₆H₁₂O₆ + 6O₂\n\n• Key Stages:\n1. Light Reaction (Thylakoids - ATP generation)\n2. Dark Reaction / Calvin Cycle (Stroma - Glucose synthesis)`,
    },
    {
      label: "Law: Stay Order (CPC O-39)",
      q: "What are the three cardinal principles for grant of Temporary Injunction under Order 39 Rule 1 & 2 CPC?",
      a: `**Answer:**\nThe Hon'ble Court grants ad-interim injunction based on three essential golden rules:\n\n1. Prima Facie Case:\nThe plaintiff must show a bona fide substantial question requiring trial.\n\n2. Balance of Convenience:\nThe comparative mischief or inconvenience to the plaintiff in case of refusal outweighs the defendant's.\n\n3. Irreparable Loss & Injury:\nRefusal of injunction would cause injury that cannot be adequately compensated in monetary terms.`,
    },
    {
      label: "J&K History: Kalhana's Rajatarangini",
      q: "Write a short note on Rajatarangini and its historical significance for Kashmir.",
      a: `**Answer:**\nRajatarangini ('The River of Kings') is an epic historical Sanskrit chronicle composed by Pandit Kalhana in 1148–1149 CE.\n\n• Significance:\n1. Considered the first authentic chronological history of India.\n2. Provides vivid accounts of Kashmir's kings, administration, geography, and culture.\n3. Emphasizes impartiality and factual historical documentation.`,
    },
  ];

  // Canvas Drawing Logic for Touch Mode
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.strokeStyle = canvasColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearTouchCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw light ruling lines
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    for (let y = 40; y < canvas.height; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  };

  useEffect(() => {
    if (activeTab === "touchCanvas") {
      clearTouchCanvas();
    }
  }, [activeTab]);

  // Full HD PNG Exporter using High-DPI Canvas
  const exportTextToHandwritingCanvas = () => {
    setIsGenerating(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = 1200;
      const paddingX = 90;
      const paddingY = 80;
      const lineHeight = 42;
      const leftMarginX = 140;

      let canvasFont = "32px Kalam, cursive, sans-serif";
      if (fontFamily === "cursive") canvasFont = "34px Caveat, cursive, sans-serif";
      if (fontFamily === "casualhand") canvasFont = "30px 'Patrick Hand', cursive, sans-serif";

      ctx.font = canvasFont;

      const rawLines = studentAnswer.split("\n");
      const printableLines: { text: string; isQuestion?: boolean; isHeader?: boolean; isBullet?: boolean }[] = [];

      if (studentQuestion) {
        printableLines.push({ text: `Q: ${studentQuestion}`, isQuestion: true });
        printableLines.push({ text: "" });
      }

      rawLines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) {
          printableLines.push({ text: "" });
          return;
        }

        const cleanLine = line.replace(/\*\*/g, "");
        const maxWidth = width - leftMarginX - paddingX;
        const words = cleanLine.split(" ");
        let currentLine = "";

        for (let i = 0; i < words.length; i++) {
          const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && i > 0) {
            printableLines.push({
              text: currentLine,
              isHeader: trimmed.startsWith("**") || trimmed.startsWith("Answer:"),
              isBullet: trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("*"),
            });
            currentLine = words[i];
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) {
          printableLines.push({
            text: currentLine,
            isHeader: trimmed.startsWith("**") || trimmed.startsWith("Answer:"),
            isBullet: trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("*"),
          });
        }
      });

      const headerHeight = 140;
      const footerHeight = 160;
      const contentHeight = printableLines.length * lineHeight;
      const totalHeight = Math.max(1500, headerHeight + contentHeight + footerHeight + paddingY * 2);

      canvas.width = width;
      canvas.height = totalHeight;

      // Background Paper
      if (paperStyle === "parchment") {
        ctx.fillStyle = "#faf6eb";
      } else if (paperStyle === "yellow") {
        ctx.fillStyle = "#fef9c3";
      } else {
        ctx.fillStyle = "#ffffff";
      }
      ctx.fillRect(0, 0, width, totalHeight);

      // Ruled Lines
      if (paperStyle === "ruled" || paperStyle === "yellow") {
        ctx.strokeStyle = paperStyle === "yellow" ? "#fde047" : "#e2e8f0";
        ctx.lineWidth = 1.5;
        for (let y = headerHeight; y < totalHeight - 60; y += 36) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // Red Double Margin
      ctx.strokeStyle = "#f87171";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(leftMarginX, 0);
      ctx.lineTo(leftMarginX, totalHeight);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(leftMarginX + 4, 0);
      ctx.lineTo(leftMarginX + 4, totalHeight);
      ctx.stroke();

      // Top Header
      ctx.strokeStyle = "#f87171";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, headerHeight - 20);
      ctx.lineTo(width, headerHeight - 20);
      ctx.stroke();

      ctx.fillStyle = "#64748b";
      ctx.font = "bold 24px Kalam, cursive, sans-serif";
      ctx.fillText(`SUBJECT: ${subjectTitle || "S.S AI STUDY GURU"}`, leftMarginX + 25, 75);

      ctx.font = "20px Kalam, cursive, sans-serif";
      ctx.fillText(`DATE: ${currentDate}   |   PAGE: 01`, width - 340, 75);

      // Clean plain paper - No watermark

      // Text Render
      let currentY = headerHeight + 30;
      printableLines.forEach((pLine) => {
        if (pLine.isQuestion) {
          ctx.font = "bold 34px Kalam, cursive, sans-serif";
          ctx.fillStyle = "#991b1b";
          ctx.fillText(pLine.text, leftMarginX + 25, currentY);
        } else {
          ctx.font = canvasFont;
          ctx.fillStyle = inkColor;
          const textX = pLine.isBullet ? leftMarginX + 45 : leftMarginX + 25;
          ctx.fillText(pLine.text, textX, currentY);
        }
        currentY += lineHeight;
      });

      // Signature Stamp
      currentY += 40;
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(leftMarginX + 20, currentY);
      ctx.lineTo(width - 60, currentY);
      ctx.stroke();

      currentY += 40;
      ctx.font = "italic 22px Kalam, cursive, sans-serif";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("Verified Academic Copy • S.S AI Study Guru", leftMarginX + 25, currentY);

      ctx.font = "bold 32px Caveat, cursive, sans-serif";
      ctx.fillStyle = "#1e3a8a";
      ctx.fillText("Shahid Ahmad Sheikh", width - 360, currentY);

      ctx.font = "16px sans-serif";
      ctx.fillStyle = "#64748b";
      ctx.fillText("Founder & Academic Head", width - 360, currentY + 28);

      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      const sanitizedName = (studentQuestion || "Handwritten_Assignment")
        .replace(/[^a-zA-Z0-9]/g, "_")
        .substring(0, 30);
      a.download = `${sanitizedName}_SS_AI_Study_Guru.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportTouchCanvasPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "Touch_Handwritten_Slate_SS_AI.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const executeDownloadAction = (action: "png" | "pdf" | "canvasPng") => {
    if (action === "png") {
      exportTextToHandwritingCanvas();
    } else if (action === "pdf") {
      setTimeout(() => {
        window.print();
      }, 300);
    } else if (action === "canvasPng") {
      exportTouchCanvasPng();
    }
    setPendingAction(null);
  };

  const handleTriggerDownload = async (action: "png" | "pdf" | "canvasPng") => {
    setPendingAction(action);
    // If running inside native Android App (Capacitor), trigger real AdMob rewarded video
    if (Capacitor.isNativePlatform()) {
      try {
        const adShown = await nativeAdMob.showRewardVideo(() => {
          executeDownloadAction(action);
        });
        if (adShown) return;
      } catch (err) {
        console.warn("[AdMob] Native rewarded ad failed, falling back to modal", err);
      }
    }
    // Web or native fallback
    setShowAdModal(true);
  };

  const handleAdRewardEarned = () => {
    if (pendingAction) {
      executeDownloadAction(pendingAction);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(`Q: ${studentQuestion}\n\n${studentAnswer}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 shadow-md shadow-amber-500/20">
            <Edit3 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-slate-900 text-base sm:text-lg">
                Handwritten Notes & Assignment Studio
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
                School/College HD Sheet
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Convert typed text/AI answers into realistic notebook handwriting copy or draw on touch slate.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("textToHandwriting")}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "textToHandwriting"
                ? "bg-slate-950 text-amber-400 shadow-xs"
                : "text-slate-600 hover:text-slate-950"
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>Text ➔ Handwritten Sheet</span>
          </button>

          <button
            onClick={() => setActiveTab("touchCanvas")}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "touchCanvas"
                ? "bg-slate-950 text-amber-400 shadow-xs"
                : "text-slate-600 hover:text-slate-950"
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Touch Slate (Drawing)</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Text to Handwritten Sheet */}
      {activeTab === "textToHandwriting" && (
        <div className="space-y-6">
          {/* Quick Topics Carousel */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
              <span>Quick Sample Homework Topics:</span>
              <span className="text-[11px] text-amber-600">Click to Auto-Fill</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {sampleTopics.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setStudentQuestion(topic.q);
                    setStudentAnswer(topic.a);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold whitespace-nowrap transition cursor-pointer"
                >
                  ✨ {topic.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Controls & Input (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 text-white space-y-3.5 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Assignment Content</span>
                  </h4>
                </div>

                {/* Subject Header */}
                <div>
                  <label className="text-[10px] font-semibold text-slate-400 block mb-1">
                    Subject & Heading:
                  </label>
                  <input
                    type="text"
                    value={subjectTitle}
                    onChange={(e) => setSubjectTitle(e.target.value)}
                    placeholder="e.g. Physics / Mathematics / English (Optional)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:border-amber-400 outline-hidden font-bold"
                  />
                </div>

                {/* Question */}
                <div>
                  <label className="text-[10px] font-semibold text-rose-300 block mb-1">
                    Question (Heading):
                  </label>
                  <input
                    type="text"
                    value={studentQuestion}
                    onChange={(e) => setStudentQuestion(e.target.value)}
                    placeholder="e.g. What is Photosynthesis?"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:border-amber-400 outline-hidden font-medium"
                  />
                </div>

                {/* Answer Content */}
                <div>
                  <label className="text-[10px] font-semibold text-amber-300 block mb-1">
                    Answer / Notes Body Text:
                  </label>
                  <textarea
                    rows={8}
                    value={studentAnswer}
                    onChange={(e) => setStudentAnswer(e.target.value)}
                    placeholder="Type or paste notes to transform into handwriting..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:border-amber-400 outline-hidden font-sans leading-relaxed custom-scrollbar"
                  />
                </div>
              </div>

              {/* Handwriting Customization Options */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="text-xs font-bold text-slate-900">Style & Ink Customization:</div>

                {/* Ink Color */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-medium flex items-center gap-1">
                    <Palette className="w-3.5 h-3.5 text-amber-500" />
                    <span>Ink Color:</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[
                      { name: "Blue Ballpoint", color: "#1e3a8a" },
                      { name: "Gel Black", color: "#18181b" },
                      { name: "Royal Navy", color: "#0369a1" },
                      { name: "Red Pen", color: "#b91c1c" },
                      { name: "Pencil Grey", color: "#475569" },
                    ].map((c) => (
                      <button
                        key={c.color}
                        onClick={() => setInkColor(c.color)}
                        title={c.name}
                        className={`w-6 h-6 rounded-full border-2 transition cursor-pointer ${
                          inkColor === c.color ? "scale-125 border-amber-500 shadow-sm" : "border-slate-300"
                        }`}
                        style={{ backgroundColor: c.color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Paper Texture */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-medium flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    <span>Paper:</span>
                  </span>
                  <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200">
                    {[
                      { id: "ruled", label: "Ruled Copy" },
                      { id: "parchment", label: "Parchment" },
                      { id: "yellow", label: "Legal Pad" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPaperStyle(p.id as any)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          paperStyle === p.id
                            ? "bg-slate-950 text-amber-400 font-bold"
                            : "text-slate-600 hover:text-slate-950"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Handwriting Font */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-medium flex items-center gap-1">
                    <Type className="w-3.5 h-3.5 text-amber-500" />
                    <span>Handwriting:</span>
                  </span>
                  <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200">
                    {[
                      { id: "handwriting", label: "Kalam (Neat)" },
                      { id: "cursive", label: "Caveat (Cursive)" },
                      { id: "casualhand", label: "Patrick" },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFontFamily(f.id as any)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          fontFamily === f.id
                            ? "bg-amber-500 text-slate-950 font-bold"
                            : "text-slate-600 hover:text-slate-950"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Live Notebook Preview & Download Box (7 Cols) */}
            <div className="lg:col-span-7 space-y-3 flex flex-col">
              {/* Action Toolbar */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Real-Time Notebook Preview</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTriggerDownload("png")}
                    disabled={isGenerating}
                    className="px-3 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    <div className="flex items-center gap-1">
                      <Play className="w-3 h-3 fill-current" />
                      <span className="text-[9px] px-1 py-0.2 rounded bg-slate-950 text-amber-300 font-bold">
                        15s Ad
                      </span>
                    </div>
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Download Full HD PNG</span>
                  </button>

                  <button
                    onClick={() => handleTriggerDownload("pdf")}
                    className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95"
                  >
                    <div className="flex items-center gap-1">
                      <Play className="w-3 h-3 fill-current" />
                      <span className="text-[9px] px-1 py-0.2 rounded bg-slate-950 text-amber-300 font-bold">
                        15s Ad
                      </span>
                    </div>
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print PDF</span>
                  </button>

                  <button
                    onClick={handleCopyText}
                    className="px-2.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Notebook Paper Sheet */}
              <div className="flex-1 bg-slate-950 p-3 sm:p-5 rounded-3xl border border-slate-800 flex justify-center max-h-[580px] overflow-y-auto custom-scrollbar shadow-inner">
                <div
                  className={`w-full rounded-2xl shadow-xl transition-all duration-300 relative select-text border border-slate-300 ${
                    paperStyle === "parchment"
                      ? "bg-[#faf6eb]"
                      : paperStyle === "yellow"
                      ? "bg-[#fef9c3]"
                      : "bg-white"
                  }`}
                  style={{
                    backgroundImage:
                      paperStyle === "ruled"
                        ? "repeating-linear-gradient(transparent, transparent 31px, #e2e8f0 31px, #e2e8f0 32px)"
                        : paperStyle === "yellow"
                        ? "repeating-linear-gradient(transparent, transparent 31px, #fde047 31px, #fde047 32px)"
                        : "none",
                    color: inkColor,
                  }}
                >
                  {/* Left Red Double Margin */}
                  <div className="absolute top-0 bottom-0 left-10 sm:left-14 w-[2px] bg-red-400/60 pointer-events-none" />
                  <div className="absolute top-0 bottom-0 left-11 sm:left-[59px] w-[1px] bg-red-400/40 pointer-events-none" />

                  {/* Header Date / Page */}
                  <div className="border-b-2 border-red-300/70 pb-3 pt-4 px-5 sm:px-6 flex items-center justify-between text-xs font-handwriting">
                    <div className="pl-8 sm:pl-11 text-slate-500 font-bold tracking-wider">
                      SUBJECT: <span style={{ color: inkColor }}>{subjectTitle || "STUDY NOTES"}</span>
                    </div>
                    <div className="flex items-center gap-3 border border-slate-300 rounded-lg px-2.5 py-1 bg-white/80 shadow-2xs">
                      <span className="text-slate-500">
                        DATE: <strong style={{ color: inkColor }}>{currentDate}</strong>
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="text-slate-500">
                        PAGE: <strong style={{ color: inkColor }}>01</strong>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className={`p-6 sm:p-8 pl-14 sm:pl-20 ${getFontClass()} ${getSizeClass()}`}>
                    {studentQuestion && (
                      <div className="mb-4 pb-2 border-b border-dashed border-slate-300/80 font-bold">
                        <span className="text-red-700 mr-2 font-sans font-bold text-sm">Q:</span>
                        <span>{studentQuestion}</span>
                      </div>
                    )}

                    <div className="space-y-3">
                      {studentAnswer.split("\n").map((line, idx) => {
                        const trimmed = line.trim();
                        if (!trimmed) return <div key={idx} className="h-3" />;

                        if (trimmed.startsWith("**Answer:**") || trimmed.startsWith("Answer:")) {
                          return (
                            <div key={idx} className="font-bold">
                              <span className="underline decoration-wavy decoration-amber-500 mr-2 text-amber-900">
                                Ans:
                              </span>
                              <span>{line.replace(/^\*\*Answer:\*\*\s*|^Answer:\s*/, "").replace(/\*\*/g, "")}</span>
                            </div>
                          );
                        }

                        if (trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("*")) {
                          return (
                            <div key={idx} className="flex items-start gap-2 pl-2">
                              <span className="select-none font-bold text-slate-600">➢</span>
                              <div className="flex-1">{line.replace(/^[•\-\*]\s*/, "").replace(/\*\*/g, "")}</div>
                            </div>
                          );
                        }

                        return (
                          <div key={idx} className="leading-relaxed">
                            {line.replace(/\*\*/g, "")}
                          </div>
                        );
                      })}
                    </div>

                    {/* Teacher Signature Stamp */}
                    <div className="mt-8 pt-4 border-t border-slate-300/70 flex items-center justify-between text-xs font-handwriting">
                      <div className="text-slate-500 italic">
                        Verified by S.S AI Study Guru & Legal Hub
                      </div>
                      <div className="text-right">
                        <div className="font-cursive text-xl font-bold" style={{ color: "#1e3a8a" }}>
                          Shahid Ahmad Sheikh
                        </div>
                        <div className="text-[9px] text-slate-500 uppercase tracking-wider font-sans">
                          Founder Signature
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Touch Freehand Canvas Slate */}
      {activeTab === "touchCanvas" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Pen Ink:</span>
              {["#1e3a8a", "#18181b", "#dc2626", "#16a34a", "#d97706", "#7c3aed"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCanvasColor(c)}
                  className={`w-6 h-6 rounded-full border-2 transition cursor-pointer ${
                    canvasColor === c ? "scale-125 border-slate-900 shadow-xs" : "border-white"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Pen Thickness:</span>
              <input
                type="range"
                min={1}
                max={12}
                value={lineWidth}
                onChange={(e) => setLineWidth(parseInt(e.target.value))}
                className="w-24 accent-amber-600 cursor-pointer"
              />
              <span className="font-mono text-slate-500 text-xs">{lineWidth}px</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearTouchCanvas}
                className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
                <span>Clear Slate</span>
              </button>

              <button
                onClick={() => handleTriggerDownload("canvasPng")}
                className="px-3.5 py-1.5 bg-slate-950 text-amber-400 rounded-xl font-bold hover:bg-slate-900 transition flex items-center gap-1.5 cursor-pointer"
              >
                <div className="flex items-center gap-1">
                  <Play className="w-3 h-3 fill-current" />
                  <span className="text-[9px] px-1 py-0.2 rounded bg-amber-400 text-slate-950 font-black">
                    15s Ad
                  </span>
                </div>
                <Download className="w-3.5 h-3.5" />
                <span>Save Drawing PNG</span>
              </button>
            </div>
          </div>

          <div className="border-2 border-slate-300 rounded-3xl overflow-hidden bg-white shadow-inner flex justify-center">
            <canvas
              ref={canvasRef}
              width={900}
              height={500}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="cursor-crosshair w-full max-w-full touch-none"
            />
          </div>
        </div>
      )}

      {/* 15-Second Sponsored Ad Modal */}
      <RewardedAdModal
        isOpen={showAdModal}
        onClose={() => setShowAdModal(false)}
        durationSeconds={15}
        rewardTitle="Handwritten Copy Download Verification"
        description="Please watch this 15-second sponsored video to generate and download your full HD handwritten student copy."
        onRewardEarned={handleAdRewardEarned}
      />
    </div>
  );
};

export default HandwrittenNotes;
