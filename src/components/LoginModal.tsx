import React, { useState } from "react";
import { 
  X, 
  LogIn, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  Scale, 
  Building2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { loginWithGoogle, UserProfile } from "../services/firebaseService";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const profile = await loginWithGoogle();
      onSuccess(profile);
      onClose();
    } catch (err: any) {
      console.error("Google sign in failed:", err);
      setError(err?.message || "Google Sign-In cancel ho gaya ya pop-up block hua. Please retry karein.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl text-white space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Branding */}
        <div className="text-center space-y-2 pt-1">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-amber-500/20">
            S.S
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Sign In to S.S AI Study Guru
          </h2>
          <p className="text-xs text-slate-400">
            Founded by <span className="text-amber-400 font-semibold">Shahid Ahmad Sheikh</span>
          </p>
        </div>

        {/* Benefits Card */}
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2 text-xs">
          <div className="text-amber-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Login Features:</span>
          </div>
          <ul className="space-y-1.5 text-slate-300 text-[11px]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Personal Study Notes & Civil Court drafts saved safely</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Earn Study Guru XP Points & unlock learning badges</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Synchronized across your phone, tablet & web app</span>
            </li>
          </ul>
        </div>

        {/* Error notice if any */}
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Google Sign In Button */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition flex items-center justify-center gap-3 shadow-lg hover:shadow-xl cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transform active:scale-98"
          >
            {loading ? (
              <span className="flex items-center gap-2 text-slate-700">
                <span className="w-4 h-4 border-2 border-slate-600 border-t-amber-500 rounded-full animate-spin" />
                Connecting with Google...
              </span>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1.5 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official Firebase Auth • 100% Secure & Private</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
