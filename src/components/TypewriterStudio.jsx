import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { playTypewriterSound, playTypewriterBell, playPageFlipSound } from '../utils/audioSynth';
import { Feather, Download, Printer, Sparkles } from 'lucide-react';

export default function TypewriterStudio() {
  const { data } = usePortfolio();
  const studioTexts = data.siteTexts?.typewriter || {};

  const [typedText, setTypedText] = useState(
    "To the Reader,\n\n“The ‘spoon’ became, overtime, a part of my family... Too many variables. Only one constant: The Spoon.”\n\n— The Spoon (Manuscript #07)"
  );
  const [paperTone, setPaperTone] = useState('aged-cream'); // 'aged-cream', 'antique-rose', 'monastic-slate'
  const [inkColor, setInkColor] = useState('black-walnut'); // 'black-walnut', 'imperial-crimson', 'prussian-blue'

  const prompts = [
    { label: "The Spoon", text: "An old memory of me, my brother, my mother just looking at stars, as we all together, lied down on the roof.\nShe told me, for I was 8, about the “Big Dipper”. Everyday we’ll go up there and I’ll just be dazzled by this “spoon” hanging in the sky." },
    { label: "Roots", text: "“Mandi jaa rha mai toh, aap kidhar?”\n\nI replied, in the thickest Mandyali accent I could bring out:\n“Ghar haaya tithe ta mera; ghara chalira haun (My house is there so I’m going home).”" },
    { label: "The Seasons of Love", text: "I shall compare you to a Summer’s Day\nYou shine brighter than the Sun\nGiving me hope, giving me love\nYet somedays, like the June Gloom covering the Sun,\nYour brightness turns grim\nAnd I stop smiling..." }
  ];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      playTypewriterBell();
    } else if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Space') {
      playTypewriterSound();
    }
  };

  const handleLoadPrompt = (promptText) => {
    playPageFlipSound();
    setTypedText(promptText);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPostcard = () => {
    const element = document.createElement("a");
    const file = new Blob([typedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "manuscript_draft.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="studio" className="typewriter-studio-section border-t border-cream-accent">
      <div className="section-header text-center">
        <div className="ornamental-header-divider">
          <span>❧</span>
          <span className="divider-line"></span>
          <span className="section-kicker"><Feather size={15} /> {studioTexts.kicker || "WRITING DESK"}</span>
          <span className="divider-line"></span>
          <span>❧</span>
        </div>
        <h2 className="section-title font-display">{studioTexts.title || "THE TYPEWRITER STUDIO"}</h2>
        <p className="section-desc mx-auto">
          {studioTexts.description || "An interactive writing desk. Type your own words with tactile key clicks, switch ink colors, and draft your own notes."}
        </p>
      </div>

      <div className="typewriter-studio-layout">
        {/* Left Controls & Inks Panel */}
        <div className="studio-sidebar">
          <div className="sidebar-group">
            <span className="group-label font-mono"><Sparkles size={13} /> LITERARY INSPIRATIONS:</span>
            <div className="prompts-list">
              {prompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLoadPrompt(p.text)}
                  className="prompt-pill font-serif"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-group">
            <span className="group-label font-mono">PARCHMENT GRAIN:</span>
            <div className="paper-swatches">
              <button 
                className={`paper-btn aged-cream ${paperTone === 'aged-cream' ? 'active' : ''}`}
                onClick={() => setPaperTone('aged-cream')}
              >
                Aged Cream
              </button>
              <button 
                className={`paper-btn antique-rose ${paperTone === 'antique-rose' ? 'active' : ''}`}
                onClick={() => setPaperTone('antique-rose')}
              >
                Antique Vellum
              </button>
              <button 
                className={`paper-btn monastic-slate ${paperTone === 'monastic-slate' ? 'active' : ''}`}
                onClick={() => setPaperTone('monastic-slate')}
              >
                Oxford Linen
              </button>
            </div>
          </div>

          <div className="sidebar-group">
            <span className="group-label font-mono">RIBBON INK:</span>
            <div className="ink-swatches">
              <button 
                className={`ink-btn ${inkColor === 'black-walnut' ? 'active' : ''}`}
                onClick={() => setInkColor('black-walnut')}
              >
                Walnut Black
              </button>
              <button 
                className={`ink-btn ${inkColor === 'imperial-crimson' ? 'active' : ''}`}
                onClick={() => setInkColor('imperial-crimson')}
              >
                Iron Gall Crimson
              </button>
              <button 
                className={`ink-btn ${inkColor === 'prussian-blue' ? 'active' : ''}`}
                onClick={() => setInkColor('prussian-blue')}
              >
                Prussian Blue
              </button>
            </div>
          </div>

          <div className="studio-actions-stack">
            <button onClick={handleDownloadPostcard} className="btn-secondary w-full justify-center">
              <Download size={15} /> Export Manuscript
            </button>
            <button onClick={handlePrint} className="btn-ghost w-full justify-center">
              <Printer size={15} /> Print Keepsake
            </button>
          </div>
        </div>

        {/* Right Typewriter Paper Stage */}
        <div className="typewriter-paper-stage">
          {/* Antique Typewriter Hardware Top Bar */}
          <div className="typewriter-platen-bar">
            <div className="platen-roller"></div>
            <div className="platen-margin-guide font-mono">10 · 20 · 30 · 40 · 50 · 60 · 70 · 80</div>
            <div className="platen-bell-indicator font-mono">BELL: ACTIVE 🔔</div>
          </div>

          {/* Deckle-Edged Parchment Sheet */}
          <div className={`parchment-sheet ${paperTone} ink-${inkColor}`}>
            <div className="parchment-deckle-top"></div>
            <div className="parchment-watermark font-display">HARVARD '26 // CODEX</div>

            <textarea
              className="typewriter-textarea font-mono"
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={12}
              placeholder="Type your literary draft here... (Press Enter to hear the carriage bell)"
            />

            <div className="parchment-footer">
              <span className="font-mono text-xs text-muted">WORD COUNT: {typedText.trim().split(/\s+/).filter(Boolean).length} WORDS</span>
              <span className="parchment-stamp font-display">AUTHENTICATED CODEX 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
