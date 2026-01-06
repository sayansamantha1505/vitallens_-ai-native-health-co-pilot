
import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, Send, RefreshCw, X, ShieldCheck, HeartPulse } from 'lucide-react';
import { analyzeIngredients } from './geminiService';
import { AnalysisResult, AppState } from './types';
import { AnalysisCard } from './components/AnalysisCard';

export default function App() {
  const [state, setState] = useState<AppState>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rawText, setRawText] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalysis = useCallback(async (content: string, type: 'image' | 'text') => {
    setState('analyzing');
    setError(null);
    try {
      const data = await analyzeIngredients({ type, content });
      setResult(data);
      setState('result');
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong during analysis.");
      setState('error');
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        setPreviewUrl(reader.result as string);
        handleAnalysis(base64, 'image');
      };
      reader.readAsDataURL(file);
    }
  };

  const reset = () => {
    setState('idle');
    setResult(null);
    setError(null);
    setRawText('');
    setPreviewUrl(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pb-20 max-w-4xl mx-auto">
      {/* Header */}
      <header className="w-full flex justify-between items-center py-6 mb-8">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={reset}>
          <div className="bg-slate-900 p-2 rounded-xl text-white group-hover:scale-110 transition-transform">
             <HeartPulse size={24} />
          </div>
          <h1 className="heading-font text-2xl font-black tracking-tighter text-slate-900">VitalLens</h1>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
          <ShieldCheck size={14} />
          <span>AI-POWERED CO-PILOT</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full flex-1">
        {state === 'idle' && (
          <div className="flex flex-col gap-8 py-10 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="text-center max-w-lg mx-auto mb-6">
              <h2 className="heading-font text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                Understand what's <span className="text-blue-600 underline decoration-blue-200 underline-offset-4">actually</span> inside.
              </h2>
              <p className="text-slate-500 text-lg">
                No filters, no settings. Just scan or paste ingredients, and I'll infer the trade-offs for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-80">
              {/* Visual Scanner */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group relative h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-3xl hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer overflow-hidden"
              >
                <div className="bg-blue-600 p-5 rounded-full text-white mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-200">
                  <Camera size={32} />
                </div>
                <h3 className="heading-font text-xl font-bold text-slate-800">Scan Label</h3>
                <p className="text-sm text-slate-500 mt-2 text-center">Tap to upload a photo of a food package</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange}
                />
              </div>

              {/* Text Input */}
              <div className="flex flex-col h-full bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex-1">
                   <textarea
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Or paste ingredients text here..."
                    className="w-full h-full resize-none border-none focus:ring-0 text-slate-700 placeholder:text-slate-300 text-base"
                  />
                </div>
                <button
                  disabled={!rawText.trim()}
                  onClick={() => handleAnalysis(rawText, 'text')}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={18} />
                  Analyze Text
                </button>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 mb-4">How it works</p>
              <div className="flex flex-wrap justify-center gap-8 text-slate-600 font-medium text-sm">
                <span className="flex items-center gap-2">1. Multimodal Intake</span>
                <span className="flex items-center gap-2">2. Intent Inference</span>
                <span className="flex items-center gap-2">3. Biological Trade-offs</span>
              </div>
            </div>
          </div>
        )}

        {state === 'analyzing' && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-8 animate-pulse">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-slate-100 flex items-center justify-center">
                 <RefreshCw className="animate-spin text-blue-600" size={40} />
              </div>
              <div className="absolute inset-0 w-24 h-24 rounded-full border-t-4 border-blue-600 animate-spin"></div>
            </div>
            <div className="space-y-3">
              <h2 className="heading-font text-3xl font-black text-slate-900">Reasoning...</h2>
              <div className="space-y-2 max-w-xs mx-auto">
                 <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 animate-[loading_2s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
                 </div>
                 <p className="text-slate-400 text-sm font-medium italic">Simulating metabolic impact chains</p>
              </div>
            </div>
            <style>{`
              @keyframes loading {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(250%); }
              }
            `}</style>
          </div>
        )}

        {state === 'result' && result && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
             {previewUrl && (
               <div className="w-full mb-8 relative rounded-3xl overflow-hidden h-48 md:h-64 shadow-inner bg-slate-100">
                  <img src={previewUrl} className="w-full h-full object-cover opacity-60 grayscale-[0.5]" alt="Scanned Label" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent"></div>
                  <button 
                    onClick={reset}
                    className="absolute top-4 right-4 bg-white/80 backdrop-blur p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <X size={20} />
                  </button>
               </div>
             )}
             <AnalysisCard result={result} />
             <div className="mt-12 flex justify-center">
               <button 
                  onClick={reset}
                  className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
               >
                 <RefreshCw size={18} />
                 Start New Scan
               </button>
             </div>
          </div>
        )}

        {state === 'error' && (
          <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
             <div className="bg-rose-50 text-rose-600 p-6 rounded-3xl border border-rose-100 mb-6">
                <X size={48} className="mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Analysis Failed</h3>
                <p className="text-sm opacity-80">{error}</p>
             </div>
             <button 
              onClick={reset}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
            >
              Back to Start
            </button>
          </div>
        )}
      </main>

      {/* Persistence Floating CTA for quick access */}
      {state === 'result' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-50 animate-in slide-in-from-bottom-10">
           <button 
             onClick={reset}
             className="px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-full font-bold shadow-2xl flex items-center gap-2 hover:bg-slate-50 transition-all"
           >
             <RefreshCw size={16} />
             Scan Another
           </button>
        </div>
      )}
    </div>
  );
}
