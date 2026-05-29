import React, { useState } from 'react';
import { StarfieldCanvas } from './components/StarfieldCanvas';
import { LandingPage } from './components/LandingPage';
import { LoadingScreen } from './components/LoadingScreen';
import { UniverseCard } from './components/UniverseCard';
import { WrappedReport } from './components/WrappedReport';
import { SharePanel } from './components/SharePanel';
import { generateUniverseReport } from './services/api';
import type { UniverseResponse } from './services/api';
import { Sparkles, RefreshCw, AlertCircle, Compass } from 'lucide-react';

type ScreenState = 'landing' | 'loading' | 'results';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>('landing');
  const [decision, setDecision] = useState('');
  const [report, setReport] = useState<UniverseResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (decisionText: string) => {
    setDecision(decisionText);
    setError(null);
    setScreen('loading');

    try {
      const result = await generateUniverseReport(decisionText);
      setReport(result);
      setScreen('results');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'The temporal links collapsed. Please try again.');
      setScreen('landing');
    }
  };

  const handleReset = () => {
    setDecision('');
    setReport(null);
    setError(null);
    setScreen('landing');
  };

  return (
    <div className="min-h-screen relative text-slate-100 flex flex-col justify-between">
      {/* 3D Twinkling Starfield Parallax Backdrop */}
      <StarfieldCanvas />

      {/* Floating Space Lines for depth */}
      <div className="space-line" style={{ left: '15%', animationDelay: '0s' }} />
      <div className="space-line" style={{ left: '45%', animationDelay: '2s' }} />
      <div className="space-line" style={{ left: '75%', animationDelay: '4s' }} />
      <div className="space-line" style={{ left: '90%', animationDelay: '1s' }} />

      {/* Dynamic Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5 backdrop-blur-sm z-50">
        <button 
          onClick={handleReset}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 group-hover:border-cyan-500/40 transition-colors duration-300">
            <Compass className="w-5 h-5 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <span className="font-cosmic font-extrabold tracking-wider text-sm uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-300">
            Parallel Universe Simulator
          </span>
        </button>

        {screen === 'results' && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 active:scale-95 transition-all duration-300"
          >
            <RefreshCw size={12} />
            Scan New Decision
          </button>
        )}
      </header>

      {/* Main Core View Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-6 relative z-10 flex items-center justify-center">
        {/* Error Alert Box */}
        {error && screen === 'landing' && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 max-w-md w-[90%] glass-panel-heavy p-4 border border-rose-500/30 flex items-start gap-3 z-50 animate-fade-in">
            <div className="p-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <AlertCircle size={16} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-cosmic">
                Quantum Disturbance
              </h4>
              <p className="text-xs text-rose-300 leading-relaxed">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Screen Switching */}
        {screen === 'landing' && <LandingPage onGenerate={handleGenerate} />}
        
        {screen === 'loading' && <LoadingScreen />}
        
        {screen === 'results' && report && (
          <div className="w-full py-10 space-y-12 animate-fade-in">
            {/* Top Headline for Results */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
                <Sparkles size={10} className="animate-spin" />
                Timelines De-synchronized
              </div>
              <h2 className="text-3xl md:text-5xl font-black font-cosmic text-white">
                Your Alternate Realities
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-lg mx-auto font-light">
                For the decision: <span className="text-slate-200 italic">"{decision}"</span>
              </p>
            </div>

            {/* Premium Infographic and Sharing Section */}
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center">
              <div className="w-full max-w-sm flex flex-col justify-center">
                <WrappedReport report={report} />
                <SharePanel report={report} />
              </div>

              {/* Universes Display Grid */}
              <div className="flex-grow w-full max-w-3xl space-y-6">
                <div className="text-xs font-bold tracking-widest text-slate-500 uppercase pb-2 border-b border-white/5 flex items-center gap-2">
                  <Compass size={12} className="text-cyan-400 animate-pulse" />
                  Select alternate cards to expand details
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {report.universes.map((uni, idx) => (
                    <UniverseCard key={idx} universe={uni} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Dynamic Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-mono tracking-widest uppercase z-50">
        <span>© 2026 Parallel Universe Simulator</span>
        <span className="flex items-center gap-1.5">
          Quantum status: Stable
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </span>
      </footer>
    </div>
  );
};

export default App;
