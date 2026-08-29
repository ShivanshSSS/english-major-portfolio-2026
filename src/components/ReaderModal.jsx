import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  Copy, 
  Check, 
  Printer, 
  Sparkles
} from 'lucide-react';
import { playPageFlipSound } from '../utils/audioSynth';

export default function ReaderModal() {
  const { activeReaderWork, setActiveReaderWork } = usePortfolio();

  const [fontSize, setFontSize] = useState('medium'); // 'small', 'medium', 'large', 'xlarge'
  const [fontFamily, setFontFamily] = useState('serif'); // 'serif', 'sans', 'mono'
  const [lineSpacing, setLineSpacing] = useState('relaxed'); // 'compact', 'relaxed', 'loose'
  const [copied, setCopied] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeReaderWork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeReaderWork]);

  if (!activeReaderWork) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${activeReaderWork.title}\n\n${activeReaderWork.content}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Font size inline values
  const fontSizeMap = {
    small: '1.05rem',
    medium: '1.22rem',
    large: '1.42rem',
    xlarge: '1.68rem'
  };

  // Line height inline values
  const lineHeightMap = {
    compact: '1.65',
    relaxed: '1.95',
    loose: '2.4'
  };

  // Paragraph margin inline values
  const paragraphMarginMap = {
    compact: '1.2rem',
    relaxed: '1.8rem',
    loose: '2.4rem'
  };

  // Split content cleanly into paragraphs/stanzas
  const paragraphs = activeReaderWork.content ? activeReaderWork.content.split('\n\n') : [];

  return (
    <div className="reader-modal-overlay animate-fade-in" onClick={() => setActiveReaderWork(null)}>
      <div 
        className="reader-modal-card clean-reader" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="reader-modal-header">
          <div className="header-meta">
            <span className="category-pill">{activeReaderWork.category}</span>
            <span className="read-time-pill">{activeReaderWork.readTime}</span>
            <span className="date-pill">{activeReaderWork.date}</span>
          </div>

          <div className="header-actions">
            <button 
              className="icon-btn" 
              onClick={handleCopy}
              title="Copy Text"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
            </button>
            <button 
              className="icon-btn" 
              onClick={handlePrint}
              title="Print Text"
            >
              <Printer size={18} />
            </button>
            <button 
              className="close-btn" 
              onClick={() => {
                playPageFlipSound();
                setActiveReaderWork(null);
              }}
              title="Close Reader"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* ALWAYS-VISIBLE Typography & Spacing Toolbar */}
        <div className="reader-settings-bar visible-toolbar">
          {/* Font Family */}
          <div className="setting-group">
            <span className="setting-label">Font:</span>
            <button 
              className={`set-btn ${fontFamily === 'serif' ? 'active' : ''}`}
              onClick={() => setFontFamily('serif')}
            >
              Serif
            </button>
            <button 
              className={`set-btn ${fontFamily === 'sans' ? 'active' : ''}`}
              onClick={() => setFontFamily('sans')}
            >
              Sans
            </button>
            <button 
              className={`set-btn ${fontFamily === 'mono' ? 'active' : ''}`}
              onClick={() => setFontFamily('mono')}
            >
              Mono
            </button>
          </div>

          <div className="toolbar-divider"></div>

          {/* Font Size */}
          <div className="setting-group">
            <span className="setting-label">Size:</span>
            <button 
              className={`set-btn ${fontSize === 'small' ? 'active' : ''}`}
              onClick={() => setFontSize('small')}
            >
              S
            </button>
            <button 
              className={`set-btn ${fontSize === 'medium' ? 'active' : ''}`}
              onClick={() => setFontSize('medium')}
            >
              M
            </button>
            <button 
              className={`set-btn ${fontSize === 'large' ? 'active' : ''}`}
              onClick={() => setFontSize('large')}
            >
              L
            </button>
            <button 
              className={`set-btn ${fontSize === 'xlarge' ? 'active' : ''}`}
              onClick={() => setFontSize('xlarge')}
            >
              XL
            </button>
          </div>

          <div className="toolbar-divider"></div>

          {/* Line Spacing */}
          <div className="setting-group">
            <span className="setting-label">Spacing:</span>
            <button 
              className={`set-btn ${lineSpacing === 'compact' ? 'active' : ''}`}
              onClick={() => setLineSpacing('compact')}
            >
              Compact
            </button>
            <button 
              className={`set-btn ${lineSpacing === 'relaxed' ? 'active' : ''}`}
              onClick={() => setLineSpacing('relaxed')}
            >
              Relaxed
            </button>
            <button 
              className={`set-btn ${lineSpacing === 'loose' ? 'active' : ''}`}
              onClick={() => setLineSpacing('loose')}
            >
              Spacious
            </button>
          </div>
        </div>

        {/* Clean, Harmonious Reading Column */}
        <div className="reader-clean-container">
          <div className="manuscript-reading-sheet">
            {/* Header Aligned With Text */}
            <div className="sheet-header">
              <h1 className="sheet-title font-serif">{activeReaderWork.title}</h1>
              <div className="sheet-meta font-mono">
                <span>{activeReaderWork.category} · {activeReaderWork.date}</span>
                {activeReaderWork.topicTag && (
                  <span className="sheet-topic-badge">
                    <Sparkles size={12} /> {activeReaderWork.topicTag}
                  </span>
                )}
              </div>
              <div className="sheet-ornament-line"></div>
            </div>

            {/* Manuscript Stanzas / Paragraphs */}
            <div 
              className={`sheet-body font-${fontFamily}`}
              style={{
                fontSize: fontSizeMap[fontSize],
                lineHeight: lineHeightMap[lineSpacing],
                fontFamily: fontFamily === 'serif' ? 'var(--font-serif)' : (fontFamily === 'mono' ? 'var(--font-mono)' : 'var(--font-sans)')
              }}
            >
              {paragraphs.map((p, pIdx) => (
                <p 
                  key={pIdx} 
                  className="stanza-block"
                  style={{
                    marginBottom: paragraphMarginMap[lineSpacing],
                    whiteSpace: 'pre-line'
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Subtle Folio End Mark */}
            <div className="sheet-footer-mark font-mono">
              <span>❦</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
