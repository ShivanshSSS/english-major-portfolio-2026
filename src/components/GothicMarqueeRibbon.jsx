import React from 'react';
import { Sparkles, BookOpen, Compass, Feather } from 'lucide-react';

export default function GothicMarqueeRibbon() {
  const items = [
    { text: "GOTHIC ROMANTICISM", icon: "❦" },
    { text: "THE KANTIAN SUBLIME", icon: "⚜" },
    { text: "PRE-RAPHAELITE CADENCE", icon: "✦" },
    { text: "ILLUMINATED VELLUM", icon: "❧" },
    { text: "DARK ACADEMIA ARCHIVE", icon: "♦" },
    { text: "ALGORITHMIC HERMENEUTICS", icon: "❦" },
    { text: "VICTORIAN GHOST METAPHOR", icon: "⚜" },
    { text: "POST-HUMAN POETICS", icon: "✦" },
    { text: "HAUNTOLOGY & LATENT SPACE", icon: "❧" },
    { text: "MATERIAL BIBLIOGRAPHY", icon: "♦" }
  ];

  return (
    <div className="gothic-marquee-container">
      <div className="gothic-marquee-track">
        {/* Render twice for seamless loop */}
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="marquee-item font-display">
            <span className="marquee-glyph">{item.icon}</span>
            <span className="marquee-text">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
