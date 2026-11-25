import React, { useState } from "react";
import {
  Sparkles,
  Building2,
  Scale,
  Camera,
  Calculator,
  Layers,
  Edit3,
  Zap,
  Moon,
} from "lucide-react";

import { languages } from "./data/languages";
import { Header } from "./components/Header";
import { StudyGuruChat } from "./components/StudyGuruChat";
import { HomeworkScanner } from "./components/HomeworkScanner";
import { MathSolver } from "./components/MathSolver";
import { CivilCourtPleadings } from "./components/CivilCourtPleadings";
import { DeptOfficeHub } from "./components/DeptOfficeHub";
import { FlashcardsDeck } from "./components/FlashcardsDeck";
import { HandwrittenNotes } from "./components/HandwrittenNotes";
import { CheatSheetStudio } from "./components/CheatSheetStudio";
import { HolyQuranSuite } from "./components/HolyQuranSuite";
import { CitizenJusticeHub } from "./components/CitizenJusticeHub";

import {
  FounderModal,
  BookmarksModal,
  PrivacyModal,
  DownloadModal,
  InstallBanner,
} from "./components/Modals";
import { StoreAssetsModal } from "./components/StoreAssetsModal";

export function App() {
  const [activeTab, setActiveTab] = useState<string>("study_guru");
  const [currentLang, setCurrentLang] = useState<string>("hinglish");
  const [activeMode, setActiveMode] = useState<string>("guru");

  // Modals state
  const [showFounder, setShowFounder] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [showStoreAssets, setShowStoreAssets] = useState(false);

  // Auto-detect privacy policy query/hash & Pre-warm AI connection
  React.useEffect(() => {
    // Silent warm-up to eliminate cold starts on first user query
    fetch("/api/warmup").catch(() => {});

    if (
      window.location.hash.includes("privacy") ||
      window.location.pathname.includes("privacy") ||
      window.location.search.includes("privacy")
    ) {
      setShowPrivacy(true);
    }
  }, []);

  // Cross-module query handover
  const [crossQuery, setCrossQuery] = useState<string>("");

  const navTabs = [
    { id: "study_guru", label: "S.S AI Study Guru", icon: Sparkles, badge: "AI Core" },
    { id: "citizen_justice", label: "عوامی وکیل (AI Citizen Justice)", icon: Scale, badge: "CITIZEN LEGAL" },
    { id: "holy_quran", label: "نُورِ قرآن (Kashmiri & Multi)", icon: Moon, badge: "BARKAT & NOOR" },
    { id: "cheat_sheet", label: "5-Min Cheat Sheet", icon: Zap, badge: "VIRAL" },
    { id: "dept_hub", label: "Departments Hub", icon: Building2 },
    { id: "civil_court", label: "Civil Court Pleadings", icon: Scale, badge: "C.P.C." },
    { id: "hw_scanner", label: "Homework Scanner", icon: Camera },
    { id: "math_solver", label: "Math & Formulas", icon: Calculator },
    { id: "flashcards", label: "Flashcards Deck", icon: Layers },
    { id: "handwritten", label: "Touch Slate", icon: Edit3 },
  ];

  const handleScanSolve = (questionText: string) => {
    setCrossQuery(questionText);
    setActiveTab("study_guru");
  };

  const handleSelectBookmark = (prompt: string, tab: string) => {
    setShowBookmarks(false);
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
    if (prompt) {
      setCrossQuery(prompt);
      setActiveTab("study_guru");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Main Sticky Header */}
      <Header
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        languages={languages}
        onOpenFounder={() => setShowFounder(true)}
        onOpenBookmarks={() => setShowBookmarks(true)}
      />

      {/* Primary Navigation Tabs */}
      <nav className="bg-white border-b border-slate-200 sticky top-[84px] z-30 shadow-2xs">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar text-xs">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-950 text-amber-400 shadow-xs ring-1 ring-slate-800"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-amber-400" : "text-slate-500"}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${
                        isSelected ? "bg-amber-400 text-slate-950" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-4">
        {activeTab === "study_guru" && (
          <StudyGuruChat
            currentLang={currentLang}
            setCurrentLang={setCurrentLang}
            languages={languages}
            onOpenPrivacy={() => setShowPrivacy(true)}
            initialQuery={crossQuery}
            onQueryHandled={() => setCrossQuery("")}
            activeMode={activeMode}
            setActiveMode={setActiveMode}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === "citizen_justice" && <CitizenJusticeHub />}

        {activeTab === "holy_quran" && <HolyQuranSuite currentLang={currentLang} />}

        {activeTab === "cheat_sheet" && <CheatSheetStudio currentLang={currentLang} />}

        {activeTab === "dept_hub" && <DeptOfficeHub />}
        {activeTab === "civil_court" && <CivilCourtPleadings />}
        {activeTab === "hw_scanner" && <HomeworkScanner onScanResult={handleScanSolve} />}
        {activeTab === "math_solver" && <MathSolver />}
        {activeTab === "flashcards" && <FlashcardsDeck />}
        {activeTab === "handwritten" && <HandwrittenNotes />}
      </main>

      {/* Clean Professional Footer */}
      <footer className="bg-white border-t border-slate-200 py-3.5 px-4 text-center text-xs text-slate-500">
        <div className="flex items-center justify-center gap-3 flex-wrap font-medium">
          <span className="text-slate-700 font-semibold">S.S AI Study Guru</span>
          <span>•</span>
          <button
            onClick={() => setShowPrivacy(true)}
            className="hover:underline text-slate-600 hover:text-amber-600 cursor-pointer transition-colors"
          >
            Privacy Policy & Terms
          </button>
        </div>
      </footer>

      {/* Modals */}
      <FounderModal isOpen={showFounder} onClose={() => setShowFounder(false)} />
      <BookmarksModal
        isOpen={showBookmarks}
        onClose={() => setShowBookmarks(false)}
        onSelectBookmark={handleSelectBookmark}
      />
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <DownloadModal isOpen={showDownload} onClose={() => setShowDownload(false)} />
      <StoreAssetsModal isOpen={showStoreAssets} onClose={() => setShowStoreAssets(false)} />
    </div>
  );
}

export default App;
