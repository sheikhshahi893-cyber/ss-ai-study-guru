import React, { useState } from "react";
import { Layers, ChevronLeft, ChevronRight, RotateCw, CheckCircle2 } from "lucide-react";
import { flashcards } from "../data/flashcards";

export const FlashcardsDeck: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const card = flashcards[currentIdx] || flashcards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIdx((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIdx((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Interactive 3D Revision Flashcards</h3>
            <p className="text-xs text-slate-500">Active recall deck for exam formulas & scientific laws</p>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
          Card {currentIdx + 1} of {flashcards.length}
        </span>
      </div>

      {/* Flashcard Area */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className={`min-h-[220px] p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between select-none ${
          isFlipped
            ? "bg-slate-950 text-white border-slate-900 shadow-lg"
            : "bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-300 text-slate-900 shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
              isFlipped ? "bg-amber-400 text-slate-950" : "bg-amber-100 text-amber-900"
            }`}
          >
            {card.subject}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <RotateCw className="w-3.5 h-3.5" />
            <span>{isFlipped ? "Answer Side (Tap to flip back)" : "Question Side (Tap to reveal)"}</span>
          </span>
        </div>

        <div className="text-center py-4 space-y-2">
          {!isFlipped ? (
            <>
              <h4 className="text-lg font-extrabold text-slate-900">{card.title}</h4>
              <p className="text-xs text-slate-500">What is the formula and variable definition?</p>
            </>
          ) : (
            <>
              <div className="text-xl font-mono font-black text-amber-300 tracking-wide">{card.formula}</div>
              <div className="text-xs text-slate-300 mt-2">{card.variables}</div>
              {card.example && (
                <div className="text-[11px] text-emerald-400 bg-emerald-950/40 p-2 rounded-lg mt-2 inline-block">
                  Example: {card.example}
                </div>
              )}
            </>
          )}
        </div>

        <div className="text-center text-[10px] text-slate-400">
          {isFlipped ? "Pro tip: Test yourself aloud before flipping!" : "Click anywhere to reveal formula"}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-1.5">
          {flashcards.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIdx ? "w-5 bg-amber-500" : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1 transition cursor-pointer shadow-xs"
        >
          <span>Next Card</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
