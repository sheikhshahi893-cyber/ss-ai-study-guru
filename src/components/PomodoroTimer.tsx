import React, { useState, useEffect } from "react";
import { Timer as TimerIcon, Play, Pause, RotateCcw, Bell } from "lucide-react";

export const PomodoroTimer: React.FC = () => {
  const [mode, setMode] = useState<"study" | "break">("study");
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === "study") {
        setMode("break");
        setTimeLeft(5 * 60);
      } else {
        setMode("study");
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const toggleRun = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === "study" ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatted = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-orange-100 text-orange-700">
            <TimerIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Pomodoro Deep Focus Timer</h3>
            <p className="text-xs text-slate-500">25-minute concentrated sprint + 5-minute cognitive rest</p>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 font-bold border border-orange-200">
          Focus Engine
        </span>
      </div>

      {/* Timer Screen */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 text-center space-y-4 shadow-md">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => {
              setMode("study");
              setTimeLeft(25 * 60);
              setIsRunning(false);
            }}
            className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
              mode === "study" ? "bg-amber-400 text-slate-950" : "bg-slate-800 text-slate-400"
            }`}
          >
            Deep Study (25m)
          </button>
          <button
            onClick={() => {
              setMode("break");
              setTimeLeft(5 * 60);
              setIsRunning(false);
            }}
            className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
              mode === "break" ? "bg-emerald-400 text-slate-950" : "bg-slate-800 text-slate-400"
            }`}
          >
            Rest Break (5m)
          </button>
        </div>

        <div className="text-5xl sm:text-6xl font-black font-mono tracking-widest text-amber-300">
          {formatted}
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={toggleRun}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-xs"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
            <span>{isRunning ? "Pause Sprint" : "Start Sprint"}</span>
          </button>

          <button
            onClick={resetTimer}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
