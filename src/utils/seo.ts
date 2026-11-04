export const CANONICAL_BASE = 'https://werk.kernel.dev';

export interface SeoConfig {
  title: string;
  description: string;
  path?: string;
  ogType?: 'website' | 'article';
  jsonLd?: Record<string, any>;
}

export function updatePageSeo(config: SeoConfig): void {
  if (typeof document === 'undefined') return;

  // 1. Update Title
  const formattedTitle = config.title.includes('WERK')
    ? config.title
    : `${config.title} — WERK`;
  document.title = formattedTitle;

  // 2. Helper to set or create meta tags
  const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
    let tag = document.querySelector(`meta[${attribute}="${key}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, key);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  // 3. Update Standard & Social Meta Descriptions
  setMetaTag('name', 'description', config.description);
  setMetaTag('property', 'og:title', formattedTitle);
  setMetaTag('property', 'og:description', config.description);
  setMetaTag('property', 'og:type', config.ogType || 'website');
  setMetaTag('property', 'og:site_name', 'WERK');
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', formattedTitle);
  setMetaTag('name', 'twitter:description', config.description);

  // 4. Canonical URL resolution
  const path = config.path || window.location.pathname || '/';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${CANONICAL_BASE}${cleanPath}`;

  setMetaTag('property', 'og:url', canonicalUrl);

  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute('href', canonicalUrl);

  // 5. Dynamic JSON-LD Structured Data
  if (config.jsonLd) {
    let scriptTag = document.getElementById('werk-dynamic-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('id', 'werk-dynamic-jsonld');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(config.jsonLd, null, 2);
  }
}
