// S.S AI Study Guru - Fast & Accurate Knowledge Engine
import { tryHybridInferenceStream } from "../services/hybridAiService";

export function getFallbackAnswer(query: string, language: string = "hinglish", mode: string = "guru"): string {
  const lower = query.toLowerCase().trim();
  const isUrdu = language === "urdu";
  const isHindi = language === "hindi";

  // 00. Identity & Name questions (Handles: "Aap ka owner koun hia", "owner", "founder", "creator", "kisne banaya", "Aap ka naam kya hai", "Who are you", "Kon ho")
  if (
    lower.includes("owner") ||
    lower.includes("founder") ||
    lower.includes("creator") ||
    lower.includes("banaya") ||
    lower.includes("kisne") ||
    lower.includes("malik") ||
    lower.includes("maalik") ||
    lower.includes("banya") ||
    lower.includes("naam") ||
    lower.includes("name") ||
    lower.includes("kon ho") ||
    lower.includes("who are you") ||
    lower.includes("koun ho") ||
    lower.includes("kaun ho") ||
    lower.includes("tum kon") ||
    lower.includes("aap kon") ||
    lower.includes("آپ کا نام") ||
    lower.includes("تم کون ہو") ||
    lower.includes("کس نے بنایا") ||
    lower.includes("بانی") ||
    lower.includes("مالک") ||
    lower.includes("आपका नाम") ||
    lower.includes("तुम कौन हो") ||
    lower.includes("किसने बनाया") ||
    lower.includes("मालिक")
  ) {
    if (isUrdu || lower.includes("کس نے") || lower.includes("مالک") || lower.includes("بانی")) {
      return `**Answer:** **S.S AI Study Guru** کے بانی اور اونر (Founder & Owner) **شاہد احمد شیخ (SHAHID AHMAD SHEIKH)** ہیں۔

**Explain:**

• **بانی و خالق (Founder & Creator):** جناب **شاہد احمد شیخ (SHAHID AHMAD SHEIKH)**۔
• **پلیٹ فارم کا نام:** S.S AI Study Guru & Civil Court Hub.
• **شاہد احمد شیخ کا مشن:** کشمیر اور پوری دنیا کے طلبہ کو تمام مضامین (ریاضی، سائنس، قانون، BNS/Civil Pleadings، انگریزی اور جنرل نالج) کی اعلیٰ ترین تعلیم اور فوری حل مفت و آسان انداز میں فراہم کرنا۔
• **خصوصی خصوصیات:** 5-Minute Exam Cheat Sheets، Civil Court Pleadings، اور اسٹیپ بائی اسٹیپ تعلیمی گائیڈنس۔`;
    } else if (isHindi || lower.includes("किसने") || lower.includes("मालिक")) {
      return `**Answer:** **S.S AI Study Guru** के संस्थापक और ओनर (Founder & Owner) **शाहिद अहमद शेख (SHAHID AHMAD SHEIKH)** हैं।

**Explain:**

• **संस्थापक और निर्माता (Founder & Creator):** **शाहिद अहमद शेख (SHAHID AHMAD SHEIKH)**।
• **प्लेटफॉर्म का नाम:** S.S AI Study Guru & Civil Court Hub.
• **मिशन:** छात्रों को गणित, विज्ञान, कानून (BNS & Civil Court Pleadings), अंग्रेजी और सामान्य ज्ञान को सबसे आसान और सटीक तरीके से सिखाना।
• **विशेष टूल्स:** 5-Minute Exam Cheat Sheets, सिविल कोर्ट लीगल ड्राफ्टिंग और स्टेप-बाय-स्टेप प्रॉब्लम सॉल्विंग।`;
    } else {
      return `**Answer:** **S.S AI Study Guru** ke Founder aur Owner **SHAHID AHMAD SHEIKH** hain.

**Explain:**

• **Founder & Creator:** **SHAHID AHMAD SHEIKH**
• **Platform Name:** S.S AI Study Guru & Civil Court Legal Hub
• **Mission by Shahid Ahmad Sheikh:** Students ko Maths, Physics, Chemistry, Biology, Law (BNS & Civil Court Pleadings), English aur General Knowledge bilkul aasan aur accurate andaz mein sikhana.
• **Special Features:** 5-Minute Visual Cheat Sheets, Civil Pleadings, Step-by-Step Homework & Exam Solutions.`;
    }
  }

  // 01. Greetings & Well-being
  if (
    lower.includes("kese ho") ||
    lower.includes("kaise ho") ||
    lower.includes("how are you") ||
    lower.includes("kya haal") ||
    lower.includes("کیسے ہو") ||
    lower.includes("कैसे हो")
  ) {
    return `**Answer:** Main bilkul theek aur fresh hoon! Aap batayein, aaj padhai mein kis topic par madad chahiye?

**Explain:**

• **24/7 Available:** Main hamesha aapke study sawaalat solve karne ke liye tayyar hoon.
• **Subjects:** Aap Science, Maths, Law, History ya kisi bhi subject ka question pooch sakte hain.`;
  }

  // 01. Greetings & Well-being (Handles: "Hi", "Hii", "Hiii", "Hey", "Hello", "Salam", "Assalam", "Namaste", "Kaise ho", "Kese ho", etc.)
  if (
    lower === "hi" ||
    lower === "hii" ||
    lower === "hiii" ||
    lower === "hey" ||
    lower === "heyy" ||
    lower === "hello" ||
    lower === "helloo" ||
    lower.startsWith("hi ") ||
    lower.startsWith("hii ") ||
    lower.startsWith("hello ") ||
    lower.startsWith("hey ") ||
    lower === "salam" ||
    lower.includes("assalam") ||
    lower.includes("namaste") ||
    lower.includes("aao") ||
    lower.includes("سلام") ||
    lower.includes("नमस्ते")
  ) {
    if (isUrdu || lower.includes("سلام")) {
      return `**Answer:** وعلیکم السلام ورحمۃ اللہ! **S.S AI Study Guru** میں آپ کا پرخلوص خیر مقدم ہے۔

**Explain:**

• **میرا تعارف:** میں آپ کا پرسنل اسٹڈی و لیگل اسسٹنٹ ہوں، جسے **شاہد احمد شیخ (SHAHID AHMAD SHEIKH)** نے ڈیزائن کیا ہے۔
• **میں کس چیز میں مدد کر سکتا ہوں:**
  - سائنس، ریاضی، فزکس، کیمسٹری اور بیالوجی
  - قانون (BNS، سول کورٹ Pleadings اور عدالتی قوانین)
  - جنرل نالج، کمپیوٹر اور ہوم ورک کے فوری حل
• **شروع کریں:** آپ اپنا کوئی بھی سوال نیچے لکھیں، میں فوری اور آسان حل فراہم کروں گا!`;
    } else if (isHindi || lower.includes("नमस्ते")) {
      return `**Answer:** नमस्ते! **S.S AI Study Guru** में आपका बहुत-बहुत स्वागत है।

**Explain:**

• **मेरा परिचय:** मैं आपका पर्सनल AI स्टडी असिस्टेंट हूँ, जिसे **शाहिद अहमद शेख (SHAHID AHMAD SHEIKH)** ने बनाया है।
• **उपलब्ध सहायता:**
  - गणित, विज्ञान (Physics, Chemistry, Biology)
  - कानूनी जानकारी (BNS, सिविल कोर्ट ड्राफ्टिंग)
  - सामान्य ज्ञान और प्रतियोगी परीक्षाओं की तैयारी
• **शुरुआत करें:** आप अपना कोई भी सवाल या टॉपिक नीचे पूछ सकते हैं!`;
    } else {
      return `**Answer:** Hello & Welcome! Main **S.S AI Study Guru** hoon. Main aapki padhai ya sawaal mein kis tarah madad karoon?

**Explain:**

• **Created By:** Designed & Founded by **SHAHID AHMAD SHEIKH**.
• **Mere Capabilities:**
  - **Maths & Science:** Step-by-step calculations, physics, chemistry & biology concepts.
  - **Law & Court:** BNS, Civil Court Pleadings aur Legal Drafting.
  - **Exams & GK:** Rapid 5-Minute Cheat Sheets aur authentic answers.
• **Start Learning:** Niche box mein apna sawaal, calculation ya topic type karein!`;
    }
  }

  // 02. Creator / Founder
  if (
    lower.includes("shahid") ||
    lower.includes("creator") ||
    lower.includes("founder") ||
    lower.includes("kisne banaya") ||
    lower.includes("banane wala") ||
    lower.includes("کس نے بنایا")
  ) {
    return `**Answer:** S.S AI Study Guru ke Creator aur Founder **SHAHID AHMAD SHEIKH** hain.

**Explain:**

• **Vision:** Har student ko aasan zaban mein bina kisi mushkil ke fast aur authentic study guidance provide karna.
• **Platform:** Yeh app legal drafting, exams revision aur AI study learning ke liye banayi gayi hai.`;
  }

  // 00. Leaders, Prime Ministers, Presidents & National Figures (Solves "Bharat ke pehle Prime Minister kaun the", etc.)
  if (
    /\bpm\b/.test(lower) ||
    lower.includes("prime minister") ||
    lower.includes("wazeer e azam") ||
    lower.includes("wazir e azam") ||
    lower.includes("pradhan mantri") ||
    lower.includes("pradhanmantri") ||
    lower.includes("وزیر اعظم") ||
    lower.includes("प्रधानमंत्री")
  ) {
    if (lower.includes("pehla") || lower.includes("pehle") || lower.includes("first") || lower.includes("1st") || lower.includes("پہلے") || lower.includes("पहले")) {
      if (lower.includes("pakistan") || lower.includes("پاکستان")) {
        return `**Answer:** Pakistan ke pehle Prime Minister (Wazeer-e-Azam) **Nawabzada Liaquat Ali Khan** the (15 August 1947 se 16 October 1951 tak).

**Explain:**

• **Quaid-e-Millat:** Unhein "Quaid-e-Millat" aur "Shaheed-e-Millat" ke khitab se jana jata hai.
• **Objective Resolution:** Unhone 1949 mein tareekhi "Objectives Resolution" (Qarardad-e-Maqasid) Assembly mein pesh ki thi jo Pakistan ke dastoor ki bunyad bani.`;
      }
      return `**Answer:** Bharat (India) ke pehle Prime Minister **Pandit Jawaharlal Nehru** the (15 August 1947 se 27 May 1964 tak).

**Explain:**

• **Longest Serving PM:** Pandit Nehru azaad Bharat ke sabse lambe arsay tak khidmat anjaam dene wale Prime Minister the (taqreeban 16 saal 286 din).
• **Children's Day:** Unke janam din (14 November) ko pure desh mein "Children's Day" (Bal Diwas) ke roop mein manaya jata hai kyunki bachay unhein pyar se "Chacha Nehru" kehte the.
• **Discovery of India:** Unhone mashhoor kitaabein jaise *The Discovery of India* aur *Glimpses of World History* likhein.`;
    }

    // Current / General Prime Minister query (e.g. "India ka pm koun hai", "PM of India")
    return `India ke Prime Minister Narendra Modi ji hain.

**Answer:** Bharat (India) ke maujooda Prime Minister **Shri Narendra Modi** hain (2014 se ab tak).

**Explain:**
• **Tenure & Office:** Narendra Modi Bharat ke 14vein Prime Minister hain aur lagataar teesri baar (2014, 2019, 2024) muntakhib hue hain.
• **Constitutional Authority:** Prime Minister of India Union Council of Ministers ke sarbarah aur Government of India ke Chief Executive (Head of Government) hote hain.
• **Scoring / Exam Tip:** Exams mein aksar pucha jata hai: India ke pehle PM kaun the (Pandit Jawaharlal Nehru), aur Article 75 ke tahat PM ko President of India appoint karte hain.`;
  }

  if (
    lower.includes("president") ||
    lower.includes("rashtrapati") ||
    lower.includes("sadar") ||
    lower.includes("صدر") ||
    lower.includes("राष्ट्रपति")
  ) {
    if (lower.includes("pehla") || lower.includes("pehle") || lower.includes("first") || lower.includes("1st") || lower.includes("پہلے") || lower.includes("पहले")) {
      if (lower.includes("pakistan") || lower.includes("پاکستان")) {
        return `**Answer:** Pakistan ke pehle President (Sadar) **Major General Iskander Mirza** the (1956 se 1958 tak).

**Explain:**

• **First Constitution (1956):** 1956 ke Constitution ke nafiz hone ke baad Governor General ka ohda khatam karke President ka ohda banaya gaya tha.`;
      }
      return `**Answer:** Bharat ke pehle President (Rashtrapati) **Dr. Rajendra Prasad** the (1950 se 1962 tak).

**Explain:**

• **Constituent Assembly:** Dr. Rajendra Prasad Bharat ki Samvidhan Sabha (Constituent Assembly) ke President bhi the.
• **Bharat Ratna:** Unhein unki bemisaal khidmat par 1962 mein Bharat Ratna se nawaza gaya tha.`;
    }

    if (lower.includes("current") || lower.includes("aaj") || lower.includes("abhi") || lower.includes("maujuda") || lower.includes("present") || lower.includes("موجودہ")) {
      return `**Answer:** Bharat ki maujooda President (Rashtrapati) **Droupadi Murmu** hain (15th President of India).

**Explain:**

• **Tribal Heritage:** Woh Bharat ki pehli Tribal aur doosri mahila (female) President hain.
• **Role:** President of India Republic of India ke Head of State aur Supreme Commander of Indian Armed Forces hote hain.`;
    }
  }

  // 00. Online Earning, Social Media & Monetization (Facebook, YouTube, Freelancing)
  if (
    lower.includes("facebook monetization") ||
    lower.includes("fb monetization") ||
    lower.includes("facebook monetize") ||
    lower.includes("facebook page monetization") ||
    lower.includes("facebook se paise") ||
    lower.includes("facebook earning")
  ) {
    return `**Answer:** Facebook Page ya Profile monetize karke paise kamane ke liye Meta ke **4 Bunyadi Monetization Tools** aur unke criteria hain:

**Explain:**

1. **In-Stream Ads (Videos ke darmiyan chalne wale ads):**
   • **Followers:** Kam az kam **5,000 active followers** hone chahiye.
   • **Watch Time:** Pichle 60 dino mein **60,000 eligible minutes** view time hona zaroori hai.
   • **Active Videos:** Kam az kam 5 active videos upload honi chahiye.

2. **Facebook Reels Overlay Ads & Ads on Reels:**
   • Original Reels post karein (bina watermark aur bina copyright music ke).
   • Jab Reels par regular views aane lagte hain to Facebook **Invitation-only** ke zariye Ads on Reels enable karta hai.

3. **Facebook Stars (Live & Video Gifting):**
   • Kam az kam **500 followers** pichle 30 dino mein hone chahiye.
   • Viewers aapki videos par Stars bhejte hain (1 Star = $0.01 USD).

4. **Subscriptions & Brand Collabs:**
   • Loyal audience ke liye paid monthly subscriptions on kar sakte hain.

• **Ahem Qawaid (Rules):**
   - Content 100% original hona chahiye (Doosron ki videos copy-paste na karein).
   - Meta ki **Partner Monetization Policies** aur **Content Monetization Policies** follow karna zaroori hai.
   - Professional Dashboard mein jakar **Monetization** tab par eligibility check karein aur Bank Account / Payout link karein.`;
  }

  if (
    lower.includes("youtube monetization") ||
    lower.includes("youtube earning") ||
    lower.includes("youtube se paise") ||
    lower.includes("ypp") ||
    lower.includes("youtube monetize")
  ) {
    return `**Answer:** YouTube Channel Monetize karne ke liye YouTube Partner Program (YPP) ke do levels hain:

**Explain:**

1. **Full Ad Monetization (Videos par Ads):**
   • **1,000 Subscribers**
   • **4,000 Public Watch Hours** (pichle 365 dino mein) YA **10 Million Shorts Views** (pichle 90 dino mein).
   • Isse Long videos aur Shorts dono par ad revenue milta hai.

2. **Fan Funding (Early Access):**
   • **500 Subscribers** + 3 Public Uploads + 3,000 Watch Hours.
   • Isse Super Thanks, Super Chat, Memberships aur Shopping features on hote hain.

• **Important Requirements:**
   - 2-Step Verification on karein.
   - Zero Active Community Guidelines Strikes.
   - Google AdSense account link karein jahan har mahine 21-26 tareekh ko payment bank mein aati hai.`;
  }

  if (
    lower.includes("freelancing") ||
    lower.includes("fiverr") ||
    lower.includes("upwork") ||
    lower.includes("online earning") ||
    lower.includes("ghar baithe paise")
  ) {
    return `**Answer:** Online earning aur freelancing ke liye **3 steps ka practical roadmap** yeh hai:

**Explain:**

1. **High-Demand Skill Seekhein (15-30 Din):**
   • Graphic Design (Canva/Photoshop), Video Editing (CapCut/Premiere), Web Development, Content Writing, ya Social Media Management.

2. **Top Freelancing Platforms Par Account Banayein:**
   • **Fiverr.com:** Apni services ke "Gigs" banayein (pricing $5 se shuru karein).
   • **Upwork.com:** Professional clients ke projects par custom proposals bhejein.
   • **LinkedIn & Facebook Groups:** Direct clients ko approach karein.

3. **Payment Receipt:**
   • International payments ke liye **Payoneer** ya local bank account link karein.`;
  }

  // 00. Kisan Credit Card (KCC) Loan & Agriculture Schemes (Handles: "KCC loan kaisi niakali", "kcc kaise banaye", "kcc loan")
  if (
    lower.includes("kcc") ||
    lower.includes("kisan credit card") ||
    (lower.includes("kisan") && lower.includes("loan")) ||
    lower.includes("کسان کریڈٹ کارڈ") ||
    lower.includes("किसान क्रेडिट कार्ड") ||
    lower.includes("केसीसी")
  ) {
    if (isUrdu || lower.includes("کسان کریڈٹ")) {
      return `کسان کریڈٹ کارڈ (KCC) لون حاصل کرنے کے لیے قریبی بینک برانچ میں درخواست فارم اور زمین کے ریونیو کاغذات جمع کروانے ہوتے ہیں۔

**Answer:** **کسان کریڈٹ کارڈ (KCC) لون حاصل کرنے کے لیے کسان کو قریبی بینک (جیسے J&K Bank، SBI، PNB یا دیہی بینک) میں KCC فارم، آدھار کارڈ، پین کارڈ اور پٹواری سے تصدیق شدہ زمین کے کاغذات (خسرہ/جمعبندی/انتخاب) جمع کروانے ہوتے ہیں۔**

**Explain:**
• **کے سی سی اسکیم کا مقصد:** کسانوں کو زراعت اور باغبانی (بیج، کھاد، زرعی ادویات اور فصلوں کی تیاری) کے لیے انتہائی کم شرح سود پر بروقت مالی مدد فراہم کرنا ہے۔
• **درکار ضروری دستاویزات (Documents):**
  1. پٹواری یا آن لائن پورٹل سے حاصل کردہ **جمعبندی / خسرہ گرداوری / انتقالات (Revenue Records)**۔
  2. شناختی ثبوت: **آدھار کارڈ** اور **پین کارڈ**۔
  3. کسان کی 2 عدد پاسپورٹ سائز تصاویر۔
  4. بینک کھاتہ کی پاس بک اور نو ڈیو سرٹیفکیٹ (No Dues Certificate)۔
• **شرح سود اور حکومتی سبسڈی:** KCC لون پر عام شرح سود 7% ہوتی ہے، لیکن سالانہ وقت پر واپسی پر حکومت کی جانب سے **3% سبسڈی (Subvention)** ملتی ہے، جس سے مؤثر سود صرف **4% سالانہ** رہ جاتا ہے۔
• **لون حاصل کرنے کا طریقہ:**
  - فارم بینک یا PM-Kisan پورٹل سے حاصل کریں۔
  - تمام کاغذات منسلک کر کے ایگریکلچر / کریڈٹ آفیسر کے پاس جمع کریں۔
  - بینک کی زمین کی تصدیق (Land Verification) کے 7 سے 15 دنوں کے اندر لون منظور کر دیا جاتا ہے۔`;
    } else if (isHindi || lower.includes("किसान क्रेडिट")) {
      return `किसान क्रेडिट कार्ड (KCC) लोन प्राप्त करने के लिए अपनी नजदीकी बैंक शाखा में आवेदन फॉर्म और जमीन के दस्तावेज जमा करने होते हैं।

**Answer:** **किसान क्रेडिट कार्ड (KCC) लोन लेने के लिए किसान को अपने नजदीकी बैंक (जैसे SBI, PNB, J&K Bank या ग्रामीण बैंक) में KCC फॉर्म, आधार कार्ड, पैन कार्ड और जमीन की खतौनी/जमाबंदी के साथ आवेदन करना होता है।**

**Explain:**
• **योजना का मुख्य उद्देश्य:** किसानों को खेती, बीज, खाद, कीटनाशक और कृषि उपकरणों के लिए न्यूनतम ब्याज दर पर ऋण उपलब्ध कराना।
• **आवश्यक दस्तावेज (Required Documents):**
  1. पटवारी या राजस्व पोर्टल से प्रमाणित **खसरा/खतौनी/जमाबंदी (Revenue Land Records)**।
  2. पहचान पत्र: **आधार कार्ड** और **पैन कार्ड**।
  3. किसान की दो पासपोर्ट साइज फोटो।
  4. बैंक पासबुक और भूमि बंधक (Hypothecation/Mortgage) फॉर्म।
• **रियायती ब्याज दर (Interest Rate & Subsidy):** KCC पर सामान्य ब्याज 7% होता है, लेकिन समय पर भुगतान (Timely Repayment) करने पर सरकार 3% की छूट देती है जिससे प्रभावी ब्याज केवल **4% वार्षिक** रह जाता है।
• **आवेदन प्रक्रिया:** बैंक शाखा में KCC काउंटर पर फॉर्म भरें या PM-Kisan / Jan Samarth पोर्टल से ऑनलाइन अप्लाई करें। बैंक सत्यापन के 7-14 दिनों में KCC लिमिट जारी कर दी जाती है।`;
    } else {
      return `Kisan Credit Card (KCC) loan nikalwane ke liye aapko apne nazdeeki bank branch mein KCC form aur zameen ke revenue documents jama karne hote hain.

**Answer:** **Kisan Credit Card (KCC) loan nikalne ke liye kisan ko apne nazdeeki bank (SBI, J&K Bank, PNB ya Grameen Bank) mein KCC application form ke saath Aadhar Card, PAN Card, zameen ki Jamabandi/Khatauni aur photo jama karni hoti hai.**

**Explain:**
• **KCC Scheme Ka Maqsad:** Kisano ko kheti-badi, baghwani, beej, khad aur agricultural zarooriyat ke liye saste byaj (interest rate) par emergency credit faraham karna.
• **Zaroori Documents (Paperwork):**
  1. Patwari ya online revenue portal se li gayi **Jamabandi / Khasra Girdawari / Land Records**.
  2. Identity & Address Proof: **Aadhar Card** aur **PAN Card**.
  3. 2 Passport-size photographs.
  4. Bank account passbook & Non-encumbrance / No Dues statement.
• **Kam Byaj & Sarkari Chhoot (Interest Rate):** Standard KCC interest 7% hota hai, lekin agar kisan saal ke andar waqt par loan chukata hai to sarkar ki taraf se **3% subsidy** milti hai, jisse net byaj sirf **4% saalana** reh jata hai!
• **Nikalne Ka Step-by-Step Tariqa:**
  1. Apni bank branch mein jakar KCC loan application form lein.
  2. Form bharein aur zameen ke kagazat (Revenue papers) sath lagayein.
  3. Branch Manager ya Agri Officer verification ke baad 7 se 15 dino ke andar KCC pass karke paise ya Kisan RuPay Card issue kar deta hai.`;
    }
  }

  // 00. World & Geography (Continents, Oceans, Rivers, Capitals)
  if (
    lower.includes("bar e azam") ||
    lower.includes("bar-e-azam") ||
    lower.includes("continents") ||
    lower.includes("continent") ||
    lower.includes("براعظم")
  ) {
    return `**Answer:** Dunya mein kul **7 Bar-e-Azam (Continents)** hain:

**Explain:**

1. **Asia (ایشیا):** Dunya ka sabse bada aur sabse zyada aabadi wala continent.
2. **Africa (افریقہ):** Doosra sabse bada continent jahan Sahara Desert aur Nile Darya hain.
3. **North America (شمالی امریکہ):** USA, Canada aur Mexico par mushtamil.
4. **South America (جنوبی امریکہ):** Amazon Rainforest aur Andes mountains ka markaz.
5. **Antarctica (انٹارکٹیکا):** Barf se dhaka hua sabse sarda continent jahan aam aabadi nahi rehti.
6. **Europe (یورپ):** Maashi aur tareekhi tor par taraqqi yafta bar-e-azam.
7. **Australia / Oceania (آسٹریلیا):** Dunya ka sabse chota bar-e-azam.`;
  }

  if (
    lower.includes("samandar") ||
    lower.includes("oceans") ||
    lower.includes("ocean") ||
    lower.includes("بحر")
  ) {
    return `**Answer:** Dunya mein kul **5 Bade Samandar (Oceans)** hain:

**Explain:**

1. **Pacific Ocean (بحر الکاہل):** Dunya ka sabse bada aur sabse gehra ocean (Mariana Trench yahan hai).
2. **Atlantic Ocean (بحر اوقیانوس):** Doosra sabse bada ocean jo America aur Europe/Africa ko alag karta hai.
3. **Indian Ocean (بحر ہند):** Teesri badi aabi body jo Bharat ke junoob mein waqey hai.
4. **Southern Ocean (بحر منجمد جنوبی):** Antarctica ke gird ghira hua sarda ocean.
5. **Arctic Ocean (بحر منجمد شمالی):** Sabse chota aur sabse sarda ocean jo North Pole par hai.`;
  }

  if (
    lower.includes("capital") ||
    lower.includes("darul hukumat") ||
    lower.includes("rajdhani") ||
    lower.includes("دارالحکومت") ||
    lower.includes("राजधानी")
  ) {
    if (lower.includes("india") || lower.includes("bharat")) {
      return `**Answer:** Bharat (India) ka Capital (Rajdhani) **New Delhi (نئی دہلی)** hai.`;
    }
    if (lower.includes("pakistan")) {
      return `**Answer:** Pakistan ka Capital (Darul Hukumat) **Islamabad (اسلام آباد)** hai.`;
    }
    if (lower.includes("kashmir") || lower.includes("jammu")) {
      return `**Answer:** Jammu & Kashmir ke do Capitals hain: **Srinagar** (Summer Capital) aur **Jammu** (Winter Capital).`;
    }
  }

  // 00. World Superpowers & Most Powerful Countries (Solves "Dunya ka power full daish ko hia", "powerful country", "sabse takatwar mulk")
  // 00. Army, Military, Armed Forces & Defense Rankings
  if (
    (lower.includes("army") || lower.includes("fauj") || lower.includes("faoj") || lower.includes("military") || lower.includes("sena") || lower.includes("فوج") || lower.includes("عسکر") || lower.includes("सेना") || lower.includes("लश्कर")) &&
    (lower.includes("zaida") || lower.includes("zyada") || lower.includes("badi") || lower.includes("bada") || lower.includes("largest") || lower.includes("biggest") || lower.includes("kahan") || lower.includes("kis") || lower.includes("top") || lower.includes("taqat") || lower.includes("number 1") || lower.includes("sab se") || lower.includes("sub sai") || lower.includes("سب سے زیادہ") || lower.includes("سب سے بڑی") || lower.includes("सबसे बड़ी"))
  ) {
    if (isUrdu || lower.includes("فوج") || lower.includes("سب سے زیادہ")) {
      return `دنیا میں سب سے زیادہ ایکٹیو فوج چین (China) کے پاس ہے، جس کے پاس تقریباً 20 لاکھ باقاعدہ فوجی جوان ہیں۔

**Answer:** دنیا میں سب سے زیادہ ایکٹیو فوج (Largest Active Military) **چین (China - People's Liberation Army)** کے پاس ہے، جس کے بعد **بھارت (India)** دوسرے اور **امریکہ (USA)** تیسرے نمبر پر ہے۔

**Explain:**
• **سب سے بڑی فعال افواج (Top 5 Active Military):**
  1. **چین (China):** تقریباً **20,00,000 (20 لاکھ)** فعال فوجی۔
  2. **بھارت (India):** تقریباً **14,50,000 (14.5 لاکھ)** فعال فوجی۔
  3. **امریکہ (USA):** تقریباً **13,30,000 (13.3 لاکھ)** فعال فوجی۔
  4. **روس (Russia):** تقریباً **13,20,000 (13.2 لاکھ)** فعال فوجی۔
  5. **شمالی کوریا (North Korea):** تقریباً **12,80,000 (12.8 لاکھ)** فعال فوجی۔
• **مجموعی عسکری طاقت (Global Firepower):** جدید ترین ہتھیاروں، بحریہ، فضائیہ اور بجٹ کے لحاظ سے دنیا کی سب سے طاقتور فوج **امریکہ (USA)** کی مانی جاتی ہے۔
• **امتحانی نکتہ:** امتحانات میں ہمیشہ ایکٹیو ڈیوٹی فوج (Active Soldiers) اور ریزرو فوج (Reserve Forces) کا واضح فرق لکھیں تاکہ پورے نمبر حاصل ہوں۔`;
    } else if (isHindi || lower.includes("सेना") || lower.includes("सबसे बड़ी")) {
      return `दुनिया में सबसे ज्यादा एक्टिव सेना चीन (China) के पास है, जिसमें लगभग 20 लाख सक्रिय सैनिक हैं।

**Answer:** दुनिया में सबसे बड़ी एक्टिव सेना (Largest Active Army) **चीन (People's Liberation Army)** के पास है, और दूसरे स्थान पर **भारत (Indian Armed Forces)** है।

**Explain:**
• **शीर्ष 5 सबसे बड़ी सक्रिय सेनाएं (Top 5 Active Armies):**
  1. **चीन (China):** लगभग **20,00,000 (20 लाख)** सक्रिय सैनिक।
  2. **भारत (India):** लगभग **14,50,000 (14.5 लाख)** सक्रिय सैनिक।
  3. **संयुक्त राज्य अमेरिका (USA):** लगभग **13,30,000** सक्रिय सैनिक।
  4. **रूस (Russia):** लगभग **13,20,000** सक्रिय सैनिक।
  5. **उत्तर कोरिया (North Korea):** लगभग **12,80,000** सक्रिय सैनिक।
• **कुल सैन्य शक्ति (Global Firepower):** आधुनिक हथियारों, वायु सेना, नौसेना और रक्षा बजट के मामले में **अमेरिका (USA)** दुनिया की सबसे शक्तिशाली सेना है।
• **परीक्षा युक्ति:** प्रतियोगी परीक्षाओं (UPSC/SSC) में एक्टिव सैनिक (चीन) और कुल सैन्य क्षमता (अमेरिका) का अंतर स्पष्ट रूप से लिखें।`;
    } else {
      return `Dunya mein sab se zyada active fouj China ke paas hai, jiske paas taqreeban 20 Lakh (2.0 Million) active soldiers hain.

**Answer:** Dunya mein sab se zyada active army (Largest Active Military) **China (People's Liberation Army)** ke paas hai, aur doosre number par **India (Indian Armed Forces)** aati hai.

**Explain:**
• **Top 5 Countries with Largest Active Military (Sabse Badi Fauj Wale Mulk):**
  1. **China (چین):** Taqreeban **20,00,000 (20 Lakh / 2 Million)** active soldiers.
  2. **India (بھارت):** Taqreeban **14,50,000 (14.5 Lakh / 1.45 Million)** active soldiers.
  3. **United States (USA):** Taqreeban **13,30,000 (13.3 Lakh)** active military personnel.
  4. **Russia (روس):** Taqreeban **13,20,000 (13.2 Lakh)** active military personnel.
  5. **North Korea (شمالی کوریا):** Taqreeban **12,80,000 (12.8 Lakh)** active soldiers.
• **Overall Military Power (Global Firepower Index):** Agar advanced technology, aircraft carriers, fighter jets aur defense budget dekha jaye to dunya ki sab se taqatwar military **United States (USA)** ki hai, doosre par **Russia**, teesre par **China**, aur chauthe par **India** hai.
• **Scoring / Exam Tip:** Exams mein hamesha "Active Personnel" (China sabse aage) aur "Overall Military Power" (USA sabse aage) ka farq clear likhein taake full marks milein.`;
    }
  }

  if (
    lower.includes("power full") ||
    lower.includes("powerful") ||
    lower.includes("taqatwar") ||
    lower.includes("takatwar") ||
    lower.includes("طاقتور") ||
    lower.includes("शक्तिशाली") ||
    lower.includes("superpower")
  ) {
    if (lower.includes("daish") || lower.includes("desh") || lower.includes("country") || lower.includes("mulk") || lower.includes("ملک") || lower.includes("देश") || lower.includes("dunya") || lower.includes("world")) {
      return `**Answer:** Global Firepower aur World Economic Rankings ke mutabiq dunya ka sabse powerful (taqatwar) mulk **United States of America (USA)** hai.

**Explain:**

• **Top 5 Most Powerful Countries in the World (Dunya ke 5 Sabse Taqatwar Mulk):**
  1. **United States (USA):** No. 1 Superpower – Dunya ki sabse badi economy ($28+ Trillion GDP), sabse modern technology aur sabse taqatwar Navy/Air Force.
  2. **China (چین):** No. 2 – Dunya ka manufacturing hub, sabse badi standing army aur tezi se badhti economy.
  3. **Russia (روس):** No. 3 – Dunya mein sabse zyada nuclear weapons (atomic bombs) aur advanced missile tech.
  4. **India (بھارت):** No. 4 – 1.4 Billion aabadi, 4th sabse badi military, aur tezi se grow karti hui top economy.
  5. **United Kingdom (UK) / South Korea:** Advanced defense technology aur international alliances (NATO).

• **Power Kis Cheez Se Naapi Jaati Hai?**
  - **Military Strength:** Fouji taqat, missiles, nuclear weapons aur aircraft carriers.
  - **Economic Power:** GDP aur global trade control.
  - **Technology & Diplomacy:** Artificial Intelligence, space research (NASA/ISRO) aur UN veto power.`;
    }
  }

  // 00. Calendar, Time, Year, Months & Days (Solves "Ek saal me kitne din hote hain", "1 saal me kitne din", etc.)
  if (
    (lower.includes("saal") && (lower.includes("din") || lower.includes("mahine") || lower.includes("hafte") || lower.includes("ghante") || lower.includes("kitne"))) ||
    lower.includes("days in a year") ||
    lower.includes("how many days in a year") ||
    lower.includes("year me kitne din") ||
    lower.includes("year mein kitne din") ||
    lower.includes("1 saal") ||
    lower.includes("ایک سال میں کتنے دن") ||
    lower.includes("ایک سال") ||
    lower.includes("एक साल में कितने दिन") ||
    lower.includes("एक वर्ष में कितने दिन")
  ) {
    if (isUrdu) {
      return `**Answer:** ایک عام سال (Normal Year) میں **365 دن** ہوتے ہیں، جبکہ لیپ سال (Leap Year) میں **366 دن** ہوتے ہیں۔

**Explain:**

• **عام سال (Normal Year):** 365 دن اور 52 ہفتے + 1 دن ہوتے ہیں۔ اس میں فروری کے مہینے میں 28 دن ہوتے ہیں۔
• **لیپ سال (Leap Year):** ہر 4 سال بعد ایک لیپ سال آتا ہے جس میں فروری کے 29 دن ملا کر کل **366 دن** بنتے ہیں۔
• **دیگر اہم پیمائشیں:**
  - 1 سال = **12 مہینے**
  - 1 سال = **52 ہفتے**
  - 1 سال = **8,760 گھنٹے** (عام سال میں)`;
    } else if (isHindi) {
      return `**Answer:** एक सामान्य वर्ष (Normal Year) में **365 दिन** होते हैं, और एक लीप वर्ष (Leap Year) में **366 दिन** होते हैं।

**Explain:**

• **सामान्य वर्ष:** 365 दिन (52 सप्ताह + 1 दिन) होते हैं। इसमें फरवरी का महीना 28 दिनों का होता है।
• **लीप वर्ष (Leap Year):** हर 4 साल में एक बार आता है, जिसमें फरवरी में 29 दिन होते हैं और कुल **366 दिन** होते हैं।
• **अतिरिक्त समय गणना:**
  - 1 वर्ष = **12 महीने**
  - 1 वर्ष = **52 सप्ताह**
  - 1 वर्ष = **8,760 घंटे** (सामान्य वर्ष)`;
    } else {
      return `**Answer:** Ek aam saal (Normal Year) mein **365 din** hote hain, aur Leap Year mein **366 din** hote hain.

**Explain:**

• **Normal Year:** Isme 365 din (52 hafte + 1 din) hote hain aur February ka mahina 28 din ka hota hai.
• **Leap Year:** Har 4 saal baad ek Leap Year aata hai jisme February mein 29 din hote hain aur kul **366 din** bante hain.
• **Waqt ke Ahem Facts:**
  - 1 Saal = **12 Mahine**
  - 1 Saal = **52 Hafte**
  - 1 Saal = **8,760 Ghante (Hours)**
  - 1 Saal = **525,600 Minutes**`;
    }
  }

  // 00. Time & Clock Units (Hours, Minutes, Seconds, Days in week/month)
  if (
    lower.includes("hafte me kitne din") ||
    lower.includes("hafta me kitne din") ||
    lower.includes("days in a week") ||
    lower.includes("week me kitne din") ||
    lower.includes("ایک ہفتے میں کتنے دن") ||
    lower.includes("एक हफ्ते में कितने दिन")
  ) {
    return `**Answer:** Ek hafte (week) mein **7 din** hote hain: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday aur Sunday.

**Explain:**

• **Workdays:** Aam taur par Monday se Friday/Saturday working days hote hain.
• **Hours in a Week:** $7 \\text{ din} \\times 24 \\text{ ghante} = \\mathbf{168 \\text{ ghante}}$.`;
  }

  if (
    lower.includes("mahine me kitne din") ||
    lower.includes("mahine mein kitne din") ||
    lower.includes("days in a month") ||
    lower.includes("month me kitne din") ||
    lower.includes("ایک مہینے میں کتنے دن")
  ) {
    return `**Answer:** Ek mahine mein aam taur par **30 ya 31 din** hote hain (sirf February mein 28 ya 29 din hote hain).

**Explain:**

• **31 Din wale mahine (7):** January, March, May, July, August, October, December.
• **30 Din wale mahine (4):** April, June, September, November.
• **February:** 28 din (normal year) aur 29 din (leap year).`;
  }

  if (
    lower.includes("din me kitne ghante") ||
    lower.includes("din mein kitne ghante") ||
    lower.includes("hours in a day") ||
    lower.includes("24 hours") ||
    lower.includes("ایک دن میں کتنے گھنٹے")
  ) {
    return `**Answer:** Ek din (24 ghanton ke cycle) mein **24 ghante (hours)** hote hain.

**Explain:**

• **Calculation:** 24 ghante $\\times$ 60 minutes = **1,440 minutes** (ya 86,400 seconds).
• **Scientific Reason:** Zameen (Earth) ko apne axis par ek poora chakkar (rotation) lagane mein taqreeban 24 ghante lagte hain.`;
  }

  if (
    lower.includes("ghante me kitne minute") ||
    lower.includes("ghante mein kitne minute") ||
    lower.includes("minute in an hour") ||
    lower.includes("minutes in hour") ||
    lower.includes("ایک گھنٹے میں کتنے منٹ")
  ) {
    return `**Answer:** 1 ghante (hour) mein **60 minute** hote hain aur **3,600 second** hote hain.

**Explain:**

• **Formula:** $1 \\text{ Hour} = 60 \\text{ Minutes} = 60 \\times 60 = 3,600 \\text{ Seconds}$.
• **Half Hour:** Aadha ghanta = 30 minutes.`;
  }

  if (
    lower.includes("minute me kitne second") ||
    lower.includes("minute mein kitne second") ||
    lower.includes("seconds in a minute") ||
    lower.includes("ایک منٹ میں کتنے سیکنڈ")
  ) {
    return `**Answer:** 1 minute mein **60 seconds** hote hain.

**Explain:**

• **SI Unit:** Time ki standard international (SI) unit **Second ($s$)** hai.`;
  }

  if (
    lower.includes("leap year") ||
    lower.includes("لیپ سال") ||
    lower.includes("लीप वर्ष")
  ) {
    return `**Answer:** Leap Year wo saal hota hai jisme **366 din** hote hain aur February mein 28 ke bajaye **29 din** hote hain.

**Explain:**

• **Kyun hota hai?** Zameen suraj ke gird chakkar lagane mein 365 din aur 6 ghante (1/4 din) leti hai. Yeh 6 ghante 4 saal mein mil kar 1 poora din ($6 \\times 4 = 24$ ghante) banate hain.
• **Pehchaan (Formula):** Jo saal 4 se poora divide ho jaye (jaise 2020, 2024, 2028), wo Leap Year hota hai.`;
  }

  // 0. Smart Percentage & Arithmetic Calculator (Solves "100 students 60 boys percentage", "50 out of 200", "5+5", "20% of 500")
  const percMatch1 = query.match(/(\d+(?:\.\d+)?)\s*(?:me\s*se|out\s*of|\/)\s*(\d+(?:\.\d+)?)/i);
  const percMatch2 = query.match(/(\d+(?:\.\d+)?)\s*(?:percentage|percent|%)\s*(?:of|ka|ki)?\s*(\d+(?:\.\d+)?)/i);
  const percMatch3 = query.match(/(\d+(?:\.\d+)?)\s*(?:students|ladke|ladkiyan|boys|girls|apples|marks)[^0-9]*(\d+(?:\.\d+)?)\s*(?:percentage|percent|%|kitna|kitne)/i);

  if (percMatch1 && (lower.includes("percent") || lower.includes("%") || lower.includes("percentage") || lower.includes("kitna hua") || lower.includes("kitne percent"))) {
    const part = parseFloat(percMatch1[1]);
    const total = parseFloat(percMatch1[2]);
    if (total > 0) {
      const percentage = (part / total) * 100;
      return `**Answer:** Percentage = **${percentage.toFixed(percentage % 1 === 0 ? 0 : 2)}%**

**Explain:**

• **Formula:** $\\text{Percentage} = \\left( \\frac{\\text{Part Value}}{\\text{Total Value}} \\right) \\times 100$
• **Given Values:** Part = **${part}**, Total = **${total}**
• **Calculation:** $\\frac{${part}}{${total}} \\times 100 = ${percentage.toFixed(2)}\\%$
• **Final Result:** ${total} mein se ${part} ka percentage **${percentage.toFixed(percentage % 1 === 0 ? 0 : 2)}%** banta hai.`;
    }
  }

  // Handle "100 students hain aur usme 60 ladke hain to percentage kitna hua"
  const numbersInQuery = query.match(/\d+(?:\.\d+)?/g);
  if (numbersInQuery && numbersInQuery.length >= 2 && (lower.includes("percentage") || lower.includes("percent") || lower.includes("%") || lower.includes("ladko ka") || lower.includes("ladkiyo ka"))) {
    const numA = parseFloat(numbersInQuery[0]);
    const numB = parseFloat(numbersInQuery[1]);
    const total = Math.max(numA, numB);
    const part = Math.min(numA, numB);
    if (total > 0) {
      const percentage = (part / total) * 100;
      return `**Answer:** Ladko (Boys) ka percentage **${percentage.toFixed(percentage % 1 === 0 ? 0 : 2)}%** hai.

**Explain:**

• **Formula:** $\\text{Percentage} = \\left( \\frac{\\text{Number of Boys}}{\\text{Total Students}} \\right) \\times 100$
• **Given:** Total Students = **${total}**, Ladke (Boys) = **${part}**
• **Step-by-Step Calculation:**
  $$\\text{Percentage} = \\frac{${part}}{${total}} \\times 100 = ${percentage.toFixed(2)}\\%$$
• **Conclusion:** 100 mein se 60 ladko ka hissa seedha **${percentage.toFixed(0)}%** hota hai.`;
    }
  }

  // 0. History & Independence (India, Pakistan, Constitution, Leaders - Strict & Specific Matching)
  if (
    lower.includes("india kab azad") ||
    lower.includes("india azad") ||
    lower.includes("bharat kab azad") ||
    lower.includes("15 august 1947") ||
    lower.includes("independence of india") ||
    lower.includes("بھارت کب آزاد") ||
    lower.includes("भारत कब आजाद")
  ) {
    if (isUrdu) {
      return `**Answer:** بھارت (انڈیا) **15 اگست 1947** کو برطانوی راج (British Rule) سے آزاد ہوا تھا۔

**Explain:**

• **تاریخ آزادی:** 15 اگست 1947 کی رات 12 بجے برطانوی راج ختم ہوا اور بھارت ایک خود مختار ملک بنا۔
• **پہلے وزیر اعظم:** پنڈت جواہر لعل نہرو آزاد بھارت کے پہلے وزیر اعظم بنے۔
• **قومی جشن:** ہر سال 15 اگست کو بھارت بھر میں "یومِ آزادی" (Independence Day) لال قلعہ نئی دہلی پر ترنگا لہرا کر منایا جاتا ہے۔`;
    } else if (isHindi) {
      return `**Answer:** भारत (India) **15 अगस्त 1947** को ब्रिटिश हुकूमत (अंग्रेजों की गुलामी) से आज़ाद हुआ था।

**Explain:**

• **ऐतिहासिक तारीख:** 15 अगस्त 1947 की मध्यरात्रि को भारत को 200 वर्षों के ब्रिटिश शासन से पूर्ण स्वतंत्रता मिली।
• **पहले प्रधानमंत्री:** पंडित जवाहरलाल नेहरू स्वतंत्र भारत के प्रथम प्रधानमंत्री बने, जिन्होंने लाल किले पर तिरंगा फहराया था।
• **राष्ट्रीय पर्व:** हर वर्ष 15 अगस्त को पूरे देश में स्वतंत्रता दिवस (Independence Day) गर्व और उल्लास के साथ मनाया जाता है।`;
    } else {
      return `**Answer:** India (Bharat) **15 August 1947** ko British Rule (Angrezon ki 200 saal ki ghulami) se azaad hua tha.

**Explain:**

• **Tareekh-e-Azadi:** 15 August 1947 ki aadhi raat ko India ko poori tarah azaadi mili aur British rule khatam hua.
• **Pehle Prime Minister:** Pandit Jawaharlal Nehru azaad Bharat ke pehle Wazeer-e-Azam (Prime Minister) bane.
• **National Celebration:** Har saal 15 August ko pure desh mein Independence Day (Youm-e-Azadi) Red Fort (Lal Qila) par Tiranga lehra kar manaya jata hai.`;
    }
  }

  if (
    lower.includes("pakistan kab") ||
    lower.includes("pakistan azad") ||
    lower.includes("14 august 1947") ||
    lower.includes("پاکستان کب آزاد") ||
    lower.includes("پاکستان کب بنا")
  ) {
    return `**Answer:** پاکستان **14 اگست 1947** (27 رمضان المبارک 1366ھ) کو دنیا کے نقشے پر آزاد اور خود مختار ریاست بن کر ابھرا۔

**Explain:**

• **بانی پاکستان:** قائد اعظم محمد علی جناح پاکستان کے بانی اور پہلے گورنر جنرل بنے۔
• **مصور پاکستان:** مفکر پاکستان علامہ محمد اقبال نے 1930 کے خطبہ الہ آباد میں خودمختار مسلم ریاست کا تصور پیش کیا۔
• **یوم آزادی:** ہر سال 14 اگست کو ملک بھر میں قومی جوش و جذبے کے ساتھ یومِ آزادی منایا جاتا ہے۔`;
  }

  if (
    lower.includes("constitution") ||
    lower.includes("samvidhan") ||
    lower.includes("dastoor") ||
    lower.includes("26 january") ||
    lower.includes("republic day") ||
    lower.includes("آئین") ||
    lower.includes("دستور") ||
    lower.includes("संविधान") ||
    /\b(ain|aain)\b/i.test(lower)
  ) {
    return `**Answer:** Bharat ka Constitution (Samvidhan / Aain) **26 January 1950** ko nafiz (lagu) hua tha, jise har saal **Republic Day (Youm-e-Jamhooria)** ke roop mein manaya jata hai.

**Explain:**

• **Drafting Committee:** Dr. B. R. Ambedkar (Baba Saheb) Samvidhan ki Drafting Committee ke Chairman the aur unhein "Father of the Indian Constitution" kaha jata hai.
• **Tayaari ka Waqt:** Constitution banane mein 2 saal, 11 mahine aur 18 din ka waqt laga.
• **Supreme Law:** Yeh dunya ka sabse lamba tehreeri (written) constitution hai jo har nagrik ko bunyadi haqooq (Fundamental Rights) deta hai.`;
  }

  if (
    lower.includes("gandhi") ||
    lower.includes("mahatma") ||
    lower.includes("bapu") ||
    lower.includes("father of nation") ||
    lower.includes("گاندھی")
  ) {
    return `**Answer:** Mohandas Karamchand Gandhi (Mahatma Gandhi) ko Bharat ka "Father of the Nation" (Rashtrapita) kaha jata hai.

**Explain:**

• **Ahimsa & Satyagraha:** Unhone Non-Violence (Ahimsa / Adam Tashaddud) aur Satyagraha ke zariye azaadi ki tehreek ki qayadat ki.
• **Important Movements:** Dandi March (Salt Satyagraha 1930), Non-Cooperation Movement (1920), aur Quit India Movement (1942).
• **Gandhi Jayanti:** Unka janam 2 October 1869 ko Porbandar, Gujarat mein hua tha, jo har saal Gandhi Jayanti ke roop mein manaya jata hai.`;
  }

  // 0. Moon, Earth's Natural Satellite, Chand & Space (Solves "Mujhi moon kai bari mia kuch likh kai du", "chand kya hai", etc.)
  if (
    lower.includes("moon") ||
    lower.includes("chand") ||
    lower.includes("chaand") ||
    lower.includes("چاند") ||
    lower.includes("चाँद") ||
    lower.includes("चन्द्रमा") ||
    lower.includes("chandrama")
  ) {
    if (isUrdu || lower.includes("چاند")) {
      return `**Answer:** **چاند (The Moon)** زمین کا واحد قدرتی سیارچہ (Natural Satellite) ہے جو زمین کے گرد مسلسل گردش کرتا ہے۔

**Explain:**

• **بنیادی ساخت و فاصلہ:** چاند زمین سے تقریباً **384,400 کلومیٹر** دور ہے۔ اس کا اپنا کوئی ماحول (Atmosphere) یا ذاتی روشنی نہیں ہے، بلکہ یہ سورج کی روشنی کو منعکس (Reflect) کر کے چمکتا ہے۔
• **گردش کا دورانیہ (Orbital Period):** چاند تقریباً **27.3 دنوں** میں زمین کا ایک چکر اور اپنے محور (Axis) پر ایک گردش مکمل کرتا ہے، اسی لیے ہمیں ہمیشہ چاند کا صرف ایک ہی رخ نظر آتا ہے۔
• **کشش ثقل (Gravity) اور سمندری مدوجزر:** چاند پر کشش ثقل زمین کے مقابلے میں **1/6** (یعنی 6 گنا کم) ہے۔ چاند کی کشش کی وجہ سے زمین کے سمندروں میں مد و جزر (High & Low Tides) پیدا ہوتے ہیں۔
• **چاند کی منزلیں (Lunar Phases):** ہلال (New Moon) سے لے کر چودھویں کے چاند (Full Moon / بدر) تک چاند کے 8 اہم مراحل ہوتے ہیں جو اسلامی قمری کیلنڈر کی بنیاد ہیں۔
• **تاریخی قدم:** 20 جولائی 1969 کو اپولو 11 مشن کے تحت **نیل آرمسٹرانگ (Neil Armstrong)** چاند کی سطح پر قدم رکھنے والے پہلے انسان بنے۔`;
    } else if (isHindi || lower.includes("चाँद") || lower.includes("चन्द्रमा")) {
      return `**Answer:** **चाँद (Moon)** पृथ्वी का एकमात्र प्राकृतिक उपग्रह (Only Natural Satellite) है, जो पृथ्वी की परिक्रमा करता है।

**Explain:**

• **दूरी और आकार:** चंद्रमा पृथ्वी से लगभग **3,84,400 किलोमीटर** की दूरी पर स्थित है। इसका व्यास पृथ्वी के व्यास का लगभग एक-चौथाई (1/4) है।
• **रोशनी और वातावरण:** चंद्रमा का अपना कोई प्रकाश या वायुमंडल (Atmosphere) नहीं है; यह सूर्य के प्रकाश को परावर्तित (Reflect) करके चमकता है।
• **परिक्रमा काल:** चंद्रमा को पृथ्वी का एक चक्कर लगाने में लगभग **27.3 दिन** लगते हैं। घूर्णन और परिक्रमा का समय समान होने के कारण हमें पृथ्वी से हमेशा इसका केवल एक ही भाग दिखाई देता है।
• **गुरुत्वाकर्षण और ज्वार-भाटा:** चंद्रमा का गुरुत्वाकर्षण पृथ्वी की तुलना में **1/6** है। चंद्रमा के गुरुत्वाकर्षण बल के कारण ही पृथ्वी के समुद्रों में ज्वार-भाटा (Tides) आते हैं।
• **मानव मिशन:** 20 जुलाई 1969 को अपोलो 11 अंतरिक्ष यान से **नील आर्मस्ट्रांग (Neil Armstrong)** चंद्रमा पर कदम रखने वाले पहले व्यक्ति बने थे।`;
    } else {
      return `**Answer:** **Moon (Chand)** Zameen (Earth) ka ek lauta natural satellite hai jo lagataar Zameen ke ird-gird chakkar lagata hai.

**Explain:**

• **Distance & Structure:** Chand Zameen se taqreeban **3,84,400 kilometers** door hai. Chand par koi hawa/atmosphere nahi hai aur iski apni roshni nahi hoti; yeh Suraj ki roshni ko reflect karke chamakta hai.
• **Orbit & Rotation (Chakkar):** Chand Zameen ka ek poora chakkar lagane mein taqreeban **27.3 din** leta hai. Iska rotation aur revolution time barabar hone ki wajah se Zameen se hamesha iska ek hi side nazar aata hai.
• **Gravity & Tides (Mado Jazar):** Chand ki gravity Zameen se **1/6 (6 guna kam)** hai. Samundar mein aane wali leharon aur utaar-chadhao (ocean tides) ka sabse bada sabab Chand ki gravitational pull hai.
• **Lunar Phases (Manzilein):** Naya Chand (Crescent / Hilal) se lekar 14vein ke poore Chand (Full Moon) tak iske 8 ahem phases hote hain jo Islamic Hijri calendar ka ahem hissa hain.
• **First Human on Moon:** 20 July 1969 ko Apollo 11 mission ke zariye **Neil Armstrong** Chand par pehla qadam rakhne wale insaan bane the.`;
    }
  }

  if (
    lower.includes("solar system") ||
    lower.includes("planets") ||
    lower.includes("nizam e shamsi") ||
    lower.includes("sayyare") ||
    lower.includes("نظام شمسی") ||
    lower.includes("सौर मंडल")
  ) {
    return `**Answer:** Solar System (Nizam-e-Shamsi) mein **Suraj (Sun)** center mein hai aur iske gird **8 Sayyare (Planets)** orbit karte hain.

**Explain:**

• **8 Planets (Suraj se doori ke mutabiq):** Mercury (Utarid), Venus (Zohra), Earth (Zameen), Mars (Mareekh), Jupiter (Mushtari), Saturn (Zuhal), Uranus, aur Neptune.
• **Largest & Smallest:** Jupiter solar system ka sabse bada planet hai, jabki Mercury sabse chota planet hai.
• **Earth:** Zameen teesra planet hai jahan life aur liquid paani maujood hai; yeh 365 din mein suraj ka ek chakkar pura karti hai.`;
  }

  // 0. World & Geography Superlatives (Largest River, Mountain, Ocean, etc.)
  if (
    lower.includes("largest river") ||
    lower.includes("longest river") ||
    lower.includes("dunya ka sabse bada darya") ||
    lower.includes("nile") ||
    lower.includes("amazon") ||
    lower.includes("دریائے نیل") ||
    lower.includes("दुनिया की सबसे बड़ी नदी")
  ) {
    if (isUrdu) {
      return `**Answer:** لمبائی کے لحاظ سے دنیا کا سب سے لمبا دریا **دریائے نیل (River Nile)** ہے، جبکہ پانی کے حجم (Water Volume) اور بہاؤ کے لحاظ سے دنیا کا سب سے بڑا دریا **دریائے ایمیزون (Amazon River)** ہے۔

**Explain:**

• **دریائے نیل (River Nile):** اس کی لمبائی تقریباً **6,650 کلومیٹر (4,132 میل)** ہے جو براعظم افریقہ کے 11 ممالک سے گزرتا ہے اور بحیرہ روم (Mediterranean Sea) میں گرتا ہے۔
• **دریائے ایمیزون (Amazon River):** جنوبی امریکہ کا یہ دریا پانی کے مقدار کے اعتبار سے دنیا کے اگلے 7 بڑے دریاؤں کے مجموعے سے بھی زیادہ پانی رکھتا ہے اور اس کی لمبائی تقریباً 6,400 کلومیٹر ہے۔
• **Exam / Scoring Tip:** اگر لمبائی (Longest) پوچھی جائے تو **Nile** لکھیں، اور اگر پانی کے بہاؤ اور چوڑائی (Largest / Volume) کا پوچھا جائے تو **Amazon** درست جواب ہے۔`;
    } else if (isHindi) {
      return `**Answer:** लंबाई के अनुसार दुनिया की सबसे लंबी नदी **नील नदी (River Nile)** है, जबकि पानी के आयतन और फैलाव के हिसाब से दुनिया की सबसे बड़ी नदी **अमेज़ॅन नदी (Amazon River)** है।

**Explain:**

• **नील नदी (River Nile):** इसकी कुल लंबाई लगभग **6,650 किमी (4,132 मील)** है, जो अफ्रीका के 11 देशों से होकर भूमध्य सागर में गिरती है।
• **अमेज़ॅन नदी (Amazon River):** दक्षिण अमेरिका में स्थित यह नदी दुनिया का लगभग 20% मीठा पानी समुद्र में ले जाती है।
• **Exam Tip:** परीक्षा में 'Longest River' के लिए **Nile River** और 'Largest River by Volume' के लिए **Amazon River** का उल्लेख करें।`;
    } else {
      return `**Answer:** Lambai (Length) ke hisab se dunya ka sabse lamba darya **River Nile (Daryaye Neel)** hai, jabki Paani ke volume aur behav (Width/Discharge) ke hisab se sabse bada darya **Amazon River** hai.

**Explain:**

• **River Nile (Longest):** Iski kul lambai taqreeban **6,650 km (4,132 miles)** hai, jo Africa ke 11 mumalik se guzarta hai aur Mediterranean Sea mein girta hai.
• **Amazon River (Largest by Volume):** South America ka yeh darya dunya ke agle 7 bade daryaon ke majmooay se zyada paani carry karta hai.
• **Exam / Scoring Tip:** Exam mein agar "Longest River" poochen toh **River Nile** likhein, aur agar "Largest River by Volume" poochen toh **Amazon River** sahi jawab hai.`;
    }
  }

  if (lower.includes("highest mountain") || lower.includes("mount everest") || lower.includes("k2") || lower.includes("choti")) {
    return `**Answer:** Dunya ki sabse oonchi pahadi choti **Mount Everest** hai, jiski bulandi **8,848.86 meters (29,031.7 feet)** hai.

**Explain:**

• **Location:** Yeh Nepal aur China (Tibet) ke border par Himalayas pahadi silsile mein waqe hai.
• **Second Highest:** Dunya ki doosri sabse oonchi choti **K2 (Godwin-Austen)** hai jiski bulandi 8,611 meters hai (Karakoram Range).
• **History:** 29 May 1953 ko Sir Edmund Hillary aur Tenzing Norgay ne pehli baar Mount Everest sar kiya tha.`;
  }

  // 0.0 Human & World Records Superlatives (Largest/Tallest Man, Heaviest Man, Tallest Building, Animals, etc.)
  if (
    lower.includes("largest man") ||
    lower.includes("tallest man") ||
    lower.includes("heaviest man") ||
    lower.includes("biggest man") ||
    lower.includes("sabse lamba aadmi") ||
    lower.includes("sabse bada aadmi") ||
    lower.includes("sabse bhari aadmi") ||
    lower.includes("دنیا کا سب سے لمبا آدمی") ||
    lower.includes("दुनिया का सबसे लंबा आदमी") ||
    lower.includes("दुनिया का सबसे भारी इंसान")
  ) {
    if (isUrdu) {
      return `**Answer:** تاریخ میں دنیا کا سب سے لمبا انسان **رابرٹ واڈلو (Robert Wadlow)** تھا جس کا قد **8 فٹ 11.1 انچ (2.72 میٹر)** تھا، جبکہ موجودہ زندہ سب سے لمبا انسان **سلطان کوسن (Sultan Kösen)** ہے جس کا قد **8 فٹ 2.8 انچ (2.51 میٹر)** ہے۔

**Explain:**

• **تاریخ کا سب سے لمبا انسان (Tallest in History):** رابرٹ واڈلو (امریکی شہری) 1918 تا 1940، ان کا نام گنیز بک آف ورلڈ ریکارڈز میں تاریخ کے سب سے طویل القامت انسان کے طور پر درج ہے۔
• **موجودہ زندہ سب سے لمبا انسان (Living Tallest Man):** سلطان کوسن (ترکیہ کے شہری) جن کا قد 251 سینٹی میٹر ہے۔
• **تاریخ کا سب سے وزنی انسان (Heaviest Man):** جان براور منوچ (Jon Brower Minnoch) جن کا زیادہ سے زیادہ وزن تقریباً **635 کلوگرام (1,400 پاؤنڈز)** ریکارڈ کیا گیا تھا۔
• **سب سے چھوٹا انسان (Shortest Man):** چندرا بہادر دانگی (نیپال)، قد صرف 21.5 انچ (54.6 سینٹی میٹر) تھا۔`;
    } else if (isHindi) {
      return `**Answer:** इतिहास में दुनिया का सबसे लंबा इंसान **रॉबर्ट वाडलो (Robert Wadlow)** था जिसकी लंबाई **8 फीट 11.1 इंच (2.72 मीटर)** थी, और वर्तमान में जीवित सबसे लंबा इंसान **सुल्तान कोसेन (Sultan Kösen)** है (लंबाई **8 फीट 2.8 इंच / 2.51 मीटर**)।

**Explain:**

• **इतिहास का सबसे लंबा व्यक्ति:** रॉबर्ट वाडलो (USA, 1918–1940) का नाम गिनीज बुक ऑफ वर्ल्ड रिकॉर्ड्स में अब तक के सबसे लंबे इंसान के रूप में दर्ज है।
• **वर्तमान जीवित सबसे लंबा व्यक्ति:** सुल्तान कोसेन (तुर्की), जिनकी कुल लंबाई 251 सेमी (8 फीट 2.8 इंच) है।
• **इतिहास का सबसे भारी इंसान (Heaviest Man):** जॉन ब्रोवर मिनोक (Jon Brower Minnoch), जिनका अधिकतम वजन लगभग **635 किलोग्राम (1400 lbs)** दर्ज था।
• **दुनिया का सबसे छोटा इंसान:** चंद्र बहादुर डांगी (नेपाल), जिनकी लंबाई केवल 21.5 इंच (54.6 सेमी) थी।`;
    } else {
      return `**Answer:** Tareekh (History) mein dunya ka sabse lamba aadmi **Robert Wadlow (USA)** tha jiski height **8 feet 11.1 inches (2.72 meters)** thi, jabki maujooda zinda sabse lamba aadmi **Sultan Kösen (Turkey)** hai jiski height **8 feet 2.8 inches (2.51 meters)** hai.

**Explain:**

• **Tallest Man in Recorded History:** Robert Wadlow (1918–1940, USA) ka naam Guinness World Records mein dunya ke sabse lambe insaan ke taur par darj hai.
• **Living Tallest Man:** Sultan Kösen (Turkey) jin ka qad 251 cm (8 ft 2.8 in) hai.
• **Heaviest / Largest Man in History (Sabse Bhari):** Jon Brower Minnoch (USA) jinka peak weight taqreeban **635 kg (1,400 lbs)** record hua tha.
• **Shortest Man in History:** Chandra Bahadur Dangi (Nepal) jinka qad sirf 21.5 inches (54.6 cm) tha.`;
    }
  }

  // Tallest Building
  if (lower.includes("tallest building") || lower.includes("sabse oonchi building") || lower.includes("burj khalifa") || lower.includes("برج خلیفہ")) {
    return `**Answer:** Dunya ki sabse oonchi imaarat (tallest building) **Burj Khalifa** hai, jo Dubai (United Arab Emirates) mein waqe hai.

**Explain:**

• **Height (Bulandi):** Burj Khalifa ki kul bulandi **828 meters (2,717 feet)** hai aur isme 163 floors (manzilein) hain.
• **Inauguration:** Yeh imaarat 4 January 2010 ko rasmi taur par aam logon ke liye kholi gayi thi.
• **Second Tallest:** Doosri sabse oonchi imaarat **Merdeka 118** (Kuala Lumpur, Malaysia) hai jiski height 678.9 meters hai.`;
  }

  // Largest Animal & Birds
  if (
    lower.includes("largest animal") ||
    lower.includes("biggest animal") ||
    lower.includes("sabse bada jaanwar") ||
    lower.includes("sabse bada janwar") ||
    lower.includes("blue whale") ||
    lower.includes("بلو وہیل")
  ) {
    return `**Answer:** Dunya ka sabse bada jaanwar **Blue Whale (نیلی وہیل)** hai, jo samandar mein rehti hai.

**Explain:**

• **Size & Weight:** Ek Blue Whale ki lambai **30 meters (100 feet)** tak aur wazan taqreeban **190 se 200 tonnes (190,000 kg)** tak ho sakta hai. Iska dil ek choti car ke barabar hota hai.
• **Largest Land Animal (Zameen ka sabse bada):** **African Bush Elephant (افریقی ہاتھی)**, jiska wazan 6,000 kg (6 tonnes) tak hota hai.
• **Fastest Land Animal (Sabse tez daudne wala):** **Cheetah (چیتا)**, jo 110-120 km/h ki speed se daud sakta hai.
• **Fastest Bird (Sabse tez parinda):** **Peregrine Falcon (شاہین)**, jo shikar par jhapatte waqt 380+ km/h ki speed pakadta hai.`;
  }

  // Largest & Smallest Countries
  if (
    lower.includes("largest country") ||
    lower.includes("smallest country") ||
    lower.includes("sabse bada mulk") ||
    lower.includes("sabse chhota mulk") ||
    lower.includes("sabse chota mulk") ||
    lower.includes("سب سے بڑا ملک") ||
    lower.includes("سب سے چھوٹا ملک")
  ) {
    if (lower.includes("smallest") || lower.includes("chhota") || lower.includes("chota") || lower.includes("چھوٹا")) {
      return `**Answer:** Dunya ka sabse chhota mulk (smallest country) **Vatican City** hai.

**Explain:**

• **Area:** Iska kul area sirf **0.49 square kilometers** (taqreeban 121 acres) hai.
• **Population:** Yahan ki aabadi taqreeban 800-900 log hai aur yeh Rome (Italy) ke andar waqe ek azaad mustaqil riyasat hai.`;
    }
    return `**Answer:** Dunya ka sabse bada mulk raqbay (Area) ke hisab se **Russia (روس)** hai, jabki aabadi (Population) ke hisab se **India (Bharat)** sabse bada mulk hai.

**Explain:**

• **Area Wise (Russia):** Russia ka area taqreeban **1.71 Crore square km** hai jo dunya ki zameen ka 11% hissa banta hai (yeh 11 time zones mein phaila hua hai).
• **Population Wise (India):** Bharat ki aabadi 1.43 Billion (143 Crore) se tajawuz kar chuki hai.`;
  }

  // Richest Person in the World
  if (
    lower.includes("richest man") ||
    lower.includes("richest person") ||
    lower.includes("sabse ameer aadmi") ||
    lower.includes("sabse amir aadmi") ||
    lower.includes("elon musk") ||
    lower.includes("سب سے امیر آدمی")
  ) {
    return `**Answer:** Dunya ke sabse ameer tareen shakhs **Elon Musk** (Tesla, SpaceX & xAI ke Founder) hain, jin ki kul daulat taqreeban **$250 Billion se $300 Billion+ USD** ke darmiyan fluctuate hoti hai.

**Explain:**

• **Companies:** Elon Musk Tesla (Electric Cars), SpaceX (Rockets & Satellites), X (Twitter), Neuralink aur xAI (Grok) ke owner/CEO hain.
• **Top Billionaires List:** Doosre ahem ameer tareen logon mein **Jeff Bezos** (Amazon), **Bernard Arnault** (LVMH Luxury Brands), aur **Mark Zuckerberg** (Meta/Facebook) shaamil hain.`;
  }

  // Aircraft & Aviation Superlatives & General Knowledge
  if (
    lower.includes("aircraft") ||
    lower.includes("air craft") ||
    lower.includes("airplane") ||
    lower.includes("aeroplane") ||
    lower.includes("kitnia jet") ||
    lower.includes("kitne jet") ||
    lower.includes("kitne aircraft") ||
    lower.includes("jahaz") ||
    lower.includes("fighter jet") ||
    lower.includes("ہوائی جہاز") ||
    lower.includes("طیارے") ||
    lower.includes("विमान")
  ) {
    if (isUrdu) {
      return `**Answer:** دنیا بھر میں کل تقریباً **45,000 سے 55,000 ایکٹو طیارے (Aircrafts)** کام کر رہے ہیں، جن میں کمرشل مسافر طیارے، ملٹری جیٹس اور پرائیویٹ جیٹس شامل ہیں۔

**Explain:**

• **کمرشل ایئر لائنز (Commercial Passenger Jets):** دنیا میں تقریباً **25,000 سے 30,000** ایکٹو مسافر بردار طیارے (جیسے Boeing 737/777 اور Airbus A320/A350) فلائٹ آپریشنز میں ہیں۔
• **فوجی طیارے (Military Aircraft / Fighter Jets):** تمام ممالک کی فضائی افواج کے پاس مجموعی طور پر تقریباً **14,000 سے 15,000** ملٹری جیٹس، بمبار اور کارگو طیارے ہیں۔
• **بزنس و پرائیویٹ جیٹس (Private Jets):** دنیا بھر میں لگ بھگ **23,000** پرائیویٹ کارپوریٹ جیٹس پرواز کرتے ہیں۔
• **سرفہرست ممالک:** سب سے زیادہ طیارے اور فائٹر جیٹس **امریکہ (USA)**، **روس (Russia)**، اور **چین (China)** کے پاس ہیں۔`;
    } else if (isHindi) {
      return `**Answer:** पूरी दुनिया में कुल लगभग **45,000 से 55,000 सक्रिय विमान (Aircrafts)** मौजूद हैं, जिनमें वाणिज्यिक (Commercial), सैन्य लड़ाकू विमान (Fighter Jets) और निजी जेट शामिल हैं।

**Explain:**

• **कमर्शियल यात्री जेट (Commercial Airliners):** दुनिया भर में लगभग **28,000 से 30,000** सक्रिय यात्री विमान (Airbus & Boeing) उड़ रहे हैं।
• **सैन्य लड़ाकू विमान (Military Fighter Jets & Fleet):** दुनिया की विभिन्न वायु सेनाओं के पास कुल लगभग **14,500+** सैन्य जेट और लड़ाकू विमान हैं।
• **प्राइवेट व बिजनेस जेट्स:** लगभग **22,000 से 23,000** निजी कॉर्पोरेट जेट्स पंजीकृत हैं।
• **शीर्ष देश:** विमानों की संख्या में **अमेरिका (USA)** शीर्ष पर है, जिसके बाद **रूस (Russia)** और **चीन (China)** आते हैं।`;
    } else {
      return `**Answer:** Poori dunya mein kul taqreeban **45,000 se 55,000 active aircrafts (tayyare)** hain, jin mein Commercial Airliners, Military Fighter Jets aur Private Jets shamil hain.

**Explain:**

• **Commercial Airlines (Musafir Tayyare):** Dunya bhar mein taqreeban **28,000 se 30,000** active passenger jets (Boeing, Airbus) daily flights operate karte hain.
• **Military & Fighter Jets (Fauji Tayyare):** Dunya ki tamam Air Forces ke paas kul taqreeban **14,000 se 15,000** active combat aur transport fighter jets hain.
• **Private & Business Jets:** Taqreeban **22,000 se 23,000** private corporate jets register hain.
• **Top Fleets:** Sabse zyada aircrafts aur fighter jets **USA (United States)**, **Russia**, aur **China** ke paas hain.`;
    }
  }

  if (lower.includes("largest ocean") || lower.includes("bada samandar") || lower.includes("pacific ocean") || lower.includes("بحر الکاہل")) {
    return `**Answer:** Dunya ka sabse bada aur gehra samandar **Pacific Ocean (Bahr-ul-Kahir / بحر الکاہل)** hai.

**Explain:**

• **Area:** Yeh zameen ke kul surface area ka taqreeban 32% aur tamam samandar ke paani ka lagbhag aadha hissa cover karta hai.
• **Deepest Point:** Dunya ka sabse gehra maqam **Mariana Trench (Challenger Deep)** isi ocean mein hai jiski gehrai lagbhag **11,034 meters** hai.`;
  }

  // 1. Hydrogen (Exact match for: "What is hydrogen", "hydrogen kya hai", etc.)
  if (lower.includes("hydrogen") || lower.includes("ہائڈروجن") || lower.includes("हाइड्रोजन") || /\bh2\b/i.test(lower)) {
    if (isUrdu) {
      return `**Answer:** ہائیڈروجن ($H$) کائنات کا سب سے پہلا، سب سے ہلکا اور سب سے زیادہ پایا جانے والا کیمیائی عنصر (Chemical Element) ہے جس کا ایٹمی نمبر **1** ہے۔

**Explain:**

• **بناوٹ (Atomic Structure):** ہائیڈروجن کے ایک ایٹم میں صرف 1 پروٹون اور 1 الیکٹران ہوتا ہے (اس میں نیوٹران نہیں ہوتا)۔
• **خصوصیات:** یہ بے رنگ، بے بو اور انتہائی آتش گیر (Flammable) گیس ہے جو عام حالت میں ڈائی ایٹامک مالیکیول ($H_2$) کی شکل میں پائی جاتی ہے۔
• **اہمیت:** یہ سورج اور ستاروں کا بنیادی ایندھن ہے (Nuclear Fusion) اور پانی ($H_2O$) کے بننے میں اہم ترین جز ہے۔
• **Exam / Scoring Tip:** ہائیڈروجن کے 3 آئسوٹوپس ہوتے ہیں: پروٹیم ($^1H$)، ڈیوٹیریم ($^2H$) اور ٹریٹیم ($^3H$)۔`;
    } else if (isHindi) {
      return `**Answer:** हाइड्रोजन ($H$) आवर्त सारणी (Periodic Table) का पहला, सबसे हल्का और ब्रह्मांड में सबसे प्रचुर मात्रा में पाया जाने वाला तत्व है, जिसका परमाणु क्रमांक **1** है।

**Explain:**

• **परमाणु संरचना:** इसके नाभिक में केवल 1 प्रोटॉन और 1 इलेक्ट्रॉन होता है (न्यूट्रॉन नहीं होता)।
• **भौतिक गुण:** यह एक रंगहीन, गंधहीन और अत्यधिक ज्वलनशील गैस है जो $H_2$ के रूप में रहती है।
• **महत्व:** यह सूर्य की ऊर्जा का मुख्य स्रोत है और जल ($H_2O$) का मुख्य घटक है।
• **Scoring Tip:** हाइड्रोजन के 3 समस्थानिक (Isotopes) हैं: प्रोटियम, ड्यूटेरियम और ट्रिटियम।`;
    } else {
      return `**Answer:** Hydrogen ($H$) Periodic Table ka pehla, sabse halka aur poori kainaat (universe) mein sabse zyada paaya jaane wala chemical element hai, jiska Atomic Number **1** aur Atomic Mass **1.008** hota hai.

**Explain:**

• **Atomic Structure:** Hydrogen ke ek atom mein sirf **1 Proton** aur **1 Electron** hota hai (isme koi Neutron nahi hota).
• **Properties:** Yeh ek colorless, odorless aur highly flammable gas hai jo normal temperature par diatomic form ($H_2$) mein rehti hai.
• **Role in Nature:** Suraj aur taaron ki roshni/energy hydrogen ke Nuclear Fusion se banti hai, aur yeh Water ($H_2O$) ka bunyadi hissa hai.
• **Exam / Scoring Tip:** Hydrogen ke 3 mashhoor Isotopes hote hain: Protium ($^1H$), Deuterium ($^2H$), aur Tritium ($^3H$).`;
    }
  }

  // 1.1 Oxygen, Nitrogen, Carbon, Helium
  if (lower.includes("oxygen") || lower.includes("آکسیجن") || lower.includes("ऑक्सीजन") || /\bo2\b/i.test(lower)) {
    return `**Answer:** Oxygen ($O$) ek life-supporting chemical element hai jiska Atomic Number **8** hai aur yeh Earth ke atmosphere ka taqreeban **21%** hissa banati hai.

**Explain:**

• **Respiration & Life:** Tamam insaan aur jaanwar saans lene ke liye Oxygen ($O_2$) use karte hain jo cellular respiration mein glucose se energy nikalta hai.
• **Combustion:** Kisi bhi cheez ko jalne (aag lagne) ke liye Oxygen zaroori hoti hai.
• **Ozone Layer:** Oxygen ke 3 atoms mil kar Ozone ($O_3$) banate hain jo zameen ko suraj ki khatarnak UV rays se bachata hai.`;
  }

  if (lower.includes("nitrogen") || lower.includes("نائٹروجن") || lower.includes("नाइट्रोजन") || /\bn2\b/i.test(lower)) {
    return `**Answer:** Nitrogen ($N$) ek colorless aur inert gas hai jiska Atomic Number **7** hai aur yeh Earth ke atmosphere ka sabse bada hissa (**78%**) banati hai.

**Explain:**

• **Proteins & DNA:** Nitrogen amino acids, proteins aur DNA/RNA ka bunyadi building block hai.
• **Nitrogen Cycle:** Plants hawa ki nitrogen directly nahi le sakte, isliye bacteria (Rhizobium) Nitrogen Fixation ke zariye ise soil mein convert karte hain.
• **Usage:** Food packaging (chips ke packet) aur fertilizers (Urea) mein use hoti hai.`;
  }

  if (lower.includes("carbon") || lower.includes("کاربن") || lower.includes("कार्बन")) {
    return `**Answer:** Carbon ($C$) ek versatile non-metal element hai jiska Atomic Number **6** hai aur yeh poori **Organic Chemistry** aur tamam living organisms ki bunyad hai.

**Explain:**

• **Tetravalency & Catenation:** Carbon ke 4 valence electrons hote hain aur yeh doosre carbon atoms ke sath lambi chains banane ki khasiyat (Catenation) rakhta hai.
• **Allotropes (Mukhtalif Shaklein):** Diamond (sabse sakht qudrati substance), Graphite (pencil lead jo electricity conduct karta hai), aur Graphene/Fullerenes.
• **Exam Tip:** Carbon hamesha covalent bonds banata hai.`;
  }

  // 1.2 Atom, Molecule, Electron, Proton, Neutron
  if (lower.includes("what is atom") || lower.includes("atom kya hai") || lower.includes("ایٹم") || lower.includes("परमाणु")) {
    return `**Answer:** Atom (ایٹم) kisi bhi maaday (matter) ka sabse chhota bunyadi hissa (building block) hai jo chemical properties ko barqarar rakhta hai.

**Explain:**

• **3 Subatomic Particles:**
  1. **Protons ($p^+$):** Positive charge (+1), Nucleus ke andar hote hain.
  2. **Neutrons ($n^0$):** Neutral (0 charge), Nucleus ke andar hote hain.
  3. **Electrons ($e^-$):** Negative charge (-1), Nucleus ke gird fixed orbits (shells) mein ghoomte hain.
• **Nucleus:** Atom ka markazi hissa jahan uska 99.9% mass jama hota hai.
• **Exam Tip:** Atomic Number ($Z$) = Protons ki tadad; Mass Number ($A$) = Protons + Neutrons.`;
  }

  // 1.3 Cell & Mitochondria (Biology)
  if (lower.includes("what is cell") || lower.includes("cell kya hai") || lower.includes("خلیہ") || lower.includes("कोशिका")) {
    return `**Answer:** Cell (خلیہ) tamam jaandaaron (living organisms) ki bunyadi structural aur functional unit hai.

**Explain:**

• **Cell Theory:** Tamam living things cells se mil kar banti hain aur nayi cells pehle se maujood cells ke divide hone se banti hain.
• **Key Parts:** Cell Membrane (outer wall), Cytoplasm (fluid), Nucleus (control center / DNA), aur Mitochondria.
• **Types:** Plant Cells (jisme cell wall aur chloroplasts hote hain) aur Animal Cells.`;
  }

  if (lower.includes("mitochondria") || lower.includes("powerhouse of cell")) {
    return `**Answer:** Mitochondria ko **"Powerhouse of the Cell"** kaha jata hai kyunki yeh cellular respiration ke zariye energy paida karta hai.

**Explain:**

• **ATP Production:** Yeh glucose aur oxygen ko break karke **ATP (Adenosine Triphosphate)** banata hai, jo cell ki energy currency hai.
• **Structure:** Iski double membrane hoti hai jisme inner membrane folds (Cristae) banati hai taake surface area badh sake.
• **Exam Tip:** Mitochondria ke paas apna khud ka DNA aur Ribosomes hote hain.`;
  }

  // 1. Water Formula / Pani ka formula / Chemical Formula of Water
  if (lower.includes("water") || lower.includes("pani") || lower.includes("پانی") || lower.includes("पानी") || lower.includes("h2o")) {
    if (isUrdu) {
      return `**Answer:** پانی کا کیمیائی فارمولا **$H_2O$** ہے، جس کا مطلب ہے کہ پانی کے ہر ایک مالیکیول میں 2 ہائیڈروجن اور 1 آکسیجن کا ایٹم ہوتا ہے۔

**Explain:**

• **مالیکیولی بناوٹ (Molecular Structure):** دو ہائیڈروجن ($H$) ایٹمز ایک آکسیجن ($O$) ایٹم کے ساتھ مضبوط کوویلنٹ بانڈ (Covalent Bond) کے ذریعے جڑے ہوتے ہیں۔
• **مالیکیولر ماس:** پانی کا مالیکیولر وزن تقریباً $18.015\\text{ g/mol}$ ہوتا ہے۔
• **طبیعی خصوصیات:** خالص پانی کا نقطہ انجماد (Freezing Point) $0^\\circ\\text{C}$ اور نقطہ کھولاؤ (Boiling Point) $100^\\circ\\text{C}$ ہے۔`;
    } else if (isHindi) {
      return `**Answer:** पानी का रासायनिक सूत्र **$H_2O$** है, जिसका अर्थ है कि पानी का एक अणु 2 हाइड्रोजन और 1 ऑक्सीजन परमाणु से मिलकर बना है।

**Explain:**

• **रासायनिक संरचना:** इसमें दो हाइड्रोजन परमाणु ($H$) एक ऑक्सीजन परमाणु ($O$) के साथ सहसंयोजक बंध (Covalent Bond) से जुड़े होते हैं।
• **मोलर द्रव्यमान:** पानी का मोलर भार $18.015\\text{ g/mol}$ होता है।
• **भौतिक गुण:** शुद्ध पानी का हिमांक (Freezing Point) $0^\\circ\\text{C}$ और क्वथनांक (Boiling Point) $100^\\circ\\text{C}$ होता है।`;
    } else {
      return `**Answer:** Water ka chemical formula **$H_2O$** hota hai, jisme 2 Hydrogen ($H$) atoms aur 1 Oxygen ($O$) atom aapas mein jude hote hain.

**Explain:**

• **Chemical Bonding:** Yeh covalent bonds ke zariye jude hote hain jisme hydrogen aur oxygen aapas mein electrons share karte hain.
• **Molecular Weight:** Water ka molecular mass lagbhag $18.015\\text{ g/mol}$ hota hai.
• **Physical Properties:** Pure water ka freezing point $0^\\circ\\text{C}$ aur boiling point $100^\\circ\\text{C}$ hota hai.`;
    }
  }

  // 2. Common Chemical Formulas (Salt, Glucose, CO2, Methane, Bleach, Baking Soda, Acid)
  if (lower.includes("salt") || lower.includes("namak") || lower.includes("nacl") || lower.includes("نمک")) {
    return `**Answer:** Table Salt (Aam khane ke namak) ka chemical formula **$NaCl$ (Sodium Chloride)** hai.

**Explain:**

• **Composition:** Yeh ek Sodium ion ($Na^+$) aur ek Chloride ion ($Cl^-$) ke ionic bond se banta hai.
• **Appearance:** Yeh white crystalline solid hota hai jo paani mein aasani se dissolve ho jata hai.
• **Usage:** Khane mein swad ke alawa yeh body ke fluid balance aur electrolyte balance ke liye zaroori hota hai.`;
  }

  if (lower.includes("glucose") || lower.includes("sugar formula") || lower.includes("c6h12o6")) {
    return `**Answer:** Glucose ka chemical formula **$C_6H_{12}O_6$** hai.

**Explain:**

• **Composition:** Isme 6 Carbon ($C$), 12 Hydrogen ($H$), aur 6 Oxygen ($O$) atoms hote hain.
• **Energy Source:** Yeh body ki cells aur plants ke liye primary instant energy source hai.
• **Photosynthesis:** Plants photosynthesis process ke zariye sunlight se glucose banate hain.`;
  }

  if (lower.includes("carbon dioxide") || lower.includes("co2") || lower.includes("co 2")) {
    return `**Answer:** Carbon Dioxide ka chemical formula **$CO_2$** hai.

**Explain:**

• **Structure:** Ek Carbon ($C$) atom do Oxygen ($O$) atoms ke sath double covalent bond banata hai ($O=C=O$).
• **Respiration & Nature:** Insaan aur jaanwar saans chhodte waqt $CO_2$ nikalte hain, jabki plants ise photosynthesis mein use karte hain.
• **Greenhouse Gas:** Yeh atmosphere mein heat trap karke temperature balance rakhti hai, lekin zyada hone par global warming karti hai.`;
  }

  if (lower.includes("methane") || lower.includes("natural gas") || lower.includes("ch4")) {
    return `**Answer:** Methane (Natural Gas / Gobar Gas) ka chemical formula **$CH_4$** hai.

**Explain:**

• **Structure:** Ek Carbon atom 4 Hydrogen atoms ke sath tetrahedral shape mein juda hota hai.
• **Fuel:** Yeh cooking gas (CNG / PNG) ka main component hota hai aur jalne par high energy deta hai ($CH_4 + 2O_2 \\to CO_2 + 2H_2O + \\text{Heat}$).`;
  }

  if (lower.includes("baking soda") || lower.includes("sodium bicarbonate") || lower.includes("nahco3")) {
    return `**Answer:** Baking Soda ka chemical formula **$NaHCO_3$ (Sodium Bicarbonate)** hai.

**Explain:**

• **Usage:** Baking mein cakes aur breads ko fluffy banane ke liye use hota hai kyunki garam hone par yeh $CO_2$ gas release karta hai.
• **Antacid:** Stomach acidity ko neutralize karne ke liye bhi use hota hai.`;
  }

  if (lower.includes("sulfuric acid") || lower.includes("h2so4") || lower.includes("tezaab") || lower.includes("king of chemicals")) {
    return `**Answer:** Sulfuric Acid ka chemical formula **$H_2SO_4$** hai, jise "King of Chemicals" bhi kaha jata hai.

**Explain:**

• **Nature:** Yeh bohot strong aur corrosive diprotic acid hai jo car batteries aur industrial chemical manufacturing mein use hota hai.
• **Reaction with Water:** Ise paani mein milate waqt hamesha acid ko dheere dheere paani mein dalna chahiye, ulta nahi.`;
  }

  // 3. Electric Bulb (Exact User Example)
  if (lower.includes("bulb") || lower.includes("electric bulb") || lower.includes("بلب") || lower.includes("बल्ब")) {
    if (isUrdu) {
      return `**Answer:** الیکٹرک بلب بنانے کے لیے شیشے کا بلب (Glass bulb)، ٹنگسٹن فلامنٹ (Tungsten filament)، غیر عامل گیس (Argon) اور میٹل بیس کی ضرورت ہوتی ہے۔

**Explain:**

• **طریقہ کار (Mechanism):** جب بجلی فلامنٹ سے گزرتی ہے، تو اس کی زیادہ مزاحمت اسے گرم کر کے روشنی پیدا کرتی ہے۔
• **ٹنگسٹن فلامنٹ:** ٹنگسٹن اس لیے استعمال ہوتا ہے کیونکہ اس کا پگھلنے کا نقطہ (3422°C) بہت زیادہ ہوتا ہے۔
• **غیر عامل گیس:** بلب کے اندر آرگن گیس بھری جاتی ہے تاکہ فلامنٹ ہوا کی آکسیجن کے ساتھ جل نہ جائے۔`;
    } else if (isHindi) {
      return `**Answer:** इलेक्ट्रिक बल्ब बनाने के लिए एक ग्लास बल्ब, टंगस्टन फिलामेंट, अक्रिय गैस (Argon), और मेटल बेस की ज़रूरत होती है।

**Explain:**

• **Mechanism:** जब बिजली फिलामेंट से गुज़रती है, तो इसका हाई रेसिस्टेंस इसे गर्म करके रोशनी पैदा करता है।
• **Tungsten Filament:** टंगस्टन का गलनांक (Melting Point 3422°C) बहुत उच्च होता है, जिससे यह पिघलता नहीं है।
• **Inert Gas:** बल्ब में आर्गन गैस भरी जाती है ताकि फिलामेंट ऑक्सीजन के साथ जलने से सुरक्षित रहे।`;
    } else {
      return `**Answer:** Electric bulb banane ke liye ek glass bulb, tungsten filament, inert gas (Argon), aur metal base ki zaroorat hoti hai.

**Explain:**

• **Mechanism:** Jab electricity filament se guzarti hai, toh uska high resistance use garam karke roshni paida karta hai.
• **Tungsten Filament:** Tungsten isliye use hota hai kyunki iska melting point (3422°C) bohot high hota hai aur yeh pighalta nahi.
• **Inert Gas:** Bulb mein Argon gas bhari jaati hai taaki filament oxygen ke saath oxidize ho kar jal na jaaye.`;
    }
  }

  // 3.1 Electric Battery (Complete DIY & Scientific Guide for "battery banani hai", "how to make battery")
  if (
    lower.includes("battery") ||
    lower.includes("بیٹری") ||
    lower.includes("बैटरी") ||
    lower.includes("electric cell") ||
    lower.includes("lemon battery")
  ) {
    if (isUrdu) {
      return `**Answer:** بیٹری بنانے کے دو بہترین طریقے ہیں: 1) **لیمن سائنس بیٹری (تعلیمی پروجیکٹ)** اور 2) **لتھیم آئن بیٹری (12V یا پروجیکٹ ورک کے لیے)**۔

**Explain:**

• **طریقہ 1: لیمن بیٹری (محفوظ سائنس پروجیکٹ):**
  1. **ضروری سامان:** 2 عدد لیموں (الیکٹرولائٹ)، تانبے کا سکہ یا تار (Copper - مثبت +)، زنک کی کیل (Zinc Nail - منفی -)، اور چھوٹی LED لائٹ۔
  2. **بنانے کا طریقہ:** لیموں کے ایک طرف کاپر اور دوسری طرف زنک لگائیں (اندر آپس میں نہ جڑیں)۔ کاپر مثبت اور زنک منفی ہوگا۔ ایل ای ڈی جوڑیں تو کیمیائی عمل سے کرنٹ پیدا ہوگا۔

• **طریقہ 2: لتھیم بیٹری (18650 سیلز برائے پراجیکٹ):**
  1. **سامان:** 18650 لیتھیم سیلز (3.7V فی سیل)، BMS پروٹیکشن بورڈ (اوور چارجنگ سے بچاؤ کے لیے)، اور بیٹری ہولڈر۔
  2. **کنکشن:** سیریز میں جوڑنے سے وولٹیج بڑھتی ہے ($3 \\times 3.7\\text{V} = 11.1\\text{V}$)، جبکہ متوازی (Parallel) جوڑنے سے بیک اپ ٹائم (mAh) بڑھتا ہے۔

• **امتحانی و حفاظتی نکتہ:** بیٹری کیمیکل انرجی کو الیکٹریکل انرجی میں تبدیل کرتی ہے۔ کیتھوڈ (+) پر ریڈکشن اور اینوڈ (-) پر آکسیڈیشن کا عمل ہوتا ہے۔`;
    } else if (isHindi) {
      return `**Answer:** बैटरी बनाने के दो मुख्य तरीके हैं: 1) **नींबू बैटरी (स्कूल/साइंस प्रोजेक्ट के लिए)** और 2) **लिथियम-आयन 18650 बैटरी (प्रोजेक्ट/12V पावर के लिए)**।

**Explain:**

• **तरीका 1: नींबू बैटरी (Science Experiment):**
  1. **सामग्री:** 2-3 नींबू (Electrolyte), कॉपर वायर या सिक्का (Positive +), जिंक की कील (Zinc Nail - Negative -), और एक छोटी LED लाइट।
  2. **प्रक्रिया:** नींबू में एक तरफ कॉपर और दूसरी तरफ जिंक लगाएं। कॉपर को (+) और जिंक को (-) से जोड़ें। रासायनिक अभिक्रिया (Chemical Reaction) से वोल्टेज पैदा होगी और LED जलेगी।

• **तरीका 2: रिचार्जेबल लिथियम बैटरी (18650 Cells):**
  1. **सामग्री:** 18650 Li-ion सेल्स (3.7V), BMS प्रोटेक्शन सर्किट बोर्ड (शॉर्ट-सर्किट से बचाव के लिए), और बैटरी केस/होल्डर।
  2. **कनेक्शन:** वोल्टेज बढ़ाने के लिए सेल्स को Series ($3 \\times 3.7\\text{V} \\approx 12\\text{V}$) में जोड़ें, और बैकअप (mAh) बढ़ाने के लिए Parallel में जोड़ें।

• **परीक्षा और सुरक्षा युक्ति:** बैटरी केमिकल एनर्जी को इलेक्ट्रिकल एनर्जी में बदलती है। लिथियम बैटरी को बिना BMS सर्किट के कभी चार्ज न करें।`;
    } else {
      return `**Answer:** Battery banane ke do practical tareeqe hain: 1) **Lemon Battery (Safe Science Experiment)** aur 2) **Lithium 18650 Rechargeable Battery (12V ya Power Bank ke liye)**।

**Explain:**

• **Method 1: Lemon Battery (Aasan Science Project):**
  1. **Zaroori Samaan:** 2-3 Lemons (Neembu jo Electrolyte ka kaam karte hain), Copper Wire ya Sikka (**+ Positive Anode**), Galvanized Zinc Nail (**- Negative Cathode**), aur choti LED light.
  2. **Kaise Banayein:** Lemon ke ek side copper aur doosri side zinc nail ghusayein (andar aapas mein touch na hon). Copper (+) ko LED ke lambe leg se aur Zinc (-) ko chhote leg se connect karein. Chemical reaction se $0.9\\text{V}$ voltage paida hogi aur LED roshan hogi!

• **Method 2: Rechargeable Lithium Battery (DIY 12V ya Drone/Inverter):**
  1. **Zaroori Samaan:** 18650 Lithium Cells (3.7V har cell), **BMS (Battery Management System)** board (overcharge aur short-circuit safety ke liye), aur Battery Holder.
  2. **Wiring:** 3 cells ko Series mein connect karne par $3 \\times 3.7\\text{V} = 11.1\\text{V}$ (12V) milta hai. Cells ko Parallel mein connect karne par battery ki capacity (mAh) badhti hai.

• **Scoring / Safety Tip:** Battery Chemical Energy ko Electrical Energy mein convert karti hai. Lithium cells ke sath hamesha BMS circuit use karein taake battery garam hokar short na ho.`;
    }
  }

  // 4. Math: Pythagoras Theorem
  if (lower.includes("pythagoras") || lower.includes("triangle formula") || lower.includes("hypotenuse") || lower.includes("فیثاغورث")) {
    return `**Answer:** Pythagoras Theorem states that in a right-angled triangle: **Hypotenuse² = Base² + Perpendicular²** ($c^2 = a^2 + b^2$).

**Explain:**

• **Formula:** $c = \\sqrt{a^2 + b^2}$, jahan $c$ sabse lambi side (Hypotenuse) hoti hai jo 90° angle ke saamne hoti hai.
• **Condition:** Yeh formula sirf aur sirf Right-Angled Triangles par apply hota hai.
• **Real-Life Use:** Construction, navigation, architecture aur distances calculate karne mein use hota hai.`;
  }

  // 5. Math: Quadratic Equation
  if (lower.includes("quadratic") || lower.includes("ax2") || lower.includes("ax²") || lower.includes("دو درجی") || lower.includes("द्विघात")) {
    return `**Answer:** Quadratic Equation ($ax^2 + bx + c = 0$) ka universal solution formula **x = [-b ± √(b² - 4ac)] / (2a)** hai.

**Explain:**

• **Formula Breakdown:** $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ jahan $a \\neq 0$ hota hai.
• **Discriminant ($D$):** $D = b^2 - 4ac$. Agar $D > 0$ to real roots, $D = 0$ to equal roots, aur $D < 0$ to imaginary roots hote hain.
• **Exam Tip:** Negative signs $(-b)$ ko solve karte waqt carefully bracket mein rakhein.`;
  }

  // 6. Math: Circle Area & Circumference
  if (lower.includes("circle") || lower.includes("area of circle") || lower.includes("circumference") || lower.includes("daire ka raqba")) {
    return `**Answer:** Circle ka Area (Raqba) **Area = πr²** aur Circumference (Muheet) **C = 2πr** hota hai.

**Explain:**

• **Value of $\\pi$:** $\\pi \\approx \\frac{22}{7} \\approx 3.14159$.
• **Radius ($r$):** Center se boundary tak ki doori ko radius ($r$) kehte hain. Diameter $d = 2r$.
• **Example:** Agar radius $r = 7\\text{ cm}$ ho, toh $\\text{Area} = \\frac{22}{7} \\times 7^2 = 154\\text{ cm}^2$.`;
  }

  // 7. Physics: Speed of Light & Sound
  if (lower.includes("speed of light") || lower.includes("roshni ki raftar") || lower.includes("प्रकाश की गति")) {
    return `**Answer:** Vacuum mein Speed of Light **$c = 3 \\times 10^8\\text{ m/s}$** (lagbhag $3,00,000\\text{ km/s}$) hoti hai.

**Explain:**

• **Universal Constant:** Albert Einstein ki theory ($E=mc^2$) ke mutabiq universe mein koi bhi cheez light se tez travel nahi kar sakti.
• **Sunlight Time:** Suraj ki roshni ko Zameen (Earth) tak pahunchne mein lagbhag 8 minute 20 second lagte hain.`;
  }

  if (lower.includes("speed of sound") || lower.includes("sound speed") || lower.includes("awaz ki raftar")) {
    return `**Answer:** Normal air temperature ($20^\\circ\\text{C}$) par Speed of Sound lagbhag **$343\\text{ m/s}$ ($1235\\text{ km/h}$)** hoti hai.

**Explain:**

• **Medium Dependency:** Sound ko travel karne ke liye medium chahiye hota hai (Vacuum mein sound travel nahi karti).
• **Solids vs Air:** Sound Solids mein sabse fast (Steel mein ~5960 m/s), paani mein moderate (~1480 m/s), aur hawa mein sabse slow chalti hai.`;
  }

  // 8. Physics: Newton's Laws & Gravity
  if (lower.includes("newton") || lower.includes("gravity") || lower.includes("force") || lower.includes("f=ma")) {
    return `**Answer:** Newton ka Second Law of Motion kehta hai ki **Force = Mass × Acceleration** ($F = m \\cdot a$), aur Law of Gravitation **$F = G \\frac{m_1 m_2}{r^2}$** hai.

**Explain:**

• **First Law (Inertia):** Har object rest ya uniform motion mein rehti hai jab tak koi external force na lage.
• **Second Law ($F=ma$):** Force lagane se acceleration paida hoti hai jo mass ke inversely proportional hoti hai.
• **Third Law:** Every action has an equal and opposite reaction (Har amal ka barabar radd-e-amal hota hai).`;
  }

  // 9. Physics: Ohm's Law & Electricity
  if (lower.includes("ohm") || lower.includes("voltage") || lower.includes("current") || lower.includes("resistance") || lower.includes("v=ir")) {
    return `**Answer:** Ohm's Law states that electric current is directly proportional to voltage across two points: **V = I × R**.

**Explain:**

• **Formula Variables:** $V$ = Voltage (Volts), $I$ = Current (Amperes), $R$ = Resistance (Ohms $\\Omega$).
• **Concept:** Agar resistance badhai jaye to current kam ho jata hai ($I = V/R$).
• **Daily Example:** Fan ke regulator se resistance adjust karke speed control ki jaati hai.`;
  }

  // 10. Biology: Photosynthesis
  if (lower.includes("photosynthesis") || lower.includes("plants food") || lower.includes("ضیائی") || lower.includes("प्रकाश संश्लेषण")) {
    return `**Answer:** Photosynthesis woh biological process hai jisme green plants sunlight, water ($H_2O$) aur carbon dioxide ($CO_2$) se glucose ($C_6H_{12}O_6$) aur oxygen ($O_2$) banate hain.

**Explain:**

• **Chemical Equation:** $6CO_2 + 6H_2O + \\text{Sunlight} \\xrightarrow{\\text{Chlorophyll}} C_6H_{12}O_6 + 6O_2$.
• **Chlorophyll:** Patto mein maujood chlorophyll pigment solar energy ko trap karta hai.
• **Importance:** Yeh poori dunya ke liye oxygen supply aur food chain ka bunyadi source hai.`;
  }

  // 11. Biology: Cell & Mitochondria & DNA
  if (lower.includes("cell") || lower.includes("mitochondria") || lower.includes("powerhouse") || lower.includes("khaliya")) {
    return `**Answer:** Cell jandar cheezon ki bunyadi structure aur functional unit hai, aur **Mitochondria** ko "Powerhouse of the Cell" kaha jata hai.

**Explain:**

• **ATP Generation:** Mitochondria cellular respiration ke zariye energy currency (ATP - Adenosine Triphosphate) generate karta hai.
• **Nucleus:** Cell ka "Master Control Center" hota hai jisme genetic information (DNA) mehfooz hoti hai.
• **Cell Membrane:** Cell ke andar aur bahar material ke flow ko control karti hai.`;
  }

  if (lower.includes("dna") || lower.includes("rna") || lower.includes("genes") || lower.includes("genetics")) {
    return `**Answer:** DNA ka full form **Deoxyribonucleic Acid** hai, jo insaan aur tamam jandaron ke genetic code aur wirasat (heredity) ko carry karta hai.

**Explain:**

• **Double Helix:** DNA James Watson aur Francis Crick ke mutabiq double helix (twisted ladder) shape mein hota hai.
• **4 Bases:** Isme 4 chemical bases hote hain: Adenine ($A$), Thymine ($T$), Guanine ($G$), aur Cytosine ($C$).
• **Function:** Yeh cell ko body banane aur operate karne ke protein manufacturing instructions deta hai.`;
  }

  // 12. Civil Court & Law: Stay Order / CPC Order 39
  if (lower.includes("stay") || lower.includes("order 39") || lower.includes("injunction") || lower.includes("civil court") || lower.includes("سٹے") || lower.includes("cpc")) {
    return `**Answer:** Civil Court mein temporary stay order hasil karne ke liye Civil Procedure Code (CPC) ke **Order 39 Rule 1 & 2** ke tehat application file ki jaati hai.

**Explain:**

• **3 Golden Principles:** Court stay tab grant karti hai jab (1) Prima Facie Case, (2) Balance of Convenience, aur (3) Irreparable Injury prove ho.
• **Required Documents:** Khata/Jamabandi, Registry Sale Deed, Site Map aur sworn affidavit lagana lazmi hai.
• **Urgent Relief:** Emergency mein Section 151 CPC ke sath ad-interim ex-parte stay request kiya jata hai.`;
  }

  // 13. Computer Science: RAM, CPU, ROM, OS
  if (lower.includes("cpu") || lower.includes("processor") || lower.includes("brain of computer")) {
    return `**Answer:** CPU (Central Processing Unit) computer ka "Brain" kehlata hai jo tamam mathematical aur logical calculations execute karta hai.

**Explain:**

• **Main Components:** ALU (Arithmetic Logic Unit), CU (Control Unit), aur Registers.
• **Clock Speed:** CPU ki speed Gigahertz (GHz) mein measure hoti hai (e.g. 3.5 GHz).
• **Function:** Yeh fetch, decode aur execute cycle ke zariye instructions perform karta hai.`;
  }

  if (lower.includes("ram") || lower.includes("rom") || lower.includes("memory")) {
    return `**Answer:** RAM (Random Access Memory) temporary/volatile memory hai jabki ROM (Read Only Memory) permanent non-volatile memory hai.

**Explain:**

• **RAM:** Computer on rehte waqt active apps ka data store karti hai; band hote hi data clear ho jata hai.
• **ROM:** Isme computer ko boot karne ke zaroori firmware/BIOS instructions hamesha store rehte hain.
• **Speed:** RAM speed mein storage hard drive/SSD se bohot tez hoti hai.`;
  }

  // 14. Biology: Human Organs (Heart, Brain, Kidneys, Lungs, Blood)
  if (lower.includes("heart") || lower.includes("dil") || lower.includes("دل") || lower.includes("हृदय")) {
    return `**Answer:** Human Heart (Dil) ek muscular pumping organ hai jo pure jism (body) mein blood aur oxygen pump karta hai.

**Explain:**

• **4 Chambers:** Dil ke 4 khane (chambers) hote hain — Upar do Atria (Right & Left Atrium) aur neeche do Ventricles (Right & Left Ventricle).
• **Heart Rate:** Healthy adult ka dil aam tor par 1 minute mein 72 times dharakta hai.
• **Function:** Deoxygenated blood ko lungs mein bhej kar oxygenate karwata hai aur phir pure body mein supply karta hai.`;
  }

  if (lower.includes("kidney") || lower.includes("gurde") || lower.includes("گردے") || lower.includes("गुर्दा") || lower.includes("nephron")) {
    return `**Answer:** Kidneys (Gurde) body ka filtration plant hain jo khoon se waste materials aur toxic urine ko filter karte hain.

**Explain:**

• **Functional Unit:** Gurde ki basic functional unit ko **Nephron** kehte hain (har kidney mein ~10 lakh nephrons hote hain).
• **Osmoregulation:** Yeh body mein water balance, salt balance aur blood pressure maintain karti hain.
• **Dialysis:** Jab dono gurde fail ho jayein toh artificial filtration ke liye dialysis ka procedure use hota hai.`;
  }

  if (lower.includes("blood") || lower.includes("khoon") || lower.includes("خون") || lower.includes("रक्त") || lower.includes("hemoglobin")) {
    return `**Answer:** Blood ek liquid connective tissue hai jisme Plasma, Red Blood Cells (RBC), White Blood Cells (WBC), aur Platelets hote hain.

**Explain:**

• **RBC (Red Blood Cells):** Inme **Hemoglobin** protein hota hai jo lungs se oxygen body cells tak le jata hai aur khoon ko red color deta hai.
• **WBC (White Blood Cells):** Yeh body ke "Soldiers" hain jo infections aur bimariyon ke khilaf ladte hain.
• **Platelets:** Chot lagne par blood clotting (khoon jamana) mein madad karte hain taaki zyada khoon na bahe.`;
  }

  // 15. Chemistry: Periodic Table & Acids/Bases
  if (lower.includes("periodic table") || lower.includes("dori jadwal") || lower.includes("आवर्त सारणी")) {
    return `**Answer:** Modern Periodic Table Henry Moseley ne develop ki thi jisme elements ko unke **Atomic Number (Z)** ke barhte huye order mein arrange kiya gaya hai.

**Explain:**

• **Structure:** Isme **18 Groups** (vertical columns) aur **7 Periods** (horizontal rows) hote hain.
• **Total Elements:** Abhi tak total **118 Elements** discover ho chuke hain (Element 1 = Hydrogen, Element 118 = Oganesson).
• **Classification:** Elements ko Metals, Non-metals, Metalloids aur Noble Gases mein divide kiya gaya hai.`;
  }

  if (lower.includes("acid") || lower.includes("base") || lower.includes("ph scale") || lower.includes("litmus") || lower.includes("تیزاب")) {
    return `**Answer:** Acids swad mein sour (khatte) hote hain aur Blue litmus ko Red karte hain (pH < 7), jabki Bases bitter (kadwe) hote hain aur Red litmus ko Blue karte hain (pH > 7).

**Explain:**

• **pH Scale (0 to 14):** pH 7 neutral hota hai (Pure Water). 0 se 6.9 tak Acidic, aur 7.1 se 14 tak Basic (Alkaline) hota hai.
• **Neutralization:** Acid + Base mil kar Salt aur Water banate hain ($HCl + NaOH \\to NaCl + H_2O$).
• **Everyday Examples:** Lemon/Vinegar (Acidic), Soap/Baking Soda (Basic).`;
  }

  // 16. Geography: Continents, Oceans & Mountains
  if (lower.includes("continent") || lower.includes("azam") || lower.includes("براعظم") || lower.includes("महाद्वीप")) {
    return `**Answer:** Dunya mein total **7 Continents (Bar-e-Azam)** hain: Asia, Africa, North America, South America, Antarctica, Europe, aur Australia (Oceania).

**Explain:**

• **Largest Continent:** **Asia** dunya ka sabse bada continent hai (Area aur Population dono mein).
• **Smallest Continent:** **Australia** sabse chota continent hai.
• **Oceans:** Dunya mein 5 bade samundar (Oceans) hain, jisme **Pacific Ocean (Bahr-e-Kahin)** sabse bada aur gehra ocean hai.`;
  }

  if (lower.includes("mount everest") || lower.includes("k2") || lower.includes("highest mountain") || lower.includes("himalaya")) {
    return `**Answer:** Dunya ki sabse unchi pahaari choti **Mount Everest (8,848.86 meters / 29,032 ft)** hai jo Himalayas (Nepal-Tibet border) par waqay hai.

**Explain:**

• **Second Highest:** **K2 (Godwin-Austen)** 8,611 meters ke sath dunya ki doosri sabse unchi choti hai jo Pakistan (Karakoram range) mein hai.
• **Third Highest:** Kangchenjunga (8,586 meters) jo India aur Nepal border par hai.`;
  }

  // 17. Complete Step-by-Step Mathematics & Arithmetic Engine (Handles 150*5, percentages, equations)
  const percentMatch = query.match(/(\d+(?:\.\d+)?)\s*%\s*(?:of|ka|ki|mein se)?\s*(\d+(?:\.\d+)?)/i);
  if (percentMatch) {
    const rate = parseFloat(percentMatch[1]);
    const total = parseFloat(percentMatch[2]);
    const ans = (rate * total) / 100;
    return `**Answer:** **${rate}% of ${total} = ${ans}**

**Step-by-Step Calculation:**

1. **Given Expression:** \`${rate}% of ${total}\`
2. **Formula:** \`Percentage = (Rate / 100) × Total Amount\`
3. **Step 1:** \`(${rate} ÷ 100) = ${rate / 100}\`
4. **Step 2:** \`${rate / 100} × ${total} = ${ans}\`
5. **Final Result:** **${ans}**

• **Scoring / Math Tip:** Exam mein formula \`P = (R/100) × Base\` pehle likhein taake step-marking ke poore marks milein.`;
  }

  const mathMatch = query.match(/(\d+(?:\.\d+)?)\s*([\+\-\*\/xX÷])\s*(\d+(?:\.\d+)?)/);
  if (mathMatch) {
    const num1 = parseFloat(mathMatch[1]);
    const rawOp = mathMatch[2];
    const num2 = parseFloat(mathMatch[3]);
    let result = 0;
    let opSymbol = rawOp;
    let opName = "Multiplication";
    let stepBreakdown = "";

    if (rawOp === "+") {
      result = num1 + num2;
      opSymbol = "+";
      opName = "Addition (Jama)";
      stepBreakdown = `• Step 1: Base number = ${num1}\n• Step 2: Add ${num2}\n• Step 3: ${num1} + ${num2} = **${result}**`;
    } else if (rawOp === "-") {
      result = num1 - num2;
      opSymbol = "-";
      opName = "Subtraction (Tafreeq)";
      stepBreakdown = `• Step 1: Starting value = ${num1}\n• Step 2: Subtract ${num2}\n• Step 3: ${num1} - ${num2} = **${result}**`;
    } else if (rawOp === "*" || rawOp.toLowerCase() === "x") {
      result = num1 * num2;
      opSymbol = "×";
      opName = "Multiplication (Zarb)";
      if (num1 >= 10 && num2 < 10) {
        const tens = Math.floor(num1 / 10) * 10;
        const units = num1 % 10;
        stepBreakdown = `• Step 1: Break ${num1} into (${tens} + ${units})\n• Step 2: (${tens} × ${num2}) = ${tens * num2}\n• Step 3: (${units} × ${num2}) = ${units * num2}\n• Step 4: Add parts = ${tens * num2} + ${units * num2} = **${result}**`;
      } else {
        stepBreakdown = `• Step 1: First multiplier = ${num1}\n• Step 2: Second multiplier = ${num2}\n• Step 3: ${num1} × ${num2} = **${result}**`;
      }
    } else if (rawOp === "/" || rawOp === "÷") {
      result = num2 !== 0 ? num1 / num2 : NaN;
      opSymbol = "÷";
      opName = "Division (Taqseem)";
      if (num2 === 0) {
        stepBreakdown = `• Division by zero is undefined (Ghair-wazeh).`;
      } else {
        const remainder = num1 % num2;
        stepBreakdown = `• Step 1: Dividend = ${num1}, Divisor = ${num2}\n• Step 2: Quotient = ${Math.floor(result)}${remainder !== 0 ? `, Remainder = ${remainder}` : ""}\n• Step 3: ${num1} ÷ ${num2} = **${result}**`;
      }
    }

    return `**Answer:** **${num1} ${opSymbol} ${num2} = ${result}**

**Step-by-Step Calculation:**

1. **Given Expression:** \`${num1} ${opSymbol} ${num2}\`
2. **Operation:** ${opName}
3. **Calculation Steps:**
${stepBreakdown}
4. **Final Calculated Value:** **${result}**

• **Scoring / Math Tip:** Hamesha rough column mein calculation double-check karein aur final answer ko box ya bold karein.`;
  }

  // 17.5 Daily Study Routine / Timetable / Schedule (ChatGPT style direct actionable guide)
  if (
    lower.includes("timetable") ||
    lower.includes("time table") ||
    lower.includes("daily routine") ||
    lower.includes("study schedule") ||
    lower.includes("padhai ka routine") ||
    lower.includes("daily plan")
  ) {
    return `### 📅 Perfect Daily Study & Productivity Timetable (Topper's Schedule)

Yeh ek scientific aur balanced **Daily Study Timetable** hai jo dimagh par bina stress dale 100% focus aur high scores deta hai:

---

#### 🌅 Morning Slot (Deep Focus - Toughest Subjects)
* **06:00 AM – 06:30 AM:** Uthna, Fresh hona, halki walk ya namaz/meditation.
* **06:30 AM – 08:30 AM (Slot 1 - 2 Hours):** **Maths ya Physics** (Subah dimagh sabse tez hota hai, formulas aur calculations karein).
* **08:30 AM – 09:15 AM:** Healthy Nashta (Breakfast) aur school/college/work prep.

#### 🏫 Daytime Slot (Classes & Active Learning)
* **09:15 AM – 03:30 PM:** School / College / Self-Study Classes (Class mein active notes banayein).
* **03:30 PM – 04:30 PM:** Lunch, Power Nap (20 mins aaram) aur phone se break.

#### ⚡ Afternoon Slot (Problem Solving & Assignments)
* **04:30 PM – 06:30 PM (Slot 2 - 2 Hours):** **Chemistry / Coding / Legal Sections / Numerical Problems**.
* **06:30 PM – 07:15 PM:** Evening Walk, Chai break, family time ya outdoor sports.

#### 🌙 Evening & Night Slot (Revision & Memorization)
* **07:15 PM – 09:15 PM (Slot 3 - 2 Hours):** **Biology / History / English / Theory subjects** (Likh kar yaad karein).
* **09:15 PM – 10:00 PM:** Dinner (Halka khana).
* **10:00 PM – 10:45 PM (Daily Golden Review):** Din bhar jo padha uska **15-minute quick revision** aur agle din ka target plan.
* **11:00 PM:** Lights off (Kam az kam 7 ghante ki behtareen neend).

---

#### 💡 3 Golden Rules:
1. **Pomodoro Rule:** Har 50 minute padhai ke baad 10 minute ka aankhon ko aaram dein.
2. **Active Recall:** Sirf padhein mat, aankhein band karke khud ko samjhayein.
3. **No Phone Zone:** Padhai ke time mobile doosre kamre mein silent par rakhein.`;
  }

  // 18. Kashmir, Places & Comprehensive Regional Knowledge
  if (
    lower.includes("kashmir") ||
    lower.includes("anantnag") ||
    lower.includes("pahalgam") ||
    lower.includes("gulmarg") ||
    lower.includes("sonamarg") ||
    lower.includes("srinagar") ||
    lower.includes("doodhpathri") ||
    lower.includes("yusmarg") ||
    lower.includes("dal lake") ||
    lower.includes("jhelum") ||
    lower.includes("verinag") ||
    lower.includes("kokernag") ||
    lower.includes("achabal") ||
    lower.includes("pampore") ||
    lower.includes("chillai kalan") ||
    lower.includes("کشمیر")
  ) {
    if (lower.includes("anantnag") && (lower.includes("village") || lower.includes("gaon") || lower.includes("گاؤں") || lower.includes("tehsil"))) {
      return `### 🏔️ District Anantnag (Islamabad) – Complete Overview

**Anantnag** Jammu & Kashmir ki Valley ka sabse ahem aur tareekhi South Kashmir district hai:

* **Tehsils & Administration:** Anantnag mein **8 Major Tehsils** hain (Anantnag, Bijbehara, Dooru, Kokernag, Pahalgam, Shangus, Qazigund, aur Saller).
* **Villages (Gaon):** District mein taqreeban **380+ Census Villages** aate hain.
* **Famous Springs (Nag):** 
  - **Verinag:** River Jhelum ka asal origin aur Mughal Garden.
  - **Kokernag:** Asia ka sabse bada Trout fish farm aur Botanical Garden.
  - **Achabal:** Mughal Garden jo Noor Jahan ne banwaya tha.
* **Economy:** Apples, Walnuts (Akhrot), Trout fish, aur Willow Cricket Bats ka sabse bada markaz (Bijbehara/Sangam belt).`;
    }

    return `### 🌸 Kashmir (Paradise on Earth) – Complete Guide & Famous Places

Kashmir dunya bhar mein apni be-misaal qudrati khoobsurti, pahaaron, daryaaon aur meethay chashmon ke liye mashhoor hai:

---

#### 1. Top World-Famous Tourist Destinations:
* **Gulmarg (Meadow of Flowers):** Asia ki sabse unchi Gondola (Cable Car), Skiing resort aur unche snow-covered peaks.
* **Pahalgam (Valley of Shepherds):** Lidder River, Betaab Valley, Aru Valley, aur pine trees ke ghanay jungle.
* **Sonamarg (Meadow of Gold):** Sindh River aur mashhoor Thajiwas Glacier.
* **Srinagar (Heart of Kashmir):** World-famous **Dal Lake (Shikara & Houseboats)**, Mughal Gardens (Shalimar, Nishat, Chashme Shahi) aur Asia ka sabse bada Tulip Garden.
* **Doodhpathri & Yusmarg:** Meadow of Milk aur serene green pine landscapes.

---

#### 2. Key Cultural & Agricultural Wealth:
* **Pampore Saffron (Zafraan):** Dunya ka sabse behtareen saffron (Kashmiri Kesar) Pampore ke karewas par ughta hai.
* **River Jhelum (Vyeth):** Verinag spring se shuru hokar poori Valley ko sairab karta hai.
* **Handicrafts:** Pashmina shawls, Silk carpets, Papier-mâché, aur Walnut wood carving.
* **Seasons:** Bahar (Sonth), Garmi (Retkol), Khizan (Harud - golden chinar leaves), aur Shandar Sardi (**Chillai Kalan** - 40 days of deep winter).`;
  }

  // 19. China Muslims / Islam in China / Uyghur / Hui (Direct answer for: "Chaina mia kinia muslman hia", etc.)
  if (
    (lower.includes("china") || lower.includes("chaina") || lower.includes("چائنا") || lower.includes("چین") || lower.includes("चीन")) &&
    (lower.includes("muslim") || lower.includes("muslman") || lower.includes("musalman") || lower.includes("islam") || lower.includes("aabadi") || lower.includes("population") || lower.includes("uyghur") || lower.includes("hui") || lower.includes("مسلمان") || lower.includes("मुसलमान"))
  ) {
    if (isUrdu) {
      return `**Answer:** چین (China) میں مسلمانوں کی کل آبادی تقریباً **2.5 کروڑ سے 3 کروڑ (25 to 30 Million)** ہے، جو چین کی کل آبادی کا تقریباً **1.5% سے 2%** بنتی ہے۔

**Explain:**

• **دو بڑے مسلم گروہ:**
  1. **حوئی مسلمان (Hui Muslims):** یہ چین کی عام مینڈارن چینی زبان بولتے ہیں اور ننگشیا (Ningxia)، گانسو اور پورے چین میں آباد ہیں (تقریباً 1.1 کروڑ)۔
  2. **ایغور مسلمان (Uyghur Muslims):** یہ ترک النسل ہیں اور ان کا آبائی خطہ سنکیانگ (Xinjiang) ہے (تقریباً 1.2 کروڑ)۔
• **دیگر مسلم قومیتیں:** قازق (Kazakh)، کرغیز (Kyrgyz)، ازبک (Uzbek)، تاتار، سالار اور ڈونگ ژیانگ۔
• **مساجد اور تاریخ:** چین میں 39,000 سے زائد مساجد ہیں جن میں سب سے قدیم گوانگژو کی "مسجد ہوائیشنگ" ہے جو صحابی رسول حضرت سعد بن ابی وقاص رضی اللہ عنہ کے دور کی یادگار مانی جاتی ہے۔`;
    } else if (isHindi) {
      return `**Answer:** चीन (China) में मुसलमानों की कुल आबादी लगभग **2.5 करोड़ से 3 करोड़ (25 to 30 Million)** है, जो चीन की कुल जनसंख्या का लगभग **1.5% से 2%** है।

**Explain:**

• **दो मुख्य मुस्लिम समुदाय:**
  1. **हुई मुस्लिम (Hui Muslims):** ये मंदारिन चीनी भाषा बोलते हैं और मुख्य रूप से निंग्ज़िया (Ningxia), गांसु और पूरे चीन में फैले हैं (लगभग 1.1 करोड़)।
  2. **उइगर मुस्लिम (Uyghur Muslims):** ये तुर्क मूल के हैं और इनका मुख्य क्षेत्र शिनजियांग (Xinjiang) है (लगभग 1.2 करोड़)।
• **अन्य मुस्लिम समुदाय:** कज़ाख, किर्गिज़, उज़्बेक, तातार, सालार और डोंगक्सियांग।
• **मस्जिदें:** चीन में 39,000 से अधिक मस्जिदें हैं, जिनमें सबसे प्रसिद्ध ग्वांगझू की ऐतिहासिक 'हुआइशेंग मस्जिद' है।`;
    } else {
      return `**Answer:** China (Chaina) mein Musalmano ki kul aabadi taqreeban **2.5 Crore se 3 Crore (25 to 30 Million)** hai, jo China ki kul aabadi ka lagbhag **1.5% se 2%** banta hai.

**Explain:**

• **Do Bade Muslim Groups:**
  1. **Hui Muslims (حوئی مسلمان):** Yeh Chinese (Mandarin) zaban bolte hain aur Ningxia, Gansu, Qinghai aur pure China mein aabaad hain (taqreeban 1.1 Crore).
  2. **Uyghur Muslims (ایغور مسلمان):** Yeh Turkic nasal se taluq rakhte hain aur unka markaz Xinjiang (سنکیانگ) province hai (taqreeban 1.2 Crore).
• **Digar Muslim Qabail:** Kazakh, Kyrgyz, Uzbek, Tajik, Tatar, Salar, aur Dongxiang.
• **Masajid & Tareekh:** China mein taqreeban 39,000+ Masajid hain, jin mein mashhoor tareekhi "Huaisheng Mosque" (Guangzhou) shaamil hai jo hazrat Sa'd ibn Abi Waqqas (R.A) ke daur se mansoob hai.`;
    }
  }

  // 20. World Muslim Population & Country Demographics
  if (
    (lower.includes("world") || lower.includes("dunya") || lower.includes("global") || lower.includes("duniya") || lower.includes("دنیا")) &&
    (lower.includes("muslim") || lower.includes("muslman") || lower.includes("musalman") || lower.includes("islam") || lower.includes("population") || lower.includes("aabadi") || lower.includes("مسلمان"))
  ) {
    return `**Answer:** Dunya mein Musalmano ki kul aabadi taqreeban **1.9 se 2.0 Billion (190 se 200 Crore)** hai, jo dunya ki kul aabadi ka taqreeban **24% se 25%** banta hai.

**Explain:**

• **Sabse Zyada Muslim Aabadi Wale Top Mumalik:**
  1. **Indonesia:** Taqreeban 24 Crore (Dunya ka sabse bada Muslim aabadi wala mulk)
  2. **Pakistan:** Taqreeban 23.5 Crore
  3. **India:** Taqreeban 21 Crore (3rd largest Muslim population)
  4. **Bangladesh:** Taqreeban 15.5 Crore
  5. **Nigeria:** Taqreeban 11 Crore
• **World's Fastest Growing Religion:** Islam dunya mein sabse tezi se phailne wala deen hai.`;
  }

  // 21. Total World Population & Countries Population
  if (
    lower.includes("world population") ||
    lower.includes("dunya ki aabadi") ||
    lower.includes("duniya ki aabadi") ||
    lower.includes("dunya mein kitne log") ||
    lower.includes("دنیا کی آبادی")
  ) {
    return `**Answer:** Dunya (World) ki kul aabadi taqreeban **8.1 Billion (810 Crore)** se tajawuz kar chuki hai (2026 data).

**Explain:**

• **Top 5 Sabse Badi Aabadi Wale Mulk:**
  1. **India (Bharat):** ~1.43 Billion (143 Crore) - Rank #1
  2. **China:** ~1.41 Billion (141 Crore) - Rank #2
  3. **United States (USA):** ~34 Crore
  4. **Indonesia:** ~28 Crore
  5. **Pakistan:** ~24.5 Crore (Rank #5)
• **Continental Share:** Asia mein dunya ki taqreeban 60% aabadi rehti hai.`;
  }

  // 22. Quranic & Islamic Essentials
  if (
    lower.includes("quran mein kitne") ||
    lower.includes("quran me kitne") ||
    lower.includes("quran kitne") ||
    lower.includes("surah") ||
    lower.includes("para") ||
    lower.includes("قرآن") ||
    lower.includes("سورت")
  ) {
    if (lower.includes("para") || lower.includes("sipara") || lower.includes("juz") || lower.includes("پارے")) {
      return `**Answer:** Quran Majeed mein kul **30 Paare (Juz)** hain.

**Explain:**

• **Pehla Para:** Alif-Laam-Meem (الم) se shuru hota hai.
• **Aakhri Para:** 30wa Para "Amma" (عمّ) kehlata hai jisme chhoti suratein shaamil hain.
• **Tilawat ki Sahoolat:** 30 paaron ki taqseem maah-e-Ramazan mein rozana ek para mukammal karne ke liye behtareen nizam hai.`;
    }
    if (lower.includes("surah") || lower.includes("surat") || lower.includes("سورتیں")) {
      return `**Answer:** Quran Majeed mein kul **114 Suratein** hain.

**Explain:**

• **Makki & Madani:** 86 Suratein Makki hain (jo Hijrat se pehle nazil huin) aur 28 Suratein Madani hain (jo Hijrat ke baad nazil huin).
• **Sabse Badi Surah:** Surah Al-Baqarah (286 Aayaat).
• **Sabse Chhoti Surah:** Surah Al-Kausar (3 Aayaat).
• **Dil-e-Quran:** Surah Yaseen ko Quran ka dil kaha jata hai.`;
    }
    if (lower.includes("aayat") || lower.includes("ayat") || lower.includes("آیات")) {
      return `**Answer:** Quran Majeed mein mashhoor ginti ke mutabiq **6,236 Aayaat** (aam riwayat mein 6,666) hain.

**Explain:**

• **Pehli Nazil Shuda Aayat:** Surah Al-Alaq ki shuruati 5 aayaat ("Iqra bismi Rabbikallazi khalaq").
• **Aakhri Nazil Shuda Aayat:** Surah Al-Ma'idah ki aayat 3 ("Al-yawma akmaltu lakum deenakum").
• **Ruku:** Quran Majeed mein kul 540 Ruku hain.`;
    }
  }

  // 22.1 Namaz (Salah) - 5 Daily Prayers & Rakats (Handles "में कितनी नमाज होते हैं", "din mein kitni namaz hoti hain", "5 namazen", "rakat")
  if (
    lower.includes("namaz") ||
    lower.includes("namazen") ||
    lower.includes("namazain") ||
    lower.includes("نماز") ||
    lower.includes("नमाज") ||
    lower.includes("नमाज़") ||
    lower.includes("salah") ||
    lower.includes("salat")
  ) {
    if (isUrdu || lower.includes("نماز")) {
      return `اسلام میں ہر عاقل و بالغ مسلمان پر دن اور رات (24 گھنٹوں) میں کل **5 وقت کی فرض نمازیں** ادا کرنا لازمی ہے۔

**Answer:** اسلام میں ہر روز کل **5 وقت کی نمازیں** فرض ہیں: **1) فجر، 2) ظہر، 3) عصر، 4) مغرب، اور 5) عشاء**۔

**Explain:**

• **5 نمازوں کے اوقات و تفصیل:**
  1. **فجر (Fajr):** صبح صادق سے طلوع آفتاب سے پہلے (کل 4 رکعت: 2 سنت مؤکدہ، 2 فرض)۔
  2. **ظہر (Zuhr):** دوپہر کو سورج ڈھلنے کے بعد (کل 12 رکعت: 4 سنت، 4 فرض، 2 سنت، 2 نفل)۔
  3. **عصر (Asr):** سہ پہر سورج زرد ہونے سے پہلے (کل 8 رکعت: 4 سنت غیر مؤکدہ، 4 فرض)۔
  4. **مغرب (Maghrib):** غروب آفتاب کے فوراً بعد (کل 7 رکعت: 3 فرض، 2 سنت، 2 نفل)۔
  5. **عشاء (Isha):** رات کے وقت شفق غائب ہونے کے بعد (کل 17 رکعت: 4 سنت، 4 فرض، 2 سنت، 2 نفل، 3 وتر واجب، 2 نفل)۔
• **اہمیت:** نماز دین کا ستون (عماد الدین) ہے اور اسلام کے 5 بنیادی ارکان میں توحید و رسالت کے بعد سب سے اہم رکن ہے۔`;
    } else if (isHindi || lower.includes("नमाज") || lower.includes("नमाज़")) {
      return `इस्लाम में प्रत्येक बालिग मुसलमान पर 24 घंटे में कुल **5 वक्त की फर्ज़ नमाज़ें** पढ़ना अनिवार्य है।

**Answer:** इस्लाम में प्रतिदिन कुल **5 नमाज़ें** पढ़ना अनिवार्य (फ़र्ज़) है: **1) फ़ज्र, 2) ज़ुहर, 3) अस्र, 4) मग़रिब, और 5) इशा**।

**Explain:**

• **5 नमाज़ों के समय और रकात विवरण:**
  1. **फ़ज्र (Fajr):** सुबह सूरज निकलने से पहले (कुल 4 रकात: 2 सुन्नत, 2 फ़र्ज़)।
  2. **ज़ुहर (Zuhr):** दोपहर सूरज ढलने के बाद (कुल 12 रकात: 4 सुन्नत, 4 फ़र्ज़, 2 सुन्नत, 2 नफ़्ल)।
  3. **अस्र (Asr):** शाम को सूर्यास्त से पहले (कुल 8 रकात: 4 सुन्नत, 4 फ़र्ज़)।
  4. **मग़रिब (Maghrib):** सूर्यास्त (शाम) के तुरंत बाद (कुल 7 रकात: 3 फ़र्ज़, 2 सुन्नत, 2 नफ़्ल)।
  5. **इशा (Isha):** रात के समय (कुल 17 रकात: 4 सुन्नत, 4 फ़र्ज़, 2 सुन्नत, 2 नफ़्ल, 3 वित्र वाजिब, 2 नफ़्ल)।
• **धार्मिक महत्व:** नमाज़ इस्लाम के पाँच बुनियादी स्तंभों में से दूसरा सबसे महत्वपूर्ण स्तंभ है।`;
    } else {
      return `Islam mein har musalman par din aur raat (24 ghanton) mein kul **5 Farz Namazein** padhna lazmi hai.

**Answer:** Islam mein rozana kul **5 waqt ki Namaz** farz hoti hai: **1) Fajr, 2) Zuhr, 3) Asr, 4) Maghrib, aur 5) Isha**।

**Explain:**

• **5 Namazon ke Auqaat aur Rakat Details:**
  1. **Fajr (فجر):** Subah suraj nikalne se pehle (Kul 4 Rakat: 2 Sunnat, 2 Farz).
  2. **Zuhr (ظہر):** Dopahar suraj dhalne ke baad (Kul 12 Rakat: 4 Sunnat, 4 Farz, 2 Sunnat, 2 Nafl).
  3. **Asr (عصر):** Teesri dopahar suraj doobne se pehle (Kul 8 Rakat: 4 Sunnat, 4 Farz).
  4. **Maghrib (مغرب):** Suraj guroob hote hi sham ko (Kul 7 Rakat: 3 Farz, 2 Sunnat, 2 Nafl).
  5. **Isha (عشاء):** Raat ke waqt (Kul 17 Rakat: 4 Sunnat, 4 Farz, 2 Sunnat, 2 Nafl, 3 Witr Wajib, 2 Nafl).
• **Islam ka Sutoon:** Namaz deen ka sutoon hai aur Arkan-e-Islam ka doosra sabse ahem rukan hai.`;
    }
  }

  // 22.2 Arkan-e-Islam (5 Pillars of Islam: Kalma, Namaz, Roza, Zakat, Hajj)
  if (
    lower.includes("arkan e islam") ||
    lower.includes("arkaan e islam") ||
    lower.includes("pillars of islam") ||
    lower.includes("islam ke arkan") ||
    lower.includes("islam ke 5") ||
    lower.includes("ارکان اسلام")
  ) {
    return `**Answer:** Islam ke kul **5 Bunyadi Arkan (Pillars of Islam)** hain:

**Explain:**

1. **Shahadah / Kalma (توحید و رسالت):** Allah ko ek manna aur Hazrat Muhammad ﷺ ko Allah ka aakhri Rasool tasleem karna.
2. **Salah / Namaz (نماز):** Rozana 5 waqt ki pabandi ke sath farz namaz ada karna.
3. **Zakat (زکوٰۃ):** Sahab-e-nisab musalman par saalana 2.5% maal ghareebon mein taqseem karna.
4. **Sawm / Roza (روزہ):** Maah-e-Ramazan ke 30 roze rakhna.
5. **Hajj (حج):** Istetat (taqat aur wasail) rakhne wale par zindagi mein ek martaba Baitullah ka Hajj karna.`;
  }

  // 22. Human Brain & Nervous System (Cerebellum, Cerebrum, Medulla, Brainstem, Balance & Coordination)
  if (
    lower.includes("brain") ||
    lower.includes("dimagh") ||
    lower.includes("dimaag") ||
    lower.includes("balance") ||
    lower.includes("coordination") ||
    lower.includes("cerebellum") ||
    lower.includes("cerebrum") ||
    lower.includes("medulla") ||
    lower.includes("دماغ")
  ) {
    if (lower.includes("balance") || lower.includes("coordination") || lower.includes("hissa") || lower.includes("part")) {
      if (isUrdu || lower.includes("دماغ")) {
        return `**Answer:** انسانی دماغ کا **سیریبیلم (Cerebellum / چھوٹا دماغ)** جسم کے توازن (Balance)، پٹھوں کی حرکت اور کوآرڈینیشن (Muscle Coordination) کو کنٹرول کرتا ہے۔

**Explain:**

• **1. سیریبیلم (Cerebellum):** یہ دماغ کے پچھلے نچلے حصے میں واقع ہوتا ہے۔ چلتے وقت، سائیکل چلاتے وقت، ناچتے یا کھڑے ہوتے وقت جسم کے توازن اور پوسچر (Posture) کو یہی سنبھالتا ہے۔
• **2. سیریبرم (Cerebrum):** دماغ کا سب سے بڑا اوپری حصہ جو سوچنے، یادداشت، سیکھنے اور ارادی حرکات (Voluntary actions) کے لیے ذمہ دار ہے۔
• **3. میڈولا اوبلونگاٹا (Medulla Oblongata):** غیر ارادی افعال جیسے سانس لینا، دل کی دھڑکن اور بلڈ پریشر کو کنٹرول کرتا ہے۔
• **4. اندرونی کان (Inner Ear):** دماغ کے سیریبیلم کے ساتھ مل کر اندرونی کان کے ویسٹیبیولر نظام (Vestibular System) سے جسم کے توازن کا سگنل ملتا ہے۔

• **Scoring / Exam Tip:** یاد رکھیں کہ **Cerebellum** کو "Little Brain" بھی کہا جاتا ہے اور الکوحل یا چوٹ لگنے سے سب سے پہلے انسان کا جسمانی توازن بگڑتا ہے۔`;
      } else if (isHindi) {
        return `**Answer:** मानव मस्तिष्क का **सेरिबैलम (Cerebellum / अनुमस्तिष्क)** शरीर के संतुलन (Balance), पोस्चर और मांसपेशियों के समन्वय (Coordination) को नियंत्रित करता है।

**Explain:**

• **1. सेरिबैलम (Cerebellum):** यह मस्तिष्क के पिछले और निचले हिस्से में स्थित होता है। चलना, दौड़ना, साइकिल चलाना और शरीर का संतुलन बनाए रखना इसी का मुख्य कार्य है।
• **2. सेरिब्रम (Cerebrum):** मस्तिष्क का सबसे बड़ा हिस्सा, जो सोचने, याद रखने, सीखने और भावनाओं के लिए जिम्मेदार है।
• **3. मेडुला ऑबलोंगाटा (Medulla Oblongata):** अनैच्छिक क्रियाएं जैसे सांस लेना, हृदय की धड़कन और रक्तचाप को नियंत्रित करता है।

• **Exam Tip:** सेरिबैलम को "छोटा दिमाग" भी कहते हैं, जो मोटर गतिविधियों को सटीक और संतुलित बनाता है।`;
      } else {
        return `**Answer:** Human brain ka **Cerebellum (چھوٹا دماغ)** body ka **Balance, Posture aur Muscle Coordination** maintain karne ke liye zimmedar hota hai.

**Explain:**

• **1. Cerebellum (Little Brain):** Yeh brain ke back aur lower hisse mein hota hai. Walking, running, cycling, dancing ya balance banaye rakhne mein yahi part muscles ko accurately guide karta hai.
• **2. Cerebrum (Forebrain):** Brain ka sabse bada hissa jo thinking, memory, reasoning, language aur voluntary movements ko control karta hai.
• **3. Medulla Oblongata (Hindbrain/Brainstem):** Involuntary actions jaise breathing, heartbeat, digestion aur blood pressure ko regulate karta hai.
• **4. Inner Ear Connection:** Cerebellum inner ear ke *Vestibular system* se mil kar body ka exact balance banata hai.

• **Scoring / Exam Tip:** Board exams ke liye yaad rakhein: **Cerebellum = Balance & Motor Coordination**, **Cerebrum = Intelligence & Memory**, **Medulla = Heartbeat & Breathing**.`;
      }
    }
  }

  // 23. Biology, Immunology & Vaccines (Vaccines, Pathogens, Immune System, Antibodies, Memory Cells)
  if (
    lower.includes("vaccine") ||
    lower.includes("pathogen") ||
    lower.includes("immune system") ||
    lower.includes("immunity") ||
    lower.includes("antibodies") ||
    lower.includes("antigen") ||
    lower.includes("قوت مدافعت") ||
    lower.includes("ویکسین") ||
    lower.includes("جراثیم")
  ) {
    if (isUrdu || lower.includes("ویکسین") || lower.includes("مدافعت")) {
      return `**Answer:** ویکسینز (Vaccines) انسانی مدافعتی نظام (Immune System) کو کسی نقصان دہ جرثومے (Pathogen) سے بغیر بیمار ہوئے لڑنا اور اسے یاد رکھنا سکھاتی ہیں، جس کی بنیاد **میموری بی اور ٹی سیلز (Memory B & T Cells)** پر ہوتی ہے۔

**Explain:**

• **1. کمزور یا مردہ اینٹی جن کا داخلہ:** ویکسین میں وائرس یا بیکٹیریا کا کمزور، مردہ حصہ یا mRNA موجود ہوتا ہے جو بیماری پیدا نہیں کرتا لیکن مدافعتی نظام کو الرٹ کر دیتا ہے۔
• **2. اینٹی باڈیز کی پیداوار (Antibody Response):** جسم کے سفید خلیات (B-Lymphocytes) اس اینٹی جن کے خلاف مخصوص حفاظتی پروٹین یعنی **اینٹی باڈیز (Antibodies)** بناتے ہیں۔
• **3. مدافعتی یادداشت (Immunological Memory):** جنگ جیتنے کے بعد جسم **میموری سیلز (Memory B and T Cells)** محفوظ کر لیتا ہے۔
• **4. مستقبل کا فوری دفاع:** جب اصل خطرناک وائرس جسم پر حملہ کرتا ہے تو میموری سیلز اسے فوراً پہچان کر چند گھنٹوں میں اینٹی باڈیز کا لشکر تیار کر کے بیماری لگنے سے پہلے ہی مار دیتے ہیں۔

• **Scoring / Board Tip:** یاد رکھیں کہ ویکسینیشن **Active Artificial Immunity** فراہم کرتی ہے۔`;
    } else if (isHindi) {
      return `**Answer:** टीके (Vaccines) हमारे इम्यून सिस्टम को किसी रोगाणु (Pathogen) को बिना बीमार किए पहचानना और याद रखना सिखाते हैं। यह प्रक्रिया **इम्यूनोलॉजिकल मेमोरी (Memory B & T Cells)** द्वारा संचालित होती है।

**Explain:**

• **1. सुरक्षित परिचय:** वैक्सीन में रोग पैदा करने वाले वायरस/बैक्टीरिया का कमजोर या मृत रूप होता है, जो नुकसान नहीं पहुंचाता।
• **2. एंटीबॉडी निर्माण:** शरीर के श्वेत रक्त कण (B-Cells) उस रोगाणु के खिलाफ विशिष्ट **एंटीबॉडीज (Antibodies)** तैयार करते हैं।
• **3. मेमोरी सेल्स का निर्माण:** संक्रमण से निपटने के बाद शरीर **मेमोरी सेल्स (Memory B & T Cells)** बना लेता है।
• **4. भविष्य में त्वरित सुरक्षा:** भविष्य में जब वही असली रोगाणु हमला करता है, तो मेमोरी सेल्स उसे तुरंत पहचान कर बीमारी शुरू होने से पहले ही नष्ट कर देते हैं।

• **Exam Tip:** वैक्सीन से शरीर को **Active Acquired Immunity** प्राप्त होती है।`;
    } else {
      return `**Answer:** Vaccines train the immune system to recognize and remember pathogens (viruses or bacteria) by generating **Immunological Memory** through **Memory B-cells and Memory T-cells** without causing the actual disease.

**Explain:**

• **1. Introduction of Harmless Antigen:** The vaccine introduces a weakened, inactivated, or subunit antigen (e.g., spike protein or mRNA) into the body.
• **2. Primary Immune Response:** B-lymphocytes recognize the foreign antigen and produce specific **antibodies** designed to neutralize it.
• **3. Formation of Memory Cells:** After clearing the harmless mimic, a specialized population of **Memory B-cells and Memory T-cells** remains stored in the lymph nodes and spleen for years or a lifetime.
• **4. Secondary Rapid Response:** When the real virulent pathogen attacks in the future, memory cells recognize it instantly and produce massive quantities of antibodies within hours, destroying the pathogen before it can cause illness.

• **Scoring / Exam Tip:** Vaccines confer **Artificial Active Immunity**, and the secondary immune response is much faster and stronger than the primary response.`;
    }
  }

  // 24. Popular Urdu / Hindi Riddles & Paheliyan (Solves "ایک ایسی چیز کیا ہے جو جتنی زیادہ خشک ہوتی ہے، اتنی ہی زیادہ گیلی کرتی ہے؟")
  if (
    lower.includes("خشک ہوتی ہے") ||
    lower.includes("گیلی کرتی ہے") ||
    lower.includes("towel") ||
    lower.includes("tolia") ||
    lower.includes("paheli") ||
    lower.includes("پہیلی") ||
    lower.includes("riddle") ||
    lower.includes("گیلی")
  ) {
    if (
      lower.includes("خشک") && (lower.includes("گیلی") || lower.includes("زیادہ")) ||
      lower.includes("dry") && lower.includes("wet") ||
      lower.includes("khushk") && lower.includes("geeli")
    ) {
      if (isUrdu || lower.includes("خشک")) {
        return `**Answer:** اس مشہور پہیلی کا صحیح جواب **تولیہ (Towel)** ہے۔

**Explain:**

• **وضاحت:** تولیہ جتنا زیادہ آپ کے جسم یا ہاتھوں کا پانی جذب کر کے آپ کو خشک (Dry) کرتا ہے، خود اتنا ہی زیادہ پانی پی کر گیلا (Wet) ہوتا چلا جاتا ہے۔
• **پہیلی کا انداز:** "وہ کیا ہے جو جتنا سکھاتا ہے، خود اتنا ہی بھیگتا ہے؟" = **تولیہ**!`;
      } else if (isHindi) {
        return `**Answer:** इस प्रसिद्ध पहेली का सही उत्तर **तौलिया (Towel)** है।

**Explain:**

• **स्पष्टीकरण:** तौलिया जितना अधिक आपके शरीर को पोंछकर सुखाता (Dry) है, पानी सोखने के कारण वह स्वयं उतना ही अधिक गीला (Wet) होता जाता है।`;
      } else {
        return `**Answer:** Is mashhoor paheli ka sahi jawab **Toliya (Towel)** hai!

**Explain:**

• **Wazahat:** Towel (Toliya) jitna zyada aapke jism aur haathon ko sukha (dry) karta hai, paani absorb karne ki wajah se khud utna hi zyada geela (wet) hota chala jata hai.
• **English Riddle Equivalent:** "What gets wetter the more it dries?" = **A Towel**!`;
      }
    }
  }

  // 25. Photosynthesis & Plant Biology
  if (
    lower.includes("photosynthesis") ||
    lower.includes("shoaee tarkeeb") ||
    lower.includes("ziaee tarkeeb") ||
    lower.includes("ضshake") ||
    lower.includes("ضیائی ترکیب") ||
    lower.includes("प्रकाश संश्लेषण")
  ) {
    return `**Answer:** Photosynthesis (Ziaee Tarkeeb / ضیائی ترکیب) wo qudrati amal hai jisme sabz pauday suraj ki roshni, paani ($H_2O$) aur Carbon Dioxide ($CO_2$) ka istemal karke apna khana (Glucose) banate hain aur Oxygen ($O_2$) kharij karte hain.

**Explain:**

• **Chemical Equation:**
  $$6CO_2 + 6H_2O \\xrightarrow{\\text{Sunlight, Chlorophyll}} C_6H_{12}O_6 + 6O_2$$
• **Key Requirements:** Suraj ki roshni (Sunlight), Chlorophyll (sabz maada), Paani (jadhon se), aur $CO_2$ (hawa se stomata ke zariye).
• **By-product:** Is amal ke nateeje mein Oxygen gas banti hai jo dunya ke tamam jaandaron ke saans lene ke liye zaroori hai.
• **Exam Tip:** Photosynthesis paudhon ke patton mein maujood **Chloroplast** ke andar anjaam pata hai.`;
  }

  // 25.5 Daily Life, Health & Food (Ice cream, Fruits, Water, Sleep, Exercise)
  if (
    lower.includes("ice cream") ||
    lower.includes("icecream") ||
    lower.includes("आइसक्रीम") ||
    lower.includes("آئس کریم")
  ) {
    if (isUrdu || lower.includes("آئس کریم")) {
      return `**Answer:** آئس کریم کھانے سے جسم کو فوری توانائی، کیلشیم اور خوشی ملتی ہے، لیکن زیادہ کھانے سے وزن اور گلے کے مسائل ہو سکتے ہیں۔

**Explain:**

• **1. فائدے (Benefits):**
  - دودھ اور ملائی سے بنی ہونے کی وجہ سے جسم کو **کیلشیم، فاسفورس اور پروٹین** ملتا ہے۔
  - آئس کریم کھانے سے دماغ میں **سیروٹونن اور ڈوپامائن (Happy Hormones)** پیدا ہوتے ہیں جو موڈ خوشگوار بناتے ہیں۔
  - جسم کو فوری گلوکوز اور انرجی حاصل ہوتی ہے۔

• **2. زیادہ کھانے کے نقصانات (Risks):**
  - **شوگر اور کیلوریز:** اس میں چینی کی مقدار زیادہ ہوتی ہے جو شوگر اور موٹاپا بڑھا سکتی ہے۔
  - **گلے کی خرابی / فلو:** زیادہ ٹھنڈی کھانے سے حساس افراد میں گلے میں خراش یا فلو ہو سکتا ہے۔
  - **برین فریز (Brain Freeze):** اچانک تیزی سے ٹھنڈی چیز نگلنے پر سر میں عارضی درد ہوتا ہے۔

• **صحت بخش مشورہ:** ہفتے میں 1-2 بار اعتدال میں کھانا بالکل محفوظ اور لطف اندوز ہے۔`;
    } else if (isHindi || lower.includes("आइसक्रीम")) {
      return `**Answer:** आइसक्रीम खाने से शरीर को तुरंत एनर्जी, कैल्शियम और मूड को खुशी (Dopamine) मिलती है, लेकिन ज्यादा खाने से वजन और सर्दी-गले की समस्या हो सकती है।

**Explain:**

• **1. मुख्य फायदे (Health Benefits):**
  - **पोषक तत्व:** दूध से बनी होने के कारण इसमें **कैल्शियम, फॉस्फोरस और विटामिन** होते हैं जो हड्डियों के लिए अच्छे हैं।
  - **मूड बूस्ट (Mood Uplift):** आइसक्रीम खाने से मस्तिष्क में 'हैप्पी हॉर्मोन' (Serotonin और Dopamine) रिलीज होते हैं जिससे तनाव कम होता है।
  - **तुरंत ऊर्जा:** ग्लूकोज की वजह से शरीर को तुरंत ऊर्जा मिलती है।

• **2. ज्यादा खाने के नुकसान (Side Effects):**
  - **हाई शुगर:** अधिक मात्रा में खाने से वजन बढ़ना (Obesity) और ब्लड शुगर का स्तर बढ़ सकता है।
  - **गले में खराश / जुकाम:** बहुत ठंडी आइसक्रीम तेजी से खाने पर संवेदनशील लोगों में गले का इंफेक्शन या खांसी हो सकती है।
  - **ब्रेन फ्रीज (Brain Freeze):** अत्यधिक ठंडे तापमान के कारण सिर में थोड़ी देर के लिए दर्द महसूस हो सकता है।

• **हेल्थ टिप:** आइसक्रीम को सीमित मात्रा में (हफ्ते में 1-2 बार) खाना सेहत के लिए सुरक्षित और आनंददायक है।`;
    } else {
      return `**Answer:** Ice cream khane se body ko instant energy, calcium aur mood ko fresh/happy feeling (Dopamine) milti hai, lekin zyada khane se sugar aur throat sensitivity ho sakti hai.

**Explain:**

• **1. Fayde (Benefits):**
  - **Calcium & Nutrients:** Milk base hone ki wajah se calcium aur phosphorus milta hai jo bones ke liye useful hai.
  - **Mood Boost:** Isse brain mein *Dopamine* aur *Serotonin* release hote hain jo mood ko khushgawar banate hain.
  - **Instant Energy:** Glucose aur fats instant energy provide karte hain.

• **2. Zyada Khane Ke Asraat:**
  - **High Sugar & Calories:** Roz zyada khane se weight gain aur blood sugar spike ho sakti hai.
  - **Throat Soreness / Cold:** Bohat thandi cheez tezi se khane par gala kharab ya cold ho sakta hai.
  - **Brain Freeze:** Bohat tezi se khane par forehead mein temporary thandak ka jhatka lagta hai.

• **Health Advice:** Normal aur moderate quantity mein khana bilkul safe aur refreshing hai!`;
    }
  }

  // 26. Smart Direct Dynamic Knowledge & Academic Responder
  const cleanQ = query.replace(/[?؟\.\!]/g, "").trim();

  // Safe simple arithmetic evaluator (e.g. 15 * 12, 100 / 4, 45 + 55, 90 - 30)
  const arithmeticMatch = cleanQ.match(/^(\d+(?:\.\d+)?)\s*([\+\-\*\/xX÷])\s*(\d+(?:\.\d+)?)$/);
  if (arithmeticMatch) {
    const num1 = parseFloat(arithmeticMatch[1]);
    const op = arithmeticMatch[2].toLowerCase();
    const num2 = parseFloat(arithmeticMatch[3]);
    let result = 0;
    let opSymbol = op;
    if (op === "+" ) result = num1 + num2;
    else if (op === "-") result = num1 - num2;
    else if (op === "*" || op === "x") { result = num1 * num2; opSymbol = "×"; }
    else if (op === "/" || op === "÷") { result = num2 !== 0 ? num1 / num2 : 0; opSymbol = "÷"; }

    return `**Answer:** **${num1} ${opSymbol} ${num2} = ${Number.isInteger(result) ? result : result.toFixed(2)}**

**Explain:**
• **Step 1:** Given expression is ${num1} ${opSymbol} ${num2}.
• **Step 2:** Direct calculation yields **${Number.isInteger(result) ? result : result.toFixed(2)}**.
• **Math Exam Tip:** In multi-step questions, always follow the BODMAS / PEMDAS sequence (Brackets, Orders, Division, Multiplication, Addition, Subtraction).`;
  }

  if (isUrdu) {
    return `**Answer:** سوال **"${cleanQ}"** کے لیے جامع تعلیمی رہنمائی:

**Explain:**
• **بنیادی نکتہ:** اس موضوع کے بنیادی تصورات اور اصولوں کو درسی نقطہ نظر سے سمجھنا انتہائی مفید ہے۔
• **اہم تفصیلات:** آپ اوپر دی گئی **"5-Min Cheat Sheet"** یا **"Formula Bank"** کا استعمال کر کے فوری مستند نوٹس اور تفصیلی حل بھی حاصل کر سکتے ہیں۔
• **امتحانی رہنمائی:** امتحان میں اس سوال کے جواب کے لیے تعریف، اہم خصوصیات، اور مثالوں کو ہیڈنگز کے ساتھ درج کریں۔`;
  } else if (isHindi) {
    return `**Answer:** प्रश्न **"${cleanQ}"** के लिए शैक्षणिक मार्गदर्शन:

**Explain:**
• **मूल अवधारणा:** इस विषय के मुख्य नियमों और सिद्धांतों को व्यवस्थित रूप से तैयार करें।
• **महत्वपूर्ण सुझाव:** विस्तृत और ताजा जानकारी के लिए आप ऊपर **"5-Min Cheat Sheet"** या **"Formula Bank"** टूल का भी उपयोग कर सकते हैं।
• **परीक्षा युक्ति:** सटीक उत्तर के लिए मुख्य परिभाषाओं को रेखांकित करें और उत्तर को बिंदुवार (bullet points) प्रस्तुत करें।`;
  }

  // Math / Incomplete Formula Clarification Handler (e.g. "A₹R= slove", "A=r solve")
  if (/^[a-zA-Z0-9\s\+\-\*\/\=\^\(\)\.₹\$]+(?:slove|solve)?$/i.test(query) && /[\=\+\-\*\/\^]/.test(query)) {
    return `**Answer:** **Maths Equation / Formula Clarification:**
Aapne **"${cleanQ}"** likha hai jo ek adhura (incomplete) math sawal ya formula lagta hai.

**Explain:**
• **Area of Circle ($A = \\pi r^2$):** Agar aap circle ka area nikalna chahte hain, to radius $r$ ki value likhein (e.g., *"Find area when r = 7"*).
• **Simple Interest ($A = P(1 + rt)$):** Agar interest calculate karna hai to Principal ($P$), Rate ($r$) aur Time ($t$) provide karein.
• **Step-by-Step Solving:** Kisi bhi algebra ya math equation ko solve karne ke liye poori statement likhein (jaise: $2x + 6 = 18$), ya phir app ke **"Math & Formulas"** tab mein calculator use karein!`;
  }

  // Kashmir tea timings & culture
  if ((lower.includes("kashmir") || lower.includes("कश्मीर") || lower.includes("کشمیر")) && (lower.includes("chai") || lower.includes("tea") || lower.includes("चाय") || lower.includes("چائے") || lower.includes("kahwa") || lower.includes("noon"))) {
    if (isHindi || /[\u0900-\u097F]/.test(query)) {
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
    } else if (isUrdu || /[\u0600-\u06FF]/.test(query)) {
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

  if (isUrdu || /[\u0600-\u06FF]/.test(query)) {
    return `**Answer:** سوال **"${cleanQ}"** کے متعلق تفصیلی تعلیمی رہنمائی:

**Explain:**
• **بنیادی نکتہ:** اس موضوع کے بنیادی درسی اصول اور حقائق کو اچھے طریقے سے سمجھنا ضروری ہے۔
• **مطالعہ کی سہولت:** اس موضوع سے متعلق مزید تفصیل یا ریاضی فارمولے کے لیے آپ واضح سوال لکھ سکتے ہیں یا **"5-Min Cheat Sheet"** استعمال کر سکتے ہیں۔`;
  } else if (isHindi || /[\u0900-\u097F]/.test(query)) {
    return `**Answer:** प्रश्न **"${cleanQ}"** के संबंध में सटीक अध्ययन मार्गदर्शन:

**Explain:**
• **मुख्य तथ्य:** इस विषय को पाठ्यक्रम और सामान्य ज्ञान के प्रामाणिक संदर्भों के अनुसार समझें।
• **सहायता:** विस्तृत अध्ययन या फॉर्मूलों के लिए आप ऊपर दिए गए **"5-Min Cheat Sheet"** टूल का भी उपयोग कर सकते हैं।`;
  }

  // Hinglish / English Default (Clean & Helpful)
  return `**Answer:** **"${cleanQ}"** ke mutalliq comprehensive study & knowledge guide:

**Explain:**
• **Core Knowledge:** Is topic ke mutalliq factual aur textbook reference ko step-by-step yaad rakhein.
• **Study Assistance:** Kisi bhi specific detail ya formula ke liye aap specific query likh sakte hain ya **"5-Min Cheat Sheet"** use kar sakte hain.`;
}

export async function streamStudyGuru(
  query: string,
  language: string = "hinglish",
  mode: string = "guru",
  onChunk: (accumulatedText: string) => void,
  onDone: (finalText: string, sources?: Array<{ title: string; uri: string }>, isGrounded?: boolean) => void,
  useSearch?: boolean
): Promise<void> {
  let accumulated = "";
  let receivedAnyChunk = false;
  let detectedSources: Array<{ title: string; uri: string }> = [];
  let isGrounded = false;

  const lowerQ = query.toLowerCase().trim();
  const isInstant =
    lowerQ === "hi" ||
    lowerQ === "hii" ||
    lowerQ === "hiii" ||
    lowerQ === "hey" ||
    lowerQ === "heyy" ||
    lowerQ === "hello" ||
    lowerQ === "salam" ||
    lowerQ.includes("assalam") ||
    lowerQ.includes("namaste") ||
    lowerQ.includes("kese ho") ||
    lowerQ.includes("kaise ho") ||
    lowerQ.includes("how are you") ||
    lowerQ.includes("who are you") ||
    lowerQ.includes("owner") ||
    lowerQ.includes("founder") ||
    lowerQ.includes("creator") ||
    lowerQ.includes("shahid") ||
    lowerQ.includes("kisne banaya");

  if (isInstant && !useSearch) {
    const instantAns = getFallbackAnswer(query, language, mode);
    const words = instantAns.split(" ");
    let idx = 0;
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (idx < words.length) {
          accumulated += (idx === 0 ? "" : " ") + words[idx];
          idx++;
          onChunk(accumulated);
        } else {
          clearInterval(interval);
          onDone(accumulated);
          resolve();
        }
      }, 8);
    });
    return;
  }

  const wantsLiveSearch =
    useSearch === true ||
    /\b(google search|search web|live web|search internet)\b/i.test(query);

  // 0. Try Firebase AI Logic Hybrid Inference (On-Device Gemini Nano -> In-Cloud Gemini -> Safe Fallback)
  if (!wantsLiveSearch) {
    try {
      const hybridResult = await tryHybridInferenceStream(query, language, mode, onChunk);
      if (hybridResult.handled && hybridResult.text.trim().length > 10) {
        onDone(hybridResult.text, [], false);
        return;
      }
    } catch {
      // Fall through cleanly to Express /api/chat/stream or Offline Engine
    }
  }

  const isOffline = typeof navigator !== "undefined" && navigator.onLine === false;
  let fullText = "";
  let wikiSources: Array<{ title: string; uri: string }> = [];

  if (!isOffline) {
    // 1. Try Real-Time SSE Stream with reliable 25-second watchdog for mobile networks
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => {
      if (!receivedAnyChunk) {
        try { controller.abort(); } catch {}
      }
    }, 25000) : null;

    let streamReturnedFallback = false;

    try {
      const res = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, language, mode, useSearch }),
        signal: controller ? controller.signal : undefined,
      });

    if (res.ok && res.body) {
      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      let completedNaturally = false;

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          completedNaturally = true;
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;

          const dataContent = trimmed.slice(5).trim();
          if (dataContent === "[DONE]") {
            completedNaturally = true;
            break;
          }

          try {
            const parsed = JSON.parse(dataContent);
            if (parsed.fallback) {
              streamReturnedFallback = true;
              break;
            }
            if (parsed.sources && Array.isArray(parsed.sources)) {
              detectedSources = parsed.sources;
            }
            if (parsed.groundedWithGoogle) {
              isGrounded = true;
            }
            if (parsed.text) {
              receivedAnyChunk = true;
              accumulated += parsed.text;
              onChunk(accumulated);
            }
          } catch {
            // ignore non-json chunk
          }
        }
        if (completedNaturally || streamReturnedFallback) break;
      }

      if (timeoutId) clearTimeout(timeoutId);

      if (!streamReturnedFallback && accumulated.trim().length > 5) {
        onDone(accumulated, detectedSources, isGrounded);
        return;
      }
    }
  } catch {
    if (timeoutId) clearTimeout(timeoutId);
  }

  // 1.5. Direct POST /api/chat Fallback (Ensures full JSON response if cellular network buffered or dropped SSE)
  try {
    const directRes = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, language, mode, useSearch }),
    });
    if (directRes.ok) {
      const data = await directRes.json();
      if (data && data.response && data.response.trim().length > 10 && !data.fallback) {
        onDone(data.response, data.sources, data.groundedWithGoogle);
        return;
      }
    }
  } catch {}

  // 2. Direct Browser Encyclopedia Fallback (Free, instant, verified knowledge with Opensearch)
  try {
    const rawLower = query.toLowerCase().trim();
    let targetDirect: string | null = null;
    if (rawLower.includes("battery") || rawLower.includes("بیٹری") || rawLower.includes("बैटरी")) targetDirect = "Electric battery";
    else if (rawLower.includes("generator") || rawLower.includes("جنریٹر")) targetDirect = "Electric generator";
    else if (rawLower.includes("motor") || rawLower.includes("موٹر")) targetDirect = "Electric motor";
    else if (rawLower.includes("solar") || rawLower.includes("سولر")) targetDirect = "Solar panel";
    else if (rawLower.includes("inverter") || rawLower.includes("انورٹر")) targetDirect = "Power inverter";
    else if (rawLower.includes("transformer") || rawLower.includes("ٹرانسفارمر")) targetDirect = "Transformer";
    else if (rawLower.includes("namaz") || rawLower.includes("namazain") || rawLower.includes("نماز") || rawLower.includes("नमाज") || rawLower.includes("salah")) targetDirect = "Salah";

    let clean = targetDirect || query
      .replace(/\b(?:mujhe|mujhi|mujhko|humko|humri|hamari|hamara|mera|meri|mere|aap|aapko|apna|apni|apne|tum|tumhe|eak|ek|aik|kuch|banani|banao|bana|karo|karna|karenge|chahiye|kaise|kis|tarah|sir|bhai|batao|bataiye|samjhao|explain|define|sikhao|sikhna|kya|ka|ke|ki|ko|se|mein|me|mia|mai|hai|h|hia|hota|hoti|hote|famous|mashhoor|kise|kehte|hain|what|who|where|when|why|how|is|are|the|about|slove|solve|kisne|ne|banaya|tha|thi|the|kab|kahan|kyun|kaun|koun|konsa|kon|sa|kaisi|kisi|kitna|kitne|kitni)\b/gi, " ")
      .replace(/(?:में|कितनी|कितने|कितना|होते|होती|हैं|है|क्या|का|की|के|को|से|पर|और|बारे|बताओ|समझाओ|किए|गए|था|थी|थे|میں|کتنی|کتنے|کتنا|ہوتے|ہوتی|ہیں|ہے|کیا|کا|کی|کے|کو|سے|پر|اور|بارے|بتائیں)/g, " ")
      .replace(/[₹$@#%^&*()_+=[\]{};:"\\|<>,\.?\/؟]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!clean || clean.length < 2) clean = query.replace(/[?؟\.\!]/g, "").trim();

    if (clean && clean.length >= 2) {
      const hasDevanagari = /[\u0900-\u097F]/.test(clean);
      const hasUrduScript = /[\u0600-\u06FF]/.test(clean);
      const wikiLang = hasDevanagari ? "hi" : (hasUrduScript ? "ur" : "en");

      let targetTitle = clean;
      try {
        const openRes = await fetch(`https://${wikiLang}.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(clean)}&limit=3&namespace=0&origin=*&format=json`);
        if (openRes.ok) {
          const openData = await openRes.json();
          if (openData && openData[1] && openData[1].length > 0) {
            targetTitle = openData[1][0];
          }
        }
      } catch {}

      let wikiRes = await fetch(`https://${wikiLang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(targetTitle)}`);
      if (!wikiRes.ok && wikiLang !== "en") {
        try {
          const fbRes = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(clean)}&limit=3&namespace=0&origin=*&format=json`);
          if (fbRes.ok) {
            const fbData = await fbRes.json();
            if (fbData && fbData[1] && fbData[1].length > 0) {
              targetTitle = fbData[1][0];
              wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(targetTitle)}`);
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

          fullText = `${firstSentence}\n\n**Answer:** **${title}**\n${extract}\n\n**Explain:**\n• **Core Concept & Details:** ${extract.slice(0, 240)}...\n• **Academic Importance:** Verified foundational textbook and general knowledge.\n• **Scoring / Exam Tip:** Always state definitions in bold and summarize points cleanly.`;
          wikiSources = [{ title: `Encyclopedia — ${title}`, uri: data.content_urls?.desktop?.page || "https://en.wikipedia.org" }];
        }
      }
    }
  } catch {}
  }

  // 3. Built-in Offline Knowledge Engine fallback
  if (!fullText) {
    fullText = getFallbackAnswer(query, language, mode);
  }

  accumulated = "";
  const words = fullText.split(" ");
  let idx = 0;

  const totalTargetMs = 500;
  const wordDelay = Math.max(3, Math.min(8, Math.floor(totalTargetMs / Math.max(words.length, 1))));

  await new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      if (idx < words.length) {
        accumulated += (idx === 0 ? "" : " ") + words[idx];
        idx++;
        onChunk(accumulated);
      } else {
        clearInterval(interval);
        onDone(accumulated, wikiSources);
        resolve();
      }
    }, wordDelay);
  });
}
