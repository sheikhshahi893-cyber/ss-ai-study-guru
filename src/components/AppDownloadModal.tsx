import React from "react";
import { X, Smartphone, Download, CheckCircle2, ShieldCheck } from "lucide-react";

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Download Android App</h3>
              <p className="text-xs text-slate-400">Install APK & Progressive Web App</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-md">
              S.S
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">S.S AI Study Guru v1.0.0</h4>
              <p className="text-xs text-amber-400 font-semibold">Founded by Shahid Ahmad Sheikh</p>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full Offline Caching & Instant Launch</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Civil Court Order 39 Stay & Revenue Templates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Multilingual Voice & Formula Solvers</span>
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          <a
            href="/downloads/SS_AI_Study_Guru_v1.0.1_Production_Package.zip"
            download="SS_AI_Study_Guru_v1.0.1_Production_Package.zip"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            <span>Download Production Package (.ZIP)</span>
          </a>

          <button
            onClick={() => {
              alert("PWA is configured! In Chrome/Edge menu, click 'Add to Home screen' or 'Install App'.");
            }}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
          >
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>Install Web App (PWA)</span>
          </button>

          <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Full production bundle with Capacitor config & AdMob integration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppDownloadModal;
