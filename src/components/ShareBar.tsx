import React, { useState } from 'react';
import { Share2, Check, Copy, ExternalLink } from 'lucide-react';
import { trackOutboundClick } from '../utils/analytics.js';

interface ShareBarProps {
  title: string;
  description: string;
  urlPath: string;
}

export const ShareBar: React.FC<ShareBarProps> = ({ title, description, urlPath }) => {
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${urlPath.startsWith('/') ? '' : '/'}${urlPath}`
    : `https://werk.kernel.dev${urlPath.startsWith('/') ? '' : '/'}${urlPath}`;

  const shareText = `${title} — Curated open-source software on WERK by KERNEL.dev`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullUrl)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
  const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(title)}`;

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-sans">
      <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 mr-1">
        <Share2 className="w-3.5 h-3.5 text-slate-400" />
        <span>Share:</span>
      </span>

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
        aria-label="Copy page link to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Link Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-slate-400" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      {/* Share on X */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundClick('external', twitterUrl)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
        aria-label="Share on X / Twitter (opens in new tab)"
      >
        <span className="font-mono text-xs">𝕏</span>
        <span>Post</span>
      </a>

      {/* Share on LinkedIn */}
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundClick('external', linkedInUrl)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
        aria-label="Share on LinkedIn (opens in new tab)"
      >
        <span>LinkedIn</span>
      </a>

      {/* Share on Reddit */}
      <a
        href={redditUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundClick('external', redditUrl)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
        aria-label="Share on Reddit (opens in new tab)"
      >
        <span>Reddit</span>
      </a>
    </div>
  );
};
