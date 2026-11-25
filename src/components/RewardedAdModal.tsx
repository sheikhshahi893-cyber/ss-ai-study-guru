import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Gift,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { admobConfig } from "../config/admob";

interface RewardedAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardEarned: () => void;
  rewardTitle?: string;
  durationSeconds?: number;
  description?: string;
}

// Sample Google Video streams for AdMob video testing
const VIDEO_ADS = [
  {
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    title: "Chromecast with Google TV - Official Partner",
    sponsor: "Google Partner Network",
    adUnit: admobConfig.rewardedAdUnitId,
  },
  {
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    title: "Google Pixel & Android Ecosystem",
    sponsor: "Google Mobile Ads (AdMob)",
    adUnit: admobConfig.rewardedAdUnitId,
  },
];

export const RewardedAdModal: React.FC<RewardedAdModalProps> = ({
  isOpen,
  onClose,
  onRewardEarned,
  rewardTitle = "Unlock Handwritten Document Download",
  durationSeconds = 15,
  description = "Watch this sponsored video to unlock your full HD document download.",
}) => {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [activeAdIndex] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentAd = VIDEO_ADS[activeAdIndex] || VIDEO_ADS[0];

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isOpen) {
      setTimeLeft(durationSeconds);
      setIsCompleted(false);
      setIsPlaying(true);
      setVideoError(false);

      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // Autoplay policy might require mute
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => setVideoError(true));
          }
        });
      }

      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timer) clearInterval(timer);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOpen, durationSeconds]);

  if (!isOpen) return null;

  const handleClaim = () => {
    onRewardEarned();
    onClose();
    setIsCompleted(false);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const progressPercent = Math.min(
    100,
    Math.max(0, ((durationSeconds - timeLeft) / durationSeconds) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-400 text-slate-950 tracking-wider">
              Ad
            </span>
            <span className="text-xs font-semibold text-slate-300 truncate max-w-[220px]">
              {currentAd.sponsor}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isCompleted ? (
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                Reward in {timeLeft}s
              </span>
            ) : (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ready!
              </span>
            )}

            {isCompleted && (
              <button
                onClick={onClose}
                className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          {!videoError ? (
            <video
              ref={videoRef}
              src={currentAd.url}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted={isMuted}
              loop
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={() => setVideoError(true)}
            />
          ) : (
            // Fallback screen if video codec fails
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-amber-950/50 p-6 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 animate-pulse">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Sponsored Educational Partner</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Supporting free education and instant document downloads.
                </p>
              </div>
            </div>
          )}

          {/* Video Overlay Controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none flex flex-col justify-between p-3">
            <div className="flex items-center justify-between pointer-events-auto">
              <div className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] text-slate-300 border border-white/10 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Sponsored Video</span>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white border border-white/10 transition cursor-pointer"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white border border-white/10 transition cursor-pointer"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              <div className="text-[11px] font-mono text-amber-300 bg-black/60 px-2 py-1 rounded-lg border border-white/10">
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Modal Footer / Reward Actions */}
        <div className="p-5 space-y-4 bg-slate-900">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-bold text-sm text-white">{rewardTitle}</h4>
              <p className="text-xs text-slate-400">
                {isCompleted
                  ? "Sponsorship verification complete! Click below to claim and start download."
                  : description}
              </p>
            </div>
          </div>

          {isCompleted ? (
            <button
              onClick={handleClaim}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer transform active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Claim & Start Download</span>
            </button>
          ) : (
            <div className="w-full py-2.5 rounded-xl bg-slate-800/80 text-slate-400 text-xs font-semibold text-center border border-slate-700/50 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Watching Video Ad... ({timeLeft}s left to unlock)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardedAdModal;
