import React from 'react';
import { Sparkles, BookOpen, Compass, Feather } from 'lucide-react';

export default function GothicMarqueeRibbon() {
  const items = [
    { text: "THE CONSTELLATION SPOON", icon: "❦" },
    { text: "THE SEASONS OF LOVE", icon: "⚜" },
    { text: "SUNDAR NAGAR ROOTS", icon: "✦" },
    { text: "WE LOOK AT THE SAME MOON", icon: "❧" },
    { text: "PARADOX OF LOVE", icon: "♦" },
    { text: "MEET ME IN THE WOODS", icon: "❦" },
    { text: "COME AND LAY BY MY SIDE", icon: "⚜" },
    { text: "BATHING WITH MY LOVE", icon: "✦" },
    { text: "LOVER'S ROCK", icon: "❧" },
    { text: "NONE SHALL REALISE", icon: "♦" }
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
