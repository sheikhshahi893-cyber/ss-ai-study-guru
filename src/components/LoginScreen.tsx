import React, { useState } from "react";
import { 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  GraduationCap,
  UserCheck,
  ExternalLink
} from "lucide-react";
import { loginWithGoogle, createGuestSession, UserProfile } from "../services/firebaseService";

interface LoginScreenProps {
  onSuccess: (user: UserProfile) => void;
  onContinueAsGuest?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSuccess, onContinueAsGuest }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPopupBlocked, setIsPopupBlocked] = useState(false);
  const [customName, setCustomName] = useState("");
  const [showDirectEnter, setShowDirectEnter] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsPopupBlocked(false);
      const profile = await loginWithGoogle();
      onSuccess(profile);
    } catch (err: any) {
      console.warn("Google login status:", err);
      if (
        err?.message?.includes("pop-up") ||
        err?.message?.includes("popup") ||
        err?.code === "auth/popup-blocked"
      ) {
        setIsPopupBlocked(true);
        setError("Browser preview ne Google pop-up ko block kiya hai. Aap niche 'Direct Student Login' se turant enter kar sakte hain!");
      } else {
        setError(err?.message || "Google Sign-In verify nahi ho saka. Niche se direct enter karein.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDirectStudentLogin = () => {
    const name = customName.trim() || "Scholar Student";
    const guestUser = createGuestSession(name);
    onSuccess(guestUser);
  };

  return (
    <div className="min-h-screen bg-[#090d16] flex flex-col items-center justify-center p-4 text-white selection:bg-amber-500 selection:text-black">
      {/* Background soft glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm sm:max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6 text-center">
        
        {/* App Logo */}
        <div className="space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black text-2xl shadow-xl shadow-amber-500/25">
            S.S
          </div>

          <div className="inline-block bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-[10px] font-bold text-amber-400 tracking-wider uppercase">
            Founded by Shahid Ahmad Sheikh
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight">
            S.S AI Study Guru
          </h1>
          <p className="text-xs text-slate-400">
            Education, Legal Drafting & Multi-Department Suite
          </p>
        </div>

        {/* Feature summary */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-left space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs pb-1 border-b border-slate-800/60">
            <GraduationCap className="w-4 h-4" />
            <span>Welcome Scholar</span>
          </div>
          <div className="space-y-1.5 text-[11px] text-slate-300 pt-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Full AI Study Guru chat & verified civil court templates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Personal study progress and documents safely preserved</span>
            </div>
          </div>
        </div>

        {/* Error notification if any */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5 text-left">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-amber-300">Notice:</p>
              <p className="text-[11px] text-slate-300">{error}</p>
            </div>
          </div>
        )}

        {/* 1-Click Google Sign In Button */}
        <div className="space-y-3 pt-1">
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

          {/* Quick Instant Enter option (Works in all browsers & iframes even if popups are blocked) */}
          <div className="pt-2">
            {!showDirectEnter ? (
              <button
                onClick={() => setShowDirectEnter(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-2 border border-slate-700/60"
              >
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Instant Student Login (No Pop-up)</span>
              </button>
            ) : (
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-amber-500/30 space-y-2.5 animate-in fade-in">
                <input
                  type="text"
                  placeholder="Apna Naam likhein (e.g. Shahid)"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={handleDirectStudentLogin}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-extrabold text-xs transition cursor-pointer shadow-md"
                >
                  Enter S.S AI Study Guru →
                </button>
              </div>
            )}
          </div>

          {/* Guest Mode fallback */}
          {onContinueAsGuest && (
            <button
              onClick={onContinueAsGuest}
              className="text-xs text-slate-400 hover:text-amber-400 transition cursor-pointer font-medium py-1"
            >
              Skip & Continue as Guest →
            </button>
          )}

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official Google Firebase Authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
