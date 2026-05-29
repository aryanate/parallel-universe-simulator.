import React, { useState } from 'react';
import { Anchor, Zap, Shield, Shuffle, Sparkles, ChevronDown, ChevronUp, BookOpen, Smile } from 'lucide-react';
import type { UniverseItem } from '../services/api';

interface UniverseCardProps {
  universe: UniverseItem;
}

export const UniverseCard: React.FC<UniverseCardProps> = ({ universe }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Dynamic icon selector based on universe properties
  const getIcon = () => {
    const name = universe.name.toLowerCase();
    if (name.includes('current')) {
      return <Anchor className="w-5 h-5 text-cyan-400" />;
    }
    if (name.includes('brave') || name.includes('universe a')) {
      return <Zap className="w-5 h-5 text-amber-400" />;
    }
    if (name.includes('safe') || name.includes('universe b')) {
      return <Shield className="w-5 h-5 text-emerald-400" />;
    }
    if (name.includes('unexpected') || name.includes('universe c')) {
      return <Shuffle className="w-5 h-5 text-fuchsia-400" />;
    }
    return <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />;
  };

  const getBorderColor = () => {
    const name = universe.name.toLowerCase();
    if (name.includes('current')) return 'hover:border-cyan-500/40 border-cyan-500/10';
    if (name.includes('brave')) return 'hover:border-amber-500/40 border-amber-500/10';
    if (name.includes('safe')) return 'hover:border-emerald-500/40 border-emerald-500/10';
    if (name.includes('unexpected')) return 'hover:border-fuchsia-500/40 border-fuchsia-500/10';
    return 'hover:border-pink-500/40 border-pink-500/10';
  };

  const getGlowEffect = () => {
    const name = universe.name.toLowerCase();
    if (name.includes('current')) return 'rgba(6, 182, 212, 0.1)';
    if (name.includes('brave')) return 'rgba(245, 158, 11, 0.1)';
    if (name.includes('safe')) return 'rgba(16, 185, 129, 0.1)';
    if (name.includes('unexpected')) return 'rgba(217, 70, 239, 0.1)';
    return 'rgba(236, 72, 153, 0.1)';
  };

  // Turn probability into 0-100% string
  const percentage = Math.round(universe.probabilityScore * 100);

  return (
    <div 
      className={`glass-card p-6 flex flex-col justify-between cursor-pointer border ${getBorderColor()} ${
        isExpanded ? 'bg-white/[0.05] border-white/20' : ''
      }`}
      style={{
        boxShadow: isExpanded ? `0 15px 30px rgba(0, 0, 0, 0.4), 0 0 20px ${getGlowEffect()}` : undefined
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            {/* Timeline icon frame */}
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              {getIcon()}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                {universe.name}
              </span>
              <h3 className="text-lg font-bold text-white font-cosmic leading-tight">
                {universe.title}
              </h3>
            </div>
          </div>

          {/* Fictional Probability Indicator */}
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  className="stroke-white/5"
                  strokeWidth="3.5"
                  fill="transparent"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  className="stroke-cyan-500 transition-all duration-1000 ease-out"
                  strokeWidth="3.5"
                  fill="transparent"
                  strokeDasharray={100}
                  strokeDashoffset={100 - percentage}
                />
              </svg>
              <span className="absolute text-[10px] font-bold font-mono text-cyan-400">
                {percentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Narrative Summary */}
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          {universe.storySummary}
        </p>
      </div>

      {/* Expanded details (Smooth Transition) */}
      <div 
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[300px] opacity-100 mt-2 pt-4 border-t border-white/5' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="space-y-4">
          {/* Key Lesson */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen size={10} className="text-cyan-400" />
              Timeline Lesson
            </span>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-slate-200 text-xs italic leading-relaxed">
              "{universe.keyLesson}"
            </div>
          </div>

          {/* Emotional Tone badge */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Smile size={10} className="text-purple-400" />
              Emotional Tone:
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-medium text-purple-300 uppercase tracking-wider">
              {universe.emotionalTone}
            </span>
          </div>
        </div>
      </div>

      {/* Expand/Collapse Chevron Indicator */}
      <div className="flex justify-center mt-4 text-slate-500 hover:text-white transition-colors duration-200">
        {isExpanded ? (
          <div className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider">
            Collapse
            <ChevronUp size={14} />
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider">
            Expand Details
            <ChevronDown size={14} className="animate-bounce" />
          </div>
        )}
      </div>
    </div>
  );
};
