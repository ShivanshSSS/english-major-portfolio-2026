import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Sparkles, 
  Feather, 
  BookOpen, 
  RotateCw, 
  Play, 
  Pause, 
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { playPageFlipSound, playTypewriterSound } from '../utils/audioSynth';

export default function ScrollStoryDeck() {
  const { data, setActiveReaderWork } = usePortfolio();
  const containerRef = useRef(null);

  // Scroll progress from 0.0 to 1.0
  const [scrollProgress, setScrollProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const lastStageRef = useRef(0);
  const autoPlayTimerRef = useRef(null);

  const chapters = [
    {
      id: 0,
      roman: "I",
      title: "The Marriage",
      tagline: "Poem #01",
      preview: "“Tied a knot today, not the auspicious happily married version of it, but rather the morose, melancholic, solo one.”",
      workId: "work-1"
    },
    {
      id: 1,
      roman: "II",
      title: "The Seasons of Love",
      tagline: "Poem #02",
      preview: "“I shall compare you to a Summer’s Day. You shine brighter than the Sun, giving me hope, giving me love.”",
      workId: "work-2"
    },
    {
      id: 2,
      roman: "III",
      title: "The Spoon (Big Dipper)",
      tagline: "Memoir #07",
      preview: "“Too many variables. Only one constant: The Spoon. The only member of the family who kept coming to the roof every night.”",
      workId: "work-7"
    },
    {
      id: 3,
      roman: "IV",
      title: "We Look at the Same Moon",
      tagline: "Poem #14",
      preview: "“We look at the same Moon, she and I. The distance is massive between us, but the Moon is farther.”",
      workId: "work-13"
    }
  ];

  // Smooth lerp animation loop for 60fps momentum
  useEffect(() => {
    let animId;
    const lerp = () => {
      setScrollProgress((prev) => {
        const diff = targetProgress - prev;
        if (Math.abs(diff) < 0.0005) {
          return targetProgress;
        }
        return prev + diff * 0.12;
      });
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [targetProgress]);

  // Sound tick on chapter change
  useEffect(() => {
    const currentStage = Math.min(3, Math.floor(scrollProgress * 4));
    if (currentStage !== lastStageRef.current) {
      playPageFlipSound();
      lastStageRef.current = currentStage;
    }
  }, [scrollProgress]);

  // Scroll wheel event listener inside the interactive frame
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * 0.00085;
    setTargetProgress((prev) => Math.max(0, Math.min(1, prev + delta)));
  };

  // Mouse tilt for subtle depth
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setMouseTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  // Auto-play / scrub simulation
  useEffect(() => {
    if (!isPlaying) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      setTargetProgress((prev) => {
        if (prev >= 1) return 0;
        return Math.min(1, prev + 0.004);
      });
    }, 30);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying]);

  // Direct chapter select
  const selectChapter = (index) => {
    playTypewriterSound();
    const targets = [0.05, 0.35, 0.68, 0.96];
    setTargetProgress(targets[index]);
  };

  const currentStageIndex = Math.min(3, Math.floor(scrollProgress * 3.99));
  const currentChapter = chapters[currentStageIndex];

  // Stage progress calculations
  const coverOpen = Math.min(1, Math.max(0, scrollProgress * 2.8)); // 0 to 1 as book opens
  const stage3Fade = Math.min(1, Math.max(0, (scrollProgress - 0.45) / 0.3));
  const stage4Fade = Math.min(1, Math.max(0, (scrollProgress - 0.75) / 0.25));

  const targetWork = data.works.find(w => w.id === currentChapter.workId) || data.works[0];

  return (
    <section className="scroll-story-section" id="story-deck">
      {/* Header */}
      <div className="section-header text-center">
        <div className="ornamental-header-divider">
          <span>❦</span>
          <span className="divider-line"></span>
          <span className="section-kicker"><Bookmark size={15} /> INTERACTIVE STORY</span>
          <span className="divider-line"></span>
          <span>❦</span>
        </div>
        <h2 className="section-title font-display">THE STORY WHEEL</h2>
        <p className="section-desc mx-auto">
          Spin your <strong>mouse wheel</strong> or drag the slider below to open the book and browse selected excerpts from the writings.
        </p>
      </div>

      {/* Main Interactive Stage Container */}
      <div 
        ref={containerRef}
        className="scroll-story-viewport"
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Top HUD Bar */}
        <div className="story-hud-top">
          <div className="hud-chapter-pill">
            <span className="hud-roman font-serif">{currentChapter.roman}</span>
            <span className="hud-title font-display">{currentChapter.title}</span>
            <span className="hud-badge font-mono">{currentChapter.tagline}</span>
          </div>

          <div className="hud-controls-group">
            <button 
              className={`hud-btn ${isPlaying ? 'active' : ''}`}
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause Auto-Scroll" : "Auto-Play Story"}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              <span>{isPlaying ? 'PAUSE' : 'AUTO-PLAY'}</span>
            </button>

            <button 
              className="hud-btn"
              onClick={() => setTargetProgress(0)}
              title="Reset to Beginning"
            >
              <RotateCw size={13} />
            </button>
          </div>
        </div>

        {/* 3D Book Stage */}
        <div 
          className="story-3d-stage"
          style={{
            transform: `perspective(1200px) rotateX(${mouseTilt.y * 0.3}deg) rotateY(${mouseTilt.x * 0.3}deg)`
          }}
        >
          {/* Subtle Background Star Rings for Constellation Story */}
          <div 
            className="astrolabe-3d-rings"
            style={{
              opacity: stage3Fade,
              transform: `scale(${0.75 + stage3Fade * 0.35}) rotateZ(${scrollProgress * 180}deg)`
            }}
          >
            <div className="astrolabe-ring ring-outer"></div>
            <div className="astrolabe-ring ring-mid"></div>
            <div className="astrolabe-crosshairs"></div>
          </div>

          {/* 3D BOOK SPREAD ASSEMBLY (Both pages upright & never mirrored) */}
          <div 
            className="codex-3d-book"
            style={{
              transform: `
                translateZ(${coverOpen * 30}px)
                scale(${0.92 + coverOpen * 0.08})
              `
            }}
          >
            {/* Left Static Inside Page (Always facing forward, 100% upright) */}
            <div className="codex-leaf codex-left-leaf">
              <div className="leaf-inner-frame">
                <div className="leaf-header font-mono">
                  <span>CHAPTER I</span>
                  <span className="dot">♦</span>
                  <span>THE MARRIAGE</span>
                </div>

                <div className="leaf-body-text font-serif">
                  <span className="drop-cap font-display">T</span>
                  <p>
                    ied a knot today, not the auspicious happily married version of it, but rather the morose, melancholic, solo, more gloomy one.
                  </p>
                  <blockquote className="leaf-quote font-serif">
                    "Each day is just a copy of the previous much worse, yet better, day. Slumber-less nights, yet dream filled days."
                  </blockquote>
                </div>

                <div className="leaf-footer font-mono">
                  <span>SUNDAR NAGAR</span>
                  <span>PAGE 01</span>
                </div>
              </div>
            </div>

            {/* Right Static Inside Page (Always facing forward, 100% upright) */}
            <div className="codex-leaf codex-right-leaf">
              <div className="leaf-inner-frame">
                <div className="leaf-header font-mono">
                  <span>CHAPTER II</span>
                  <span className="dot">♦</span>
                  <span>THE SEASONS OF LOVE</span>
                </div>

                <div className="leaf-body-text font-serif">
                  <span className="drop-cap font-display">I</span>
                  <p>
                    shall compare you to a Summer’s Day. You shine brighter than the Sun, giving me hope, giving me love...
                  </p>
                  <blockquote className="leaf-quote font-serif">
                    "I pray to Gods, like a farmer, for the Sun to bless me again, and bring my smiles and hopes back; like flowers, and leaves, and life."
                  </blockquote>
                </div>

                <div className="leaf-footer font-mono">
                  <span>POEMS & MEMORIES</span>
                  <span>PAGE 02</span>
                </div>
              </div>
            </div>

            {/* Front Leather Cover (Flips open to the left on hinge from 0deg to -180deg) */}
            <div 
              className="codex-cover-hinge"
              style={{
                transformOrigin: 'left center',
                transform: `rotateY(${-180 * coverOpen}deg)`
              }}
            >
              {/* Front Cover Face (facing outside) */}
              <div className="cover-face-front">
                <div className="cover-leather-texture"></div>
                <div className="cover-gold-border"></div>
                <div className="cover-corner tl"></div>
                <div className="cover-corner tr"></div>
                <div className="cover-corner bl"></div>
                <div className="cover-corner br"></div>

                <div className="cover-centerpiece">
                  <div className="cover-insignia font-display">SELECTED WRITINGS</div>
                  <div className="cover-sub font-mono">POETRY & STORIES</div>
                  <div className="cover-wax-seal">
                    <span className="wax-emblem font-serif">❦</span>
                  </div>
                </div>
              </div>

              {/* Inside Cover Face (facing inside once flipped open) */}
              <div className="cover-face-back">
                <div className="inside-cover-texture"></div>
                <div className="inside-cover-inset">
                  <span className="font-mono text-xs text-muted">COLLECTED WORKS</span>
                  <p className="font-serif text-xs italic mt-2 text-stone-700">
                    “An old memory of me, my brother, my mother just looking at stars on the roof...”
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Quotes for Stages 3 & 4 */}
          <div 
            className="floating-lore-layer"
            style={{
              opacity: stage3Fade,
              pointerEvents: stage3Fade > 0.5 ? 'auto' : 'none'
            }}
          >
            <div 
              className="floating-card lore-card-1"
              style={{
                transform: `translateX(-70px) translateY(-35px) rotateZ(-3deg)`
              }}
            >
              <Sparkles size={14} className="lore-icon text-amber-700" />
              <span className="lore-text font-serif">"Too many variables. Only one constant: The Spoon."</span>
              <span className="lore-cite font-mono">FROM 'THE SPOON'</span>
            </div>

            <div 
              className="floating-card lore-card-2"
              style={{
                transform: `translateX(80px) translateY(45px) rotateZ(2deg)`
              }}
            >
              <Feather size={14} className="lore-icon text-amber-700" />
              <span className="lore-text font-serif">"Ghar haaya tithe ta mera; ghara chalira haun."</span>
              <span className="lore-cite font-mono">FROM 'ROOTS'</span>
            </div>
          </div>
        </div>

        {/* Scroll Guidance Cue */}
        <div className="story-wheel-cue">
          <div className="wheel-mouse-icon">
            <div 
              className="mouse-wheel-roller" 
              style={{
                transform: `translateY(${Math.sin(scrollProgress * 20) * 5}px)`
              }}
            />
          </div>
          <span className="wheel-cue-label font-mono">
            {scrollProgress < 0.95 ? 'SCROLL DOWN TO FLIP PAGES' : 'ALL CHAPTERS EXPLORED'}
          </span>
        </div>

        {/* Bottom Scrubber & Chapter Navigation */}
        <div className="story-hud-bottom">
          {/* Chapter Quick Jump Buttons */}
          <div className="chapter-step-nav">
            {chapters.map((ch, idx) => (
              <button
                key={ch.id}
                className={`chapter-step-btn ${currentStageIndex === idx ? 'active' : ''}`}
                onClick={() => selectChapter(idx)}
              >
                <span className="step-num font-mono">{ch.roman}</span>
                <span className="step-label">{ch.title}</span>
              </button>
            ))}
          </div>

          {/* Range Scrubber */}
          <div className="scrubber-bar-container">
            <input 
              type="range"
              min="0"
              max="1"
              step="0.001"
              value={targetProgress}
              onChange={(e) => setTargetProgress(parseFloat(e.target.value))}
              className="story-scrubber-input"
              aria-label="Story Progress Slider"
            />
            <div 
              className="scrubber-fill"
              style={{ width: `${scrollProgress * 100}%` }}
            />
            <div 
              className="scrubber-thumb-glow"
              style={{ left: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Action Row */}
          <div className="hud-footer-row font-mono">
            <span className="hud-pct">
              PROGRESS: {Math.round(scrollProgress * 100)}%
            </span>

            {targetWork && (
              <button 
                className="hud-action-cta"
                onClick={() => {
                  playTypewriterSound();
                  setActiveReaderWork(targetWork);
                }}
              >
                <BookOpen size={14} /> Read Full Piece <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
