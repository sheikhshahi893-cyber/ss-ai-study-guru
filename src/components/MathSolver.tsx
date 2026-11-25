import React, { useState } from "react";
import { Calculator, CheckCircle2, RefreshCw } from "lucide-react";

export const MathSolver: React.FC = () => {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-5);
  const [c, setC] = useState<number>(6);

  // Discriminant
  const discriminant = b * b - 4 * a * c;
  let root1: string = "";
  let root2: string = "";
  let rootType: string = "";

  if (a === 0) {
    rootType = "Not a quadratic equation (a cannot be 0)";
  } else if (discriminant > 0) {
    const r1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const r2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    root1 = Number.isInteger(r1) ? r1.toString() : r1.toFixed(3);
    root2 = Number.isInteger(r2) ? r2.toString() : r2.toFixed(3);
    rootType = "Two distinct real roots (D > 0)";
  } else if (discriminant === 0) {
    const r = -b / (2 * a);
    root1 = Number.isInteger(r) ? r.toString() : r.toFixed(3);
    root2 = root1;
    rootType = "One real repeated root (D = 0)";
  } else {
    const realPart = (-b / (2 * a)).toFixed(2);
    const imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(2);
    root1 = `${realPart} + ${imagPart}i`;
    root2 = `${realPart} - ${imagPart}i`;
    rootType = "Two complex / imaginary roots (D < 0)";
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-100 text-cyan-700">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Interactive Quadratic Solver & Proofs</h3>
            <p className="text-xs text-slate-500">Calculate roots, discriminant, and step-by-step breakdown</p>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 font-bold border border-cyan-200">
          ax² + bx + c = 0
        </span>
      </div>

      {/* Input Equation Form */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="text-xs font-bold text-slate-700">Enter Equation Coefficients:</div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Coefficient a (x²)</label>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(parseFloat(e.target.value) || 0)}
              className="w-full text-xs font-bold p-2 rounded-lg border border-slate-200 bg-white text-slate-900"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Coefficient b (x)</label>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(parseFloat(e.target.value) || 0)}
              className="w-full text-xs font-bold p-2 rounded-lg border border-slate-200 bg-white text-slate-900"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Constant c</label>
            <input
              type="number"
              value={c}
              onChange={(e) => setC(parseFloat(e.target.value) || 0)}
              className="w-full text-xs font-bold p-2 rounded-lg border border-slate-200 bg-white text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Visual Step-by-Step Breakdown */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold text-amber-400">Equation: {a}x² + ({b})x + ({c}) = 0</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
            {rootType}
          </span>
        </div>

        <div className="space-y-2 font-mono text-[11px] text-slate-300">
          <div>1. Compute Discriminant D = b² - 4ac = ({b})² - 4({a})({c}) = <span className="text-amber-300 font-bold">{discriminant}</span></div>
          <div>2. Apply Quadratic Formula: x = [-b ± √D] / 2a</div>
          <div>3. Substitute values: x = [-({b}) ± √({discriminant})] / 2({a})</div>
        </div>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <span className="font-bold text-slate-300 text-xs">Final Roots:</span>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-lg font-bold">
              x₁ = {root1}
            </div>
            <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-lg font-bold">
              x₂ = {root2}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
