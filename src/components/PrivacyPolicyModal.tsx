import React from "react";
import { X, ShieldCheck, Lock, Eye, Award } from "lucide-react";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white space-y-4 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Privacy Policy & Terms</h3>
              <p className="text-xs text-slate-400">S.S AI Study Guru • Founder: Shahid Ahmad Sheikh</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-slate-300 overflow-y-auto custom-scrollbar flex-1 pr-2 leading-relaxed">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>1. Zero Personal Data Retention</span>
            </h4>
            <p>
              S.S AI Study Guru does not sell, trade, or rent user personal identification information to others. All notebook entries, scanned homework files, and voice recordings remain locally on your device storage unless explicitly processed for educational answering.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-blue-400" />
              <span>2. AI Query Processing</span>
            </h4>
            <p>
              Academic queries and court drafting prompts are transmitted over encrypted HTTPS channels to state-of-the-art AI inference endpoints strictly to produce educational explanations and legal templates.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>3. Legal Drafting & Educational Disclaimer</span>
            </h4>
            <p>
              Legal formats (CPC Order 39 Stay applications, plaints, and revenue records) are reference templates. Users are advised to review drafts with a qualified advocate before filing in any judicial court.
            </p>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 text-center">
            For privacy inquiries or suggestions, contact: <a href="mailto:sheikhshahi893@gmail.com" className="text-amber-400 underline">sheikhshahi893@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
