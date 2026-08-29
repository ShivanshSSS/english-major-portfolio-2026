import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, Quote, Copy, Check, RefreshCw } from 'lucide-react';
import { playTypewriterSound } from '../utils/audioSynth';

export default function EtymologyMatrix() {
  const { data } = usePortfolio();

  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const concepts = [
    { title: "Algorithmic Post-Humanism", desc: "How agency operates when text is co-created by autonomous agents." },
    { title: "Synthetic Elegies", desc: "Poetic mourning constructed through vector similarity in neural models." },
    { title: "Digital Gothic", desc: "The haunting return of 19th-century romantic tropes in dark-mode UIs." },
    { title: "Hermeneutic Audits", desc: "Rigorous linguistic critique of high-parameter generative outputs." },
    { title: "Temporal Dislocation", desc: "Collapsing Renaissance incunabula with 2026 sublingual code." }
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
          <span className="section-kicker"><Sparkles size={16} /> HUMANITIES LAB</span>
          <h2 className="section-title">ETYMOLOGY & THEORY MATRIX</h2>
        </div>
        <p className="section-desc">
          Interactive concept map connecting 2026 digital humanities methodologies with timeless literary theory.
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
