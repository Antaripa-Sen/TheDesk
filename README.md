# 📰 TheDesk — AI-Native News Platform

> *A vintage broadsheet reimagined for the age of artificial intelligence.*

**TheDesk** is a high-fidelity, AI-native news platform that fuses the aesthetic of a classic broadsheet newspaper with real-time news aggregation and cutting-edge AI capabilities — including live article synthesis, persona-based content personalization, a universal AI research engine, and automated vernacular video generation.

---

## 🌐 Live Demo

**[→ https://the-desk-beta.vercel.app/](https://the-desk-beta.vercel.app/)**

---

## ✨ Features

### 🗞️ Vintage Broadsheet Aesthetic
- Typography-first design using **Playfair Display**, **Lora**, and **Raleway** — evoking a premium editorial feel
- Strict ink-on-newsprint color palette: press black, aged ivory, telegraph red, and column rule grey
- Broadsheet grid layout with multi-column editorial sections and drop-caps

### 📡 Real-Time News Aggregation
- Live news pulled from **NewsAPI** across multiple categories: World, Business, Technology, Politics, and more
- Scrolling **breaking-news ticker** populated from live wire feeds
- **Category-based navigation** that refetches and rehydrates content dynamically
- Full-text **search** across global news archives via the API

### 🧑‍💼 Persona-Based Content Views
Two radically distinct rendering paths tailored to different reader profiles:

| Persona | Profile | Experience |
|---|---|---|
| **User A** | 45-year-old CFO | Dense broadsheet grid · Macro indicators · Bond yield charts · Technical synthesis |
| **User B** | 24-year-old Retail Investor | Simplified TL;DR · Plain-English explainers · SIP/MF guidance · Retail-friendly tone |

### 🤖 Universal AI Search — *"Ask Anything"*
- Free-form natural language question input
- AI synthesizes live global wires into a **structured executive briefing**
- Returns: full answer · key bullet points · cited wire sources
- Dynamic suggested questions generated from today's live headlines

### 📊 AI Article Synthesis Panel
- Pre-loaded **Budget 2026 analysis** questions answered from 22+ field reports
- **Live dynamic Q&A**: Click any live headline question to trigger a real-time AI synthesis call
- Supports both static archive lookups and live inference

### 🎬 Automated Hindi Vernacular Video Generator
- **One-click workflow**: Breaking headline → Hindi script synthesis → AI anchor video
- AI anchor character **Sangeeta Sharma** with real-time lip-sync (CSS opacity frame-swap, zero GPU stall)
- Full **Web Speech API** TTS playback in Hindi (`hi-IN`) with chunked utterances to fix Chrome's 15s cutoff bug
- Live "ON AIR" / "STANDBY" badge, audio visualizer bars, and lower-third headline injection
- Works with the live top headline — the script regenerates dynamically on every visit

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Vanilla CSS with CSS custom properties (design tokens) |
| **Icons** | Lucide React |
| **AI / NLP** | Google Gemini API (via `/api/ai/ask` and `/api/synthesize`) |
| **News Data** | NewsAPI.org (via `/api/news` and `/api/search`) |
| **TTS / Lip-sync** | Web Speech API (browser-native) |
| **Deployment** | Vercel |

---

## 🗂️ Project Structure

```
TheDesk/
├── app/
│   ├── page.tsx              # Main page — persona switcher, CFO view, Retail view
│   ├── layout.tsx            # Root layout with fonts & metadata
│   ├── globals.css           # Full design system — tokens, typography, components
│   └── api/
│       ├── news/             # GET /api/news?category= — live NewsAPI proxy
│       ├── search/           # GET /api/search?q= — global archive search
│       ├── ai/               # POST /api/ai/ask — Gemini AI synthesis engine
│       ├── synthesize/       # POST /api/synthesize — multi-article synthesis
│       └── generate-script/  # POST /api/generate-script — Hindi script generation
│
├── components/
│   ├── AskAnything.tsx       # Universal AI search with live suggestions
│   ├── ArticleSynthesis.tsx  # Static + live dynamic Q&A synthesis panel
│   ├── VideoGenerator.tsx    # AI anchor video player with lip-sync & TTS
│   ├── Masthead.tsx          # Newspaper masthead header
│   ├── NavBar.tsx            # Category navigation + search bar
│   ├── Ticker.tsx            # Scrolling live breaking-news ticker
│   ├── ThemeToggle.tsx       # Light/dark mode toggle
│   └── SectionDivider.tsx    # Ornamental broadsheet section divider
│
└── public/
    ├── female_ai_anchor.png          # Anchor — mouth closed frame
    └── female_ai_anchor_speaking.png # Anchor — mouth open frame
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- A [NewsAPI.org](https://newsapi.org/) API key (free tier works)
- A [Google AI Studio](https://aistudio.google.com/) API key for Gemini

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/thedesk.git
cd thedesk

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEWSAPI_KEY=your_newsapi_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## 🎨 Design System

TheDesk uses a fully custom CSS design system with semantic tokens:

| Token | Value | Usage |
|---|---|---|
| `--color-press-black` | `#1a1a1a` | Primary text, borders |
| `--color-newsprint` | `#f4f0e8` | Card backgrounds |
| `--color-aged-ivory` | `#ede8d8` | Page backgrounds |
| `--color-telegraph-red` | `#c0392b` | Accent, CTAs, ON AIR badge |
| `--color-ink-wash` | `#4a4a4a` | Secondary text |
| `--color-column-rule` | `#c8c0aa` | Dividers, borders |
| `--font-playfair` | Playfair Display | Headlines, hero text |
| `--font-lora` | Lora | Body copy, decks |
| `--font-raleway` | Raleway | UI labels, bylines, badges |

---

## 📌 Key Design Decisions

- **Zero third-party UI libraries** — every component is hand-crafted in vanilla CSS for maximum editorial control
- **Chunked TTS utterances** — splits the Hindi script by paragraph to bypass Chrome's silent 15-second TTS cutoff bug
- **GPU-resident lip-sync** — two `<img>` frames are always in the DOM at `opacity: 0/1`; swapping opacity keeps both in the GPU layer, eliminating the decode stutter of `display: none` swaps
- **Persona routing at the page level** — CFO and Retail views are entirely separate component trees, not just style variations, ensuring zero layout compromise for either audience

---

## 📄 License

MIT — feel free to fork, adapt, and build upon TheDesk.

---

<div align="center">
  <sub>Built with ☕ and a deep love for the printed word.</sub>
</div>
