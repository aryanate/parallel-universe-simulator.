import React, { useState } from 'react';
import { Download, Copy, Check, Sparkles, AlertCircle } from 'lucide-react';
import type { UniverseResponse } from '../services/api';
import html2canvas from 'html2canvas-pro';

interface SharePanelProps {
  report: UniverseResponse;
}

export const SharePanel: React.FC<SharePanelProps> = ({ report }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showInstaGuide, setShowInstaGuide] = useState(false);

  // Download high-resolution poster card image via html2canvas
  const handleDownload = async () => {
    const element = document.getElementById('wrapped-card');
    if (!element) {
      alert("Target card element not found in DOM.");
      return;
    }

    try {
      setIsDownloading(true);
      
      // Give a tiny timeout for rendering stability
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Modern html2canvas configuration (resilient to page scroll and cross-origin taint issues)
      const canvas = await html2canvas(element, {
        scale: 3, // Multiplies canvas pixels for highly crisp, premium, high-DPI share cards
        backgroundColor: '#030014', // Solid dark backdrop to avoid transparency issues
        logging: true, // Enable logging for debugging
        useCORS: true, // Solve potential cross-origin font/image taint issues
        allowTaint: false, // Ensure canvas does not get tainted so toDataURL can run
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `parallel-universe-report-${report.universeId.replace('#', '')}.png`;
      
      // Firefox & Safari compatibility: element MUST be attached to DOM body to trigger click download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      console.error('Failed to compile stardust canvas:', err);
      alert(`Stardust capture failed: ${err.message || 'Unknown render error'}. Please take a screenshot of your report card instead!`);
    } finally {
      setIsDownloading(false);
    }
  };

  // Compile clipboard sharing text
  const shareText = `🌌 PARALLEL UNIVERSE SIMULATOR REPORT 🌌
  
Universe Sequence: ${report.universeId}
Primary Quantum Trait: ${report.primaryTrait}
Current Self: ${report.currentTimelineTitle}
Alternate Self: ${report.mostProbableAlternateTitle}

Reflection: "${report.reflectionQuote}"

Explore your own parallel realities: http://localhost:5173 🚀`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  // Open LinkedIn share feed
  const handleLinkedInShare = () => {
    handleCopyText();
    // Prompting LinkedIn feed URL
    const url = encodeURIComponent('http://localhost:5173');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  return (
    <div className="glass-panel p-6 max-w-sm w-full mx-auto space-y-4 text-center mt-6">
      <h3 className="text-sm font-bold tracking-wider uppercase text-cyan-400 font-cosmic">
        Share Your Temporal Sequence
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {/* Download Button */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-white/5 bg-white/[0.02] text-xs font-semibold text-slate-300 hover:bg-white/5 hover:border-cyan-500/30 hover:text-white transition-all duration-300 active:scale-95 disabled:opacity-50"
        >
          {isDownloading ? (
            <Sparkles size={16} className="text-cyan-400 animate-spin" />
          ) : (
            <Download size={16} className="text-cyan-400" />
          )}
          <span>{isDownloading ? 'Rendering...' : 'Download Card'}</span>
        </button>

        {/* Copy Text Button */}
        <button
          onClick={handleCopyText}
          className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-white/5 bg-white/[0.02] text-xs font-semibold text-slate-300 hover:bg-white/5 hover:border-purple-500/30 hover:text-white transition-all duration-300 active:scale-95"
        >
          {isCopied ? (
            <Check size={16} className="text-emerald-400 animate-bounce" />
          ) : (
            <Copy size={16} className="text-purple-400" />
          )}
          <span>{isCopied ? 'Copied!' : 'Copy Summary'}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Share on LinkedIn */}
        <button
          onClick={handleLinkedInShare}
          className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[#0077b5]/20 bg-[#0077b5]/5 text-slate-300 hover:bg-[#0077b5]/10 hover:border-[#0077b5]/40 hover:text-white text-xs font-semibold transition-all duration-300 active:scale-95"
        >
          <svg className="w-3.5 h-3.5 fill-[#0077b5]" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          LinkedIn
        </button>

        {/* Share on Instagram Guide toggle */}
        <button
          onClick={() => setShowInstaGuide(!showInstaGuide)}
          className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[#e1306c]/20 bg-[#e1306c]/5 text-slate-300 hover:bg-[#e1306c]/10 hover:border-[#e1306c]/40 hover:text-white text-xs font-semibold transition-all duration-300 active:scale-95"
        >
          <svg className="w-3.5 h-3.5 text-[#e1306c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          Instagram
        </button>
      </div>

      {/* Instagram Sharing Guide (highly user-friendly fallback) */}
      {showInstaGuide && (
        <div className="p-3 text-left rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-400 leading-relaxed space-y-2 animate-fade-in">
          <div className="flex items-start gap-1.5 text-amber-400 font-semibold uppercase tracking-wider text-[9px] mb-1">
            <AlertCircle size={12} className="mt-[1px]" />
            Instagram Story Instructions
          </div>
          <p>
            Instagram restricts direct browser-to-story uploads. Here is the easiest way to share:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-slate-300">
            <li>Click <strong className="text-cyan-400">Download Card</strong> above to save your premium infographic.</li>
            <li>Click <strong className="text-purple-400">Copy Summary</strong> to save your deep reflection caption.</li>
            <li>Open Instagram, select your downloaded card, add the copied text, and share to your Story!</li>
          </ol>
        </div>
      )}
    </div>
  );
};
