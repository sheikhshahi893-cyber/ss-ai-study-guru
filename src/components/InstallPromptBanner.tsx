import React, { useState, useEffect } from "react";
import { Download, X, Smartphone, Sparkles } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const InstallPromptBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    } else {
      alert("To install, tap the 3 dots (⋮) on your mobile browser and select 'Add to Home screen' / 'Install App'.");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 bg-slate-900 border border-amber-500/50 rounded-2xl p-4 shadow-2xl text-white flex items-center justify-between gap-3 animate-slide-up">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black text-sm">
          S.S
        </div>
        <div>
          <h4 className="font-bold text-xs text-white">Install S.S AI Study Guru</h4>
          <p className="text-[11px] text-amber-400">Fast offline study access on your home screen</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={handleInstall}
          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
        >
          Install
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default InstallPromptBanner;
