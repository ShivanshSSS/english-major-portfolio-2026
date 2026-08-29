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
      title: "The Celestial Ursa Major (The Spoon)",
      year: "Sundar Nagar Night Sky",
      category: "Constellation & Family",
      description: "Copperplate engraving charting the celestial equator and the Big Dipper. Represents the one constant family member returning to the roof in Sundar Nagar every night.",
      Component: AstrolabeEngraving,
      tag: "The Spoon (#07)"
    },
    {
      id: "plate-2",
      number: "PLATE II",
      title: "The June Gloom & Summer's Day",
      year: "Manuscript #02",
      category: "Seasons & Growth",
      description: "Botanical etching symbolizing the longing for sun: 'I pray to Gods, like a farmer, for the Sun to bless me again, and bring my smiles and hopes back; like flowers, and leaves, and life.'",
      Component: BotanicalFernEngraving,
      tag: "Seasons of Love"
    },
    {
      id: "plate-3",
      number: "PLATE III",
      title: "The Thousand-Book Library",
      year: "Manuscript #18",
      category: "Material Memory",
      description: "Engraving of the printing press and archive: 'It’s a library if it has a thousand books, and ours has long crossed that number, so stop calling it a collection now.'",
      Component: PrintingPressEngraving,
      tag: "Bathing with my Love"
    },
    {
      id: "plate-4",
      number: "PLATE IV",
      title: "Calliope & The Lyrical Elegy",
      year: "Manuscript #14 & #17",
      category: "Melody & Distance",
      description: "Classical marble bust celebrating the shared songs of memory: Daniel Lanois' 'Red' and Sade's 'Lover's Rock' echoing across memory and distance.",
      Component: ClassicalStatueEngraving,
      tag: "Lover's Rock"
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
