// Notebook Sample Data & Presets for S.S AI Study Guru

export interface NotebookEntry {
  id: string;
  title: string;
  category: "exam" | "legal" | "science" | "revenue" | "general";
  content: string;
  tags: string[];
  createdAt: string;
}

export const initialNotebookEntries: NotebookEntry[] = [
  {
    id: "note_1",
    title: "Order 39 Rule 1 & 2 CPC Stay Pillars",
    category: "legal",
    content: "3 Golden Pillars for Interim Injunction:\n1. Prima Facie Case (Strong arguable case on record)\n2. Balance of Convenience (In favour of applicant)\n3. Irreparable Loss & Injury (Cannot be compensated in terms of money)",
    tags: ["CPC 1908", "Stay Application", "Civil Court"],
    createdAt: "2026-08-29",
  },
  {
    id: "note_2",
    title: "Mitochondria - Powerhouse of Cell",
    category: "science",
    content: "Key Points:\n- Double membrane organelle\n- Generates ATP (Adenosine Triphosphate) through cellular respiration\n- Has its own circular DNA and 70S ribosomes",
    tags: ["Biology", "Class 10", "Cell Structure"],
    createdAt: "2026-08-29",
  },
  {
    id: "note_3",
    title: "Fard Intikhab & Mutation Checklist",
    category: "revenue",
    content: "Requisite documents for Revenue Tehsildar verification:\n- Khasra Girdawari Copy\n- Jamabandi / RoR extract\n- Identity proof & Sale Deed / Inheritance proof",
    tags: ["Revenue", "Patwari", "Land Records"],
    createdAt: "2026-08-29",
  },
];
