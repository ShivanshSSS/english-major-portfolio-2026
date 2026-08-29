import React, { useState, useRef } from 'react';
import { playTypewriterSound, playTypewriterBell, playPageFlipSound } from '../utils/audioSynth';
import { Feather, Download, Printer, RotateCcw, Sparkles, Volume2, Type } from 'lucide-react';

export default function TypewriterStudio() {
  const [typedText, setTypedText] = useState(
    "To the Reader in 2026,\n\nWe transcribe these thoughts upon digital parchment, where the cadence of Victorian ink meets the infinite latent space of autonomous prose.\n\n— Aurora Vane"
  );
  const [paperTone, setPaperTone] = useState('aged-cream'); // 'aged-cream', 'antique-rose', 'monastic-slate'
  const [inkColor, setInkColor] = useState('black-walnut'); // 'black-walnut', 'imperial-crimson', 'prussian-blue'
  const [copied, setCopied] = useState(false);

  const prompts = [
    { label: "Gothic Letter", text: "Dearest Companion,\n\nThe moors are enveloped in thick fog tonight. The library fire crackles softly, and between the lines of this text, I hear the echo of a forgotten verse..." },
    { label: "Algorithmic Elegy", text: "In the high-dimensional garden,\nthe transformer model dreams of autumn.\nIt calculates the cosine distance\nbetween longing and empty rooms..." },
    { label: "Editorial Dispatch", text: "MEMORANDUM FOR THE CODEX // 2026\n\nResolved: That language is not a static museum, but a living breathing tapestry woven by human memory and neural syntax." }
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
    element.download = "victorian_manuscript_2026.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section className="typewriter-studio-section border-t border-cream-accent">
      <div className="section-header text-center">
        <div className="ornamental-header-divider">
          <span>❧</span>
          <span className="divider-line"></span>
          <span className="section-kicker"><Feather size={15} /> LITERARY SANDBOX</span>
          <span className="divider-line"></span>
          <span>❧</span>
        </div>
        <h2 className="section-title font-display">THE VICTORIAN TYPEWRITER STUDIO</h2>
        <p className="section-desc mx-auto">
          An interactive mechanical writing suite. Compose verses, hear authentic typewriter key strikes and carriage return chimes, and export your antique manuscript.
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
