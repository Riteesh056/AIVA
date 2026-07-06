/* ================================================================
   AIVA — Enhanced Interactive Animated World (bg.js)
   
   Features:
   ✦ 220 particles with physics
   ✦ Mouse repulsion + attraction field
   ✦ Click → triple ripple rings + particle burst explosion
   ✦ Mouse trail with fade
   ✦ Speed-reactive mouse (faster = stronger push)
   ✦ Particle size breathing + color cycling
   ✦ Constellation connections with glow
   ✦ Parallax depth layers
   ✦ Gradient orbs + grid
   ================================================================ */

class AnimatedWorld {
  constructor() {
    this.canvas = document.getElementById('bg-canvas');
    this.ctx    = this.canvas.getContext('2d');
    this.W = 0; this.H = 0; this.WORLD_H = 0;
    this.WORLD_MULT = 6;

    this.particles = [];   // main field
    this.orbs      = [];   // background blobs

    this.mouse = { x: -9999, y: -9999, px: -9999, py: -9999, vx: 0, vy: 0, speed: 0 };

    this.scrollY      = 0;
    this.lerpedScroll = 0;
    this.time         = 0;

    this.GRID_PARALLAX = 0.12;
    this.PART_PARALLAX = 0.4;
    this.PARTICLE_COUNT = 1000;

    // Interaction radii
    this.REPEL_R   = 80;    // strong push zone
    this.ATTRACT_R = 180;   // gentle pull zone
    this.CONNECT_R = 75;    // line connection distance (tighter for perf at 1k)

    this._handlers = {
      resize:     () => this._resize(),
      mousemove:  (e) => this._onMove(e),
      mouseleave: ()  => { this.mouse.x = -9999; this.mouse.y = -9999; },
    };

    this._init();
  }

  /* ── Init ──────────────────────────────────────────────────── */
  _init() {
    this._resize();
    window.addEventListener('resize',    this._handlers.resize);
    window.addEventListener('mousemove', this._handlers.mousemove);
    document.addEventListener('mouseleave', this._handlers.mouseleave);
    this._createOrbs(8);
    this._createParticles(this.PARTICLE_COUNT);
    this._animate();
  }

  _resize() {
    this.W       = this.canvas.width  = window.innerWidth;
    this.H       = this.canvas.height = window.innerHeight;
    this.WORLD_H = this.H * this.WORLD_MULT;
  }

  /* ── Mouse handlers ────────────────────────────────────────── */
  _onMove(e) {
    const dx = e.clientX - this.mouse.x;
    const dy = e.clientY - this.mouse.y;
    this.mouse.vx    = dx;
    this.mouse.vy    = dy;
    this.mouse.speed = Math.min(Math.sqrt(dx*dx + dy*dy), 40);
    this.mouse.px    = this.mouse.x;
    this.mouse.py    = this.mouse.y;
    this.mouse.x     = e.clientX;
    this.mouse.y     = e.clientY;
  }

  /* ── Create particles ──────────────────────────────────────── */
  _createParticles(count) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      const isAccent  = Math.random() > 0.55;
      const isBright  = isAccent && Math.random() > 0.65;
      const isLarge   = Math.random() > 0.85;
      this.particles.push({
        x:       Math.random() * this.W,
        y:       Math.random() * (this.WORLD_H || this.H * this.WORLD_MULT),
        vx:      (Math.random() - 0.5) * 0.35,
        vy:      (Math.random() - 0.5) * 0.28,
        homeVx:  (Math.random() - 0.5) * 0.35, // drift velocity to restore to
        homeVy:  (Math.random() - 0.5) * 0.28,
        size:    isLarge ? Math.random() * 2.5 + 1.5 : Math.random() * 1.5 + 0.5,
        baseSize:isLarge ? Math.random() * 2.5 + 1.5 : Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        phase:   Math.random() * Math.PI * 2,
        hue:     isAccent ? 255 + Math.random() * 40 - 20 : 0, // for accent hue cycling
        isAccent,
        isBright,
        isLarge,
        pushed:  false,
      });
    }
  }

  /* ── Create orbs ───────────────────────────────────────────── */
  _createOrbs(count) {
    const palette = [
      [108,71,255], [139,92,246], [99,44,202],
      [67,22,180],  [29,14,80],   [196,132,252],
      [55,30,120],  [180,100,255],
    ];
    this.orbs = [];
    for (let i = 0; i < count; i++) {
      const c = palette[i % palette.length];
      this.orbs.push({
        baseX:  Math.random() * this.W,
        baseY:  Math.random() * this.H,
        radius: Math.random() * 340 + 180,
        col:    c,
        speed:  Math.random() * 0.0016 + 0.0006,
        phase:  Math.random() * Math.PI * 2,
        ampX:   Math.random() * 200 + 70,
        ampY:   Math.random() * 130 + 50,
        alpha:  Math.random() * 0.13 + 0.06,
      });
    }
  }

  /* ── Public: set scroll ────────────────────────────────────── */
  setScrollY(y) { this.scrollY = y; }

  /* ═══════════════════════════════════════════════════════════
     DRAW LAYERS
     ═══════════════════════════════════════════════════════════ */

  _drawBackground() {
    const ctx = this.ctx;
    const g = ctx.createLinearGradient(0, 0, this.W * 0.7, this.H);
    g.addColorStop(0,   '#07070E');
    g.addColorStop(0.5, '#0B0B18');
    g.addColorStop(1,   '#070712');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, this.W, this.H);
  }

  _drawGrid() {
    const ctx    = this.ctx;
    const offset = this.lerpedScroll * this.GRID_PARALLAX;
    const GRID   = 88;
    ctx.lineWidth   = 0.5;

    // Horizontal (drift with scroll)
    ctx.strokeStyle = 'rgba(108,71,255,0.045)';
    const startY = -(offset % GRID);
    for (let y = startY; y <= this.H + GRID; y += GRID) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(this.W, y); ctx.stroke();
    }

    // Vertical
    ctx.strokeStyle = 'rgba(108,71,255,0.03)';
    for (let x = 0; x <= this.W; x += GRID) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, this.H); ctx.stroke();
    }
  }

  _drawOrbs() {
    const ctx = this.ctx;
    for (const o of this.orbs) {
      const x = o.baseX + Math.sin(this.time * o.speed + o.phase) * o.ampX;
      const y = o.baseY + Math.cos(this.time * o.speed * 0.65 + o.phase) * o.ampY;
      const g = ctx.createRadialGradient(x, y, 0, x, y, o.radius);
      g.addColorStop(0,    `rgba(${o.col[0]},${o.col[1]},${o.col[2]},${o.alpha})`);
      g.addColorStop(0.5,  `rgba(${o.col[0]},${o.col[1]},${o.col[2]},${o.alpha*0.4})`);
      g.addColorStop(1,    `rgba(${o.col[0]},${o.col[1]},${o.col[2]},0)`);
      ctx.beginPath();
      ctx.arc(x, y, o.radius, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }
  }





  /* ── Main particles ────────────────────────────────────────── */
  _drawParticles() {
    const ctx    = this.ctx;
    const offset = this.lerpedScroll * this.PART_PARALLAX;
    const mx     = this.mouse.x;
    const my     = this.mouse.y + offset;   // mouse in world space
    const mspeed = this.mouse.speed;

    for (let i = 0; i < this.particles.length; i++) {
      const p  = this.particles[i];
      const sy = p.y - offset; // screen y

      // ── Interaction: repulsion + attraction ──
      if (mx > -1000) {
        const dx   = p.x - mx;
        const dy   = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.REPEL_R && dist > 0.5) {
          // REPEL — strong push, speed-reactive
          const force  = (1 - dist / this.REPEL_R) * (0.5 + mspeed * 0.018);
          const nx = dx / dist;
          const ny = dy / dist;
          p.vx += nx * force * 0.8;
          p.vy += ny * force * 0.8;
          p.pushed = true;
        } else if (dist < this.ATTRACT_R && dist > this.REPEL_R) {
          // ATTRACT — gentle pull
          const force = (1 - dist / this.ATTRACT_R) * 0.04;
          const nx = -dx / dist;
          const ny = -dy / dist;
          p.vx += nx * force;
          p.vy += ny * force;
          p.pushed = false;
        } else {
          p.pushed = false;
        }
      }

      // ── Physics: velocity decay + drift home ──
      p.vx = p.vx * 0.94 + p.homeVx * 0.06;
      p.vy = p.vy * 0.94 + p.homeVy * 0.06;

      // Clamp velocity
      const spd = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
      if (spd > 12) { p.vx *= 12/spd; p.vy *= 12/spd; }

      p.x += p.vx;
      p.y += p.vy;

      // Wrap
      if (p.x < -10)               p.x = this.W + 10;
      if (p.x > this.W + 10)       p.x = -10;
      if (p.y < 0)                  p.y = this.WORLD_H;
      if (p.y > this.WORLD_H)       p.y = 0;

      // ── Cull off-screen ──
      if (sy < -80 || sy > this.H + 80) continue;

      // ── Breathing size + opacity ──
      const breathe = Math.sin(this.time * 0.018 + p.phase);
      const pSize   = p.baseSize * (1 + breathe * 0.35);
      const pAlpha  = Math.max(0, p.opacity + breathe * 0.18);

      // Hue cycling for accent particles
      let r = 108, g = 71, b = 255;
      if (p.isAccent && p.isBright) {
        const hShift = Math.sin(this.time * 0.008 + p.phase) * 30;
        // Shift between indigo and violet
        r = Math.round(108 + hShift * 0.5);
        g = Math.round(71  + hShift * 0.3);
        b = 255;
      }

      // ── Draw particle ──
      ctx.beginPath();
      ctx.arc(p.x, sy, pSize, 0, Math.PI * 2);

      if (p.isAccent) {
        ctx.fillStyle = `rgba(${r},${g},${b},${pAlpha})`;
      } else {
        ctx.fillStyle = `rgba(255,255,255,${pAlpha * 0.42})`;
      }
      ctx.fill();

      // Glow halo for bright/large accent particles
      if (p.isBright || p.isLarge) {
        const haloR = pSize * (p.isBright ? 4.5 : 3);
        const grd   = ctx.createRadialGradient(p.x, sy, 0, p.x, sy, haloR);
        const ga    = pAlpha * (p.isBright ? 0.22 : 0.1);
        grd.addColorStop(0, `rgba(${r},${g},${b},${ga})`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, sy, haloR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // ── Constellation connections ──
      for (let j = i + 1; j < this.particles.length; j++) {
        const q   = this.particles[j];
        const qsy = q.y - offset;
        if (qsy < -80 || qsy > this.H + 80) continue;

        const dx = p.x - q.x;
        const dy = sy  - qsy;
        const d  = Math.sqrt(dx * dx + dy * dy);

        if (d < this.CONNECT_R) {
          const t         = 1 - d / this.CONNECT_R;
          const isALine   = p.isAccent || q.isAccent;
          const pushed    = p.pushed || q.pushed;
          // Lines glow brighter if either particle was pushed
          const lineAlpha = t * t * (isALine ? 0.22 : 0.08) * (pushed ? 2.5 : 1);

          ctx.beginPath();
          ctx.moveTo(p.x, sy);
          ctx.lineTo(q.x, qsy);
          ctx.strokeStyle = isALine
            ? `rgba(108,71,255,${lineAlpha})`
            : `rgba(200,190,255,${lineAlpha * 0.5})`;
          ctx.lineWidth = pushed ? 1.2 : 0.6;
          ctx.stroke();
        }
      }
    }
  }



  /* ── Vignette ─────────────────────────────────────────────── */
  _drawVignette() {
    const ctx = this.ctx;
    const g = ctx.createRadialGradient(
      this.W * 0.5, this.H * 0.5, this.H * 0.15,
      this.W * 0.5, this.H * 0.5, this.H * 0.9
    );
    g.addColorStop(0, 'rgba(9,9,15,0)');
    g.addColorStop(1, 'rgba(9,9,15,0.6)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, this.W, this.H);
  }

  /* ── Main animation loop ───────────────────────────────────── */
  _animate() {
    this.time++;
    this.lerpedScroll += (this.scrollY - this.lerpedScroll) * 0.07;

    // Clear
    this.ctx.clearRect(0, 0, this.W, this.H);

    // Draw back → front
    this._drawBackground();
    this._drawGrid();
    this._drawOrbs();
    this._drawParticles();
    this._drawVignette();

    requestAnimationFrame(() => this._animate());
  }

  destroy() {
    window.removeEventListener('resize',    this._handlers.resize);
    window.removeEventListener('mousemove', this._handlers.mousemove);
    document.removeEventListener('mouseleave', this._handlers.mouseleave);
  }
}

/* Boot */
document.addEventListener('DOMContentLoaded', () => {
  window.bgWorld = new AnimatedWorld();
});
