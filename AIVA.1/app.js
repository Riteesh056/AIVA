/* ================================================================
   AIVA — Main Application (app.js)
   Router · Auth · Mock DB · All Page Renderers · Smooth Scroll
   ================================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════════
   SEED DATA
   ══════════════════════════════════════════════════════════════ */
const SEED = {
  users: [
    { id:'u1', name:'Alex Rivera',   email:'admin@aiva.agency', password:'admin123', role:'admin',  company:'AIVA Agency',    avatar:'AR' },
    { id:'u2', name:'Sam Chen',      email:'staff@aiva.agency', password:'staff123', role:'staff',  company:'AIVA Agency',    avatar:'SC' },
    { id:'u3', name:'Jordan Blake',  email:'client@aiva.co',    password:'client123',role:'client', company:'Blake & Co.',    avatar:'JB' },
    { id:'u4', name:'Maya Patel',    email:'maya@techflow.io',  password:'maya123',  role:'client', company:'TechFlow Inc.',  avatar:'MP' },
  ],
  projects: [
    {
      id:'p1', title:'Brand Identity Redesign',
      description:'Complete overhaul of visual identity including logo design, color system, typography scale, brand guidelines document, and asset library.',
      clientId:'u3', assignedStaffId:'u2', status:'In Progress', progress:65,
      statusNote:'Logo variants finalized and approved by client. Currently working on the comprehensive brand guidelines document — on track for delivery next week.',
      milestones:[
        { label:'Discovery & Strategy',  done:true  },
        { label:'Concept Development',   done:true  },
        { label:'Logo Design',           done:true  },
        { label:'Brand Guidelines',      done:false },
        { label:'Final Asset Delivery',  done:false },
      ],
      startDate:'2025-01-10',
    },
    {
      id:'p2', title:'Website Redesign & Dev',
      description:'Full redesign and ground-up rebuild of the company website with headless CMS, SEO optimization, Core Web Vitals, and mobile-first responsive layout.',
      clientId:'u3', assignedStaffId:'u2', status:'Under Review', progress:90,
      statusNote:'Client review round 2 in progress. Minor copy revisions and one hero image swap pending. Launch target: end of this week.',
      milestones:[
        { label:'Strategy & Wireframing', done:true  },
        { label:'Design System',          done:true  },
        { label:'Development',            done:true  },
        { label:'Content Integration',    done:true  },
        { label:'Client Review & Launch', done:false },
      ],
      startDate:'2025-02-01',
    },
    {
      id:'p3', title:'Social Media Campaign — Q2',
      description:'Full Q2 social media strategy, 30-day content calendar, and 90+ creative assets for Instagram, LinkedIn, and Twitter including Reels and carousels.',
      clientId:'u4', assignedStaffId:'u2', status:'Completed', progress:100,
      statusNote:'All assets delivered and scheduled. Campaign performed above expectations — 340% increase in engagement, 2.1k new followers across platforms.',
      milestones:[
        { label:'Strategy Document',    done:true },
        { label:'Content Calendar',     done:true },
        { label:'Asset Creation',       done:true },
        { label:'Scheduling & Launch',  done:true },
        { label:'Performance Report',   done:true },
      ],
      startDate:'2025-01-20',
    },
    {
      id:'p4', title:'Product Launch Campaign',
      description:'Integrated multi-channel launch campaign including brand video, paid ads across Google & Meta, email sequences, and strategic PR outreach.',
      clientId:'u3', assignedStaffId:'u2', status:'Not Started', progress:0,
      statusNote:'Project kickoff call scheduled. Brief document being prepared.',
      milestones:[
        { label:'Kickoff Meeting',    done:false },
        { label:'Creative Brief',     done:false },
        { label:'Asset Production',   done:false },
        { label:'Campaign Launch',    done:false },
        { label:'Analytics & Wrap',   done:false },
      ],
      startDate:'2025-03-15',
    },
  ],
  services: [
    { id:'s1', title:'Brand Strategy & Identity',      description:'From discovery to full visual identity systems — we craft brands that resonate, differentiate, and endure for decades.', icon:'✦', category:'Branding',    visible:true  },
    { id:'s2', title:'Web Design & Development',       description:'High-performance websites and web apps that convert visitors into loyal clients. Built for speed, accessibility, and scale.', icon:'◈', category:'Digital',     visible:true  },
    { id:'s3', title:'Social Media Management',        description:'Full-service social: strategy, content creation, scheduling, community management, and analytics. Grow your audience authentically.', icon:'◎', category:'Marketing',   visible:true  },
    { id:'s4', title:'Motion & Video Production',      description:'From explainer animations to cinematic brand films — compelling visual storytelling that moves your audience to action.', icon:'▶', category:'Creative',    visible:true  },
    { id:'s5', title:'Paid Media & Performance',       description:'ROI-driven campaigns across Google, Meta, LinkedIn, and TikTok. Data-backed creative strategies that scale profitably.', icon:'◆', category:'Marketing',   visible:true  },
    { id:'s6', title:'Campaign & Launch Consulting',   description:'Strategic advisory for major product launches, rebrands, or market entries — from senior creative directors with 10+ years experience.', icon:'◉', category:'Strategy',    visible:true  },
  ],
  portfolio: [
    { id:'pf1', title:'Bloom Beauty Co.',     glyph:'◉', tags:['Branding','Web','Social'],         outcome:'Complete brand identity and e-commerce site. 280% increase in online sales within 3 months of launch.', featured:true,  gradient:'linear-gradient(135deg,#667eea,#764ba2)' },
    { id:'pf2', title:'Vertex SaaS Platform', glyph:'◈', tags:['Web App','UI/UX','Design System'], outcome:'Full product UI/UX redesign. Reduced churn by 40%, improved NPS by 25 points, faster onboarding.',   featured:true,  gradient:'linear-gradient(135deg,#f093fb,#f5576c)' },
    { id:'pf3', title:'NorthStar Consulting', glyph:'✦', tags:['Brand','Positioning','Web'],        outcome:'Complete repositioning & brand refresh for B2B consultancy. Landed 3 Fortune 500 clients in Q1.',     featured:true,  gradient:'linear-gradient(135deg,#4facfe,#00f2fe)' },
    { id:'pf4', title:'Ember Restaurant Grp', glyph:'▶', tags:['Branding','Campaign','Photo'],      outcome:'New identity and launch campaign for restaurant group expansion. Sold out opening weekend.',            featured:false, gradient:'linear-gradient(135deg,#fa709a,#fee140)' },
    { id:'pf5', title:'TechFlow Inc.',        glyph:'◆', tags:['Video','Paid Media','Social'],      outcome:'Product launch campaign. 1.2M views, 340% engagement increase, $2M in attributed pipeline.',         featured:false, gradient:'linear-gradient(135deg,#a18cd1,#fbc2eb)' },
  ],
  testimonials: [
    { id:'t1', author:'Sarah Kim',     company:'Bloom Beauty Co.',     quote:'AIVA completely transformed our brand. Every touchpoint — from our logo to our checkout flow — feels cohesive, premium, and exactly who we are. Our customers have noticed.', rating:5, avatar:'SK' },
    { id:'t2', author:'Marcus Oduya',  company:'Vertex Technologies',  quote:'The design system they built is world-class. It cut our development time by 60% and made the product feel instantly more premium. Our retention metrics jumped immediately.', rating:5, avatar:'MO' },
    { id:'t3', author:'Priya Sharma',  company:'NorthStar Consulting', quote:'Working with AIVA was the best business decision we made this year. They understood our positioning challenges deeply and delivered a brand that opened doors we couldn\'t open before.', rating:5, avatar:'PS' },
    { id:'t4', author:'Liam Torres',   company:'Ember Restaurant Grp', quote:'Creative, fast, and incredibly professional. The AIVA team delivered beyond what we imagined — and on a tight timeline for our opening. They\'re our agency of record now.', rating:5, avatar:'LT' },
  ],
  leads: [
    { id:'l1', name:'Chris Anderson', email:'chris@startup.io',      company:'StartupIO',         message:'Looking for complete brand identity design for our Series A fundraise announcement. We need brand, website, and pitch deck support. Timeline: 6 weeks.',     status:'new',       createdAt:'2025-02-15T09:23:00Z' },
    { id:'l2', name:'Rachel Green',   email:'rachel@greenmfg.com',   company:'Green Manufacturing',message:'We\'re an industrial company that wants a modern, sophisticated web presence. Need full website redesign with e-commerce integration.',                      status:'contacted', createdAt:'2025-02-10T14:05:00Z' },
    { id:'l3', name:'Daniel Wu',      email:'d.wu@fintechco.io',     company:'FinTech Co',        message:'Interested in ongoing social media management and quarterly campaign support for our B2B fintech product targeting enterprise decision-makers.',               status:'converted', createdAt:'2025-01-28T11:30:00Z' },
  ],
};

/* ══════════════════════════════════════════════════════════════
   DB — localStorage mock database
   ══════════════════════════════════════════════════════════════ */
const DB = {
  _key: k => `aiva_${k}`,

  get(k) {
    try { return JSON.parse(localStorage.getItem(this._key(k))) || []; }
    catch { return []; }
  },
  set(k, data) {
    localStorage.setItem(this._key(k), JSON.stringify(data));
  },
  getById(k, id) {
    return this.get(k).find(x => x.id === id);
  },
  create(k, item) {
    const list = this.get(k);
    item.id = item.id || `${k[0]}${Date.now()}`;
    list.push(item);
    this.set(k, list);
    return item;
  },
  update(k, id, patch) {
    const list = this.get(k);
    const i = list.findIndex(x => x.id === id);
    if (i !== -1) { list[i] = { ...list[i], ...patch }; this.set(k, list); return list[i]; }
    return null;
  },
  delete(k, id) {
    this.set(k, this.get(k).filter(x => x.id !== id));
  },
  init() {
    if (!localStorage.getItem('aiva_seeded_v2')) {
      Object.keys(SEED).forEach(k => this.set(k, SEED[k]));
      localStorage.setItem('aiva_seeded_v2', '1');
    }
  },
};

/* ══════════════════════════════════════════════════════════════
   AUTH
   ══════════════════════════════════════════════════════════════ */
const Auth = {
  _key: 'aiva_auth_user',
  getUser()   { try { return JSON.parse(localStorage.getItem(this._key)); } catch { return null; } },
  setUser(u)  { localStorage.setItem(this._key, JSON.stringify(u)); },
  logout()    { localStorage.removeItem(this._key); },
  login(email, pw) {
    const u = DB.get('users').find(x => x.email === email && x.password === pw);
    if (u) { this.setUser(u); return u; }
    return null;
  },
};

/* ══════════════════════════════════════════════════════════════
   SMOOTH SCROLL SYSTEM (for public "animated world" pages)
   ══════════════════════════════════════════════════════════════ */
const Scroll = (() => {
  let cur = 0, tgt = 0, max = 0, raf = null;
  let active = false;

  const handlers = {
    wheel: (e) => { e.preventDefault(); tgt += e.deltaY * 0.72; _clamp(); },
    key:   (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { tgt += 220; _clamp(); }
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   { tgt -= 220; _clamp(); }
    },
    touchData: { y: 0 },
    touchStart: (e) => { handlers.touchData.y = e.touches[0].clientY; },
    touchMove: (e) => {
      const dy = handlers.touchData.y - e.touches[0].clientY;
      tgt += dy * 1.4;
      _clamp();
      handlers.touchData.y = e.touches[0].clientY;
      e.preventDefault();
    },
  };

  function _clamp() { tgt = Math.max(0, Math.min(tgt, max)); }

  function _tick() {
    cur += (tgt - cur) * 0.08;
    const world = document.querySelector('.scroll-world');
    if (world) world.style.transform = `translateY(${-cur}px)`;
    if (window.bgWorld) window.bgWorld.setScrollY(cur);
    _triggerReveals(cur);

    // Scroll indicator fade
    const ind = document.getElementById('scroll-indicator');
    if (ind) ind.classList.toggle('fade', cur > 80);

    raf = requestAnimationFrame(_tick);
  }

  function _triggerReveals(scrollY) {
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
      const rect   = el.getBoundingClientRect();
      const elAbsY = rect.top + scrollY;
      if (elAbsY < scrollY + window.innerHeight * 0.88) {
        el.classList.add('in');
      }
    });
  }

  return {
    start(totalH) {
      if (active) this.stop();
      cur = 0; tgt = 0;
      max = Math.max(0, totalH - window.innerHeight);
      active = true;
      window.addEventListener('wheel',      handlers.wheel,      { passive: false });
      window.addEventListener('keydown',    handlers.key);
      window.addEventListener('touchstart', handlers.touchStart, { passive: true });
      window.addEventListener('touchmove',  handlers.touchMove,  { passive: false });
      raf = requestAnimationFrame(_tick);
      // Trigger initial reveals
      _triggerReveals(0);
    },
    stop() {
      active = false;
      window.removeEventListener('wheel',      handlers.wheel);
      window.removeEventListener('keydown',    handlers.key);
      window.removeEventListener('touchstart', handlers.touchStart);
      window.removeEventListener('touchmove',  handlers.touchMove);
      if (raf) cancelAnimationFrame(raf);
      if (window.bgWorld) window.bgWorld.setScrollY(0);
    },
    to(y) { tgt = Math.max(0, Math.min(y, max)); },
    triggerReveals: _triggerReveals,
  };
})();

/* ══════════════════════════════════════════════════════════════
   ROUTER
   ══════════════════════════════════════════════════════════════ */
let currentPage = '';
let currentDashSection = 'overview';

function navigate(page) {
  currentPage = page;
  Scroll.stop();

  const publicPages = ['home','about','portfolio','testimonials','contact'];
  const isPublic    = publicPages.includes(page);

  // Navbar visibility
  const navbar  = document.getElementById('navbar');
  const navLinks = document.getElementById('nav-links');
  const scrollInd = document.getElementById('scroll-indicator');

  if (navbar) {
    navbar.classList.toggle('hidden', !isPublic && page !== 'services' && page !== 'login');
    // For services keep navbar but update actions
    if (!isPublic && page === 'services') {
      navbar.classList.remove('hidden');
    }
  }
  if (navLinks) navLinks.style.display = isPublic ? 'flex' : 'none';
  if (scrollInd) scrollInd.style.display = isPublic ? 'flex' : 'none';

  // Update nav action buttons
  _updateNavActions();

  // Render page
  switch (page) {
    case 'home':         renderHome();         break;
    case 'about':        renderAbout();        break;
    case 'portfolio':    renderPortfolio();    break;
    case 'testimonials': renderTestimonials(); break;
    case 'contact':      renderContact();      break;
    case 'login':        renderLogin();        break;
    case 'services':     renderServices();     break;
    case 'portal':       renderPortal();       break;
    case 'dashboard':    renderDashboard();    break;
  }
}

function _updateNavActions() {
  const el   = document.getElementById('nav-actions');
  const user = Auth.getUser();
  if (!el) return;
  if (user) {
    el.innerHTML = `
      <button class="btn-glass btn-sm" onclick="navigate('${user.role==='client'?'portal':'dashboard'}')">
        ${user.role==='client' ? 'My Portal' : 'Dashboard'}
      </button>
      <button class="btn-glass btn-sm" onclick="Auth.logout();navigate('login')">Sign Out</button>
    `;
  } else {
    el.innerHTML = `<button class="btn-glass" id="nav-login-btn" onclick="navigate('login')">Login →</button>`;
  }
}

// Called from nav links
function navTo(e, page) {
  e.preventDefault();
  navigate(page);
}

// Split text into spans for staggered word-by-word animation
function splitTextIntoSpans(text) {
  return text.split(' ').map((word, i) => {
    const delay = (i * 75) / 1000;
    return `<span class="reveal-word" style="animation-delay: ${delay}s">${word}</span>`;
  }).join(' ');
}

/* ══════════════════════════════════════════════════════════════
   TOAST & MODAL UTILITIES
   ══════════════════════════════════════════════════════════════ */
function toast(msg, type = 'success') {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const icon = type === 'success' ? '✓' : '✕';
  const col  = type === 'success' ? '#34D399' : '#F87171';
  const el   = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span style="color:${col};font-weight:700;">${icon}</span>${msg}`;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.transition = 'all 0.3s ease';
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(8px)';
    setTimeout(() => el.remove(), 300);
  }, 3200);
}

function openModal(title, bodyHTML) {
  closeModal();
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'active-modal';
  overlay.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <h3 class="modal-title">${title}</h3>
        <button class="btn-icon" onclick="closeModal()">✕</button>
      </div>
      <div>${bodyHTML}</div>
    </div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.body.appendChild(overlay);
}

function closeModal() {
  const m = document.getElementById('active-modal');
  if (m) m.remove();
}

/* ══════════════════════════════════════════════════════════════
   HELPER UTILITIES
   ══════════════════════════════════════════════════════════════ */
function fmtDate(d) {
  if (!d) return 'N/A';
  try { return new Date(d).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }); }
  catch { return String(d); }
}

function statusClass(s) {
  if (!s) return '';
  return 'status-' + s.toLowerCase().replace(/\s+/g, '-');
}

function renderProgress(pct, height = 6) {
  return `
    <div class="progress-wrap" style="height:${height}px;">
      <div class="progress-fill" style="width:${pct}%;${pct === 0 ? 'display:none;' : ''}"></div>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════
   ██████  HOME PAGE
   ══════════════════════════════════════════════════════════════ */
function renderHome() {
  const app = document.getElementById('app');
  const pf  = DB.get('portfolio').filter(p => p.featured);
  const ts  = DB.get('testimonials');

  app.innerHTML = `
    <div class="scroll-world">
      <div class="scroll-track" id="scroll-track">

        <!-- ════ HERO ════ -->
        <section class="hero-section" id="sec-home">
          <div class="section-inner">
            <div class="hero-grid">
              <!-- Left: Copy -->
              <div>
                <div class="hero-label reveal">🏆 &nbsp;Award-winning creative agency</div>
                <h1 class="hero-title reveal">
                  ${splitTextIntoSpans("We Build Brands That Move People")}
                </h1>
                <p class="hero-desc reveal">
                  AIVA partners with forward-thinking companies to craft bold identities, memorable digital experiences, and high-performance campaigns that drive measurable results.
                </p>
                <div class="hero-cta reveal">
                  <button class="btn-primary" onclick="Scroll.to(document.getElementById('sec-contact').offsetTop)">
                    Start a Project &nbsp;→
                  </button>
                  <button class="btn-outline" onclick="Scroll.to(document.getElementById('sec-portfolio').offsetTop)">
                    View Work
                  </button>
                </div>
                <div class="hero-stats reveal-stagger in" style="margin-top:3rem;">
                  <div>
                    <div class="hero-stat-num">120+</div>
                    <div class="hero-stat-lbl">Projects Delivered</div>
                  </div>
                  <div>
                    <div class="hero-stat-num">98%</div>
                    <div class="hero-stat-lbl">Client Satisfaction</div>
                  </div>
                  <div>
                    <div class="hero-stat-num">$40M+</div>
                    <div class="hero-stat-lbl">Revenue Generated</div>
                  </div>
                </div>
              </div>

              <!-- Right: Floating glass cards -->
              <div class="hero-floats">
                <div class="glass-card hero-float-card">
                  <div style="display:flex;align-items:center;gap:0.65rem;margin-bottom:1rem;">
                    <div style="width:9px;height:9px;border-radius:50%;background:#10B981;box-shadow:0 0 8px #10B981;"></div>
                    <span style="font-size:0.7rem;color:var(--muted);">Active Project</span>
                  </div>
                  <div style="font-family:var(--font-heading);font-style:italic;font-size:1.35rem;font-weight:800;letter-spacing:-0.02em;margin-bottom:1.1rem;">Bloom Beauty Co.</div>
                  <div style="display:flex;justify-content:space-between;font-size:0.72rem;color:var(--muted);margin-bottom:0.45rem;">
                    <span>Brand Identity</span><span style="color:var(--accent-light);">90%</span>
                  </div>
                  ${renderProgress(90)}
                </div>

                <div class="glass-card hero-float-card">
                  <div style="font-size:0.68rem;color:var(--muted);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.85rem;">Services We Offer</div>
                  <div style="display:flex;flex-wrap:wrap;gap:0.45rem;">
                    ${['Branding','Web Design','Motion','Paid Media','Strategy'].map(s => `<span class="badge">${s}</span>`).join('')}
                  </div>
                </div>

                <div class="glass-card hero-float-card">
                  <div style="display:flex;align-items:center;gap:0.8rem;margin-bottom:0.85rem;">
                    <div class="t-avatar">SK</div>
                    <div>
                      <div style="font-size:0.84rem;font-weight:600;">Sarah Kim</div>
                      <div class="t-stars" style="font-size:0.75rem;">★★★★★</div>
                    </div>
                  </div>
                  <p style="font-size:0.8rem;color:var(--muted);line-height:1.55;">"AIVA completely transformed our brand. The results speak for themselves."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ════ ABOUT ════ -->
        <section class="section" id="sec-about" style="padding-top:5rem;padding-bottom:5rem;">
          <div class="section-inner">
            <div class="about-grid">
              <div>
                <span class="section-eyebrow reveal">Who we are</span>
                <h2 class="display-lg reveal" style="margin-bottom:1.5rem;">
                  ${splitTextIntoSpans("A Creative Studio Obsessed With Excellence")}
                </h2>
                <p class="body-lg reveal" style="margin-bottom:1.25rem;">
                  Founded in 2017, AIVA is a full-service creative agency that partners with ambitious brands to create lasting visual identities and digital experiences.
                </p>
                <p class="body-md reveal" style="margin-bottom:2rem;">
                  Our senior-only team of 12 specialists across branding, web, motion, and strategy works as a cohesive unit on every project — no juniors, no handoffs.
                </p>
                <div style="display:flex;flex-wrap:wrap;gap:0.5rem;" class="reveal">
                  ${['Brand Strategy','Visual Identity','Web & App Design','Motion Design','Paid Media','Creative Consulting'].map(b => `<span class="badge">${b}</span>`).join('')}
                </div>
              </div>
              <div class="about-stat-grid reveal-stagger">
                ${[
                  { num:'120+',  lbl:'Projects', sub:'Across 14 industries'          },
                  { num:'98%',   lbl:'Retention', sub:'Clients that return'          },
                  { num:'$40M+', lbl:'Revenue',   sub:'Generated for clients'        },
                  { num:'12',    lbl:'Specialists',sub:'Senior-only team'            },
                ].map(s => `
                  <div class="glass-card about-stat-card">
                    <div class="about-stat-num">${s.num}</div>
                    <div style="font-weight:700;font-size:0.88rem;margin:0.3rem 0 0.2rem;">${s.lbl}</div>
                    <div style="font-size:0.75rem;color:var(--muted);">${s.sub}</div>
                  </div>`).join('')}
              </div>
            </div>
          </div>
        </section>

        <!-- ════ PORTFOLIO (featured) ════ -->
        <section class="section" id="sec-portfolio" style="padding-top:5rem;padding-bottom:5rem;">
          <div class="section-inner">
            <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3rem;" class="reveal">
              <div>
                <span class="section-eyebrow">Featured Work</span>
                <h2 class="display-lg">${splitTextIntoSpans("Case Studies")}</h2>
              </div>
              <button class="btn-glass btn-sm" onclick="navigate('portfolio')">View All →</button>
            </div>
            <div class="portfolio-grid reveal-stagger">
              ${pf.map(p => portfolioCardHTML(p)).join('')}
            </div>
          </div>
        </section>

        <!-- ════ TESTIMONIALS ════ -->
        <section class="section" id="sec-testimonials" style="padding-top:5rem;padding-bottom:4rem;">
          <div class="section-inner">
            <span class="section-eyebrow reveal">What clients say</span>
            <h2 class="display-lg reveal">${splitTextIntoSpans("Client Love")}</h2>
            <div class="testimonials-track" id="t-track">
              ${ts.map(t => testimonialCardHTML(t)).join('')}
            </div>
          </div>
        </section>

        <!-- ════ CONTACT ════ -->
        ${contactSectionHTML()}

      </div><!-- end .scroll-track -->
    </div><!-- end .scroll-world -->
  `;

  // Init smooth scroll after DOM paint
  setTimeout(() => {
    const track = document.getElementById('scroll-track');
    if (track) Scroll.start(track.scrollHeight);

    // Testimonial drag-scroll
    initDragScroll('#t-track');
  }, 60);
}

/* ══════════════════════════════════════════════════════════════
   PUBLIC PAGES (standalone)
   ══════════════════════════════════════════════════════════════ */
function renderAbout() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="scroll-world">
      <div class="scroll-track" id="scroll-track">
        <section class="section">
          <div class="section-inner">
            <span class="section-eyebrow reveal">About AIVA</span>
            <h1 class="display-lg reveal" style="margin-bottom:1.5rem;">
              ${splitTextIntoSpans("We're a Creative Studio Obsessed With Excellence")}
            </h1>
            <p class="body-lg reveal" style="max-width:640px;margin-bottom:3rem;">
              AIVA is a full-service creative agency founded in 2017. We partner with ambitious brands to create meaningful, lasting visual identities and digital experiences that drive real-world results.
            </p>
            <div class="about-grid">
              <div>
                <h2 class="display-md reveal" style="margin-bottom:1.5rem;">Our Philosophy</h2>
                <p class="body-md reveal" style="margin-bottom:1.25rem;">
                  We believe the best creative work emerges when strategic thinking meets artistic excellence. Great design isn't decoration — it's a business tool.
                </p>
                <p class="body-md reveal" style="margin-bottom:2rem;">
                  We work exclusively with brands that are ready to go all-in on their identity. Our senior-only team means no juniors touching your work, ever.
                </p>
                <div style="display:flex;flex-wrap:wrap;gap:0.5rem;" class="reveal">
                  ${['Brand Strategy','Visual Identity','Web Design','Motion','Paid Media','Consulting'].map(b => `<span class="badge">${b}</span>`).join('')}
                </div>
              </div>
              <div class="about-stat-grid reveal-stagger">
                ${[
                  { num:'120+', lbl:'Projects',    sub:'Delivered across 14 industries' },
                  { num:'98%',  lbl:'Retention',   sub:'Clients that come back'         },
                  { num:'$40M',lbl:'Revenue',     sub:'Generated for our clients'       },
                  { num:'12',   lbl:'Specialists', sub:'Senior-only team'               },
                ].map(s => `
                  <div class="glass-card about-stat-card">
                    <div class="about-stat-num">${s.num}</div>
                    <div style="font-weight:700;font-size:0.88rem;margin:0.3rem 0 0.2rem;">${s.lbl}</div>
                    <div style="font-size:0.75rem;color:var(--muted);">${s.sub}</div>
                  </div>`).join('')}
              </div>
            </div>
          </div>
        </section>
        <section class="section" style="min-height:60vh;">
          <div class="section-inner">
            <h2 class="display-md reveal" style="margin-bottom:2.5rem;">The Team</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1.5rem;" class="reveal-stagger">
              ${[
                { name:'Alex Rivera',  role:'Creative Director',  a:'AR' },
                { name:'Sam Chen',     role:'Lead Designer',      a:'SC' },
                { name:'Priya Nair',   role:'Strategy Lead',      a:'PN' },
                { name:'Marcus Lee',   role:'Dev Lead',           a:'ML' },
                { name:'Zoe Adeyemi', role:'Motion Director',    a:'ZA' },
                { name:'Tyler Brooks', role:'Paid Media Strategist', a:'TB' },
              ].map(m => `
                <div class="glass-card" style="padding:1.75rem;text-align:center;">
                  <div style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.9rem;margin:0 auto 1rem;">${m.a}</div>
                  <div style="font-weight:700;margin-bottom:0.2rem;">${m.name}</div>
                  <div style="font-size:0.76rem;color:var(--muted);">${m.role}</div>
                </div>`).join('')}
            </div>
          </div>
        </section>
      </div>
    </div>`;
  setTimeout(() => { const t = document.getElementById('scroll-track'); if (t) Scroll.start(t.scrollHeight); }, 60);
}

function renderPortfolio() {
  const all = DB.get('portfolio');
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="scroll-world">
      <div class="scroll-track" id="scroll-track">
        <section class="section" style="padding-top:calc(var(--nav-h) + 4rem);">
          <div class="section-inner">
            <span class="section-eyebrow reveal">Portfolio</span>
            <h1 class="display-lg reveal" style="margin-bottom:0.75rem;">${splitTextIntoSpans("Our Work")}</h1>
            <p class="body-md reveal" style="max-width:520px;margin-bottom:3rem;">A curated selection of projects we're proud of — from brand identities to digital products.</p>
            <div class="portfolio-grid reveal-stagger">
              ${all.map(p => portfolioCardHTML(p, true)).join('')}
            </div>
          </div>
        </section>
      </div>
    </div>`;
  setTimeout(() => { const t = document.getElementById('scroll-track'); if (t) Scroll.start(t.scrollHeight); }, 60);
}

function renderTestimonials() {
  const ts  = DB.get('testimonials');
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="scroll-world">
      <div class="scroll-track" id="scroll-track">
        <section class="section" style="padding-top:calc(var(--nav-h) + 4rem);">
          <div class="section-inner">
            <span class="section-eyebrow reveal">Testimonials</span>
            <h1 class="display-lg reveal" style="margin-bottom:3rem;">${splitTextIntoSpans("What Clients Say")}</h1>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1.5rem;" class="reveal-stagger">
              ${ts.map(t => testimonialCardHTML(t, false)).join('')}
            </div>
          </div>
        </section>
      </div>
    </div>`;
  setTimeout(() => { const t = document.getElementById('scroll-track'); if (t) Scroll.start(t.scrollHeight); }, 60);
}

function renderContact() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="scroll-world">
      <div class="scroll-track" id="scroll-track">
        ${contactSectionHTML()}
      </div>
    </div>`;
  setTimeout(() => { const t = document.getElementById('scroll-track'); if (t) Scroll.start(t.scrollHeight); }, 60);
}

/* ── Shared HTML builders ────────────────────────────────────── */
function portfolioCardHTML(p, showFeaturedBadge = false) {
  return `
    <div class="glass-card portfolio-card">
      <div class="portfolio-card-thumb" style="background:${p.gradient};">
        <span class="portfolio-card-thumb-glyph">${p.glyph}</span>
        ${showFeaturedBadge && p.featured ? '<span style="position:absolute;top:1rem;right:1rem;z-index:2;background:rgba(108,71,255,0.85);padding:0.3rem 0.75rem;border-radius:50px;font-size:0.62rem;font-weight:700;letter-spacing:0.08em;">FEATURED</span>' : ''}
      </div>
      <div class="portfolio-card-body">
        <div class="portfolio-tags">${p.tags.map(t => `<span class="portfolio-tag">${t}</span>`).join('')}</div>
        <h3>${p.title}</h3>
        <p style="font-size:0.8rem;color:var(--muted);line-height:1.6;">${p.outcome}</p>
      </div>
    </div>`;
}

function testimonialCardHTML(t, flex = true) {
  return `
    <div class="glass-card testimonial-card" style="${flex ? '' : 'flex:none;width:auto;'}">
      <div class="t-stars">★★★★★</div>
      <p class="t-quote">${t.quote}</p>
      <div class="t-author">
        <div class="t-avatar">${t.avatar}</div>
        <div>
          <div class="t-name">${t.author}</div>
          <div class="t-company">${t.company}</div>
        </div>
      </div>
    </div>`;
}

function contactSectionHTML() {
  return `
    <section class="section" id="sec-contact" style="min-height:100vh;padding-top:calc(var(--nav-h) + 1rem);align-items:flex-start;">
      <div class="section-inner">
        <div class="contact-grid" style="gap:2.5rem;align-items:start;">
          <div>
            <span class="section-eyebrow reveal">Get in touch</span>
            <h2 class="display-lg reveal" style="margin-bottom:1rem;">
              ${splitTextIntoSpans("Let's Build Something Remarkable")}
            </h2>
            <p class="body-md reveal" style="margin-bottom:1.5rem;">
              Have a project in mind? We'd love to hear about it. Fill out the form and we'll get back to you within 24 hours.
            </p>
            <div style="display:flex;flex-direction:column;gap:0.6rem;" class="reveal">
              ${[
                { icon:'✉', text:'hello@aiva.agency' },
                { icon:'📱', text:'+1 (555) 0100-AIVA' },
                { icon:'📍', text:'New York, NY — Remote Worldwide' },
              ].map(c => `
                <div class="contact-info-item" style="padding:0.65rem 0.95rem;">
                  <div class="contact-info-icon" style="width:30px;height:30px;font-size:0.8rem;">${c.icon}</div>
                  <span style="font-size:0.75rem;">${c.text}</span>
                </div>`).join('')}
            </div>
          </div>
          <div class="glass-card reveal" style="padding:1.4rem 1.6rem;">
            <form id="contact-form" style="display:flex;flex-direction:column;gap:0.75rem;" onsubmit="submitLead(event)">
              <div class="form-group">
                <label class="form-label" style="font-size:0.68rem;margin-bottom:0.15rem;">Name *</label>
                <input type="text" class="form-input" id="cf-name" placeholder="Your full name" required style="padding:0.55rem 0.9rem;font-size:0.8rem;">
              </div>
              <div class="form-group">
                <label class="form-label" style="font-size:0.68rem;margin-bottom:0.15rem;">Email *</label>
                <input type="email" class="form-input" id="cf-email" placeholder="you@company.com" required style="padding:0.55rem 0.9rem;font-size:0.8rem;">
              </div>
              <div class="form-group">
                <label class="form-label" style="font-size:0.68rem;margin-bottom:0.15rem;">Company</label>
                <input type="text" class="form-input" id="cf-company" placeholder="Your company" style="padding:0.55rem 0.9rem;font-size:0.8rem;">
              </div>
              <div class="form-group">
                <label class="form-label" style="font-size:0.68rem;margin-bottom:0.15rem;">Message *</label>
                <textarea class="form-textarea" id="cf-msg" placeholder="Tell us about your project, timeline, and goals..." required style="padding:0.6rem 0.9rem;font-size:0.8rem;min-height:75px;"></textarea>
              </div>
              <button type="submit" class="btn-primary w-full" style="justify-content:center;padding:0.65rem 1.8rem;font-size:0.78rem;margin-top:0.4rem;">
                Send Message &nbsp;→
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>`;
}

function submitLead(e) {
  e.preventDefault();
  DB.create('leads', {
    name:      document.getElementById('cf-name').value,
    email:     document.getElementById('cf-email').value,
    company:   document.getElementById('cf-company').value,
    message:   document.getElementById('cf-msg').value,
    status:    'new',
    createdAt: new Date().toISOString(),
  });
  document.getElementById('contact-form').reset();
  toast("Message sent! We'll be in touch within 24 hours. 🎉");
}

/* ══════════════════════════════════════════════════════════════
   LOGIN PAGE
   ══════════════════════════════════════════════════════════════ */
function renderLogin() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="login-page">
      <div class="login-card">
        <div class="login-logo">AIVA</div>
        <p class="login-sub">Sign in to your account to continue</p>
        <form class="login-form" onsubmit="handleLogin(event)">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-input" id="l-email" placeholder="your@email.com" required autocomplete="email">
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" class="form-input" id="l-pw" placeholder="••••••••" required autocomplete="current-password">
          </div>
          <div id="l-err" style="display:none;color:#F87171;font-size:0.78rem;padding:0.7rem 1rem;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:10px;">
            Invalid email or password — please try again.
          </div>
          <button type="submit" class="btn-primary w-full" style="justify-content:center;margin-top:0.5rem;">
            Sign In &nbsp;→
          </button>
        </form>

        <div style="margin-top:2rem;padding-top:1.5rem;border-top:1px solid var(--glass-border);">
          <p style="font-size:0.72rem;color:var(--muted);text-align:center;margin-bottom:0.85rem;letter-spacing:0.05em;">DEMO ACCOUNTS — CLICK TO FILL</p>
          <div class="demo-pills">
            ${[
              { role:'Admin',  email:'admin@aiva.agency', pw:'admin123', desc:'Full dashboard access' },
              { role:'Staff',  email:'staff@aiva.agency', pw:'staff123', desc:'Project management'   },
              { role:'Client', email:'client@aiva.co',    pw:'client123',desc:'Client portal'         },
            ].map(d => `
              <div class="demo-pill" onclick="fillLogin('${d.email}','${d.pw}')" title="${d.desc}">
                <span style="font-weight:700;color:var(--accent2);">${d.role}</span>
                <span style="color:var(--muted);">${d.email}</span>
                <span style="color:var(--dim);">${d.pw}</span>
              </div>`).join('')}
          </div>
        </div>

        <div style="text-align:center;margin-top:1.5rem;">
          <button class="btn-glass btn-sm" onclick="navigate('home')">← Back to site</button>
        </div>
      </div>
    </div>`;
}

function fillLogin(email, pw) {
  document.getElementById('l-email').value = email;
  document.getElementById('l-pw').value = pw;
}

function handleLogin(e) {
  e.preventDefault();
  const user = Auth.login(
    document.getElementById('l-email').value,
    document.getElementById('l-pw').value,
  );
  if (user) {
    _updateNavActions();
    toast(`Welcome back, ${user.name.split(' ')[0]}! 👋`);
    navigate(user.role === 'client' ? 'portal' : 'dashboard');
  } else {
    document.getElementById('l-err').style.display = 'block';
  }
}

/* ══════════════════════════════════════════════════════════════
   SERVICES PAGE (auth-gated)
   ══════════════════════════════════════════════════════════════ */
function renderServices() {
  const user = Auth.getUser();
  if (!user) { navigate('login'); return; }

  const services = DB.get('services').filter(s => s.visible);
  const app      = document.getElementById('app');
  app.innerHTML = `
    <div class="services-page">
      <div style="max-width:1200px;margin:0 auto;">
        <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:0.5rem;">
          <div>
            <span class="section-eyebrow">What We Offer</span>
            <h1 class="display-lg">${splitTextIntoSpans("Our Services")}</h1>
          </div>
          <button class="btn-primary btn-sm" onclick="navigate('contact')">Get a Quote →</button>
        </div>
        <p class="body-md" style="max-width:520px;margin-bottom:2rem;">
          Everything you need to build a brand that wins. All services are available individually or as integrated packages.
        </p>
        <div class="services-grid">
          ${services.map(s => `
            <div class="glass-card service-card">
              <div class="service-icon">${s.icon}</div>
              <span class="badge" style="margin-bottom:1rem;">${s.category}</span>
              <h3>${s.title}</h3>
              <p>${s.description}</p>
              <button class="btn-glass btn-sm" style="margin-top:1.5rem;" onclick="navigate('contact')">
                Learn More →
              </button>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════
   CLIENT PORTAL
   ══════════════════════════════════════════════════════════════ */
function renderPortal() {
  const user = Auth.getUser();
  if (!user) { navigate('login'); return; }
  if (user.role !== 'client') { navigate('dashboard'); return; }

  const projects = DB.get('projects').filter(p => p.clientId === user.id);
  const app      = document.getElementById('app');
  app.innerHTML  = `
    <div class="portal-layout">
      <div class="portal-header">
        <div>
          <div class="login-logo" style="font-size:1.2rem;">AIVA</div>
          <div style="font-size:0.68rem;color:var(--muted);letter-spacing:0.06em;text-transform:uppercase;">Client Portal</div>
        </div>
        <div style="display:flex;align-items:center;gap:1rem;">
          <div style="text-align:right;">
            <div style="font-size:0.875rem;font-weight:600;">${user.name}</div>
            <div style="font-size:0.73rem;color:var(--muted);">${user.company}</div>
          </div>
          <div class="t-avatar">${user.avatar}</div>
          <button class="btn-glass btn-sm" onclick="Auth.logout();navigate('login')">Sign Out</button>
        </div>
      </div>
      <div class="portal-main" id="portal-content">
        ${renderPortalContent(user, projects)}
      </div>
    </div>`;
}

function renderPortalContent(user, projects) {
  return `
    <div style="margin-bottom:2rem;">
      <h1 style="font-family:'Outfit',sans-serif;font-size:1.75rem;font-weight:800;letter-spacing:-0.02em;">
        Welcome back, ${user.name.split(' ')[0]} 👋
      </h1>
      <p style="color:var(--muted);font-size:0.875rem;margin-top:0.3rem;">Here's the latest on your projects with AIVA.</p>
    </div>

    ${projects.length === 0 ? `
      <div class="empty-state glass-card" style="padding:3.5rem;">
        <div class="empty-icon">📋</div>
        <div style="font-family:'Outfit',sans-serif;font-size:1.2rem;font-weight:700;margin-bottom:0.5rem;">No projects yet</div>
        <p class="empty-txt">Your agency team will set up your projects shortly.</p>
      </div>` : `
      <div class="project-cards">
        ${projects.map(p => projectCardHTML(p)).join('')}
      </div>`}`;
}

function projectCardHTML(p) {
  const sc = statusClass(p.status);
  return `
    <div class="glass-card project-card" onclick="showProjectDetail('${p.id}')">
      <div class="project-card-top">
        <h3 class="project-card-title">${p.title}</h3>
        <span class="status-badge ${sc}">${p.status}</span>
      </div>
      <p style="font-size:0.8rem;color:var(--muted);line-height:1.6;margin-bottom:1.4rem;">${p.description.slice(0, 110)}…</p>
      <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:var(--muted);margin-bottom:0.45rem;">
        <span>Overall Progress</span>
        <span style="color:var(--accent2);font-weight:600;">${p.progress}%</span>
      </div>
      ${renderProgress(p.progress)}
      <div class="milestone-list" style="margin-top:1.2rem;">
        ${p.milestones.slice(0,3).map(m => `
          <div class="milestone-row">
            <div class="m-dot ${m.done ? 'done' : ''}"></div>
            <span>${m.label}</span>
          </div>`).join('')}
        ${p.milestones.length > 3 ? `<div style="font-size:0.72rem;color:var(--dim);padding-left:1.35rem;">+${p.milestones.length-3} more</div>` : ''}
      </div>
      <div style="margin-top:1.4rem;padding-top:0.875rem;border-top:1px solid var(--glass-border);font-size:0.74rem;color:var(--dim);">
        Click to view full details →
      </div>
    </div>`;
}

function showProjectDetail(id) {
  const p   = DB.getById('projects', id);
  if (!p) return;
  const sc  = statusClass(p.status);
  const con = document.getElementById('portal-content');
  if (!con) return;

  con.innerHTML = `
    <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem;">
      <div class="back-btn" onclick="renderPortal()">← All Projects</div>
      <span class="status-badge ${sc}">${p.status}</span>
    </div>
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:2rem;align-items:start;">
      <div>
        <h1 style="font-family:'Outfit',sans-serif;font-size:2rem;font-weight:800;letter-spacing:-0.025em;margin-bottom:0.4rem;">${p.title}</h1>
        <p style="color:var(--muted);font-size:0.85rem;margin-bottom:2rem;">Started ${fmtDate(p.startDate)}</p>

        <div class="glass-card" style="padding:1.75rem;margin-bottom:1.25rem;">
          <div class="label" style="margin-bottom:0.75rem;">Project Description</div>
          <p style="font-size:0.9rem;line-height:1.72;color:var(--text2);">${p.description}</p>
        </div>

        ${p.statusNote ? `
        <div class="glass-card glass-card-accent" style="padding:1.75rem;margin-bottom:1.25rem;">
          <div class="label" style="color:var(--accent2);margin-bottom:0.75rem;">Latest Status Update</div>
          <p style="font-size:0.9rem;line-height:1.72;color:var(--text2);">${p.statusNote}</p>
        </div>` : ''}

        <div class="glass-card" style="padding:1.75rem;">
          <div class="label" style="margin-bottom:1.25rem;">Project Milestones</div>
          <div style="display:flex;flex-direction:column;gap:1rem;">
            ${p.milestones.map((m, i) => `
              <div style="display:flex;align-items:center;gap:1rem;">
                <div style="width:28px;height:28px;border-radius:50%;border:2px solid ${m.done ? '#10B981' : 'rgba(255,255,255,0.15)'};background:${m.done ? 'rgba(16,185,129,0.15)' : 'transparent'};display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:0.7rem;color:${m.done ? '#34D399' : 'var(--dim)'};">
                  ${m.done ? '✓' : (i+1)}
                </div>
                <span style="font-size:0.875rem;color:${m.done ? 'var(--text)' : 'var(--muted)'};">${m.label}</span>
                ${m.done ? '<span style="margin-left:auto;font-size:0.7rem;color:#34D399;font-weight:600;">Complete</span>' : ''}
              </div>`).join('')}
          </div>
        </div>
      </div>

      <div>
        <div class="glass-card" style="padding:1.75rem;margin-bottom:1.25rem;">
          <div class="label" style="margin-bottom:1rem;">Overall Progress</div>
          <div style="font-family:'Outfit',sans-serif;font-size:3.5rem;font-weight:900;letter-spacing:-0.04em;color:var(--accent2);line-height:1;">${p.progress}%</div>
          <div style="margin-top:1.1rem;">${renderProgress(p.progress, 8)}</div>
        </div>
        <div class="glass-card" style="padding:1.75rem;">
          <div class="label" style="margin-bottom:1rem;">Project Info</div>
          <div style="display:flex;flex-direction:column;gap:1rem;">
            <div>
              <div style="font-size:0.68rem;color:var(--dim);margin-bottom:0.35rem;">Status</div>
              <span class="status-badge ${sc}">${p.status}</span>
            </div>
            <div>
              <div style="font-size:0.68rem;color:var(--dim);margin-bottom:0.35rem;">Start Date</div>
              <div style="font-size:0.875rem;">${fmtDate(p.startDate)}</div>
            </div>
            <div>
              <div style="font-size:0.68rem;color:var(--dim);margin-bottom:0.35rem;">Milestones</div>
              <div style="font-size:0.875rem;">${p.milestones.filter(m => m.done).length} / ${p.milestones.length} complete</div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════
   DASHBOARD
   ══════════════════════════════════════════════════════════════ */
function renderDashboard() {
  const user = Auth.getUser();
  if (!user) { navigate('login'); return; }
  if (user.role === 'client') { navigate('portal'); return; }

  const isAdmin = user.role === 'admin';
  const navItems = [
    { id:'overview',   icon:'◈', lbl:'Overview'   },
    { id:'projects',   icon:'◉', lbl:'Projects'   },
    { id:'clients',    icon:'◎', lbl:'Clients'    },
    ...(isAdmin ? [
      { id:'services',   icon:'✦', lbl:'Services'   },
      { id:'portfolio',  icon:'◆', lbl:'Portfolio'  },
      { id:'leads',      icon:'▶', lbl:'Leads'      },
      { id:'team',       icon:'◐', lbl:'Team'       },
    ] : []),
  ];

  document.getElementById('app').innerHTML = `
    <div class="dash-layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-logo">AIVA</div>
        <div class="sidebar-user">
          <div class="sidebar-avatar">${user.avatar}</div>
          <div>
            <div class="sidebar-name">${user.name}</div>
            <div class="sidebar-role">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
          </div>
        </div>
        <div class="sidebar-section-lbl">Navigation</div>
        ${navItems.map(n => `
          <div class="sidebar-item ${currentDashSection === n.id ? 'active' : ''}" id="si-${n.id}" onclick="switchSection('${n.id}')">
            <span class="si-icon">${n.icon}</span>
            <span>${n.lbl}</span>
          </div>`).join('')}
        <div class="sidebar-footer">
          <div class="sidebar-item" onclick="navigate('home')">
            <span class="si-icon">↗</span><span>View Site</span>
          </div>
          <div class="sidebar-item" onclick="Auth.logout();navigate('login')">
            <span class="si-icon">↩</span><span>Sign Out</span>
          </div>
        </div>
      </aside>

      <!-- Main -->
      <main class="dash-main" id="dash-main"></main>
    </div>`;

  switchSection(currentDashSection || 'overview');
}

function switchSection(id) {
  currentDashSection = id;
  document.querySelectorAll('.sidebar-item').forEach(el => el.classList.toggle('active', el.id === `si-${id}`));
  const main = document.getElementById('dash-main');
  if (!main) return;
  switch(id) {
    case 'overview':  main.innerHTML = dashOverview();  break;
    case 'projects':  main.innerHTML = dashProjects();  break;
    case 'clients':   main.innerHTML = dashClients();   break;
    case 'services':  main.innerHTML = dashServices();  break;
    case 'portfolio': main.innerHTML = dashPortfolio(); break;
    case 'leads':     main.innerHTML = dashLeads();     break;
    case 'team':      main.innerHTML = dashTeam();      break;
  }
}

/* ── Dashboard: Overview ──────────────────────────────────────── */
function dashOverview() {
  const user     = Auth.getUser();
  const projects = DB.get('projects');
  const clients  = DB.get('users').filter(u => u.role === 'client');
  const leads    = DB.get('leads');
  const services = DB.get('services');

  const active    = projects.filter(p => p.status !== 'Completed').length;
  const completed = projects.filter(p => p.status === 'Completed').length;
  const newLeads  = leads.filter(l => l.status === 'new').length;

  return `
    <div class="dash-header">
      <div>
        <h1 class="dash-title">Overview</h1>
        <p style="color:var(--muted);font-size:0.84rem;margin-top:0.2rem;">Welcome back, ${user.name.split(' ')[0]}. Here's what's happening.</p>
      </div>
      <div style="font-size:0.78rem;color:var(--muted);">${new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</div>
    </div>

    <div class="stats-grid">
      ${[
        { lbl:'Active Projects', val:active,           icon:'◉', c:'#6C47FF', note:'+2 this month',   pos:true  },
        { lbl:'Total Clients',   val:clients.length,   icon:'◎', c:'#10B981', note:'All onboarded',   pos:true  },
        { lbl:'New Leads',       val:newLeads,          icon:'▶', c:'#F59E0B', note:'Needs follow-up', pos:false },
        { lbl:'Services Live',   val:services.filter(s=>s.visible).length, icon:'✦', c:'#3B82F6', note:'All visible', pos:true },
      ].map(s => `
        <div class="glass-card stat-card">
          <div class="stat-icon" style="background:${s.c}1A;color:${s.c};">${s.icon}</div>
          <div class="stat-lbl">${s.lbl}</div>
          <div class="stat-val">${s.val}</div>
          <div class="stat-note ${s.pos ? 'pos' : 'neg'}">${s.note}</div>
        </div>`).join('')}
    </div>

    <div style="display:grid;grid-template-columns:3fr 2fr;gap:1.5rem;">
      <div class="glass-card" style="padding:1.75rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;">
          <h3 style="font-family:'Outfit',sans-serif;font-size:1.05rem;font-weight:700;">Recent Projects</h3>
          <button class="btn-glass btn-xs" onclick="switchSection('projects')">View All</button>
        </div>
        <table class="data-table">
          <thead><tr><th>Project</th><th>Client</th><th>Status</th><th>Progress</th></tr></thead>
          <tbody>
            ${projects.slice(0,5).map(p => {
              const cl = DB.getById('users', p.clientId);
              const sc = statusClass(p.status);
              return `<tr>
                <td style="font-weight:600;font-size:0.84rem;">${p.title}</td>
                <td style="font-size:0.8rem;color:var(--muted);">${cl?.company || 'N/A'}</td>
                <td><span class="status-badge ${sc}">${p.status}</span></td>
                <td>
                  <div style="display:flex;align-items:center;gap:0.65rem;min-width:110px;">
                    <div class="progress-wrap" style="flex:1;">${renderProgress(p.progress)}</div>
                    <span style="font-size:0.7rem;color:var(--accent2);width:28px;">${p.progress}%</span>
                  </div>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>

      <div class="glass-card" style="padding:1.75rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;">
          <h3 style="font-family:'Outfit',sans-serif;font-size:1.05rem;font-weight:700;">Recent Leads</h3>
          <button class="btn-glass btn-xs" onclick="switchSection('leads')">View All</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.875rem;">
          ${leads.slice(0,3).map(l => `
            <div style="padding:1rem;background:rgba(255,255,255,0.03);border:1px solid var(--glass-border);border-radius:12px;">
              <div style="display:flex;justify-content:space-between;margin-bottom:0.35rem;">
                <div style="font-weight:600;font-size:0.84rem;">${l.name}</div>
                <span class="status-badge status-${l.status}">${l.status}</span>
              </div>
              <div style="font-size:0.73rem;color:var(--muted);">${l.company}</div>
              <div style="font-size:0.75rem;color:var(--dim);margin-top:0.4rem;">${l.message.slice(0,75)}…</div>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

/* ── Dashboard: Projects ─────────────────────────────────────── */
function dashProjects() {
  const user = Auth.getUser();
  const all  = DB.get('projects');
  const prjs = user.role === 'staff' ? all.filter(p => p.assignedStaffId === user.id) : all;

  return `
    <div class="dash-header">
      <h1 class="dash-title">Projects</h1>
      ${user.role === 'admin' ? `<button class="btn-primary btn-sm" onclick="modalNewProject()">+ New Project</button>` : ''}
    </div>
    <div class="glass-card" style="padding:1.75rem;">
      <table class="data-table">
        <thead><tr><th>Project</th><th>Client</th><th>Assigned To</th><th>Status</th><th>Progress</th><th>Actions</th></tr></thead>
        <tbody>
          ${prjs.map(p => {
            const cl = DB.getById('users', p.clientId);
            const sf = DB.getById('users', p.assignedStaffId);
            const sc = statusClass(p.status);
            return `<tr>
              <td>
                <div style="font-weight:600;">${p.title}</div>
                <div style="font-size:0.72rem;color:var(--muted);">Started ${fmtDate(p.startDate)}</div>
              </td>
              <td>
                <div style="font-size:0.84rem;">${cl?.name || 'N/A'}</div>
                <div style="font-size:0.72rem;color:var(--muted);">${cl?.company || ''}</div>
              </td>
              <td style="font-size:0.84rem;">${sf?.name || '—'}</td>
              <td><span class="status-badge ${sc}">${p.status}</span></td>
              <td>
                <div style="display:flex;align-items:center;gap:0.65rem;min-width:130px;">
                  <div style="flex:1;">${renderProgress(p.progress)}</div>
                  <span style="font-size:0.72rem;color:var(--accent2);">${p.progress}%</span>
                </div>
              </td>
              <td><button class="btn-glass btn-xs" onclick="modalUpdateProject('${p.id}')">Update</button></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;
}

function modalUpdateProject(pid) {
  const p = DB.getById('projects', pid);
  if (!p) return;
  openModal(`Update: ${p.title}`, `
    <div style="display:flex;flex-direction:column;gap:1.1rem;">
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="up-status">
          ${['Not Started','In Progress','Under Review','Completed'].map(s => `<option value="${s}" ${p.status===s?'selected':''}>${s}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Progress: <span id="up-pct-lbl" style="color:var(--accent2);">${p.progress}%</span></label>
        <input type="range" id="up-prog" min="0" max="100" value="${p.progress}" oninput="document.getElementById('up-pct-lbl').textContent=this.value+'%'">
      </div>
      <div class="form-group">
        <label class="form-label">Status Note (visible to client)</label>
        <textarea class="form-textarea" id="up-note" style="min-height:100px;">${p.statusNote || ''}</textarea>
      </div>
      <div style="display:flex;gap:0.75rem;justify-content:flex-end;">
        <button class="btn-glass" onclick="closeModal()">Cancel</button>
        <button class="btn-primary" onclick="saveProjectUpdate('${pid}')">Save Changes</button>
      </div>
    </div>`);
}

function saveProjectUpdate(pid) {
  DB.update('projects', pid, {
    status:     document.getElementById('up-status').value,
    progress:   parseInt(document.getElementById('up-prog').value),
    statusNote: document.getElementById('up-note').value,
  });
  closeModal();
  toast('Project updated successfully!');
  switchSection('projects');
}

function modalNewProject() {
  const clients = DB.get('users').filter(u => u.role === 'client');
  const staff   = DB.get('users').filter(u => u.role === 'staff');
  openModal('New Project', `
    <div style="display:flex;flex-direction:column;gap:1.1rem;">
      <div class="form-group">
        <label class="form-label">Title *</label>
        <input type="text" class="form-input" id="np-title" placeholder="Project name">
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="form-textarea" id="np-desc" style="min-height:80px;" placeholder="Brief project scope..."></textarea>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
        <div class="form-group">
          <label class="form-label">Client *</label>
          <select class="form-select" id="np-client">
            ${clients.map(c => `<option value="${c.id}">${c.name} — ${c.company}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Assign to Staff</label>
          <select class="form-select" id="np-staff">
            <option value="">Unassigned</option>
            ${staff.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Start Date</label>
        <input type="date" class="form-input" id="np-date" value="${new Date().toISOString().slice(0,10)}">
      </div>
      <div style="display:flex;gap:0.75rem;justify-content:flex-end;">
        <button class="btn-glass" onclick="closeModal()">Cancel</button>
        <button class="btn-primary" onclick="createProject()">Create Project</button>
      </div>
    </div>`);
}

function createProject() {
  const title = document.getElementById('np-title').value.trim();
  if (!title) { toast('Title is required', 'error'); return; }
  DB.create('projects', {
    title,
    description:     document.getElementById('np-desc').value,
    clientId:        document.getElementById('np-client').value,
    assignedStaffId: document.getElementById('np-staff').value,
    startDate:       document.getElementById('np-date').value,
    status: 'Not Started', progress: 0, statusNote: '',
    milestones: [{ label: 'Kickoff Meeting', done: false }],
  });
  closeModal();
  toast('Project created!');
  switchSection('projects');
}

/* ── Dashboard: Clients ──────────────────────────────────────── */
function dashClients() {
  const user     = Auth.getUser();
  const clients  = DB.get('users').filter(u => u.role === 'client');
  const projects = DB.get('projects');

  return `
    <div class="dash-header">
      <h1 class="dash-title">Clients</h1>
      ${user.role === 'admin' ? `<button class="btn-primary btn-sm" onclick="modalNewClient()">+ New Client</button>` : ''}
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(275px,1fr));gap:1.5rem;">
      ${clients.map(c => {
        const cProjs  = projects.filter(p => p.clientId === c.id);
        const active  = cProjs.filter(p => p.status !== 'Completed').length;
        return `
          <div class="glass-card" style="padding:1.75rem;">
            <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.25rem;">
              <div class="t-avatar" style="width:48px;height:48px;font-size:0.88rem;">${c.avatar}</div>
              <div>
                <div style="font-weight:700;">${c.name}</div>
                <div style="font-size:0.78rem;color:var(--muted);">${c.company}</div>
              </div>
            </div>
            <div style="font-size:0.78rem;color:var(--muted);margin-bottom:1rem;">✉ ${c.email}</div>
            <div style="display:flex;gap:0.75rem;">
              <div style="flex:1;padding:0.75rem;background:rgba(255,255,255,0.03);border-radius:10px;text-align:center;">
                <div style="font-family:'Outfit',sans-serif;font-size:1.5rem;font-weight:800;color:var(--accent2);">${cProjs.length}</div>
                <div style="font-size:0.68rem;color:var(--muted);">Total</div>
              </div>
              <div style="flex:1;padding:0.75rem;background:rgba(255,255,255,0.03);border-radius:10px;text-align:center;">
                <div style="font-family:'Outfit',sans-serif;font-size:1.5rem;font-weight:800;color:#FBBF24;">${active}</div>
                <div style="font-size:0.68rem;color:var(--muted);">Active</div>
              </div>
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

function modalNewClient() {
  openModal('New Client Account', `
    <div style="display:flex;flex-direction:column;gap:1.1rem;">
      <div class="form-group">
        <label class="form-label">Full Name *</label>
        <input type="text" class="form-input" id="nc-name" placeholder="Client's full name">
      </div>
      <div class="form-group">
        <label class="form-label">Email *</label>
        <input type="email" class="form-input" id="nc-email" placeholder="client@company.com">
      </div>
      <div class="form-group">
        <label class="form-label">Company</label>
        <input type="text" class="form-input" id="nc-co" placeholder="Company name">
      </div>
      <div class="form-group">
        <label class="form-label">Temporary Password</label>
        <input type="text" class="form-input" id="nc-pw" value="client123">
      </div>
      <div style="display:flex;gap:0.75rem;justify-content:flex-end;">
        <button class="btn-glass" onclick="closeModal()">Cancel</button>
        <button class="btn-primary" onclick="createClient()">Create Account</button>
      </div>
    </div>`);
}

function createClient() {
  const name = document.getElementById('nc-name').value.trim();
  const email = document.getElementById('nc-email').value.trim();
  if (!name || !email) { toast('Name and email required', 'error'); return; }
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
  DB.create('users', {
    name, email,
    password: document.getElementById('nc-pw').value,
    role: 'client',
    company: document.getElementById('nc-co').value,
    avatar: initials,
  });
  closeModal();
  toast(`Client "${name}" created!`);
  switchSection('clients');
}

/* ── Dashboard: Services ─────────────────────────────────────── */
function dashServices() {
  const services = DB.get('services');
  return `
    <div class="dash-header">
      <h1 class="dash-title">Services</h1>
      <button class="btn-primary btn-sm" onclick="modalNewService()">+ Add Service</button>
    </div>
    <div class="glass-card" style="padding:1.75rem;">
      <table class="data-table">
        <thead><tr><th>Icon</th><th>Service</th><th>Category</th><th>Visibility</th><th>Actions</th></tr></thead>
        <tbody>
          ${services.map(s => `
            <tr>
              <td><span style="font-size:1.4rem;">${s.icon}</span></td>
              <td>
                <div style="font-weight:600;font-size:0.875rem;">${s.title}</div>
                <div style="font-size:0.75rem;color:var(--muted);max-width:280px;">${s.description.slice(0,80)}…</div>
              </td>
              <td><span class="badge">${s.category}</span></td>
              <td><span class="status-badge status-${s.visible ? 'visible' : 'hidden'}">${s.visible ? 'Visible' : 'Hidden'}</span></td>
              <td>
                <div style="display:flex;gap:0.5rem;">
                  <button class="btn-glass btn-xs" onclick="toggleService('${s.id}')">${s.visible ? 'Hide' : 'Show'}</button>
                  <button class="btn-glass btn-xs btn-danger" onclick="delItem('services','${s.id}','services')">Delete</button>
                </div>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function modalNewService() {
  openModal('Add New Service', `
    <div style="display:flex;flex-direction:column;gap:1.1rem;">
      <div class="form-group">
        <label class="form-label">Title *</label>
        <input type="text" class="form-input" id="ns-title" placeholder="Service name">
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="form-textarea" id="ns-desc" style="min-height:80px;" placeholder="Describe the service..."></textarea>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
        <div class="form-group">
          <label class="form-label">Icon (emoji/symbol)</label>
          <input type="text" class="form-input" id="ns-icon" placeholder="★" maxlength="3">
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <input type="text" class="form-input" id="ns-cat" placeholder="e.g. Branding">
        </div>
      </div>
      <div style="display:flex;gap:0.75rem;justify-content:flex-end;">
        <button class="btn-glass" onclick="closeModal()">Cancel</button>
        <button class="btn-primary" onclick="createService()">Add Service</button>
      </div>
    </div>`);
}

function createService() {
  const title = document.getElementById('ns-title').value.trim();
  if (!title) { toast('Title required', 'error'); return; }
  DB.create('services', {
    title,
    description: document.getElementById('ns-desc').value,
    icon:        document.getElementById('ns-icon').value || '◉',
    category:    document.getElementById('ns-cat').value || 'General',
    visible: true,
  });
  closeModal();
  toast('Service added!');
  switchSection('services');
}

function toggleService(id) {
  const s = DB.getById('services', id);
  DB.update('services', id, { visible: !s.visible });
  toast(`Service ${s.visible ? 'hidden' : 'made visible'}`);
  switchSection('services');
}

/* ── Dashboard: Portfolio ────────────────────────────────────── */
function dashPortfolio() {
  const items = DB.get('portfolio');
  return `
    <div class="dash-header">
      <h1 class="dash-title">Portfolio</h1>
      <button class="btn-primary btn-sm" onclick="modalNewPortfolio()">+ Add Case Study</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:1.5rem;">
      ${items.map(p => `
        <div class="glass-card" style="overflow:hidden;">
          <div style="height:130px;background:${p.gradient};display:flex;align-items:center;justify-content:center;position:relative;">
            <span style="font-family:'Outfit',sans-serif;font-size:3.5rem;font-weight:900;opacity:0.28;">${p.glyph}</span>
            ${p.featured ? '<span style="position:absolute;top:0.75rem;right:0.75rem;background:rgba(108,71,255,0.9);padding:0.22rem 0.6rem;border-radius:50px;font-size:0.6rem;font-weight:700;letter-spacing:0.07em;">FEATURED</span>' : ''}
          </div>
          <div style="padding:1.4rem;">
            <div class="portfolio-tags" style="margin-bottom:0.65rem;">${p.tags.map(t => `<span class="portfolio-tag">${t}</span>`).join('')}</div>
            <div style="font-family:'Outfit',sans-serif;font-size:0.98rem;font-weight:700;margin-bottom:0.5rem;">${p.title}</div>
            <p style="font-size:0.76rem;color:var(--muted);line-height:1.55;">${p.outcome.slice(0,100)}…</p>
            <div style="display:flex;gap:0.5rem;margin-top:1.1rem;">
              <button class="btn-glass btn-xs" onclick="toggleFeatured('${p.id}')">${p.featured ? 'Unfeature' : 'Feature'}</button>
              <button class="btn-glass btn-xs btn-danger" onclick="delItem('portfolio','${p.id}','portfolio')">Delete</button>
            </div>
          </div>
        </div>`).join('')}
    </div>`;
}

function modalNewPortfolio() {
  openModal('Add Case Study', `
    <div style="display:flex;flex-direction:column;gap:1.1rem;">
      <div class="form-group">
        <label class="form-label">Title / Client Name *</label>
        <input type="text" class="form-input" id="npf-title" placeholder="e.g. Bloom Beauty Co.">
      </div>
      <div class="form-group">
        <label class="form-label">Outcome / Description</label>
        <textarea class="form-textarea" id="npf-outcome" style="min-height:80px;" placeholder="What results did this project achieve?"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Tags (comma-separated)</label>
        <input type="text" class="form-input" id="npf-tags" placeholder="Branding, Web, Motion">
      </div>
      <label style="display:flex;align-items:center;gap:0.75rem;cursor:pointer;padding:0.75rem 1rem;background:rgba(255,255,255,0.03);border:1px solid var(--glass-border);border-radius:12px;">
        <input type="checkbox" id="npf-featured" style="accent-color:var(--accent);width:16px;height:16px;">
        <span style="font-size:0.84rem;font-weight:500;">Mark as Featured (shown on homepage)</span>
      </label>
      <div style="display:flex;gap:0.75rem;justify-content:flex-end;">
        <button class="btn-glass" onclick="closeModal()">Cancel</button>
        <button class="btn-primary" onclick="createPortfolioItem()">Add Case Study</button>
      </div>
    </div>`);
}

function createPortfolioItem() {
  const title = document.getElementById('npf-title').value.trim();
  if (!title) { toast('Title required', 'error'); return; }
  const grads = [
    'linear-gradient(135deg,#667eea,#764ba2)',
    'linear-gradient(135deg,#f093fb,#f5576c)',
    'linear-gradient(135deg,#4facfe,#00f2fe)',
    'linear-gradient(135deg,#fa709a,#fee140)',
    'linear-gradient(135deg,#a18cd1,#fbc2eb)',
    'linear-gradient(135deg,#43e97b,#38f9d7)',
  ];
  DB.create('portfolio', {
    title,
    outcome:  document.getElementById('npf-outcome').value,
    tags:     document.getElementById('npf-tags').value.split(',').map(t => t.trim()).filter(Boolean),
    featured: document.getElementById('npf-featured').checked,
    glyph:    '◈',
    gradient: grads[Math.floor(Math.random() * grads.length)],
  });
  closeModal();
  toast('Case study added!');
  switchSection('portfolio');
}

function toggleFeatured(id) {
  const p = DB.getById('portfolio', id);
  DB.update('portfolio', id, { featured: !p.featured });
  toast(`Portfolio item ${p.featured ? 'unfeatured' : 'featured'}!`);
  switchSection('portfolio');
}

/* ── Dashboard: Leads ────────────────────────────────────────── */
function dashLeads() {
  const leads = DB.get('leads').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  const newCt = leads.filter(l => l.status === 'new').length;

  return `
    <div class="dash-header">
      <h1 class="dash-title">Leads & Inquiries</h1>
      <div style="font-size:0.84rem;color:var(--muted);">${newCt} new lead${newCt !== 1 ? 's' : ''}</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:1rem;">
      ${leads.length === 0 ? `<div class="empty-state glass-card" style="padding:3rem;"><div class="empty-icon">📬</div><div style="font-weight:700;">No leads yet</div><p class="empty-txt">Leads from the contact form will appear here.</p></div>` :
      leads.map(l => `
        <div class="glass-card" style="padding:1.75rem;">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:0.875rem;">
            <div>
              <div style="font-weight:700;font-size:1rem;">${l.name}</div>
              <div style="font-size:0.78rem;color:var(--muted);">${l.company} · ${l.email}</div>
            </div>
            <div style="display:flex;align-items:center;gap:0.75rem;">
              <span class="status-badge status-${l.status}">${l.status}</span>
              <span style="font-size:0.68rem;color:var(--dim);">${fmtDate(l.createdAt)}</span>
            </div>
          </div>
          <p style="font-size:0.855rem;line-height:1.68;color:var(--muted);margin-bottom:1.25rem;">${l.message}</p>
          <div style="display:flex;gap:0.5rem;">
            ${l.status === 'new'       ? `<button class="btn-glass btn-xs" onclick="updateLead('${l.id}','contacted')">Mark Contacted</button>` : ''}
            ${l.status === 'contacted' ? `<button class="btn-primary btn-xs" onclick="updateLead('${l.id}','converted')">Mark Converted →</button>` : ''}
            <button class="btn-glass btn-xs btn-danger" onclick="delItem('leads','${l.id}','leads')">Delete</button>
          </div>
        </div>`).join('')}
    </div>`;
}

function updateLead(id, status) {
  DB.update('leads', id, { status });
  toast(`Lead marked as ${status}`);
  switchSection('leads');
}

/* ── Dashboard: Team ─────────────────────────────────────────── */
function dashTeam() {
  const team     = DB.get('users').filter(u => u.role !== 'client');
  const projects = DB.get('projects');

  return `
    <div class="dash-header"><h1 class="dash-title">Team</h1></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:1.5rem;">
      ${team.map(m => {
        const assigned = projects.filter(p => p.assignedStaffId === m.id).length;
        const roleMap  = { admin:'status-admin', staff:'status-staff' };
        return `
          <div class="glass-card" style="padding:1.75rem;">
            <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.25rem;">
              <div class="t-avatar" style="width:52px;height:52px;font-size:0.95rem;">${m.avatar}</div>
              <div>
                <div style="font-weight:700;">${m.name}</div>
                <span class="status-badge ${roleMap[m.role] || ''}" style="margin-top:0.35rem;">${m.role}</span>
              </div>
            </div>
            <div style="font-size:0.78rem;color:var(--muted);margin-bottom:1rem;">✉ ${m.email}</div>
            <div style="padding:0.875rem;background:rgba(255,255,255,0.03);border-radius:12px;text-align:center;">
              <div style="font-family:'Outfit',sans-serif;font-size:1.8rem;font-weight:800;color:var(--accent2);">${assigned}</div>
              <div style="font-size:0.7rem;color:var(--muted);">Assigned Projects</div>
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

/* ── Shared delete helper ─────────────────────────────────────── */
function delItem(collection, id, section) {
  if (confirm('Delete this item? This cannot be undone.')) {
    DB.delete(collection, id);
    toast('Item deleted');
    switchSection(section);
  }
}

/* ══════════════════════════════════════════════════════════════
   DRAG-TO-SCROLL (testimonial carousel)
   ══════════════════════════════════════════════════════════════ */
function initDragScroll(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  let isDown = false, startX = 0, scrollLeft = 0;
  el.addEventListener('mousedown', e => {
    isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft;
    el.style.cursor = 'grabbing';
  });
  document.addEventListener('mouseup', () => { isDown = false; if (el) el.style.cursor = 'grab'; });
  el.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
}

/* ══════════════════════════════════════════════════════════════
   BOOT
   ══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  DB.init();
  _updateNavActions();
  navigate('home');
});
