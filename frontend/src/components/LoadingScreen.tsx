import React, { useState, useEffect } from 'react';
import { Orbit, Compass, Activity } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingPhrases = [
    "Scanning timelines...",
    "Splitting realities...",
    "Generating alternate universes...",
    "Harmonizing quantum frequencies...",
    "Assembling cosmic report..."
  ];

  // Cycle phrases
  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev < loadingPhrases.length - 1 ? prev + 1 : prev));
    }, 1800);

    return () => clearInterval(textInterval);
  }, []);

  // Smooth progress bar filler
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(progressInterval);
          return 98;
        }
        // Increment slower as it gets closer to 100
        const step = Math.max(1, Math.floor((100 - prev) / 10));
        return prev + step;
      });
    }, 300);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 select-none text-center">
      {/* High-fidelity orbital spin visualizer */}
      <div className="relative w-40 h-40 mb-12 flex items-center justify-center">
        {/* Deep background pulsing nebula */}
        <div className="absolute w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute w-24 h-24 bg-purple-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Outer orbital ring */}
        <div className="absolute inset-0 border-2 border-dashed border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
        
        {/* Inner reverse orbital ring */}
        <div className="absolute inset-4 border border-purple-500/40 rounded-full animate-[spin_6s_linear_infinite_reverse]" />

        {/* Dynamic center icons */}
        <div className="absolute flex items-center justify-center animate-pulse">
          <Orbit className="text-cyan-400 w-12 h-12 animate-[spin_4s_linear_infinite]" />
        </div>
        <div className="absolute flex items-center justify-center">
          <Compass className="text-purple-400 w-6 h-6 animate-ping" />
        </div>
      </div>

      {/* Loading Phrasing and Text cycling */}
      <div className="space-y-4 max-w-md w-full">
        <div className="h-8">
          <h2 className="text-2xl font-bold tracking-widest font-cosmic text-white animate-pulse">
            {loadingPhrases[textIndex]}
          </h2>
        </div>
        
        <p className="text-sm text-slate-400 font-light tracking-wide h-6">
          {textIndex === 0 && "Locating anchor coordinates in temporal streams..."}
          {textIndex === 1 && "Decoupling outcome nodes and mapping bifurcation points..."}
          {textIndex === 2 && "Synthesizing deep narrative matrices from the nexus..."}
          {textIndex === 3 && "Aligning dimensional vectors and stabilizing metrics..."}
          {textIndex >= 4 && "Finalizing cosmic report graphics..."}
        </p>

        {/* Cosmic progress bar wrapper */}
        <div className="pt-6">
          <div className="w-full h-1.5 bg-white/5 border border-white/10 rounded-full overflow-hidden p-[1px]">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-400 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-2">
            <span className="flex items-center gap-1">
              <Activity size={10} className="text-cyan-400 animate-pulse" />
              Quantum Link: OK
            </span>
            <span>TIMELINE DEVIATION: {progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
