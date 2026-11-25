import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Zap,
  BookOpen,
  Mic,
  MicOff,
  GraduationCap,
  Crown,
  Award,
  ArrowUp,
  Building2,
  Scale,
  Camera,
  Calculator,
  Layers,
  Edit3,
  LayoutGrid,
  ChevronRight,
  Image as ImageIcon,
  Download,
  ZoomIn,
  X,
  RefreshCw,
  Eye,
  Globe,
  ExternalLink,
} from "lucide-react";
import { Language } from "../types";
import { streamStudyGuru } from "../utils/aiEngine";
import { FormattedResponse } from "./FormattedResponse";
import { HandwrittenAnswerModal } from "./HandwrittenAnswerModal";
import { RewardedAdModal } from "./RewardedAdModal";
import { Printer, Bookmark } from "lucide-react";
import { addXP } from "../utils/xpManager";

interface StudyGuruChatProps {
  currentLang: string;
  setCurrentLang: (l: string) => void;
  languages: Language[];
  onOpenPrivacy: () => void;
  initialQuery?: string;
  onQueryHandled?: () => void;
  activeMode: string;
  setActiveMode: (mode: string) => void;
  onSelectTab?: (tabId: string) => void;
}

interface Message {
  id: string;
  sender: "user" | "guru";
  text: string;
  timestamp: string;
  isStreaming?: boolean;
  imageUrl?: string;
  imagePrompt?: string;
  sources?: Array<{ title: string; uri: string }>;
  groundedWithGoogle?: boolean;
}

export const StudyGuruChat: React.FC<StudyGuruChatProps> = ({
  currentLang,
  languages,
  onOpenPrivacy,
  initialQuery,
  onQueryHandled,
  activeMode,
  setActiveMode,
  onSelectTab,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [handwrittenData, setHandwrittenData] = useState<{ question: string; answer: string } | null>(null);
  const [showQuestionAdModal, setShowQuestionAdModal] = useState<boolean>(false);
  const [selectedZoomImage, setSelectedZoomImage] = useState<string | null>(null);
  const [useGoogleSearch, setUseGoogleSearch] = useState<boolean>(false);
  const [xpToast, setXpToast] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const queryCountRef = useRef<number>(0);

  const activeLangObj = languages.find((l) => l.code === currentLang) || languages[0];

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSend(initialQuery);
      if (onQueryHandled) onQueryHandled();
    }
  }, [initialQuery]);

  useEffect(() => {
    if (messages.length > 0) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText !== undefined ? overrideText : inputQuery;
    if (!textToSend || !textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: "u-" + Date.now(),
      sender: "user",
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const guruMsgId = "g-" + Date.now();
    const initialGuruMsg: Message = {
      id: guruMsgId,
      sender: "guru",
      text: "",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMsg, initialGuruMsg]);
    setInputQuery("");
    setLoading(true);

    const lowerQuery = textToSend.toLowerCase();
    const imageKeywords = [
      "photo bana", "photo bna", "photo create", "photo generate", "photo do", "photo de", "photo chahiye",
      "image bana", "image bna", "image create", "image generate", "image do", "image de", "image chahiye",
      "tasveer", "tasweer", "picture bana", "picture bna", "generate image", "generate photo", "generate picture",
      "draw a", "draw an", "draw karo", "draw kar", "create image", "create photo", "create picture",
      "make a photo", "make an image", "make a picture", "photo of", "image of", "picture of", "pic bana", "pic bna",
      "illustration of", "photograph of", "photo banakai", "photo banake", "photo banaye", "tasveer bna", "tasveer bana",
      "aik photo", "ek photo", "ki photo", "ka photo", "ki picture", "ka picture", "ki image", "ka image",
      "photo banado", "photo banade", "image banado", "pic banado", "tasveer banado", "photo banakar", "photo bnake"
    ];
    const isImageRequest =
      activeMode === "image" ||
      imageKeywords.some((kw) => lowerQuery.includes(kw)) ||
      /^(generate|draw|create|make|paint|show me a)\s+(an?\s+)?(image|photo|picture|drawing|painting)/i.test(lowerQuery) ||
      /photo\s*(bana|bna|create|generate|chahiye|banakai)/i.test(lowerQuery);

    // Handling AI Image Generation (DALL-E / Imagen 8K Style)
    if (isImageRequest) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === guruMsgId
            ? { ...msg, text: "🎨 **AI Image Generation in progress...**\n\nChatGPT & DALL-E 3 Grade 8K Ultra-HD photo draw ho rahi hai...", isStreaming: true }
            : msg
        )
      );

      try {
        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: textToSend })
        });
        const data = await response.json();
        if (data.imageUrl) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === guruMsgId
                ? {
                    ...msg,
                    text: `✨ **Aapki AI Generated Photo Tayyar Hai!**\n\n**Visual Prompt:** *"${data.enhancedPrompt || textToSend}"*`,
                    imageUrl: data.imageUrl,
                    imagePrompt: data.enhancedPrompt || textToSend,
                    isStreaming: false
                  }
                : msg
            )
          );
        } else {
          throw new Error("No image returned");
        }
      } catch (imgErr) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === guruMsgId
              ? { ...msg, text: "Maazrat, photo generate karne mein temporary issue aaya. Dobara try karein.", isStreaming: false }
              : msg
          )
        );
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      await streamStudyGuru(
        textToSend,
        currentLang,
        activeMode,
        (currentText) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === guruMsgId ? { ...msg, text: currentText, isStreaming: true } : msg
            )
          );
        },
        (finalText, sources, isGrounded) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === guruMsgId
                ? { ...msg, text: finalText, sources, groundedWithGoogle: isGrounded, isStreaming: false }
                : msg
            )
          );
          setLoading(false);
          const xpRes = addXP(10, "question");
          setXpToast(`✨ +10 XP! ${xpRes.leveledUp ? `🎉 LEVEL UP to Lv.${xpRes.newXP.level} (${xpRes.newXP.levelTitle})!` : "Scholar Rank Updated"}`);
          setTimeout(() => setXpToast(null), 3500);

          // Increment question count and trigger sponsor ad every 3 questions
          queryCountRef.current += 1;
          if (queryCountRef.current % 3 === 0) {
            setTimeout(() => {
              setShowQuestionAdModal(true);
            }, 1000);
          }
        },
        useGoogleSearch
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === guruMsgId ? { ...msg, isStreaming: false } : msg
        )
      );
    }
  };

  const downloadImage = (url: string, filename: string = "ai-generated-image.jpg") => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSpeechInput = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Voice input is not supported in this browser. Please use keyboard typing.");
      return;
    }
    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = activeLangObj.speechCode || "en-US";
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputQuery(transcript);
        }
      };
      recognition.start();
    } catch (e) {
      console.warn(e);
      setIsListening(false);
    }
  };

  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const speakText = (text: string, msgId?: string) => {
    if (!("speechSynthesis" in window)) return;

    if (speakingMsgId && (msgId === speakingMsgId || !msgId)) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    if (msgId) setSpeakingMsgId(msgId);

    const xpRes = addXP(5, "voice");
    setXpToast(`✨ +5 XP! Voice Audio Bonus ${xpRes.leveledUp ? `🎉 LEVEL UP: ${xpRes.newXP.levelTitle}!` : ""}`);
    setTimeout(() => setXpToast(null), 3000);

    // Clean text: strip markdown, symbols, equations and URLs for crystal-clear natural speech
    const clean = text
      .replace(/[*#_~`>•-]/g, " ")
      .replace(/Answer\s*:\s*/gi, "Jawab: ")
      .replace(/Explain\s*:\s*/gi, "Wazahat: ")
      .replace(/Scoring \/ Exam Tip\s*:\s*/gi, "Exam Tip: ")
      .replace(/\s+/g, " ")
      .trim();

    const utterance = new SpeechSynthesisUtterance(clean);
    
    // Set human natural cadence
    utterance.rate = 0.96;
    utterance.pitch = 1.02;

    const voices = window.speechSynthesis.getVoices();
    const targetCode = (activeLangObj.speechCode || "en-US").toLowerCase();

    // Smart HD Voice Selection Algorithm
    let bestVoice = voices.find(v => 
      (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Neural")) &&
      v.lang.toLowerCase().startsWith(targetCode.slice(0, 2))
    );

    if (!bestVoice) {
      bestVoice = voices.find(v => v.lang.toLowerCase().startsWith(targetCode.slice(0, 2)));
    }

    if (!bestVoice && (targetCode.startsWith("ur") || targetCode.startsWith("hi"))) {
      bestVoice = voices.find(v => v.lang.toLowerCase().includes("hi") || v.lang.toLowerCase().includes("ur"));
    }

    if (bestVoice) {
      utterance.voice = bestVoice;
    }
    utterance.lang = activeLangObj.speechCode || "en-US";

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-4">
      {/* Mode Switcher Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-500 font-semibold text-xs whitespace-nowrap">Mode:</span>
        <button
          onClick={() => setActiveMode("guru")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeMode === "guru"
              ? "bg-slate-950 text-white shadow-xs"
              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Study Guru</span>
        </button>
        <button
          onClick={() => setActiveMode("explainer")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeMode === "explainer"
              ? "bg-slate-950 text-white shadow-xs"
              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
          <span>Concept Explainer</span>
        </button>
        <button
          onClick={() => setActiveMode("homework")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeMode === "homework"
              ? "bg-slate-950 text-white shadow-xs"
              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Homework Solver</span>
        </button>
      </div>

      {/* Initial Landing Hero View when no messages */}
      {messages.length === 0 ? (
        <div className="space-y-4 pt-1">
          {/* Founder Official Platform Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#120f0d] via-[#1c140e] to-[#2b180a] p-5 sm:p-6 border border-amber-500/25 text-white shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 p-0.5 flex items-center justify-center shadow-lg shrink-0">
                <div className="w-full h-full bg-amber-500 rounded-[14px] flex items-center justify-center text-slate-950">
                  <Crown className="w-7 h-7 fill-slate-950 text-slate-950" />
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>OFFICIAL AI EDUCATIONAL PLATFORM</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Welcome to S.S AI Study Guru
                </h2>
                <p className="text-xs sm:text-sm text-stone-300">
                  Created & Founded by{" "}
                  <span className="text-amber-400 font-bold underline decoration-amber-400/60 underline-offset-2">
                    SHAHID AHMAD SHEIKH
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-semibold shadow-inner">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Verified Creator</span>
              </div>
            </div>
          </div>

          {/* Centered Hero Tagline & Subheading */}
          <div className="text-center space-y-3 py-2 sm:py-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-950 text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>EXPERT STUDY ASSISTANT • SIMPLE {activeLangObj.name.toUpperCase()}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Padhaai Made{" "}
              <span className="font-serif italic font-normal text-amber-900">
                Simple & Crystal Clear.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed px-2">
              Ask any complex topic, get homework solved step-by-step, or generate quick quizzes with fun real-world {activeLangObj.name} examples!
            </p>

            {/* Feature Pills */}
            <div className="flex items-center justify-center flex-wrap gap-2 text-xs font-medium text-slate-600 pt-1">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500" />
                <span>&lt;4s Lightning Fast</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200/60">
                <span>💡 {activeLangObj.name} Analogies</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200/60">
                <span>🎯 Exam-Ready Steps</span>
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
              {onSelectTab && (
                <button
                  onClick={() => onSelectTab("cheat_sheet")}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black shadow-md hover:scale-105 transition cursor-pointer ring-2 ring-amber-400/50"
                >
                  <Zap className="w-3.5 h-3.5 fill-slate-950" />
                  <span>🔥 5-Minute Exam Cheat Sheet (Live)</span>
                </button>
              )}
              <button
                onClick={() => handleSend("Explain in simple terms with easy everyday examples: ")}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-amber-50 hover:border-amber-300 transition shadow-2xs cursor-pointer"
              >
                <span>💡 Samjhao / Explain</span>
              </button>
              <button
                onClick={() => handleSend("Solve this problem step by step with formulas: ")}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-amber-50 hover:border-amber-300 transition shadow-2xs cursor-pointer"
              >
                <span>📐 Solve Karo / Solution</span>
              </button>
              <button
                onClick={() => handleSend("Generate 5 important MCQs with answers and explanations for: ")}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-amber-50 hover:border-amber-300 transition shadow-2xs cursor-pointer"
              >
                <span>🎯 5 MCQs Generator</span>
              </button>
            </div>
          </div>

          {/* Search / Input Box Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-3 sm:p-4 shadow-sm space-y-3">
            <textarea
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={`Ask any study question, homework, or exam doubt in ${activeLangObj.name}...`}
              rows={3}
              className="w-full text-sm sm:text-base bg-transparent resize-none outline-hidden text-slate-900 placeholder:text-slate-400 font-normal leading-relaxed"
            />

            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                  <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                  <span>Turbo Speed</span>
                </span>
                <button
                  type="button"
                  onClick={() => setUseGoogleSearch((prev) => !prev)}
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold transition cursor-pointer border ${
                    useGoogleSearch
                      ? "bg-blue-600 text-white border-blue-600 shadow-2xs ring-2 ring-blue-300"
                      : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                  }`}
                  title="Google Search Grounding for up-to-date live data"
                >
                  <Globe className="w-3 h-3" />
                  <span>{useGoogleSearch ? "Google Search: Active" : "Google Search"}</span>
                </button>
                <span className="text-xs font-medium text-slate-400">
                  {activeLangObj.nativeName}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSpeechInput}
                  className={`p-2 rounded-full transition cursor-pointer ${
                    isListening
                      ? "bg-red-500 text-white animate-pulse"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                  title="Voice Search"
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => handleSend()}
                  disabled={!inputQuery.trim() || loading}
                  className={`p-2.5 rounded-full transition font-bold flex items-center justify-center cursor-pointer ${
                    inputQuery.trim() && !loading
                      ? "bg-slate-900 text-white hover:bg-slate-800 shadow-xs"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                  title="Send Question"
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-2 flex-wrap pt-1">
            <span>AI responses are for study guidance. Cross-verify key facts.</span>
            <span>•</span>
            <button
              onClick={onOpenPrivacy}
              className="underline hover:text-slate-800 cursor-pointer"
            >
              Privacy & Terms
            </button>
          </div>

          {/* All Application Features Grid */}
          {onSelectTab && (
            <div className="space-y-3 pt-6 border-t border-slate-200/80">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-amber-600" />
                  <span>All Application Features & Utilities</span>
                </h3>
                <span className="text-xs text-slate-500">9 Specialized Modules</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  {
                    id: "citizen_justice",
                    title: "عوامی وکیل (AI Citizen Justice)",
                    desc: "Citizen complaints, consumer notices, RTI applications & legal rights",
                    icon: Scale,
                    color: "text-emerald-700 bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400/40",
                    badge: "CITIZEN LEGAL",
                  },
                  {
                    id: "cheat_sheet",
                    title: "5-Min Exam Cheat Sheet",
                    desc: "1-Page High-Yield Revision Map: 99% repeated questions & formula vault",
                    icon: Zap,
                    color: "text-amber-600 bg-amber-50 border-amber-300 ring-2 ring-amber-400/40",
                    badge: "🔥 VIRAL & NEW",
                  },
                  {
                    id: "dept_hub",
                    title: "Departments Hub",
                    desc: "Official applications & office forms for all govt depts",
                    icon: Building2,
                    color: "text-blue-600 bg-blue-50 border-blue-200",
                    badge: "15+ Depts",
                  },
                  {
                    id: "civil_court",
                    title: "Civil Court Pleadings",
                    desc: "Order 39 Rule 1&2 Stay, Plaints, Injunctions & CPC rules",
                    icon: Scale,
                    color: "text-amber-700 bg-amber-50 border-amber-200",
                    badge: "CPC Format",
                  },
                  {
                    id: "hw_scanner",
                    title: "Homework Scanner",
                    desc: "Camera scan textbook questions for instant answers",
                    icon: Camera,
                    color: "text-purple-600 bg-purple-50 border-purple-200",
                    badge: "OCR Scanner",
                  },
                  {
                    id: "math_solver",
                    title: "Math & Formulas",
                    desc: "Calculus, Algebra, Geometry with step-by-step proofs",
                    icon: Calculator,
                    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
                    badge: "Step Solver",
                  },
                  {
                    id: "flashcards",
                    title: "Flashcards Deck",
                    desc: "Spaced repetition flashcards for rapid memorization",
                    icon: Layers,
                    color: "text-teal-600 bg-teal-50 border-teal-200",
                    badge: "Quiz Cards",
                  },
                  {
                    id: "handwritten",
                    title: "Touch Slate Board",
                    desc: "Draw mathematical equations & solve on chalkboard",
                    icon: Edit3,
                    color: "text-emerald-700 bg-emerald-50 border-emerald-200",
                    badge: "Canvas Slate",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectTab(item.id)}
                      className="flex flex-col text-left p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all group cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className={`p-2 rounded-xl border ${item.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {item.badge}
                        </span>
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-950 flex items-center gap-1">
                        <span>{item.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-amber-600" />
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Chat Conversation View */
        <div className="space-y-4">
          <div className="space-y-3 min-h-[300px]">
            {messages.map((m, idx) => {
              const isGuru = m.sender === "guru";
              const prevUserMsg =
                messages
                  .slice(0, idx)
                  .reverse()
                  .find((msg) => msg.sender === "user")?.text || "Study Question";

              return (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isGuru
                      ? "bg-white border-slate-200/90 text-slate-900 shadow-xs"
                      : "bg-slate-950 text-white border-slate-900 ml-auto max-w-[90%]"
                  }`}
                >
                  {isGuru && (
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wide">
                          S.S Guru
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          Standard Textbook Format
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => speakText(m.text, m.id)}
                          className={`p-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                            speakingMsgId === m.id
                              ? "bg-amber-500 text-slate-950 font-bold shadow-xs animate-pulse ring-2 ring-amber-300"
                              : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                          }`}
                          title={speakingMsgId === m.id ? "Stop Voice" : "Listen in Ultra-HD Studio Voice"}
                        >
                          {speakingMsgId === m.id ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-slate-950" />
                              <span className="text-[10px] font-bold">Speaking...</span>
                            </>
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => copyText(m.text, m.id)}
                          className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                          title="Copy Solution"
                        >
                          {copiedId === m.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {isGuru ? (
                    <div className="space-y-3">
                      <FormattedResponse rawText={m.text} isStreaming={m.isStreaming} />

                      {/* Google Search Live Grounding Sources Card */}
                      {m.sources && m.sources.length > 0 && (
                        <div className="mt-2.5 p-3 rounded-2xl bg-blue-50/90 border border-blue-200 text-xs text-slate-800 space-y-1.5 shadow-2xs">
                          <div className="flex items-center gap-1.5 font-bold text-blue-900 text-[11px] uppercase tracking-wide">
                            <Globe className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                            <span>Google Search Live Verified Data</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {m.sources.slice(0, 4).map((src, sIdx) => (
                              <a
                                key={sIdx}
                                href={src.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-700 hover:bg-blue-100 hover:text-blue-950 transition text-[11px] font-semibold shadow-2xs truncate max-w-[240px]"
                                title={src.title}
                              >
                                <ExternalLink className="w-3 h-3 text-blue-500 shrink-0" />
                                <span className="truncate">{src.title}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Render AI Generated Photo Card if present */}
                      {m.imageUrl && (
                        <div className="mt-3 overflow-hidden rounded-2xl border border-purple-200 bg-gradient-to-b from-purple-50/50 to-white p-3 shadow-md">
                          <div className="relative group overflow-hidden rounded-xl bg-slate-950/5 border border-slate-200">
                            <img
                              src={m.imageUrl}
                              alt={m.imagePrompt || "AI Generated Artwork"}
                              className="w-full max-h-[420px] object-contain rounded-xl transition duration-300 hover:scale-[1.01]"
                              loading="lazy"
                            />
                            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 shadow-lg">
                              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                              <span>8K Ultra-HD AI Photo</span>
                            </div>
                          </div>

                          {/* Image Action Buttons */}
                          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-purple-100">
                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                onClick={() => setSelectedZoomImage(m.imageUrl!)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Zoom & Inspect</span>
                              </button>

                              <button
                                onClick={() => downloadImage(m.imageUrl!, `ai-study-guru-${Date.now()}.jpg`)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                              >
                                <Download className="w-3.5 h-3.5 text-amber-400" />
                                <span>Save HD to Mobile Gallery</span>
                              </button>
                            </div>

                            <button
                              onClick={() => {
                                handleSend(`Generate a new creative photo variation of: ${m.imagePrompt || prevUserMsg}`);
                              }}
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white border border-purple-200 hover:bg-purple-50 text-purple-900 text-xs font-semibold transition cursor-pointer"
                              title="Re-draw another variation"
                            >
                              <RefreshCw className="w-3.5 h-3.5 text-purple-600" />
                              <span>Nayi Variation</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                      {m.text}
                    </div>
                  )}

                  {isGuru && !m.isStreaming && m.text.trim() && (
                    <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => {
                            setHandwrittenData({
                              question: prevUserMsg,
                              answer: m.text,
                            });
                            const xpRes = addXP(15, "notes");
                            setXpToast(`✨ +15 XP! Exam Notes Generated ${xpRes.leveledUp ? `🎉 LEVEL UP: ${xpRes.newXP.levelTitle}!` : ""}`);
                            setTimeout(() => setXpToast(null), 3000);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer group"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-amber-700 group-hover:scale-110 transition-transform" />
                          <span>✍️ Handwritten Notes</span>
                        </button>

                        <button
                          onClick={() =>
                            setHandwrittenData({
                              question: prevUserMsg,
                              answer: m.text,
                            })
                          }
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5 text-slate-600" />
                          <span>📄 Download / Print PDF</span>
                        </button>
                      </div>

                      <div className="text-[10px] text-slate-400 font-medium ml-auto">
                        {m.timestamp}
                      </div>
                    </div>
                  )}

                  {!isGuru && (
                    <div className="text-[10px] mt-2 text-right text-slate-400">
                      {m.timestamp}
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={chatBottomRef} />
          </div>

          {/* Sticky Input Bar for ongoing chat */}
          <div className="sticky bottom-2 bg-white p-2 rounded-2xl border border-slate-300 shadow-md">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handleSpeechInput}
                className={`p-2 rounded-xl transition cursor-pointer ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
                title="Voice Search"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={`Ask any follow-up study question or photo prompt in ${activeLangObj.name}...`}
                className="flex-1 text-sm bg-transparent outline-hidden px-2 text-slate-900 placeholder:text-slate-400"
              />

              <button
                onClick={() => handleSend()}
                disabled={!inputQuery.trim() || loading}
                className={`p-2 rounded-xl transition font-bold flex items-center justify-center cursor-pointer ${
                  inputQuery.trim() && !loading
                    ? "bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-xs"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating XP Celebration Toast */}
      {xpToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-950/95 text-amber-300 border border-amber-400/50 px-5 py-2.5 rounded-full text-xs font-black shadow-2xl flex items-center gap-2 animate-bounce backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>{xpToast}</span>
        </div>
      )}

      {/* Fullscreen Zoom Image Modal */}
      {selectedZoomImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedZoomImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedZoomImage(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={selectedZoomImage}
              alt="Fullscreen AI Art"
              className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
            />

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => downloadImage(selectedZoomImage, `ai-study-guru-hd-${Date.now()}.jpg`)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-xl hover:scale-105 transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Ultra-HD Photo (Gallery)</span>
              </button>

              <button
                onClick={() => setSelectedZoomImage(null)}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition cursor-pointer border border-white/20"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Realistic Handwritten Notes Modal */}
      {handwrittenData && (
        <HandwrittenAnswerModal
          isOpen={!!handwrittenData}
          onClose={() => setHandwrittenData(null)}
          question={handwrittenData.question}
          answerText={handwrittenData.answer}
        />
      )}

      {/* 10-Second AdMob Modal */}
      <RewardedAdModal
        isOpen={showQuestionAdModal}
        onClose={() => setShowQuestionAdModal(false)}
        durationSeconds={10}
        rewardTitle="10-Second Sponsor Break"
        description="Please watch this quick sponsor ad to keep AI Study Guru & Legal Hub completely free for all students."
        onRewardEarned={() => {
          setShowQuestionAdModal(false);
        }}
      />
    </div>
  );
};
