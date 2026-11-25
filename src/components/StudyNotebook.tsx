import React, { useState } from "react";
import { BookOpen, Plus, Trash2, CheckCircle2, Bookmark as BookmarkIcon } from "lucide-react";
import { initialNotebook } from "../data/initialNotebook";
import { Bookmark } from "../types";

export const StudyNotebook: React.FC = () => {
  const [notes, setNotes] = useState<Bookmark[]>(initialNotebook);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("General");
  const [newSnippet, setNewSnippet] = useState("");

  const handleAddNote = () => {
    if (!newTitle.trim() || !newSnippet.trim()) return;
    const newNote: Bookmark = {
      id: "n-" + Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      date: "Just now",
      snippet: newSnippet.trim(),
      prompt: newTitle.trim(),
      tab: "study_guru",
    };
    setNotes([newNote, ...notes]);
    setNewTitle("");
    setNewSnippet("");
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Study Notebook & Revision Deck</h3>
            <p className="text-xs text-slate-500">Save custom formula sheets, Urdu grammar rules & exam summaries</p>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold border border-purple-200">
          Personal Deck
        </span>
      </div>

      {/* Add New Note Box */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
        <div className="text-xs font-bold text-slate-700">Add Quick Study Note / Formula:</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="Topic title (e.g. Newton 3rd Law)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-900"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-900"
          >
            <option value="Urdu">Urdu Grammar</option>
            <option value="Math">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Civil Court">Civil Court</option>
            <option value="General">General Knowledge</option>
          </select>
          <button
            onClick={handleAddNote}
            disabled={!newTitle.trim() || !newSnippet.trim()}
            className="py-2 px-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            <span>Save to Notebook</span>
          </button>
        </div>
        <textarea
          placeholder="Enter core explanation, formula notes, or key points to memorize..."
          value={newSnippet}
          onChange={(e) => setNewSnippet(e.target.value)}
          rows={2}
          className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-900"
        />
      </div>

      {/* Saved Notes List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-purple-300 transition space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                  {note.category}
                </span>
                <span className="text-[10px] text-slate-400">{note.date}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">{note.title}</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-wrap">{note.snippet}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-purple-600 font-semibold flex items-center gap-1">
                <BookmarkIcon className="w-3 h-3 fill-purple-600" />
                <span>Saved Entry</span>
              </span>
              <button
                onClick={() => handleDelete(note.id)}
                className="p-1 text-slate-400 hover:text-red-600 transition cursor-pointer"
                title="Delete Note"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
