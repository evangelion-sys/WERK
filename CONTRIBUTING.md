# Contributing to WERK

Thank you for your interest in contributing to WERK!

WERK is an independent curated library of open-source software repositories maintained by [KERNEL.dev](https://kernel.dev). We welcome thoughtful contributions that improve data accuracy, taxonomy clarity, and developer usability.

---

## Areas Where You Can Help

1. **Repository Metadata Corrections**
   - Correcting an inaccurate category classification.
   - Updating descriptions for repositories where maintainers recently revised their summaries.
   - Reporting archived, deprecated, or transferred repositories.
2. **Editorial Collections**
   - Proposing synergistic repository groupings that accelerate production engineering.
   - Providing clear editorial rationale explaining why projects belong together.
3. **Accessibility & Performance**
   - Improving keyboard navigation, screen reader accessibility (`aria` attributes), and color contrast.
   - Reducing JavaScript bundle overhead and improving Core Web Vitals.

---

## Guidelines for Submitting Corrections

When opening an issue or pull request for a repository correction:
- Specify the exact repository full name (e.g., `owner/repo`).
- Include the official GitHub repository link.
- State the proposed change (e.g., reclassifying from `DevOps` to `Cloud Infrastructure`) with a brief justification based on the repository's primary focus.

---

## Development Workflow

1. Fork the repository and create your feature branch:
   ```bash
   git checkout -b fix/category-correction
   ```
2. Run the application locally:
   ```bash
   npm install
   npm run dev
   ```
3. Ensure TypeScript type check passes:
   ```bash
   npm run lint
   ```
4. Verify the production build:
   ```bash
   npm run build
   ```
5. Submit a pull request with a descriptive title and summary of changes.

---

## Communication Channels

- **Email:** [inbox@kernel.dev](mailto:inbox@kernel.dev)
- **Instagram:** [@kernel.bat](https://www.instagram.com/kernel.bat/)
- **Official Website:** [https://werk.kernel.dev](https://werk.kernel.dev)
