export const courtTemplates = [{id:"stay-order-39",title:"Temporary Injunction / Stay Application",urduTitle:"درخواست برائے حکم امتناعی عارضی (Stay Order)",cpcSection:"Order 39 Rules 1 & 2 read with Section 151 C.P.C.",category:"stay",isUrgent:!0,description:"Statutory application to restrain defendant from alienating, transferring, dispossessing or raising construction on suit property during pendency of suit.",courtName:"IN THE COURT OF LEARNED SENIOR CIVIL JUDGE / CIVIL JUDGE, [DISTRICT_NAME]",suitType:"Suit for Declaration, Permanent Injunction & Possession",notes:["Prima facie case must be established.","Balance of convenience in favour of applicant.","Irreparable loss/injury if stay is not granted."],contentTemplate:`IN THE COURT OF LEARNED CIVIL JUDGE, [DISTRICT_NAME]
Civil Suit No. _________ of 2026

[PLAINTIFF_NAME], S/o [PLAINTIFF_FATHER],
R/o [PLAINTIFF_ADDRESS]
                                                      ... Plaintiff / Applicant
                                   VERSUS
[DEFENDANT_NAME], S/o [DEFENDANT_FATHER],
R/o [DEFENDANT_ADDRESS]
                                                      ... Defendant / Respondent

APPLICATION UNDER ORDER 39 RULES 1 & 2 READ WITH SECTION 151 C.P.C. FOR THE GRANT OF TEMPORARY INJUNCTION.

Respectfully Sheweth:
1. That the applicant has filed the titled suit before this Hon'ble Court, the contents whereof may kindly be read as an integral part of this application.
2. That the applicant has a strong prima facie case in his favour and there is every likelihood of success in the main suit.
3. That the balance of convenience lies entirely in favour of the applicant and against the respondent.
4. That if the ad-interim temporary injunction is not granted, the applicant will suffer irreparable loss and injury which cannot be compensated in terms of money.
5. That the respondent is bent upon illegally transferring, alienating, and altering the suit property measuring [PROPERTY_DETAILS], situated at [LOCATION].

PRAYER:
It is, therefore, most respectfully prayed that this application may kindly be accepted and an ad-interim temporary injunction may graciously be passed restraining the respondent from alienating, selling, transferring, mortgaging or changing the nature/possession of the suit property till final decision of the main suit.

Any other relief deemed fit and proper may also be awarded.

Applicant / Plaintiff
Through Counsel: [ADVOCATE_NAME], Advocate High Court
Date: [CURRENT_DATE]`},{id:"adjournment-hazri",title:"Application for Adjournment / Exemption of Appearance",urduTitle:"درخواست برائے التوائے سماعت و حاضری معافی",cpcSection:"Order 17 Rule 1 read with Section 151 C.P.C.",category:"procedure",isUrgent:!0,description:"Application to request an adjournment or exemption due to unavoidable illness or counsel engagement.",courtName:"IN THE COURT OF LEARNED CIVIL JUDGE, [DISTRICT_NAME]",suitType:"Civil Suit / Execution Petition",notes:["Valid genuine ground must be stated.","Medical slip or urgent engagement reason attached."],contentTemplate:`IN THE COURT OF LEARNED CIVIL JUDGE, [DISTRICT_NAME]

[PLAINTIFF_NAME]  VS  [DEFENDANT_NAME]
Suit for [SUIT_NATURE]

APPLICATION UNDER ORDER 17 RULE 1 C.P.C. FOR ADJOURNMENT OF HEARING.

Respectfully Sheweth:
1. That the above titled matter is fixed for today for [STAGE_OF_CASE].
2. That the learned counsel for the applicant is suffering from sudden severe indisposition / is engaged before the Hon'ble High Court in urgent part-heard matter.
3. That the absence is neither intentional nor deliberate but due to the bona fide reason mentioned above.

PRAYER:
It is respectfully prayed that the hearing of the case may kindly be adjourned to any other convenient future date in the interest of justice.

Applicant / Counsel
Date: [CURRENT_DATE]`},{id:"early-hearing-urgency",title:"Application for Early Hearing / Urgent Fixation",urduTitle:"درخواست برائے جلد سماعت / ارجنٹ فکسیشن",cpcSection:"Section 151 C.P.C. (Inherent Powers)",category:"procedure",isUrgent:!0,description:"Application for early date of hearing due to urgent irreparable threat or statutory limitation.",courtName:"IN THE COURT OF LEARNED CIVIL JUDGE, [DISTRICT_NAME]",suitType:"Civil Suit No. [SUIT_NO]",notes:["State reasons of immediate urgency clearly.","Supported by affidavit."],contentTemplate:`IN THE COURT OF LEARNED CIVIL JUDGE, [DISTRICT_NAME]

[PLAINTIFF_NAME]  VS  [DEFENDANT_NAME]

APPLICATION UNDER SECTION 151 C.P.C. FOR EARLY HEARING OF THE CASE.

Respectfully Sheweth:
1. That the titled case is currently fixed for [CURRENT_FIXED_DATE].
2. That an extreme urgency has arisen as the respondent has threatened to [SPECIFIC_URGENT_GROUND].
3. That if the matter is not taken up immediately, the very purpose of the litigation will be frustrated.

PRAYER:
It is prayed that the file may kindly be summoned from record and fixed for early hearing on any early date.

Applicant / Plaintiff
Date: [CURRENT_DATE]`},{id:"written-statement-ws",title:"Written Statement (Jawab Dawa / جواب دعویٰ)",urduTitle:"جواب دعویٰ بمہ ابتدائی عذرات و جواب بر بنائے واقعات",cpcSection:"Order 8 Rules 1 to 10 C.P.C.",category:"pleadings",description:"Comprehensive Written Statement containing preliminary legal objections and para-wise factual reply.",courtName:"IN THE COURT OF LEARNED SENIOR CIVIL JUDGE, [DISTRICT_NAME]",suitType:"Suit for Declaration and Possession",notes:["Para-wise specific denial required.","Preliminary objections regarding cause of action, limitation, estoppel."],contentTemplate:`IN THE COURT OF LEARNED CIVIL JUDGE, [DISTRICT_NAME]
Civil Suit No. [SUIT_NO] of 2026

[PLAINTIFF_NAME]  ... Plaintiff
         VERSUS
[DEFENDANT_NAME]  ... Defendant

WRITTEN STATEMENT ON BEHALF OF DEFENDANT

PRELIMINARY OBJECTIONS:
1. That the suit of the plaintiff is not maintainable in its present form.
2. That the plaintiff has no locus standi and cause of action to file the instant suit.
3. That the suit is barred by limitation as well as the principle of Estoppel.
4. That the plaintiff has concealed material facts from this Hon'ble Court.

ON FACTS:
1. That Para No. 1 of the plaint is admitted to the extent of identity, rest is denied.
2. That Para No. 2 is vehemently denied. The plaintiff was never in exclusive possession.
3. That Para No. 3 is incorrect and false, hence denied.

PRAYER:
It is, therefore, respectfully prayed that the frivolous suit of the plaintiff may kindly be dismissed with exemplary costs under Section 35-A C.P.C.

Defendant
Through Counsel: [ADVOCATE_NAME], Advocate`},{id:"local-commissioner-cpc",title:"Appointment of Local Commission (موقع معائنہ)",urduTitle:"درخواست برائے تعیناتی لوکل کمشنر برائے موقع معائنہ",cpcSection:"Order 26 Rule 9 read with Section 151 C.P.C.",category:"evidence",description:"Application for appointment of a Local Commissioner to elucidate disputed physical boundary, spot inspection, or existing possession.",courtName:"IN THE COURT OF LEARNED CIVIL JUDGE, [DISTRICT_NAME]",suitType:"Civil Suit No. [SUIT_NO]",notes:["State specific points to be verified on the spot.","Commission fee deposition."],contentTemplate:`IN THE COURT OF LEARNED CIVIL JUDGE, [DISTRICT_NAME]

[PLAINTIFF_NAME]  VS  [DEFENDANT_NAME]

APPLICATION UNDER ORDER 26 RULE 9 C.P.C. FOR APPOINTMENT OF LOCAL COMMISSIONER TO CONDUCT SPOT INSPECTION.

Respectfully Sheweth:
1. That the titled suit is pending adjudication before this Hon'ble Court.
2. That the dispute relates to the exact demarcated boundary and actual physical position on the ground regarding [PROPERTY_DETAILS].
3. That in order to ascertain the existing factual position and avoid future complications, appointment of a Local Commissioner is imperative.

PRAYER:
It is prayed that a Local Commissioner (advocate/revenue official) may kindly be appointed at applicant's expense to inspect the spot and submit report regarding existing possession.

Applicant
Date: [CURRENT_DATE]`},{id:"restoration-suit-order9",title:"Restoration of Dismissed Suit (بحالی مقدمہ)",urduTitle:"درخواست برائے بحالی مقدمہ خارج شدہ بر عدم پیروی",cpcSection:"Order 9 Rule 9 / Rule 4 C.P.C.",category:"procedure",description:"Application for restoration of civil suit dismissed for default of appearance (Adam Pairwi).",courtName:"IN THE COURT OF LEARNED CIVIL JUDGE, [DISTRICT_NAME]",suitType:"Civil Suit No. [SUIT_NO]",notes:["Must be filed within 30 days of dismissal.","Sufficient cause for non-appearance must be proven."],contentTemplate:`IN THE COURT OF LEARNED CIVIL JUDGE, [DISTRICT_NAME]

[PLAINTIFF_NAME]  VS  [DEFENDANT_NAME]

APPLICATION UNDER ORDER 9 RULE 9 C.P.C. FOR RESTORATION OF SUIT DISMISSED IN DEFAULT ON [DISMISSAL_DATE].

Respectfully Sheweth:
1. That the applicant instituted the titled suit which was fixed on [DISMISSAL_DATE].
2. That on the said date, the applicant could not appear in time due to [VALID_REASON_TRAFFIC_ILLNESS].
3. That when applicant reached court, he learned the case was dismissed in default.
4. That absence was neither intentional nor deliberate.

PRAYER:
It is humbly prayed that the order dated [DISMISSAL_DATE] dismissing the suit in default may graciously be recalled and suit be restored to its original number.

Applicant / Plaintiff`},{id:"set-aside-exparte",title:"Setting Aside Ex-Parte Decree / Order (یکطرفہ کارروائی)",urduTitle:"درخواست برائے منسوخی یکطرفہ کارروائی / یکطرفہ ڈگری",cpcSection:"Order 9 Rule 13 / Rule 7 C.P.C.",category:"procedure",description:"Application to set aside ex-parte proceeding or ex-parte decree passed against defendant.",courtName:"IN THE COURT OF LEARNED CIVIL JUDGE, [DISTRICT_NAME]",suitType:"Civil Suit No. [SUIT_NO]",notes:["Proof of non-service or defective summons.","Affidavit required."],contentTemplate:`IN THE COURT OF LEARNED CIVIL JUDGE, [DISTRICT_NAME]

[PLAINTIFF_NAME]  VS  [DEFENDANT_NAME]

APPLICATION UNDER ORDER 9 RULE 13 C.P.C. FOR SETTING ASIDE EX-PARTE DECREE DATED [DECREE_DATE].

Respectfully Sheweth:
1. That the applicant was never personally served with summons or notice of the titled suit.
2. That process server made fraudulent report without visiting the actual residence.
3. That applicant came to know about ex-parte decree only on [DATE_OF_KNOWLEDGE].

PRAYER:
It is prayed that the ex-parte decree dated [DECREE_DATE] may be set aside and applicant be allowed to contest on merits.

Applicant / Defendant`},{id:"order7-rule11-rejection",title:"Rejection of Plaint (خارجی بربنائے آرڈر 7 رول 11)",urduTitle:"درخواست برائے اخراج دعویٰ زیر آرڈر 7 رول 11 ضابطہ دیوانی",cpcSection:"Order 7 Rule 11 C.P.C.",category:"pleadings",description:"Application for threshold dismissal/rejection of plaint where no cause of action exists or suit is barred by law.",courtName:"IN THE COURT OF LEARNED CIVIL JUDGE, [DISTRICT_NAME]",suitType:"Civil Suit No. [SUIT_NO]",notes:["Ground: No cause of action disclosed.","Ground: Suit barred by statutory enactment."],contentTemplate:`IN THE COURT OF LEARNED CIVIL JUDGE, [DISTRICT_NAME]

[PLAINTIFF_NAME]  VS  [DEFENDANT_NAME]

APPLICATION UNDER ORDER 7 RULE 11 C.P.C. FOR REJECTION OF PLAINT.

Respectfully Sheweth:
1. That the plaint fails to disclose any viable cause of action against the applicant.
2. That the relief claimed is barred by the Limitation Act and specific jurisdiction laws.
3. That continuation of this litigation is an abuse of the judicial process.

PRAYER:
It is prayed that the plaint of the plaintiff may kindly be rejected with costs under Order 7 Rule 11 C.P.C.

Applicant / Defendant`},{id:"execution-petition-order21",title:"Execution Petition (درخواست برائے اجراء ڈگری)",urduTitle:"درخواست برائے اجراء ڈگری زیر آرڈر 21 ضابطہ دیوانی",cpcSection:"Order 21 Rule 10 & 11 C.P.C.",category:"execution",description:"Statutory tabular execution petition for satisfaction and enforcement of money/possession decree.",courtName:"IN THE COURT OF LEARNED CIVIL JUDGE (EXECUTING COURT), [DISTRICT_NAME]",suitType:"Execution Petition No. [EXEC_NO] / 2026",notes:["Tabular 10-column statement required by Order 21 Rule 11.","Certified copy of decree attached."],contentTemplate:`IN THE COURT OF LEARNED CIVIL JUDGE, [DISTRICT_NAME]
Execution Petition No. _________ / 2026

[DECREE_HOLDER_NAME]   ... Decree Holder (DH)
         VERSUS
[JUDGMENT_DEBTOR_NAME] ... Judgment Debtor (JD)

EXECUTION PETITION UNDER ORDER 21 RULE 11 C.P.C.

TABULAR STATEMENT OF PARTICULARS:
1. No. of Suit: Civil Suit No. [SUIT_NO]
2. Names of Parties: [DH_NAME] vs [JD_NAME]
3. Date of Decree: [DECREE_DATE]
4. Whether any Appeal filed: No appeal filed / Dismissed
5. Amount / Relief with costs: Rs. [DECREE_AMOUNT] with costs
6. Mode of Assistance required: By attachment and sale of property / arrest of JD.

PRAYER:
It is prayed that execution may be issued and decree satisfied through legal process.

Decree Holder
Through Counsel`},{id:"vakalatnama-standard",title:"Vakalatnama / Power of Attorney (وکالت نامہ بااختیار)",urduTitle:"وکالت نامہ برائے سول کورٹ و ہائی کورٹ",cpcSection:"Order 3 Rule 4 C.P.C. & Legal Practitioners Act",category:"procedure",description:"Complete legal authority power of attorney appointing advocate to plead, sign, compromise and appeal.",courtName:"IN THE COURT OF [COURT_NAME], [DISTRICT_NAME]",suitType:"Suit / Appeal / Execution",notes:["Executed on legal paper with requisite court fee stamps."],contentTemplate:`VAKALATNAMA / وکالت نامہ

IN THE COURT OF: [COURT_NAME], [DISTRICT_NAME]
Case Title: [PLAINTIFF_NAME]  VS  [DEFENDANT_NAME]

I / We, the undersigned [CLIENT_NAME], do hereby appoint and authorize:
[ADVOCATE_NAME], Advocate High Court / Supreme Court

To be my/our Advocate in the above stated matter:
1. To appear, plead, act and conduct all proceedings in this Court.
2. To sign plaints, written statements, applications, appeals, revisions and compromises.
3. To receive money, documents and issue valid receipts.

Signed and delivered on this [CURRENT_DATE].

Client Signature: __________________
Accepted by Advocate: ______________`},{id:"production-additional-docs",title:"Production of Additional Documents (پیشی دستاویزات)",urduTitle:"درخواست برائے پیشی دستاویزات بعد از فریم ایشوز",cpcSection:"Order 7 Rule 14(3) / Order 13 Rule 2 C.P.C.",category:"evidence",description:"Application to place on record essential public records, revenue fard or receipts after initial pleadings.",courtName:"IN THE COURT OF LEARNED CIVIL JUDGE, [DISTRICT_NAME]",suitType:"Civil Suit No. [SUIT_NO]",notes:["Relevance of document must be demonstrated.","Good cause for non-production earlier."],contentTemplate:`IN THE COURT OF LEARNED CIVIL JUDGE, [DISTRICT_NAME]

[PLAINTIFF_NAME]  VS  [DEFENDANT_NAME]

APPLICATION UNDER ORDER 7 RULE 14(3) C.P.C. FOR PLACING ADDITIONAL DOCUMENTS ON RECORD.

Respectfully Sheweth:
1. That the titled case is fixed for [STAGE_OF_CASE].
2. That certain vital public/revenue documents (Fard Malkiat, mutation extract, receipt) recently came to applicant's knowledge and custody.
3. That these documents are crucial for just adjudication of the dispute.

PRAYER:
It is prayed that the applicant may be permitted to place the listed documents on judicial record.

Applicant`},{id:"amendment-pleadings-order6",title:"Amendment of Plaint / Written Statement (ترمیم دعویٰ)",urduTitle:"درخواست برائے ترمیم دعویٰ زیر آرڈر 6 رول 17 ضابطہ دیوانی",cpcSection:"Order 6 Rule 17 C.P.C.",category:"pleadings",description:"Application for amendment of pleadings to determine real question in controversy without altering character of suit.",courtName:"IN THE COURT OF LEARNED CIVIL JUDGE, [DISTRICT_NAME]",suitType:"Civil Suit No. [SUIT_NO]",notes:["Must not introduce a completely new cause of action.","Proposed amendments clearly red-lined."],contentTemplate:`IN THE COURT OF LEARNED CIVIL JUDGE, [DISTRICT_NAME]

[PLAINTIFF_NAME]  VS  [DEFENDANT_NAME]

APPLICATION UNDER ORDER 6 RULE 17 C.P.C. FOR PERMISSION TO AMEND THE PLAINT.

Respectfully Sheweth:
1. That due to typographical error and subsequent development, certain necessary factual corrections are required in Para No. [PARA_NO].
2. That the proposed amendment does not change the nature or character of the suit.

PRAYER:
It is prayed that the applicant may graciously be permitted to submit the amended plaint attached herewith.

Applicant / Plaintiff`}];
