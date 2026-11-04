# KERNEL REPO VAULT — LOCAL SETUP GUIDE

This project is a high-performance React + TypeScript application built with Vite and Tailwind CSS. It is fully pre-populated with 15,000 verified GitHub repository records partitioned across three star tiers.

---

## 1. Prerequisites

- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **Package Manager**: npm (bundled with Node.js)

---

## 2. Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/your-username/kernel-repo-vault.git
cd kernel-repo-vault

# Install dependencies
npm install
```

---

## 3. Running the Development Server

Start the Vite development server on port 3000:

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 4. Building for Production

Compile TypeScript and generate an optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 5. Dataset Regeneration (Optional)

If you ever wish to re-download, re-verify, or re-index the datasets from GitHub Public API sources:

```bash
node scripts/prepare_datasets.js
```

This will fetch the latest registry snapshots, validate star thresholds, deduplicate records, categorize according to the 40-domain taxonomy, and emit updated `repos_1k.json`, `repos_5k.json`, `repos_10k.json`, and `data_quality_report.json` files.
