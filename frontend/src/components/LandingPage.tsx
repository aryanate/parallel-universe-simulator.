import React, { useState } from 'react';
import { Sparkles, Compass, Milestone, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGenerate: (decision: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGenerate }) => {
  const [decision, setDecision] = useState('');

  const examples = [
    { text: "I switched jobs.", icon: Compass },
    { text: "I moved to another city.", icon: Milestone },
    { text: "I never confessed my feelings.", icon: Sparkles },
    { text: "I started my own business.", icon: ArrowRight },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (decision.trim()) {
      onGenerate(decision.trim());
    }
  };

  const handleExampleClick = (text: string) => {
    setDecision(text);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 py-8 animate-fade-in">
      <div className="max-w-3xl w-full text-center mb-10 space-y-4">
        {/* Floating badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-medium tracking-wide text-cyan-400 uppercase animate-bounce">
          <Sparkles size={12} className="text-cyan-400" />
          Quantum Reality Scanner
        </div>

        {/* Large Cosmic Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-cosmic text-white">
          Which <span className="gradient-text-cosmic glow-text-purple">Universe</span> Are You From?
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
          Every decision creates a different story. Unlock the paths your life could have taken.
        </p>
      </div>

      {/* Main glass panel input form */}
      <div className="glass-panel max-w-2xl w-full p-8 md:p-10 relative overflow-hidden group">
        {/* Visual elements inside the glass container */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10 group-hover:bg-cyan-500/15 transition-all duration-700" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10 group-hover:bg-purple-500/15 transition-all duration-700" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold tracking-wider text-cyan-400 uppercase" htmlFor="decision-input">
              Describe a decision that changed your life...
            </label>
            <textarea
              id="decision-input"
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              placeholder="e.g. Ten years ago, I decided to quit my corporate job and travel the world, or I chose to stay in my hometown instead of moving..."
              maxLength={400}
              className="w-full h-36 px-4 py-3 bg-cosmic-dark/50 border border-white/10 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-slate-500 outline-none resize-none transition-all duration-300 text-base leading-relaxed"
            />
            <div className="flex justify-end text-xs text-slate-500">
              {decision.length} / 400 characters
            </div>
          </div>

          {/* Interactive example capsules */}
          <div className="space-y-3">
            <span className="text-xs font-medium text-slate-500 tracking-wider uppercase block">
              Need inspiration? Try these timelines:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {examples.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleExampleClick(item.text)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-left text-sm text-slate-300 hover:bg-white/5 hover:border-cyan-400/30 hover:text-white transition-all duration-300 ease-out active:scale-95"
                  >
                    <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Icon size={14} />
                    </div>
                    <span className="truncate">{item.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            disabled={!decision.trim()}
            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold tracking-wider uppercase transition-all duration-300 text-sm ${
              decision.trim()
                ? 'glow-button-purple bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-600 text-white hover:from-purple-500 hover:to-cyan-500 cursor-pointer active:scale-[0.98]'
                : 'bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Sparkles size={16} className={decision.trim() ? "animate-spin" : ""} />
            Scan Parallel Timelines
            <ArrowRight size={16} className="ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
};
