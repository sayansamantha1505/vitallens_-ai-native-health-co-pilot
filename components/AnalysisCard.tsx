
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Zap, 
  ZapOff, 
  AlertCircle, 
  Check, 
  Minus, 
  HelpCircle, 
  Ban, 
  AlertTriangle, 
  Shield, 
  Candy, 
  Layers 
} from 'lucide-react';
import { AnalysisResult, IngredientAnalysis, IngredientInteraction } from '../types';

interface Props {
  result: AnalysisResult;
}

const CategoryTag: React.FC<{ category: IngredientAnalysis['category'] }> = ({ category }) => {
  const config = {
    Beneficial: { icon: Check, style: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    Neutral: { icon: Minus, style: 'bg-slate-100 text-slate-700 border-slate-200' },
    Questionable: { icon: HelpCircle, style: 'bg-amber-100 text-amber-700 border-amber-200' },
    Avoid: { icon: Ban, style: 'bg-rose-100 text-rose-700 border-rose-200' },
    Allergen: { icon: AlertTriangle, style: 'bg-orange-100 text-orange-700 border-orange-200' },
    Preservative: { icon: Shield, style: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    Sweetener: { icon: Candy, style: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
    Stabilizer: { icon: Layers, style: 'bg-violet-100 text-violet-700 border-violet-200' },
  };

  const current = config[category] || config.Neutral;
  const Icon = current.icon;

  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${current.style}`}>
      <Icon size={10} strokeWidth={3} />
      {category}
    </span>
  );
};

const InteractionBadge: React.FC<{ impact: IngredientInteraction['impact'] }> = ({ impact }) => {
  const icons = {
    Synergy: <Zap size={14} className="text-emerald-500" />,
    Conflict: <ZapOff size={14} className="text-rose-500" />,
    Caution: <AlertCircle size={14} className="text-amber-500" />,
  };

  const labels = {
    Synergy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Conflict: 'bg-rose-50 text-rose-700 border-rose-100',
    Caution: 'bg-amber-50 text-amber-700 border-amber-100',
  };

  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border ${labels[impact]}`}>
      {icons[impact]}
      {impact}
    </span>
  );
};

export const AnalysisCard: React.FC<Props> = ({ result }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIngredients = useMemo(() => {
    return result.ingredients.filter((ing) =>
      ing.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [result.ingredients, searchTerm]);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Intent Inference Section */}
      <section className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
        <h3 className="text-sm font-semibold text-blue-900 heading-font mb-1 uppercase tracking-tight">Context Inference</h3>
        <p className="text-blue-800 italic leading-relaxed">
          "Based on what I see, {result.inferredIntent.toLowerCase()}"
        </p>
      </section>

      {/* Narrative Summary */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
           <div className="h-px flex-1 bg-slate-200"></div>
           <h2 className="text-2xl font-extrabold heading-font text-slate-900 px-4">The Verdict</h2>
           <div className="h-px flex-1 bg-slate-200"></div>
        </div>
        <p className="text-lg text-slate-700 leading-snug">
          {result.summary}
        </p>
        <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl">
          <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Suggested Motion</h4>
          <p className="text-lg font-medium">{result.suggestedAction}</p>
        </div>
      </section>

      {/* Ingredients Reasoning Grid */}
      <section className="space-y-10">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Key Ingredients Reasoning</h3>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
              <input
                type="text"
                placeholder="Find an ingredient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-300"
              />
            </div>
          </div>

          {filteredIngredients.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredIngredients.map((ing, idx) => (
                <div key={idx} className="glass-card p-5 rounded-2xl border border-slate-100 hover:border-slate-300 transition-all group animate-in zoom-in-95 duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-slate-800 text-lg">{ing.name}</h4>
                    <CategoryTag category={ing.category} />
                  </div>
                  <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                    <span className="font-semibold text-slate-800">The Why:</span> {ing.significance}
                  </p>
                  <div className="bg-white/50 p-3 rounded-lg border border-dashed border-slate-200 group-hover:bg-white transition-colors">
                    <p className="text-xs text-slate-500 leading-relaxed italic">
                       <span className="font-bold uppercase text-[9px] text-slate-400 mr-1">Trade-off</span> {ing.tradeOffs}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200 animate-in fade-in duration-300">
              <p className="text-slate-400 font-medium italic">No ingredients found matching "{searchTerm}"</p>
            </div>
          )}
        </div>

        {/* Interaction Subsection */}
        {result.ingredientInteractions && result.ingredientInteractions.length > 0 && (
          <div className="bg-slate-50 rounded-[2.5rem] p-8 space-y-6 border border-slate-200/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <Zap size={20} className="text-blue-600" />
              </div>
              <h4 className="text-sm font-bold text-slate-600 uppercase tracking-[0.2em]">Synergies & Conflicts</h4>
            </div>
            <div className="grid gap-4 md:grid-cols-1">
              {result.ingredientInteractions.map((inter, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800 text-sm tracking-tight">{inter.name}</span>
                    <InteractionBadge impact={inter.impact} />
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {inter.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Uncertainty & Logic */}
      <footer className="pt-8 border-t border-slate-100 flex flex-col gap-6">
        <div className="bg-slate-100/50 p-4 rounded-xl text-xs text-slate-500 italic">
          <span className="font-bold text-slate-400 uppercase mr-2">Logic Path:</span> 
          {result.reasoningChain}
        </div>
        <div className="flex items-center gap-3 px-2">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
          <p className="text-sm font-medium text-slate-600">
            {result.uncertaintyDisclaimer}
          </p>
        </div>
      </footer>
    </div>
  );
};
