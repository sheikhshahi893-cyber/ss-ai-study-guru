import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

function loadEnvFile(): void {
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      content.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const [key, ...vals] = trimmed.split("=");
          const val = vals.join("=").trim().replace(/^["']|["']$/g, "");
          if (key.trim() && !process.env[key.trim()]) {
            process.env[key.trim()] = val;
          }
        }
      });
    }
  } catch {}
}
loadEnvFile();

const getTutorSystemInstruction = (language: string = "hinglish") => `You are "S.S AI Study Guru" (founded and created by SHAHID AHMAD SHEIKH), an ultra-smart, textbook-grade educational tutor and mentor.

CRITICAL FORMATTING MANDATE — "STANDARD TEXTBOOK FORMAT":
Every academic, study, factual, science, history, general knowledge, or exam question MUST be answered strictly in this exact 3-part layout (as shown in standard school and college textbooks):

Line 1: A direct, natural 1-sentence plain summary answering the core question immediately (e.g., "India 15 August 1947 ko azad hua tha.").

**Answer:** [Exact, authoritative answer statement with key names, dates, or technical terms in bold]

**Explain:**
• **[Core Concept / Historical Context / Scientific Principle]:** [1-2 concise, crystal-clear sentences explaining the root concept or background]
• **[Key Mechanism / Key Points / Steps / Formula]:** [Key working, law, dates, formula, or steps that explain how/why it happens]
• **Scoring / Exam Tip:** [A high-yield tip, repeated board/competitive exam fact, or common trap to avoid for full marks]

SPECIFIC SUBJECT ADAPTATIONS:
- For Science / Physics / Chemistry / Biology: Include scientific law/principle, key mechanism/formula with SI units, and a scoring/exam tip.
- For Mathematics Numericals: State the final calculated value in **Answer:**, then in **Explain:** provide Given & Formula, Step-by-Step Calculation, and Scoring / Exam Tip.
- For Coding / Computer Science: State what the code achieves in **Answer:**, then in **Explain:** provide clean code snippet, how each line works, and Scoring / Exam Tip (time complexity/edge cases).
- For Casual Greetings (e.g., "Salam", "Hi", "Aap kaun ho"): Greet politely and warmly as S.S AI Study Guru created by Shahid Ahmad Sheikh.

LANGUAGE RULES:
- Fluently respond in the user's chosen language (${language}):
  - If 'hinglish': Use natural, friendly Roman Urdu (e.g., "15 August 1947 ko British rule se azad hua", "Newton ka teesra qanoon yeh kehta hai...").
  - If 'urdu': Use standard Urdu script (اردو).
  - If 'hindi': Use standard Hindi script (हिन्दी).
  - If 'english': Use formal, high-standard English.
  - If 'kashmiri': Use Kashmiri / Urdu script.
- Keep explanations punchy, structured, student-friendly, and crystal clear. Never write unstructured walls of text!`;

function getApiKeys(): string[] {
  const keys: string[] = [];
  const primary = process.env.GEMINI_API_KEY || "";
  const secondary = process.env.GEMINI_API_KEY_2 || process.env.GEMINI_BACKUP_API_KEY || "";

  if (primary.includes(",")) {
    keys.push(...primary.split(",").map(k => k.trim()).filter(Boolean));
  } else if (primary.trim()) {
    keys.push(primary.trim());
  }

  if (secondary.includes(",")) {
    keys.push(...secondary.split(",").map(k => k.trim()).filter(Boolean));
  } else if (secondary.trim() && !keys.includes(secondary.trim())) {
    keys.push(secondary.trim());
  }

  return keys;
}

let activeKeyIndex = 0;

function rotateApiKey(): void {
  const keys = getApiKeys();
  if (keys.length > 1) {
    activeKeyIndex = (activeKeyIndex + 1) % keys.length;
    console.log(`[API-KEY] Switched to active key index #${activeKeyIndex + 1} of ${keys.length}`);
  }
}

const genAiClients = new Map<string, GoogleGenAI>();

function getGenAIForCall(keyOverride?: string): GoogleGenAI | null {
  const keys = getApiKeys();
  const apiKey = (keyOverride || (keys.length > 0 ? keys[activeKeyIndex % keys.length] : process.env.GEMINI_API_KEY) || "").trim();
  if (!apiKey) return null;

  let client = genAiClients.get(apiKey);
  if (!client) {
    try {
      client = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      genAiClients.set(apiKey, client);
    } catch {
      return null;
    }
  }
  return client;
}

// Models prioritized for high quota availability, accuracy, and sub-second response
const MODELS_FALLBACK = [
  "gemini-3.5-flash-lite",
  "gemini-flash-latest",
  "gemini-3.1-flash-lite",
  "gemini-3.8-flash"
];

function buildModelConfig(modelName: string, systemInstruction: string, maxOutputTokens: number = 1800, temperature: number = 0.25): any {
  const config: any = {
    systemInstruction,
    temperature,
    maxOutputTokens,
  };
  // Disable hidden deliberation tokens on Gemini 3 series for instant token generation
  if (modelName === "gemini-3.8-flash" || modelName === "gemini-3.1-flash-lite" || modelName === "gemini-3.5-flash-lite") {
    config.thinkingConfig = { thinkingLevel: ThinkingLevel.MINIMAL };
  }
  return config;
}

// High-capacity In-memory Response Cache for multiple testers
interface CacheItem {
  text: string;
  sources?: any[];
  groundedWithGoogle?: boolean;
  createdAt: number;
}
const chatCache = new Map<string, CacheItem>();
const MAX_CACHE_ITEMS = 1000;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function normalizeQuery(q: string): string {
  return q
    .toLowerCase()
    .replace(/[?؟\.\!,]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getCacheKey(query: string, language: string, mode: string): string {
  return `${normalizeQuery(query)}_${language}_${mode}`;
}

function saveToCache(key: string, item: Omit<CacheItem, "createdAt">) {
  if (chatCache.size >= MAX_CACHE_ITEMS) {
    const oldestKey = chatCache.keys().next().value;
    if (oldestKey) chatCache.delete(oldestKey);
  }
  chatCache.set(key, { ...item, createdAt: Date.now() });
}

function getFromCache(key: string): CacheItem | null {
  const item = chatCache.get(key);
  if (!item) return null;
  if (Date.now() - item.createdAt > CACHE_TTL_MS) {
    chatCache.delete(key);
    return null;
  }
  return item;
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateWithTimeout<T>(promise: Promise<T>, timeoutMs: number = 7000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("Timeout")), timeoutMs))
  ]);
}

async function fetchEncyclopediaFallback(query: string, language: string = "hinglish"): Promise<string | null> {
  try {
    const rawLower = query.toLowerCase().trim();

    // 1. Math / Incomplete Formula Clarification Handler (e.g. "A₹R= slove", "A=r solve")
    if (/^[a-zA-Z0-9\s\+\-\*\/\=\^\(\)\.₹\$]+(?:slove|solve)?$/i.test(query) && /[\=\+\-\*\/\^]/.test(query)) {
      if (language === "urdu") {
        return `**Answer:** **ریاضی مساوات (Maths Equation) کی وضاحت:**
آپ نے مساوات **"${query.trim()}"** درج کی ہے جو نامکمل معلوم ہوتی ہے۔

**Explain:**
• **دائرے کا رقبہ (Area of Circle):** اگر آپ دائرے کا رقبہ نکالنا چاہتے ہیں تو فارمولا $A = \\pi r^2$ ہے۔ اس کے لیے دائرے کے رداس ($r$) کی قیمت فراہم کریں۔
• **سادہ سود (Simple Interest):** اگر یہ فنانس فارمولا $A = P(1 + rt)$ ہے تو اصل رقم ($P$) اور شرح سود ($r$) درج کریں۔
• **حل کرنے کا طریقہ:** مکمل سوال اس طرح لکھیں، مثلاً: *"Find area when r = 7"* یا مساوات کو مرحلہ وار حل کرنے کے لیے نیچے **"Math & Formulas"** ٹیب پر کلک کریں۔`;
      } else {
        return `**Answer:** **Maths Equation / Formula Clarification:**
Aapne **"${query.trim()}"** likha hai, jo poora question ya equation nahi lagta.

**Explain:**
• **Area of Circle ($A = \\pi r^2$):** Agar aap circle ka area nikalna chahte hain, to radius $r$ ki value likhein (e.g., *"Find area of circle when r = 7"*).
• **Simple Interest ($A = P(1 + rt)$):** Agar interest amount nikalna hai to Principal $P$ aur Rate $r$ likhein.
• **Equation Solving:** Kisi specific equation ke liye poori statement likhein (jaise: $2x + 5 = 15$), ya phir app ke **"Math & Formulas"** tab mein jakar formula calculator use karein!`;
      }
    }

    // Kashmir tea timings & culture handler
    if ((rawLower.includes("kashmir") || rawLower.includes("कश्मीर") || rawLower.includes("کشمیر")) && (rawLower.includes("chai") || rawLower.includes("tea") || rawLower.includes("चाय") || rawLower.includes("چائے") || rawLower.includes("kahwa") || rawLower.includes("noon"))) {
      if (language === "hindi" || /[\u0900-\u097F]/.test(query)) {
        return `**Answer:** कश्मीर में चाय पीने के मुख्य समय और संस्कृति:

कश्मीर में चाय सिर्फ एक पेय नहीं बल्कि कश्मीरी जीवनशैली और मेहमाननवाज़ी का अहम हिस्सा है। दिनभर में मुख्य रूप से 3 समय चाय पी जाती है:

**Explain:**

1. **सुबह का समय (नाश्ता - प्रातः 7:00 से 10:00 बजे):**
   • इस समय कश्मीर की प्रसिद्ध **'नून चाय' (Noon Chai / शीर चाय - नमकीन गुलाबी चाय)** पी जाती है।
   • इसके साथ कश्मीरी पारंपरिक रोटी जैसे **लवासा (Lavasa), त्सोत (Czot/Girda)** मक्खन के साथ खाई जाती है।

2. **दोपहर / तीसरे पहर का समय (दोपहर 3:30 से 5:00 बजे):**
   • दोपहर के बाद दोबारा नून चाय या मीठी दूध की चाय पी जाती है।
   • इसके साथ कश्मीरी बेकरी उत्पाद जैसे **तेलवोर (Telvor), कुलचा या बाकरखानी** परोसी जाती है।

3. **शाम या विशेष मौकों पर (कहवा - Kehwa Time):**
   • **कहवा (Kahwa):** जाफरान (केसर), इलायची, दालचीनी और बारीक कटे बादाम से तैयार पारंपरिक ग्रीन टी।
   • यह सर्दियों में ठंड से बचने, पाचन दुरुस्त रखने और मेहमानों के सत्कार के लिए शाम को या भारी खाने (जैसे वाज़वान) के बाद पेश की जाती है।`;
      } else if (language === "urdu" || /[\u0600-\u06FF]/.test(query)) {
        return `**Answer:** کشمیر میں چائے پینے کے روایتی اوقات اور انداز:

کشمیر میں چائے صرف مشروب نہیں بلکہ تہذیب اور مہمان نوازی کا لازمی حصہ ہے۔ دن بھر میں چائے پینے کے تین خاص اوقات ہوتے ہیں:

**Explain:**

1. **صبح کا ناشتہ (صبح 7:00 سے 10:00 بجے):**
   • اس وقت مشہور **'نون چائے' (نمکین گلابی چائے / شِیر چائے)** پی جاتی ہے۔
   • اس کے ساتھ تندور کی تازہ کشمیری روٹی جیسے **لواسا (Lavasa)، چوت (Czot/Girda)** مکھن کے ساتھ کھائی جاتی ہے۔

2. **دوپہر کے بعد (تیسرے پہر 3:30 سے 5:00 بجے):**
   • دوپہر کے بعد دوبارہ نون چائے یا میٹھی چائے پی جاتی ہے، جس کے ساتھ **کشمیری کلچہ، تلوور (Telvor) یا باقرخانی** پیش کی جاتی ہے۔

3. **شام و خاص مواقع (قہوہ - Kahwa):**
   • **کشمیری قہوہ:** زعفران، الائچی، دار چینی اور بادام کے ٹکڑوں سے تیار کیا جانے والا لذیذ و گرم قہوہ۔
   • یہ شام کو، سردیوں میں سردی سے بچاؤ کے لیے یا وازوان و دیگر ضیافتوں کے بعد ہاضمے اور مہمانوں کی تواضع کے لیے پلایا جاتا ہے۔`;
      } else {
        return `**Answer:** **Kashmir Mein Chai Peene Ke Mukhya Timings Aur Riwayat:**

Kashmir mein chai sirf aik drink nahi balki rooz-marrah culture aur mehmaan-nawazi ka markaz hai. Aam tor par din mein 3 martaba khas taur par chai pi jaati hai:

**Explain:**

1. **Subah Ka Waqt (Nashta — 7:30 AM se 10:00 AM):**
   • Is waqt mashhoor **'Noon Chai' (Namkeen Gulabi Chai / Sheer Chai)** pi jaati hai.
   • Saath mein Kandur (Traditional Kashmiri Baker) ki taaza rotiyan: **Lavasa, Czot/Girda** makkhan ke saath khai jaati hain.

2. **Dopahar Ka Waqt (Afternoon — 3:30 PM se 5:00 PM):**
   • Asr ke aas-paas dobara Noon chai ya meethi doodh wali chai pi jaati hai.
   • Iske saath **Kashmiri Kulcha, Telvor (sesame bread), ya Bakarkhani** nosh ki jaati hai.

3. **Shaam Ya Dawat Ke Baad (Kahwa / Kehwa Time):**
   • **Kashmiri Kahwa:** Zafran (Saffron), Elaichi (Cardamom), Dalchini aur Badam (Almonds) se bani golden herbal tea.
   • Sardi ke mausam mein jism ko garam rakhne aur Wazwan ya dawat ke baad hazmay ke liye aur mehmaano ke aizaaz mein pesh ki jaati hai.`;
      }
    }

    // Direct domain mappings for common student / DIY terms
    let targetDirect: string | null = null;
    if (rawLower.includes("battery") || rawLower.includes("بیٹری") || rawLower.includes("बैटरी")) targetDirect = "Electric battery";
    else if (rawLower.includes("generator") || rawLower.includes("جنریٹر")) targetDirect = "Electric generator";
    else if (rawLower.includes("motor") || rawLower.includes("موٹر")) targetDirect = "Electric motor";
    else if (rawLower.includes("solar") || rawLower.includes("سولر")) targetDirect = "Solar panel";
    else if (rawLower.includes("inverter") || rawLower.includes("انورٹر")) targetDirect = "Power inverter";
    else if (rawLower.includes("transformer") || rawLower.includes("ٹرانسفارمر")) targetDirect = "Transformer";
    else if (rawLower.includes("photosynthesis") || rawLower.includes("ضیائی تالیف")) targetDirect = "Photosynthesis";
    else if (rawLower.includes("aeroplane") || rawLower.includes("airplane") || rawLower.includes("jahaz")) targetDirect = "Airplane";
    else if (rawLower.includes("namaz") || rawLower.includes("namazain") || rawLower.includes("نماز") || rawLower.includes("नमाज") || rawLower.includes("salah")) targetDirect = "Salah";

    // 2. Smart Keyword Extraction (removing conversational question words & particles)
    let clean = targetDirect || query
      .replace(/\b(?:mujhe|mujhi|mujhko|humko|humri|hamari|hamara|mera|meri|mere|aap|aapko|apna|apni|apne|tum|tumhe|eak|ek|aik|kuch|banani|banao|bana|karo|karna|karenge|chahiye|kaise|kis|tarah|sir|bhai|batao|bataiye|samjhao|explain|define|sikhao|sikhna|kya|ka|ke|ki|ko|se|mein|me|mia|mai|hai|h|hia|hota|hoti|hote|famous|mashhoor|kise|kehte|hain|what|who|where|when|why|how|is|are|the|about|slove|solve|kisne|ne|banaya|tha|thi|the|kab|kahan|kyun|kaun|koun|konsa|kon|sa|kaisi|kisi|kitna|kitne|kitni)\b/gi, " ")
      .replace(/(?:में|कितनी|कितने|कितना|होते|होती|हैं|है|क्या|का|की|के|को|से|पर|और|बारे|बताओ|समझाओ|किए|गए|था|थी|थे|میں|کتنی|کتنے|کتنا|ہوتے|ہوتی|ہیں|ہے|کیا|کا|کی|کے|کو|سے|پر|اور|بارے|بتائیں)/g, " ")
      .replace(/[₹$@#%^&*()_+=[\]{};:"\\|<>,\.?\/؟]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!clean || clean.length < 2) {
      clean = query.replace(/[?؟\.\!]/g, "").trim();
    }
    if (!clean || clean.length < 2) return null;

    // Detect if search has Devanagari or Urdu
    const hasDevanagari = /[\u0900-\u097F]/.test(clean);
    const hasUrduScript = /[\u0600-\u06FF]/.test(clean);
    const wikiLang = hasDevanagari ? "hi" : (hasUrduScript ? "ur" : "en");

    // Step A: Opensearch
    let targetTitle = clean;
    try {
      const openUrl = `https://${wikiLang}.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(clean)}&limit=3&namespace=0&origin=*&format=json`;
      const openRes = await fetch(openUrl, {
        headers: { "User-Agent": "SS-AI-StudyGuru/1.0 (Educational Assistant)" }
      });
      if (openRes.ok) {
        const openData = await openRes.json();
        if (openData && openData[1] && openData[1].length > 0) {
          targetTitle = openData[1][0];
        }
      }
    } catch {}

    // Step B: Fetch verified article summary
    let wikiUrl = `https://${wikiLang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(targetTitle)}`;
    let wikiRes = await fetch(wikiUrl, {
      headers: { "User-Agent": "SS-AI-StudyGuru/1.0 (Educational Assistant)" }
    });

    // If Hindi/Urdu lookup yielded nothing, try English Wikipedia with original or transliterated target
    if (!wikiRes.ok && wikiLang !== "en") {
      try {
        const fallbackEnUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(clean)}&limit=3&namespace=0&origin=*&format=json`;
        const fbRes = await fetch(fallbackEnUrl, { headers: { "User-Agent": "SS-AI-StudyGuru/1.0" } });
        if (fbRes.ok) {
          const fbData = await fbRes.json();
          if (fbData && fbData[1] && fbData[1].length > 0) {
            targetTitle = fbData[1][0];
            wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(targetTitle)}`;
            wikiRes = await fetch(wikiUrl, { headers: { "User-Agent": "SS-AI-StudyGuru/1.0" } });
          }
        }
      } catch {}
    }

    if (wikiRes.ok) {
      const data = await wikiRes.json();
      if (data && data.extract && data.extract.length > 25) {
        const title = data.title || targetTitle;
        const extract = data.extract;
        const firstSentence = extract.split(". ")[0] + ".";

        if (language === "urdu") {
          return `**Answer:** **${title}** کے متعلق مصدقہ تعلیمی معلومات:
${firstSentence}

**Explain:**
• **بنیادی تعارف:** ${extract}
• **اہم خصوصیات و حقائق:** یہ موضوع درسی کتب اور جنرل نالج کا مستند اور اہم حصہ ہے۔
• **امتحانی رہنمائی:** امتحان میں ایسے سوالات کے لیے اہم نام، تواریخ، اور بنیادی حقائق کو ترتیب وار نکات میں لکھیں۔`;
        } else if (language === "hindi") {
          return `**Answer:** **${title}** के संबंध में प्रामाणिक शैक्षणिक जानकारी:
${firstSentence}

**Explain:**
• **मुख्य परिचय:** ${extract}
• **प्रमुख तथ्य:** यह विषय सामान्य ज्ञान और पाठ्यक्रम के दृष्टिकोण से अत्यंत महत्वपूर्ण है।
• **परीक्षा युक्ति:** सटीक तथ्यों और मुख्य शब्दों (Key Terms) को रेखांकित करके उत्तर प्रस्तुत करें।`;
        } else {
          return `**Answer:** **${title}** — Complete Knowledge Guide:
${firstSentence}

**Explain:**
• **Core Facts & Overview:** ${extract}
• **Practical Working & Usage:** Yeh real-world application aur academic syllabus ka bunyadi concept hai.
• **Exam & Practical Tip:** Key mechanisms aur scientific terminologies ko clear headings mein likhein.`;
        }
      }
    }
  } catch (err) {
    // Ignore and proceed to static fallback
  }
  return null;
}

type CheatSheetSubject = "physics" | "chemistry" | "biology" | "math" | "history" | "law" | "general";

function detectTopicSubject(topic: string, grade: string = ""): CheatSheetSubject {
  const lower = topic.toLowerCase();
  const gradeLower = grade.toLowerCase();

  // Check Science & Math scientific "laws" FIRST so "Ohm's Law", "Newton's Law", "Boyle's Law", etc. are NEVER misclassified as Legal Law
  const isPhysics =
    /\b(physics|ohm|volt|voltage|current|resistance|newton|motion|gravity|gravitation|force|acceleration|momentum|inertia|friction|light|optics|mirror|lens|refraction|reflection|electricity|magnet|magnetic|circuit|thermodynamics|entropy|heat|work|energy|power|wave|sound|electrostatics|coulomb|faraday|kirchhoff|hooke|boyle|charles|bernoulli|snell|quantum|relativity|capacitor|inductor|transformer)\b/i.test(lower);
  if (isPhysics) return "physics";

  const isChemistry =
    /\b(chemistry|chemical|atom|molecule|mole|periodic|acid|base|ph|salt|reaction|oxidation|reduction|redox|covalent|ionic|bond|valency|hydrocarbon|alkane|alkene|organic|inorganic|polymer|electrolysis|solution|molarity|stoichiometry|enthalpy|catalyst|isotopes)\b/i.test(lower);
  if (isChemistry) return "chemistry";

  const isBiology =
    /\b(biology|cell|mitochondria|photosynthesis|respiration|dna|rna|gene|genetics|evolution|ecosystem|human heart|brain|kidney|digestion|blood|plant|animal|bacteria|virus|enzyme|hormone|nervous system|reproduction|osmosis|diffusion|chlorophyll)\b/i.test(lower);
  if (isBiology) return "biology";

  const isMath =
    /\b(math|maths|algebra|geometry|trigonometry|calculus|derivative|differentiation|integration|integral|matrix|matrices|determinant|probability|statistics|quadratic|polynomial|pythagoras|triangle|circle|theorem|logarithm|permutation|combination|vector|equation|arithmetic|progression|fraction|percentage)\b/i.test(lower);
  if (isMath) return "math";

  const isHistory =
    /\b(history|mughal|indus valley|harappa|freedom struggle|independence|1857|gandhi|nehru|ashoka|maurya|gupta|world war|revolution|constitution|article|fundamental rights|parliament|president|governor|democracy|civics|polity|jkssb|upsc|ancient|medieval|modern india)\b/i.test(lower);
  if (isHistory) return "history";

  // Genuine Legal / Law detection ONLY on explicit legal terms or explicit Law grade (never bare word "law")
  const isGenuineLaw =
    gradeLower.includes("law") ||
    gradeLower.includes("bns") ||
    gradeLower.includes("legal") ||
    /\b(bns|bnss|bsa|ipc|crpc|cpc|section\s+\d+|article\s+\d+|penal code|evidence act|contract act|tort|bail|fir|affidavit|plaint|written statement|injunction|stay order|decree|summons|jurisdiction|judiciary|supreme court|high court|magistrate|advocate|legal notice|criminal law|civil law|family law|constitutional law)\b/i.test(lower);
  if (isGenuineLaw) return "law";

  return "general";
}

function generateLocalCheatSheet(topic: string, grade: string, language: string) {
  const cleanTopic = topic.trim() || "General Study";
  const subject = detectTopicSubject(cleanTopic, grade);
  const lower = cleanTopic.toLowerCase();

  // High-accuracy built-in sheets for common core Physics/Science/Math/History/Law topics
  if (lower.includes("ohm")) {
    return {
      topicTitle: `Ohm's Law & Electric Circuits (${subject.toUpperCase()})`,
      quickSummary:
        "1. Statement: At constant temperature, electric current (I) flowing through a metallic conductor is directly proportional to the potential difference (V) across its ends (V ∝ I).\n" +
        "2. Mathematical Form: V = I × R, where R is Resistance measured in Ohms (Ω).\n" +
        "3. Graph: A V–I graph for an Ohmic conductor is always a straight line passing through the origin; its slope gives Resistance (R = V/I).",
      guaranteedQuestions: [
        {
          question: "State Ohm's Law and draw/describe the V–I graph for an Ohmic conductor.",
          highYieldAnswer:
            "• Statement: Current (I) ∝ Potential Difference (V) provided temperature and physical conditions remain constant.\n" +
            "• Derivation: V = I · R (where R is constant of proportionality called Resistance).\n" +
            "• V–I Graph: Straight line passing through origin (0, 0). Slope = ΔV / ΔI = R.",
          marksWeightage: "3 Marks (99% Repeated)"
        },
        {
          question: "What is 1 Ohm resistance? Calculate current if V = 12 V and R = 4 Ω.",
          highYieldAnswer:
            "• 1 Ohm: Resistance is 1 Ω when 1 A current flows under a potential difference of 1 V (1 Ω = 1 V / 1 A).\n" +
            "• Numerical: Given V = 12 V, R = 4 Ω → I = V / R = 12 / 4 = 3 A.",
          marksWeightage: "2–3 Marks"
        }
      ],
      formulaVault: [
        {
          name: "Ohm's Law",
          formula: "V = I × R",
          variables: "V = Voltage (Volt, V), I = Current (Ampere, A), R = Resistance (Ohm, Ω)",
          tip: "Triangle trick: Cover what you want to find — V on top, I and R at bottom."
        },
        {
          name: "Resistance of a Wire",
          formula: "R = ρ × (L / A)",
          variables: "ρ = Resistivity (Ω·m), L = Length (m), A = Cross-sectional area (m²)",
          tip: "Resistance increases with length (R ∝ L) and decreases with thickness (R ∝ 1/A)."
        }
      ],
      examinerTraps: [
        {
          trap: "Forgetting the condition 'at constant temperature'",
          howToAvoid: "Ohm's law is only valid when temperature remains constant. Always write 'at constant temperature' in the definition!"
        },
        {
          trap: "Writing mA or kΩ without converting to Ampere / Ohm",
          howToAvoid: "Convert milliamperes (1 mA = 10⁻³ A) and kilo-ohms (1 kΩ = 10³ Ω) before substituting into V = IR."
        }
      ],
      oneLineMemoryTrick: "VIR = 'Very Important Rule' → V = I × R (and R doesn't change when V or I changes at constant temp!)",
      disclaimer: "S.S AI Study Guru • Physics Revision Sheet"
    };
  }

  if (lower.includes("newton")) {
    return {
      topicTitle: `Newton's Laws of Motion (Physics)`,
      quickSummary:
        "1. First Law (Law of Inertia): An object remains at rest or in uniform straight-line motion unless acted upon by an external unbalanced force.\n" +
        "2. Second Law: Rate of change of momentum is directly proportional to applied force → F = m × a (SI unit: Newton, N).\n" +
        "3. Third Law: Every action has an equal and opposite reaction acting on two different bodies (F₁₂ = -F₂₁).",
      guaranteedQuestions: [
        {
          question: "Derive F = m × a from Newton's Second Law of Motion.",
          highYieldAnswer:
            "• Initial momentum p₁ = m·u, Final momentum p₂ = m·v in time t.\n" +
            "• Rate of change of momentum = (m·v - m·u) / t = m·(v - u)/t = m·a.\n" +
            "• By 2nd Law: F ∝ m·a → F = k·m·a (with k = 1 in SI units, F = m·a).",
          marksWeightage: "3–5 Marks"
        },
        {
          question: "Why do passengers jerk forward when a moving bus suddenly stops?",
          highYieldAnswer:
            "• Due to Inertia of Motion (Newton's 1st Law): Lower body stops with the bus seat, while upper body tends to stay in forward motion.",
          marksWeightage: "2 Marks"
        }
      ],
      formulaVault: [
        {
          name: "Force (Second Law)",
          formula: "F = m × a = Δp / Δt",
          variables: "F = Force (N), m = Mass (kg), a = Acceleration (m/s²), p = Momentum (kg·m/s)",
          tip: "1 Newton = 1 kg·m/s²."
        },
        {
          name: "Conservation of Momentum",
          formula: "m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂",
          variables: "u = initial velocity, v = final velocity",
          tip: "Always take opposite directions with opposite signs (+ and -)."
        }
      ],
      examinerTraps: [
        {
          trap: "Thinking action and reaction cancel each other out",
          howToAvoid: "Action and reaction NEVER cancel because they act on TWO DIFFERENT objects!"
        }
      ],
      oneLineMemoryTrick: "1-2-3 = I-F-AR → 1st: Inertia, 2nd: F = ma, 3rd: Action-Reaction!",
      disclaimer: "S.S AI Study Guru • Physics Revision Sheet"
    };
  }

  const subjectLabels: Record<CheatSheetSubject, string> = {
    physics: "Physics",
    chemistry: "Chemistry",
    biology: "Biology",
    math: "Mathematics",
    history: "History & Civics",
    law: "Law & Legal Studies",
    general: grade || "Academic Study",
  };

  const subjectLabel = subjectLabels[subject];

  const subjectFormulaDefault =
    subject === "physics" || subject === "chemistry"
      ? {
          name: `${cleanTopic} — Core Equation / Law`,
          formula: "Identify Governing Equation & SI Units",
          variables: "List each physical quantity, symbol, and standard SI unit clearly.",
          tip: "Write 'Given → Formula → Substitution → Unit' in every numerical answer."
        }
      : subject === "math"
      ? {
          name: `${cleanTopic} — Key Formula / Identity`,
          formula: "State Theorem / Standard Algebraic Expression",
          variables: "Define every variable, domain constraint, and step transformation.",
          tip: "Show intermediate steps clearly; box the final simplified result."
        }
      : subject === "biology"
      ? {
          name: `${cleanTopic} — Biological Process / Pathway`,
          formula: "Input / Reactants → Key Organelle / Mechanism → Output",
          variables: "Label key enzymes, cell structures, and biological functions.",
          tip: "Include a neat labeled diagram whenever possible for extra marks."
        }
      : subject === "history"
      ? {
          name: `${cleanTopic} — Timeline & Key Milestones`,
          formula: "Background Cause → Turning Point / Date → Historical Impact",
          variables: "Key dates, personalities, places, and constitutional/historical outcomes.",
          tip: "Highlight exact years, names, and primary causes in bullet points."
        }
      : subject === "law"
      ? {
          name: `${cleanTopic} — Statutory Provision & Elements`,
          formula: "Relevant Act & Section → Essential Elements → Legal Consequence",
          variables: "Applicable statutory section, landmark precedent, and jurisdiction.",
          tip: "Cite exact Act/Section numbers and essential ingredients clearly."
        }
      : {
          name: `${cleanTopic} — Core Principle & Key Takeaways`,
          formula: "Definition → Core Mechanism / Rule → Real-World Application",
          variables: "Primary terms, key facts, and subject-specific examples.",
          tip: "Keep answers crisp with bold headings and 3 structured points."
        };

  return {
    topicTitle: `${cleanTopic} • ${subjectLabel} Revision Sheet`,
    quickSummary:
      `1. Core Concept (${subjectLabel}): Understand the exact textbook definition and primary rule governing "${cleanTopic}".\n` +
      `2. Key Mechanism / Facts: Break "${cleanTopic}" into clear cause-and-effect points, formulas, or key characteristics.\n` +
      `3. Exam Presentation: Write answers in crisp numbered points with highlighted keywords and accurate examples.`,
    guaranteedQuestions: [
      {
        question:
          subject === "law"
            ? `Explain the key legal provisions and essential elements of ${cleanTopic}.`
            : `Define ${cleanTopic} and explain its main principles, working, or key features.`,
        highYieldAnswer:
          subject === "law"
            ? `• State the exact Act, Section, or constitutional provision.\n• List essential legal ingredients and exceptions.\n• Give a brief landmark case or practical illustration.`
            : `• Start with a precise 1–2 line textbook definition.\n• Explain the core rule, equation, or mechanism step by step.\n• Include a clear example or labeled diagram for full marks.`,
        marksWeightage: "3–5 Marks (High Probability)"
      },
      {
        question: `What are the important applications or significance of ${cleanTopic}?`,
        highYieldAnswer:
          `• Write 2 real-world or syllabus-based applications.\n• Mention any key condition, exception, or boundary limit.`,
        marksWeightage: "2–3 Marks"
      }
    ],
    formulaVault: [subjectFormulaDefault],
    examinerTraps: [
      {
        trap:
          subject === "physics" || subject === "chemistry" || subject === "math"
            ? `Missing units, sign errors, or skipping intermediate steps in ${cleanTopic}`
            : `Writing vague paragraphs without key terms in ${cleanTopic}`,
        howToAvoid:
          subject === "physics" || subject === "chemistry" || subject === "math"
            ? "Convert all values to standard SI units first, check +/- signs carefully, and underline the final unit."
            : "Use clear subheadings, exact technical terms/dates, and concise bullet points."
      }
    ],
    oneLineMemoryTrick: `Break "${cleanTopic.slice(0, 28)}" into 3 steps: Define → Key Rule/Fact → Example!`,
    disclaimer: `S.S AI Study Guru • ${subjectLabel} Revision Sheet`
  };
}

async function startServer() {
  const app = express();
  const PORT = process.env.NODE_ENV === "production"
    ? (process.env.PORT ? parseInt(process.env.PORT, 10) : 3000)
    : 3000;

  // Global CORS and PWABuilder bot compatibility headers
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // Explicitly serve public assets with CORS for PWABuilder and App Store crawlers
  // Explicitly serve public assets with CORS for PWABuilder and App Store crawlers
  const publicPath = path.join(process.cwd(), "public");
  app.use(express.static(publicPath, {
    dotfiles: "allow",
    setHeaders: (res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cache-Control", "public, max-age=3600");
    }
  }));

  // Direct assetlinks handler for Google Play App Linking & Android App Verification
  const sendAssetlinks = (req: express.Request, res: express.Response) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=3600");
    const assetlinksPath = path.join(publicPath, ".well-known", "assetlinks.json");
    if (fs.existsSync(assetlinksPath)) {
      try {
        const content = fs.readFileSync(assetlinksPath, "utf-8");
        return res.send(content);
      } catch (err) {
        console.error("Error reading assetlinks.json:", err);
      }
    }
    return res.json([
      {
        relation: ["delegate_permission/common.handle_all_urls"],
        target: {
          namespace: "android_app",
          package_name: "com.ss.aistudyguruapp",
          sha256_cert_fingerprints: [
            "E6:63:E1:53:6D:F8:EC:4D:2C:BD:B5:A2:3D:57:2F:90:42:82:64:37:12:91:2C:5B:1B:C6:E0:43:85:3D:7C:22",
            "14:6D:E9:7F:0F:52:EA:CB:58:3B:56:88:51:7A:B7:AE:E3:6B:4C:BA:FE:0C:44:8D:19:D4:56:32:0A:79:BD:05"
          ]
        }
      },
      {
        relation: ["delegate_permission/common.handle_all_urls"],
        target: {
          namespace: "android_app",
          package_name: "com.ssstudyguru.app",
          sha256_cert_fingerprints: [
            "E6:63:E1:53:6D:F8:EC:4D:2C:BD:B5:A2:3D:57:2F:90:42:82:64:37:12:91:2C:5B:1B:C6:E0:43:85:3D:7C:22",
            "14:6D:E9:7F:0F:52:EA:CB:58:3B:56:88:51:7A:B7:AE:E3:6B:4C:BA:FE:0C:44:8D:19:D4:56:32:0A:79:BD:05"
          ]
        }
      }
    ]);
  };

  app.get("/.well-known/assetlinks.json", sendAssetlinks);
  app.get("/assetlinks.json", sendAssetlinks);

  app.get("/manifest.json", (req, res) => {
    res.setHeader("Content-Type", "application/manifest+json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(publicPath, "manifest.json"));
  });

  // Configure high payload limit for base64 photo uploads & scans
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Global JSON error handler to prevent HTML 413 error responses
  app.use((err: any, req: any, res: any, next: any) => {
    if (err) {
      console.error("Payload/Middleware error:", err?.message || err);
      return res.status(err.status || 400).json({
        error: err.message || "Invalid payload or payload too large.",
        status: "error"
      });
    }
    next();
  });

    // Ultra-HD Studio Voice (TTS) Engine Endpoint
  app.post("/api/tts", async (req, res) => {
    try {
      const { text, language = "hinglish" } = req.body || {};
      if (!text || typeof text !== "string" || !text.trim()) {
        return res.status(400).json({ error: "Text is required." });
      }

      // Clean text from markdown formatting and asterisks
      const cleanText = text
        .replace(/[*#_~`>]/g, "")
        .replace(/\s+/g, " ")
        .slice(0, 1000)
        .trim();

      // Map language to proper Google TTS locale
      let langCode = "ur"; // Urdu default
      const lowerLang = language.toLowerCase();
      if (lowerLang.includes("hindi") || lowerLang.includes("hi")) {
        langCode = "hi";
      } else if (lowerLang.includes("english") || lowerLang.includes("en")) {
        langCode = "en-IN";
      } else if (lowerLang.includes("kashmiri") || lowerLang.includes("urdu") || lowerLang.includes("hinglish")) {
        langCode = "ur";
      }

      const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText.slice(0, 200))}&tl=${langCode}&client=tw-ob`;

      const response = await fetch(googleTtsUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });

      if (response.ok) {
        const audioBuffer = await response.arrayBuffer();
        res.setHeader("Content-Type", "audio/mpeg");
        res.setHeader("Cache-Control", "public, max-age=86400");
        return res.send(Buffer.from(audioBuffer));
      }

      return res.status(500).json({ error: "TTS service unavailable", fallback: true });
    } catch (err: any) {
      console.error("TTS generation error:", err?.message || err);
      return res.status(500).json({ error: "TTS error", fallback: true });
    }
  });

  // AI Image Generation Endpoint (ChatGPT DALL-E 3 & Neural AI Diffusion Grade)
  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt, aspectRatio = "1:1" } = req.body || {};
      if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
        return res.status(400).json({ error: "Prompt is required." });
      }

      const ai = getGenAIForCall();
      let enhancedEnglishPrompt = prompt.trim();

      // Step 1: Use Gemini 3.5 Flash Lite to extract subject & optimize into accurate, realistic English prompt
      if (ai) {
        try {
          const enhanceResponse = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: `You are an expert AI Image Prompt Engineer.
The user requested an image or photo in Roman Urdu, Urdu, Hindi, or English: "${prompt}".
Generate the most accurate, high-fidelity English prompt (max 30 words) for an image generator.
Rules:
1. If the user asks for a MAP (e.g. India map, world map), educational chart, atlas, or diagram: Output a clean, accurate 2D cartographic political map with clear boundaries, educational atlas style, isolated on clean background. Absolutely NO sci-fi, glowing, futuristic, or fantasy landscape elements.
2. If the user asks for a real person, animal, nature, place, or object: Output a clean, crisp, natural realistic photograph with natural lighting.
3. If the user asks for artistic/painting style: Match their requested style accurately.
4. Output ONLY the plain English prompt text without quotes, prefixes, or explanations.`,
            config: { maxOutputTokens: 60, temperature: 0.3 }
          });
          const text = enhanceResponse.text?.trim();
          if (text && text.length > 5) {
            enhancedEnglishPrompt = text.replace(/["']/g, "").trim();
          }
        } catch {
          // If prompt enhancer skips, proceed smoothly with user's original prompt
        }
      }

      // Step 2: Determine dimensions based on aspect ratio
      let width = 1024;
      let height = 1024;
      if (aspectRatio === "16:9") {
        width = 1280;
        height = 720;
      } else if (aspectRatio === "9:16") {
        width = 720;
        height = 1280;
      } else if (aspectRatio === "4:3") {
        width = 1024;
        height = 768;
      } else if (aspectRatio === "3:4") {
        width = 768;
        height = 1024;
      }

      // Step 3: High-Reliability Neural AI Image Synthesis (Clean render, nologo, no hallucinations)
      const seed = Math.floor(Math.random() * 10000000);
      const encoded = encodeURIComponent(enhancedEnglishPrompt.slice(0, 350));
      const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&model=flux&nologo=true&seed=${seed}`;

      return res.json({
        imageUrl,
        enhancedPrompt: enhancedEnglishPrompt,
        source: "neural-flux",
        success: true
      });
    } catch {
      const seed = Math.floor(Math.random() * 10000000);
      const safePrompt = encodeURIComponent((req.body?.prompt || "vibrant digital art 8k masterpiece").slice(0, 150));
      return res.json({
        imageUrl: `https://image.pollinations.ai/prompt/${safePrompt}?width=1024&height=1024&model=flux&nologo=true&seed=${seed}`,
        enhancedPrompt: req.body?.prompt || "Digital Art",
        source: "neural-flux",
        success: true
      });
    }
  });

  // Background Warm-up Endpoint (Cold Start Preventer - Zero API Cost)
  app.get("/api/warmup", (req, res) => {
    const hasKey = !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim());
    return res.json({ status: "warm", aiReady: hasKey, timestamp: Date.now() });
  });

  // API endpoint for S.S AI Study Guru Chat (Standard)
  app.post("/api/chat", async (req, res) => {
    try {
      const { query, language = "hinglish", mode = "guru", useSearch } = req.body;
      if (!query || typeof query !== "string") {
        return res.status(400).json({ error: "Query is required." });
      }

      const cacheKey = getCacheKey(query, language, mode);
      const cached = getFromCache(cacheKey);
      if (cached && cached.text) {
        return res.json({
          response: cached.text,
          sources: cached.sources,
          groundedWithGoogle: cached.groundedWithGoogle || false,
          fallback: false,
          fromCache: true
        });
      }

      const systemInstruction = getTutorSystemInstruction(language);

      // 1. Google Search Grounding for live/current events or when search is requested
      const isCurrentQuery =
        useSearch === true ||
        /\b(google search|search web|live web|search internet)\b/i.test(query);

      if (isCurrentQuery) {
        try {
          const ai = getGenAIForCall();
          if (ai) {
            const searchConfig: any = {
              systemInstruction,
              temperature: 0.3,
              tools: [{ googleSearch: {} }],
            };
            let searchRes: any = null;
            for (const sModel of ["gemini-3.5-flash-lite", "gemini-3.8-flash", "gemini-flash-latest"]) {
              try {
                searchRes = await generateWithTimeout(
                  ai.models.generateContent({
                    model: sModel,
                    contents: query,
                    config: searchConfig,
                  }),
                  6000
                );
                if (searchRes && searchRes.text) break;
              } catch {}
            }
            if (searchRes && searchRes.text) {
              const text = searchRes.text || "";
              const chunks = searchRes.candidates?.[0]?.groundingMetadata?.groundingChunks;
              const sources = (chunks || [])
                .filter((c: any) => c.web?.uri)
                .map((c: any) => ({
                  title: c.web.title || "Google Search Source",
                  uri: c.web.uri,
                }));

              if (text.trim()) {
                saveToCache(cacheKey, { text, sources, groundedWithGoogle: true });
                return res.json({
                  response: text,
                  sources,
                  groundedWithGoogle: true,
                  fallback: false,
                });
              }
            }
          }
        } catch (err: any) {
          console.warn("Search grounding fallback to standard:", err?.status || err?.message?.slice(0, 100));
        }
      }

      let responseText = "";
      let success = false;

      for (const modelName of MODELS_FALLBACK) {
        const ai = getGenAIForCall();
        if (!ai) break;
        try {
          const config = buildModelConfig(
            modelName,
            systemInstruction,
            mode === "quick" ? 600 : 1800,
            0.25
          );

          const response = await generateWithTimeout(
            ai.models.generateContent({
              model: modelName,
              contents: query,
              config,
            }),
            22000
          );
          responseText = response.text || "";
          if (responseText.trim()) {
            success = true;
            saveToCache(cacheKey, { text: responseText });
            break;
          }
        } catch (err: any) {
          const isRateLimit = err?.status === 429 || err?.message?.includes("RESOURCE_EXHAUSTED") || err?.message?.includes("429");
          const isUnavailable = err?.status === 503 || err?.message?.includes("UNAVAILABLE") || err?.message?.includes("high demand");
          console.debug(`Model ${modelName} ${isRateLimit ? "rate limit (429)" : isUnavailable ? "high demand (503)" : "unavailable"}, trying next:`, err?.status || err?.message?.slice(0, 100));
          if (isRateLimit) {
            rotateApiKey();
            await delay(200);
          }
          continue;
        }
      }

      if (success) {
        return res.json({ response: responseText, fallback: false });
      } else {
        const wikiAnswer = await fetchEncyclopediaFallback(query, language);
        if (wikiAnswer) {
          return res.json({ response: wikiAnswer, fallback: false, sources: [{ title: "Verified Academic Encyclopedia", uri: "https://en.wikipedia.org" }] });
        }
        return res.json({ response: null, fallback: true });
      }
    } catch (err: any) {
      return res.json({ response: null, fallback: true });
    }
  });

  // Streaming API endpoint for ultra-fast response rendering (Typewriter / Realtime SSE)
  app.post("/api/chat/stream", async (req, res) => {
    const { query, language = "hinglish", mode = "guru", useSearch } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Query is required." });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    if (typeof res.flushHeaders === "function") {
      res.flushHeaders();
    }

    try {
      const cacheKey = getCacheKey(query, language, mode);
      const cached = getFromCache(cacheKey);
      if (cached && cached.text) {
        // Stream cached response instantly to user with ZERO API quota consumption!
        const words = cached.text.split(" ");
        for (let i = 0; i < words.length; i += 4) {
          const piece = words.slice(i, i + 4).join(" ") + (i + 4 < words.length ? " " : "");
          res.write(`data: ${JSON.stringify({ text: piece })}\n\n`);
          if (typeof (res as any).flush === "function") (res as any).flush();
          await delay(20);
        }
        if (cached.sources && cached.sources.length > 0) {
          res.write(`data: ${JSON.stringify({ sources: cached.sources, groundedWithGoogle: cached.groundedWithGoogle || false })}\n\n`);
        }
        res.write("data: [DONE]\n\n");
        return res.end();
      }

      const isCurrentQuery =
        useSearch === true ||
        /\b(google search|search web|live web|search internet)\b/i.test(query);

      const systemInstruction = getTutorSystemInstruction(language);

      // 1. Google Search Grounding streaming attempt when search is explicitly requested
      if (isCurrentQuery) {
        try {
          const ai = getGenAIForCall();
          if (ai) {
            const searchConfig: any = {
              systemInstruction,
              temperature: 0.3,
              tools: [{ googleSearch: {} }],
            };
            let searchStream: any = null;
            for (const sModel of ["gemini-3.5-flash-lite", "gemini-3.8-flash", "gemini-flash-latest"]) {
              try {
                const streamPromise = ai.models.generateContentStream({
                  model: sModel,
                  contents: query,
                  config: searchConfig,
                });
                searchStream = await generateWithTimeout(streamPromise, 6000);
                if (searchStream) break;
              } catch {}
            }
            if (!searchStream) throw new Error("Search stream unavailable");
            let streamStarted = false;
            let chunksMetadata: any[] = [];
            for await (const chunk of searchStream) {
              const chunkText = chunk.text;
              if (chunkText) {
                streamStarted = true;
                res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
                if (typeof (res as any).flush === "function") (res as any).flush();
              }
              if (chunk.candidates?.[0]?.groundingMetadata?.groundingChunks) {
                chunksMetadata = chunk.candidates[0].groundingMetadata.groundingChunks;
              }
            }
            if (streamStarted) {
              const sources = (chunksMetadata || [])
                .filter((c: any) => c.web?.uri)
                .map((c: any) => ({
                  title: c.web.title || "Google Search Source",
                  uri: c.web.uri,
                }));
              if (sources.length > 0) {
                res.write(`data: ${JSON.stringify({ sources, groundedWithGoogle: true })}\n\n`);
              }
              res.write("data: [DONE]\n\n");
              return res.end();
            }
          }
        } catch (streamSearchErr: any) {
          console.warn("Search stream fallback to rapid models:", streamSearchErr?.status || streamSearchErr?.message?.slice(0, 100));
        }
      }

      let streamStarted = false;
      let accumulatedStreamText = "";

      for (const modelName of MODELS_FALLBACK) {
        const ai = getGenAIForCall();
        if (!ai) break;
        try {
          const config = buildModelConfig(
            modelName,
            systemInstruction,
            mode === "quick" ? 600 : 1800,
            0.25
          );

          const responseStreamPromise = ai.models.generateContentStream({
            model: modelName,
            contents: query,
            config,
          });

          const responseStream = await generateWithTimeout(responseStreamPromise, 22000);

          for await (const chunk of responseStream) {
            const chunkText = chunk.text;
            if (chunkText) {
              streamStarted = true;
              accumulatedStreamText += chunkText;
              res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
              if (typeof (res as any).flush === "function") {
                (res as any).flush();
              }
            }
          }
          if (streamStarted) {
            if (accumulatedStreamText.trim().length > 15) {
              saveToCache(cacheKey, { text: accumulatedStreamText });
            }
            break;
          }
        } catch (err: any) {
          const isRateLimit = err?.status === 429 || err?.message?.includes("RESOURCE_EXHAUSTED") || err?.message?.includes("429");
          const isUnavailable = err?.status === 503 || err?.message?.includes("UNAVAILABLE") || err?.message?.includes("high demand");
          console.debug(`Stream model ${modelName} ${isRateLimit ? "rate limit (429)" : isUnavailable ? "high demand (503)" : "unavailable"}, trying next:`, err?.status || err?.message?.slice(0, 100));
          if (isRateLimit) {
            rotateApiKey();
            await delay(200);
          }
          continue;
        }
      }

      if (!streamStarted) {
        const wikiAnswer = await fetchEncyclopediaFallback(query, language);
        if (wikiAnswer) {
          res.write(`data: ${JSON.stringify({ text: wikiAnswer })}\n\n`);
          res.write(`data: ${JSON.stringify({ sources: [{ title: "Verified Academic Encyclopedia", uri: "https://en.wikipedia.org" }], groundedWithGoogle: false })}\n\n`);
        } else {
          res.write(`data: ${JSON.stringify({ fallback: true })}\n\n`);
        }
      }

      res.write("data: [DONE]\n\n");
      res.end();
    } catch (err: any) {
      console.error("Chat stream endpoint error:", err?.message || err);
      res.write(`data: ${JSON.stringify({ fallback: true })}\n\n`);
      res.write("data: [DONE]\n\n");
      res.end();
    }
  });

  // 5-Minute Exam Cheat Sheet & Rapid Revision Map API
  app.post("/api/cheat-sheet", async (req, res) => {
    const { topic = "Class 10 Light and Reflection", grade = "General / All Levels", language = "hinglish" } = req.body || {};
    
    try {
      if (!topic || typeof topic !== "string" || !topic.trim()) {
        return res.json(generateLocalCheatSheet("General Physics & Science", grade, language));
      }

      const ai = getGenAIForCall();
      if (!ai) {
        return res.json(generateLocalCheatSheet(topic, grade, language));
      }

      const detectedSubject = detectTopicSubject(topic, grade);

      const systemInstruction = `You are the "5-Minute Rapid Exam Cheat Sheet Architect" for S.S AI Study Guru (created by Shahid Ahmad Sheikh).
Your mission: Generate a 100% authentic, subject-accurate, high-yield 1-page revision sheet for the student's question or topic.

CRITICAL DOMAIN & SUBJECT AUTO-DETECTION RULES:
1. Auto-detect the TRUE academic subject from the topic/question itself (Physics, Chemistry, Biology, Mathematics, History, Civics/Polity, Computer Science, Economics, or Legal/Law) — EVEN IF the selected level is "General Study" or "General Revision"! (Detected hint: "${detectedSubject}").
2. STRICTLY NO CROSS-DOMAIN MIXING OR PLACEHOLDERS:
   - Never inject legal/court terms (such as Actus Reus, Mens Rea, Statutory Sections, Kanooni Dharaayein, or Court Jurisdiction) into Science, Math, History, or General topics! (Note: "Ohm's Law", "Newton's Laws", "Snell's Law", "Boyle's Law", "Coulomb's Law" are PHYSICS/CHEMISTRY, NOT Law!)
   - Never use generic filler phrases like "Standard Formula / Governing Equation" or "Direct Rule / Proportional Relationship".
3. Provide REAL, textbook-grade content:
   - Real, exact definitions and direct answers to the user's question.
   - For Physics, Chemistry, and Math: include REAL formulas, equations, derivations, balanced chemical equations, SI units, and worked constants.
   - For Biology/History: include real biological pathways/processes or exact dates, events, and historical facts.
   - Real, high-probability exam questions with complete model answers.
   - Practical, memorable mnemonics/memory tricks tailored specifically to this topic.

Target Language: ${language} (crystal clear, student-friendly, and accurate).
Target Exam/Grade Level: ${grade}.

Return ONLY valid JSON adhering strictly to this schema:
{
  "topicTitle": "Exact Topic Name • Detected Subject",
  "quickSummary": "Direct 3-point summary answering the question/topic with exact definitions and facts",
  "guaranteedQuestions": [
    {
      "question": "Real high-yield exam question directly related to the topic",
      "highYieldAnswer": "Complete textbook-grade bulleted answer with key terms, derivation steps, or facts",
      "marksWeightage": "2-5 Marks"
    }
  ],
  "formulaVault": [
    {
      "name": "Actual Formula / Law / Key Rule Name",
      "formula": "Real mathematical equation, derivation step, or chemical reaction",
      "variables": "Exact meaning and SI units of every symbol",
      "tip": "Practical numerical or exam application tip"
    }
  ],
  "examinerTraps": [
    {
      "trap": "Specific real mistake students make on THIS exact topic",
      "howToAvoid": "Exact fix to score full marks"
    }
  ],
  "oneLineMemoryTrick": "Specific, catchy memory trick or mnemonic for this exact topic",
  "disclaimer": "S.S AI Study Guru • Verified Revision Sheet"
}`;

      const prompt = `Generate an authentic, subject-accurate 5-Minute Exam Cheat Sheet for: "${topic}" (Level: ${grade}, Language: ${language}). Respond ONLY with valid JSON.`;

      let jsonResult: any = null;

      for (const modelName of MODELS_FALLBACK) {
        const currentAi = getGenAIForCall();
        if (!currentAi) break;
        try {
          const config: any = {
            systemInstruction,
            responseMimeType: "application/json",
            maxOutputTokens: 1800,
          };
          if (modelName === "gemini-3.8-flash" || modelName === "gemini-3.1-flash-lite" || modelName === "gemini-3.5-flash-lite") {
            config.thinkingConfig = { thinkingLevel: ThinkingLevel.MINIMAL };
          } else {
            config.temperature = 0.2;
          }

          const response = await generateWithTimeout(
            currentAi.models.generateContent({
              model: modelName,
              contents: prompt,
              config,
            }),
            15000
          );

          if (response.text) {
            try {
              jsonResult = JSON.parse(response.text);
              if (jsonResult && jsonResult.topicTitle) {
                break;
              }
            } catch {
              const cleaned = response.text.replace(/```json/gi, "").replace(/```/g, "").trim();
              jsonResult = JSON.parse(cleaned);
              if (jsonResult && jsonResult.topicTitle) {
                break;
              }
            }
          }
        } catch (mErr: any) {
          const isRateLimit = mErr?.status === 429 || mErr?.message?.includes("RESOURCE_EXHAUSTED") || mErr?.message?.includes("429");
          if (isRateLimit) {
            rotateApiKey();
            await delay(200);
          }
        }
      }

      if (jsonResult && jsonResult.topicTitle) {
        return res.json(jsonResult);
      }

      return res.json(generateLocalCheatSheet(topic, grade, language));
    } catch (error: any) {
      console.error("Cheat Sheet API error:", error);
      return res.json(generateLocalCheatSheet(topic, grade, language));
    }
  });

  // Dedicated Citizen Justice & Clean Petition Drafting API
  app.post("/api/citizen-justice", async (req, res) => {
    try {
      const {
        applicantName = "Mohammad Yousuf Sheikh",
        parentage = "S/o Ghulam Ahmad Sheikh",
        address = "Main Town, District Anantnag, J&K",
        phone = "+91 94190 00000",
        problem = "",
        language = "urdu",
        formatType = "petition" // 'petition' or 'simple_darkhwast'
      } = req.body || {};

      const trackingRef = `CITIZEN-LEGAL/${new Date().getFullYear()}/${Math.floor(100000 + Math.random() * 900000)}`;
      const currentDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });

      const ai = getGenAIForCall();
      if (!ai || !problem.trim()) {
        return res.json({ text: null, fallback: true, ref: trackingRef });
      }

      const systemInstruction = `You are the Official Legal & Citizen Grievance Drafting Engine for S.S AI (Founded by SHAHID AHMAD SHEIKH).
CRITICAL FORMATTING MANDATES:
1. NEVER output markdown asterisks or stars (like **To,** or **1. Applicant:** or **Ref:**). Output 100% CLEAN PLAIN TEXT suitable for direct printing on official A4 / Stamp Paper.
2. NEVER output "Answer:" or "Explain:" or "Core Concept" or "Exam Tip". You are drafting a legal petition, NOT tutoring a student.
3. Use clean UPPERCASE titles, clear paragraph numbers (1., 2., 3., 4.), and proper spacing.
4. Output in the requested language:
   - If language is 'urdu': Write formal, high-standard Urdu petition / Darkhwast.
   - If language is 'english': Write formal statutory High Court / Administrative notice.
   - If language is 'hindi': Write formal Hindi grievance petition.
   - If language is 'kashmiri': Write clear Kashmiri / Urdu summary petition.
5. End with Verification Affidavit, Date, Place, and Applicant Signature block, followed by the Statutory Self-Drafting Disclaimer.`;

      const prompt = `Draft a 100% clean official grievance petition (NO asterisks like **, NO "Answer:" or "Explain:" tags) with these details:
Ref Tracking No: ${trackingRef}
Date: ${currentDate}
Applicant Name: ${applicantName}
Parentage: ${parentage}
Address: ${address}
Phone: ${phone}
Language: ${language}
Format Type: ${formatType}

Citizen Grievance / Problem:
"${problem}"`;

      let cleanDraft = "";

      for (const modelName of MODELS_FALLBACK) {
        try {
          const config: any = {
            systemInstruction,
            temperature: 0.2,
            maxOutputTokens: 1200,
          };
          if (modelName === "gemini-3.1-flash-lite" || modelName === "gemini-3.5-flash-lite") {
            config.thinkingConfig = { thinkingLevel: ThinkingLevel.MINIMAL };
          }
          const response = await generateWithTimeout(
            ai.models.generateContent({
              model: modelName,
              contents: prompt,
              config,
            }),
            5000
          );

          if (response.text && response.text.trim()) {
            cleanDraft = response.text
              .replace(/\*\*/g, "")
              .replace(/\*/g, "")
              .replace(/^Answer\s*:\s*/i, "")
              .replace(/\n\s*Explain\s*:[\s\S]*$/i, "")
              .trim();
            if (cleanDraft) break;
          }
        } catch (err) {
          continue;
        }
      }

      if (cleanDraft) {
        return res.json({ text: cleanDraft, fallback: false, ref: trackingRef });
      }

      return res.json({ text: null, fallback: true, ref: trackingRef });
    } catch (error) {
      return res.json({ text: null, fallback: true });
    }
  });

  // Public Privacy Policy HTML Page for Google Play Store compliance
  app.get("/privacy-policy", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy - S.S AI Study Guru</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background: #0f172a; color: #f8fafc; line-height: 1.6; padding: 24px 16px; margin: 0; }
    .container { max-width: 800px; margin: 0 auto; background: #1e293b; border-radius: 16px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); border: 1px solid #334155; }
    h1 { color: #f59e0b; margin-top: 0; font-size: 26px; border-bottom: 2px solid #334155; padding-bottom: 12px; }
    h2 { color: #38bdf8; font-size: 18px; margin-top: 24px; }
    p, li { color: #cbd5e1; font-size: 14px; }
    .badge { display: inline-block; background: #059669; color: #fff; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: bold; margin-bottom: 16px; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #334155; font-size: 12px; color: #94a3b8; text-align: center; }
    a { color: #f59e0b; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <span class="badge">100% Safe & Verified</span>
    <h1>Privacy Policy & Terms of Service</h1>
    <p><strong>Application:</strong> S.S AI Study Guru (com.ss.aistudyguruapp)</p>
    <p><strong>Founder & Developer:</strong> Shahid Ahmad Sheikh</p>
    <p><strong>Contact Email:</strong> <a href="mailto:sheikhshahi893@gmail.com">sheikhshahi893@gmail.com</a></p>
    <p><strong>Last Updated:</strong> September 2026</p>

    <h2>1. Introduction & Mission</h2>
    <p>S.S AI Study Guru is an intelligent educational and knowledge platform designed to provide instant, high-yield academic assistance, step-by-step homework solutions, exam preparation cheat sheets, and citizen drafting guidance to students and learners worldwide.</p>

    <h2>2. Zero Personal Data Retention</h2>
    <p>We believe deeply in user privacy. S.S AI Study Guru does not sell, rent, or trade any personal user data. Your homework notes, scanned questions, and study entries are processed strictly on-demand to deliver educational answers.</p>

    <h2>3. AI Processing & Encryption</h2>
    <p>All AI queries are transmitted securely via industry-standard SSL/TLS (HTTPS) encryption to state-of-the-art inference engines (Google Gemini API). Data is not used to train models or retained after the query response is delivered.</p>

    <h2>4. Advertising (Google AdMob)</h2>
    <p>The app may display Google AdMob advertising to keep the educational features free for students. Google AdMob may collect standard anonymous device identifiers in compliance with Google Play Developer Policies and COPPA regulations.</p>

    <h2>5. Contact & Support</h2>
    <p>For any queries, feedback, or support regarding our Privacy Policy, please reach out directly to the founder at <a href="mailto:sheikhshahi893@gmail.com">sheikhshahi893@gmail.com</a>.</p>

    <div class="footer">
      © 2026 S.S AI Study Guru • Created with ❤️ by Shahid Ahmad Sheikh. All Rights Reserved.
    </div>
  </div>
</body>
</html>`);
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "S.S AI Study Guru" });
  });



  // Google AdMob app-ads.txt route
  app.get("/app-ads.txt", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send("google.com, pub-4927952652296520, DIRECT, f08c47fec0942fa0\n");
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { maxAge: "1d", index: false }));
    app.get("*all", (req, res) => {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`S.S AI Study Guru server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
