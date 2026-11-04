export interface CuratedCollectionDef {
  id: string;
  name: string;
  slug: string;
  description: string;
  cover_image: string;
  is_featured: boolean;
  matchRepo: (repo: { full_name: string; topics: string[]; description: string }) => boolean;
}

export const EDITORIAL_COLLECTIONS: CuratedCollectionDef[] = [
  {
    id: 'col_essential_ai',
    name: 'Essential AI Tools',
    slug: 'essential-ai-tools',
    description: 'Foundational models, high-throughput inference runtimes, and local execution engines powering modern AI development.',
    cover_image: 'gradient_indigo',
    is_featured: true,
    matchRepo: ({ full_name, topics, description }) => {
      const fn = full_name.toLowerCase();
      const d = description.toLowerCase();
      return ['ollama/ollama', 'vllm-project/vllm', 'langchain-ai/langchain', 'meta-llama/llama', 'pytorch/pytorch'].includes(fn) ||
        topics.includes('llm') || topics.includes('deep-learning') || d.includes('inference engine');
    }
  },
  {
    id: 'col_best_react',
    name: 'Best React Libraries',
    slug: 'best-react-libraries',
    description: 'Battle-tested frameworks, state management primitives, animation engines, and rendering runtimes in the React ecosystem.',
    cover_image: 'gradient_cyan',
    is_featured: true,
    matchRepo: ({ full_name, topics }) => {
      const fn = full_name.toLowerCase();
      return ['facebook/react', 'vercel/next.js', 'tailwindlabs/tailwindcss', 'shadcn-ui/ui', 'pmndrs/zustand', 'tanstack/query'].includes(fn) ||
        topics.includes('react') || topics.includes('reactjs');
    }
  },
  {
    id: 'col_build_saas',
    name: 'Build Your Own SaaS',
    slug: 'build-your-own-saas',
    description: 'Open-source databases, authentication engines, backend frameworks, and payment boilerplates to ship software independently.',
    cover_image: 'gradient_emerald',
    is_featured: true,
    matchRepo: ({ full_name, topics, description }) => {
      const fn = full_name.toLowerCase();
      const d = description.toLowerCase();
      return ['supabase/supabase', 'fastapi/fastapi', 'expressjs/express', 'prisma/prisma', 'drizzle-team/drizzle-orm'].includes(fn) ||
        topics.includes('auth') || topics.includes('database') || d.includes('backend') || d.includes('saas');
    }
  },
  {
    id: 'col_dev_toolkit',
    name: 'Modern Developer Toolkit',
    slug: 'modern-developer-toolkit',
    description: 'High-speed package managers, Rust-powered tooling, modern text editors, and developer productivity accelerators.',
    cover_image: 'gradient_violet',
    is_featured: true,
    matchRepo: ({ full_name, topics }) => {
      const fn = full_name.toLowerCase();
      return ['microsoft/vscode', 'astral-sh/uv', 'neovim/neovim', 'oven-sh/bun', 'pnpm/pnpm'].includes(fn) ||
        topics.includes('developer-tools') || topics.includes('editor') || topics.includes('package-manager');
    }
  },
  {
    id: 'col_os_alternatives',
    name: 'Open-Source Alternatives',
    slug: 'open-source-alternatives',
    description: 'Self-hostable, privacy-conscious open source replacements for proprietary platforms like Notion, Figma, and Airtable.',
    cover_image: 'gradient_amber',
    is_featured: true,
    matchRepo: ({ full_name, description }) => {
      const fn = full_name.toLowerCase();
      const d = description.toLowerCase();
      return ['excalidraw/excalidraw', 'appflowy-io/appflowy', 'supabase/supabase', 'calcom/cal.com', 'affine-design/affine'].includes(fn) ||
        d.includes('alternative') || d.includes('open-source alternative');
    }
  },
  {
    id: 'col_ai_agents',
    name: 'AI Agent Ecosystem',
    slug: 'ai-agent-ecosystem',
    description: 'Autonomous reasoning agents, multi-agent orchestrators, cognitive planning loops, and Model Context Protocol servers.',
    cover_image: 'gradient_rose',
    is_featured: true,
    matchRepo: ({ full_name, topics, description }) => {
      const fn = full_name.toLowerCase();
      const d = description.toLowerCase();
      return ['crewaiinc/crewai', 'langchain-ai/langchain', 'microsoft/autogen', 'n8n-io/n8n'].includes(fn) ||
        topics.includes('ai-agents') || topics.includes('agent') || d.includes('agentic');
    }
  },
  {
    id: 'col_frontend_insp',
    name: 'Frontend Inspiration',
    slug: 'frontend-inspiration',
    description: 'Creative visual libraries, WebGL shaders, Three.js spatial scenes, and fluid spring animation systems.',
    cover_image: 'gradient_fuchsia',
    is_featured: false,
    matchRepo: ({ full_name, topics }) => {
      const fn = full_name.toLowerCase();
      return ['mrdoob/three.js', 'framer/motion', 'tailwindlabs/tailwindcss'].includes(fn) ||
        topics.includes('animation') || topics.includes('webgl') || topics.includes('threejs') || topics.includes('css');
    }
  },
  {
    id: 'col_self_hosted',
    name: 'Self-Hosted Essentials',
    slug: 'self-hosted-essentials',
    description: 'Private cloud infrastructure, home automation stacks, unhosted media streaming, and sovereign data backups.',
    cover_image: 'gradient_blue',
    is_featured: false,
    matchRepo: ({ full_name, topics }) => {
      const fn = full_name.toLowerCase();
      return ['home-assistant/core', 'syncthing/syncthing', 'nextcloud/server'].includes(fn) ||
        topics.includes('self-hosted') || topics.includes('homelab');
    }
  },
  {
    id: 'col_cli_tools',
    name: 'Powerful CLI Tools',
    slug: 'powerful-cli-tools',
    description: 'Blisteringly fast terminal programs, system utilities, multiplexers, and command-line interfaces for power users.',
    cover_image: 'gradient_slate',
    is_featured: false,
    matchRepo: ({ full_name, topics }) => {
      const fn = full_name.toLowerCase();
      return ['neovim/neovim', 'astral-sh/uv', 'ollama/ollama', 'tmux/tmux'].includes(fn) ||
        topics.includes('cli') || topics.includes('terminal') || topics.includes('tui');
    }
  },
  {
    id: 'col_ui_components',
    name: 'Modern UI Component Libraries',
    slug: 'modern-ui-components',
    description: 'Tailwind-compatible primitives, accessible dialogs, customizable design tokens, and production UI components.',
    cover_image: 'gradient_teal',
    is_featured: false,
    matchRepo: ({ full_name, topics }) => {
      const fn = full_name.toLowerCase();
      return ['shadcn-ui/ui', 'tailwindlabs/tailwindcss', 'radix-ui/primitives'].includes(fn) ||
        topics.includes('ui-components') || topics.includes('components') || topics.includes('design-system');
    }
  }
];
