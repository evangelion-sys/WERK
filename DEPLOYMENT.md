# KERNEL REPO VAULT — PRODUCTION DEPLOYMENT GUIDE

KERNEL REPO VAULT is a client-side static web application designed for fast, global edge delivery without complex server or database infrastructure.

---

## 1. Cloudflare Pages Deployment (Recommended)

Cloudflare Pages provides global edge caching and instant static asset delivery with zero operational cost.

### Option A: Via Cloudflare Dashboard
1. Connect your GitHub repository to Cloudflare Pages.
2. Configure build settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Build Output Directory:** `dist`
   - **Node.js Version:** `20.x` or `22.x`
3. Click **Deploy**.

### Option B: Via Wrangler CLI
```bash
npm run build
npx wrangler pages deploy dist --project-name kernel-repo-vault
```

---

## 2. Vercel Deployment

Deploy directly using the Vercel CLI or Git integration:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Configure build settings:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

---

## 3. GitHub Pages Deployment

1. Install `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```
2. In `vite.config.ts`, ensure `base: './'` or your repo path is configured.
3. Add a deploy script to `package.json`:
   ```json
   "deploy": "vite build && gh-pages -d dist"
   ```
4. Run `npm run deploy`.

---

## 4. Docker Deployment

Build a lightweight Nginx container:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t kernel-repo-vault .
docker run -p 8080:80 kernel-repo-vault
```
