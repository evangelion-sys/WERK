import type { CategoryInfo } from '../types/repository.js';

export const CATEGORIES: CategoryInfo[] = [
  // Artificial Intelligence
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    slug: 'ai-machine-learning',
    group: 'Artificial Intelligence',
    description: 'Foundational neural network frameworks, deep learning research toolkits, and machine intelligence runtimes.'
  },
  {
    id: 'llm',
    name: 'Large Language Models',
    slug: 'large-language-models',
    group: 'Artificial Intelligence',
    description: 'Pre-trained foundation models, local weight runners, tokenizer utilities, and transformer architectures.'
  },
  {
    id: 'ai-agents',
    name: 'AI Agents',
    slug: 'ai-agents',
    group: 'Artificial Intelligence',
    description: 'Autonomous multi-agent orchestration, cognitive reasoning loops, Model Context Protocol servers, and tool calling.'
  },
  {
    id: 'rag-knowledge',
    name: 'RAG & Knowledge Systems',
    slug: 'rag-knowledge-systems',
    group: 'Artificial Intelligence',
    description: 'Retrieval-augmented generation pipelines, vector indexing, dense semantic search, and knowledge graph stores.'
  },
  {
    id: 'generative-ai',
    name: 'Generative AI',
    slug: 'generative-ai',
    group: 'Artificial Intelligence',
    description: 'Diffusion pipelines, text-to-image synthesis, neural audio generation, and multimodal creative algorithms.'
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision',
    slug: 'computer-vision',
    group: 'Artificial Intelligence',
    description: 'Real-time object detection, segmentation models, OCR systems, and geometric image processing.'
  },
  {
    id: 'ai-infrastructure',
    name: 'AI Infrastructure',
    slug: 'ai-infrastructure',
    group: 'Artificial Intelligence',
    description: 'High-throughput LLM inference engines, GPU memory managers, quantizers, and hardware acceleration libraries.'
  },

  // Frontend Development
  {
    id: 'react',
    name: 'React',
    slug: 'react',
    group: 'Frontend Development',
    description: 'Declarative component primitives, reactive state hooks, compiler optimizations, and core ecosystem tooling.'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    slug: 'nextjs',
    group: 'Frontend Development',
    description: 'Full-stack React web framework with server components, hybrid edge rendering, and optimized asset pipelines.'
  },
  {
    id: 'vue',
    name: 'Vue',
    slug: 'vue',
    group: 'Frontend Development',
    description: 'Progressive JavaScript framework with reactive reactivity system, template syntax, and intuitive ergonomics.'
  },
  {
    id: 'nuxt',
    name: 'Nuxt',
    slug: 'nuxt',
    group: 'Frontend Development',
    description: 'Intuitive Vue framework for production SSR, static site generation, and file-system automated routing.'
  },
  {
    id: 'svelte',
    name: 'Svelte',
    slug: 'svelte',
    group: 'Frontend Development',
    description: 'Cybernetically enhanced web framework that compiles reactive state down to zero-overhead imperative code.'
  },
  {
    id: 'web-dev',
    name: 'Web Development',
    slug: 'web-development',
    group: 'Frontend Development',
    description: 'Next-gen bundlers, modern JS/TS runtimes, web standards implementations, and browser-first development tools.'
  },
  {
    id: 'css-styling',
    name: 'CSS & Styling',
    slug: 'css-styling',
    group: 'Frontend Development',
    description: 'Utility-first CSS engines, modern CSS compilers, headless design primitives, and atomic stylesheets.'
  },
  {
    id: 'ui-components',
    name: 'UI Component Libraries',
    slug: 'ui-component-libraries',
    group: 'Frontend Development',
    description: 'Production-ready UI systems, accessible primitives, unstyled components, and polished widget toolkits.'
  },
  {
    id: 'design-systems',
    name: 'Design Systems',
    slug: 'design-systems',
    group: 'Frontend Development',
    description: 'Design token frameworks, multi-brand pattern libraries, Figma integrations, and consistent UI architectures.'
  },
  {
    id: 'animation-motion',
    name: 'Animation & Motion',
    slug: 'animation-motion',
    group: 'Frontend Development',
    description: 'Physics-based spring engines, smooth timeline animations, micro-interaction libraries, and motion primitives.'
  },
  {
    id: 'webgl-shaders',
    name: 'WebGL & Shaders',
    slug: 'webgl-shaders',
    group: 'Frontend Development',
    description: 'Hardware-accelerated 3D rendering engines, GLSL shaders, canvas physics, and WebGPU graphics.'
  },

  // Backend & Engineering
  {
    id: 'backend-frameworks',
    name: 'Backend Frameworks',
    slug: 'backend-frameworks',
    group: 'Backend & Engineering',
    description: 'High-concurrency web server frameworks, async HTTP engines, and microservices architectures.'
  },
  {
    id: 'apis-integrations',
    name: 'APIs & Integrations',
    slug: 'apis-integrations',
    group: 'Backend & Engineering',
    description: 'RESTful API toolkits, GraphQL servers, gRPC protocols, API gateways, and webhooks management.'
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    slug: 'developer-tools',
    group: 'Backend & Engineering',
    description: 'Code editors, static linters, deterministic formatters, testing suites, and git workflow enhancements.'
  },
  {
    id: 'cli-terminal',
    name: 'CLI & Terminal',
    slug: 'cli-terminal',
    group: 'Backend & Engineering',
    description: 'Modern shell environments, interactive terminal user interfaces (TUI), prompt customizers, and CLI binaries.'
  },
  {
    id: 'programming-languages',
    name: 'Programming Languages',
    slug: 'programming-languages',
    group: 'Backend & Engineering',
    description: 'Production compilers, virtual machines, bytecode interpreters, and novel programming language implementations.'
  },
  {
    id: 'databases',
    name: 'Databases',
    slug: 'databases',
    group: 'Backend & Engineering',
    description: 'Relational engines, in-memory caches, column-oriented analytical stores, vector search engines, and modern ORMs.'
  },
  {
    id: 'data-engineering',
    name: 'Data Engineering',
    slug: 'data-engineering',
    group: 'Backend & Engineering',
    description: 'Distributed event streaming, ETL orchestrators, lakehouse platforms, and batch data processing engines.'
  },

  // Infrastructure
  {
    id: 'devops',
    name: 'DevOps',
    slug: 'devops',
    group: 'Infrastructure',
    description: 'Continuous integration pipelines, deployment automation, declarative GitOps workflows, and release tools.'
  },
  {
    id: 'cloud-infrastructure',
    name: 'Cloud Infrastructure',
    slug: 'cloud-infrastructure',
    group: 'Infrastructure',
    description: 'Infrastructure-as-code providers, cloud-native control planes, serverless platforms, and cluster management.'
  },
  {
    id: 'docker-containers',
    name: 'Docker & Containers',
    slug: 'docker-containers',
    group: 'Infrastructure',
    description: 'OCI container runtimes, Kubernetes tooling, lightweight sandbox microVMs, and container cluster managers.'
  },
  {
    id: 'linux',
    name: 'Linux',
    slug: 'linux',
    group: 'Infrastructure',
    description: 'Linux kernel subsystems, distribution management, system administration utilities, and userland tools.'
  },
  {
    id: 'self-hosting',
    name: 'Self-Hosting',
    slug: 'self-hosting',
    group: 'Infrastructure',
    description: 'Privacy-first personal cloud services, home automation hubs, media servers, and self-hosted office suites.'
  },
  {
    id: 'networking',
    name: 'Networking',
    slug: 'networking',
    group: 'Infrastructure',
    description: 'High-speed reverse proxies, wireguard VPNs, zero-trust tunnels, DNS servers, and network diagnostic tools.'
  },
  {
    id: 'operating-systems',
    name: 'Operating Systems',
    slug: 'operating-systems',
    group: 'Infrastructure',
    description: 'Microkernels, hobbyist operating systems, bootloaders, emulator systems, and low-level firmware.'
  },

  // Specialized
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    group: 'Specialized',
    description: 'Vulnerability scanners, penetration testing platforms, automated security auditing tools, and cryptographic primitives.'
  },
  {
    id: 'mobile-dev',
    name: 'Mobile Development',
    slug: 'mobile-development',
    group: 'Specialized',
    description: 'Cross-platform mobile toolkits, native Android & iOS engines, offline databases, and mobile UI kits.'
  },
  {
    id: 'react-native',
    name: 'React Native',
    slug: 'react-native',
    group: 'Specialized',
    description: 'Universal native application development with React, Expo toolchains, and mobile performance runtimes.'
  },
  {
    id: 'game-dev',
    name: 'Game Development',
    slug: 'game-development',
    group: 'Specialized',
    description: 'Open-source game engines, physics simulations, 2D/3D asset pipelines, and console emulation.'
  },
  {
    id: 'robotics',
    name: 'Robotics',
    slug: 'robotics',
    group: 'Specialized',
    description: 'Robot Operating System packages, drone flight controllers, embedded firmware, and microcontroller libraries.'
  },
  {
    id: 'data-science',
    name: 'Data Science',
    slug: 'data-science',
    group: 'Specialized',
    description: 'Jupyter ecosystems, scientific computing matrices, statistical models, and exploratory analytical workbenches.'
  },
  {
    id: 'open-source-apps',
    name: 'Open-Source Applications',
    slug: 'open-source-applications',
    group: 'Specialized',
    description: 'Full-featured desktop apps, creative software, audio/video editors, and open-source commercial alternatives.'
  },
  {
    id: 'productivity-tools',
    name: 'Productivity Tools',
    slug: 'productivity-tools',
    group: 'Specialized',
    description: 'Local-first note taking, markdown wikis, task managers, second brain architectures, and automation scripts.'
  }
];

export const CATEGORY_GROUPS = [
  'Artificial Intelligence',
  'Frontend Development',
  'Backend & Engineering',
  'Infrastructure',
  'Specialized'
] as const;
