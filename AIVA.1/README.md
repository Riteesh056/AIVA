# AIVA — Agency Intelligence & Vision Architecture

AIVA is a premium, immersive creative agency platform combining a high-fidelity visual landing page with a fully functional gated Client Portal and Admin/Staff Dashboard. 

Designed with an editorial dark aesthetic, this application integrates a custom liquid-glass design system, staggered word-by-word reveal transitions, and an interactive particle network background.

---

## 🎨 Design Philosophy & Features

- **Liquid Glass System**: Custom CSS utilities defining two glass shader variants:
  - `Subtle Glass (.liquid-glass)`: Used for floating nav elements, action badges, and metadata tags. Includes top-border shimmers and a low-opacity luminosity backdrop blend.
  - `Strong Glass (.liquid-glass-strong)`: Used for forms, login portals, and focus panels. Employs strong backdrop filters (50px) and deep depth shadows.
- **Editorial Typography Hierarchy**:
  - **Display / Heading Font**: `Instrument Serif` (italic style, tight tracking, compact line-heights).
  - **Interface / Body Font**: `Barlow` (clean modern geometry, optimized for readability in database tables and dashboards).
- **Staggered Blur reveals**: Title headers automatically split words on initialization and animate sequentially from blurred/offset states to sharp, visible points.
- **Interactive Constellation Canvas**: A high-performance physics-based particle system (1,000 particles) with gentle speed-reactive mouse repulsion.
- **Responsive Geometry**: Grid frameworks dynamically adapt across desktop, tablet, and mobile breakpoints without content overflow.

---

## 📁 Project Architecture

The application is built on a modular, **zero-dependency vanilla HTML/CSS/JS architecture** that runs entirely client-side:

* 📄 **`index.html`**: The HTML entry shell configuring Google Fonts, the background canvas, floating navigation layer, and main view mounts.
* 🎨 **`style.css`**: The centralized styling system containing CSS custom properties, utility classes, typography, liquid-glass shaders, and keyframe animations.
* ⚙️ **`bg.js`**: The interactive particle background manager. Spawns 1,000 coordinates, processes mouse repulsion zones, and draws connecting constellation coordinates.
* 🧠 **`app.js`**: The application router, authentication engine, mock database utility (`localStorage` sync), HTML views, and control panels.

---

## 🔑 Demo Access Credentials

The application features full mock-database authentication gating. You can log in as different roles to view their respective custom user interfaces:

### 👤 Administrator Role
- **Email**: `admin@aiva.agency`
- **Password**: `admin123`
- **Permissions**: Full database control. Can view all inquiries/leads, convert leads into projects, register new clients, add agency services, and update roadmaps.

### 👥 Staff Member Role
- **Email**: `staff@aiva.agency`
- **Password**: `staff123`
- **Permissions**: Visual access to client accounts and active milestones.

### 💼 Client Role
- **Email**: `client@aiva.co`
- **Password**: `client123`
- **Permissions**: Interactive Roadmap Portal to track current progress percentage, check milestones, and review status logs.

---

## 🚀 How to Run the Project

Since this is a client-side single-page application with no external build compilation dependencies:

1. Simply **double-click `index.html`** (or open it via your browser by dragging the file in).
2. The site will boot up instantly and run completely offline!
