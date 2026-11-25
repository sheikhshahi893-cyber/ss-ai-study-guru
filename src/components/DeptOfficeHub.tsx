import React, { useState } from "react";
import { Building2, Copy, Check, Info } from "lucide-react";
import { deptTemplates } from "../data/deptTemplates";
import { DeptCategory, DeptSubTemplate } from "../types";

export const DeptOfficeHub: React.FC = () => {
  const [selectedDeptId, setSelectedDeptId] = useState<string>(deptTemplates[0]?.id || "");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    deptTemplates[0]?.templates?.[0]?.id || ""
  );
  const [copied, setCopied] = useState<boolean>(false);

  const activeDept =
    (deptTemplates.find((d) => d.id === selectedDeptId) as unknown as DeptCategory) ||
    (deptTemplates[0] as unknown as DeptCategory);
  const activeTemplate =
    (activeDept?.templates.find((t) => t.id === selectedTemplateId) as unknown as DeptSubTemplate) ||
    (activeDept?.templates[0] as unknown as DeptSubTemplate);

  const handleCopy = () => {
    if (activeTemplate?.content) {
      navigator.clipboard.writeText(activeTemplate.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Departments & Official Office Formats</h3>
            <p className="text-xs text-slate-500">
              Revenue & Patwar, Teachers & Exam Duty, Banking NI Act 138, Health, Govt NOCs
            </p>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
          Official Desk
        </span>
      </div>

      {/* Dept Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {deptTemplates.map((d) => {
          const isSelected = d.id === selectedDeptId;
          return (
            <button
              key={d.id}
              onClick={() => {
                setSelectedDeptId(d.id);
                if (d.templates.length > 0) {
                  setSelectedTemplateId(d.templates[0].id);
                }
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1 ${
                isSelected
                  ? "bg-emerald-700 text-white font-bold shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>{d.icon}</span>
              <span>{d.title}</span>
            </button>
          );
        })}
      </div>

      {/* Grid: Sub-templates + Draft Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Sub-template list */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-600 block mb-1">
            Available Application Templates:
          </span>
          {activeDept?.templates.map((t) => {
            const isSelected = t.id === activeTemplate?.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTemplateId(t.id)}
                className={`w-full text-left p-3 rounded-xl border transition cursor-pointer space-y-1 ${
                  isSelected
                    ? "bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs"
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-900"
                }`}
              >
                <div className="text-xs font-bold leading-tight">{t.title}</div>
                <div className={`text-[10px] font-urdu ${isSelected ? "text-emerald-100" : "text-emerald-700"}`}>
                  {t.urduTitle}
                </div>
                <div className={`text-[10px] line-clamp-1 ${isSelected ? "text-emerald-100" : "text-slate-500"}`}>
                  {t.purpose}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Draft Viewer */}
        <div className="md:col-span-2 bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <h4 className="font-bold text-slate-900 text-xs">{activeTemplate?.title}</h4>
                <p className="text-[11px] text-emerald-700 font-urdu">{activeTemplate?.urduTitle}</p>
                <p className="text-[10px] text-slate-500">{activeTemplate?.purpose}</p>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-100 transition shadow-2xs cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Form"}</span>
              </button>
            </div>

            {activeTemplate?.fields && activeTemplate.fields.length > 0 && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Key Fillable Particulars / Form Fields:</span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[10px]">
                  {activeTemplate.fields.map((f, idx) => (
                    <div key={idx} className="bg-white/80 p-1.5 rounded border border-emerald-100">
                      <span className="font-bold text-slate-700">{f.label}:</span>{" "}
                      <span className="text-slate-500">{f.placeholder}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800 whitespace-pre-wrap max-h-80 overflow-y-auto leading-relaxed custom-scrollbar">
              {activeTemplate?.content}
            </div>
          </div>

          <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-200">
            Standard Departmental Application Format • Verified by Administrative Consultants
          </div>
        </div>
      </div>
    </div>
  );
};
