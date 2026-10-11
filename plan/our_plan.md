# Portfolio Website Implementation & Deployment Plan: `our_plan.md`

**Project:** Modern Academic Portfolio for Phatthanan Siangpro  
**Domain:** Economics, Public Finance, Government Audit & Policy Analysis  
**Deployment Target:** GitHub Pages (Static Hosting)  
**Date:** October 2026  

---

## 1. Project Overview & Architectural Vision

This plan documents the design, architecture, content specifications, and deployment lifecycle for the personal research portal of **Phatthanan Siangpro**.

### Target Audience & Brand Direction
- **Identity:** Economics graduate student and government auditor specializing in public finance, empirical policy analysis, econometrics, and public sector compensation/pension reform.
- **Aesthetic:** Dark, clean, intellectual, editorial monospace design powered by **JetBrains Mono**.
- **Tech Stack:** Plain HTML5, CSS3, and Vanilla JavaScript—100% dependency-free, no bundlers or frameworks (no React, Vite, or Tailwind), fully functional locally via `file://` protocol and on static hosting platforms like GitHub Pages.

---

## 2. File Structure & Assets

```
my_data/
├── index.html          # Semantic HTML5 markup, structured metadata & full analytical essays
├── styles.css          # Dark editorial styling, custom variables, responsive grid
├── script.js           # Vanilla JS: scroll spy, mobile drawer, essay expansion, clipboard copy
├── assets/
│   └── black.png       # 512x512 High-DPI minimalist monogram emblem
└── plan/
    └── our_plan.md     # Complete project architectural & deployment blueprint (this file)
```

---

## 3. Structural Components & Content Specifications

### Section 1: Top Navigation (`<nav>`)
- **Sticky Blur Bar:** Frosted glass effect using `backdrop-filter: blur(14px)` and responsive shrink on scroll.
- **Brand Identifier:** Logo avatar thumbnail + `Phatthanan Siangpro // Research & Policy`.
- **Nav Links:** Smooth-scroll anchors (`#about`, `#interests`, `#projects`, `#contact`) with active scroll-spy highlighting.
- **Mobile Responsive Drawer:** Collapsible hamburger menu `[ ☰ ]` for screens under 768px.

### Section 2: Hero Section (`<header id="hero">`)
- **Quote Badge:** *“Master Economics, the Simple Way.”*
- **Profile Monogram:** `assets/black.png` embedded with subtle glowing border.
- **Identity Line:** *“Economics Graduate Student | Public Finance | Policy Analysis | Econometrics”*
- **Description:** *“I study how economic ideas, public institutions, and data can explain real-world decisions.”*
- **Primary CTAs:** Direct links to `View Projects` (`#projects`) and `Contact` (`#contact`).
- **Research Tags:** `#PublicFinance`, `#PolicyAnalysis`, `#CausalEconometrics`, `#AuditAndGovernance`, `#PensionReform`, `#AIInEconomics`.

### Section 3: About Me (`<section id="about">`)
- **First-Person Narrative:** Covers graduate research focus, institutional audit background, and the real-world gap between statutory decrees and operational implementation.
- **Core Subject Areas:**
  - Public economics & fiscal statecraft
  - Policy analysis & regulatory evaluation
  - Econometrics & causal identification
  - Investment analysis & capital asset allocation
  - AI and computational data tools
  - Public sector compensation structures & pension reform
- **Academic Highlights Sidebar:** Structured cards detailing research focus areas and methodological arsenal.

### Section 4: Research Interests (`<section id="interests">`)
Four structured, hover-elevated cards:
1. **Public Finance:** Civil service pension reform, wage bill dynamics, tax incidence, and long-term sovereign fiscal liabilities.
2. **Policy Analysis:** Regulatory impact assessments, cost-benefit modeling, and audit mechanisms against moral hazard.
3. **Econometrics:** Causal inference, Difference-in-Differences (DiD), Regression Discontinuity (RDD), and synthetic control methods.
4. **AI for Economic Research:** Natural language processing for audit reports, predictive machine learning in budget forecasting, and anomaly detection in public procurement.

### Section 5: Featured Projects (`<section id="projects">`)
Two expandable, graduate-level analytical essays formatted with academic typography, table of contents, callouts, pull quotes, and formal citations:

#### Project 1: *Economics in One Lesson: Key Economic Concepts from Henry Hazlitt*
* **Word Count:** ~1,970 words (exceeds the 1,000-word mandate).
* **Key Themes Covered:**
  - The One Lesson: Intertemporal and general equilibrium constraints.
  - Frédéric Bastiat's Seen vs. Unseen consequences.
  - The counterfactual framework in modern causal inference.
  - Opportunity cost under resource scarcity.
  - Deconstruction of the Broken Window Fallacy.
  - The mirage of job creation via debt/tax-funded public spending.
  - Price ceilings and floors: Information disruption and deadweight loss.
  - Minimum wages, marginal revenue product of labor, and disemployment.
  - 21st-century policy parallels: Industrial subsidies, modern tariffs, and civil service pension liabilities.

#### Project 2: *Game Theory: Strategic Thinking in Economics and Public Policy*
* **Word Count:** ~1,880 words (exceeds the 1,000-word mandate).
* **Key Themes Covered:**
  - Strategic interdependence vs. parametric decision-making.
  - Formal normal-form architecture: Players $\mathcal{N}$, Strategies $S_i$, Payoffs $u_i$.
  - Nash Equilibrium as mutual best responses.
  - The Prisoner’s Dilemma, public goods, and the Tragedy of the Commons.
  - Coordination games, multiple equilibria, and Schelling focal points.
  - Dynamic games, backward induction, subgame perfection (SPNE), and credible commitment.
  - Kydland & Prescott's policy time-inconsistency problem.
  - The Folk Theorem and cooperation sustained by the shadow of the future.
  - Asymmetric information: Adverse selection, signaling, and moral hazard.
  - Mechanism design: VCG auctions and Gale-Shapley matching markets.
  - Inspection games: Strategic auditing, mixed-strategy equilibria, and penalty design.

### Section 6: Contact (`<section id="contact">`)
- **Primary Email Channel:** `sp.phatthananG@gmail.com` with `mailto:` link and click-to-copy button.
- **Alternate / Academic Channel:** `dx@outlook.com` with `mailto:` link and click-to-copy button.
- **Collaboration Context Cards:** Scope for research collaboration and institutional audit consultation.

### Section 7: Footer (`<footer>`)
- Semantic copyright notice, typography colophon, back-to-top trigger, and static hosting notes.

---

## 4. Local Preview Workflow

To view or edit the site locally:

1. **Direct Browser Inspection:**
   Double-click `index.html` or open `file:///C:/Users/Kung/Desktop/my_data/index.html` in any browser.
2. **Local HTTP Server (Optional):**
   Run either:
   ```powershell
   python -m http.server 8000
   ```
   or:
   ```powershell
   npx serve .
   ```
   Navigate to `http://localhost:8000`.

---

## 5. GitHub Version Control & Deployment Guide

### Step 1: Initialize Local Git Repository
In PowerShell inside `C:\Users\Kung\Desktop\my_data`:
```powershell
git init
git add index.html styles.css script.js assets/black.png plan/our_plan.md
git commit -m "feat: complete economist portfolio and project documentation"
git branch -M main
```

### Step 2: Push to GitHub Remote
Create a repository on GitHub (e.g., `portfolio` or `<username>.github.io`), then run:
```powershell
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub: `https://github.com/<your-username>/<your-repo-name>`.
2. Navigate to **Settings** > **Pages** (under "Code and automation").
3. Under **Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main`
   - **Folder:** `/ (root)`
4. Click **Save**.
5. Within 1–2 minutes, your website will be live at:
   `https://<your-username>.github.io/<your-repo-name>/`

---

## 6. Future Expansion Roadmap

1. **Curriculum Vitae (CV) PDF Integration:** Add a downloadable `assets/cv_phatthanan_siangpro.pdf` linked from the navigation bar.
2. **Interactive Econometric Visualizations:** Add lightweight Chart.js or D3.js plots displaying pension liability projections or state revenue elasticities.
3. **Custom Domain Setup:** Configure a CNAME record (e.g., `phatthanan.com` or `siangpro.org`) with automated HTTPS via GitHub Pages.
4. **Google Scholar / ORCID Links:** Connect verified researcher profile links once new academic publications are indexed.
