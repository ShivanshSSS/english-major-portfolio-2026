import React, { useState, useEffect } from 'react';
import { playWaxSealStampSound } from '../utils/audioSynth';
import { Sparkles, Stamp, Trash2, Check } from 'lucide-react';

export default function WaxSealStamper() {
  const [stampActive, setStampActive] = useState(false);
  const [monogram, setMonogram] = useState('AV');
  const [waxColor, setWaxColor] = useState('crimson'); // 'crimson', 'navy', 'gold', 'emerald'
  const [stamps, setStamps] = useState([
    { id: 1, x: 88, y: 320, monogram: 'AV', color: 'crimson' }
  ]);

  const colors = [
    { id: 'crimson', label: 'Imperial Crimson', bg: 'linear-gradient(135deg, #8b0000, #500000)', border: '#b22222' },
    { id: 'gold', label: 'Antique Gold', bg: 'linear-gradient(135deg, #d4af37, #8b6b23)', border: '#ffd700' },
    { id: 'navy', label: 'Royal Navy', bg: 'linear-gradient(135deg, #1e3a8a, #0f172a)', border: '#3b82f6' },
    { id: 'emerald', label: 'Monastic Emerald', bg: 'linear-gradient(135deg, #065f46, #022c22)', border: '#10b981' }
  ];

  // Listen for clicks across the document when stamp mode is active
  useEffect(() => {
    if (!stampActive) return;

    const handleDocumentClick = (e) => {
      // Prevent stamping if clicking inside the stamper control box or modal
      if (e.target.closest('.wax-stamper-widget') || e.target.closest('.reader-modal-overlay') || e.target.closest('.admin-modal-overlay')) {
        return;
      }

      playWaxSealStampSound();

      const newStamp = {
        id: Date.now(),
        x: e.pageX,
        y: e.pageY,
        monogram: monogram.toUpperCase().slice(0, 3) || 'AV',
        color: waxColor
      };

      setStamps(prev => [...prev, newStamp]);
    };

    window.addEventListener('click', handleDocumentClick);
    return () => window.removeEventListener('click', handleDocumentClick);
  }, [stampActive, monogram, waxColor]);

  const clearStamps = () => {
    setStamps([]);
  };

  return (
    <>
      {/* Render All Dropped Wax Seals on Document */}
      {stamps.map((s) => {
        const colorConfig = colors.find(c => c.id === s.color) || colors[0];
        return (
          <div
            key={s.id}
            className="wax-seal-drop animate-stamp"
            style={{
              left: `${s.x}px`,
              top: `${s.y}px`,
              background: colorConfig.bg,
              borderColor: colorConfig.border
            }}
            title="Authentic Wax Seal"
          >
            <div className="wax-seal-inner">
              <span className="wax-monogram font-display">{s.monogram}</span>
              <div className="wax-ridge-ring"></div>
            </div>
          </div>
        );
      })}

      {/* Floating Interactive Stamper Tool Widget */}
      <div className="wax-stamper-widget">
        <div className="stamper-header">
          <div className="flex items-center gap-2">
            <span className="stamper-icon">⚜</span>
            <span className="stamper-title font-display">WAX SEAL STAMP</span>
          </div>
          <button
            onClick={() => setStampActive(!stampActive)}
            className={`btn-stamp-toggle ${stampActive ? 'active' : ''}`}
          >
            {stampActive ? 'Stamping Active (Click anywhere)' : 'Activate Stamp'}
          </button>
        </div>

        {stampActive && (
          <div className="stamper-controls animate-fade-in">
            <div className="control-row">
              <label className="font-mono text-xs text-muted">Initials:</label>
              <input
                type="text"
                maxLength={3}
                value={monogram}
                onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                className="monogram-input font-display"
                placeholder="AV"
              />
            </div>

            <div className="control-row">
              <label className="font-mono text-xs text-muted">Wax Color:</label>
              <div className="wax-color-swatches">
                {colors.map(c => (
                  <button
                    key={c.id}
                    className={`color-swatch ${waxColor === c.id ? 'active' : ''}`}
                    style={{ background: c.bg }}
                    onClick={() => setWaxColor(c.id)}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            <div className="stamper-hint font-serif text-xs">
              ✦ Click any paragraph or page margin to drop an authentic personalized wax seal!
            </div>

            {stamps.length > 0 && (
              <button onClick={clearStamps} className="clear-stamps-btn font-mono text-xs">
                <Trash2 size={12} /> Clear all seals ({stamps.length})
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
