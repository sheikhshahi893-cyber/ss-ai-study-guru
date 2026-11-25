import React, { useState } from "react";
import { X, BookMarked, Plus, Trash2, CheckCircle2, Copy, Check } from "lucide-react";
import { initialNotebookEntries, NotebookEntry } from "../data/notebookData";

interface NotebookNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotebookNotesModal: React.FC<NotebookNotesModalProps> = ({ isOpen, onClose }) => {
  const [entries, setEntries] = useState<NotebookEntry[]>(initialNotebookEntries);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newEntry: NotebookEntry = {
      id: "note_" + Date.now(),
      title: newTitle,
      category: "general",
      content: newContent,
      tags: ["Quick Note"],
      createdAt: new Date().toISOString().split("T")[0],
    };

    setEntries([newEntry, ...entries]);
    setNewTitle("");
    setNewContent("");
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white space-y-4 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Study Notebook & Saved Notes</h3>
              <p className="text-xs text-slate-400">Quick exam formulas, legal pointers & personal notes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add Form */}
        <form onSubmit={handleAdd} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
          <input
            type="text"
            placeholder="Note Title (e.g., Chemistry Periodic Trends)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400"
          />
          <textarea
            rows={2}
            placeholder="Write note content or paste AI solution..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400 resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Save Note</span>
            </button>
          </div>
        </form>

        {/* Entries List */}
        <div className="space-y-3 overflow-y-auto custom-scrollbar flex-1 pr-1">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-800 text-amber-400 border border-slate-700">
                    {entry.category}
                  </span>
                  <h4 className="text-sm font-bold text-white">{entry.title}</h4>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(entry.content, entry.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                    title="Copy"
                  >
                    {copiedId === entry.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-1 rounded-lg text-slate-500 hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                {entry.content}
              </p>
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                <span>{entry.createdAt}</span>
                <div className="flex gap-1">
                  {entry.tags.map((tag, idx) => (
                    <span key={idx} className="bg-slate-900 px-1.5 py-0.5 rounded-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotebookNotesModal;
