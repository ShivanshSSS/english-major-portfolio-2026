import React, { useState, useRef } from 'react';
import { 
  BotanicalFernEngraving, 
  AstrolabeEngraving, 
  PrintingPressEngraving, 
  ClassicalStatueEngraving 
} from '../assets/engravings';
import { Eye, Search, Sparkles, Compass, Feather } from 'lucide-react';
import { playPageFlipSound, playTypewriterSound } from '../utils/audioSynth';

export default function VictorianScrollGallery() {
  const [activePlate, setActivePlate] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50, show: false });
  const containerRef = useRef(null);

  const plates = [
    {
      id: "plate-1",
      number: "PLATE I",
      title: "The Ptolemaic Celestial Astrolabe",
      year: "Anno 1543",
      category: "Cosmographical Hermeneutics",
      description: "Copperplate engraving charting planetary spheres and the celestial equator. Used in 2026 digital poetics as a spatial metaphor for latent narrative embeddings.",
      Component: AstrolabeEngraving,
      tag: "Spatial Narratology"
    },
    {
      id: "plate-2",
      number: "PLATE II",
      title: "Herbarium & Spore Morphology",
      year: "Anno 1874",
      category: "Botanical Taxonomy",
      description: "Fine steel etching from Curtis's Botanical Magazine. Symbolizes the organic branching of intertextual references across Victorian prose.",
      Component: BotanicalFernEngraving,
      tag: "Organic Cadence"
    },
    {
      id: "plate-3",
      number: "PLATE III",
      title: "Gutenberg's Movable Type Press",
      year: "Anno 1568",
      category: "Material Bibliography",
      description: "Woodcut depicting the early mechanical screw press, the foundational hardware ancestor of modern tokenizer architectures.",
      Component: PrintingPressEngraving,
      tag: "Mechanical Inscription"
    },
    {
      id: "plate-4",
      number: "PLATE IV",
      title: "Calliope, Muse of Epic Poetry",
      year: "Classical Greek / Roman",
      category: "Rhetorical Aesthetics",
      description: "Classical marble bust etching celebrating rhythm, cadence, and human eloquence at the threshold of post-human AI synthesis.",
      Component: ClassicalStatueEngraving,
      tag: "Classical Rhetoric"
    }
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setZoomPos(prev => ({ ...prev, show: false }));
  };

  const CurrentPlateComponent = plates[activePlate].Component;

  return (
    <section className="victorian-gallery-section">
      <div className="section-header text-center">
        <div className="ornamental-header-divider">
          <span>❦</span>
          <span className="divider-line"></span>
          <span className="section-kicker"><Compass size={15} /> ARCHIVAL ENGRAVING CODEX</span>
          <span className="divider-line"></span>
          <span>❦</span>
        </div>
        <h2 className="section-title font-display">THE HISTORICAL ENGRAVER'S REEL</h2>
        <p className="section-desc mx-auto">
          Authentic woodcuts & copperplate plates connecting classical bibliography with contemporary digital humanities. Hover over any plate to activate the <strong>Curator's Magnifying Loupe</strong>.
        </p>
      </div>

      <div className="gallery-main-layout">
        {/* Left Side Plate Selector */}
        <div className="plate-selector-column">
          {plates.map((plate, index) => (
            <div 
              key={plate.id}
              className={`plate-nav-card ${activePlate === index ? 'active' : ''}`}
              onClick={() => {
                playPageFlipSound();
                setActivePlate(index);
              }}
            >
              <div className="plate-card-header">
                <span className="plate-num font-mono">{plate.number}</span>
                <span className="plate-year font-mono">{plate.year}</span>
              </div>
              <h4 className="plate-nav-title font-serif">{plate.title}</h4>
              <span className="plate-tag">{plate.tag}</span>
            </div>
          ))}
        </div>

        {/* Center / Right Plate Display with Interactive Loupe */}
        <div className="plate-display-stage">
          <div 
            className="plate-stage-frame"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Corner Ornamental Accents */}
            <div className="frame-corner top-left"></div>
            <div className="frame-corner top-right"></div>
            <div className="frame-corner bottom-left"></div>
            <div className="frame-corner bottom-right"></div>

            {/* Inscription Header */}
            <div className="plate-inscription font-display">
              <span>{plates[activePlate].number}</span>
              <span className="inscription-dot">♦</span>
              <span>{plates[activePlate].category}</span>
            </div>

            {/* The SVG Engraving */}
            <div className="engraving-svg-wrap">
              <CurrentPlateComponent className="engraving-vector" />
            </div>

            {/* Interactive Loupe Magnifier */}
            {zoomPos.show && (
              <div 
                className="curator-loupe"
                style={{
                  left: `${zoomPos.x}%`,
                  top: `${zoomPos.y}%`,
                  backgroundImage: `radial-gradient(circle, rgba(194, 142, 56, 0.15) 0%, transparent 80%)`
                }}
              >
                <div className="loupe-reticle"></div>
                <span className="loupe-label font-mono">3.5X LOUPE</span>
              </div>
            )}
          </div>

          {/* Bottom Curator Commentary Note */}
          <div className="plate-commentary-box">
            <div className="commentary-header">
              <Feather size={14} className="text-amber-800" />
              <span className="font-mono text-xs font-bold tracking-wider">CURATORIAL ANNOTATION</span>
            </div>
            <p className="commentary-text font-serif">
              "{plates[activePlate].description}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
