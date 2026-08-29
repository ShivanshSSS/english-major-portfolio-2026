import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Maximize2, 
  X, 
  Sparkles, 
  Feather, 
  Shield, 
  Layers 
} from 'lucide-react';
import { playPageFlipSound, playTypewriterSound } from '../utils/audioSynth';

export default function GothicArtGallery() {
  const { data, setIsAdminOpen } = usePortfolio();
  const gallery = data.gothicGallery && data.gothicGallery.length > 0 ? data.gothicGallery : [];
  const settings = data.gallerySettings || { intervalSeconds: 5, autoPlay: true };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(settings.autoPlay !== false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const total = gallery.length;

  // Auto-advance carousel timer
  useEffect(() => {
    if (total <= 1 || !isPlaying || isHovered || isLightboxOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalMs = (settings.intervalSeconds || 5) * 1000;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, isLightboxOpen, total, settings.intervalSeconds]);

  const handleNext = () => {
    playPageFlipSound();
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    playPageFlipSound();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleSelect = (index) => {
    playPageFlipSound();
    setCurrentIndex(index);
  };

  if (total === 0) return null;

  const currentArt = gallery[currentIndex] || gallery[0];

  return (
    <section id="gallery" className="gothic-gallery-section border-t border-cream-accent">
      {/* Header */}
      <div className="section-header text-center">
        <div className="ornamental-header-divider">
          <span>❦</span>
          <span className="divider-line"></span>
          <span className="section-kicker"><Sparkles size={15} /> CURATED ARTWORK & LITERATURE ARCHIVE</span>
          <span className="divider-line"></span>
          <span>❦</span>
        </div>
        <h2 className="section-title font-display">THE GOTHIC & ROMANTICISM GALLERY</h2>
        <p className="section-desc mx-auto">
          Freely available public domain masterpieces, pre-Raphaelite studies, and dark academic visions shaping 2026 narrative theory. Manageable in real-time via the <strong>Admin Portal</strong>.
        </p>
      </div>

      {/* Main Carousel Stage */}
      <div 
        className="art-carousel-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="art-carousel-frame">
          {/* Main Artwork Image with Crossfade */}
          <div className="art-image-container">
            <img 
              src={currentArt.imageUrl} 
              alt={currentArt.title} 
              className="art-main-image animate-fade-in"
              onError={(e) => {
                // Fallback image if network fails
                e.target.src = "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80";
              }}
            />

            {/* Top Toolbar Overlay */}
            <div className="art-top-toolbar">
              <span className="art-counter font-mono">
                {currentIndex + 1} / {total}
              </span>
              <div className="art-actions-group">
                <button 
                  className="art-tool-btn"
                  onClick={() => setIsPlaying(!isPlaying)}
                  title={isPlaying ? "Pause Auto-Slide" : "Play Auto-Slide"}
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <button 
                  className="art-tool-btn"
                  onClick={() => setIsLightboxOpen(true)}
                  title="View Fullscreen"
                >
                  <Maximize2 size={14} />
                </button>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              className="carousel-nav-btn prev"
              onClick={handlePrev}
              title="Previous Artwork"
            >
              <ChevronLeft size={22} />
            </button>
            <button 
              className="carousel-nav-btn next"
              onClick={handleNext}
              title="Next Artwork"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Curatorial Caption Placard */}
          <div className="art-placard">
            <div className="placard-top font-mono">
              <span className="art-movement-tag">{currentArt.movement}</span>
              <span className="art-year-tag">{currentArt.year}</span>
            </div>

            <h3 className="art-title font-serif">{currentArt.title}</h3>
            <h4 className="art-artist font-display">by {currentArt.artist}</h4>

            <p className="art-description font-serif">
              "{currentArt.description}"
            </p>

            <div className="placard-footer">
              <div className="carousel-dots">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-dot ${currentIndex === i ? 'active' : ''}`}
                    onClick={() => handleSelect(i)}
                    title={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={() => setIsAdminOpen(true)}
                className="admin-edit-link font-mono text-xs"
              >
                <Shield size={12} /> Edit Gallery in Admin
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Preview Ribbon */}
        <div className="art-thumbnail-strip">
          {gallery.map((art, idx) => (
            <div 
              key={art.id || idx}
              className={`art-thumbnail-card ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => handleSelect(idx)}
            >
              <img src={art.imageUrl} alt={art.title} className="thumb-img" />
              <div className="thumb-caption font-serif">
                <span className="thumb-title">{art.title}</span>
                <span className="thumb-artist font-mono">{art.artist}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="art-lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setIsLightboxOpen(false)}>
              <X size={24} />
            </button>
            <img src={currentArt.imageUrl} alt={currentArt.title} className="lightbox-image" />
            <div className="lightbox-caption font-serif">
              <h3>{currentArt.title} ({currentArt.year}) — {currentArt.artist}</h3>
              <p>"{currentArt.description}"</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
