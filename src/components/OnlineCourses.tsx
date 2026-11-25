import React, { useState } from "react";
import { GraduationCap, Clock, Award, CheckCircle, BookOpen } from "lucide-react";
import { courses } from "../data/courses";
import { Course } from "../types";

export const OnlineCourses: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || "");
  const [activeModuleIdx, setActiveModuleIdx] = useState<number>(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(0);

  const currentCourse =
    (courses.find((c) => c.id === selectedCourseId) as unknown as Course) ||
    (courses[0] as unknown as Course);
  const currentModule = currentCourse?.modules?.[activeModuleIdx] || currentCourse?.modules?.[0];
  const activeLesson = currentModule?.lessons?.[activeLessonIdx] || currentModule?.lessons?.[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Professional Online Training & Courses</h3>
            <p className="text-xs text-slate-500">
              Spoken English, Legal Drafting, Computer IT Skills & Practical Syllabus
            </p>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
          Structured Curriculum
        </span>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {courses.map((c) => {
          const isSelected = c.id === selectedCourseId;
          return (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCourseId(c.id);
                setActiveModuleIdx(0);
                setActiveLessonIdx(0);
              }}
              className={`text-left p-4 rounded-xl border transition cursor-pointer space-y-2 flex flex-col justify-between ${
                isSelected
                  ? "bg-slate-950 text-white border-slate-950 shadow-md ring-2 ring-blue-500/40"
                  : "bg-slate-50 border-slate-200 hover:bg-blue-50/40 text-slate-900"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{c.icon}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isSelected ? "bg-blue-500/30 text-blue-300" : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {c.badge}
                  </span>
                </div>
                <h4 className="font-bold text-xs leading-tight">{c.title}</h4>
                <p className={`text-[11px] font-urdu ${isSelected ? "text-amber-300" : "text-amber-700"}`}>
                  {c.urduTitle}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[10px] opacity-80 pt-2 border-t border-slate-200/40">
                <Clock className="w-3 h-3" />
                <span>{c.duration}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Course Modules & Lesson Details */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div>
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>{currentCourse?.title} - Step-by-Step Curriculum</span>
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">{currentCourse?.description}</p>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>Free Certificate Track</span>
          </div>
        </div>

        {/* Modules Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {currentCourse?.modules?.map((mod, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveModuleIdx(idx);
                setActiveLessonIdx(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeModuleIdx === idx
                  ? "bg-blue-600 text-white font-bold shadow-xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              Module {idx + 1}: {mod.title}
            </button>
          ))}
        </div>

        {/* Lesson Navigator within active module */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {currentModule?.lessons?.map((les, idx) => (
            <button
              key={idx}
              onClick={() => setActiveLessonIdx(idx)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition cursor-pointer ${
                activeLessonIdx === idx
                  ? "bg-slate-950 text-amber-300 font-bold"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              Part {idx + 1}: {les.title}
            </button>
          ))}
        </div>

        {/* Active Lesson View */}
        {activeLesson && (
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase">
                {currentModule?.title} • Part {activeLessonIdx + 1}
              </span>
              <h5 className="font-bold text-slate-900 text-sm">{activeLesson.title}</h5>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono">
              {activeLesson.content}
            </div>

            {activeLesson.keyPoints && activeLesson.keyPoints.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-800 block">Key Takeaways & Points to Master:</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                  {activeLesson.keyPoints.map((top, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{top}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
