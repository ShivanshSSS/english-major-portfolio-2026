import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  BookOpen, 
  Type, 
  AlignLeft, 
  Copy, 
  Check, 
  Sparkles, 
  Info, 
  Printer, 
  Volume2, 
  Sliders 
} from 'lucide-react';
import { playTypewriterSound, playPageFlipSound } from '../utils/audioSynth';

export default function ReaderModal() {
  const { activeReaderWork, setActiveReaderWork } = usePortfolio();

  const [fontSize, setFontSize] = useState('text-lg'); // 'text-base', 'text-lg', 'text-xl', 'text-2xl'
  const [fontFamily, setFontFamily] = useState('serif'); // 'serif', 'sans', 'mono'
  const [lineSpacing, setLineSpacing] = useState('leading-relaxed'); // 'leading-normal', 'leading-relaxed', 'leading-loose'
  const [activeAnnotation, setActiveAnnotation] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  if (!activeReaderWork) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${activeReaderWork.title}\n\n${activeReaderWork.content}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Process text content to highlight annotated phrases dynamically
  const renderAnnotatedContent = (content, annotations = []) => {
    if (!annotations || annotations.length === 0) {
      return <div className="reader-text-body">{content}</div>;
    }

    let processedText = content;
    // We split into lines and render markdown-style paragraphs
    const paragraphs = content.split('\n\n');

    return (
      <div className="reader-text-body">
        {paragraphs.map((p, pIdx) => {
          let elements = [p];

          annotations.forEach((anno, aIdx) => {
            elements = elements.flatMap((el) => {
              if (typeof el !== 'string') return [el];
              const parts = el.split(anno.phrase);
              if (parts.length === 1) return [el];

              const res = [];
              parts.forEach((part, i) => {
                res.push(part);
                if (i < parts.length - 1) {
                  res.push(
                    <mark
                      key={`anno-${aIdx}-${i}`}
                      className="reader-annotation-highlight"
                      onClick={() => {
                        playTypewriterSound();
                        setActiveAnnotation(anno);
                      }}
                      onMouseEnter={() => setActiveAnnotation(anno)}
                    >
                      {anno.phrase}
                      <span className="annotation-badge">?</span>
                    </mark>
                  );
                }
              });
              return res;
            });
          });

          return (
            <p key={pIdx} className="paragraph-item">
              {elements}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="reader-modal-overlay">
      <div className={`reader-modal-card font-${fontFamily} ${fontSize} ${lineSpacing}`}>
        {/* Reader Header Bar */}
        <div className="reader-modal-header">
          <div className="header-meta">
            <span className="category-pill">{activeReaderWork.category}</span>
            <span className="read-time-pill">{activeReaderWork.readTime}</span>
            <span className="date-pill">{activeReaderWork.date}</span>
          </div>

          <div className="header-actions">
            <button 
              className="icon-btn" 
              onClick={() => setShowSettings(!showSettings)}
              title="Typography Settings"
            >
              <Sliders size={18} />
            </button>
            <button 
              className="icon-btn" 
              onClick={handleCopy}
              title="Copy Text"
            >
              {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
            </button>
            <button 
              className="icon-btn" 
              onClick={handlePrint}
              title="Print Reader View"
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

        {/* Floating Settings Drawer */}
        {showSettings && (
          <div className="reader-settings-bar animate-fade-in">
            <div className="setting-group">
              <span className="setting-label">Font Family:</span>
              <button 
                className={`set-btn ${fontFamily === 'serif' ? 'active' : ''}`}
                onClick={() => setFontFamily('serif')}
              >
                Playfair Serif
              </button>
              <button 
                className={`set-btn ${fontFamily === 'sans' ? 'active' : ''}`}
                onClick={() => setFontFamily('sans')}
              >
                Inter Sans
              </button>
              <button 
                className={`set-btn ${fontFamily === 'mono' ? 'active' : ''}`}
                onClick={() => setFontFamily('mono')}
              >
                Space Mono
              </button>
            </div>

            <div className="setting-group">
              <span className="setting-label">Size:</span>
              <button 
                className={`set-btn ${fontSize === 'text-base' ? 'active' : ''}`}
                onClick={() => setFontSize('text-base')}
              >
                S
              </button>
              <button 
                className={`set-btn ${fontSize === 'text-lg' ? 'active' : ''}`}
                onClick={() => setFontSize('text-lg')}
              >
                M
              </button>
              <button 
                className={`set-btn ${fontSize === 'text-xl' ? 'active' : ''}`}
                onClick={() => setFontSize('text-xl')}
              >
                L
              </button>
            </div>

            <div className="setting-group">
              <span className="setting-label">Spacing:</span>
              <button 
                className={`set-btn ${lineSpacing === 'leading-normal' ? 'active' : ''}`}
                onClick={() => setLineSpacing('leading-normal')}
              >
                Compact
              </button>
              <button 
                className={`set-btn ${lineSpacing === 'leading-relaxed' ? 'active' : ''}`}
                onClick={() => setLineSpacing('leading-relaxed')}
              >
                Relaxed
              </button>
              <button 
                className={`set-btn ${lineSpacing === 'leading-loose' ? 'active' : ''}`}
                onClick={() => setLineSpacing('leading-loose')}
              >
                Loose
              </button>
            </div>
          </div>
        )}

        {/* Main Content & Annotation Margin Layout */}
        <div className="reader-modal-body">
          <div className="reader-text-column">
            <h1 className="reader-title">{activeReaderWork.title}</h1>

            <div className="reader-byline">
              <span>Published in: <strong>{activeReaderWork.publication}</strong></span>
              {activeReaderWork.sentiment && (
                <span className="sentiment-tag"><Sparkles size={14} /> Tone: {activeReaderWork.sentiment}</span>
              )}
            </div>

            {renderAnnotatedContent(activeReaderWork.content, activeReaderWork.annotations)}
          </div>

          {/* Right Margin Annotation Drawer */}
          <div className="reader-margin-column">
            <div className="margin-header">
              <Info size={16} /> Glossing & Footnotes
            </div>
            
            {activeAnnotation ? (
              <div className="annotation-card active animate-fade-in">
                <div className="anno-phrase">"{activeAnnotation.phrase}"</div>
                <div className="anno-note">{activeAnnotation.note}</div>
                <button 
                  className="anno-clear-btn" 
                  onClick={() => setActiveAnnotation(null)}
                >
                  Clear Selection
                </button>
              </div>
            ) : (
              <div className="annotation-placeholder">
                <p>Hover over or click any <mark className="reader-annotation-highlight font-sans">highlighted terms</mark> in the text to view margin notes and theoretical glosses.</p>
              </div>
            )}

            {activeReaderWork.complexityScore && (
              <div className="analytics-card">
                <div className="analytics-title">Linguistic Metric</div>
                <div className="analytics-value">{activeReaderWork.complexityScore}</div>
                <p className="analytics-desc">Calculated via 2026 Algorithmic Syntax Meter</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
