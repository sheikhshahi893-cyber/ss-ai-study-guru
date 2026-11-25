import React, { useState } from "react";
import {
  Scale,
  FileText,
  Copy,
  Check,
  AlertCircle,
  Download,
  Printer,
  Sparkles,
  Play,
  User,
  MapPin,
  Building,
  ShieldCheck,
  Search,
  Share2,
} from "lucide-react";
import { courtTemplates } from "../data/courtTemplates";
import { CourtTemplate } from "../types";
import { RewardedAdModal } from "./RewardedAdModal";

export const CivilCourtPleadings: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(courtTemplates[0]?.id || "");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Customizer form state
  const [courtName, setCourtName] = useState<string>("IN THE COURT OF LEARNED SUB-JUDGE / CIVIL JUDGE, SRINAGAR");
  const [plaintiffName, setPlaintiffName] = useState<string>("Mohammad Shafi Rather");
  const [plaintiffFather, setPlaintiffFather] = useState<string>("Ghulam Mohammad Rather");
  const [plaintiffAddress, setPlaintiffAddress] = useState<string>("R/o Baghat Barzulla, District Srinagar (J&K)");
  const [defendantName, setDefendantName] = useState<string>("Ghulam Nabi Bhat");
  const [defendantFather, setDefendantFather] = useState<string>("Abdul Ahad Bhat");
  const [defendantAddress, setDefendantAddress] = useState<string>("R/o Hyderpora, District Srinagar (J&K)");
  const [propertyDetails, setPropertyDetails] = useState<string>("Land measuring 2 Kanals situated at Khasra No. 452/12");
  const [advocateName, setAdvocateName] = useState<string>("Adv. S. S. Sheikh, High Court of J&K and Ladakh");

  // 15-second ad modal state
  const [showAdModal, setShowAdModal] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<"docx" | "pdf" | "txt" | null>(null);

  const selectedTemplate =
    (courtTemplates.find((t) => t.id === selectedId) as unknown as CourtTemplate) ||
    (courtTemplates[0] as unknown as CourtTemplate);

  const categories = [
    { id: "all", name: "All Court Drafts" },
    { id: "stay", name: "Stay Orders (Order 39)" },
    { id: "pleadings", name: "Plaints & Written Statements" },
    { id: "procedure", name: "Procedural Petitions" },
    { id: "execution", name: "Execution (Order 21)" },
  ];

  const filteredTemplates = courtTemplates.filter((t) => {
    const matchesCategory = filterCategory === "all" || t.category === filterCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.cpcSection.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.urduTitle && t.urduTitle.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  const getCustomizedDraft = () => {
    if (!selectedTemplate?.contentTemplate) return "";
    const today = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return selectedTemplate.contentTemplate
      .replace(/\[DISTRICT_NAME\]/g, courtName.replace(/^IN THE COURT OF.*,\s*/i, "") || "SRINAGAR")
      .replace(/\[PLAINTIFF_NAME\]/g, plaintiffName || "[PLAINTIFF NAME]")
      .replace(/\[PLAINTIFF_FATHER\]/g, plaintiffFather || "[FATHER'S NAME]")
      .replace(/\[PLAINTIFF_ADDRESS\]/g, plaintiffAddress || "[ADDRESS]")
      .replace(/\[DEFENDANT_NAME\]/g, defendantName || "[DEFENDANT NAME]")
      .replace(/\[DEFENDANT_FATHER\]/g, defendantFather || "[DEFENDANT FATHER]")
      .replace(/\[DEFENDANT_ADDRESS\]/g, defendantAddress || "[DEFENDANT ADDRESS]")
      .replace(/\[PROPERTY_DETAILS\]/g, propertyDetails || "[PROPERTY PARTICULARS]")
      .replace(/\[LOCATION\]/g, plaintiffAddress || "[LOCATION]")
      .replace(/\[ADVOCATE_NAME\]/g, advocateName || "Advocate High Court")
      .replace(/\[CURRENT_DATE\]/g, today)
      .replace(/\[SUIT_NO\]/g, "____ of 2026")
      .replace(/\[STAGE_OF_CASE\]/g, "Evidence / Arguments")
      .replace(/\[CURRENT_FIXED_DATE\]/g, "Upcoming Hearing")
      .replace(/\[SPECIFIC_URGENT_GROUND\]/g, "demolish/alter the boundary wall");
  };

  const handleCopy = () => {
    const text = getCustomizedDraft();
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const executeDownloadDocx = () => {
    const text = getCustomizedDraft();
    const filename = `${(selectedTemplate?.title || "Court_Draft").replace(/[^a-zA-Z0-9]/g, "_")}_S_S_AI_Legal_Hub`;

    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>${selectedTemplate?.title}</title>
    <style>
      body { font-family: 'Times New Roman', Georgia, serif; font-size: 13pt; line-height: 1.7; margin: 1in; color: #000; }
      .court-title { text-align: center; font-weight: bold; font-size: 14pt; margin-bottom: 20px; text-transform: uppercase; }
      .case-heading { text-align: center; font-weight: bold; font-size: 13pt; margin-bottom: 20px; text-decoration: underline; }
      p { margin: 6px 0; text-align: justify; }
    </style>
    </head><body><div class="court-title">${courtName}</div><div class="case-heading">${selectedTemplate?.title}</div>`;
    const formattedBody = text
      .split('\n')
      .map((line) => `<p>${line || '&nbsp;'}</p>`)
      .join('');
    const footer = "</body></html>";

    const sourceHTML = header + formattedBody + footer;
    const blob = new Blob([sourceHTML], { type: "application/msword;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const executeDownloadTxt = () => {
    const text = getCustomizedDraft();
    const filename = `${(selectedTemplate?.title || "Court_Draft").replace(/[^a-zA-Z0-9]/g, "_")}_S_S_AI_Legal_Hub.txt`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const executePrintPdf = () => {
    const text = getCustomizedDraft();
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${selectedTemplate?.title} - Legal Draft</title>
          <style>
            @page { size: A4; margin: 25mm 20mm 20mm 25mm; }
            body { 
              font-family: 'Times New Roman', Times, serif; 
              font-size: 13pt; 
              line-height: 1.8; 
              color: #111; 
              background: #fff;
              padding: 20px;
            }
            .header-box { text-align: center; border-bottom: 2px solid #222; padding-bottom: 12px; margin-bottom: 20px; }
            .court { font-weight: bold; font-size: 14pt; text-transform: uppercase; margin-bottom: 6px; }
            .title { font-weight: bold; font-size: 13pt; text-decoration: underline; margin-bottom: 4px; }
            .content { white-space: pre-wrap; font-size: 12.5pt; text-align: justify; }
            .footer-sign { margin-top: 50px; font-size: 10pt; color: #555; text-align: right; border-top: 1px dashed #aaa; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header-box">
            <div class="court">${courtName}</div>
            <div class="title">${selectedTemplate?.title} (${selectedTemplate?.cpcSection})</div>
          </div>
          <div class="content">${text}</div>
          <div class="footer-sign">Generated via S.S AI Study Guru Legal Hub • Counsel: ${advocateName}</div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 400);
    } else {
      window.print();
    }
  };

  const handleWhatsAppShare = () => {
    const text = `*${selectedTemplate?.title}*\n${courtName}\n\n${getCustomizedDraft().slice(0, 1000)}...\n\n_Generated via S.S AI Study Guru & Civil Court Hub_`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Trigger 15s Ad before download
  const handleDownloadClick = (type: "docx" | "pdf" | "txt") => {
    setPendingAction(type);
    setShowAdModal(true);
  };

  const handleAdRewardEarned = () => {
    if (pendingAction === "docx") {
      executeDownloadDocx();
    } else if (pendingAction === "pdf") {
      setTimeout(() => {
        executePrintPdf();
      }, 300);
    } else if (pendingAction === "txt") {
      executeDownloadTxt();
    }
    setPendingAction(null);
  };

  const handleAutoFillSample = () => {
    setCourtName("IN THE COURT OF LEARNED SUB-JUDGE / CIVIL JUDGE, SRINAGAR");
    setPlaintiffName("Mohammad Shafi Rather");
    setPlaintiffFather("Ghulam Mohammad Rather");
    setPlaintiffAddress("R/o Baghat Barzulla, District Srinagar, Kashmir");
    setDefendantName("Ghulam Nabi Bhat");
    setDefendantFather("Abdul Ahad Bhat");
    setDefendantAddress("R/o Hyderpora Bypass, District Srinagar, Kashmir");
    setPropertyDetails("Residential Plot measuring 1 Kanal 10 Marlas under Khasra No. 782/45");
    setAdvocateName("Adv. S. S. Sheikh, High Court of J&K and Ladakh");
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-slate-900 text-base sm:text-lg">
                Civil Court Pleadings & Order Downloads
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
                CPC 1908
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Select order, type party names, watch short 15s sponsored ad & download ready-to-file Word/PDF draft.
            </p>
          </div>
        </div>

        <button
          onClick={handleAutoFillSample}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>✨ Auto-Fill Sample Names</span>
        </button>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Stay Orders, Plaints, W.S., Order 39, Order 21..."
            className="w-full text-xs bg-transparent outline-hidden text-slate-800 placeholder-slate-400 font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilterCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                filterCategory === c.id
                  ? "bg-slate-950 text-amber-400 shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Template List + Customizer & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Orders & Pleadings List (4 Cols) */}
        <div className="lg:col-span-4 space-y-2 max-h-[580px] overflow-y-auto custom-scrollbar pr-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Available Court Orders ({filteredTemplates.length})
          </div>
          {filteredTemplates.map((t) => {
            const isSelected = t.id === selectedId;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedId(t.id)}
                className={`w-full text-left p-3.5 rounded-2xl border transition cursor-pointer space-y-1.5 ${
                  isSelected
                    ? "bg-slate-950 text-white border-slate-950 shadow-md"
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-900"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                      isSelected ? "bg-amber-400 text-slate-950" : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {t.cpcSection}
                  </span>
                  {t.isUrgent && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 font-bold">
                      Urgent Stay
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold leading-tight">{t.title}</div>
                <div className={`text-[11px] font-urdu ${isSelected ? "text-amber-300" : "text-amber-800"}`}>
                  {t.urduTitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Customizer Form + Live Document Preview (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Quick Party Name Customizer Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 text-white space-y-3 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Step 1: Enter Court & Party Names (Auto-Applies to Draft)
                </h4>
              </div>
              <span className="text-[10px] text-slate-400">Instant Preview</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[10px] font-semibold text-slate-400 block mb-1">
                  Court & District Heading:
                </label>
                <div className="relative">
                  <Building className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    value={courtName}
                    onChange={(e) => setCourtName(e.target.value)}
                    placeholder="e.g. IN THE COURT OF LEARNED CIVIL JUDGE, SRINAGAR"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:border-amber-400 outline-hidden font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-400 block mb-1">
                  Advocate / Counsel Name:
                </label>
                <div className="relative">
                  <ShieldCheck className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    value={advocateName}
                    onChange={(e) => setAdvocateName(e.target.value)}
                    placeholder="e.g. Adv. S. S. Sheikh, High Court"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:border-amber-400 outline-hidden font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-amber-300 block mb-1">
                  1. Plaintiff / Applicant Name:
                </label>
                <input
                  type="text"
                  value={plaintiffName}
                  onChange={(e) => setPlaintiffName(e.target.value)}
                  placeholder="e.g. Mohammad Shafi Rather"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:border-amber-400 outline-hidden font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-rose-300 block mb-1">
                  2. Defendant / Respondent Name:
                </label>
                <input
                  type="text"
                  value={defendantName}
                  onChange={(e) => setDefendantName(e.target.value)}
                  placeholder="e.g. Ghulam Nabi Bhat"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:border-amber-400 outline-hidden font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-400 block mb-1">
                  Plaintiff Father & Address:
                </label>
                <input
                  type="text"
                  value={plaintiffAddress}
                  onChange={(e) => setPlaintiffAddress(e.target.value)}
                  placeholder="e.g. R/o Baghat Barzulla, Srinagar"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:border-amber-400 outline-hidden font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-400 block mb-1">
                  Disputed Property / Subject Particulars:
                </label>
                <input
                  type="text"
                  value={propertyDetails}
                  onChange={(e) => setPropertyDetails(e.target.value)}
                  placeholder="e.g. Land measuring 2 Kanals at Khasra No. 452"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:border-amber-400 outline-hidden font-medium"
                />
              </div>
            </div>
          </div>

          {/* Action Download Buttons Toolbar (Top) */}
          <div className="bg-slate-900 text-white rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2 shadow-sm border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400">
                {selectedTemplate?.title}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                {selectedTemplate?.cpcSection}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => handleDownloadClick("docx")}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
                title="Download MS Word File"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Word (.DOC)</span>
              </button>

              <button
                onClick={() => handleDownloadClick("pdf")}
                className="px-3 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                title="Print or Save PDF"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>Print / PDF</span>
              </button>

              <button
                onClick={() => handleDownloadClick("txt")}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer flex items-center gap-1"
                title="Download Plain Text File"
              >
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>.TXT</span>
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1 shadow-xs"
                title="Share draft on WhatsApp"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleCopy}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer flex items-center gap-1"
                title="Copy entire draft"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Legal Notes */}
          {selectedTemplate?.notes && (
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                <span>Statutory Essentials & Court Requisites:</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                {selectedTemplate.notes.map((es, idx) => (
                  <li key={idx}>{es}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Live Authentic Court Sheet Preview (White Paper Presentation) */}
          <div className="relative bg-white text-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-300 shadow-md max-h-[460px] overflow-y-auto leading-relaxed custom-scrollbar">
            {/* Clean Formal Court Header (No Watermark) */}
            <div className="text-center border-b border-slate-300 pb-3 mb-5">
              <div className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide">
                {courtName}
              </div>
            </div>

            {/* Document Content */}
            <div className="font-serif text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-slate-900">
              {getCustomizedDraft()}
            </div>

            {/* Counsel Footer Sign */}
            <div className="mt-8 pt-4 border-t border-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-600 gap-2">
              <div>
                <span className="font-bold text-slate-900">Counsel / Advocate:</span> {advocateName}
              </div>
              <div className="text-[11px] text-slate-400">
                Official Court Pleader Format • CPC 1908
              </div>
            </div>
          </div>

          {/* Bottom Direct Action Toolbar */}
          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs font-semibold text-slate-600 flex items-center gap-1">
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Ready for Filing / Legal Print:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleDownloadClick("docx")}
                className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-400 font-bold text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download Word (.doc)</span>
              </button>

              <button
                onClick={() => handleDownloadClick("pdf")}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 15-Second Sponsored Ad Player Modal */}
      <RewardedAdModal
        isOpen={showAdModal}
        onClose={() => setShowAdModal(false)}
        durationSeconds={15}
        rewardTitle="Court Pleading Download Verification"
        description="Please watch this 15-second sponsored ad to verify and download your customized legal petition in .DOCX or PDF format."
        onRewardEarned={handleAdRewardEarned}
      />
    </div>
  );
};

export default CivilCourtPleadings;
