import React, { useState } from "react";
import { BookMarked, Search, Copy, Check } from "lucide-react";
import { formulaCards } from "../data/formulaCards";

export const FormulaCheatSheet: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = formulaCards.filter(
    (f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.formula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyFormula = (formula: string, id: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Formula Cheat Sheet & Quick Laws</h3>
            <p className="text-xs text-slate-500">Searchable quick revision formulas for Math, Physics, Chemistry</p>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-bold border border-teal-200">
          Formula Bank
        </span>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search formulas by name or subject (e.g. Newton, Quadratic, Ohm)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-teal-500 text-slate-900"
        />
      </div>

      {/* Formulas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((f) => (
          <div
            key={f.id}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-teal-300 transition space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 uppercase">
                  {f.subject}
                </span>
                <button
                  onClick={() => copyFormula(f.formula, f.id)}
                  className="text-slate-400 hover:text-slate-700 transition cursor-pointer"
                  title="Copy Formula"
                >
                  {copiedId === f.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <h4 className="text-xs font-bold text-slate-900">{f.name}</h4>
              <div className="p-2.5 bg-slate-900 text-amber-400 rounded-lg font-mono font-bold text-xs">
                {f.formula}
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">{f.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
