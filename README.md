# WERK — Curated Software Repository Library

> **A considered collection of open-source software repositories by [KERNEL.dev](https://kernel.dev).**  
> Live Library: [https://werk.kernel.dev](https://werk.kernel.dev)

[![Dataset Snapshot](https://img.shields.io/badge/Verified%20Dataset-15%2C000%20Repos-blue)](https://werk.kernel.dev/audit)
[![Taxonomy](https://img.shields.io/badge/Categories-40%20Technical%20Disciplines-indigo)](https://werk.kernel.dev/categories)
[![Star Tiers](https://img.shields.io/badge/Star%20Tiers-1K%2B%20%7C%205K%2B%20%7C%2010K%2B-amber)](https://werk.kernel.dev/vault)
[![Zero Trackers](https://img.shields.io/badge/Privacy-Zero%20Trackers-emerald)](https://werk.kernel.dev/privacy)
[![License](https://img.shields.io/badge/License-MIT-slate)](LICENSE)

---

## 1. What WERK Is

WERK is a curated reference library of real, verified open-source GitHub repositories. It brings together notable software projects across 40 specialized engineering classifications, partitioned into three discrete star tiers (1K+, 5K+, and 10K+).

### What WERK is NOT
- **Not a search engine:** There is no algorithmic ranking, keyword stuffing, or sponsored placement.
- **Not a crawler or scraping bot:** Data is grounded in a verified static snapshot to guarantee zero latency and deterministic browsing.
- **Not a commercial SaaS:** No user accounts, paywalls, cookies, or behavioral tracking.

---

## 2. Why WERK Exists

Finding high-signal open-source software is increasingly hindered by:
1. **Keyword Bias:** Obscure yet mission-critical tools remain hidden behind general search queries dominated by commercial SEO.
2. **Empty-State Friction:** Developers entering a new technical domain (such as vector search, WebGPU, or microkernels) frequently don't know the exact keyword to start with.
3. **Low-Signal Noise:** Unfiltered queries frequently surface abandoned hobby experiments, unmaintained tutorial forks, or unverified packages.

WERK solves this by organizing 15,000 verified GitHub repositories into structured categories, allowing builders to explore the state of the art at their own pace.

---

## 3. What Visitors Can Do

- **Browse 40 Technical Categories:** Explore curated classifications across Artificial Intelligence, Frontend, Backend & Systems, Cloud Infrastructure, and Specialized Engineering.
- **Calibrate Maturity by Star Tiers:** Inspect repositories partitioned by community scrutiny:
  - **10K+ Tier:** Global standards and enterprise foundation libraries.
  - **5K+ Tier:** Established frameworks and production utilities.
  - **1K+ Tier:** Emerging tooling, lightweight alternatives, and focused modules.
- **Study Curated Editorial Stacks:** Discover hand-picked synergies such as *The Modern AI Stack*, *Open-Source Alternatives to Popular SaaS*, and *Projects Worth Studying*.
- **Direct GitHub Access:** Every entry links directly to its source repository on GitHub. WERK never rehosts, wraps, or gates open-source code.

---

## 4. How Repository Data Is Verified

Every indexed repository has been evaluated against authentic metadata compiled during the November 2026 data audit:
- Minimum star threshold verified (≥ 1,000 stars across all tiers).
- Deduplicated by unique GitHub Repository ID.
- Maintainer descriptions preserved verbatim; where maintainers provided no summary, WERK explicitly states *"Description not provided by the project maintainer"* rather than fabricating copy.
- Full details are published transparently on the [Data Quality Audit](https://werk.kernel.dev/audit) page.

---

## 5. Architectural Stack

- **Framework:** React 19 SPA with TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Typography:** Clash Display (Display headers), General Sans (Body), JetBrains Mono (Technical code/metrics)
- **Deployment:** Vercel Edge Static with clean path routing and security headers

---

## 6. Local Development

```bash
# Clone the repository
git clone https://github.com/kernel-dev/werk.git
cd werk

# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Run type check and lint
npm run lint

# Build production bundle
npm run build
```

---

## 7. Contributing & Corrections

We welcome community contributions, particularly:
- Correcting outdated category tags or descriptions.
- Proposing new curated architectural stacks.
- Reporting broken or moved repositories.

Please review [CONTRIBUTING.md](CONTRIBUTING.md) and our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

To report an issue or suggest a metadata correction, open a [GitHub Issue](https://github.com/kernel-dev/werk/issues) or email [inbox@kernel.dev](mailto:inbox@kernel.dev).

---

## 8. Official Channels

- **Website:** [https://werk.kernel.dev](https://werk.kernel.dev)
- **GitHub:** [https://github.com](https://github.com)
- **Instagram:** [@kernel.bat](https://www.instagram.com/kernel.bat/)
- **Donation Gateway (NOWPayments):** [https://nowpayments.io/donation/WERK](https://nowpayments.io/donation/WERK)
- **Maintainer Contact:** [inbox@kernel.dev](mailto:inbox@kernel.dev)

---

## 9. Disclaimer & Trademarks

WERK is an independent publication of KERNEL.dev. All repository names, logos, codebases, and brand trademarks belong exclusively to their respective maintainers under their stated open-source licenses. Linking to a repository does not imply endorsement, affiliation, or sponsorship.
