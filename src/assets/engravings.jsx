import React from 'react';

// Authentic Victorian & Classical Renaissance Woodcut Engraving SVGs
export const BotanicalFernEngraving = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 300 400" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
    {/* Classical Botanical Plate Border */}
    <rect x="15" y="15" width="270" height="370" strokeWidth="1.5" stroke="currentColor" />
    <rect x="22" y="22" width="256" height="356" strokeWidth="0.6" strokeDasharray="3 3" stroke="currentColor" />
    
    {/* Fern Stem & Fronds with Woodcut Hatching */}
    <path d="M150 360 Q150 200 130 50" strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Left Pinnae */}
    <path d="M148 320 C100 310 70 290 50 270 C80 275 115 295 147 315" fill="currentColor" fillOpacity="0.08" strokeWidth="1.2" />
    <path d="M145 280 C95 265 65 240 45 215 C75 225 110 250 143 275" fill="currentColor" fillOpacity="0.08" strokeWidth="1.2" />
    <path d="M142 235 C95 215 70 185 55 160 C80 175 110 205 140 230" fill="currentColor" fillOpacity="0.08" strokeWidth="1.2" />
    <path d="M138 185 C100 165 80 135 65 110 C85 125 110 155 136 180" fill="currentColor" fillOpacity="0.08" strokeWidth="1.2" />
    <path d="M134 135 C105 115 90 90 80 65 C95 80 115 105 132 130" fill="currentColor" fillOpacity="0.08" strokeWidth="1.2" />
    <path d="M131 90 C110 75 100 55 95 40 C105 50 118 70 130 85" fill="currentColor" fillOpacity="0.08" strokeWidth="1.2" />

    {/* Right Pinnae */}
    <path d="M152 330 C200 315 230 295 250 275 C220 280 185 300 153 325" fill="currentColor" fillOpacity="0.08" strokeWidth="1.2" />
    <path d="M148 290 C198 275 228 250 248 225 C218 235 183 260 149 285" fill="currentColor" fillOpacity="0.08" strokeWidth="1.2" />
    <path d="M145 245 C192 225 217 195 232 170 C207 185 177 215 146 240" fill="currentColor" fillOpacity="0.08" strokeWidth="1.2" />
    <path d="M141 195 C180 175 200 145 215 120 C195 135 170 165 142 190" fill="currentColor" fillOpacity="0.08" strokeWidth="1.2" />
    <path d="M137 145 C168 125 185 100 195 75 C180 90 160 115 138 140" fill="currentColor" fillOpacity="0.08" strokeWidth="1.2" />
    <path d="M133 100 C155 85 165 65 170 50 C160 60 147 80 134 95" fill="currentColor" fillOpacity="0.08" strokeWidth="1.2" />

    {/* Crosshatch shading marks */}
    <line x1="140" y1="340" x2="160" y2="340" strokeWidth="0.8" />
    <line x1="138" y1="344" x2="158" y2="344" strokeWidth="0.8" />
    <line x1="136" y1="348" x2="156" y2="348" strokeWidth="0.8" />
    <line x1="135" y1="352" x2="155" y2="352" strokeWidth="0.8" />

    {/* Vintage Text Typography Plate */}
    <text x="150" y="380" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="'Cinzel', serif" letterSpacing="2">
      TAB. XLVIII. — POLYPODIUM VULGARE (1874)
    </text>
  </svg>
);

export const AstrolabeEngraving = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 400 400" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
    {/* Concentric Celestial Rings */}
    <circle cx="200" cy="200" r="175" strokeWidth="2.5" />
    <circle cx="200" cy="200" r="165" strokeWidth="0.8" />
    <circle cx="200" cy="200" r="150" strokeWidth="1.5" strokeDasharray="4 2" />
    <circle cx="200" cy="200" r="110" strokeWidth="1.2" />
    <circle cx="200" cy="200" r="65" strokeWidth="1.8" />
    <circle cx="200" cy="200" r="25" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />

    {/* Armillary Ring Coordinates */}
    <line x1="200" y1="20" x2="200" y2="380" strokeWidth="1.2" />
    <line x1="20" y1="200" x2="380" y2="200" strokeWidth="1.2" />
    <line x1="72" y1="72" x2="328" y2="328" strokeWidth="0.8" strokeDasharray="3 3" />
    <line x1="72" y1="328" x2="328" y2="72" strokeWidth="0.8" strokeDasharray="3 3" />

    {/* Elliptical Orbits */}
    <ellipse cx="200" cy="200" rx="140" ry="60" transform="rotate(-30 200 200)" strokeWidth="1.4" />
    <ellipse cx="200" cy="200" rx="140" ry="60" transform="rotate(30 200 200)" strokeWidth="1.4" />
    <ellipse cx="200" cy="200" rx="155" ry="40" transform="rotate(75 200 200)" strokeWidth="1.0" />

    {/* Zodiac & Star Nodes */}
    <circle cx="200" cy="60" r="4" fill="currentColor" />
    <circle cx="200" cy="340" r="4" fill="currentColor" />
    <circle cx="60" cy="200" r="4" fill="currentColor" />
    <circle cx="340" cy="200" r="4" fill="currentColor" />
    <circle cx="270" cy="110" r="3" fill="currentColor" />
    <circle cx="130" cy="290" r="3" fill="currentColor" />

    {/* Outer Graduations */}
    {Array.from({ length: 36 }).map((_, i) => (
      <line
        key={i}
        x1="200"
        y1="25"
        x2="200"
        y2={i % 3 === 0 ? "35" : "30"}
        transform={`rotate(${i * 10} 200 200)`}
        strokeWidth={i % 3 === 0 ? "1.5" : "0.8"}
      />
    ))}

    <text x="200" y="394" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="'Cinzel', serif" letterSpacing="3">
      SPHAERA ARMITARIS PTOLEMAICA
    </text>
  </svg>
);

export const PrintingPressEngraving = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 350 350" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
    {/* Wooden Printing Press Frame */}
    <rect x="70" y="40" width="210" height="270" strokeWidth="2.5" />
    <line x1="70" y1="120" x2="280" y2="120" strokeWidth="2" />
    <line x1="70" y1="230" x2="280" y2="230" strokeWidth="2" />

    {/* Central Screw & Lever */}
    <rect x="160" y="40" width="30" height="90" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
    <path d="M160 55 L190 70 M160 70 L190 85 M160 85 L190 100 M160 100 L190 115" strokeWidth="1.2" />
    <path d="M175 75 Q240 60 290 45" strokeWidth="3" strokeLinecap="round" />
    <circle cx="290" cy="45" r="7" fill="currentColor" />

    {/* Platen and Bed */}
    <rect x="110" y="130" width="130" height="25" strokeWidth="1.8" fill="currentColor" fillOpacity="0.1" />
    <rect x="95" y="210" width="160" height="20" strokeWidth="2" />

    {/* Paper Sheet on Bed */}
    <polygon points="120,185 220,175 235,210 135,220" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
    <line x1="135" y1="190" x2="215" y2="182" strokeWidth="0.8" strokeDasharray="3 2" />
    <line x1="138" y1="196" x2="218" y2="188" strokeWidth="0.8" strokeDasharray="3 2" />
    <line x1="141" y1="202" x2="221" y2="194" strokeWidth="0.8" strokeDasharray="3 2" />

    {/* Cross-bracing legs */}
    <line x1="70" y1="230" x2="40" y2="310" strokeWidth="2.5" />
    <line x1="280" y1="230" x2="310" y2="310" strokeWidth="2.5" />
    <line x1="40" y1="310" x2="310" y2="310" strokeWidth="2.5" />

    <text x="175" y="338" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="'Cinzel', serif" letterSpacing="2">
      OFFICINA TYPOGRAPHICA (1568)
    </text>
  </svg>
);

export const ClassicalStatueEngraving = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 300 400" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
    {/* Pedestal */}
    <rect x="60" y="320" width="180" height="30" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
    <rect x="75" y="300" width="150" height="20" strokeWidth="1.5" />
    
    {/* Classical Bust Profile with Cross-Hatching */}
    <path d="M150 80 C130 80 110 95 105 120 C100 145 110 160 115 170 C100 175 90 190 90 210 C90 240 105 270 130 290 L170 290 C195 270 210 240 210 210 C210 190 200 175 185 170 C190 160 200 145 195 120 C190 95 170 80 150 80 Z" strokeWidth="1.8" />
    
    {/* Laurel Wreath */}
    <path d="M120 100 Q150 85 180 100" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="125" cy="98" rx="6" ry="3" transform="rotate(-30 125 98)" fill="currentColor" fillOpacity="0.2" />
    <ellipse cx="140" cy="92" rx="6" ry="3" transform="rotate(-15 140 92)" fill="currentColor" fillOpacity="0.2" />
    <ellipse cx="160" cy="92" rx="6" ry="3" transform="rotate(15 160 92)" fill="currentColor" fillOpacity="0.2" />
    <ellipse cx="175" cy="98" rx="6" ry="3" transform="rotate(30 175 98)" fill="currentColor" fillOpacity="0.2" />

    {/* Facial Contours */}
    <path d="M150 120 L150 145 L142 148 L152 153" strokeWidth="1.2" />
    <path d="M135 130 Q142 127 148 130" strokeWidth="1.2" />
    <path d="M152 130 Q158 127 165 130" strokeWidth="1.2" />
    <path d="M142 165 Q150 168 158 165" strokeWidth="1.2" />

    {/* Drapery Toga Folds */}
    <path d="M110 220 Q150 250 190 220" strokeWidth="1.4" />
    <path d="M100 245 Q150 280 200 245" strokeWidth="1.4" />
    <path d="M115 265 Q150 295 185 265" strokeWidth="1.4" />

    {/* Arch Frame */}
    <path d="M30 360 L30 140 Q30 30 150 30 Q270 30 270 140 L270 360" strokeWidth="1.5" strokeDasharray="5 3" />

    <text x="150" y="380" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="'Cinzel', serif" letterSpacing="2">
      CALLIOPE — MUSE OF ELOQUENCE
    </text>
  </svg>
);
