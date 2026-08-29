import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, Quote, Copy, Check, RefreshCw } from 'lucide-react';
import { playTypewriterSound } from '../utils/audioSynth';

export default function EtymologyMatrix() {
  const { data } = usePortfolio();

  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const concepts = [
    { title: "The Constellation Anchor", desc: "How childhood roof stargazing of the Big Dipper ('The Spoon') becomes an enduring constant amid family separation." },
    { title: "The Diaspora Paradox", desc: "Missing the hometown you swore never to return to, only to be perceived as an outsider upon returning." },
    { title: "The Immortality of Love", desc: "Why love requires letting go to achieve eternity: 'To last forever, you have to let it go.'" },
    { title: "The Lunar Connection", desc: "Shared gaze upon the moon across vast city distances connecting separated souls." },
    { title: "The Unsent Elegy", desc: "The quiet, devastating finality of memory and grief in 'This Man I Knew' and 'None Shall Realise.'" }
  ];

  const handleNextQuote = () => {
    playTypewriterSound();
    setCurrentQuoteIdx((prev) => (prev + 1) % data.quotes.length);
  };

  const activeQuote = data.quotes[currentQuoteIdx] || data.quotes[0];

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(`"${activeQuote.text}" — ${activeQuote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="matrix" className="section-container border-t border-glass">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-kicker"><Sparkles size={16} /> LITERARY MOTIFS</span>
          <h2 className="section-title">THEMES & PHILOSOPHICAL MATRIX</h2>
        </div>
        <p className="section-desc">
          Core thematic pillars and recurring motifs connecting the poems, essays, and stories of the manuscript collection.
        </p>
      </div>

      <div className="matrix-layout">
        {/* Concept Cards Grid */}
        <div className="concept-grid">
          {concepts.map((c, idx) => (
            <div key={idx} className="concept-card">
              <div className="concept-num font-mono">0{idx + 1}</div>
              <h4 className="concept-title">{c.title}</h4>
              <p className="concept-desc">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Quote Generator Box */}
        <div className="quote-box">
          <div className="quote-box-header">
            <span className="quote-box-label"><Quote size={16} /> LITERARY RANDOMIZER</span>
            <div className="quote-box-actions">
              <button 
                onClick={handleCopyQuote} 
                className="icon-btn-sm"
                title="Copy Quote"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
              <button 
                onClick={handleNextQuote} 
                className="icon-btn-sm"
                title="Next Quote"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          <blockquote className="quote-text font-serif">
            "{activeQuote.text}"
          </blockquote>

          <cite className="quote-author font-mono">
            — {activeQuote.author}
          </cite>
        </div>
      </div>
    </section>
  );
}
