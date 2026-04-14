# Stake Landing Page

## 🚀 Quick Start (Step by Step)

### Step 1 — Install Node.js
Download from https://nodejs.org (LTS version)
Verify: `node -v` should show v18+

### Step 2 — Extract this zip
Unzip the file anywhere on your computer.

### Step 3 — Open in VS Code
```
code stake-landing
```
Or: File → Open Folder → select `stake-landing`

### Step 4 — Install dependencies
Open the VS Code terminal (Ctrl+` or Cmd+`) and run:
```bash
npm install
```
Wait ~1 minute for packages to download.

### Step 5 — Run the dev server
```bash
npm run dev
```
Open http://localhost:3000 in your browser 🎉

---

## 📁 Project Structure

```
stake-landing/
├── src/
│   ├── app/
│   │   ├── layout.js        ← Root HTML shell + metadata
│   │   └── page.jsx         ← Main page, wires all components
│   ├── components/
│   │   ├── Cursor.jsx       ← Custom cursor (dot + glow)
│   │   ├── Navbar.jsx       ← Fixed nav with scroll effect + burger
│   │   ├── HeroSection.jsx  ← Hero text + 3D tilt card + chevrons
│   │   ├── StatsRow.jsx     ← Animated counter stats (12k+, $2.4M, 48)
│   │   ├── BatchSection.jsx ← Batch grid + tooltips + progress bars
│   │   └── Toast.jsx        ← Toast notification system
│   ├── hooks/
│   │   ├── useCursor.js     ← Cursor tracking + glow loop
│   │   ├── useCounter.js    ← Animated number counter
│   │   └── useInView.js     ← IntersectionObserver scroll reveal
│   └── styles/
│       └── globals.css      ← CSS variables, animations, base styles
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

---

## ✨ Features Built

| Feature | File |
|---------|------|
| Custom cursor with glow | Cursor.jsx + useCursor.js |
| 3D tilt card on hover | HeroSection.jsx |
| Scroll-triggered number counters | StatsRow.jsx + useCounter.js |
| Smooth nav blur on scroll | Navbar.jsx |
| Batch tooltips with invest button | BatchSection.jsx |
| Progress bars per batch | BatchSection.jsx |
| Toast notifications | Toast.jsx |
| Scroll reveal animations | useInView.js |
| Floating puzzle pieces | HeroSection.jsx |
| Pulsing eyebrow badge | HeroSection.jsx |
| Fully responsive (mobile/tablet/desktop) | All components |
| Mobile hamburger menu | Navbar.jsx |

---

## 🌐 Deploy to Vercel

```bash
npm install -g vercel
vercel
```
Or push to GitHub → import at vercel.com → auto deploy ✅
