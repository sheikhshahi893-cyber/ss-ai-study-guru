// Authentic Quran Index (114 Surahs with Parah/Juz mapping, Revelation Type, Verses count)
export interface SurahMeta {
  number: number;
  name: string; // Arabic name
  transliteration: string; // English / Urdu phonetic
  urduName: string;
  kashmiriName: string;
  hindiName: string;
  versesCount: number;
  type: "Meccan" | "Medinan";
  juz: number; // Starting Juz
}

export interface AyahItem {
  numberInSurah: number;
  arabic: string;
  kashmiri: string; // Koshur tarjuma (Mirwaiz/Authentic Koshur)
  urdu: string; // Fateh Jalandhari / Tahir ul Qadri
  hindi: string; // Farooq Khan
  english: string; // Saheeh International
  tafseerEasy: {
    kashmiri: string;
    urdu: string;
    english: string;
  };
}

export interface TopicWisdom {
  id: string;
  topicTitle: string;
  kashmiriTitle: string;
  urduTitle: string;
  hindiTitle: string;
  category: "Peace" | "Parents" | "Hardship" | "Knowledge" | "Dua" | "Moral";
  surahReference: string;
  ayahNumber: number;
  arabic: string;
  kashmiri: string;
  urdu: string;
  hindi: string;
  english: string;
  lifeLesson: string;
  kashmiriLesson: string;
}

export const quranSurahList: SurahMeta[] = [
  { number: 1, name: "الفاتحة", transliteration: "Al-Fatihah", urduName: "الفاتحہ (شروع)", kashmiriName: "سورة الفاتحہ", hindiName: "अल-फातिहा (प्रारंभ)", versesCount: 7, type: "Meccan", juz: 1 },
  { number: 2, name: "البقرة", transliteration: "Al-Baqarah", urduName: "البقرہ (گائے)", kashmiriName: "سورة البقرہ (گاؤ)", hindiName: "अल-बक़रा", versesCount: 286, type: "Medinan", juz: 1 },
  { number: 3, name: "آل عمران", transliteration: "Ali 'Imran", urduName: "آل عمران", kashmiriName: "سورة آل عمران", hindiName: "आल-ए-इमरान", versesCount: 200, type: "Medinan", juz: 3 },
  { number: 4, name: "النساء", transliteration: "An-Nisa", urduName: "النساء (عورتیں)", kashmiriName: "سورة النساء (زنانہ)", hindiName: "अन-निसा", versesCount: 176, type: "Medinan", juz: 4 },
  { number: 5, name: "المائدة", transliteration: "Al-Ma'idah", urduName: "المائدہ (دسترخوان)", kashmiriName: "سورة المائدہ", hindiName: "अल-माइदा", versesCount: 120, type: "Medinan", juz: 6 },
  { number: 6, name: "الأنعام", transliteration: "Al-An'am", urduName: "الانعام (مویشی)", kashmiriName: "سورة الانعام", hindiName: "अल-अनाम", versesCount: 165, type: "Meccan", juz: 7 },
  { number: 7, name: "الأعراف", transliteration: "Al-A'raf", urduName: "الاعراف (بلندیاں)", kashmiriName: "سورة الاعراف", hindiName: "अल-अराफ़", versesCount: 206, type: "Meccan", juz: 8 },
  { number: 8, name: "الأنفال", transliteration: "Al-Anfal", urduName: "الانفال (غنیمت)", kashmiriName: "سورة الانفال", hindiName: "अल-अनफाल", versesCount: 75, type: "Medinan", juz: 9 },
  { number: 9, name: "التوبة", transliteration: "At-Tawbah", urduName: "التوبہ (توبہ)", kashmiriName: "سورة التوبہ", hindiName: "अत-तौबा", versesCount: 129, type: "Medinan", juz: 10 },
  { number: 10, name: "يونس", transliteration: "Yunus", urduName: "یونس", kashmiriName: "سورة یونس", hindiName: "यूनुस", versesCount: 109, type: "Meccan", juz: 11 },
  { number: 11, name: "هود", transliteration: "Hud", urduName: "ہود", kashmiriName: "سورة ہود", hindiName: "हूद", versesCount: 123, type: "Meccan", juz: 11 },
  { number: 12, name: "يوسف", transliteration: "Yusuf", urduName: "یوسف", kashmiriName: "سورة یوسف (احسن القصص)", hindiName: "यूसुफ़", versesCount: 111, type: "Meccan", juz: 12 },
  { number: 13, name: "الرعد", transliteration: "Ar-Ra'd", urduName: "الرعد (بجلی کی گرج)", kashmiriName: "سورة الرعد", hindiName: "अर-राद", versesCount: 43, type: "Medinan", juz: 13 },
  { number: 14, name: "إبراهيم", transliteration: "Ibrahim", urduName: "ابراہیم", kashmiriName: "سورة ابراہیم", hindiName: "इब्राहिम", versesCount: 52, type: "Meccan", juz: 13 },
  { number: 15, name: "الحجر", transliteration: "Al-Hijr", urduName: "الحجر (پتھریلی چٹان)", kashmiriName: "سورة الحجر", hindiName: "अल-हिज्र", versesCount: 99, type: "Meccan", juz: 14 },
  { number: 16, name: "النحل", transliteration: "An-Nahl", urduName: "النحل (شہد کی مکھی)", kashmiriName: "سورة النحل (تونبُر)", hindiName: "अन-नहल", versesCount: 128, type: "Meccan", juz: 14 },
  { number: 17, name: "الإسراء", transliteration: "Al-Isra", urduName: "الاسراء (بنی اسرائیل)", kashmiriName: "سورة الاسراء / معراج", hindiName: "अल-इसरा", versesCount: 111, type: "Meccan", juz: 15 },
  { number: 18, name: "الكهف", transliteration: "Al-Kahf", urduName: "الکہف (غار)", kashmiriName: "سورة الکہف (غار)", hindiName: "अल-कहफ़", versesCount: 110, type: "Meccan", juz: 15 },
  { number: 19, name: "مريم", transliteration: "Maryam", urduName: "مریم", kashmiriName: "سورة مریم", hindiName: "मरयम", versesCount: 98, type: "Meccan", juz: 16 },
  { number: 20, name: "طه", transliteration: "Ta-Ha", urduName: "طٰہٰ", kashmiriName: "سورة طٰہٰ", hindiName: "ता-हा", versesCount: 135, type: "Meccan", juz: 16 },
  { number: 21, name: "الأنبياء", transliteration: "Al-Anbiya", urduName: "الانبیاء (پیغمبر)", kashmiriName: "سورة الانبیاء", hindiName: "अल-अंबिया", versesCount: 112, type: "Meccan", juz: 17 },
  { number: 22, name: "الحج", transliteration: "Al-Hajj", urduName: "الحج", kashmiriName: "سورة الحج", hindiName: "अल-हज", versesCount: 78, type: "Medinan", juz: 17 },
  { number: 23, name: "المؤمنون", transliteration: "Al-Mu'minun", urduName: "المؤمنون (اہل ایمان)", kashmiriName: "سورة المؤمنون", hindiName: "अल-मोमिनून", versesCount: 118, type: "Meccan", juz: 18 },
  { number: 24, name: "النور", transliteration: "An-Nur", urduName: "النور (روشنی)", kashmiriName: "سورة النور (گاژ)", hindiName: "अन-नूर", versesCount: 64, type: "Medinan", juz: 18 },
  { number: 25, name: "الفرقان", transliteration: "Al-Furqan", urduName: "الفرقان (حق و باطل کی کسوٹی)", kashmiriName: "سورة الفرقان", hindiName: "अल-फ़ुरक़ान", versesCount: 77, type: "Meccan", juz: 18 },
  { number: 26, name: "الشعراء", transliteration: "Ash-Shu'ara", urduName: "الشعراء (شاعر)", kashmiriName: "سورة الشعراء", hindiName: "अश-शुआरा", versesCount: 227, type: "Meccan", juz: 19 },
  { number: 27, name: "النمل", transliteration: "An-Naml", urduName: "النمل (چیونٹی)", kashmiriName: "سورة النمل (رُیو)", hindiName: "अन-नमल", versesCount: 93, type: "Meccan", juz: 19 },
  { number: 28, name: "القصص", transliteration: "Al-Qasas", urduName: "القصص (واقعات)", kashmiriName: "سورة القصص", hindiName: "अल-क़सस", versesCount: 88, type: "Meccan", juz: 20 },
  { number: 29, name: "العنكبوت", transliteration: "Al-'Ankabut", urduName: "العنکبوت (مکڑی)", kashmiriName: "سورة العنکبوت (زال)", hindiName: "अल-अनकबूत", versesCount: 69, type: "Meccan", juz: 20 },
  { number: 30, name: "الروم", transliteration: "Ar-Rum", urduName: "الروم", kashmiriName: "سورة الروم", hindiName: "अर-रूम", versesCount: 60, type: "Meccan", juz: 21 },
  { number: 31, name: "لقمان", transliteration: "Luqman", urduName: "لقمان (حکمت والے)", kashmiriName: "سورة لقمان (دانا)", hindiName: "लुक़मान", versesCount: 34, type: "Meccan", juz: 21 },
  { number: 32, name: "السجدة", transliteration: "As-Sajdah", urduName: "السجدہ", kashmiriName: "سورة السجدہ", hindiName: "अस-सजदा", versesCount: 30, type: "Meccan", juz: 21 },
  { number: 33, name: "الأحزاب", transliteration: "Al-Ahzab", urduName: "الاحزاب (فوجی گروہ)", kashmiriName: "سورة الاحزاب", hindiName: "अल-अहज़ाब", versesCount: 73, type: "Medinan", juz: 21 },
  { number: 34, name: "سبأ", transliteration: "Saba", urduName: "سبا", kashmiriName: "سورة سبا", hindiName: "सबा", versesCount: 54, type: "Meccan", juz: 22 },
  { number: 35, name: "فاطر", transliteration: "Fatir", urduName: "فاطر (پیدا کرنے والا)", kashmiriName: "سورة فاطر", hindiName: "फ़ातिर", versesCount: 45, type: "Meccan", juz: 22 },
  { number: 36, name: "يس", transliteration: "Ya-Sin", urduName: "یٰسٓ (قلبِ قرآن)", kashmiriName: "سورة یٰسٓ (قرآنُک دِل)", hindiName: "या-सीन (क़ुरआन का दिल)", versesCount: 83, type: "Meccan", juz: 22 },
  { number: 37, name: "الصافات", transliteration: "As-Saffat", urduName: "الصافات (صفیں باندھنے والے)", kashmiriName: "سورة الصافات", hindiName: "अस-साफ़्फ़ात", versesCount: 182, type: "Meccan", juz: 23 },
  { number: 38, name: "ص", transliteration: "Sad", urduName: "صٓ", kashmiriName: "سورة صٓ", hindiName: "साद", versesCount: 88, type: "Meccan", juz: 23 },
  { number: 39, name: "الزمر", transliteration: "Az-Zumar", urduName: "الزمر (گروہ)", kashmiriName: "سورة الزمر", hindiName: "अज़-ज़ुमर", versesCount: 75, type: "Meccan", juz: 23 },
  { number: 40, name: "غافر", transliteration: "Ghafir", urduName: "غافر / المؤمن", kashmiriName: "سورة غافر (بخشن وول)", hindiName: "ग़ाफ़िर", versesCount: 85, type: "Meccan", juz: 24 },
  { number: 41, name: "فصلت", transliteration: "Fussilat", urduName: "فصلت (کھول کر بیان کی گئی)", kashmiriName: "سورة فصلت", hindiName: "फ़ुस्स़िलत", versesCount: 54, type: "Meccan", juz: 24 },
  { number: 42, name: "الشورى", transliteration: "Ash-Shura", urduName: "الشورٰی (مشورہ)", kashmiriName: "سورة الشورٰی (صلاح)", hindiName: "अश-शूरा", versesCount: 53, type: "Meccan", juz: 25 },
  { number: 43, name: "الزخرف", transliteration: "Az-Zukhruf", urduName: "الزخرف (سونے چاندی کے زیور)", kashmiriName: "سورة الزخرف", hindiName: "अज़-ज़ुख़रुफ़", versesCount: 89, type: "Meccan", juz: 25 },
  { number: 44, name: "الدخان", transliteration: "Ad-Dukhan", urduName: "الدخان (دھواں)", kashmiriName: "سورة الدخان (دۄہ)", hindiName: "अद-दुख़ान", versesCount: 59, type: "Meccan", juz: 25 },
  { number: 45, name: "الجاثية", transliteration: "Al-Jathiyah", urduName: "الجاثیہ (گھٹنوں کے بل)", kashmiriName: "سورة الجاثیہ", hindiName: "अल-जासिया", versesCount: 37, type: "Meccan", juz: 25 },
  { number: 46, name: "الأحقاف", transliteration: "Al-Ahqaf", urduName: "الاحقاف (ریت کے ٹیلے)", kashmiriName: "سورة الاحقاف", hindiName: "अल-अहक़ाफ़", versesCount: 35, type: "Meccan", juz: 26 },
  { number: 47, name: "محمد", transliteration: "Muhammad", urduName: "محمد ﷺ", kashmiriName: "سورة محمد ﷺ", hindiName: "मुहम्मद ﷺ", versesCount: 38, type: "Medinan", juz: 26 },
  { number: 48, name: "الفتح", transliteration: "Al-Fath", urduName: "الفتح (کھلی فتح)", kashmiriName: "سورة الفتح (کامیابی)", hindiName: "अल-फ़तह", versesCount: 29, type: "Medinan", juz: 26 },
  { number: 49, name: "الحجرات", transliteration: "Al-Hujurat", urduName: "الحجرات (حجرے / آداب)", kashmiriName: "سورة الحجرات (ادب و اخلاق)", hindiName: "अल-हुजुरात", versesCount: 18, type: "Medinan", juz: 26 },
  { number: 50, name: "ق", transliteration: "Qaf", urduName: "قٓ", kashmiriName: "سورة قٓ", hindiName: "क़ाफ़", versesCount: 45, type: "Meccan", juz: 26 },
  { number: 51, name: "الذاريات", transliteration: "Adh-Dhariyat", urduName: "الذاریات", kashmiriName: "سورة الذاریات", hindiName: "अज़-ज़ारियात", versesCount: 60, type: "Meccan", juz: 26 },
  { number: 52, name: "الطور", transliteration: "At-Tur", urduName: "الطور (کوہِ طور)", kashmiriName: "سورة الطور", hindiName: "अत-तूर", versesCount: 49, type: "Meccan", juz: 27 },
  { number: 53, name: "النجم", transliteration: "An-Najm", urduName: "النجم (ستارہ)", kashmiriName: "سورة النجم (تارُک)", hindiName: "अन-नज्म", versesCount: 62, type: "Meccan", juz: 27 },
  { number: 54, name: "القمر", transliteration: "Al-Qamar", urduName: "القمر (چاند)", kashmiriName: "سورة القمر (زون)", hindiName: "अल-क़मर", versesCount: 55, type: "Meccan", juz: 27 },
  { number: 55, name: "الرحمن", transliteration: "Ar-Rahman", urduName: "الرحمٰن (عروس القرآن)", kashmiriName: "سورة الرحمٰن (قرآنچ دُلھن)", hindiName: "अर-रहमान (असीम कृपाशील)", versesCount: 78, type: "Medinan", juz: 27 },
  { number: 56, name: "الواقعة", transliteration: "Al-Waqi'ah", urduName: "الواقعہ (واقع ہونے والی قیامت)", kashmiriName: "سورة الواقعہ", hindiName: "अल-वाक़िया", versesCount: 96, type: "Meccan", juz: 27 },
  { number: 57, name: "الحديد", transliteration: "Al-Hadid", urduName: "الحدید (لوہا)", kashmiriName: "سورة الحدید (شِشٕر)", hindiName: "अल-हदीद", versesCount: 29, type: "Medinan", juz: 27 },
  { number: 58, name: "المجادلة", transliteration: "Al-Mujadila", urduName: "المجادلہ", kashmiriName: "سورة المجادلہ", hindiName: "अल-मुजादिला", versesCount: 22, type: "Medinan", juz: 28 },
  { number: 59, name: "الحشر", transliteration: "Al-Hashr", urduName: "الحشر (اکٹھا کرنا)", kashmiriName: "سورة الحشر", hindiName: "अल-हश्र", versesCount: 24, type: "Medinan", juz: 28 },
  { number: 60, name: "الممتحنة", transliteration: "Al-Mumtahanah", urduName: "الممتحنہ", kashmiriName: "سورة الممتحنہ", hindiName: "अल-मुमतहना", versesCount: 13, type: "Medinan", juz: 28 },
  { number: 61, name: "الصف", transliteration: "As-Saff", urduName: "الصف (قطار)", kashmiriName: "سورة الصف", hindiName: "अस-सफ़", versesCount: 14, type: "Medinan", juz: 28 },
  { number: 62, name: "الجمعة", transliteration: "Al-Jumu'ah", urduName: "الجمعہ (جمعہ کا دن)", kashmiriName: "سورة الجمعہ (جُمعہ دۄہ)", hindiName: "अल-जुमुआ", versesCount: 11, type: "Medinan", juz: 28 },
  { number: 63, name: "المنافقون", transliteration: "Al-Munafiqun", urduName: "المنافقون (منافق)", kashmiriName: "سورة المنافقون", hindiName: "अल-मुनाफ़िक़ून", versesCount: 11, type: "Medinan", juz: 28 },
  { number: 64, name: "التغابن", transliteration: "At-Taghabun", urduName: "التغابن", kashmiriName: "سورة التغابن", hindiName: "अत-तग़ाबुन", versesCount: 18, type: "Medinan", juz: 28 },
  { number: 65, name: "الطلاق", transliteration: "At-Talaq", urduName: "الطلاق", kashmiriName: "سورة الطلاق", hindiName: "अत-तलाक़", versesCount: 12, type: "Medinan", juz: 28 },
  { number: 66, name: "التحريم", transliteration: "At-Tahrim", urduName: "التحریم", kashmiriName: "سورة التحریم", hindiName: "अत-तहरीम", versesCount: 12, type: "Medinan", juz: 28 },
  { number: 67, name: "الملك", transliteration: "Al-Mulk", urduName: "الملک (بادشاہی / نجات دہندہ)", kashmiriName: "سورة الملک (تبرک الذی)", hindiName: "अल-मुल्क (सुरक्षा देने वाली)", versesCount: 30, type: "Meccan", juz: 29 },
  { number: 68, name: "القلم", transliteration: "Al-Qalam", urduName: "القلم (قلم)", kashmiriName: "سورة القلم (قلم)", hindiName: "अल-क़लम", versesCount: 52, type: "Meccan", juz: 29 },
  { number: 69, name: "الحاقة", transliteration: "Al-Haqqah", urduName: "الحاقہ (سچ مچ ہونے والی)", kashmiriName: "سورة الحاقہ", hindiName: "अल-हाक़्क़ाह", versesCount: 52, type: "Meccan", juz: 29 },
  { number: 70, name: "المعارج", transliteration: "Al-Ma'arij", urduName: "المعارج (عروج کے راستے)", kashmiriName: "سورة المعارج", hindiName: "अल-मआरिज", versesCount: 44, type: "Meccan", juz: 29 },
  { number: 71, name: "نوح", transliteration: "Nuh", urduName: "نوح", kashmiriName: "سورة نوح", hindiName: "नूह", versesCount: 28, type: "Meccan", juz: 29 },
  { number: 72, name: "الجن", transliteration: "Al-Jinn", urduName: "الجن", kashmiriName: "سورة الجن", hindiName: "अल-जिन्न", versesCount: 28, type: "Meccan", juz: 29 },
  { number: 73, name: "المزمل", transliteration: "Al-Muzzammil", urduName: "المزمل (کمبل اوڑھنے والے)", kashmiriName: "سورة المزمل", hindiName: "अल-मुज़्ज़म्मिल", versesCount: 20, type: "Meccan", juz: 29 },
  { number: 74, name: "المدثر", transliteration: "Al-Muddaththir", urduName: "المدثر (چادر اوڑھنے والے)", kashmiriName: "سورة المدثر", hindiName: "अल-मुद्दस्सिर", versesCount: 56, type: "Meccan", juz: 29 },
  { number: 75, name: "القيامة", transliteration: "Al-Qiyamah", urduName: "القیامہ (قیامت)", kashmiriName: "سورة القیامہ (قیامتُک دۄہ)", hindiName: "अल-क़ियामह", versesCount: 40, type: "Meccan", juz: 29 },
  { number: 76, name: "الإنسان", transliteration: "Al-Insan", urduName: "الانسان / الدھر", kashmiriName: "سورة الانسان (انسان)", hindiName: "अल-इंसान", versesCount: 31, type: "Medinan", juz: 29 },
  { number: 77, name: "المرسلات", transliteration: "Al-Mursalat", urduName: "المرسلات (ہوائیں)", kashmiriName: "سورة المرسلات", hindiName: "अल-मुरसलात", versesCount: 50, type: "Meccan", juz: 29 },
  { number: 78, name: "النبأ", transliteration: "An-Naba", urduName: "النباء (بڑی خبر / عمّ)", kashmiriName: "سورة النباء (عمّ یتساءلون)", hindiName: "अन-नबा (अम्मा)", versesCount: 40, type: "Meccan", juz: 30 },
  { number: 79, name: "النازعات", transliteration: "An-Nazi'at", urduName: "النازعات", kashmiriName: "سورة النازعات", hindiName: "अन-नाज़ियात", versesCount: 46, type: "Meccan", juz: 30 },
  { number: 80, name: "عبس", transliteration: "'Abasa", urduName: "عبس (تیوری چڑھائی)", kashmiriName: "سورة عبس", hindiName: "अबासा", versesCount: 42, type: "Meccan", juz: 30 },
  { number: 81, name: "التکوير", transliteration: "At-Takwir", urduName: "التکویر (لپیٹنا)", kashmiriName: "سورة التکویر", hindiName: "अत-तकवीर", versesCount: 29, type: "Meccan", juz: 30 },
  { number: 82, name: "الانفطار", transliteration: "Al-Infitar", urduName: "الانفطار (پھٹ جانا)", kashmiriName: "سورة الانفطار", hindiName: "अल-इन्फ़ितार", versesCount: 19, type: "Meccan", juz: 30 },
  { number: 83, name: "المطففين", transliteration: "Al-Mutaffifin", urduName: "المطففین (ناپ تول میں کمی)", kashmiriName: "سورة المطففین (تولس مَنٛز کمی کرن وٲل)", hindiName: "अल-मुतफ़्फ़िफ़ीन", versesCount: 36, type: "Meccan", juz: 30 },
  { number: 84, name: "الانشقاق", transliteration: "Al-Inshiqaq", urduName: "الانشقاق (ٹکڑے ٹکڑے ہونا)", kashmiriName: "سورة الانشقاق", hindiName: "अल-इन्शिक़ाक़", versesCount: 25, type: "Meccan", juz: 30 },
  { number: 85, name: "البروج", transliteration: "Al-Buruj", urduName: "البروج (قلعے اور ستارے)", kashmiriName: "سورة البروج", hindiName: "अल-बुरुज", versesCount: 22, type: "Meccan", juz: 30 },
  { number: 86, name: "الطارق", transliteration: "At-Tariq", urduName: "الطارق (رات کو چمکنے والا)", kashmiriName: "سورة الطارق (راتُک تارُک)", hindiName: "अत-तारिक़", versesCount: 17, type: "Meccan", juz: 30 },
  { number: 87, name: "الأعلى", transliteration: "Al-A'la", urduName: "الاعلیٰ (سب سے بلند)", kashmiriName: "سورة الاعلیٰ (سبقۄتھ بلند)", hindiName: "अल-आला", versesCount: 19, type: "Meccan", juz: 30 },
  { number: 88, name: "الغاشية", transliteration: "Al-Ghashiyah", urduName: "الغاشیہ (چھا جانے والی)", kashmiriName: "سورة الغاشیہ", hindiName: "अल-ग़ाशिया", versesCount: 26, type: "Meccan", juz: 30 },
  { number: 89, name: "الفجر", transliteration: "Al-Fajr", urduName: "الفجر (صبح)", kashmiriName: "سورة الفجر (صُبح)", hindiName: "अल-फ़ज्र", versesCount: 30, type: "Meccan", juz: 30 },
  { number: 90, name: "البلد", transliteration: "Al-Balad", urduName: "البلد (شہرِ مکہ)", kashmiriName: "سورة البلد (شہر)", hindiName: "अल-बलद", versesCount: 20, type: "Meccan", juz: 30 },
  { number: 91, name: "الشمس", transliteration: "Ash-Shams", urduName: "الشمس (سورج)", kashmiriName: "سورة الشمس (سِری)", hindiName: "अश-शम्स (सूरज)", versesCount: 15, type: "Meccan", juz: 30 },
  { number: 92, name: "الليل", transliteration: "Al-Layl", urduName: "اللیل (رات)", kashmiriName: "سورة اللیل (رات)", hindiName: "अल-लैल (रात)", versesCount: 21, type: "Meccan", juz: 30 },
  { number: 93, name: "الضحى", transliteration: "Ad-Duha", urduName: "الضحٰی (چاشت / روشنی)", kashmiriName: "سورة الضحٰی (چاشتُک وقت)", hindiName: "अद-दुहा", versesCount: 11, type: "Meccan", juz: 30 },
  { number: 94, name: "الشرح", transliteration: "Ash-Sharh", urduName: "الشرح / الم نشرح (کشادہ کرنا)", kashmiriName: "سورة الم نشرح (سینَہ کُھلاون)", hindiName: "अश-शरह", versesCount: 8, type: "Meccan", juz: 30 },
  { number: 95, name: "التين", transliteration: "At-Tin", urduName: "التین (انجیر)", kashmiriName: "سورة التین (انجیر)", hindiName: "अत-तीन", versesCount: 8, type: "Meccan", juz: 30 },
  { number: 96, name: "العلق", transliteration: "Al-'Alaq", urduName: "العلق (پہلی وحی - اقرأ)", kashmiriName: "سورة العلق (اقرأ / گۄڈنیچ وحی)", hindiName: "अल-अलक़ (इक्रा)", versesCount: 19, type: "Meccan", juz: 30 },
  { number: 97, name: "القدر", transliteration: "Al-Qadr", urduName: "القدر (شبِ قدر)", kashmiriName: "سورة القدر (لیلة القدر)", hindiName: "अल-क़द्र (शब-ए-क़द्र)", versesCount: 5, type: "Meccan", juz: 30 },
  { number: 98, name: "البينة", transliteration: "Al-Bayyinah", urduName: "البینہ (واضح دلیل)", kashmiriName: "سورة البینہ", hindiName: "अल-बय्यिना", versesCount: 8, type: "Medinan", juz: 30 },
  { number: 99, name: "الزلزلة", transliteration: "Az-Zalzalah", urduName: "الزلزلہ (زلزلہ)", kashmiriName: "سورة الزلزلہ (بھونکپ)", hindiName: "अज़-ज़लज़ला", versesCount: 8, type: "Medinan", juz: 30 },
  { number: 100, name: "العاديات", transliteration: "Al-'Adiyat", urduName: "العادیات (دوڑنے والے گھوڑے)", kashmiriName: "سورة العادیات (گُر)", hindiName: "अल-आदियात", versesCount: 11, type: "Meccan", juz: 30 },
  { number: 101, name: "القارعة", transliteration: "Al-Qari'ah", urduName: "القارعة (کھڑکھڑانے والی قیامت)", kashmiriName: "سورة القارعة", hindiName: "अल-क़ारिया", versesCount: 11, type: "Meccan", juz: 30 },
  { number: 102, name: "التكاثر", transliteration: "At-Takathur", urduName: "التکاثر (مال کی کثرت کی ہوس)", kashmiriName: "سورة التکاثر (زیادتی ہٕنٛز لالچ)", hindiName: "अत-तकासुर", versesCount: 8, type: "Meccan", juz: 30 },
  { number: 103, name: "العصر", transliteration: "Al-'Asr", urduName: "العصر (زمانہ / وقت کی قسم)", kashmiriName: "سورة العصر (وقت / کالس قَسم)", hindiName: "अल-अस्र (समय की शपथ)", versesCount: 3, type: "Meccan", juz: 30 },
  { number: 104, name: "الهمزة", transliteration: "Al-Humazah", urduName: "الہمزہ (عیب جوئی کرنے والا)", kashmiriName: "سورة الہمزہ (عیب کڈَن وول)", hindiName: "अल-हुमज़ा", versesCount: 9, type: "Meccan", juz: 30 },
  { number: 105, name: "الفيل", transliteration: "Al-Fil", urduName: "الفیل (ہاتھی والے)", kashmiriName: "سورة الفیل (ہستین ہُنٛد قصہ)", hindiName: "अल-फ़ील (हाथी वाले)", versesCount: 5, type: "Meccan", juz: 30 },
  { number: 106, name: "قريش", transliteration: "Quraysh", urduName: "قریش", kashmiriName: "سورة قریش", hindiName: "क़ुरैश", versesCount: 4, type: "Meccan", juz: 30 },
  { number: 107, name: "الماعون", transliteration: "Al-Ma'un", urduName: "الماعون (چھوٹی مدد / برتنے کی چیز)", kashmiriName: "سورة الماعون (عام مدد)", hindiName: "अल-माऊन", versesCount: 7, type: "Meccan", juz: 30 },
  { number: 108, name: "الكوثر", transliteration: "Al-Kawthar", urduName: "الکوثر (حوضِ کوثر / خیر کثیر)", kashmiriName: "سورة الکوثر (خیر کثیر)", hindiName: "अल-कौसर (असीम नेमत)", versesCount: 3, type: "Meccan", juz: 30 },
  { number: 109, name: "الكافرون", transliteration: "Al-Kafirun", urduName: "الکافرون (حق سے انکار کرنے والے)", kashmiriName: "سورة الکافرون", hindiName: "अल-काफ़िरून", versesCount: 6, type: "Meccan", juz: 30 },
  { number: 110, name: "النصر", transliteration: "An-Nasr", urduName: "النصر (اللہ کی مدد)", kashmiriName: "سورة النصر (اللہ سنز مدد)", hindiName: "अन-नस्र (मदद)", versesCount: 3, type: "Medinan", juz: 30 },
  { number: 111, name: "المسد", transliteration: "Al-Masad", urduName: "المسد / تبت یدا (کھجور کی رسی)", kashmiriName: "سورة لہب / المسد", hindiName: "अल-मसद", versesCount: 5, type: "Meccan", juz: 30 },
  { number: 112, name: "الإخلاص", transliteration: "Al-Ikhlas", urduName: "الاخلاص (قل ہو اللہ - توحید)", kashmiriName: "سورة الاخلاص (قل ھو اللہ - توحید)", hindiName: "अल-इख़्लास (सच्ची आस्था)", versesCount: 4, type: "Meccan", juz: 30 },
  { number: 113, name: "الفلق", transliteration: "Al-Falaq", urduName: "الفلق (صبح کا پھٹنا - حفاظت)", kashmiriName: "سورة الفلق (پناہ طلب کرن)", hindiName: "अल-फ़लक़ (सुबह)", versesCount: 5, type: "Meccan", juz: 30 },
  { number: 114, name: "الناس", transliteration: "An-Nas", urduName: "الناس (انسان - حفاظتِ نفس)", kashmiriName: "سورة الناس (انسانن ہُنٛد رب)", hindiName: "अन-नास (मानव जाति)", versesCount: 6, type: "Meccan", juz: 30 }
];

export const sampleSurahsDetailed: Record<number, AyahItem[]> = {
  // Surah Al-Fatihah (Complete 7 Verses)
  1: [
    {
      numberInSurah: 1,
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      kashmiri: "شروع چھُس کران اللہ تبارک و تعالیٰ سٕندِ ناوٕ سٕتۍ، یُس بٔڑس رحم و کرم وول چھُ۔",
      urdu: "شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔",
      hindi: "अल्लाह के नाम से जो अत्यंत कृपाशील, परम दयालु है।",
      english: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
      tafseerEasy: {
        kashmiri: "ہر جٲیز کام شۆروٗع کرنہٕ وِزِ چھُ اللہ تعالٰی ہُنٛد ناو نُن بٔڑس برکتک سبب۔",
        urdu: "ہر اچھے کام کی ابتدا اللہ کے نام سے کرنا اس میں برکت اور حفاظت کا سبب ہے۔",
        english: "Beginning every good deed with the Name of Allah invites divine blessing and mercy."
      }
    },
    {
      numberInSurah: 2,
      arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      kashmiri: "سٲری تعریٖف چھِ اللہ تعالٰی یَس پزَن، یُس تمام جہانَن ہُنٛد پالن ہار چھُ۔",
      urdu: "سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔",
      hindi: "सब प्रशंसा अल्लाह ही के लिए है जो सारे संसार का रब (पालनहार) है।",
      english: "[All] praise is [due] to Allah, Lord of the worlds.",
      tafseerEasy: {
        kashmiri: "کائناتک زرہ زرہ چھُ امہِ ربک محتاج۔ ہر نعمت پؠٹھ ربک شکر ادا کرُن ضروری چھُ۔",
        urdu: "اللہ تعالیٰ کائنات کے ہر ذرے کا خالق اور مالک ہے، شکر گزاری مومن کا بنیادی فرض ہے۔",
        english: "Expressing gratitude to the Creator who sustains and nourishes everything that exists."
      }
    },
    {
      numberInSurah: 3,
      arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
      kashmiri: "یُس دُنیاہس مَنٛز سٲرن پؠٹھ مہروبان تہٕ آخرتس مَنٛز مومنن پؠٹھ خاص رحم کرن وول چھُ۔",
      urdu: "بڑا مہربان، نہایت رحم فرمانے والا ہے۔",
      hindi: "अत्यंत कृपाशील, परम दयालु है।",
      english: "The Entirely Merciful, the Especially Merciful.",
      tafseerEasy: {
        kashmiri: "اللہ تعالٰی سٕنز رحمت چھِ غضبس پؠٹھ غالب۔ نااُمید گژھُن چھُ نہٕ پزان۔",
        urdu: "اللہ کی رحمت اس کے غضب پر حاوی ہے، کبھی اس کی رحمت سے مایوس نہیں ہونا چاہیے۔",
        english: "God's divine mercy encompasses all creation, offering endless hope and forgiveness."
      }
    },
    {
      numberInSurah: 4,
      arabic: "مَالِكِ يَوْمِ الدِّينِ",
      kashmiri: "یُس جزا تہٕ سزا ہِندِ دۄہُک (قیامتُک) مالک چھُ۔",
      urdu: "جزا اور سزا کے دن (قیامت) کا مالک ہے۔",
      hindi: "बदले के दिन (क़ियामत) का मालिक है।",
      english: "Sovereign of the Day of Recompense.",
      tafseerEasy: {
        kashmiri: "قیامتس دۄہ چھُ انصاف پُورٕ پٲٹھۍ گژھُن، انسانس پزِ نیک اعمالن ہُنٛد خیال تھاوُن۔",
        urdu: "آخرت میں ہر نیکی اور بدی کا پورا حساب ہوگا، عدلِ الٰہی پر یقین رکھنا ایمان کا ستون ہے۔",
        english: "Reminder of divine justice on the Day of Judgment where every deed is accounted for."
      }
    },
    {
      numberInSurah: 5,
      arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      kashmiri: "اے اللہ! اسۍ چھِ صرف تہٕ صرف چٲنۍ عبادت کران، تہٕ صرف چٲنۍ نش مدد منگان۔",
      urdu: "ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں۔",
      hindi: "हम तेरी ही इबादत करते हैं और तुझ ही से मदद मांगते हैं।",
      english: "It is You we worship and You we ask for help.",
      tafseerEasy: {
        kashmiri: "توحیدک اصل روح: عبادت تہٕ فریاد صرف اللہ تعالٰی سٕنزِ درگاہس مَنٛز۔",
        urdu: "خالص توحید کا اقرار کہ حقیقی مددگار اور معبود صرف اللہ وحدہ لا شریک ہے۔",
        english: "The core declaration of monotheism: absolute devotion and reliance on God alone."
      }
    },
    {
      numberInSurah: 6,
      arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      kashmiri: "اسہِ ہاو سُو سِیدِھوٚو تہٕ سُوٚکھ لٲگِو رستہٕ (صراطِ مستقیم)۔",
      urdu: "ہمیں سیدھے راستے پر چلا۔",
      hindi: "हमें सीधे रास्ते पर चला।",
      english: "Guide us to the straight path.",
      tafseerEasy: {
        kashmiri: "سیدھیو رستہٕ چھُ حق، ایمانداری، علم تہٕ نیک سیرتی ہُنٛد رستہٕ۔",
        urdu: "حق، انصاف، علم اور پاکیزہ اخلاق کی مستقل رہنمائی مانگنے کی سب سے جامع دعا۔",
        english: "The ultimate prayer for wisdom, righteousness, and steadfastness in daily life."
      }
    },
    {
      numberInSurah: 7,
      arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      kashmiri: "تِمن لُوکن ہُنٛد رستہٕ یِمن پؠٹھ ژےٚ انعام کۄرتھ، نہ کہ تِمن ہُنٛد یِمن پؠٹھ غضب گوٚو یا یِم بے راہ گٔیہِ۔ (آمین)",
      urdu: "ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، نہ کہ ان کا جن پر غضب نازل ہوا اور نہ گمراہوں کا۔ (آمین)",
      hindi: "उन लोगों का रास्ता जिन पर तूने इनाम फ़रमाया, न कि उनका जिन पर तेरा ग़ज़ब हुआ और न भटके हुओं का। (आमीन)",
      english: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
      tafseerEasy: {
        kashmiri: "انبیاء، صدیقین، شہداء تہٕ صالحینن ہٕندِس نقشِ قدمس پؠٹھ پکنچ التجا۔",
        urdu: "نیک، راست باز اور علم والے برگزیدہ ہستیوں کی راہ پر چلنے اور گمراہی سے بچنے کا عہد۔",
        english: "Seeking to emulate the virtuous role models while steering clear of arrogance and ignorance."
      }
    }
  ],

  // Surah Al-Ikhlas (Complete 4 Verses)
  112: [
    {
      numberInSurah: 1,
      arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
      kashmiri: "فرماویو! سُو اللہ چھُ اکھ اکیلا (لاشریک)۔",
      urdu: "آپ فرما دیجیے: وہ اللہ ایک (یکتا) ہے۔",
      hindi: "आप कह दीजिए: वह अल्लाह एक (अकेला) है।",
      english: "Say, \"He is Allah, [who is] One,",
      tafseerEasy: {
        kashmiri: "اللہ تعالٰی یَس مَنٛز کانہہ شریک چُھنہٕ، سُو چھُ اکیلا ذات۔",
        urdu: "اللہ کی ذات اور صفات میں کوئی اس کا شریک نہیں، توحیدِ کامل کا اعلان ہے۔",
        english: "Absolute declaration of the oneness and uniqueness of God."
      }
    },
    {
      numberInSurah: 2,
      arabic: "اللَّهُ الصَّمَدُ",
      kashmiri: "اللہ چھُ بے نیاز (سٲری کائنات چھِ تس محتاج، سُو چھُنہٕ کٲنسہِ محتاج)۔",
      urdu: "اللہ بے نیاز ہے (سب اس کے محتاج ہیں، وہ کسی کا محتاج نہیں)۔",
      hindi: "अल्लाह बेनियाज़ (सबका सहारा, जो किसी का मोहताज नहीं) है।",
      english: "Allah, the Eternal Refuge.",
      tafseerEasy: {
        kashmiri: "صمد سُو یس پؠٹھ سٲری مخلوق تکیہ کران چھِ۔",
        urdu: "الصمد کا مطلب وہ عظیم ہستی جس پر تمام مخلوقات کا دارومدار ہے اور وہ خود بے پرواہ ہے۔",
        english: "The Self-Sufficient master upon whom all creation totally depends."
      }
    },
    {
      numberInSurah: 3,
      arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
      kashmiri: "نہٕ چھُ نہٕ تمِس کانہہ بچہٕ، تہٕ نہٕ چھُ سُو کٲنسہِ نش زامُت۔",
      urdu: "نہ اس کی کوئی اولاد ہے اور نہ وہ کسی سے پیدا ہوا ہے۔",
      hindi: "न उससे कोई पैदा हुआ और न वह किसी से पैदा हुआ।",
      english: "He neither begets nor is born,",
      tafseerEasy: {
        kashmiri: "اللہ تعالٰی چھُ نسل، رشتہٕ داری تہٕ ولادت نش پاک۔",
        urdu: "خالقِ کائنات تمام انسانی و مادی کمزوریوں اور رشتوں سے پاک و منزہ ہے۔",
        english: "God is transcendent, free from parentage, progeny, or bodily limitations."
      }
    },
    {
      numberInSurah: 4,
      arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
      kashmiri: "تہٕ تمس سُند ہمسر یا برابری کرن وول چُھنہٕ کانہہ تہِ۔",
      urdu: "اور کوئی بھی اس کا ہمسر (برابر کا) نہیں ہے۔",
      hindi: "और कोई भी उसका हमसर (समकक्ष) नहीं है।",
      english: "Nor is there to Him any equivalent.\"",
      tafseerEasy: {
        kashmiri: "شان، قدرت تہٕ عظمتس مَنٛز چُھنہٕ اللہ تعالٰی سُنٛد کانہہ ثانی۔",
        urdu: "طاقت، حکمت اور جلال میں کوئی مخلوق اللہ کی برابری کا دعویٰ نہیں کر سکتی۔",
        english: "Nothing in existence is comparable to God in majesty, power, and perfection."
      }
    }
  ],

  // Surah Al-Falaq (Complete 5 Verses)
  113: [
    {
      numberInSurah: 1,
      arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
      kashmiri: "فرماویو! بہٕ چھُس پناہ منگان صُبحکس ربس نش۔",
      urdu: "آپ کہہ دیجیے کہ میں صبح کے رب کی پناہ مانگتا ہوں۔",
      hindi: "आप कहिए कि मैं सुबह के रब की पनाह मांगता हूँ।",
      english: "Say, \"I seek refuge in the Lord of daybreak",
      tafseerEasy: {
        kashmiri: "صبحُک چمکُن چھُ اَنہِ گوٚٹہٕ پھُٹراوان، رب نش برائین نش حفاظت طلب کرن۔",
        urdu: "اندھیرے کو مٹا کر صبح کی روشنی لانے والے رب سے تمام برائیوں کے خلاف پناہ کی درخواست۔",
        english: "Seeking sanctuary with the Creator who dispels darkness with the dawn."
      }
    },
    {
      numberInSurah: 2,
      arabic: "مِن شَرِّ مَا خَلَقَ",
      kashmiri: "ہر تژھ چیزِ ہندِ شر نش یۄس تمِ پیدا کٔرمٕژ چھِ۔",
      urdu: "ہر اس چیز کی برائی سے جو اس نے پیدا فرمائی۔",
      hindi: "हर उस चीज़ की बुराई से जो उसने पैदा की।",
      english: "From the evil of that which He created",
      tafseerEasy: {
        kashmiri: "کائناتکس ہر ممکنہ نقصان نش اللہ سٕنز حفاظت۔",
        urdu: "تمام مخلوقات کے ممکنہ شر اور نقصانات سے حفاظت۔",
        english: "Protection from any harm or malice arising in creation."
      }
    },
    {
      numberInSurah: 3,
      arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
      kashmiri: "تہٕ اندھیرے (رات) ہندِ شر نش ییلہِ سُو پھیلنہٕ یِیہِ۔",
      urdu: "اور اندھیری رات کے شر سے جب وہ چھا جائے۔",
      hindi: "और अंधेरी रात की बुराई से जब वह छा जाए।",
      english: "And from the evil of darkness when it settles",
      tafseerEasy: {
        kashmiri: "راتکس خوف تہٕ چھُپیہِ خطرن نش امان۔",
        urdu: "رات کے اندھیرے اور پوشیدہ خطرات سے الٰہی امان۔",
        english: "Protection against unseen dangers and hidden anxieties."
      }
    },
    {
      numberInSurah: 4,
      arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
      kashmiri: "تہٕ گنڈن مَنٛز پھونکن والین (جادوگرن/حاسدن) ہندِ شر نش۔",
      urdu: "اور گرہوں میں پھونکنے والیوں (جادوگروں/حاسدوں) کے شر سے۔",
      hindi: "और गांठों में फूंकने वालों के शर से।",
      english: "And from the evil of the blowers in knots",
      tafseerEasy: {
        kashmiri: "بری نظر، فتنہٕ تہٕ جادو ٹونہٕ نش حفاظت۔",
        urdu: "حسد، بری نیت اور نقصان دہ سازشوں سے بچاؤ کا حصار۔",
        english: "Shielding oneself from destructive malice, occult harms, and deceit."
      }
    },
    {
      numberInSurah: 5,
      arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
      kashmiri: "تہٕ حسد کرن وٲلس ہندِ شر نش ییلہِ سُو حسد کَرِ۔",
      urdu: "اور حسد کرنے والے کے شر سے جب وہ حسد کرے۔",
      hindi: "और हसद (ईर्ष्या) करने वाले के शर से जब वह हसद करे।",
      english: "And from the evil of an envier when he envies.\"",
      tafseerEasy: {
        kashmiri: "حسد چھُ نیکی کھیاوان۔ حاسد سٕندِ نقصان نش اللہ سٕنز پناہ۔",
        urdu: "حسد دل کی بڑی بیماری ہے؛ حسد کی نظر اور سازشوں کے خلاف اللہ کی پناہ طلب کرنا۔",
        english: "Guarding the soul from toxic jealousy, envy, and malicious resentment."
      }
    }
  ],

  // Surah An-Nas (Complete 6 Verses)
  114: [
    {
      numberInSurah: 1,
      arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
      kashmiri: "فرماویو! بہٕ چھُس انسانن ہندِس پالن ہار (رب) نش پناہ منگان۔",
      urdu: "آپ فرما دیجیے کہ میں تمام انسانوں کے رب کی پناہ میں آتا ہوں۔",
      hindi: "आप कहिए कि मैं सब इंसानों के रब की पनाह में आता हूँ।",
      english: "Say, \"I seek refuge in the Lord of mankind,",
      tafseerEasy: {
        kashmiri: "انسانن ہُنٛد حقیقی نگہبان صرف اللہ پاک چھُ۔",
        urdu: "پوری انسانیت کے حقیقی نگہبان اور پالنے والے کی پناہ مانگنا۔",
        english: "Turning to the true Lord and Guardian of all people."
      }
    },
    {
      numberInSurah: 2,
      arabic: "مَلِكِ النَّاسِ",
      kashmiri: "یُس تمام انسانن ہُنٛد اصل بادشاہ چھُ۔",
      urdu: "جو تمام انسانوں کا حقیقی بادشاہ ہے۔",
      hindi: "जो सब इंसानों का सच्चा बादशाह है।",
      english: "The Sovereign of mankind,",
      tafseerEasy: {
        kashmiri: "دنیاہچ سلطنت چھِ عارضی، اصل بادشاہی چھِ اللہ سٕنز۔",
        urdu: "تمام حاکموں پر اللہ تعالیٰ کی حاکمیتِ مطلقہ قائم ہے۔",
        english: "Acknowledging the supreme sovereign authority over all rulers."
      }
    },
    {
      numberInSurah: 3,
      arabic: "إِلَٰهِ النَّاسِ",
      kashmiri: "یُس تمام انسانن ہُنٛد برحق معبود چھُ۔",
      urdu: "جو تمام انسانوں کا معبودِ برحق ہے۔",
      hindi: "जो सब इंसानों का सच्चा पूज्य (माबूद) है।",
      english: "The God of mankind,",
      tafseerEasy: {
        kashmiri: "صرف اللہ تعالیٰ پزِ عبادتس لائق سمجھُن۔",
        urdu: "پرستش اور بندگی کا واحد حقدار صرف اللہ ہے۔",
        english: "Devoting sincere worship exclusively to God."
      }
    },
    {
      numberInSurah: 4,
      arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
      kashmiri: "وسوسہٕ تراون وٲلس (شیطان) ہندِ شر نش، یُس بار بار واپس یِوان چھُ۔",
      urdu: "پیچھے ہٹ جانے والے وسوسہ ڈالنے والے (شیطان) کے شر سے۔",
      hindi: "पीछे हट जाने वाले वसवसा डालने वाले के शर से।",
      english: "From the evil of the retreating whisperer -",
      tafseerEasy: {
        kashmiri: "شیطان چھُ ذکر سٕتۍ پٔتھ کُن ہٹان مگر غفلتس مَنٛز وسوسہٕ تراوان۔",
        urdu: "شیطان اللہ کے ذکر سے پیچھے ہٹ جاتا ہے اور غفلت میں برے خیالات ڈالتا ہے۔",
        english: "Protection from negative self-talk and demonic whispering."
      }
    },
    {
      numberInSurah: 5,
      arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
      kashmiri: "یُس لُوکن ہٕندین سینن (دلن) مَنٛز وسوسہٕ تہٕ شک تراوان چھُ۔",
      urdu: "جو لوگوں کے سینوں میں وسوسے ڈالتا ہے۔",
      hindi: "जो लोगों के सीनों में वसवसे डालता है।",
      english: "Who whispers [evil] into the breasts of mankind -",
      tafseerEasy: {
        kashmiri: "دلس مَنٛز بدگمانی تہٕ گناہک خیال تراون نش بچنچ دعا۔",
        urdu: "دل اور ذہن کو ناپاک اور وسوسوں سے پاک رکھنے کی خصوصی التجا۔",
        english: "Safeguarding the purity of the heart and mind from insidious doubts."
      }
    },
    {
      numberInSurah: 6,
      arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ",
      kashmiri: "خواہ سُو جناتن مَنٛز آسہِ یا انسانن مَنٛز۔",
      urdu: "خواہ وہ جنات میں سے ہو یا انسانوں میں سے۔",
      hindi: "चाहे वह जिन्नों में से हो या इंसानों में से।",
      english: "From among the jinn and mankind.\"",
      tafseerEasy: {
        kashmiri: "بُری صحبت تہٕ شیطانی خصلت والے انسانن تہٕ جنن نش مکمل حفاظت۔",
        urdu: "شریر جنات اور گمراہ کرنے والے انسانوں کی صحبت سے نجات۔",
        english: "Protection against corrupting companionships whether unseen or human."
      }
    }
  ]
};

// Daily Life Solutions & Quranic Wisdom Catalog
export const quranicLifeWisdom: TopicWisdom[] = [
  {
    id: "inner-peace",
    topicTitle: "Dil Ka Sukoon & Anxiety Relief",
    kashmiriTitle: "دلُک سکون تہٕ فکر دور کرن",
    urduTitle: "دل کا سکون اور بے چینی کا علاج",
    hindiTitle: "दिल का सुकून और चिंता मुक्ति",
    category: "Peace",
    surahReference: "Surah Ar-Ra'd (13:28)",
    ayahNumber: 28,
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    kashmiri: "خبردار! یاد تھاویو، اللہ تعالٰی سٕندِس ذِکرَس سٕتۍ ہی لبَن دِل اصل سکون تہٕ چین۔",
    urdu: "سن لو! اللہ کے ذکر سے ہی دلوں کو اطمینان (سکون) نصیب ہوتا ہے۔",
    hindi: "याद रखो! अल्लाह की याद (ज़िक्र) से ही दिलों को सच्चा सुकून मिलता है।",
    english: "Unquestionably, by the remembrance of Allah hearts are assured.",
    lifeLesson: "Jab bhi dil ghabraye ya dimag tension mein ho, subhanallah, alhamdulillah, astaghfirullah padhne se dil ko roohani sukoon milta hai.",
    kashmiriLesson: "ییلہِ دِل پریشان آسہِ، اللہ سُنٛد ذکر کرن چھُ دلس سکون بخشوان۔"
  },
  {
    id: "parents-respect",
    topicTitle: "Maa Baap Ke Sath Husn-e-Sulook",
    kashmiriTitle: "مٲل ماجہِ ہٕنٛز خدمت تہٕ عزت",
    urduTitle: "والدین کی عزت اور ان کے ساتھ احسان",
    hindiTitle: "माता-पिता का सम्मान और सेवा",
    category: "Parents",
    surahReference: "Surah Al-Isra (17:23-24)",
    ayahNumber: 23,
    arabic: "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا ۚ إِمَّا يَبْلُغَنَّ عِندَكَ الْكِبَرَ أَحَدُهُمَا أَوْ كِلَاهُمَا فَلَا تَقُل لَّهُمَا أُفٍّ",
    kashmiri: "تہٕ تُہندِ ربن کۄر فیصلہ کہ امِس سِوا کٔریو نہٕ کٲنسہِ عبادت، تہٕ مٲل ماجہِ سٕتۍ کٔریو نیکی۔ اگر تِمن مَنٛز کانہہ یا دۄشوےٚ بڈپنس واتن، تِمن نہٕ کٔریو 'اُف' تہِ۔",
    urdu: "اور تمہارے رب نے حکم فرما دیا ہے کہ تم اس کے سوا کسی کی عبادت نہ کرو اور والدین کے ساتھ حسنِ سلوک کرو، اگر ان میں سے ایک یا دونوں بڑھاپے کو پہنچ جائیں تو انہیں 'اُف' تک نہ کہو۔",
    hindi: "और तुम्हारे रब ने आदेश दिया है कि उसके सिवा किसी की इबादत न करो और माता-पिता के साथ भलाई करो। यदि उनमें से कोई एक या दोनों बुढ़ापे को पहुंचें तो उन्हें 'उफ़' भी न कहो।",
    english: "And your Lord has decreed that you not worship except Him, and to parents, good treatment. Whether one or both of them reach old age [while] with you, say not to them [so much as], \"uff\".",
    lifeLesson: "Walidain ki khidmat kamyabi aur aakhrat ki jannat ki kunji hai. Unke aage aawaz dheemi aur lehja narm rakhna chahiye.",
    kashmiriLesson: "مٲل ماجہِ ہٕنٛز دُعا چھِ دنیاہس مَنٛز کامیابی تہٕ آخرتس مَنٛز جنّتُک دروازہ۔"
  },
  {
    id: "sabr-hardship",
    topicTitle: "Mushkil Waqt Mein Sabr & Umeed",
    kashmiriTitle: "مشکل وختس مَنٛز صبر تہٕ اُمید",
    urduTitle: "مشکل وقت میں صبر اور امید",
    hindiTitle: "मुश्किल समय में धैर्य और आशा",
    category: "Hardship",
    surahReference: "Surah Ash-Sharh (94:5-6)",
    ayahNumber: 5,
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا • إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    kashmiri: "پس بے شک ہر تنگی تہٕ مشکلہِ سٕتۍ چھِ آسانی۔ بے شک ہر مشکلہِ پَتھ چھِ راحت۔",
    urdu: "پس بیشک ہر تنگی (مشکل) کے ساتھ آسانی ہے، یقیناً ہر تنگی کے ساتھ آسانی ہے۔",
    hindi: "तो निश्चय ही हर कठिनाई के साथ आसानी है, वास्तव में कठिनाई के साथ ही आसानी है।",
    english: "For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.",
    lifeLesson: "Zindagi ka koi bhi dukh ya exam fail hona aakhri nahi hota. Allah har mushkil ke foran baad aasan darwaze kholta hai.",
    kashmiriLesson: "غم تہٕ تنگی پَتھ چھُ اللہ تعالٰی خوشحالی تہٕ کامیابی عطا کران۔"
  },
  {
    id: "knowledge-ilm",
    topicTitle: "Ilm Ki Talab & Dimaghi Roshni",
    kashmiriTitle: "علمچ طلب تہٕ دماغی گاژ",
    urduTitle: "علم کی طلب اور دعا",
    hindiTitle: "ज्ञान और शिक्षा की वृद्धि",
    category: "Knowledge",
    surahReference: "Surah Ta-Ha (20:114)",
    ayahNumber: 114,
    arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
    kashmiri: "تہٕ عرض کٔریو: اے میٲنی ربّا! میٛانہِ علمس مَنٛز فرماو مزید اضافہٕ۔",
    urdu: "اور التجا کیجیے: اے میرے پروردگار! میرے علم میں اور اضافہ فرما۔",
    hindi: "और प्रार्थना करो: हे मेरे रब! मेरे ज्ञान (विद्या) में और वृद्धि कर।",
    english: "And say, \"My Lord, increase me in knowledge.\"",
    lifeLesson: "Har student aur shakhs ko rozana yeh dua mangni chahiye taake dimag tez ho aur ilm mein barkat aaye.",
    kashmiriLesson: "پرنایَس مَنٛز کامیابی خٲطرٕ پزِ انسانس ہمیش علمچ دعا منگٕن۔"
  },
  {
    id: "truth-justice",
    topicTitle: "Sachai, Insaaf & Imandari",
    kashmiriTitle: "سچائی، انصاف تہٕ دیانتداری",
    urduTitle: "سچائی اور عدل و انصاف پر قائم رہنا",
    hindiTitle: "सच्चाई और न्याय पर अटल रहना",
    category: "Moral",
    surahReference: "Surah An-Nisa (4:135)",
    ayahNumber: 135,
    arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ بِالْقِسْطِ شُهَدَاءَ لِلَّهِ وَلَوْ عَلَىٰ أَنفُسِكُمْ",
    kashmiri: "اے اہل ایمان! انصافس پؠٹھ مضبوٗط پٲٹھۍ قائم روزِو، اللہ خٲطرٕ سچی گواہی دِیو اگرچہ سُو گواہی پانہٕ تُہندِس پانَس یا رشتہ دارن پؠٹھ کِیاہ نہ آسہِ۔",
    urdu: "اے ایمان والو! انصاف پر مضبوطی سے قائم رہنے والے بنو، اللہ کے لیے سچی گواہی دو خواہ وہ تمہاری اپنی ذات یا والدین کے خلاف ہی کیوں نہ ہو۔",
    hindi: "हे ईमान वालो! न्याय पर मजबूती से टिके रहो, अल्लाह के लिए सच्ची गवाही देने वाले बनो चाहे वह तुम्हारे अपने विरुद्ध ही क्यों न हो।",
    english: "O you who have believed, be persistently standing firm in justice, witnesses for Allah, even if it be against yourselves or parents and relatives.",
    lifeLesson: "Adalat ho, court drafting ho ya aam zindagi — sachai aur insaaf par chalne wale insaan ko Allah duniya aur aakhrat mein sarbuland karta hai.",
    kashmiriLesson: "سچائی تہٕ انصاف چھُ اصل انسانیتچ بنیاد۔"
  }
];
