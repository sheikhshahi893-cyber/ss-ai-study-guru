import React from "react";
import { X, Award, Flame, BookOpen, Edit3, Sparkles, Trophy, CheckCircle2 } from "lucide-react";
import { UserXPData } from "../utils/xpManager";

interface UserXPModalProps {
  isOpen: boolean;
  onClose: () => void;
  xpData: UserXPData;
}

export const UserXPModal: React.FC<UserXPModalProps> = ({ isOpen, onClose, xpData }) => {
  if (!isOpen) return null;

  const currentLevelMin =
    xpData.level === 1 ? 0 : xpData.level === 2 ? 100 : xpData.level === 3 ? 300 : xpData.level === 4 ? 600 : 1000;
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round(((xpData.xp - currentLevelMin) / (Math.max(xpData.nextLevelXP - currentLevelMin, 1))) * 100))
  );

  const tiers = [
    { level: 1, name: "Scholar Rookie", badge: "🥉", xpReq: "0 - 100 XP", desc: "Started the learning journey" },
    { level: 2, name: "Silver Explorer", badge: "🥈", xpReq: "100 - 300 XP", desc: "Consistent daily study master" },
    { level: 3, name: "Class Topper", badge: "🥇", xpReq: "300 - 600 XP", desc: "Top 5% student revision rank" },
    { level: 4, name: "Master Genius", badge: "💎", xpReq: "600 - 1000 XP", desc: "Expert concept problem solver" },
    { level: 5, name: "S.S Gold Scholar", badge: "👑", xpReq: "1000+ XP", desc: "Ultimate academic champion rank" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-amber-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/30 transition text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-3xl shadow-inner">
              {xpData.levelBadge}
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-100">
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span>Level {xpData.level} Scholar</span>
              </div>
              <h3 className="text-xl font-black text-white leading-tight">
                {xpData.levelTitle}
              </h3>
              <p className="text-xs text-amber-100/90 font-medium">
                S.S AI Study Guru Gamified Rank
              </p>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-4 bg-black/25 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <div className="flex items-center justify-between text-xs font-bold text-white mb-1.5">
              <span>{xpData.xp} Total XP</span>
              <span className="text-amber-200">{xpData.nextLevelXP} XP for Level {xpData.level + 1}</span>
            </div>
            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-yellow-300 to-amber-300 h-full rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-amber-100 text-right mt-1 font-semibold">
              {Math.max(0, xpData.nextLevelXP - xpData.xp)} XP to next level!
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-slate-800 text-sm">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-2.5">
              <div className="flex items-center justify-center text-amber-600 mb-1">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />
              </div>
              <div className="text-lg font-black text-slate-900">{xpData.streakDays} Days</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase">Daily Streak</div>
            </div>

            <div className="bg-blue-50 border border-blue-200/80 rounded-2xl p-2.5">
              <div className="flex items-center justify-center text-blue-600 mb-1">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-lg font-black text-slate-900">{xpData.questionsCount}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase">Questions Solved</div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-2.5">
              <div className="flex items-center justify-center text-emerald-600 mb-1">
                <Edit3 className="w-5 h-5" />
              </div>
              <div className="text-lg font-black text-slate-900">{xpData.notesCount}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase">Notes Made</div>
            </div>
          </div>

          {/* How to Earn More XP */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3.5 space-y-2">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>How to Earn XP Points:</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">
                  +10
                </span>
                <span>Ask any question</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">
                  +15
                </span>
                <span>Download PDF Notes</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">
                  +5
                </span>
                <span>Listen in HD Voice</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">
                  +20
                </span>
                <span>Daily Study Streak</span>
              </div>
            </div>
          </div>

          {/* Ranks Tier Hierarchy */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Scholar Levels & Badges:</span>
            </h4>
            <div className="space-y-1.5">
              {tiers.map((t) => {
                const isCurrent = t.level === xpData.level;
                const isUnlocked = xpData.level >= t.level;
                return (
                  <div
                    key={t.level}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                      isCurrent
                        ? "bg-amber-50/90 border-amber-400 ring-2 ring-amber-300 shadow-xs"
                        : isUnlocked
                        ? "bg-white border-slate-200 text-slate-800"
                        : "bg-slate-50/50 border-slate-100 text-slate-400 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl select-none">{t.badge}</span>
                      <div>
                        <div className="font-bold text-xs flex items-center gap-1.5">
                          <span>{t.name}</span>
                          {isCurrent && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 text-[9px] font-black uppercase">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">{t.desc}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-slate-600">{t.xpReq}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1 font-semibold text-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
            <span>S.S AI Study Guru • By Shahid Ahmad Sheikh</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
