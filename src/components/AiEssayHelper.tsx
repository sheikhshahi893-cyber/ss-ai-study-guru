import React, { useState } from "react";
import { PenTool, Copy, Check, Sparkles, BookOpen } from "lucide-react";

export const AiEssayHelper: React.FC = () => {
  const [topic, setTopic] = useState("Allama Iqbal & Leadership Impact");
  const [langType, setLangType] = useState<"english" | "urdu" | "hinglish">("english");
  const [copied, setCopied] = useState(false);

  const essaySamples: Record<string, Record<string, string>> = {
    "Allama Iqbal & Leadership Impact": {
      english: `Title: Allama Iqbal and His Enduring Vision of Leadership

I. Introduction
Dr. Allama Muhammad Iqbal (1877–1938) remains one of the most transformative philosopher-poets of modern Asian history. His concept of leadership was anchored in self-realization ('Khudi') and proactive social responsibility.

II. Concept of 'Khudi' (Selfhood)
Iqbal challenged youth to cultivate self-reliance, moral conviction, and spiritual elevation rather than passive imitation of colonial paradigms.

III. The Role of the Youth ('Shaheen')
He metaphorically used the falcon ('Shaheen') to represent lofty ambition, courage, and relentless intellectual flight.

IV. Conclusion
Iqbal's thought emphasizes that true leadership requires moral integrity, visionary scholarship, and unyielding service to humanity.`,
      urdu: `عنوان: علامہ محمد اقبال اور خودی کا تصورِ قیادت

۱۔ تعارف
ڈاکٹر علامہ محمد اقبال بیسویں صدی کے عظیم مفکر، فلسفی اور شاعرِ مشرق ہیں۔ انہوں نے نوجوان نسل کو بیدار کرنے کے لیے خودی اور بلند ہمتی کا آفاقی پیغام دیا۔

۲۔ فلسفۂ خودی
اقبال کے نزدیک خودی کا مطلب اپنی پوشیدہ صلاحیتوں کو پہچاننا، خود اعتمادی پیدا کرنا اور اللہ تعالیٰ کے احکامات کے مطابق اپنی زندگی کو سنوارنا ہے۔

۳۔ شاہین کا استعارہ
اقبال نے نوجوانوں کو شاہین سے تشبیہ دی جو آسمانوں پر پرواز کرتا ہے اور ہمت و شجاعت کی علامت ہے۔

۴۔ خلاصہ
علامہ اقبال کی تعلیمات آج بھی ہمیں علم، اتحاد اور مسلسل محنت کا درس دیتی ہیں۔`,
      hinglish: `Topic: Allama Iqbal aur Leadership ka Asar

1. Introduction: Allama Iqbal ek azeem shayar aur philosopher the jinhone youth ko bedaar hone ka paigham diya.
2. Khudi ka Concept: Apni abilities ko pehchano, self-respect aur moral courage ke sath aage badho.
3. Shaheen (Falcon) ka Analogy: Unka manna tha ke young generation ko Shaheen ki tarah buland irada aur hard work karna chahiye.
4. Conclusion: Iqbal ka message aaj ke students ke liye hard work, character building aur leadership ka perfect roadmap hai.`,
    },
    "The Power of Science & Technology": {
      english: `Title: The Transformative Power of Science & Technology in Modern Education

I. Introduction: The integration of digital platforms and AI tools has fundamentally democratized global education.
II. Core Pillars: 1) Instant access to global knowledge bases. 2) Adaptive learning software tailored to individual speeds.
III. Critical Nuances: Balancing screen-time with deep conceptual reasoning.
IV. Conclusion: Science and technology empower learners when guided by ethical curiosity.`,
      urdu: `عنوان: جدید تعلیم میں سائنس اور ٹیکنالوجی کی اہمیت

۱۔ تعارف: سائنس اور انفارمیشن ٹیکنالوجی نے جدید دور میں حصولِ علم کے تمام روایتی طریقوں کو یکسر بدل کر رکھ دیا ہے۔
۲۔ اہم فوائد: ڈیجیٹل کتب خانوں تک فوری رسائی، آن لائن تعلیمی کورسز اور جدید کمپیوٹر لیبز۔
۳۔ خلاصہ: ٹیکنالوجی کا مثبت استعمال طلبہ کی تحقیقی صلاحیتوں کو نکھارتا ہے۔`,
      hinglish: `Topic: Science aur Technology ka Education mein Role

1. Introduction: Aaj technology ne padhai ko bahut asaan aur interactive bana diya hai.
2. Main Benefits: 24/7 online study material, AI study assistants, aur visual diagrams.
3. Conclusion: Smart technology ka right use har student ko exam mein top karne mein help karta hai.`,
    },
  };

  const currentText =
    essaySamples[topic]?.[langType] || essaySamples["Allama Iqbal & Leadership Impact"][langType];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">AI Essay & Urdu Mazmoon Helper</h3>
            <p className="text-xs text-slate-500">Structured outlines, thesis statements & multi-paragraph compositions</p>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200">
          Mazmoon Desk
        </span>
      </div>

      {/* Topic Selection & Language Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Select Essay Topic:</span>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="text-xs p-1.5 rounded-lg border border-slate-200 bg-white text-slate-900 font-medium"
          >
            <option value="Allama Iqbal & Leadership Impact">Allama Iqbal & Leadership</option>
            <option value="The Power of Science & Technology">Science & Technology in Education</option>
          </select>
        </div>

        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => setLangType("english")}
            className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
              langType === "english" ? "bg-slate-950 text-white" : "bg-white border text-slate-700"
            }`}
          >
            English Essay
          </button>
          <button
            onClick={() => setLangType("urdu")}
            className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
              langType === "urdu" ? "bg-slate-950 text-white" : "bg-white border text-slate-700"
            }`}
          >
            اردو مضمون
          </button>
          <button
            onClick={() => setLangType("hinglish")}
            className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
              langType === "hinglish" ? "bg-slate-950 text-white" : "bg-white border text-slate-700"
            }`}
          >
            Hinglish Essay
          </button>
        </div>
      </div>

      {/* Essay Content Box */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Structured Outline & Model Composition:</span>
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-100 transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy Essay"}</span>
          </button>
        </div>

        <div
          className={`bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap ${
            langType === "urdu" ? "font-urdu text-right text-sm leading-loose" : "font-sans"
          }`}
        >
          {currentText}
        </div>
      </div>
    </div>
  );
};
