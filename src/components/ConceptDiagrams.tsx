import React, { useState } from "react";
import { GitBranch, Sun, Compass, Network } from "lucide-react";

export const ConceptDiagrams: React.FC = () => {
  const [selectedDiagram, setSelectedDiagram] = useState<"photosynthesis" | "parabola" | "cpc_stay">("photosynthesis");

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-100 text-cyan-700">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Visual Concept Diagrams & Flowcharts</h3>
            <p className="text-xs text-slate-500">Interactive textbook structures and legal procedure pathways</p>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 font-bold border border-cyan-200">
          Flow Architecture
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedDiagram("photosynthesis")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            selectedDiagram === "photosynthesis" ? "bg-slate-950 text-amber-400 shadow-xs" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Biology: Photosynthesis Cycle
        </button>
        <button
          onClick={() => setSelectedDiagram("parabola")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            selectedDiagram === "parabola" ? "bg-slate-950 text-amber-400 shadow-xs" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Math: Parabola & Discriminant
        </button>
        <button
          onClick={() => setSelectedDiagram("cpc_stay")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            selectedDiagram === "cpc_stay" ? "bg-slate-950 text-amber-400 shadow-xs" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Law: Civil Court Stay Order Process
        </button>
      </div>

      {/* Diagram Render */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
        {selectedDiagram === "photosynthesis" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-slate-900">Photosynthesis Mechanism: Light vs Dark Reactions</span>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-2">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>1. Light-Dependent Reactions (Thylakoids)</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Sunlight hits Chlorophyll in thylakoid membranes ➔ Water molecules split (Photolysis) ➔ Releases O₂ as byproduct ➔ Generates ATP & NADPH energy carriers.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl space-y-2">
                <div className="font-bold text-blue-900 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-blue-600" />
                  <span>2. Calvin Cycle / Dark Reaction (Stroma)</span>
                </div>
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  CO₂ enters through leaf stomata ➔ RuBisCO enzyme fixes carbon ➔ Uses ATP & NADPH from light reaction ➔ Produces high-energy Glucose (C₆H₁₂O₆).
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedDiagram === "parabola" && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-900">Parabola Curvature & Discriminant (D = b² - 4ac)</span>
              <span className="font-mono text-cyan-700 font-bold">y = ax² + bx + c</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-emerald-700">D &gt; 0</div>
                <p className="text-[11px] text-slate-600">Crosses X-axis at 2 distinct real points.</p>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-amber-700">D = 0</div>
                <p className="text-[11px] text-slate-600">Touches X-axis at 1 vertex point (tangent).</p>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-rose-700">D &lt; 0</div>
                <p className="text-[11px] text-slate-600">Does not touch X-axis (complex roots).</p>
              </div>
            </div>
          </div>
        )}

        {selectedDiagram === "cpc_stay" && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-900">Procedural Stages of Stay Order Application (Order 39 Rule 1 & 2 CPC)</span>
              <span className="font-mono text-amber-700 font-bold">Civil Court Flow</span>
            </div>
            <div className="space-y-2 font-mono text-[11px] text-slate-700">
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg">1. Institution of Main Plaint + Filing of Stay Application with Affidavit of Urgency</div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg">2. Preliminary Hearing & Scrutiny of 3 Golden Essentials by Civil Judge</div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg">3. Issuance of Notice to Opposite Party + Ad-interim Status Quo if imminent irreparable damage</div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg">4. Written Reply by Defendant ➔ Arguments on Injunction ➔ Final Confirmation/Vacation Order</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
