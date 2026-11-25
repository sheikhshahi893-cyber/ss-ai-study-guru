export const deptTemplates = [{id:"revenue-land",title:"Revenue & Land Records",urduTitle:"محکمہ مال و اراضی (پٹوار خانہ)",icon:"🏛️",color:"from-amber-600 to-yellow-600",description:"Fard Malkiat, Intiqal (Mutation), Khasra Girdawari, Nishandahi, and registry application formats.",templates:[{id:"fard-application",title:"Application for Fard Malkiat (فرد ملکیت)",urduTitle:"درخواست برائے حصول فرد برائے بیع / ریکارڈ",purpose:"Official application to Tehsildar / Patwari / Arazi Record Center for certified land title copy.",fields:[{name:"OFFICE_NAME",label:"Office / Tehsildar Office",placeholder:"بخدمت جناب تحصیلدار صاحب / انچارج اراضی ریکارڈ سینٹر",defaultValue:"بخدمت جناب تحصیلدار صاحب / اراضی ریکارڈ سینٹر"},{name:"APPLICANT_NAME",label:"Applicant Name & Father",placeholder:"محمد شاہد ولد محمد اسلم",defaultValue:"محمد شاہد ولد محمد اسلم"},{name:"MAUZA_KHATUNI",label:"Mauza / Khewat / Khatuni / Khasra",placeholder:"موضع کوٹلی، کھیوٹ نمبر 45، کست نمبر 12",defaultValue:"موضع گلبرگ، کھیوٹ نمبر 112، خسرہ نمبر 45/2"},{name:"PURPOSE_FARD",label:"Purpose (Sale / Record / Bank Loan)",placeholder:"برائے بیع / ریکارڈ ذاتی",defaultValue:"برائے ریکارڈ ذاتی و تصدیق ملکیت"}],content:`[OFFICE_NAME]

عنوان: درخواست برائے حصول نقل فرد ملکیت
[PURPOSE_FARD]

جناب عالی!
گزارش ہے کہ سائل [APPLICANT_NAME] کا رقبہ واقع [MAUZA_KHATUNI] میں واقع ہے۔ سائل کو مذکورہ رقبہ کی نقل فرد ملکیت برائے [PURPOSE_FARD] اشد ضرورت ہے۔

استدعا ہے کہ پٹواری حلقہ / عملہ کو ہدایت فرمائی جائے کہ سائل کو رقبہ مذکورہ کی مصدقہ نقل فرد ملکیت فی الفور جاری فرمائیں۔

عرضے:
سائل: [APPLICANT_NAME]
شناختی کارڈ نمبر: ___________________
موبائل نمبر: _____________________
تاریخ: [CURRENT_DATE]`},{id:"nishandahi-land",title:"Application for Demarcation (نشان دہی اراضی)",urduTitle:"درخواست برائے نشان دہی رقبہ / خسرہ نمبر",purpose:"Application under Land Revenue Act for boundary demarcation of disputed land parcel.",fields:[{name:"OFFICE_NAME",label:"Authority",placeholder:"جناب تحصیلدار صاحب / اسسٹنٹ کمشنر",defaultValue:"بخدمت جناب تحصیلدار صاحب"},{name:"APPLICANT_NAME",label:"Applicant Name",placeholder:"عبدالرحمان ولد غلام رسول",defaultValue:"عبدالرحمان ولد غلام رسول"},{name:"LAND_DETAILS",label:"Khasra No & Mauza",placeholder:"خسرہ نمبر 210/14 موضع فتح پور",defaultValue:"خسرہ نمبر 210/14 موضع فتح پور"},{name:"OPPOSITE_PARTY",label:"Neighbour / Adjoining Owner",placeholder:"نام ہمسایہ مالکان",defaultValue:"محمد اقبال وغیرہ مالکان متصلہ رقبہ"}],content:`[OFFICE_NAME]

عنوان: درخواست برائے نشان دہی اراضی واقع [LAND_DETAILS]

جناب عالی!
نہایت ادب سے گزارش ہے کہ سائل [APPLICANT_NAME] رقبہ مذکورہ کا قانونی مالک و قابض ہے۔ متصلہ فریق [OPPOSITE_PARTY] سائل کے رقبہ کی حدود میں ناجائز دخل اندازی کی کوشش کر رہا ہے۔ حدود کی درست تعیین کے لیے سرکاری طور پر نشان دہی کا ہونا ازحد ضروری ہے۔

استدعا ہے کہ قانون گو / پٹواری گرداور کو موقع پر جا کر باقاعدہ فیتہ کشی و پیمائش کر کے نشان دہی کی رپورٹ پیش کرنے کا حکم صادر فرمایا جائے۔

سائل: [APPLICANT_NAME]
مورخہ: [CURRENT_DATE]`}]},{id:"teachers-edu",title:"Teachers & Education",urduTitle:"اساتذہ و محکمہ تعلیم",icon:"📚",color:"from-blue-600 to-cyan-600",description:"Casual leave, medical leave, transfer representation, lesson plan formats, and exam duty joining.",templates:[{id:"casual-leave-teacher",title:"Application for Casual / Medical Leave",urduTitle:"درخواست برائے اتفاقی / میڈیکل رخصت",purpose:"Official leave application format for school, college, and university educators.",fields:[{name:"HEAD_NAME",label:"To (Principal / Headmaster / DEO)",placeholder:"The Worthy Principal / Headmaster",defaultValue:"The Worthy Principal / Headmaster, Govt. Higher Secondary School"},{name:"TEACHER_NAME",label:"Teacher Name & Designation",placeholder:"Muhammad Ali (SST / EST)",defaultValue:"Muhammad Ali (SST Science)"},{name:"LEAVE_DAYS",label:"Leave Duration & Dates",placeholder:"3 Days from 10-09-2026 to 12-09-2026",defaultValue:"2 Days (from [START_DATE] to [END_DATE])"},{name:"REASON",label:"Reason (Urgent work / Sickness)",placeholder:"Due to severe fever / urgent family matter",defaultValue:"due to sudden severe indisposition / urgent domestic work"}],content:`To,
[HEAD_NAME]

Subject: APPLICATION FOR GRANT OF CASUAL / MEDICAL LEAVE

Respected Sir / Madam,
Most respectfully it is submitted that the applicant is unable to attend to official duties [REASON]. 

It is therefore requested that casual leave for [LEAVE_DAYS] may kindly be granted to the applicant in view of the genuine circumstances.

Thanking you in anticipation.

Yours obediently,
[TEACHER_NAME]
Employee Personal No: ________________
Date: [CURRENT_DATE]`},{id:"exam-duty-joining",title:"Joining Report for Examination / Board Duty",urduTitle:"جوائننگ رپورٹ برائے امتحانی ڈیوٹی (سپریٹنڈنٹ/نگران)",purpose:"Standard joining report for Board / University exam superintendent, resident inspector, and invigilators.",fields:[{name:"CONTROLLER_OFFICE",label:"Controller Examination",placeholder:"Controller of Examinations, BISE / Board",defaultValue:"The Controller of Examinations, Board of Intermediate & Secondary Education"},{name:"OFFICER_NAME",label:"Staff Name & School",placeholder:"Ahmed Raza, SS Physics",defaultValue:"Ahmed Raza, SS Physics"},{name:"CENTRE_NAME",label:"Exam Centre Details",placeholder:"Centre No. 42, Govt. High School",defaultValue:"Govt. Comprehensive High School (Centre No. 45)"}],content:`To,
[CONTROLLER_OFFICE]

Subject: JOINING REPORT AS SUPERINTENDENT / INVIGILATOR

Sir,
In compliance with your office appointment order No. ___________, I have solemnly assumed the charge and joined duty as Superintendent / Invigilator at [CENTRE_NAME] today on [CURRENT_DATE] at 07:30 AM.

The examination arrangements, CCTV security, and question paper safe custody protocols have been verified as per board regulations.

Reported by:
[OFFICER_NAME]
CNIC: ___________________
Contact: _________________`}]},{id:"banking-accounts",title:"Banking & Accounts",urduTitle:"بینکنگ و مالیات (بینک اور مالی امور)",icon:"💳",color:"from-emerald-600 to-teal-600",description:"Cheque bounce notice, account closing, dispute letter, EMI calculator, and loan application drafts.",templates:[{id:"cheque-bounce-notice",title:"Legal Notice under Section 489-F (Dishonoured Cheque)",urduTitle:"قانونی نوٹس زیر دفعہ 489-F برائے ڈس آنر چیک",purpose:"Statutory 14-day legal demand notice for dishonoured cheque before lodging FIR or civil recovery.",fields:[{name:"PAYEE_NAME",label:"Sender / Payee Name",placeholder:"Sheikh Shahid",defaultValue:"Sheikh Shahid"},{name:"DRAWER_NAME",label:"Defaulter / Drawer Name & Address",placeholder:"Kamran Malik, R/o House 12...",defaultValue:"Kamran Malik, R/o House No. 24, Main Bazaar"},{name:"CHEQUE_NO",label:"Cheque No & Amount",placeholder:"Cheque No. 445129 for Rs. 500,000/-",defaultValue:"Cheque No. 982143 dated [DATE] for Rs. 350,000/-"},{name:"BANK_NAME",label:"Bank Branch & Return Memo Date",placeholder:"HBL / UBL / Meezan Bank, Return Memo dated...",defaultValue:"Meezan Bank Ltd., Memo dated [MEMO_DATE]"}],content:`LEGAL NOTICE UNDER SECTION 489-F P.P.C. / NEGOTIABLE INSTRUMENTS ACT

To,
[DRAWER_NAME]

Take notice that:
1. You issued a cheque bearing [CHEQUE_NO] drawn on [BANK_NAME] in discharge of your legally enforceable debt/liability in favor of my client [PAYEE_NAME].
2. When the said cheque was presented for encashment, it was dishonoured and returned unpaid by the bank with the memo: "FUNDS INSUFFICIENT / PAYMENT STOPPED".
3. You have committed an offense punishable under Section 489-F PPC as you dishonestly issued the cheque knowing well that funds were inadequate.

DEMAND:
You are hereby called upon through this statutory notice to make payment of the full cheque amount within 14 (fourteen) days of receipt of this notice, failing which criminal proceedings under Section 489-F PPC and civil suit under Order 37 CPC will be instituted against you at your entire risk, cost and consequence.

Sender / Counsel for: [PAYEE_NAME]
Date: [CURRENT_DATE]`}]},{id:"lawyers-legal",title:"Lawyers & Legal Notices",urduTitle:"وکالت اور قانونی نوٹس (وکلاء و سائلین)",icon:"⚖️",color:"from-purple-600 to-indigo-600",description:"Section 80 CPC Govt Notice, Defamation notice, Recovery notice, General Affidavit, and Rent Agreement drafts.",templates:[{id:"section-80-cpc-notice",title:"Statutory Notice Under Section 80 C.P.C. to Government",urduTitle:"قانونی نوٹس زیر دفعہ 80 ضابطہ دیوانی بنام حکومت",purpose:"Mandatory 60-day advance notice required before instituting any suit against the State or public officer.",fields:[{name:"GOVT_OFFICE",label:"To Authority (Secretary / DC / Department)",placeholder:"The Chief Secretary / Secretary Education",defaultValue:"The Secretary to Government of Punjab / Chief Secretary"},{name:"CLIENT_NAME",label:"Client Name & Particulars",placeholder:"Muhammad Tariq S/o Ghulam Muhammad",defaultValue:"Muhammad Tariq S/o Ghulam Muhammad"},{name:"CAUSE_ACTION",label:"Cause of Action & Grievance",placeholder:"Unlawful denial of pension benefits / illegal acquisition",defaultValue:"Wrongful withholding of retirement gratuity and pensionary benefits"}],content:`NOTICE UNDER SECTION 80 OF THE CODE OF CIVIL PROCEDURE, 1908

To,
[GOVT_OFFICE]

Sir,
Under instructions and on behalf of my client [CLIENT_NAME], I hereby serve upon you this notice of intention to institute a civil suit against the Government:

1. CAUSE OF ACTION:
My client is aggrieved by [CAUSE_ACTION] despite repeated representations and entitlement under the service rules and statutory law.

2. RELIEF SOUGHT IN THE PROPOSED SUIT:
A decree for declaration, mandatory injunction and recovery of the lawful dues amounting to Rs. _________ along with damages.

Take notice that if the genuine grievance of my client is not redressed within 60 (sixty) days of receipt of this notice, a civil suit will be instituted against the Government at state expense.

Yours faithfully,
Advocate High Court
Counsel for [CLIENT_NAME]`},{id:"general-affidavit-format",title:"General Stamp Paper Affidavit (بیان حلفی)",urduTitle:"بیان حلفی تصدیقی برائے عام امور و عدالت",purpose:"Standard sworn affidavit template for civil court, government departments, and verification.",fields:[{name:"DEPONENT_NAME",label:"Deponent Name & Father",placeholder:"Asif Ali S/o Noor Muhammad",defaultValue:"Asif Ali S/o Noor Muhammad"},{name:"DEPONENT_CNIC",label:"CNIC / National Identity No",placeholder:"35201-1234567-1",defaultValue:"35201-XXXXXXX-X"},{name:"DEPONENT_ADDRESS",label:"Residential Address",placeholder:"House No. 15, Street 4, Lahore",defaultValue:"House No. 15, Street 4, Lahore"}],content:`AFFIDAVIT / بیان حلفی

I, [DEPONENT_NAME], CNIC No. [DEPONENT_CNIC], Muslim, adult, resident of [DEPONENT_ADDRESS], do hereby solemnly affirm and declare on oath as under:

1. That the deponent is a permanent citizen of Pakistan and fully conversant with the facts of the matter.
2. That all contents, statements and documents annexed herewith are true and correct to the best of my knowledge, information and belief.
3. That nothing material has been concealed or falsely stated herein.

Deponent: ______________________

VERIFICATION:
Verified on oath at [CITY] on this [CURRENT_DATE] that the contents of above paras 1 to 3 are true and correct.

Deponent`}]},{id:"health-medical",title:"Health & Medical Staff",urduTitle:"صحت و میڈیکل (ڈاکٹرز و ہسپتال عملہ)",icon:"🏥",color:"from-rose-600 to-pink-600",description:"Medical fitness certificate, rest certificate, medico-legal duty report, and hospital staff letters.",templates:[{id:"medical-rest-certificate",title:"Medical Rest / Fitness Certificate Draft",urduTitle:"میڈیکل ریسٹ و فٹنس سرٹیفکیٹ (ڈاکٹر ایڈوائس)",purpose:"Standard medical practitioner rest and fitness recommendation certificate for patients/employees.",fields:[{name:"DOCTOR_NAME",label:"Doctor Name & PMDC/Registration",placeholder:"Dr. S. K. Ahmad, MBBS, FCPS",defaultValue:"Dr. S. K. Ahmad, MBBS, FCPS (Reg No. 44120-P)"},{name:"PATIENT_NAME",label:"Patient Name & Age",placeholder:"Zubair Khan, Age: 28 Years",defaultValue:"Zubair Khan, Age: 28 Years"},{name:"DIAGNOSIS",label:"Diagnosis & Rest Period",placeholder:"Suffering from Acute Bronchitis - Bed rest 5 days",defaultValue:"Suffering from Acute Viral Illness & High Grade Fever. Advised bed rest for 4 days."}],content:`TO WHOM IT MAY CONCERN

MEDICAL CERTIFICATE FOR LEAVE / REST

This is to certify that Mr./Ms. [PATIENT_NAME] has been under my medical treatment at this clinic/hospital.

DIAGNOSIS & CLINICAL OPINION:
[DIAGNOSIS]

In my professional medical opinion, he/she is unfit to perform active occupational duties and is advised complete physical rest from [START_DATE] to [END_DATE].

He/She is expected to resume normal duty on [FITNESS_DATE] subject to clinical re-evaluation.

Doctor Signature & Stamp:
[DOCTOR_NAME]
Date: [CURRENT_DATE]`}]},{id:"govt-employees",title:"Govt & Office Employees",urduTitle:"سرکاری ملازمین و دفتری امور",icon:"👔",color:"from-slate-700 to-slate-900",description:"Joining report, Transfer representation, ACR expunction appeal, NOC for passport, and pension applications.",templates:[{id:"joining-report-govt",title:"Official Charge Assumption / Joining Report",urduTitle:"رپورٹ چارج سنبھالنے و جوائننگ رپورٹ",purpose:"Formal joining report on transfer, promotion, or return from sanctioned leave.",fields:[{name:"COMPETENT_AUTHORITY",label:"To (Designation / Office)",placeholder:"The Director / Deputy Commissioner",defaultValue:"The Competent Authority / Head of Attached Department"},{name:"EMPLOYEE_DETAILS",label:"Employee Name, Designation & BPS",placeholder:"Zahid Mehmood, Assistant (BS-16)",defaultValue:"Zahid Mehmood, Assistant Director (BS-17)"},{name:"ORDER_REFERENCE",label:"Notification / Transfer Order No.",placeholder:"Order No. SO(Admn)4-12/2026 dated...",defaultValue:"Notification No. SO(Admn)12-88/2026 dated [DATE]"}],content:`To,
[COMPETENT_AUTHORITY]

Subject: JOINING REPORT / ASSUMPTION OF CHARGE

Sir,
In pursuance of Government Notification / Transfer Order [ORDER_REFERENCE], I have solemnly assumed the official charge and reported for duty as [EMPLOYEE_DETAILS] today in the forenoon of [CURRENT_DATE].

It is requested that my joining report may kindly be accepted and notified in official records.

Yours obediently,
[EMPLOYEE_DETAILS]
Personal / PIN No: ______________
Date: [CURRENT_DATE]`},{id:"noc-passport-dept",title:"Application for Departmental NOC (Passport / Higher Studies)",urduTitle:"درخواست برائے این او سی (پاسپورٹ / اعلیٰ تعلیم)",purpose:"Application to competent administrative secretary for No Objection Certificate.",fields:[{name:"HEAD_DEPARTMENT",label:"To Secretary / Head of Dept",placeholder:"The Secretary, Govt. of Punjab...",defaultValue:"The Secretary to Government / Departmental Head"},{name:"EMPLOYEE_NAME",label:"Employee Name & Current Posting",placeholder:"Tariq Jameel, Superintendent",defaultValue:"Tariq Jameel, Superintendent (BS-17)"},{name:"PURPOSE_NOC",label:"Purpose (International Passport / Hajj / Umrah)",placeholder:"Issuance of Machine Readable Official/Private Passport",defaultValue:"Issuance of Machine Readable Passport for performing Umrah"}],content:`To,
[HEAD_DEPARTMENT]

Subject: REQUEST FOR ISSUANCE OF NO OBJECTION CERTIFICATE (NOC)

Respected Sir,
With profound respect, it is submitted that the applicant is working as [EMPLOYEE_NAME] in this department. 

The applicant intends to apply for [PURPOSE_NOC]. No departmental inquiry, anti-corruption proceedings, or audit para is pending against the applicant.

It is humbly requested that the requisite Departmental NOC may graciously be issued to enable the applicant to process the application.

Yours obediently,
[EMPLOYEE_NAME]
Date: [CURRENT_DATE]`}]}];
