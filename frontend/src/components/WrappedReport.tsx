import React from 'react';
import { Sparkles, Orbit, Milestone, Brain, BookOpen } from 'lucide-react';
import type { UniverseResponse } from '../services/api';

interface WrappedReportProps {
  report: UniverseResponse;
}

export const WrappedReport: React.FC<WrappedReportProps> = ({ report }) => {
  return (
    <div className="flex justify-center w-full my-8">
      {/* 
        This outer container has a exact ID and fixed-aspect proportions 
        to ensure it compiles beautifully in html2canvas as a premium social share card.
      */}
      <div 
        id="wrapped-card"
        className="w-[360px] h-[640px] bg-gradient-wrapped border-2 border-white/10 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between text-left select-none"
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 50px rgba(168, 85, 247, 0.15)'
        }}
      >
        {/* Abstract space graphic background layers */}
        <div className="absolute top-[-100px] left-[-100px] w-64 h-64 rounded-full bg-purple-600/30 blur-[80px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 rounded-full bg-cyan-500/25 blur-[80px]" />
        <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-pink-500/10 blur-[50px]" />
        
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        
        {/* Header Block */}
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold tracking-widest text-cyan-400 uppercase font-mono mb-1">
              <Orbit size={12} className="animate-spin text-cyan-400" />
              Nexus Sequence
            </div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-cosmic">
              Parallel Universe Report
            </h4>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold font-mono text-cyan-300">
            {report.universeId}
          </span>
        </div>

        {/* Center Infographic Content */}
        <div className="relative z-10 space-y-7 my-auto">
          {/* Primary Trait */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 tracking-wider uppercase">
              <Brain size={13} className="text-purple-400" />
              Primary Trait
            </div>
            <h2 className="text-4xl font-black font-cosmic text-white tracking-tight leading-none drop-shadow-md">
              {report.primaryTrait}
            </h2>
          </div>

          {/* Current Path */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 tracking-wider uppercase">
              <Milestone size={13} className="text-cyan-400" />
              Current Timeline
            </div>
            <div className="inline-flex px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-sm font-extrabold text-cyan-300">
              {report.currentTimelineTitle}
            </div>
          </div>

          {/* Alternate Self */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 tracking-wider uppercase">
              <Sparkles size={13} className="text-amber-400" />
              Most Probable Alternate
            </div>
            <div className="inline-flex px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm font-extrabold text-amber-300">
              {report.mostProbableAlternateTitle}
            </div>
          </div>

          {/* Reflection Quote */}
          <div className="space-y-1 pt-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 tracking-widest uppercase">
              <BookOpen size={10} className="text-pink-400" />
              Reflection
            </div>
            <p className="text-sm md:text-base font-medium italic text-slate-200 leading-relaxed font-serif relative">
              <span className="text-4xl text-purple-500 absolute top-[-10px] left-[-8px] leading-none opacity-40">“</span>
              <span className="relative z-10 pl-2">
                {report.reflectionQuote}
              </span>
            </p>
          </div>
        </div>

        {/* Footer Branding */}
        <div className="relative z-10 border-t border-white/5 pt-4 flex justify-between items-center text-[9px] font-mono tracking-widest text-slate-600 uppercase">
          <span>PARALLEL-UNIVERSE.SIM</span>
          <span className="flex items-center gap-1">
            Scan complete
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          </span>
        </div>
      </div>
    </div>
  );
};
