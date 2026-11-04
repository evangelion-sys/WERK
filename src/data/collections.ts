import type { CuratedCollection } from '../types/repository.js';

export const COLLECTIONS: CuratedCollection[] = [
  {
    id: 'modern-ai-stack',
    title: 'The Modern AI Stack',
    slug: 'modern-ai-stack',
    subtitle: 'Foundation models, inference engines, and autonomous agent systems',
    tagline: 'Leading machine intelligence frameworks powering the next computational wave.',
    description: 'A curated ensemble of the world’s most impactful AI tools: from foundational inference and local LLM weight execution to agent orchestrations and neural generation.',
    featuredRepoFullNames: [
      'vllm-project/vllm',
      'ollama/ollama',
      'langchain-ai/langchain',
      'huggingface/transformers',
      'AUTOMATIC1111/stable-diffusion-webui',
      'pytorch/pytorch'
    ],
    badgeColor: 'indigo'
  },
  {
    id: 'frontend-titans',
    title: 'Frontend Titans & Design Systems',
    slug: 'frontend-titans',
    subtitle: 'Reactive view layers, component libraries, and build tools',
    tagline: 'The battle-tested architectural pillars powering the modern web interface.',
    description: 'The premier frameworks, reactive state machines, atomic design libraries, and bundlers transforming UI engineering across millions of applications.',
    featuredRepoFullNames: [
      'facebook/react',
      'vercel/next.js',
      'vuejs/vue',
      'sveltejs/svelte',
      'tailwindlabs/tailwindcss',
      'shadcn-ui/ui'
    ],
    badgeColor: 'emerald'
  },
  {
    id: 'self-hosted-sovereign',
    title: 'Self-Hosted Sovereign Cloud',
    slug: 'self-hosted-sovereign',
    subtitle: 'Decentralized, privacy-first personal servers and workflow automation',
    tagline: 'Take back control of your compute, storage, and home automation.',
    description: 'Privacy-focused self-hosted software allowing teams and individuals to host personal cloud storage, photo vaults, smart home IoT, and automation workflows.',
    featuredRepoFullNames: [
      'home-assistant/core',
      'syncthing/syncthing',
      'n8n-io/n8n',
      'jellyfin/jellyfin',
      'immich-app/immich',
      'calcom/cal.com'
    ],
    badgeColor: 'amber'
  },
  {
    id: 'next-gen-databases',
    title: 'Next-Generation Database Engines',
    slug: 'next-gen-databases',
    subtitle: 'Vector indices, columnar analytical powerhouses, and realtime Postgres',
    tagline: 'Storage architectures designed for modern concurrency and unstructured search.',
    description: 'Cutting-edge databases revolutionizing how developers store, query, replicate, and vectorize massive data streams with sub-millisecond latencies.',
    featuredRepoFullNames: [
      'supabase/supabase',
      'redis/redis',
      'clickhouse/clickhouse',
      'milvus-io/milvus',
      'postgres/postgres',
      'prisma/prisma'
    ],
    badgeColor: 'purple'
  },
  {
    id: 'cybersecurity-arsenal',
    title: 'Cybersecurity & Offensive Audit',
    slug: 'cybersecurity-arsenal',
    subtitle: 'Automated vulnerability scanning, exploit frameworks, and network reconnaissance',
    tagline: 'Open-source security research toolkits protecting global internet infrastructure.',
    description: 'The standard security tooling relied upon by penetration testers, red teams, and security researchers worldwide to inspect vulnerabilities and harden defenses.',
    featuredRepoFullNames: [
      'projectdiscovery/nuclei',
      'sqlmapproject/sqlmap',
      'nmap/nmap',
      'danielmiessler/SecLists',
      'rapid7/metasploit-framework',
      'OWASP/CheatSheetSeries'
    ],
    badgeColor: 'rose'
  },
  {
    id: 'developer-ergonomics',
    title: 'Developer Ergonomics & Terminal Mastery',
    slug: 'developer-ergonomics',
    subtitle: 'Lightning-fast package managers, extensible editors, and CLI utilities',
    tagline: 'Crafting the ultimate developer workspace with blazingly fast native binaries.',
    description: 'A selection of high-velocity CLI utilities, terminal enhancements, and editors written in Rust, Go, and C that make engineering feel instantaneous.',
    featuredRepoFullNames: [
      'microsoft/vscode',
      'neovim/neovim',
      'astral-sh/uv',
      'BurntSushi/ripgrep',
      'starship/starship',
      'sharkdp/fd'
    ],
    badgeColor: 'cyan'
  },
  {
    id: 'open-source-alternatives',
    title: 'Open-Source Alternatives to Popular SaaS Tools',
    slug: 'open-source-alternatives',
    subtitle: 'Self-hostable, transparent replacements for proprietary enterprise software',
    tagline: 'Sovereign architectures replacing proprietary closed-source cloud services.',
    description: 'Production-grade, community-driven alternatives to proprietary cloud platforms like Firebase, Calendly, Zapier, Google Analytics, Datadog, and Spotify.',
    featuredRepoFullNames: [
      'supabase/supabase',
      'calcom/cal.com',
      'n8n-io/n8n',
      'posthog/posthog',
      'jellyfin/jellyfin',
      'plausible/analytics'
    ],
    badgeColor: 'indigo'
  },
  {
    id: 'projects-worth-studying',
    title: 'Open-Source Projects Worth Studying',
    slug: 'projects-worth-studying',
    subtitle: 'Masterclasses in systems architecture, algorithmic clarity, and engineering discipline',
    tagline: 'Remarkable codebases celebrated for clean design, robust testing, and enduring clarity.',
    description: 'Landmark software systems with exceptional architectural design, minimal cognitive overhead, and maintainable abstractions that every software engineer can learn from.',
    featuredRepoFullNames: [
      'torvalds/linux',
      'redis/redis',
      'git/git',
      'curl/curl',
      'antirez/kilo',
      'postgres/postgres'
    ],
    badgeColor: 'amber'
  },
  {
    id: 'useful-automation',
    title: 'Useful Automation Repositories',
    slug: 'useful-automation',
    subtitle: 'Programmable workflow orchestrators, event bridges, and webhook engines',
    tagline: 'Automating repetitive engineering pipelines and distributed operations.',
    description: 'Extensible workflow automation engines that connect APIs, automate background processing, orchestrate notifications, and synchronize distributed services.',
    featuredRepoFullNames: [
      'n8n-io/n8n',
      'huginn/huginn',
      'activepieces/activepieces',
      'automatisch/automatisch',
      'AppFlowy-IO/AppFlowy',
      'home-assistant/core'
    ],
    badgeColor: 'emerald'
  }
];
