import React, { useState, useEffect } from "react";
import { Sparkles, CheckCircle2, Zap, RotateCcw, Bookmark as BookmarkIcon, Globe, Download, Trophy, Search } from "lucide-react";
import { Language } from "../types";
import { getUserXP, UserXPData } from "../utils/xpManager";
import { UserXPModal } from "./UserXPModal";

interface HeaderProps {
  currentLang: string;
  setCurrentLang: (code: string) => void;
  languages: Language[];
  onOpenFounder: () => void;
  onOpenBookmarks: () => void;
  onOpenStoreAssets?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  setCurrentLang,
  languages,
  onOpenFounder,
  onOpenBookmarks,
  onOpenStoreAssets,
}) => {
  const [xpData, setXpData] = useState<UserXPData>(getUserXP());
  const [showXPModal, setShowXPModal] = useState(false);

  useEffect(() => {
    const handleXPUpdate = (e: any) => {
      if (e.detail) {
        setXpData(e.detail);
      } else {
        setXpData(getUserXP());
      }
    };

    window.addEventListener("ss_xp_updated", handleXPUpdate);
    return () => window.removeEventListener("ss_xp_updated", handleXPUpdate);
  }, []);

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 pt-2.5 pb-2.5 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenFounder}
                className="px-2 py-0.5 rounded-lg bg-[#f59e0b] text-slate-950 font-black text-xs shadow-xs hover:scale-105 transition-transform flex items-center gap-0.5 cursor-pointer"
                title="S.S Founder Profile"
              >
                <span>S.S</span>
              </button>
              <span className="font-bold text-base sm:text-lg text-slate-950 tracking-tight">
                Study Guru
              </span>
              <button
                onClick={onOpenFounder}
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full hover:bg-amber-100 transition cursor-pointer"
              >
                <span>By SHAHID AHMAD SHEIKH</span>
                <CheckCircle2 className="w-3 h-3 text-amber-600 fill-amber-500" />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Gamified User XP & Level Badge */}
              <button
                onClick={() => setShowXPModal(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 text-xs font-black shadow-xs hover:scale-105 transition-transform cursor-pointer border border-amber-300"
                title="View Scholar Level & XP Points"
              >
                <span className="text-sm select-none">{xpData.levelBadge}</span>
                <span className="hidden xs:inline">Lv.{xpData.level}</span>
                <span className="bg-black/15 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                  {xpData.xp} XP
                </span>
              </button>



              <button
                onClick={() => window.location.reload()}
                className="p-1.5 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition cursor-pointer"
                title="History / Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBookmarks}
                className="p-1.5 text-amber-600 hover:text-amber-700 rounded-full hover:bg-amber-50 transition cursor-pointer"
                title="Saved Bookmarks"
              >
                <BookmarkIcon className="w-4 h-4 fill-amber-500 text-amber-600" />
              </button>
            </div>
          </div>

        {/* Language Selector Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 custom-scrollbar text-xs">
          <span className="text-slate-500 font-semibold flex items-center gap-1 whitespace-nowrap text-xs">
            <Globe className="w-3.5 h-3.5 text-amber-600" />
            <span>Language:</span>
          </span>
          {languages.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setCurrentLang(lang.code)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#f97316] text-white shadow-xs font-bold"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {lang.nativeName}
              </button>
            );
          })}
        </div>
      </div>
    </header>

    <UserXPModal
      isOpen={showXPModal}
      onClose={() => setShowXPModal(false)}
      xpData={xpData}
    />
  </>
);
};
