import React, { useState } from "react";
import {
  X,
  Smartphone,
  Download,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Layers,
  Copy,
  Check,
  Award,
  Image as ImageIcon,
  Tv,
  AlertTriangle,
  PlayCircle,
  Activity,
  Info,
} from "lucide-react";
import appIconImg from "../assets/images/app_icon_1787995650193.jpg";
import featureGraphicImg from "../assets/images/feature_graphic_1787995664734.jpg";
import { Capacitor } from "@capacitor/core";
import { nativeAdMob } from "../services/admobService";
import { admobConfig } from "../config/admob";

interface StoreAssetsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreAssetsModal: React.FC<StoreAssetsModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [adDiagnosticMsg, setAdDiagnosticMsg] = useState<string | null>(null);
  const isNative = Capacitor.isNativePlatform();

  const handleTestBanner = async () => {
    if (!isNative) {
      setAdDiagnosticMsg("Web Browser Warning: AdMob Native SDK sirf Android APK/AAB build mein chalta hai. Chrome/Web browser mein AdMob native ads nahi chalte.");
      return;
    }
    setAdDiagnosticMsg("Testing Banner Ad request...");
    const res = await nativeAdMob.showBottomBanner();
    setAdDiagnosticMsg(res ? "Banner Ad request sent! Agar ad display na ho to AdMob status 'Ready' hona zaroori hai." : "Banner ad load failed. Google AdMob Error Code 3 (No Fill) ya account approval pending ho sakta hai.");
  };

  const handleTestInterstitial = async () => {
    if (!isNative) {
      setAdDiagnosticMsg("Web Browser Warning: Interstitial Ad sirf Android mobile app mein chalti hai.");
      return;
    }
    setAdDiagnosticMsg("Preparing Interstitial Ad...");
    const res = await nativeAdMob.showInterstitial();
    setAdDiagnosticMsg(res ? "Interstitial Ad displayed!" : "Interstitial load failed. Fill rate ya ad limits check karein.");
  };

  const handleTestRewarded = async () => {
    if (!isNative) {
      setAdDiagnosticMsg("Web Browser Warning: Rewarded Video Ad sirf Android APK mein chalta hai.");
      return;
    }
    setAdDiagnosticMsg("Preparing Rewarded Video...");
    const res = await nativeAdMob.showRewardVideo(() => {
      setAdDiagnosticMsg("Rewarded Video Complete! Reward verified.");
    });
    setAdDiagnosticMsg(res ? "Rewarded Video displayed!" : "Rewarded ad load failed. AdMob No-Fill check karein.");
  };

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const storeListing = {
    title: "S.S AI Study Guru - Exam, Legal & Office Suite",
    shortDesc: "All-in-one AI study coach, Civil Court Stay petitions, revenue records, homework scanner & formulas by Shahid Ahmad Sheikh.",
    fullDesc: `S.S AI Study Guru is an advanced educational and professional drafting suite developed and founded by SHAHID AHMAD SHEIKH.

Key Capabilities:
• S.S AI Study Guru: Structured "Answer + Explain" methodology with instant live streaming.
• Civil Court & Legal Hub: Ready-to-use Order 39 Stay applications (CPC 1908), written statements, plaints, and legal notices.
• Revenue & Dept Office Hub: Land records, Fard Intikhab, teacher exam creators, banking notices, and RTI drafts.
• Homework Scanner: OCR text & question recognition with step-by-step solutions.
• Math & Science Solver: Formula cheat sheets, step-by-step arithmetic, and interactive flashcards.
• Regional Languages: Hinglish, Urdu, English, Kashmiri, Sindhi, Pashto, Punjabi, and Arabic.`,
  };

  const iconSizes = [
    { size: "512x512", name: "launchericon-512x512.png", type: "Play Store Master Icon" },
    { size: "192x192", name: "launchericon-192x192.png", type: "Android xxXHDP Icon" },
    { size: "144x144", name: "launchericon-144x144.png", type: "Android xxHDP Icon" },
    { size: "96x96", name: "launchericon-96x96.png", type: "Android xHDP Icon" },
    { size: "72x72", name: "launchericon-72x72.png", type: "Android HDP Icon" },
    { size: "48x48", name: "launchericon-48x48.png", type: "Android MDP Icon" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white space-y-5 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Google Play & App Store Deployment Assets</h3>
              <p className="text-xs text-slate-400">PWA Manifest, Icons, Feature Graphic & Metadata</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto custom-scrollbar pr-1">
          {/* Feature Graphic Banner Preview */}
          <div className="rounded-2xl overflow-hidden border border-amber-500/40 shadow-lg relative bg-slate-950">
            <img
              src={featureGraphicImg}
              alt="Feature Graphic"
              className="w-full h-44 object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-4 flex flex-col justify-end">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 mb-1 inline-block">
                    Official Feature Graphic 1024×500
                  </span>
                  <h4 className="text-base font-black text-amber-300">S.S AI STUDY GURU</h4>
                  <p className="text-[11px] text-slate-300">Founded by Shahid Ahmad Sheikh</p>
                </div>
                <img
                  src={appIconImg}
                  alt="App Icon"
                  className="w-12 h-12 rounded-xl border-2 border-amber-400 shadow-md object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Android Launcher Icons Grid */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Android Launcher Icons (PWA & APK Assets)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {iconSizes.map((icon, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                      S.S
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-white">{icon.size}</p>
                      <p className="text-[9px] text-slate-400 truncate max-w-[90px]">{icon.name}</p>
                    </div>
                  </div>
                  <a
                    href={`/android/${icon.name}`}
                    download={icon.name}
                    className="p-1 rounded-md bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition text-xs"
                    title="Download Icon"
                  >
                    <Download className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Store Listing Copy Box */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Verified Store Description</span>
            </h4>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-amber-400 font-bold">App Title (50 chars):</span>
                <button
                  onClick={() => handleCopy(storeListing.title, "title")}
                  className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white"
                >
                  {copiedKey === "title" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === "title" ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <p className="text-slate-200 font-medium bg-slate-900 p-2 rounded-lg">{storeListing.title}</p>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-amber-400 font-bold">Short Description (80 chars):</span>
                <button
                  onClick={() => handleCopy(storeListing.shortDesc, "short")}
                  className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white"
                >
                  {copiedKey === "short" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === "short" ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <p className="text-slate-200 bg-slate-900 p-2 rounded-lg">{storeListing.shortDesc}</p>
            </div>
          </div>

          {/* AdMob Live Diagnostic & Why Real Ads Don't Show Panel */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Tv className="w-3.5 h-3.5 text-amber-400" />
                <span>Google AdMob Live Diagnostic & Real Ads Status</span>
              </h4>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                isNative 
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                  : "bg-amber-500/20 text-amber-300 border-amber-500/30"
              }`}>
                {isNative ? "Android Native (APK)" : "Web Browser (Chrome/Preview)"}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">AdMob App ID:</span>
                  <span className="font-mono text-amber-300 select-all break-all">{admobConfig.appId}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Banner Ad Unit:</span>
                  <span className="font-mono text-slate-200 select-all break-all">{admobConfig.bannerAdUnitId}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Interstitial Ad Unit:</span>
                  <span className="font-mono text-slate-200 select-all break-all">{admobConfig.interstitialAdUnitId}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Rewarded Ad Unit:</span>
                  <span className="font-mono text-slate-200 select-all break-all">{admobConfig.rewardedAdUnitId}</span>
                </div>
              </div>

              {/* Live Test Buttons */}
              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] text-slate-400 font-semibold">Test Native AdMob Handlers on this Device:</p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={handleTestBanner}
                    className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition cursor-pointer border border-slate-700"
                  >
                    <Activity className="w-3 h-3 text-amber-400" />
                    <span>Banner</span>
                  </button>
                  <button
                    onClick={handleTestInterstitial}
                    className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition cursor-pointer border border-slate-700"
                  >
                    <Tv className="w-3 h-3 text-cyan-400" />
                    <span>Interstitial</span>
                  </button>
                  <button
                    onClick={handleTestRewarded}
                    className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition cursor-pointer border border-slate-700"
                  >
                    <PlayCircle className="w-3 h-3 text-emerald-400" />
                    <span>Rewarded</span>
                  </button>
                </div>
              </div>

              {/* Status Output */}
              {adDiagnosticMsg && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{adDiagnosticMsg}</span>
                </div>
              )}

              {/* Why real ads don't display checklist */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-[11px]">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Real Ads Na Chalne Ki 4 Badi Wujoohaat (Google Policies):</span>
                </div>
                <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                  <li>
                    <strong className="text-white">Web Browser vs Android APK:</strong> AdMob native SDK sirf Android ke installed APK/AAB mein chalta hai, Chrome/Web browser mein nahi chalta.
                  </li>
                  <li>
                    <strong className="text-white">AdMob App Status "Ready" (Review):</strong> Google AdMob console me app tab tak ads serve nahi karta jab tak Play Store link ho kar status <span className="text-emerald-400 font-bold">"Ready"</span> na ho jaye (status &quot;Requires Review&quot; par ads deliver nahi hotay).
                  </li>
                  <li>
                    <strong className="text-white">Google Play AD_ID Permission Error:</strong> Play Console me Production Release save karne ke liye Advertising ID declaration match hona zaroori hai.
                  </li>
                  <li>
                    <strong className="text-white">Error Code 3 (No Fill) & Ad Limit:</strong> Nayi app aur naye ad units par Google 24-48 ghante ad inventory match karne me leta hai aur traffic kam hone par ad limit lagata hai.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreAssetsModal;
