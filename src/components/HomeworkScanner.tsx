import React, { useState } from "react";
import { Camera, Upload, CheckCircle2, Sparkles, Image as ImageIcon, ArrowRight } from "lucide-react";

interface HomeworkScannerProps {
  onScanResult: (query: string) => void;
}

export const HomeworkScanner: React.FC<HomeworkScannerProps> = ({ onScanResult }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState<string>("");
  const [isScanning, setIsScanning] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
        runSimulatedOCR();
      };
      reader.readAsDataURL(file);
    }
  };

  const runSimulatedOCR = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const recognized = "Solve quadratic equation 2x² - 4x - 6 = 0 using standard formula and show all intermediate discriminant steps.";
      setOcrText(recognized);
    }, 1200);
  };

  const presets = [
    {
      title: "Algebra & Quadratic Equation",
      text: "Solve: 3x² + 5x - 2 = 0 step by step",
    },
    {
      title: "Physics Mechanics Question",
      text: "A car of mass 1200 kg accelerates at 2.5 m/s². Calculate the net forward force acting on it.",
    },
    {
      title: "Urdu / Hinglish Grammar Query",
      text: "Ism-e-Marfa aur Ism-e-Nakra ki wazahat misalon ke sath karein",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Textbook & Homework Scanner</h3>
            <p className="text-xs text-slate-500">Upload or snap homework photo for instant OCR & Guru solution</p>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 font-bold border border-orange-200">
          Vision OCR
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Upload Box */}
        <label className="border-2 border-dashed border-slate-200 hover:border-amber-400 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition bg-slate-50/50 hover:bg-amber-50/30">
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          {preview ? (
            <img src={preview} alt="Homework preview" className="max-h-48 rounded-lg object-contain" />
          ) : (
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-slate-800">Tap to upload textbook photo or screenshot</p>
              <p className="text-[11px] text-slate-400">Supports PNG, JPG, JPEG documents</p>
            </div>
          )}
        </label>

        {/* OCR Result Box */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-bold text-slate-700 block mb-1">Detected Question / OCR Text:</span>
            {isScanning ? (
              <div className="flex items-center gap-2 text-xs text-amber-600 font-semibold py-8">
                <div className="w-4 h-4 rounded-full border-2 border-amber-600 border-t-transparent animate-spin" />
                <span>Extracting question from image...</span>
              </div>
            ) : (
              <textarea
                value={ocrText}
                onChange={(e) => setOcrText(e.target.value)}
                placeholder="Uploaded textbook text or type question manually here..."
                rows={4}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500 text-slate-900"
              />
            )}
          </div>

          <button
            onClick={() => {
              if (ocrText.trim()) onScanResult(ocrText);
            }}
            disabled={!ocrText.trim() || isScanning}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>Solve with S.S AI Study Guru</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Sample Homework Questions */}
      <div className="pt-2">
        <span className="text-xs font-bold text-slate-600 block mb-2">Or test sample homework questions:</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setOcrText(p.text);
                onScanResult(p.text);
              }}
              className="p-2.5 text-left rounded-xl border border-slate-200 bg-white hover:bg-amber-50 hover:border-amber-300 transition text-xs space-y-1 cursor-pointer"
            >
              <div className="font-bold text-slate-800 text-[11px]">{p.title}</div>
              <div className="text-[10px] text-slate-500 line-clamp-2">{p.text}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
