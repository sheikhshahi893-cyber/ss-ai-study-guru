import React, { useState, useRef } from "react";
import {
  Zap,
  Sparkles,
  Share2,
  Copy,
  Check,
  Printer,
  BookOpen,
  AlertTriangle,
  HelpCircle,
  Calculator,
  Search,
  RefreshCw,
} from "lucide-react";
import { tryHybridCheatSheet } from "../services/hybridAiService";
import { getFallbackAnswer } from "../utils/aiEngine";

interface GuaranteedQuestion {
  question: string;
  highYieldAnswer: string;
  marksWeightage: string;
}

interface FormulaItem {
  name: string;
  formula: string;
  variables: string;
  tip: string;
}

interface ExaminerTrap {
  trap: string;
  howToAvoid: string;
}

interface CheatSheetData {
  topicTitle: string;
  quickSummary: string;
  guaranteedQuestions: GuaranteedQuestion[];
  formulaVault: FormulaItem[];
  examinerTraps: ExaminerTrap[];
  oneLineMemoryTrick: string;
  disclaimer: string;
}

const QUICK_QUESTIONS = [
  { label: "Ohm's Law (V = IR)", query: "What is Ohm's Law and its formula?" },
  { label: "Light & Mirrors", query: "Class 10 Physics - Light Reflection and Mirrors" },
  { label: "Photosynthesis", query: "What is Photosynthesis? Write equation and steps." },
  { label: "Newton's Laws", query: "Explain Newton's 3 Laws of Motion" },
  { label: "Indian Constitution", query: "Indian Constitution Fundamental Rights & Articles" },
];

export const CheatSheetStudio: React.FC<{
  currentLang?: string;
  onClose?: () => void;
}> = ({ currentLang = "hinglish" }) => {
  const [topicInput, setTopicInput] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("Class 10 Board");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const [sheet, setSheet] = useState<CheatSheetData>({
    topicTitle: "Light: Reflection & Refraction (Class 10 Physics)",
    quickSummary:
      "1. Reflection: Angle of incidence (i) is always equal to Angle of reflection (r).\n" +
      "2. Concave vs Convex: Concave mirror light ko ikattha (converge) karta hai; Convex mirror failata (diverge) hai aur rear-view mirror mein use hota hai.\n" +
      "3. Refraction: Jab light ek medium se doosre mein jaati hai toh bend hoti hai (Snell's Law: n = sin i / sin r).",
    guaranteedQuestions: [
      {
        question: "Why do we prefer a Convex Mirror as a rear-view mirror in vehicles?",
        highYieldAnswer:
          "• It always forms a virtual, erect (seedhi), and diminished image.\n" +
          "• It curves outwards, giving a much wider field of view to see traffic behind safely.",
        marksWeightage: "2–3 Marks",
      },
      {
        question: "State the nature of image when object is between Focus (F) and Pole (P) of a Concave Mirror.",
        highYieldAnswer:
          "• Image is Virtual, Erect, and Enlarged.\n" +
          "• Position: Behind the mirror (used by dentists and in shaving mirrors).",
        marksWeightage: "3 Marks",
      },
    ],
    formulaVault: [
      {
        name: "Mirror Formula",
        formula: "1/f = 1/v + 1/u",
        variables: "f = focal length, v = image distance, u = object distance",
        tip: "u is always negative (-). For concave mirror, f is negative (-).",
      },
      {
        name: "Magnification (m)",
        formula: "m = h'/h = -v/u",
        variables: "h' = image height, h = object height",
        tip: "Negative m = Real & Inverted. Positive m = Virtual & Erect.",
      },
    ],
    examinerTraps: [
      {
        trap: "Sign error in u, v, f numericals",
        howToAvoid:
          "Put brackets around negative signs like 1/(-15) - 1/(-30) and never confuse Mirror (+ sign) with Lens (- sign).",
      },
    ],
    oneLineMemoryTrick:
      "V-E-D for Convex Mirror (Virtual, Erect, Diminished) & R-I for Real, Inverted!",
    disclaimer: "S.S AI Study Guru • 5-Minute Revision Sheet",
  });

  const printAreaRef = useRef<HTMLDivElement>(null);

  const buildOfflineCheatSheet = (queryText: string, grade: string): CheatSheetData => {
    const cleanQuery = queryText.trim();
    const lower = cleanQuery.toLowerCase();

    const isPhysics =
      /\b(physics|ohm|volt|current|resistance|newton|motion|gravity|force|light|mirror|lens|refraction|reflection|electricity|magnet|thermodynamics|energy|power|wave|sound|coulomb|faraday|kirchhoff)\b/i.test(lower);
    const isChemistry =
      /\b(chemistry|chemical|atom|molecule|acid|base|reaction|oxidation|reduction|covalent|ionic|bond|valency|hydrocarbon|periodic)\b/i.test(lower);
    const isBiology =
      /\b(biology|cell|mitochondria|photosynthesis|respiration|dna|rna|gene|heart|plant|enzyme|chlorophyll)\b/i.test(lower);
    const isMath =
      /\b(math|algebra|geometry|trigonometry|calculus|derivative|integration|matrix|probability|quadratic|pythagoras|triangle|circle|theorem|equation)\b/i.test(lower);
    const isHistory =
      /\b(history|mughal|gandhi|1857|independence|constitution|article|fundamental rights|parliament|civics|polity|jkssb)\b/i.test(lower);
    const isGenuineLaw =
      grade.toLowerCase().includes("law") ||
      /\b(bns|bnss|ipc|crpc|cpc|section\s+\d+|bail|fir|affidavit|injunction|stay order|jurisdiction|court)\b/i.test(lower);

    const detectedLabel = isPhysics
      ? "Physics"
      : isChemistry
      ? "Chemistry"
      : isBiology
      ? "Biology"
      : isMath
      ? "Mathematics"
      : isHistory
      ? "History & Polity"
      : isGenuineLaw
      ? "Law & Legal"
      : grade;

    const knowledgeText = getFallbackAnswer(cleanQuery, currentLang, "guru");
    const hasSpecificKnowledge =
      !knowledgeText.includes("comprehensive study & knowledge guide") &&
      !knowledgeText.includes("تفصیلی تعلیمی رہنمائی") &&
      !knowledgeText.includes("सटीक अध्ययन मार्गदर्शन");

    const cleanedSummary = hasSpecificKnowledge
      ? knowledgeText
          .replace(/\*\*Answer:\*\*\s*/g, "")
          .replace(/\*\*Explain:\*\*\s*/g, "\n")
          .replace(/\*\*/g, "")
          .trim()
      : `1. Core Answer (${detectedLabel}): "${cleanQuery}" ka main concept aur textbook definition sabse pehle saaf shabdon mein samjhein.\n` +
        `2. Key Points: Is topic ke primary principles, working steps, ya key facts ko 2–3 bullet points mein note karein.\n` +
        `3. Revision Tip: Internet reconnect hone par 'Get Sheet' dubara press karein taaki AI complete derivations aur formulas fetch kar sake.`;

    return {
      topicTitle: `${cleanQuery} • ${detectedLabel}`,
      quickSummary: cleanedSummary,
      guaranteedQuestions: [
        {
          question: cleanQuery.endsWith("?")
            ? cleanQuery
            : `Explain "${cleanQuery}" with key principles and examples.`,
          highYieldAnswer: hasSpecificKnowledge
            ? cleanedSummary
            : `• Clear textbook definition likhein.\n• Main concept, working steps, ya key facts bullet points mein explain karein.\n• Ek clear example add karein.`,
          marksWeightage: "3–5 Marks",
        },
        {
          question: `Write two important applications or key exam points of "${cleanQuery}".`,
          highYieldAnswer:
            `• Syllabus ke mutabiq 2 practical applications ya real-world examples likhein.\n` +
            `• Important conditions aur keywords highlight karein.`,
          marksWeightage: "2 Marks",
        },
      ],
      formulaVault:
        isPhysics && lower.includes("ohm")
          ? [
              {
                name: "Ohm's Law",
                formula: "V = I × R",
                variables: "V = Potential Difference (Volts), I = Current (Amperes), R = Resistance (Ohms Ω)",
                tip: "Valid only at constant temperature; slope of V–I graph gives Resistance R.",
              },
            ]
          : isPhysics && lower.includes("newton")
          ? [
              {
                name: "Newton's Second Law",
                formula: "F = m × a",
                variables: "F = Force (Newton, N), m = Mass (kg), a = Acceleration (m/s²)",
                tip: "Rate of change of momentum Δp/Δt equals applied unbalanced force.",
              },
            ]
          : isBiology && lower.includes("photosynthesis")
          ? [
              {
                name: "Photosynthesis Equation",
                formula: "6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂",
                variables: "Takes place in Chloroplasts containing Chlorophyll pigment",
                tip: "Mention sunlight and chlorophyll above/below the reaction arrow.",
              },
            ]
          : [],
      examinerTraps: [
        {
          trap:
            isPhysics || isChemistry || isMath
              ? "Missing SI units, sign errors, or skipping calculation steps"
              : "Writing unstructured paragraphs without key terms",
          howToAvoid:
            isPhysics || isChemistry || isMath
              ? "Hamesha 'Given → Formula → Calculation → SI Unit' format mein answer likhein."
              : "Har answer ko clear definition + 3 crisp bullet points + example mein likhein.",
        },
      ],
      oneLineMemoryTrick:
        "Keywords ko highlight karein aur answer ko Definition → Key Principle → Example ke order mein likhein!",
      disclaimer: `S.S AI Study Guru • ${detectedLabel} Offline Sheet`,
    };
  };

  const handleGenerate = async (topicToGenerate?: string) => {
    const targetTopic = (topicToGenerate ?? topicInput).trim();
    if (!targetTopic) return;

    setLoading(true);
    try {
      const hybridSheet = await tryHybridCheatSheet(targetTopic, selectedGrade, currentLang);
      if (hybridSheet && hybridSheet.topicTitle) {
        setSheet(hybridSheet);
        return;
      }

      if (typeof navigator !== "undefined" && navigator.onLine === false) {
        setSheet(buildOfflineCheatSheet(targetTopic, selectedGrade));
        return;
      }

      const res = await fetch("/api/cheat-sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: targetTopic,
          grade: selectedGrade,
          language: currentLang,
        }),
      });

      const data = await res.json();
      if (data && data.topicTitle) {
        setSheet(data);
      } else {
        setSheet(buildOfflineCheatSheet(targetTopic, selectedGrade));
      }
    } catch (err) {
      console.warn("Client fallback for cheat sheet:", err);
      setSheet(buildOfflineCheatSheet(targetTopic, selectedGrade));
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const shareText =
      `5-Minute Revision Sheet: ${sheet.topicTitle}\n\n` +
      `Summary:\n${sheet.quickSummary}\n\n` +
      `Important Questions:\n` +
      sheet.guaranteedQuestions.map((q) => `• ${q.question}`).join("\n") +
      `\n\nMemory Trick: ${sheet.oneLineMemoryTrick}\n` +
      `S.S AI Study Guru`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Revision Sheet: ${sheet.topicTitle}`,
          text: shareText,
          url: window.location.href,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      } catch {
        navigator.clipboard.writeText(shareText);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 3000);
    }
  };

  const handleCopyText = () => {
    const fullText =
      `${sheet.topicTitle}\n` +
      `==============================\n\n` +
      `QUICK SUMMARY:\n${sheet.quickSummary}\n\n` +
      `IMPORTANT EXAM QUESTIONS:\n` +
      sheet.guaranteedQuestions
        .map((q, i) => `${i + 1}. ${q.question} (${q.marksWeightage})\n${q.highYieldAnswer}\n`)
        .join("\n") +
      `\nKEY FORMULAS / RULES:\n` +
      sheet.formulaVault
        .map((f) => `• ${f.name}: ${f.formula} (${f.variables})\n  Tip: ${f.tip}`)
        .join("\n") +
      `\n\nCOMMON MISTAKE TO AVOID:\n` +
      sheet.examinerTraps.map((t) => `• ${t.trap} -> ${t.howToAvoid}`).join("\n") +
      `\n\nMEMORY TRICK: ${sheet.oneLineMemoryTrick}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Clean Simple Search Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Zap className="w-4 h-4 fill-amber-500" />
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
                5-Minute Revision & Cheat Sheet
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Koi bhi Question ya Chapter likh kar search karein — turant saaf exam-ready revision sheet paayein.
            </p>
          </div>
        </div>

        {/* Question / Topic Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="Apna Question ya Topic likhein (e.g. What is Ohm's Law?, Photosynthesis, Constitution)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-hidden focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            aria-label="Select class or exam level"
            className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-medium text-slate-800 focus:outline-hidden focus:border-amber-500"
          >
            <option value="Class 10 Board">Class 10th Board</option>
            <option value="Class 12 / NEET / JEE">Class 12th / NEET / JEE</option>
            <option value="JKSSB / SSC / Govt Exam">JKSSB / SSC / Govt Exam</option>
            <option value="Law & Legal (BNS / CPC)">Law & Legal</option>
            <option value="General Revision">General Study</option>
          </select>

          <button
            onClick={() => handleGenerate()}
            disabled={loading || !topicInput.trim()}
            className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-amber-400 font-bold text-sm transition cursor-pointer whitespace-nowrap"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Get Sheet</span>
              </>
            )}
          </button>
        </div>

        {/* Simple Quick Question Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs">
          <span className="text-slate-500 font-semibold whitespace-nowrap">Try:</span>
          {QUICK_QUESTIONS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTopicInput(item.query);
                handleGenerate(item.query);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-50 hover:text-amber-900 border border-slate-200 text-slate-700 font-medium transition whitespace-nowrap cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clean Notebook-Style Revision Sheet */}
      <div
        ref={printAreaRef}
        className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-5 text-slate-900"
      >
        {/* Sheet Title + Single Clean Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
              5-Minute Revision Sheet
            </span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              {sheet.topicTitle}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PDF / Print</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{shareSuccess ? "Shared!" : "Share"}</span>
            </button>
          </div>
        </div>

        {/* 1. Quick Answer & Summary */}
        <section className="bg-amber-50/50 border-l-4 border-amber-500 rounded-r-xl p-4 space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>1. Quick Answer & Core Summary</span>
          </div>
          <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
            {sheet.quickSummary}
          </p>
        </section>

        {/* 2. Important Exam Questions & Answers */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
            <HelpCircle className="w-4 h-4 text-rose-600" />
            <span>2. Important Exam Questions & Answers</span>
          </div>
          <div className="space-y-2.5">
            {sheet.guaranteedQuestions.map((q, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900">
                    Q{idx + 1}. {q.question}
                  </h3>
                  <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md whitespace-nowrap">
                    {q.marksWeightage}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                  {q.highYieldAnswer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Key Formulas & Rules */}
        {sheet.formulaVault && sheet.formulaVault.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <Calculator className="w-4 h-4 text-blue-600" />
              <span>3. Key Formulas & Rules</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sheet.formulaVault.map((f, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-900">{f.name}</span>
                    <code className="text-xs font-mono font-bold bg-blue-50 text-blue-900 px-2 py-0.5 rounded-md border border-blue-100">
                      {f.formula}
                    </code>
                  </div>
                  <p className="text-xs text-slate-600">{f.variables}</p>
                  {f.tip && (
                    <p className="text-xs text-emerald-800 bg-emerald-50/70 px-2.5 py-1 rounded-lg">
                      Tip: {f.tip}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Exam Tip & Memory Trick */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sheet.examinerTraps && sheet.examinerTraps.length > 0 && (
            <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Common Mistake to Avoid</span>
              </div>
              <p className="text-xs font-semibold text-rose-800">
                {sheet.examinerTraps[0].trap}
              </p>
              <p className="text-xs text-slate-700 leading-relaxed">
                {sheet.examinerTraps[0].howToAvoid}
              </p>
            </div>
          )}

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-900 text-white space-y-1.5 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <Zap className="w-4 h-4 fill-amber-400" />
              <span>1-Line Memory Trick</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-100 leading-relaxed">
              {sheet.oneLineMemoryTrick}
            </p>
          </div>
        </section>

        {/* Clean Footer Note */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-1">
          <span>{sheet.disclaimer}</span>
          <span>Need deeper explanation? Ask in S.S AI Study Guru chat.</span>
        </div>
      </div>
    </div>
  );
};
