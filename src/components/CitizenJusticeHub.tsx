import React, { useState, useRef } from "react";
import {
  Scale,
  FileText,
  Mic,
  MicOff,
  Printer,
  Copy,
  Check,
  Download,
  AlertTriangle,
  Zap,
  Building2,
  HelpCircle,
  Volume2,
  VolumeX,
  RefreshCw,
  Award,
  ShieldCheck,
  Send,
  Sliders,
  ChevronDown,
  Sparkles,
  MapPin,
  Clock,
  Briefcase,
  Layers
} from "lucide-react";

interface GrievanceTemplate {
  id: string;
  category: string;
  icon: string;
  title: string;
  urduTitle: string;
  authority: string;
  acts: string;
  samplePrompt: string;
}

const SAMPLE_GRIEVANCES: GrievanceTemplate[] = [
  {
    id: "electricity_bill",
    category: "Electricity & Utilities",
    icon: "⚡",
    title: "Erroneous / Excessive Electricity Bill",
    urduTitle: "بجلی کا غلط اور اضافی بل (PDD)",
    authority: "Executive Engineer / Assistant Executive Engineer (PDD/DISCOM)",
    acts: "Section 56 & 126 of The Electricity Act, 2003 & Consumer Protection Act, 2019",
    samplePrompt: "My monthly average electricity bill is ₹600 with only 2 LED bulbs and 1 fan, but this month PDD sent an arbitrary inflated bill of ₹48,500 without physical meter reading. Meter is working properly."
  },
  {
    id: "land_mutation",
    category: "Revenue & Land (Tehsil)",
    icon: "🌾",
    title: "Tehsildar / Patwari Land Mutation Delay",
    urduTitle: "زمین کا انتقال (Mutation) اور پٹوار تاخیر",
    authority: "The Tehsildar / Sub-Divisional Magistrate (SDM) / District Magistrate",
    acts: "Section 34 of Land Revenue Act & Public Services Guarantee Act (PSGA)",
    samplePrompt: "I purchased agricultural land vide registered sale deed 6 months ago and submitted all documents for Intiqal (Mutation), but Patwari and Revenue office are unnecessarily delaying without any legal objection."
  },
  {
    id: "ayushman_denial",
    category: "Health & Hospital",
    icon: "🏥",
    title: "Ayushman Golden Card Denial by Hospital",
    urduTitle: "ہسپتال کی طرف سے آیوشمان کارڈ سے انکار",
    authority: "Chief Medical Officer (CMO) & State Health Agency (Ayushman Bharat / PMJAY)",
    acts: "National Health Authority Guidelines & Clinical Establishments Act",
    samplePrompt: "Private empanelled hospital refused cashless treatment for emergency surgery under Ayushman Bharat Golden Card and forced my family to deposit ₹65,000 cash under threat of discharging the patient."
  },
  {
    id: "cyber_fraud",
    category: "Cyber Crime & Banking",
    icon: "🏦",
    title: "Online UPI / ATM Banking Fraud Complaint",
    urduTitle: "آن لائن بینکنگ، فراڈ اور رقم کٹ جانے کی شکایت",
    authority: "Cyber Crime Police Station / Superintendent of Police & Banking Ombudsman",
    acts: "Section 66D Information Technology Act & Section 318 BNS (420 IPC) & RBI Ombudsman Scheme",
    samplePrompt: "On 02-Sep-2026, ₹25,000 was fraudulently debited from my savings account through a fake APK link / OTP impersonation call pretending to be electricity bill update."
  },
  {
    id: "rti_road",
    category: "RTI Transparency",
    icon: "📄",
    title: "RTI Application for Road & Govt Funds",
    urduTitle: "آر ٹی آئی برائے سڑک تعمیر و سرکاری فنڈز",
    authority: "Public Information Officer (PIO), R&B / Rural Development Dept",
    acts: "Section 6(1) of Right to Information Act, 2005",
    samplePrompt: "Under RTI Act 2005, provide certified copies of sanctioned budget, contractor tender details, material measurement book (MB), and completion certificate for the newly laid village link road."
  },
  {
    id: "consumer_fraud",
    category: "Consumer Court",
    icon: "🛍️",
    title: "Defective Product & Shopkeeper Refund Refusal",
    urduTitle: "ناقص سامان اور دکاندار کا ریفنڈ سے انکار",
    authority: "District Consumer Disputes Redressal Commission / Seller Head Office",
    acts: "Section 35 of Consumer Protection Act, 2019",
    samplePrompt: "Purchased a refrigerator worth ₹28,000 with 1-year warranty. It stopped cooling within 2 weeks. Shopkeeper and authorized service center refuse to replace or refund despite 4 written complaints."
  },
  {
    id: "pension_issue",
    category: "Social Welfare",
    icon: "👵",
    title: "Old Age / Widow Pension Stoppage Appeal",
    urduTitle: "بیوہ اور معمر پنشن رک جانے کی درخواست",
    authority: "District Social Welfare Officer (DSWO)",
    acts: "National Social Assistance Programme (NSAP) & Citizen Charter",
    samplePrompt: "I am a 68-year-old destitute widow receiving old age pension for 4 years. Pension was abruptly stopped without notice for the past 8 months despite biometric verification."
  },
  {
    id: "police_complaint",
    category: "Police & Public Safety",
    icon: "👮",
    title: "Police Non-Registration of Complaint Appeal",
    urduTitle: "تھانے میں شکایت درج نہ کرنے پر ایس ایس پی کو درخواست",
    authority: "Senior Superintendent of Police (SSP) / Superintendent of Police (SP)",
    acts: "Section 175(3) of Bharatiya Nagarik Suraksha Sanhita (BNSS) / 154(3) CrPC",
    samplePrompt: "Approached local police station regarding illegal trespass, criminal intimidation, and property demolition by miscreants on 01-Sep-2026, but SHO refused to lodge FIR or issue receiving."
  }
];

export function CitizenJusticeHub() {
  const [applicantName, setApplicantName] = useState("Mohammad Yousuf Sheikh");
  const [parentage, setParentage] = useState("S/o Ghulam Ahmad Sheikh");
  const [address, setAddress] = useState("R/o Main Town, District Anantnag, J&K - 192101");
  const [phone, setPhone] = useState("+91 94190 00000");
  const [problemDescription, setProblemDescription] = useState(
    "My monthly average electricity bill is ₹600 with only 2 LED bulbs and 1 fan, but this month PDD sent an arbitrary inflated bill of ₹48,500 without physical meter reading. Meter is working properly."
  );
  const [selectedLanguage, setSelectedLanguage] = useState<"urdu" | "kashmiri" | "english" | "hindi">("urdu");
  const [stampPaperMode, setStampPaperMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [formatType, setFormatType] = useState<"petition" | "simple_darkhwast">("petition");

  const printAreaRef = useRef<HTMLDivElement>(null);

  // Helper to completely strip markdown asterisks (**), tutor formatting, and headers
  const cleanDocumentText = (rawText: string): string => {
    if (!rawText) return "";
    let cleaned = rawText
      .replace(/\*\*/g, "") // Remove bold double asterisks
      .replace(/\*/g, "")   // Remove single asterisks
      .replace(/^#{1,6}\s+/gm, "") // Remove markdown headings (#)
      .replace(/^Answer\s*:\s*/i, "")
      .replace(/\n\s*Explain\s*:[\s\S]*$/i, "")
      .trim();
    return cleaned;
  };

  // Auto initialize default legal notice on mount
  React.useEffect(() => {
    handleGenerateLegalNotice(false);
  }, []);

  // Voice speech synthesis
  const speakAdvice = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedLanguage === "urdu" || selectedLanguage === "kashmiri") {
      utterance.lang = "ur-PK";
    } else if (selectedLanguage === "hindi") {
      utterance.lang = "hi-IN";
    } else {
      utterance.lang = "en-IN";
    }
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Speech Recognition (Web Speech API)
  const toggleListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Voice recognition is not supported in this browser. Please type your problem.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLanguage === "urdu" ? "ur-PK" : selectedLanguage === "hindi" ? "hi-IN" : "en-IN";

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setProblemDescription((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const handleSelectSample = (sample: GrievanceTemplate) => {
    setProblemDescription(sample.samplePrompt);
  };

  // 60-Second Legal & Darkhwast Drafting Logic
  const handleGenerateLegalNotice = async (triggerScroll = true) => {
    setIsGenerating(true);
    const currentDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
    const trackingRef = `CITIZEN-LEGAL/${new Date().getFullYear()}/${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const response = await fetch("/api/citizen-justice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicantName,
          parentage,
          address,
          phone,
          problem: problemDescription,
          language: selectedLanguage,
          formatType: formatType
        })
      });

      const data = await response.json();
      if (data.text && data.text.trim()) {
        setGeneratedDocument(cleanDocumentText(data.text));
      } else {
        // High quality clean legal / darkhwast fallback
        generateLocalDocument(trackingRef, currentDate);
      }
    } catch (err) {
      generateLocalDocument(trackingRef, currentDate);
    } finally {
      setIsGenerating(false);
      if (triggerScroll && printAreaRef.current) {
        printAreaRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const generateLocalDocument = (trackingRef: string, currentDate: string) => {
    if (formatType === "simple_darkhwast" || selectedLanguage === "urdu") {
      generateLocalUrduDarkhwast(trackingRef, currentDate);
    } else {
      generateLocalLegalPetition(trackingRef, currentDate);
    }
  };

  const generateLocalUrduDarkhwast = (trackingRef: string, currentDate: string) => {
    const isElectricity = problemDescription.toLowerCase().includes("electric") || problemDescription.toLowerCase().includes("bill") || problemDescription.toLowerCase().includes("meter") || problemDescription.toLowerCase().includes("pdd") || problemDescription.toLowerCase().includes("بجلی");
    const isLand = problemDescription.toLowerCase().includes("land") || problemDescription.toLowerCase().includes("patwari") || problemDescription.toLowerCase().includes("mutation") || problemDescription.toLowerCase().includes("intiqal") || problemDescription.toLowerCase().includes("زمین");
    const isHospital = problemDescription.toLowerCase().includes("ayushman") || problemDescription.toLowerCase().includes("hospital") || problemDescription.toLowerCase().includes("card") || problemDescription.toLowerCase().includes("ہسپتال");

    let officer = "بخدمت جناب بااختیار افسر صاحب / ڈسٹرکٹ گرینوس آفیسر، ضلع اننت ناگ، جموں و کشمیر۔";
    let unwan = "عنوان: درخواست برائے فوری کارروائی و حلِ مسئلہ";

    if (isElectricity) {
      officer = "بخدمت جناب ایگزیکٹیو انجینئر صاحب / اے ای ای صاحب (PDD / بجلی ڈپارٹمنٹ)\nسب ڈویژن اننت ناگ، جموں و کشمیر۔";
      unwan = "عنوان: درخواست برائے درستگی غلط / اضافی بجلی بل و معائنہ میٹر";
    } else if (isLand) {
      officer = "بخدمت جناب تحصیلدار صاحب / ایس ڈی ایم صاحب بہادر\nمحکمہ مال و اراضی، تحصیل اننت ناگ، جموں و کشمیر۔";
      unwan = "عنوان: درخواست برائے فوری اندراج انتقال (Intiqal) و کارروائی پٹوار";
    } else if (isHospital) {
      officer = "بخدمت جناب چیف میڈیکل آفیسر صاحب (CMO) / نوڈل آفیسر آیوشمان بھارت\nڈسٹرکٹ ہیلتھ سوسائٹی، اننت ناگ، جموں و کشمیر۔";
      unwan = "عنوان: شکایت برائے انکار کیش لیس علاج تحت آیوشمان گولڈن کارڈ اسکیم";
    }

    const doc = `================================================================================
دفتر مجاز عوامی شکایات و ازالہ کونسل
================================================================================
حوالہ نمبر (Ref No) : ${trackingRef}
بتاریخ             : ${currentDate}

${officer}

${unwan}

جنابِ عالی!

نہایت ادب و احترام کے ساتھ گزارشِ احوال یہ ہے کہ:

1. سائل ${applicantName} ${parentage} ساکنہ ${address} کا ایک شریف اور باقاعدہ ٹیکس دہندہ شہری ہے۔

2. بیانِ واقعہ و مسئلہ:
${problemDescription}

3. یہ کہ مذکورہ بالا لاپرواہی اور تاخیر کے باعث سائل کو شدید ذہنی، مالی اور گھریلو پریشانی کا سامنا کرنا پڑ رہا ہے، اور عوامی خدمات کے بنیادی حقوق متاثر ہو رہے ہیں۔

مدعا و التماس:
لہٰذا جناب کی خدمت میں پرزور مودبانہ التماس ہے کہ ہمارے اس جائز اور قانونی مسئلے پر ہمدردانہ غور فرماتے ہوئے متعلقہ عملے کو فوری درستگی / کارروائی کے احکامات صادر فرمائیں، اور سائل کو دفتری کارروائی سے مطلع فرمایا جائے۔
عین نوازش ہوگی۔

عرضے:
دستخط سائل: ___________________________
نام سائل: ${applicantName}
ولدیت: ${parentage}
ساکنہ: ${address}
رابطہ / فون نمبر: ${phone}
مقام: اننت ناگ (جموں و کشمیر)
بتاریخ: ${currentDate}

--------------------------------------------------------------------------------
قانونی حفاظتی نوٹ (Legal Safeguard):
یہ ایک مصدقہ عوامی درخواست / قانونی یادداشت ہے جو آئینِ ہند کے آرٹیکل 19 اور 21 کے تحت پیش کی گئی ہے۔ سائل نے تمام مندرجات خود تصدیق کر کے دستخط کیے ہیں۔
================================================================================`;

    setGeneratedDocument(cleanDocumentText(doc));
  };

  const generateLocalLegalPetition = (trackingRef: string, currentDate: string) => {
    const isElectricity = problemDescription.toLowerCase().includes("electric") || problemDescription.toLowerCase().includes("bill") || problemDescription.toLowerCase().includes("meter") || problemDescription.toLowerCase().includes("pdd");
    const isLand = problemDescription.toLowerCase().includes("land") || problemDescription.toLowerCase().includes("patwari") || problemDescription.toLowerCase().includes("mutation") || problemDescription.toLowerCase().includes("intiqal") || problemDescription.toLowerCase().includes("khasra");
    const isHospital = problemDescription.toLowerCase().includes("ayushman") || problemDescription.toLowerCase().includes("hospital") || problemDescription.toLowerCase().includes("card") || problemDescription.toLowerCase().includes("doctor");
    const isCyber = problemDescription.toLowerCase().includes("fraud") || problemDescription.toLowerCase().includes("bank") || problemDescription.toLowerCase().includes("upi") || problemDescription.toLowerCase().includes("account") || problemDescription.toLowerCase().includes("money");
    const isRti = problemDescription.toLowerCase().includes("rti") || problemDescription.toLowerCase().includes("road") || problemDescription.toLowerCase().includes("information") || problemDescription.toLowerCase().includes("budget");

    let authority = "THE COMPETENT STATUTORY AUTHORITY / DISTRICT GRIEVANCE OFFICER";
    let subject = "FORMAL CITIZEN GRIEVANCE PETITION & STATUTORY NOTICE FOR IMMEDIATE REDRESSAL";
    let legalActs = "Under Citizen Charter & Relevant Statutory Regulations";

    if (isElectricity) {
      authority = "TO,\nTHE EXECUTIVE ENGINEER / ASSTT. EXECUTIVE ENGINEER (AEE),\nPOWER DEVELOPMENT DEPARTMENT (PDD / DISCOM),\nSUB-DIVISIONAL DIVISION / UT ELECTRICITY REGULATORY COMMISSION.";
      subject = "FORMAL STATUTORY OBJECTION & NOTICE UNDER SECTION 56 & 126 OF THE ELECTRICITY ACT, 2003 R/W SECTION 2(11) OF CONSUMER PROTECTION ACT, 2019 AGAINST ARBITRARY, UNREASONABLE & ERRONEOUS BILLING";
      legalActs = "The Electricity Act, 2003 & Central Electricity Authority Regulations";
    } else if (isLand) {
      authority = "TO,\nTHE TEHSILDAR / SUB-DIVISIONAL MAGISTRATE (SDM),\nDEPARTMENT OF REVENUE & LAND RECORDS,\nTEHSIL JURISDICTION.";
      subject = "FORMAL PETITION UNDER SECTION 34 OF LAND REVENUE ACT & J&K PUBLIC SERVICES GUARANTEE ACT (PSGA) SEEKING EXPEDITIOUS RECORDING OF MUTATION (INTIQAL) & INQUIRY INTO UNLAWFUL DELAYS";
      legalActs = "Land Revenue Act, Registration Act 1908 & Public Services Guarantee Act";
    } else if (isHospital) {
      authority = "TO,\nTHE CHIEF MEDICAL OFFICER (CMO) & NODAL OFFICER (PMJAY / AYUSHMAN BHARAT),\nDISTRICT HEALTH SOCIETY / STATE HEALTH AGENCY.";
      subject = "URGENT STATUTORY COMPLAINT & SHOW-CAUSE REQUISITION AGAINST ILLEGAL REFUSAL OF CASHLESS TREATMENT UNDER AYUSHMAN BHARAT GOLDEN CARD SCHEME";
      legalActs = "National Health Authority Guidelines, Clinical Establishments Act & Consumer Protection Act, 2019";
    } else if (isCyber) {
      authority = "TO,\nTHE STATION HOUSE OFFICER / INCHARGE CYBER CRIME CELL,\nPOLICE STATION / SSP CRIME BRANCH & BANKING OMBUDSMAN (RBI).";
      subject = "FORMAL COMPLAINT UNDER SECTION 66D OF INFORMATION TECHNOLOGY ACT R/W SECTION 318(4) OF BHARATIYA NYAYA SANHITA (BNS) REGARDING UNAUTHORIZED FRAUDULENT ONLINE FINANCIAL DEBIT";
      legalActs = "Information Technology Act 2000, BNS 2023 & RBI Cyber Security Guidelines";
    } else if (isRti) {
      authority = "TO,\nTHE PUBLIC INFORMATION OFFICER (PIO) / FIRST APPELLATE AUTHORITY,\nOFFICE OF THE EXECUTIVE ENGINEER, R&B / RURAL DEVELOPMENT DEPARTMENT.";
      subject = "APPLICATION SEEKING CERTIFIED INFORMATION UNDER SECTION 6(1) OF THE RIGHT TO INFORMATION (RTI) ACT, 2005";
      legalActs = "Right to Information Act, 2005";
    }

    const doc = `================================================================================
BEFORE THE COMPETENT PUBLIC GRIEVANCE AUTHORITY / STATUTORY FORUM
================================================================================
TRACKING / REFERENCE ID : ${trackingRef}
DATE OF PETITION        : ${currentDate}
JURISDICTION STATUS     : PRE-LITIGATION STATUTORY NOTICE & GRIEVANCE PETITION

${authority}

PETITIONER / APPLICANT:
${applicantName}, ${parentage}
Permanent Resident of: ${address}
Contact / Registered Mobile: ${phone}

SUBJECT:
${subject}

RESPECTFULLY SHEWETH AS UNDER:

1. LOCUS STANDI & PRELIMINARY PARTICULARS:
   That the applicant is a law-abiding citizen of India, bonafide consumer, and taxpayer entitled to fair administrative action, fundamental rights guaranteed under Articles 14, 19, and 21 of the Constitution of India, and service standards stipulated under statutory rules.

2. CHRONOLOGICAL STATEMENT OF FACTS & IMPUGNED GRIEVANCE:
   That the applicant submits the following undisputed factual sequence necessitating this urgent statutory petition:
   "${problemDescription}"

3. INFRINGEMENT OF STATUTORY RIGHTS & ARBITRARINESS:
   That the arbitrary and negligent conduct on part of the concerned department/officials constitutes a severe deficiency in service, administrative injustice, and willful non-compliance with the governing provisions of ${legalActs}. The applicant has suffered severe mental agony, harassment, and unjustified financial/legal distress.

4. STATUTORY PRAYER & 15-DAY REDRESSAL ULTIMATUM:
   In the light of the facts and statutory provisions cited above, the applicant most respectfully prays that:
   (a) Immediate directions be issued to the concerned field officers/clerical staff to rectify the defect/records/bill within 15 days of the receipt of this notice.
   (b) The impugned arbitrary demand/delay be kept in abeyance and no coercive recovery/action be initiated against the applicant during the pendency of this petition.
   (c) An acknowledgment receipt / tracking dairy number be furnished to the applicant forthwith in compliance with Citizen Charter standards.

   Failing which, the applicant shall be constrained to initiate formal proceedings before the Hon'ble District Consumer Commission / High Court of Judicature / Lokayukta / Lok Adalat, claiming heavy damages, legal costs, and statutory interest at the sole risk and liability of the department.

VERIFICATION:
I, ${applicantName}, do hereby solemnly verify and affirm that the contents of paragraphs 1 to 4 are true and correct to the best of my personal knowledge and belief, and nothing material has been concealed therefrom.

Verified at: District Anantnag, UT of J&K
Dated: ${currentDate}

____________________________
(Dastakhat / Signature of Applicant)
${applicantName}
Applicant / Consumer in Person

--------------------------------------------------------------------------------
⚖️ STATUTORY LEGAL DISCLAIMER & SELF-DRAFTING SHIELD (دستبرداری کی قانونی شیلڈ):
1. CONSTITUTIONAL RIGHT TO PETITION: This document constitutes a bona fide citizen representation / statutory grievance notice drafted in exercise of fundamental rights guaranteed under Articles 14, 19(1)(a), and 21 of the Constitution of India and statutory provisions of the Citizen Charter.
2. CITIZEN SELF-REPRESENTATION: This drafting is generated via S.S AI Citizen Justice Engine as a self-help typing and statutory format tool. The applicant signs, verifies, and submits this petition in person as a self-represented citizen / consumer under Section 35 of Consumer Protection Act 2019 and Section 6 of RTI Act 2005 without requiring mandatory pleader appearance at administrative pre-litigation stage.
3. VERIFIED APPLICANT RESPONSIBILITY: All facts, claims, and attachments are verified and submitted under the sole legal representation and ownership of the applicant (${applicantName}).
================================================================================`;

    setGeneratedDocument(doc);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    if (!generatedDocument) return;
    navigator.clipboard.writeText(generatedDocument);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!generatedDocument) return;
    const blob = new Blob([generatedDocument], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Citizen_Grievance_Petition_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white p-5 rounded-2xl shadow-lg border border-amber-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Scale className="w-48 h-48 text-amber-400" />
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <Scale className="w-3.5 h-3.5" /> OFFICIAL CITIZEN LEGAL SUITE
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> 100% Legal & Safe
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <Scale className="w-6 h-6 text-amber-400" />
              AI Citizen Justice & Instant Relief Machine
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              عوامی وکیل اور 60 سیکنڈ میں سرکاری مسئلہ حل کرنے والا AI روبوٹ — عام شہری اور کسان کے لیے مفت قانونی نوٹس، آر ٹی آئی، اور ڈی سی آفس درخواست جنریٹر۔
            </p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Problem Input & Voice Console (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 font-black">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Citizen Particulars (تفصیلات)</h3>
                  <p className="text-[11px] text-slate-500">Applicant and contact details for legal paper</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Applicant Name (نام)</label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 focus:outline-none"
                  placeholder="e.g., Mohammad Yousuf Sheikh"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Parentage (ولدیت)</label>
                <input
                  type="text"
                  value={parentage}
                  onChange={(e) => setParentage(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 focus:outline-none"
                  placeholder="e.g., S/o Ghulam Ahmad Sheikh"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Residential Address (پتہ)</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 focus:outline-none"
                  placeholder="e.g., Main Town, Anantnag, J&K"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Mobile / WhatsApp (فون نمبر)</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 focus:outline-none"
                  placeholder="e.g., +91 94190 00000"
                />
              </div>
            </div>

            {/* Problem Description & Voice Mic */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-md bg-amber-500/10 text-amber-600 flex items-center justify-center text-xs">
                    2
                  </span>
                  Explain Problem (اپنی شکایت یا مسئلہ بیان کریں)
                </label>
                <button
                  onClick={toggleListening}
                  className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    isListening
                      ? "bg-rose-600 text-white animate-pulse"
                      : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                  }`}
                >
                  {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  <span>{isListening ? "Listening... (بولیں)" : "Speak Voice (آواز میں بولیں)"}</span>
                </button>
              </div>

              <textarea
                rows={4}
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="مثال: بجلی کا میٹر ٹھیک ہے لیکن پچھلے مہینے 45,000 کا غلط بل آیا ہے..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none leading-relaxed"
              />
            </div>

            {/* Quick 1-Tap Ready Complaints */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-600 flex items-center justify-between">
                <span>⚡ Instant Quick Templates (تیار مسائل):</span>
                <span className="text-[10px] text-amber-600">Click to load</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                {SAMPLE_GRIEVANCES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className="text-left p-2 rounded-lg bg-slate-50 hover:bg-amber-50/80 border border-slate-200 hover:border-amber-300 text-[11px] transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-1 font-bold text-slate-800 line-clamp-1">
                      <span>{sample.icon}</span>
                      <span>{sample.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{sample.urduTitle}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Format Style Selector: Legal Petition vs Simple Darkhwast */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-800 text-[11px] block">Paper Style (کاغذ کا انداز):</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormatType("petition")}
                  className={`p-2 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    formatType === "petition"
                      ? "bg-slate-900 text-amber-400 border-slate-900 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Scale className="w-3.5 h-3.5 shrink-0" />
                  <div className="truncate">
                    <span className="block text-[11px] font-black">Statutory Legal Notice</span>
                    <span className="block text-[9px] opacity-80">Court & DC Office Format</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormatType("simple_darkhwast")}
                  className={`p-2 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    formatType === "simple_darkhwast"
                      ? "bg-slate-900 text-amber-400 border-slate-900 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <div className="truncate">
                    <span className="block text-[11px] font-black">Simple Darkhwast</span>
                    <span className="block text-[9px] opacity-80">سادہ عوامی درخواست</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Language Pills Selector */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-[11px] block">Language (زبان منتخب کریں):</span>
                <span className="text-[10px] text-amber-600 font-bold">1-Click Switch</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: "english", label: "English", sub: "Court/Official", flag: "🇬🇧" },
                  { id: "urdu", label: "اردو", sub: "قومی و قانونی", flag: "🇵🇰" },
                  { id: "hindi", label: "हिन्दी", sub: "राष्ट्रीय", flag: "🇮🇳" },
                  { id: "kashmiri", label: "کٲشُر", sub: "عوامی خلاصہ", flag: "🏔️" },
                ].map((lang) => {
                  const isSelected = selectedLanguage === lang.id;
                  return (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => setSelectedLanguage(lang.id as any)}
                      className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? "bg-amber-400 text-slate-950 border-amber-500 font-black shadow-xs ring-2 ring-amber-400/30"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      <span className="text-xs block">{lang.flag} {lang.label}</span>
                      <span className="text-[9px] block opacity-80">{lang.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stamp Paper Switch */}
            <div className="pt-1 flex items-center justify-between flex-wrap gap-2 text-xs">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 cursor-pointer bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 w-full justify-between">
                <div className="flex items-center gap-1.5">
                  <Stamp className="w-3.5 h-3.5 text-amber-600" />
                  <span>₹10 / ₹20 Stamp Paper Print Margin (اسٹامپ پیپر پرنٹنگ)</span>
                </div>
                <input
                  type="checkbox"
                  checked={stampPaperMode}
                  onChange={(e) => setStampPaperMode(e.target.checked)}
                  className="accent-amber-600 rounded scale-110"
                />
              </label>
            </div>

            {/* Action Submit Button */}
            <button
              onClick={() => handleGenerateLegalNotice(true)}
              disabled={isGenerating || !problemDescription.trim()}
              className="w-full bg-slate-950 hover:bg-slate-900 text-amber-400 hover:text-amber-300 font-black text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Generating Official Petition in 60s...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Draft 60-Second Legal Petition (قانونی نوٹس بنائیں)</span>
                </>
              )}
            </button>
          </div>

          {/* Citizen Legal Rights Quick Explainer */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-xs space-y-2.5">
            <h4 className="font-black text-emerald-950 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                100% Legal Disclaimer & Self-Drafting Shield
              </span>
              <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
                دستبرداری کی حفاظتی شیلڈ
              </span>
            </h4>
            <div className="space-y-1.5 text-emerald-900 text-[11px] leading-relaxed">
              <div className="flex items-start gap-1.5">
                <span className="font-bold text-emerald-700">1.</span>
                <span><strong>دستوری حق (Article 19 & 21):</strong> ہر شہری کو بغیر وکیل کے کسی بھی سرکاری محکمے یا ڈی سی آفس میں درخواست دینے کا آئینی حق حاصل ہے۔</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="font-bold text-emerald-700">2.</span>
                <span><strong>خود دستخطی نمائندگی (Self-Representation):</strong> حتمی کاغذ پر درخواست گزار خود دستخط کرتا ہے، یہ ایک اسمارٹ ٹائپنگ اور پیٹیشن ڈرافٹنگ سسٹم ہے۔</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="font-bold text-emerald-700">3.</span>
                <span><strong>آر ٹی آئی اور کنزیومر ایکٹ پروٹیکشن:</strong> قانونی نوٹس کے نیچے حفاظتی دستبرداری کلاز خود بخود پرنٹ ہوتی ہے۔</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Legal Document & Stamp Output (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
            {/* Output Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Official Petition Draft (تیار قانونی کاغذ)</h3>
                  <p className="text-[11px] text-slate-500">Court / DC Office Stamp & Receiving Ready</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() =>
                    speakAdvice(
                      "Aapka kanooni notice tayyar hai. Iska print nikaal kar receiving counter par le jayein aur stamp lagwayein."
                    )
                  }
                  className="p-2 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  title="Listen Audio Guidance"
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-600" /> : <Volume2 className="w-3.5 h-3.5 text-amber-600" />}
                  <span className="hidden sm:inline">رہنمائی سنیں</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  title="Copy Document Text"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{isCopied ? "Copied" : "Copy"}</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  title="Download TXT file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Save</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-1.5 rounded-lg text-xs font-black shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Paper (پرنٹ)</span>
                </button>
              </div>
            </div>

            {/* Stamp Paper Visual Margin Indication */}
            {stampPaperMode && (
              <div className="bg-amber-50 border-2 border-dashed border-amber-400 p-3 rounded-xl text-center text-xs text-amber-800 font-bold space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-amber-900">
                  <Stamp className="w-4 h-4 text-amber-600" />
                  <span>PHYSICAL STAMP PAPER ALIGNMENT ACTIVE (4-INCH TOP CLEARANCE)</span>
                </div>
                <p className="text-[11px] text-amber-700 font-normal">
                  Yeh text physical ₹10 / ₹20 Stamp Paper ke niche khali jagah par print hoga taake stamp seal mehfooz rahe.
                </p>
              </div>
            )}

            {/* Printable Document Box */}
            <div
              ref={printAreaRef}
              id="citizen-petition-print-sheet"
              className={`border border-slate-300 rounded-xl p-5 sm:p-7 bg-[#fffefc] text-slate-900 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto shadow-inner custom-scrollbar select-text whitespace-pre-wrap ${
                stampPaperMode ? "pt-32" : ""
              }`}
            >
              {generatedDocument || "Generating official legal petition..."}
            </div>

            {/* Post-Generation Action Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                  <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <span>Print & Sign (دستخط)</span>
                </div>
                <p className="text-[10px] text-slate-500">
                  A4 paper par print nikaal kar aakhir mein apna dastakhat karein.
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                  <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span>Office Receiving (مہر)</span>
                </div>
                <p className="text-[10px] text-slate-500">
                  Daftar ke receiving counter par de kar carbon copy par receiving muhar lein.
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                  <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">
                    3
                  </span>
                  <span>15-Day Resolution (حل)</span>
                </div>
                <p className="text-[10px] text-slate-500">
                  Kanooni notice hone ki wajah se afsar 15 din mein jawab dene par paband hai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stamp(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 22h14" />
      <path d="M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V18h16v-2.5c0-.66-.26-1.3-.73-1.77Z" />
      <path d="M14 13V8.5C14 7.12 12.88 6 11.5 6S9 7.12 9 8.5V13" />
    </svg>
  );
}
