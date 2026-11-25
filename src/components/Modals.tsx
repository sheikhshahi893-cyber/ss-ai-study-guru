import React from "react";
import { X, CheckCircle2, Award, Zap, Shield, Bookmark as BookmarkIcon, Download, Smartphone } from "lucide-react";
import { initialNotebook } from "../data/initialNotebook";

export const FounderModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-black text-lg">
            S.S
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-base text-white">SHAHID AHMAD SHEIKH</h3>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xs text-amber-400 font-semibold">Founder & Creator of S.S AI Study Guru</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Dedicated to empowering students, legal professionals, and government aspirants with modern, accessible, and structured AI educational technology.
        </p>

        <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80 space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2 text-amber-300 font-bold">
            <Award className="w-4 h-4" />
            <span>Platform Highlights:</span>
          </div>
          <ul className="space-y-1 list-disc list-inside text-[11px] text-slate-400">
            <li>Strict structured "Answer + Explain" methodology</li>
            <li>Civil Court legal pleading generator (Order 39 Stay CPC)</li>
            <li>Multi-department office templates & official correspondence</li>
            <li>Multi-language support for regional learners</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const BookmarksModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelectBookmark: (prompt: string, tab: string) => void;
}> = ({ isOpen, onClose, onSelectBookmark }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white space-y-4 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BookmarkIcon className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-sm text-white">Saved Study Bookmarks</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 overflow-y-auto custom-scrollbar flex-1 pr-1">
          {initialNotebook.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectBookmark(item.prompt, item.tab)}
              className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition cursor-pointer space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-500">{item.date}</span>
              </div>
              <h4 className="font-bold text-xs text-white">{item.title}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">{item.snippet}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PrivacyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white space-y-4 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Privacy Policy & Safety Terms</h3>
              <p className="text-xs text-slate-400">S.S AI Study Guru & Legal Hub • Founder: SHAHID AHMAD SHEIKH</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Policy Body */}
        <div className="space-y-3.5 text-xs text-slate-300 overflow-y-auto custom-scrollbar flex-1 pr-1 leading-relaxed">
          {/* Section 1: Zero Data Selling */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>1. Zero Personal Data Selling (ڈیٹا کی عدم فروخت)</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              S.S AI Study Guru strictly does not sell, rent, trade, or share user personal data, homework photos, search queries, or contact details with any third-party advertisers or data brokers. Your privacy is 100% protected.
            </p>
          </div>

          {/* Section 2: Local Device Storage */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <Zap className="w-4 h-4" />
              <span>2. Local Device Storage (فون کی اپنی پرائیویٹ میموری)</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              All saved study bookmarks, Q&A notes, custom petitions, and flashcards are stored locally inside your device's private browser memory (<code className="text-amber-400">localStorage</code>) and are never uploaded to public servers.
            </p>
          </div>

          {/* Section 3: Camera & Voice Permissions */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Shield className="w-4 h-4" />
              <span>3. Camera & Microphone Usage</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Camera access is strictly utilized only when you choose to scan a textbook or homework question. Microphone access is used purely for real-time speech-to-text typing of questions and citizen grievances.
            </p>
          </div>

          {/* Section 4: Citizen Justice & Legal Shield */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Award className="w-4 h-4" />
              <span>4. Constitutional Right & Legal Disclaimer</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Citizen grievance drafts and administrative notices are generated in exercise of constitutional rights under Articles 14, 19(1)(a), and 21 of the Constitution of India and Consumer Protection Act 2019 as self-help petition formats.
            </p>
          </div>

          {/* Section 5: Non-Affiliation, Government & Trademark Disclaimer (Google Play Compliant) */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Shield className="w-4 h-4" />
              <span>5. Non-Affiliation & Copyright Transparency (حقوق و لاتعلقی)</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              <strong>Non-Government Entity:</strong> S.S AI Study Guru is an independent private educational and productivity app created by SHAHID AHMAD SHEIKH. It is NOT affiliated with, sponsored by, or an official representative of any government department, JKBOSE, CBSE, NCERT, or judicial court. All legal procedures, CPC draft outlines, and syllabus summaries are public domain educational reference materials.
            </p>
            <p className="text-slate-400 text-[10px] leading-relaxed">
              <strong>Trademarks:</strong> All educational board names (JKBOSE, CBSE) and academic curriculum references are used purely for informational routing and student study guidance.
            </p>
          </div>

          {/* Footer Contact */}
          <div className="pt-2 text-center text-[11px] text-slate-400 border-t border-slate-800/80">
            Official Developer Contact: <a href="mailto:sheikhshahi893@gmail.com" className="text-amber-400 font-bold hover:underline">sheikhshahi893@gmail.com</a>
          </div>

          {/* Action Button to return to app */}
          <button
            onClick={onClose}
            className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>🚀 Open S.S AI Study Guru App (ہوم اسکرین پر جائیں)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const DownloadModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white space-y-4 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
          <Smartphone className="w-6 h-6" />
        </div>

        <div>
          <h3 className="font-extrabold text-base text-white">Install S.S Study Guru App</h3>
          <p className="text-xs text-slate-400 mt-1">
            Add S.S AI Study Guru to your phone home screen for 1-tap fast offline access.
          </p>
        </div>

        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-left text-xs space-y-1.5 text-slate-300">
          <div>📱 <strong>Android Chrome:</strong> Tap (⋮) Menu ➔ "Add to Home screen" or "Install App".</div>
          <div>🍏 <strong>iOS Safari:</strong> Tap Share icon (⎋) ➔ "Add to Home Screen".</div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export const InstallBanner: React.FC<{ onOpenDownloadModal: () => void }> = ({
  onOpenDownloadModal,
}) => {
  return (
    <div className="bg-slate-950 text-white px-3 py-1.5 text-xs flex items-center justify-between border-b border-slate-800">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[11px] text-slate-300">
          S.S AI Study Guru & Civil Court Hub • Created by Shahid Ahmad Sheikh
        </span>
      </div>
      <button
        onClick={onOpenDownloadModal}
        className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black hover:bg-amber-400 transition cursor-pointer flex items-center gap-1"
      >
        <Download className="w-3 h-3" />
        <span>Install App</span>
      </button>
    </div>
  );
};
