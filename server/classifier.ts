export interface CategoryDefinition {
  slug: string;
  name: string;
  group_name: string;
  description: string;
  icon?: string;
  display_order: number;
  match: (meta: {
    topics: string[];
    language: string | null;
    name: string;
    description: string;
  }) => boolean;
}

export const CATEGORIES: CategoryDefinition[] = [
  // --- Artificial Intelligence ---
  {
    slug: 'ai-ml',
    name: 'AI & Machine Learning',
    group_name: 'Artificial Intelligence',
    description: 'Foundational artificial intelligence architectures, deep learning frameworks, neural networks, and model training runtimes.',
    icon: 'Brain',
    display_order: 1,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['artificial-intelligence', 'machine-learning', 'deep-learning', 'pytorch', 'tensorflow', 'jax', 'neural-network', 'transformers'];
      return t.some(x => keys.includes(x)) || d.includes('machine learning') || d.includes('deep learning') || d.includes('neural network');
    }
  },
  {
    slug: 'llms',
    name: 'Large Language Models',
    group_name: 'Artificial Intelligence',
    description: 'LLM inference runtimes, local model runners, parameter quantization, and high-throughput text generation engines.',
    icon: 'MessageSquareCode',
    display_order: 2,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['llm', 'large-language-models', 'llama', 'vllm', 'ollama', 'mistral', 'gemma', 'transformers', 'gpt', 'local-ai'];
      return t.some(x => keys.includes(x)) || d.includes('large language model') || d.includes('llm') || d.includes('llama');
    }
  },
  {
    slug: 'ai-agents',
    name: 'AI Agents',
    group_name: 'Artificial Intelligence',
    description: 'Autonomous reasoning agents, multi-agent coordination frameworks, cognitive loop runtimes, and tool-use orchestrators.',
    icon: 'Bot',
    display_order: 3,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['ai-agents', 'agent', 'agents', 'crewai', 'autogen', 'langchain', 'langgraph', 'mcp', 'agentic'];
      return t.some(x => keys.includes(x)) || d.includes('ai agent') || d.includes('autonomous agent') || d.includes('multi-agent');
    }
  },
  {
    slug: 'rag-knowledge',
    name: 'RAG & Knowledge Systems',
    group_name: 'Artificial Intelligence',
    description: 'Retrieval-augmented generation pipelines, document chunking engines, dense embedding models, and contextual retrieval stacks.',
    icon: 'FileSearch',
    display_order: 4,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['rag', 'retrieval-augmented-generation', 'vector-search', 'embeddings', 'knowledge-base', 'reranker'];
      return t.some(x => keys.includes(x)) || d.includes('rag') || d.includes('retrieval augmented') || d.includes('vector search');
    }
  },
  {
    slug: 'generative-ai',
    name: 'Generative AI',
    group_name: 'Artificial Intelligence',
    description: 'Diffusion models, image synthesis pipelines, audio generation, speech-to-text, and creative multimodal media engines.',
    icon: 'Sparkles',
    display_order: 5,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['generative-ai', 'diffusion', 'stable-diffusion', 'comfyui', 'whisper', 'tts', 'text-to-speech', 'voice-synthesis', 'musicgen'];
      return t.some(x => keys.includes(x)) || d.includes('diffusion') || d.includes('generative ai') || d.includes('text to speech') || d.includes('speech recognition');
    }
  },
  {
    slug: 'computer-vision',
    name: 'Computer Vision',
    group_name: 'Artificial Intelligence',
    description: 'Object detection, image segmentation, optical character recognition, facial recognition, and video analytics tools.',
    icon: 'Scan',
    display_order: 6,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['computer-vision', 'opencv', 'yolo', 'ocr', 'object-detection', 'image-processing', 'segmentation'];
      return t.some(x => keys.includes(x)) || d.includes('computer vision') || d.includes('object detection') || d.includes('ocr');
    }
  },
  {
    slug: 'ai-infrastructure',
    name: 'AI Infrastructure',
    group_name: 'Artificial Intelligence',
    description: 'GPU orchestration, distributed model serving, CUDA acceleration, quantization kernels, and vector database primitives.',
    icon: 'Server',
    display_order: 7,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['cuda', 'gpu', 'inference-engine', 'serving', 'quantization', 'vector-database', 'milvus', 'qdrant', 'chroma'];
      return t.some(x => keys.includes(x)) || d.includes('inference engine') || d.includes('serving engine') || d.includes('vector database') || d.includes('gpu');
    }
  },

  // --- Development ---
  {
    slug: 'react-ecosystem',
    name: 'React Ecosystem',
    group_name: 'Development',
    description: 'State management, custom hooks, reactivity primitives, routing solutions, and core utilities built for React.',
    icon: 'Atom',
    display_order: 8,
    match: ({ topics, description, language }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      return t.includes('react') || t.includes('reactjs') || t.includes('react-hooks') ||
        (d.includes('react') && !d.includes('reaction') && (language === 'TypeScript' || language === 'JavaScript'));
    }
  },
  {
    slug: 'nextjs',
    name: 'Next.js',
    group_name: 'Development',
    description: 'Full-stack React framework tooling, server action utilities, App Router boilerplates, and rendering enhancements.',
    icon: 'Globe',
    display_order: 9,
    match: ({ topics, description, name }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const n = name.toLowerCase();
      return t.includes('nextjs') || t.includes('next-js') || n.includes('nextjs') || d.includes('next.js') || d.includes('nextjs');
    }
  },
  {
    slug: 'vue-nuxt',
    name: 'Vue & Nuxt',
    group_name: 'Development',
    description: 'Progressive reactive UI frameworks, Nuxt SSR architectures, Pinia state, and the broader Vue developer ecosystem.',
    icon: 'Layers',
    display_order: 10,
    match: ({ topics, description, language }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      return t.includes('vue') || t.includes('vuejs') || t.includes('nuxt') || t.includes('nuxtjs') ||
        language === 'Vue' || d.includes('vue.js') || d.includes('nuxt');
    }
  },
  {
    slug: 'svelte',
    name: 'Svelte',
    group_name: 'Development',
    description: 'Compiler-driven UI frameworks, SvelteKit full-stack applications, Runes reactivity, and surgical web component tooling.',
    icon: 'Zap',
    display_order: 11,
    match: ({ topics, description, language }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      return t.includes('svelte') || t.includes('sveltekit') || language === 'Svelte' || d.includes('svelte');
    }
  },
  {
    slug: 'react-native',
    name: 'React Native',
    group_name: 'Development',
    description: 'Cross-platform native mobile frameworks, Expo tooling, gesture engines, and bridge-free React Native architectures.',
    icon: 'Smartphone',
    display_order: 12,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      return t.includes('react-native') || t.includes('expo') || d.includes('react native') || d.includes('react-native');
    }
  },
  {
    slug: 'web-development',
    name: 'Web Development',
    group_name: 'Development',
    description: 'Standards-compliant browser tooling, HTML5 architectures, WebAssembly runtimes, and progressive web application tools.',
    icon: 'Compass',
    display_order: 13,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['web', 'web-development', 'frontend', 'browser', 'pwa', 'wasm', 'webassembly'];
      return t.some(x => keys.includes(x)) || d.includes('web development') || d.includes('frontend framework');
    }
  },
  {
    slug: 'backend-dev',
    name: 'Backend Development',
    group_name: 'Development',
    description: 'High-performance HTTP servers, REST frameworks, microservice orchestration, RPC protocols, and server runtimes.',
    icon: 'Cpu',
    display_order: 14,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['backend', 'express', 'fastapi', 'nestjs', 'gin', 'actix-web', 'fiber', 'spring-boot', 'django'];
      return t.some(x => keys.includes(x)) || d.includes('backend framework') || d.includes('http server') || d.includes('microservices');
    }
  },
  {
    slug: 'apis-integrations',
    name: 'APIs & Integrations',
    group_name: 'Development',
    description: 'REST clients, GraphQL schemas, gRPC runtimes, OpenAPI specifications, webhook relays, and API gateway utilities.',
    icon: 'Share2',
    display_order: 15,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['api', 'rest-api', 'graphql', 'grpc', 'openapi', 'swagger', 'webhook'];
      return t.some(x => keys.includes(x)) || d.includes('rest api') || d.includes('graphql') || d.includes('grpc') || d.includes('api gateway');
    }
  },
  {
    slug: 'developer-tools',
    name: 'Developer Tools',
    group_name: 'Development',
    description: 'Compilers, package managers, bundlers, linters, debuggers, profiling utilities, code editors, and software construction environments.',
    icon: 'Wrench',
    display_order: 16,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['developer-tools', 'devtools', 'bundler', 'linter', 'compiler', 'formatter', 'package-manager', 'ide', 'editor', 'code-editor', 'neovim', 'vim', 'vscode'];
      return t.some(x => keys.includes(x)) || d.includes('developer tool') || d.includes('package manager') || d.includes('code editor') || d.includes('bundler');
    }
  },
  {
    slug: 'cli-terminal',
    name: 'CLI & Terminal',
    group_name: 'Development',
    description: 'Command line utilities, shell enhancements, terminal multiplexers, TUI frameworks, and sysadmin command-line utilities.',
    icon: 'Terminal',
    display_order: 17,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['cli', 'command-line', 'terminal', 'tui', 'shell', 'bash', 'zsh', 'fish', 'tmux'];
      return t.some(x => keys.includes(x)) || d.includes('command line') || d.includes('terminal') || d.includes('tui') || d.includes('cli tool');
    }
  },

  // --- Design & Frontend ---
  {
    slug: 'ui-components',
    name: 'UI Component Libraries',
    group_name: 'Design & Frontend',
    description: 'Accessible, unstyled primitives, robust component libraries, datatables, modal dialogs, and reusable interactive controls.',
    icon: 'Layout',
    display_order: 18,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['ui', 'ui-components', 'components', 'radix-ui', 'shadcn', 'headless-ui', 'component-library', 'datatable', 'modal'];
      return t.some(x => keys.includes(x)) || d.includes('component library') || d.includes('ui components') || d.includes('accessible components');
    }
  },
  {
    slug: 'design-systems',
    name: 'Design Systems',
    group_name: 'Design & Frontend',
    description: 'Design tokens, token transformation engines, Storybook tooling, brand guidelines, and UI consistency architectures.',
    icon: 'Palette',
    display_order: 19,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['design-system', 'design-tokens', 'tokens', 'styleguide', 'storybook'];
      return t.some(x => keys.includes(x)) || d.includes('design system') || d.includes('design tokens') || d.includes('style guide');
    }
  },
  {
    slug: 'css-styling',
    name: 'CSS & Styling',
    group_name: 'Design & Frontend',
    description: 'Utility CSS engines, Tailwind CSS tooling, Sass compilers, CSS-in-JS runtimes, and modern layout post-processors.',
    icon: 'Code2',
    display_order: 20,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['css', 'tailwind', 'tailwindcss', 'postcss', 'sass', 'styling', 'vanilla-extract'];
      return t.some(x => keys.includes(x)) || d.includes('css framework') || d.includes('tailwindcss') || d.includes('styling');
    }
  },
  {
    slug: 'animation-motion',
    name: 'Animation & Motion',
    group_name: 'Design & Frontend',
    description: 'Spring physics, micro-interactions, canvas animation runtimes, GSAP extensions, and cinematic scroll choreography.',
    icon: 'PlayCircle',
    display_order: 21,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['animation', 'framer-motion', 'motion', 'gsap', 'spring', 'svg-animation', 'lottie'];
      return t.some(x => keys.includes(x)) || d.includes('animation') || d.includes('motion') || d.includes('spring physics');
    }
  },
  {
    slug: 'webgl-shaders',
    name: 'WebGL & Shaders',
    group_name: 'Design & Frontend',
    description: 'Three.js 3D scenes, GLSL shader effects, WebGPU compute primitives, canvas rendering, and procedural spatial visuals.',
    icon: 'Eye',
    display_order: 22,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['threejs', 'three-js', 'webgl', 'webgpu', 'shader', 'glsl', '3d', 'canvas'];
      return t.some(x => keys.includes(x)) || d.includes('three.js') || d.includes('webgl') || d.includes('shader');
    }
  },
  {
    slug: 'landing-page-resources',
    name: 'Landing Page Resources',
    group_name: 'Design & Frontend',
    description: 'High-converting hero patterns, landing page templates, Bento grids, CTA components, and modern showcase sections.',
    icon: 'LayoutTemplate',
    display_order: 23,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['landing-page', 'template', 'bento-grid', 'portfolio-template', 'saas-landing-page'];
      return t.some(x => keys.includes(x)) || d.includes('landing page') || d.includes('templates for');
    }
  },
  {
    slug: 'icons-typography',
    name: 'Icons & Typography',
    group_name: 'Design & Frontend',
    description: 'SVG icon sprite libraries, Lucide, FontAwesome, typography specimen generators, font formatters, and glyph collections.',
    icon: 'Type',
    display_order: 24,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['icons', 'svg-icons', 'lucide', 'fonts', 'typography', 'icon-font'];
      return t.some(x => keys.includes(x)) || d.includes('icon library') || d.includes('typography') || d.includes('svg icons');
    }
  },
  {
    slug: 'creative-dev',
    name: 'Creative Development',
    group_name: 'Design & Frontend',
    description: 'Generative art systems, interactive audio synthesis, creative coding canvas frameworks, and experimental media.',
    icon: 'Sparkle',
    display_order: 25,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['generative-art', 'creative-coding', 'p5js', 'audio-synthesis', 'web-audio', 'midi'];
      return t.some(x => keys.includes(x)) || d.includes('creative coding') || d.includes('generative art') || d.includes('web audio');
    }
  },

  // --- Infrastructure ---
  {
    slug: 'databases',
    name: 'Databases',
    group_name: 'Infrastructure',
    description: 'Relational databases, document stores, key-value caches, ORMs, vector search engines, and transactional migration engines.',
    icon: 'Database',
    display_order: 26,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['database', 'databases', 'sql', 'postgresql', 'postgres', 'sqlite', 'mysql', 'redis', 'mongodb', 'orm', 'prisma', 'drizzle', 'typeorm', 'clickhouse'];
      return t.some(x => keys.includes(x)) || d.includes('database') || d.includes('sql engine') || d.includes('orm');
    }
  },
  {
    slug: 'devops',
    name: 'DevOps',
    group_name: 'Infrastructure',
    description: 'CI/CD pipeline automation, GitHub Actions workflows, infrastructure-as-code, and release management suites.',
    icon: 'GitPullRequest',
    display_order: 27,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['devops', 'ci-cd', 'github-actions', 'terraform', 'ansible', 'helm', 'release-management'];
      return t.some(x => keys.includes(x)) || d.includes('ci/cd') || d.includes('devops') || d.includes('infrastructure as code');
    }
  },
  {
    slug: 'cloud-infrastructure',
    name: 'Cloud Infrastructure',
    group_name: 'Infrastructure',
    description: 'Kubernetes operators, cloud native provisioning, serverless frameworks, load balancers, and distributed mesh systems.',
    icon: 'Cloud',
    display_order: 28,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['cloud-native', 'kubernetes', 'k8s', 'serverless', 'load-balancer', 'aws', 'gcp', 'cloudflare'];
      return t.some(x => keys.includes(x)) || d.includes('cloud native') || d.includes('kubernetes') || d.includes('serverless');
    }
  },
  {
    slug: 'self-hosting',
    name: 'Self-Hosting',
    group_name: 'Infrastructure',
    description: 'Sovereign homelab software, personal cloud sync, media streaming, home automation, and private server utilities.',
    icon: 'Home',
    display_order: 29,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['self-hosted', 'homelab', 'selfhosted', 'home-server', 'privacy', 'syncthing', 'nextcloud', 'home-assistant'];
      return t.some(x => keys.includes(x)) || d.includes('self-hosted') || d.includes('self hosted') || d.includes('homelab');
    }
  },
  {
    slug: 'docker-containers',
    name: 'Docker & Containers',
    group_name: 'Infrastructure',
    description: 'Container runtimes, Docker Compose stacks, container registries, rootless containers, and image build accelerators.',
    icon: 'Box',
    display_order: 30,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['docker', 'containers', 'docker-compose', 'podman', 'containerd'];
      return t.some(x => keys.includes(x)) || d.includes('docker') || d.includes('container runtime');
    }
  },
  {
    slug: 'linux-os',
    name: 'Linux & Operating Systems',
    group_name: 'Infrastructure',
    description: 'Linux kernel modules, Unix system utilities, microkernels, systemd extensions, and low-level OS tools.',
    icon: 'HardDrive',
    display_order: 31,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['linux', 'kernel', 'operating-system', 'os', 'unix', 'system-programming'];
      return t.some(x => keys.includes(x)) || d.includes('linux kernel') || d.includes('operating system');
    }
  },
  {
    slug: 'networking',
    name: 'Networking',
    group_name: 'Infrastructure',
    description: 'Reverse proxies, DNS resolvers, VPN mesh protocols, HTTP/3 engines, WebSockets, and packet analysis tools.',
    icon: 'Wifi',
    display_order: 32,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['networking', 'proxy', 'reverse-proxy', 'caddy', 'nginx', 'traefik', 'vpn', 'wireguard', 'dns'];
      return t.some(x => keys.includes(x)) || d.includes('reverse proxy') || d.includes('networking') || d.includes('vpn');
    }
  },

  // --- Specialized ---
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    group_name: 'Specialized',
    description: 'Security auditing tools, vulnerability scanners, cryptography libraries, penetration testing suites, and authentication.',
    icon: 'Shield',
    display_order: 33,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['security', 'cybersecurity', 'cryptography', 'pentesting', 'vulnerability-scanner', 'infosec', 'auth', 'authentication'];
      return t.some(x => keys.includes(x)) || d.includes('security') || d.includes('vulnerability') || d.includes('cryptography') || d.includes('authentication');
    }
  },
  {
    slug: 'data-science',
    name: 'Data Science',
    group_name: 'Specialized',
    description: 'Exploratory data analysis, statistical computing, Jupyter environments, charting engines, and distributed data pipelines.',
    icon: 'BarChart2',
    display_order: 34,
    match: ({ topics, description, language }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['data-science', 'pandas', 'numpy', 'jupyter', 'data-visualization', 'analytics', 'polars', 'spark', 'etl'];
      return t.some(x => keys.includes(x)) || (language === 'Jupyter Notebook') || d.includes('data science') || d.includes('data analysis');
    }
  },
  {
    slug: 'robotics',
    name: 'Robotics',
    group_name: 'Specialized',
    description: 'Robot operating systems, autonomous driving stacks, embedded hardware controllers, kinematics, and simulation testbeds.',
    icon: 'Cpu',
    display_order: 35,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['robotics', 'ros', 'ros2', 'autonomous-vehicles', 'drone', 'ardupilot', 'embedded', 'firmware', 'esp32', 'arduino'];
      return t.some(x => keys.includes(x)) || d.includes('robotics') || d.includes('robot operating system') || d.includes('embedded firmware');
    }
  },
  {
    slug: 'game-development',
    name: 'Game Development',
    group_name: 'Specialized',
    description: 'Game engines, 2D/3D physics engines, asset pipelines, shader libraries, game emulators, and interactive entertainment tooling.',
    icon: 'Gamepad2',
    display_order: 36,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['game-development', 'game-engine', 'gamedev', 'godot', 'unity', 'unreal', 'emulator', 'physics-engine'];
      return t.some(x => keys.includes(x)) || d.includes('game engine') || d.includes('game development') || d.includes('emulator');
    }
  },
  {
    slug: 'programming-languages',
    name: 'Programming Languages',
    group_name: 'Specialized',
    description: 'Language specifications, compiler runtimes, virtual machines, transpilers, grammar parsers, and type system implementations.',
    icon: 'Code',
    display_order: 37,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['programming-language', 'interpreter', 'parser', 'compiler-infrastructure', 'llvm', 'bytecode', 'vm'];
      return t.some(x => keys.includes(x)) || d.includes('programming language') || d.includes('interpreter for') || d.includes('compiler for');
    }
  },
  {
    slug: 'open-source-apps',
    name: 'Open-Source Applications',
    group_name: 'Specialized',
    description: 'Full-featured end-user software, office suites, whiteboards, media creators, and open source consumer platforms.',
    icon: 'AppWindow',
    display_order: 38,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['application', 'desktop-app', 'productivity', 'open-source-software', 'obsidian', 'calcom', 'excalidraw', 'appflowy'];
      return t.some(x => keys.includes(x)) || d.includes('open source alternative to') || d.includes('open-source alternative') || d.includes('desktop application');
    }
  },
  {
    slug: 'productivity-tools',
    name: 'Productivity Tools',
    group_name: 'Specialized',
    description: 'Note taking platforms, calendar schedulers, issue trackers, clipboard managers, and personal knowledge management tools.',
    icon: 'CheckSquare',
    display_order: 39,
    match: ({ topics, description }) => {
      const t = topics.map(x => x.toLowerCase());
      const d = description.toLowerCase();
      const keys = ['productivity', 'notes', 'calendar', 'task-management', 'pkm', 'todo'];
      return t.some(x => keys.includes(x)) || d.includes('productivity') || d.includes('note taking') || d.includes('task manager');
    }
  }
];

export function classifyRepository(meta: {
  topics: string[];
  language: string | null;
  name: string;
  description: string | null;
}): string[] {
  const safeMeta = {
    topics: meta.topics || [],
    language: meta.language,
    name: meta.name || '',
    description: meta.description || ''
  };

  const matchedSlugs: string[] = [];

  for (const cat of CATEGORIES) {
    try {
      if (cat.match(safeMeta)) {
        matchedSlugs.push(cat.slug);
      }
    } catch {
      // ignore
    }
  }

  // If no match found, fallback to Developer Tools or Web Development depending on language
  if (matchedSlugs.length === 0) {
    if (meta.language === 'JavaScript' || meta.language === 'TypeScript') {
      matchedSlugs.push('web-development');
    } else {
      matchedSlugs.push('developer-tools');
    }
  }

  return matchedSlugs;
}
