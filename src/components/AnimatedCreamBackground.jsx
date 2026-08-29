import React, { useEffect, useRef } from 'react';

export default function AnimatedCreamBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Particle system: gold dust, ink flecks, and light specks
    const particleCount = Math.min(width < 768 ? 35 : 75, 90);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        baseAlpha: Math.random() * 0.45 + 0.15,
        alpha: 0.3,
        dx: (Math.random() - 0.5) * 0.4,
        dy: -(Math.random() * 0.4 + 0.2), // gentle upward float like parchment dust
        hue: Math.random() > 0.6 ? 42 : (Math.random() > 0.5 ? 35 : 28), // warm gold/sepia tones
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Drifting large ambient light orbs
    const orbs = [
      { x: width * 0.2, y: height * 0.3, radius: 280, vx: 0.15, vy: 0.1, color: 'rgba(235, 218, 185, 0.45)' },
      { x: width * 0.8, y: height * 0.2, radius: 340, vx: -0.12, vy: 0.14, color: 'rgba(245, 230, 205, 0.5)' },
      { x: width * 0.5, y: height * 0.75, radius: 380, vx: 0.1, vy: -0.12, color: 'rgba(228, 206, 170, 0.4)' },
      { x: width * 0.15, y: height * 0.85, radius: 250, vx: -0.08, vy: -0.1, color: 'rgba(240, 222, 192, 0.35)' },
    ];

    let tick = 0;

    const render = () => {
      tick++;
      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw drifting soft ambient orbs with blur
      ctx.filter = 'blur(60px)';
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce gently inside boundary
        if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1;
        if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1;

        // Subtle mouse pull
        const dx = mouseX - orb.x;
        const dy = mouseY - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 600) {
          orb.x += dx * 0.0003;
          orb.y += dy * 0.0003;
        }

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, 'rgba(250, 246, 238, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.filter = 'none';

      // 2. Draw floating particles (gold flecks & parchment dust)
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        // Mouse interaction: soft repel / swirl
        const mdx = mouseX - p.x;
        const mdy = mouseY - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          const force = (140 - mdist) / 140;
          p.x -= (mdx / mdist) * force * 1.5;
          p.y -= (mdy / mdist) * force * 1.5;
        }

        // Wrap around screen edges
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Shimmering alpha pulse
        const shimmer = Math.sin(tick * p.pulseSpeed + p.pulseOffset);
        p.alpha = p.baseAlpha + shimmer * 0.15;
        if (p.alpha < 0.05) p.alpha = 0.05;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 65%, 45%, ${p.alpha})`;
        ctx.shadowColor = 'rgba(184, 134, 11, 0.4)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="animated-cream-bg-wrapper" aria-hidden="true">
      <canvas ref={canvasRef} className="animated-cream-canvas" />
      <div className="animated-cream-vignette" />
      <div className="animated-cream-filigree-grid" />
    </div>
  );
}
