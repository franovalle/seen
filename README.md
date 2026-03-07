# #75HER Project: SEEn
**One-line Value Proposition:** School-age girls with no eye care access see their classroom blackboard clearly — free, private, and no install required.

***

## 🎯 Problem Statement

**Who:** School-age girls in low-income countries who have no access to eye care, and for whom staying in school depends on being able to see.

**Problem:** Every school day, 17.8 million children attend class unable to see the board, learning half as much as their peers (IAPB & Seva Foundation, 2024). In low-income countries, 2 out of 3 people who need eye care cannot get it — and girls bear the heaviest burden (WHO, May 2025).

**Impact:** For millions of girls, eye care is the difference between staying in school and dropping out. Girls in Haiti and other low-income regions face heightened risk of exploitation and domestic labor when education breaks down (UN Women; Humanium). SEEn removes one barrier so she can at least see what's being taught.

> 📌 Aligned with **SDG 4 – Quality Education** and **SDG 5 – Gender Equality**

***

## ✨ Solution Overview

**What we built:** SEEn is a browser-based mobile web app that uses a phone's camera with XR-style overlays — zoom, contrast, and brightness controls — to help a student see the blackboard more clearly in real time. No install. No login. No data ever leaves the device.

**Key Features:**

- **Language-Neutral Vision Check (Snellen Flow):** A 3-screen flow (Welcome → Letter Test → Results) using a 6-row Snellen-style letter chart with tap-based answers instead of reading letters aloud — works across all languages with no literacy barrier. Scoring shows Mild / Moderate / Significant clarity output.

- **XR Clarity Viewer:** Live camera feed with zoom (1.0×–4.0×), contrast (100–300), and brightness (80–140) sliders — lets a girl adjust the view until the board text is readable. All processing stays on-device; no images are sent to a server, protecting privacy in shared-phone classrooms.

- **Floating AR HUD Clarity Score:** A real-time AR overlay displaying a High / Medium / Low clarity score calculated from slider values, plus a coral targeting reticle — making SEEn defensibly XR beyond a basic camera filter. Includes a language-neutral SVG stick figure showing how to hold the phone.

> ⚠️ **Disclaimer:** SEEn is an assistive clarity tool only. This near vision screening is not a replacement for a full eye exam. No diagnosis or prescription is made.

***

## 🚀 Quick Start & Demo Path

### Access (No Installation Required)
**Requirements:** Any modern mobile browser — Chrome on Android (recommended) or Safari on iOS. No install. No account. No API keys.

🔗 **Live App:** [Insert Lovable Link]

> Just open the link on your phone and tap "Allow" when the browser requests camera access. That's it — no setup, no download, no login.

### Run Locally (Optional)

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm i

# Step 4: Start the development server
npm run dev
```

### 60-Second Demo Path

**Step 1:** Open the app link in Chrome (Android) or Safari (iOS) → Tap "Allow" for camera access → The welcome screen loads.

**Step 2:** Tap "Start Vision Check" → Work through the 6-row Snellen letter chart by tapping the clearer option per row → Results screen shows your clarity level in under 2 minutes.

**Step 3:** Point your phone at a blackboard or text → Use the zoom, contrast, and brightness sliders to adjust until text is visibly clearer → The AR HUD shows a real-time clarity score (High / Medium / Low).

📹 **Demo Video:** [Insert YouTube/Loom Link] | 🔗 **Live App:** [Insert Lovable Link]

***

## 🏗️ Technical Architecture

| Component | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18.3.1 + Tailwind CSS (via Lovable) | Single-page mobile web UI; Poppins/Nunito typography; cream/coral WCAG AA palette |
| **Build Tool** | Vite + TypeScript | Fast dev server and type-safe codebase |
| **UI Components** | shadcn-ui | Pre-built accessible component library |
| **Camera** | HTML5 `getUserMedia` API | Live camera view; no facingMode constraint so works on phones and laptops |
| **Visual Filters** | CSS `filter` (contrast/brightness) + CSS `transform: scale()` | Real-time clarity adjustments — no server processing |
| **AR/XR Layer** | `@react-three/xr` + Three.js v0.150.0 | WebXR session with silent fallback for unsupported devices (iOS Safari) |
| **Backend** | None | All logic runs client-side; no uploads, no analytics, no stored data |
| **Database** | None | No user accounts or persistence — privacy by design |
| **Version Control** | GitHub | Required hackathon deliverable; also used as revert safety net during build |

### 🤖 AI/ML Track — AI Tools Used

| Tool | Role in Build | Impact |
|---|---|---|
| **Lovable** | Full app generation — built the complete 3-screen app: camera viewer, slider controls, Snellen chart flow, scoring logic, XR overlay, and library fix | Enabled a solo, low-code builder to ship a working mobile web app within the hackathon window |
| **Perplexity** | Problem framing, architecture decisions, risk identification, scalability research, ethical copy review | Surfaced the riskiest assumption early; shaped no-backend, privacy-first architecture; verified all stats against IAPB, WHO, UN Women |

> ℹ️ **goose Integration:** [If you used goose — add model name and specific implementation here. If goose was not part of your build, delete this line.]

***

## 📋 Project Logs & Documentation

| Log Type | Purpose | Link to Documentation |
|---|---|---|
| Decision Log | All tech stack, architecture, and feature scope choices with tradeoffs | [Link to /docs/DECISION_LOG.md] |
| Risk Log | 7 risks identified (Critical + Major) — all marked Fixed | [Link to /docs/RISK_LOG.md] |
| Evidence Log | 13+ sources, code libraries, assets, and AI-generated content with attributions | [Link to /docs/EVIDENCE_LOG.md] |
| 4-Line Problem Frame | User, problem, constraints, and success test with AI pressure-test | [Link to /docs/PROBLEM_FRAME.md] |

***

## 🧪 Testing & Known Issues

**Test Results:** End-to-end flow tested on MacBook Air (browser) and Android Chrome — no crashes, silent WebXR fallback confirmed working.

| Known Issue | Workaround |
|---|---|
| WebXR `immersive-AR` not supported on iOS Safari | Silent fallback via `@react-three/xr` — app loads as standard camera overlay with no error |
| `getUserMedia` has no `facingMode` constraint | Works on both phones and laptops; less control over which camera activates on multi-camera devices |
| Clarity score derived from slider values, not actual vision measurement | Labeled as assistive tool only; no medical or diagnostic claims made |
| CSS filters may not improve readability for all vision profiles | Filter ranges (contrast 100–300, brightness 80–140, zoom 1.0–4.0) tested and adjusted in-browser |

**Next Steps (with more time):**
- Add AI/ML-powered auto-tune that suggests optimal contrast/brightness settings based on ambient light
- Expand to Tumbling E chart for younger or non-literate users
- Add multi-language UI support beyond the current language-neutral icon approach

***

## 👥 Team & Acknowledgments

**Team Name:** France O

| Name | Role | GitHub | LinkedIn |
|---|---|---|---|
| France O | Solo Builder — Product, Design, Architecture | [@username] | [Profile Link] |

**Special thanks to:** CreateHER Fest, the #75HER Challenge organizers, IAPB & Seva Foundation for open-access vision data, WHO for global eye care research, and goose/Block.

***

## 📄 License & Attributions

**Project License:** MIT

| Library / Asset | License | Link |
|---|---|---|
| React 18.3.1 | MIT | https://react.dev |
| Vite | MIT | https://vitejs.dev |
| TypeScript | Apache 2.0 | https://www.typescriptlang.org |
| shadcn-ui | MIT | https://ui.shadcn.com |
| Three.js v0.150.0 | MIT | https://threejs.org |
| @react-three/xr | MIT | https://github.com/pmndrs/react-xr |
| Tailwind CSS | MIT | https://tailwindcss.com |
| HTML5 `getUserMedia` API | CC-BY-SA 2.5 (MDN docs) | https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia |
| CSS `filter` | CC-BY-SA 2.5 (MDN docs) | https://developer.mozilla.org/en-US/docs/Web/CSS/filter |
| SEEn Logo | Canva Free (no attribution required) | https://canva.com |
| IAPB / Seva Foundation data | Open access, attribution required | https://www.iapb.org |
| WHO eye care data (May 2025) | Open access, non-commercial with attribution | https://www.who.int |
| UN Women — Haiti | Open access, non-commercial | https://www.unwomen.org |
| UN SDG 4 & SDG 5 | Public reference use | https://sdgs.un.org |
| Humanium — Haiti | Non-profit educational use | https://www.humanium.org/en/haiti/ |

***

*Built with ❤️ for #75HER Challenge | CreateHER Fest 2026*


