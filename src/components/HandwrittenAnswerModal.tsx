import React, { useState, useRef } from "react";
import {
  X,
  Download,
  Printer,
  Check,
  Copy,
  Palette,
  Type,
  Sparkles,
  FileText,
  Play,
  Image as ImageIcon,
  Share2,
} from "lucide-react";
import { RewardedAdModal } from "./RewardedAdModal";

interface HandwrittenAnswerModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  answerText: string;
}

export const HandwrittenAnswerModal: React.FC<HandwrittenAnswerModalProps> = ({
  isOpen,
  onClose,
  question,
  answerText,
}) => {
  const [inkColor, setInkColor] = useState<string>("#1e3a8a"); // Classic Blue Ink
  const [paperStyle, setPaperStyle] = useState<"ruled" | "parchment" | "yellow">("ruled");
  const [fontFamily, setFontFamily] = useState<"handwriting" | "cursive" | "casualhand">("handwriting");
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [copied, setCopied] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // 15-second Ad state
  const [showAdModal, setShowAdModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<"image" | "pdf" | null>(null);

  const noteCardRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${question ? `Q: ${question}\n\n` : ""}${answerText}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Parse lines for handwritten layout
  const rawLines = answerText.split("\n");

  // Pure Canvas Multi-line Exporter for Full HD Image (No truncation)
  const generateAndDownloadCanvas = () => {
    setIsGeneratingImage(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = 1200;
      const paddingX = 90;
      const paddingY = 80;
      const lineHeight = 42;
      const leftMarginX = 140; // Red margin position

      // Select font family for canvas
      let canvasFont = "32px Kalam, cursive, sans-serif";
      if (fontFamily === "cursive") canvasFont = "34px Caveat, cursive, sans-serif";
      if (fontFamily === "casualhand") canvasFont = "30px 'Patrick Hand', cursive, sans-serif";

      ctx.font = canvasFont;

      // Word-wrap all lines to calculate total canvas height
      const printableLines: { text: string; isQuestion?: boolean; isHeader?: boolean; isBullet?: boolean; isAnsPrefix?: boolean }[] = [];

      // Add Question
      if (question) {
        printableLines.push({ text: `Q: ${question}`, isQuestion: true });
        printableLines.push({ text: "" }); // blank line
      }

      // Format Answer Lines
      rawLines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) {
          printableLines.push({ text: "" });
          return;
        }

        const cleanLine = line.replace(/\*\*/g, "");
        const maxWidth = width - leftMarginX - paddingX;

        // Wrap words
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

      // Extra space for Header + Signature Stamp
      const headerHeight = 140;
      const footerHeight = 160;
      const contentHeight = printableLines.length * lineHeight;
      const totalHeight = Math.max(1600, headerHeight + contentHeight + footerHeight + paddingY * 2);

      canvas.width = width;
      canvas.height = totalHeight;

      // Fill Paper Background
      if (paperStyle === "parchment") {
        ctx.fillStyle = "#faf6eb";
      } else if (paperStyle === "yellow") {
        ctx.fillStyle = "#fef9c3";
      } else {
        ctx.fillStyle = "#ffffff";
      }
      ctx.fillRect(0, 0, width, totalHeight);

      // Draw Ruled Lines
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

      // Draw Left Red Double Margin
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

      // Top Header Line
      ctx.strokeStyle = "#f87171";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, headerHeight - 20);
      ctx.lineTo(width, headerHeight - 20);
      ctx.stroke();

      // Draw Header Text
      ctx.fillStyle = "#64748b";
      ctx.font = "bold 24px Kalam, cursive, sans-serif";
      ctx.fillText("SUBJECT: STUDY NOTES", leftMarginX + 25, 75);

      ctx.font = "20px Kalam, cursive, sans-serif";
      ctx.fillText(`DATE: ${currentDate}   |   PAGE: 01`, width - 340, 75);

      // Clean plain paper - No watermark

      // Render Handwritten Text
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

      // Bottom Signature & Verification Stamp
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
      ctx.fillText("Verified by S.S AI Study Guru & Legal Hub", leftMarginX + 25, currentY);

      ctx.font = "bold 32px Caveat, cursive, sans-serif";
      ctx.fillStyle = "#1e3a8a";
      ctx.fillText("Shahid Ahmad Sheikh", width - 360, currentY);

      ctx.font = "16px sans-serif";
      ctx.fillStyle = "#64748b";
      ctx.fillText("Founder & Academic Head", width - 360, currentY + 28);

      // Download Image file
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      const sanitizedName = (question || "Handwritten_Answer")
        .replace(/[^a-zA-Z0-9]/g, "_")
        .substring(0, 30);
      a.download = `${sanitizedName}_SS_AI_Study_Guru.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Canvas export error:", err);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleTriggerAction = (type: "image" | "pdf") => {
    setPendingAction(type);
    setShowAdModal(true);
  };

  const handleAdRewardEarned = () => {
    if (pendingAction === "image") {
      generateAndDownloadCanvas();
    } else if (pendingAction === "pdf") {
      setTimeout(() => {
        window.print();
      }, 300);
    }
    setPendingAction(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      {/* Print Stylesheet for Full Unclipped PDF Export */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-handwritten-note,
          #printable-handwritten-note * {
            visibility: visible !important;
          }
          #printable-handwritten-note {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 24px !important;
            background: white !important;
            color: ${inkColor} !important;
            border: none !important;
            box-shadow: none !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          @page {
            margin: 12mm;
            size: A4 portrait;
          }
        }
      `}</style>

      <div className="bg-slate-900 text-white rounded-3xl max-w-3xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-amber-500/30 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>✍️ Handwritten Notes Studio</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  Full Answer Sheet
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Realistic lined notebook copy format with 100% full answer export
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls Toolbar */}
        <div className="p-3.5 bg-slate-950/40 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-xs">
          {/* Ink Color Selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>Ink:</span>
            </span>
            <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded-xl border border-slate-800">
              {[
                { name: "Blue Ballpoint", color: "#1e3a8a" },
                { name: "Gel Black", color: "#18181b" },
                { name: "Royal Navy", color: "#0369a1" },
                { name: "Exam Red", color: "#b91c1c" },
                { name: "Pencil Graphite", color: "#475569" },
              ].map((c) => (
                <button
                  key={c.color}
                  onClick={() => setInkColor(c.color)}
                  title={c.name}
                  className={`w-5 h-5 rounded-full transition cursor-pointer border ${
                    inkColor === c.color ? "scale-125 border-amber-400 shadow-xs" : "border-slate-700"
                  }`}
                  style={{ backgroundColor: c.color }}
                />
              ))}
            </div>
          </div>

          {/* Paper Type Selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Paper:</span>
            </span>
            <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-xl border border-slate-800">
              {[
                { id: "ruled", label: "Ruled Notebook" },
                { id: "parchment", label: "Parchment" },
                { id: "yellow", label: "Legal Pad" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPaperStyle(p.id as any)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                    paperStyle === p.id
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Font Selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Type className="w-3.5 h-3.5 text-amber-400" />
              <span>Style:</span>
            </span>
            <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-xl border border-slate-800">
              {[
                { id: "handwriting", label: "Kalam (Neat)" },
                { id: "cursive", label: "Caveat (Cursive)" },
                { id: "casualhand", label: "Patrick (Marker)" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFontFamily(f.id as any)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                    fontFamily === f.id
                      ? "bg-slate-700 text-amber-300 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notebook Preview Sheet (Full Length Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950 flex justify-center custom-scrollbar">
          <div
            ref={noteCardRef}
            id="printable-handwritten-note"
            className={`w-full max-w-2xl rounded-2xl shadow-2xl transition-all duration-300 relative select-text border border-slate-300 ${
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
            {/* Left Pink/Red Double Margin Line */}
            <div className="absolute top-0 bottom-0 left-10 sm:left-14 w-[2px] bg-red-400/60 pointer-events-none" />
            <div className="absolute top-0 bottom-0 left-11 sm:left-[59px] w-[1px] bg-red-400/40 pointer-events-none" />

            {/* Notebook Top Header Bar (Date & Page Stamp) */}
            <div className="border-b-2 border-red-300/70 pb-3 pt-4 px-5 sm:px-6 flex items-center justify-between text-xs font-handwriting">
              <div className="pl-8 sm:pl-11 text-slate-500 font-bold tracking-wider">
                SUBJECT: <span style={{ color: inkColor }}>STUDY NOTES</span>
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

            {/* Body Content - Renders ALL Lines without truncation */}
            <div className={`p-6 sm:p-8 pl-14 sm:pl-20 ${getFontClass()} ${getSizeClass()}`}>
              {/* Question */}
              {question && (
                <div className="mb-5 pb-3 border-b border-dashed border-slate-300/80 font-bold leading-relaxed">
                  <span className="text-red-700 mr-2 font-sans font-bold text-sm sm:text-base">
                    Q:
                  </span>
                  <span>{question}</span>
                </div>
              )}

              {/* Answer Content */}
              <div className="space-y-4">
                {rawLines.map((line, idx) => {
                  const trimmed = line.trim();
                  if (!trimmed) return <div key={idx} className="h-4" />;

                  if (trimmed.startsWith("**Answer:**") || trimmed.startsWith("Answer:")) {
                    const ansClean = line.replace(/^\*\*Answer:\*\*\s*|^Answer:\s*/, "");
                    return (
                      <div key={idx} className="font-bold">
                        <span className="underline decoration-wavy decoration-amber-500/80 mr-2 text-amber-900">
                          Ans:
                        </span>
                        <span>{ansClean.replace(/\*\*/g, "")}</span>
                      </div>
                    );
                  }

                  if (trimmed.startsWith("**Explain:**") || trimmed.startsWith("Explain:")) {
                    return (
                      <div key={idx} className="pt-2 font-bold text-red-800 underline">
                        Explanation / Wazahat:
                      </div>
                    );
                  }

                  if (trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("*")) {
                    const bulletContent = line.replace(/^[•\-\*]\s*/, "");
                    return (
                      <div key={idx} className="flex items-start gap-2 pl-2">
                        <span className="select-none font-bold text-slate-600">➢</span>
                        <div className="flex-1">{bulletContent.replace(/\*\*/g, "")}</div>
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
              <div className="mt-10 pt-4 border-t border-slate-300/70 flex items-center justify-between text-xs sm:text-sm font-handwriting">
                <div className="text-slate-500 italic">
                  Verified by S.S AI Study Guru & Legal Hub
                </div>
                <div className="text-right">
                  <div
                    className="font-cursive text-xl sm:text-2xl font-bold"
                    style={{ color: "#1e3a8a" }}
                  >
                    Shahid Ahmad Sheikh
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-sans">
                    Teacher & Founder Signature
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action Buttons with 15-sec Ad triggers */}
        <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied!" : "Copy Text"}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Direct Full HD Image Download */}
            <button
              onClick={() => handleTriggerAction("image")}
              disabled={isGeneratingImage}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <div className="flex items-center gap-1">
                <Play className="w-3 h-3 fill-current" />
                <span className="text-[9px] px-1 py-0.2 rounded bg-slate-950 text-amber-300 font-bold">
                  15s Ad
                </span>
              </div>
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{isGeneratingImage ? "Saving HD Image..." : "Download Full HD Image (.PNG)"}</span>
            </button>

            {/* Print / Save PDF */}
            <button
              onClick={() => handleTriggerAction("pdf")}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95"
            >
              <div className="flex items-center gap-1">
                <Play className="w-3 h-3 fill-current" />
                <span className="text-[9px] px-1 py-0.2 rounded bg-slate-950 text-amber-300 font-bold">
                  15s Ad
                </span>
              </div>
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save Full PDF</span>
            </button>

            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* 15-Second Sponsored Ad Player Modal */}
      <RewardedAdModal
        isOpen={showAdModal}
        onClose={() => setShowAdModal(false)}
        durationSeconds={15}
        rewardTitle="Handwritten Student Sheet Unlocked"
        description="Please watch this 15-second sponsored ad to download your complete, unclipped handwritten answer sheet in full HD quality."
        onRewardEarned={handleAdRewardEarned}
      />
    </div>
  );
};

export default HandwrittenAnswerModal;
