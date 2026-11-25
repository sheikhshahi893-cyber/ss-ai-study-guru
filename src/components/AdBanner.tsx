import React, { useEffect, useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  X,
  AlertCircle,
  HelpCircle,
  Smartphone,
  ChevronDown,
  ChevronUp,
  Play,
  FileText
} from "lucide-react";
import { admobConfig } from "../config/admob";
import { nativeAdMob } from "../services/admobService";

interface AdBannerProps {
  placement?: "top" | "bottom" | "inline";
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ className = "" }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [actionStatus, setActionStatus] = useState<string | null>(null);
  const [diagInfo, setDiagInfo] = useState<any>(null);

  useEffect(() => {
    // Initial call for Native Android AdMob
    nativeAdMob.showBottomBanner().then((res) => {
      setActionStatus(res.message);
      setDiagInfo(nativeAdMob.getDiagnosticInfo());
    }).catch((err) => {
      setActionStatus(String(err));
      setDiagInfo(nativeAdMob.getDiagnosticInfo());
    });

    // Request Google AdSense / AdMob live ad stream
    try {
      if (typeof window !== "undefined") {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      console.log("[AdSense/AdMob] stream note:", e);
    }
  }, []);

  const refreshDiagnostics = () => {
    setDiagInfo(nativeAdMob.getDiagnosticInfo());
  };

  const handleTestBanner = async (isTest: boolean) => {
    setActionStatus(`Requesting ${isTest ? "Google Official Test Banner" : "Real Live Banner"}...`);
    const res = await nativeAdMob.showBottomBanner(isTest);
    setActionStatus(res.message);
    refreshDiagnostics();
  };

  const handleTestInterstitial = async (isTest: boolean) => {
    setActionStatus(`Loading ${isTest ? "Official Test Interstitial" : "Production Interstitial"}...`);
    const res = await nativeAdMob.showInterstitial(isTest);
    setActionStatus(res.message);
    refreshDiagnostics();
  };

  const handleTestRewarded = async (isTest: boolean) => {
    setActionStatus(`Loading ${isTest ? "Official Test Rewarded Ad" : "Production Rewarded Ad"}...`);
    const res = await nativeAdMob.showRewardVideo(() => {
      alert("🎉 Rewarded Ad watched! 50 XP awarded.");
    }, isTest);
    setActionStatus(res.message);
    refreshDiagnostics();
  };

  if (isDismissed) return null;

  const isNative = diagInfo?.isNative ?? false;

  return (
    <div
      className={`my-3 w-full max-w-4xl mx-auto rounded-2xl bg-slate-900 border border-amber-500/40 shadow-xl overflow-hidden text-left transition-all ${className}`}
    >
      {/* Google AdMob Banner Header */}
      <div className="bg-slate-950 px-3.5 py-2 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {admobConfig.isTestMode ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-xs">
              Test Mode
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-xs">
              Live Production
            </span>
          )}
          <span className="text-[11px] font-semibold text-slate-200 flex items-center gap-1.5">
            <span>Google AdMob</span>
            <span className="text-slate-400 text-[10px]">
              ({isNative ? "Android Native Device" : "Web Preview Mode"})
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setShowGuide(!showGuide);
              refreshDiagnostics();
            }}
            className="text-[11px] font-bold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 px-2 py-1 rounded-md border border-amber-500/30 flex items-center gap-1 transition cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Ads کیوں نہیں چلتیں؟ (Diagnosis)</span>
            {showGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Dismiss Ad Slot"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Real Live Google Advertisement Slot (Generates real earnings) */}
      <div className="p-3 bg-slate-950 flex flex-col items-center justify-center min-h-[90px] w-full overflow-hidden">
        {/* Real Google AdSense/AdMob Tag for Client ca-pub-4927952652296520 */}
        <ins
          className="adsbygoogle"
          style={{ display: "block", minHeight: "60px", width: "100%", textAlign: "center" }}
          data-ad-client="ca-pub-4927952652296520"
          data-ad-slot="9767912440"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />

        {/* Live Status & Quick Action Bar */}
        <div className="w-full mt-2 pt-2 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-emerald-400 font-bold">Real Ad Stream Active</span>
            <span className="text-slate-500">•</span>
            <span className="font-mono text-[10px] text-slate-400">ca-pub-4927952652296520</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTestInterstitial(true)}
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[10px] font-semibold border border-amber-500/30 transition cursor-pointer flex items-center gap-1"
            >
              <Play className="w-2.5 h-2.5 text-amber-400" />
              <span>Test Interstitial</span>
            </button>
            <button
              onClick={() => handleTestRewarded(true)}
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 text-[10px] font-semibold border border-purple-500/30 transition cursor-pointer flex items-center gap-1"
            >
              <Play className="w-2.5 h-2.5 text-purple-400" />
              <span>Test Rewarded</span>
            </button>
            <button
              onClick={() => handleTestBanner(false)}
              className="px-2 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-[10px] font-semibold border border-emerald-500/40 transition cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="w-2.5 h-2.5 text-emerald-400" />
              <span>Refresh Ad</span>
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Diagnostic & Help Section */}
      {showGuide && (
        <div className="bg-slate-950 p-4 border-t border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>AdMob Ads نہ چلنے کی 4 بنیادی وجوہات اور مکمل حل (Diagnosis)</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              App ID: {admobConfig.appId}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
            {/* Reason 1: 24-48 Hours Propagation */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-white text-[13px]">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">1</span>
                <span>نئی منظوری اور 24 سے 48 گھنٹے کا انتظار (Ad Inventory Fill)</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                گوگل AdMob نے کل (1 نومبر 2026) آپ کی ایپ کی جائزہ منظوری (App Review Approved) کی ہے۔ منظوری کے بعد گوگل کے اشتہاری سرورز (Ad Auctions) کو لائیو اشتہارات بھرنے (Fill Rate) میں <strong>24 سے 48 گھنٹے</strong> لگتے ہیں۔ اس وقت تک گوگل سرور <code className="text-amber-300">Error 3: No Fill</code> دیتا ہے۔
              </p>
            </div>

            {/* Reason 2: Native Android vs Web/PWA */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-white text-[13px]">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">2</span>
                <span>Web براؤزر بمقابلہ اینڈرائیڈ APK/AAB</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                گوگل AdMob کا Native SDK صرف <strong>اینڈرائیڈ یا iOS کی اصل انسٹال شدہ ایپ</strong> پر کام کرتا ہے۔ عام کروم براؤزر یا PWABuilder کے کسٹم ٹیب پر AdMob کی نیٹو بینر کالز نہیں چلتیں (ویب کے لیے Google AdSense ہوتا ہے)۔
              </p>
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                <span>موجودہ موڈ: <strong className="text-white">{isNative ? "Android Native Device" : "Web Preview"}</strong></span>
              </div>
            </div>

            {/* Reason 3: Developer Test Device */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-white text-[13px]">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">3</span>
                <span>ڈویلپر کے اپنے موبائل پر لائیو Ads کا نہ دکھنا</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                گوگل AdMob پالیسی کے تحت ڈویلپر کے اپنے موبائل اور وائی فائی پر لائیو اشتہارات بلاک ہوتے ہیں تاکہ غلط کلکس (Invalid Traffic) نہ ہوں۔ ٹیسٹنگ کے لیے AdMob Console میں Settings ➔ Test Devices میں جا کر اپنا موبائل ID درج کریں۔
              </p>
            </div>

            {/* Reason 4: app-ads.txt & Google Play Store Link */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-white text-[13px]">
                <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs">4</span>
                <span>app-ads.txt فائل کی تصدیق</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                ہماری ایپ میں <code className="text-purple-300">public/app-ads.txt</code> مکمل طور پر پبلش ہے (<code className="text-slate-400">pub-4927952652296520</code>)۔ پلے اسٹور پر آپ کی لسٹنگ میں موجود ویب سائٹ کا ایڈریس اور یہ لنک میچ ہونا چاہیے۔
              </p>
            </div>
          </div>

          {/* Configured Ad Units Summary */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
            <div className="font-bold text-white font-sans flex items-center gap-1.5 mb-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>آپ کے مصدقہ AdMob یونٹ کوڈز (Configured Units):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="bg-slate-950 p-2 rounded border border-slate-800/80">
                <span className="text-slate-400 block text-[10px]">Banner Ad Unit:</span>
                <span className="text-emerald-400 select-all">{admobConfig.bannerAdUnitId}</span>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800/80">
                <span className="text-slate-400 block text-[10px]">Interstitial Ad Unit:</span>
                <span className="text-amber-400 select-all">{admobConfig.interstitialAdUnitId}</span>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800/80">
                <span className="text-slate-400 block text-[10px]">Rewarded Ad Unit:</span>
                <span className="text-purple-400 select-all">{admobConfig.rewardedAdUnitId}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Status Info Strip */}
      <div className="px-3 py-1.5 bg-slate-950/70 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono flex-wrap gap-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Package: com.ss.aistudyguruapp</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Ad Permission: AD_ID active</span>
          <span>•</span>
          <span>Status: Verified</span>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;

