export interface CuratedRepository {
  id: string;
  name: string;
  owner: string;
  fullName: string;
  description: string;
  stars: number;
  starsDisplay: string;
  language: string;
  category: string;
  categorySlug: string;
  url: string;
}

export interface VaultCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export const CATEGORIES: VaultCategory[] = [
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    slug: 'ai-ml',
    description: 'Foundational machine learning frameworks, neural network libraries, and high-throughput model inference runtimes.',
    count: 5
  },
  {
    id: 'ai-agents',
    name: 'AI Agents',
    slug: 'ai-agents',
    description: 'Autonomous reasoning systems, multi-agent frameworks, cognitive workflows, and Model Context Protocol servers.',
    count: 5
  },
  {
    id: 'react-next',
    name: 'React & Next.js',
    slug: 'react-next',
    description: 'Core web UI libraries, modern React frameworks, state management primitives, and declarative routing solutions.',
    count: 5
  },
  {
    id: 'ui-components',
    name: 'UI Components',
    slug: 'ui-components',
    description: 'Accessible component libraries, unstyled design primitives, and utility-first styling frameworks.',
    count: 5
  },
  {
    id: 'animation-motion',
    name: 'Animation & Motion',
    slug: 'animation-motion',
    description: 'Motion physics, 3D WebGL scenes, shader canvas tools, and micro-interaction frameworks.',
    count: 5
  },
  {
    id: 'web-dev',
    name: 'Web Development',
    slug: 'web-dev',
    description: 'Next-generation build toolchains, alternative reactive component compilers, and high-speed JavaScript runtimes.',
    count: 5
  },
  {
    id: 'backend-apis',
    name: 'Backend & APIs',
    slug: 'backend-apis',
    description: 'Production-ready HTTP frameworks, async REST servers, and microservice architectures across languages.',
    count: 5
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    slug: 'developer-tools',
    description: 'Extensible code editors, ultra-fast project managers, regex search utilities, and customizable prompts.',
    count: 5
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    description: 'Vulnerability scanners, security cheat sheets, network mappers, and penetration testing tooling.',
    count: 5
  },
  {
    id: 'self-hosted',
    name: 'Self-Hosted Projects',
    slug: 'self-hosted',
    description: 'Privacy-first home server apps, media streaming hubs, continuous file synchronization, and open-source alternatives.',
    count: 5
  },
  {
    id: 'mobile-dev',
    name: 'Mobile Development',
    slug: 'mobile-dev',
    description: 'Cross-platform native mobile frameworks, universal runtime toolchains, and mobile data stores.',
    count: 5
  },
  {
    id: 'databases',
    name: 'Databases',
    slug: 'databases',
    description: 'Relational database engines, in-memory caches, column-oriented analytical stores, and next-generation ORMs.',
    count: 5
  }
];

export const REPOSITORIES: CuratedRepository[] = [
  // 1. AI & Machine Learning
  {
    id: 'pytorch',
    name: 'pytorch',
    owner: 'pytorch',
    fullName: 'pytorch/pytorch',
    description: 'Tensors and Dynamic neural networks in Python with strong GPU acceleration, widely used for deep learning research.',
    stars: 89400,
    starsDisplay: '89.4k',
    language: 'Python',
    category: 'AI & Machine Learning',
    categorySlug: 'ai-ml',
    url: 'https://github.com/pytorch/pytorch'
  },
  {
    id: 'tensorflow',
    name: 'tensorflow',
    owner: 'tensorflow',
    fullName: 'tensorflow/tensorflow',
    description: 'An open-source machine learning framework for training and deploying deep learning models across all platforms.',
    stars: 186000,
    starsDisplay: '186k',
    language: 'C++',
    category: 'AI & Machine Learning',
    categorySlug: 'ai-ml',
    url: 'https://github.com/tensorflow/tensorflow'
  },
  {
    id: 'vllm',
    name: 'vllm',
    owner: 'vllm-project',
    fullName: 'vllm-project/vllm',
    description: 'A high-throughput and memory-efficient inference and serving engine for Large Language Models using PagedAttention.',
    stars: 40200,
    starsDisplay: '40.2k',
    language: 'Python',
    category: 'AI & Machine Learning',
    categorySlug: 'ai-ml',
    url: 'https://github.com/vllm-project/vllm'
  },
  {
    id: 'ollama',
    name: 'ollama',
    owner: 'ollama',
    fullName: 'ollama/ollama',
    description: 'Get up and running with Llama 3.3, Mistral, Gemma 2, and other large language models locally on your computer.',
    stars: 115000,
    starsDisplay: '115k',
    language: 'Go',
    category: 'AI & Machine Learning',
    categorySlug: 'ai-ml',
    url: 'https://github.com/ollama/ollama'
  },
  {
    id: 'transformers',
    name: 'transformers',
    owner: 'huggingface',
    fullName: 'huggingface/transformers',
    description: 'State-of-the-art machine learning models for PyTorch, TensorFlow, and JAX with thousands of pretrained model weights.',
    stars: 137000,
    starsDisplay: '137k',
    language: 'Python',
    category: 'AI & Machine Learning',
    categorySlug: 'ai-ml',
    url: 'https://github.com/huggingface/transformers'
  },

  // 2. AI Agents
  {
    id: 'langchain',
    name: 'langchain',
    owner: 'langchain-ai',
    fullName: 'langchain-ai/langchain',
    description: 'Building applications with LLMs through composability and cognitive architectures for autonomous agents.',
    stars: 103000,
    starsDisplay: '103k',
    language: 'Python',
    category: 'AI Agents',
    categorySlug: 'ai-agents',
    url: 'https://github.com/langchain-ai/langchain'
  },
  {
    id: 'crewai',
    name: 'crewAI',
    owner: 'crewAIInc',
    fullName: 'crewAIInc/crewAI',
    description: 'Framework for orchestrating role-playing, autonomous AI agents to collaborate seamlessly and solve complex tasks.',
    stars: 28400,
    starsDisplay: '28.4k',
    language: 'Python',
    category: 'AI Agents',
    categorySlug: 'ai-agents',
    url: 'https://github.com/crewAIInc/crewAI'
  },
  {
    id: 'autogen',
    name: 'autogen',
    owner: 'microsoft',
    fullName: 'microsoft/autogen',
    description: 'A programming framework for agentic AI that enables developers to build multi-agent workflows with human-in-the-loop oversight.',
    stars: 38200,
    starsDisplay: '38.2k',
    language: 'Python',
    category: 'AI Agents',
    categorySlug: 'ai-agents',
    url: 'https://github.com/microsoft/autogen'
  },
  {
    id: 'mcp-servers',
    name: 'servers',
    owner: 'modelcontextprotocol',
    fullName: 'modelcontextprotocol/servers',
    description: 'Official reference implementations for Model Context Protocol (MCP) servers, enabling agents to securely connect to external tools.',
    stars: 12500,
    starsDisplay: '12.5k',
    language: 'TypeScript',
    category: 'AI Agents',
    categorySlug: 'ai-agents',
    url: 'https://github.com/modelcontextprotocol/servers'
  },
  {
    id: 'autogpt',
    name: 'AutoGPT',
    owner: 'Significant-Gravitas',
    fullName: 'Significant-Gravitas/AutoGPT',
    description: 'The pioneering open-source autonomous agent platform for chaining LLM thoughts to execute multi-step objectives.',
    stars: 168000,
    starsDisplay: '168k',
    language: 'Python',
    category: 'AI Agents',
    categorySlug: 'ai-agents',
    url: 'https://github.com/Significant-Gravitas/AutoGPT'
  },

  // 3. React & Next.js
  {
    id: 'react',
    name: 'react',
    owner: 'facebook',
    fullName: 'facebook/react',
    description: 'The JavaScript library for building web and native user interfaces with component-based declarative state.',
    stars: 232000,
    starsDisplay: '232k',
    language: 'JavaScript',
    category: 'React & Next.js',
    categorySlug: 'react-next',
    url: 'https://github.com/facebook/react'
  },
  {
    id: 'nextjs',
    name: 'next.js',
    owner: 'vercel',
    fullName: 'vercel/next.js',
    description: 'The React Framework for the Web featuring server actions, hybrid static & server rendering, and smart bundling.',
    stars: 129000,
    starsDisplay: '129k',
    language: 'JavaScript',
    category: 'React & Next.js',
    categorySlug: 'react-next',
    url: 'https://github.com/vercel/next.js'
  },
  {
    id: 'zustand',
    name: 'zustand',
    owner: 'pmndrs',
    fullName: 'pmndrs/zustand',
    description: 'A small, fast and scalable bearbones state-management solution using simplified flux principles for React.',
    stars: 51200,
    starsDisplay: '51.2k',
    language: 'TypeScript',
    category: 'React & Next.js',
    categorySlug: 'react-next',
    url: 'https://github.com/pmndrs/zustand'
  },
  {
    id: 'tanstack-query',
    name: 'query',
    owner: 'TanStack',
    fullName: 'TanStack/query',
    description: 'Powerful asynchronous state management, server-state utilities and caching for TS/JS, React, Vue, and Svelte.',
    stars: 46100,
    starsDisplay: '46.1k',
    language: 'TypeScript',
    category: 'React & Next.js',
    categorySlug: 'react-next',
    url: 'https://github.com/TanStack/query'
  },
  {
    id: 'react-router',
    name: 'react-router',
    owner: 'remix-run',
    fullName: 'remix-run/react-router',
    description: 'Declarative, client and server-side routing for React web applications with deep nested layout support.',
    stars: 53400,
    starsDisplay: '53.4k',
    language: 'TypeScript',
    category: 'React & Next.js',
    categorySlug: 'react-next',
    url: 'https://github.com/remix-run/react-router'
  },

  // 4. UI Components
  {
    id: 'shadcn-ui',
    name: 'ui',
    owner: 'shadcn-ui',
    fullName: 'shadcn-ui/ui',
    description: 'A set of beautifully designed, accessible components and a code distribution platform built on Tailwind and Radix.',
    stars: 85200,
    starsDisplay: '85.2k',
    language: 'TypeScript',
    category: 'UI Components',
    categorySlug: 'ui-components',
    url: 'https://github.com/shadcn-ui/ui'
  },
  {
    id: 'tailwindcss',
    name: 'tailwindcss',
    owner: 'tailwindlabs',
    fullName: 'tailwindlabs/tailwindcss',
    description: 'A utility-first CSS framework packed with classes that can be composed to build any design directly in your markup.',
    stars: 84100,
    starsDisplay: '84.1k',
    language: 'TypeScript',
    category: 'UI Components',
    categorySlug: 'ui-components',
    url: 'https://github.com/tailwindlabs/tailwindcss'
  },
  {
    id: 'radix-primitives',
    name: 'primitives',
    owner: 'radix-ui',
    fullName: 'radix-ui/primitives',
    description: 'Unstyled, accessible component primitives for high-quality, design system-ready React web apps.',
    stars: 16800,
    starsDisplay: '16.8k',
    language: 'TypeScript',
    category: 'UI Components',
    categorySlug: 'ui-components',
    url: 'https://github.com/radix-ui/primitives'
  },
  {
    id: 'ant-design',
    name: 'ant-design',
    owner: 'ant-design',
    fullName: 'ant-design/ant-design',
    description: 'An enterprise-class UI design language and comprehensive React UI component library with internationalization.',
    stars: 93400,
    starsDisplay: '93.4k',
    language: 'TypeScript',
    category: 'UI Components',
    categorySlug: 'ui-components',
    url: 'https://github.com/ant-design/ant-design'
  },
  {
    id: 'material-ui',
    name: 'material-ui',
    owner: 'mui',
    fullName: 'mui/material-ui',
    description: 'Ready-to-use foundational React components implementing Google Material Design principles.',
    stars: 95300,
    starsDisplay: '95.3k',
    language: 'TypeScript',
    category: 'UI Components',
    categorySlug: 'ui-components',
    url: 'https://github.com/mui/material-ui'
  },

  // 5. Animation & Motion
  {
    id: 'motion',
    name: 'motion',
    owner: 'motiondivision',
    fullName: 'motiondivision/motion',
    description: 'A modern, production-ready animation library for JavaScript and React with spring physics and gesture support.',
    stars: 29500,
    starsDisplay: '29.5k',
    language: 'TypeScript',
    category: 'Animation & Motion',
    categorySlug: 'animation-motion',
    url: 'https://github.com/motiondivision/motion'
  },
  {
    id: 'gsap',
    name: 'GSAP',
    owner: 'greensock',
    fullName: 'greensock/GSAP',
    description: 'Professional-grade JavaScript animation engine for high-performance canvas, SVG, and DOM choreography.',
    stars: 19400,
    starsDisplay: '19.4k',
    language: 'JavaScript',
    category: 'Animation & Motion',
    categorySlug: 'animation-motion',
    url: 'https://github.com/greensock/GSAP'
  },
  {
    id: 'threejs',
    name: 'three.js',
    owner: 'mrdoob',
    fullName: 'mrdoob/three.js',
    description: 'JavaScript 3D library utilizing WebGL and WebGPU to render interactive 3D graphics in modern web browsers.',
    stars: 104000,
    starsDisplay: '104k',
    language: 'JavaScript',
    category: 'Animation & Motion',
    categorySlug: 'animation-motion',
    url: 'https://github.com/mrdoob/three.js'
  },
  {
    id: 'lottie-web',
    name: 'lottie-web',
    owner: 'airbnb',
    fullName: 'airbnb/lottie-web',
    description: 'Render Adobe After Effects animations natively on the Web, exporting vector animations as lightweight JSON.',
    stars: 29800,
    starsDisplay: '29.8k',
    language: 'JavaScript',
    category: 'Animation & Motion',
    categorySlug: 'animation-motion',
    url: 'https://github.com/airbnb/lottie-web'
  },
  {
    id: 'react-three-fiber',
    name: 'react-three-fiber',
    owner: 'pmndrs',
    fullName: 'pmndrs/react-three-fiber',
    description: 'A powerful React renderer for Three.js that brings declarative JSX components into 3D scenes.',
    stars: 27100,
    starsDisplay: '27.1k',
    language: 'TypeScript',
    category: 'Animation & Motion',
    categorySlug: 'animation-motion',
    url: 'https://github.com/pmndrs/react-three-fiber'
  },

  // 6. Web Development
  {
    id: 'vite',
    name: 'vite',
    owner: 'vitejs',
    fullName: 'vitejs/vite',
    description: 'Next generation frontend tooling with instant server start and lightning fast Hot Module Replacement.',
    stars: 72400,
    starsDisplay: '72.4k',
    language: 'TypeScript',
    category: 'Web Development',
    categorySlug: 'web-dev',
    url: 'https://github.com/vitejs/vite'
  },
  {
    id: 'vue',
    name: 'core',
    owner: 'vuejs',
    fullName: 'vuejs/core',
    description: 'Vue.js is a progressive, approachable, and performant framework for building reactive web interfaces.',
    stars: 49200,
    starsDisplay: '49.2k',
    language: 'TypeScript',
    category: 'Web Development',
    categorySlug: 'web-dev',
    url: 'https://github.com/vuejs/core'
  },
  {
    id: 'svelte',
    name: 'svelte',
    owner: 'sveltejs',
    fullName: 'sveltejs/svelte',
    description: 'Cybernetically enhanced web apps. The compiler that turns declarative UI code into surgical vanilla JavaScript.',
    stars: 80100,
    starsDisplay: '80.1k',
    language: 'TypeScript',
    category: 'Web Development',
    categorySlug: 'web-dev',
    url: 'https://github.com/sveltejs/svelte'
  },
  {
    id: 'deno',
    name: 'deno',
    owner: 'denoland',
    fullName: 'denoland/deno',
    description: 'A modern and secure runtime for JavaScript and TypeScript with built-in battery-included developer tooling.',
    stars: 96500,
    starsDisplay: '96.5k',
    language: 'Rust',
    category: 'Web Development',
    categorySlug: 'web-dev',
    url: 'https://github.com/denoland/deno'
  },
  {
    id: 'bun',
    name: 'bun',
    owner: 'oven-sh',
    fullName: 'oven-sh/bun',
    description: 'Incredibly fast all-in-one JavaScript runtime, package manager, test runner, and bundler written in Zig.',
    stars: 76800,
    starsDisplay: '76.8k',
    language: 'Zig',
    category: 'Web Development',
    categorySlug: 'web-dev',
    url: 'https://github.com/oven-sh/bun'
  },

  // 7. Backend & APIs
  {
    id: 'fastapi',
    name: 'fastapi',
    owner: 'fastapi',
    fullName: 'fastapi/fastapi',
    description: 'Modern, fast (high-performance) web framework for building APIs with Python based on standard Python type hints.',
    stars: 80200,
    starsDisplay: '80.2k',
    language: 'Python',
    category: 'Backend & APIs',
    categorySlug: 'backend-apis',
    url: 'https://github.com/fastapi/fastapi'
  },
  {
    id: 'express',
    name: 'express',
    owner: 'expressjs',
    fullName: 'expressjs/express',
    description: 'Fast, unopinionated, minimalist web framework for Node.js powering millions of backend services.',
    stars: 66200,
    starsDisplay: '66.2k',
    language: 'JavaScript',
    category: 'Backend & APIs',
    categorySlug: 'backend-apis',
    url: 'https://github.com/expressjs/express'
  },
  {
    id: 'nest',
    name: 'nest',
    owner: 'nestjs',
    fullName: 'nestjs/nest',
    description: 'A progressive Node.js framework for building efficient, reliable and scalable enterprise server-side applications.',
    stars: 68100,
    starsDisplay: '68.1k',
    language: 'TypeScript',
    category: 'Backend & APIs',
    categorySlug: 'backend-apis',
    url: 'https://github.com/nestjs/nest'
  },
  {
    id: 'gin',
    name: 'gin',
    owner: 'gin-gonic',
    fullName: 'gin-gonic/gin',
    description: 'Gin is a high-performance HTTP web framework written in Go featuring a Martini-like API and fast radixed routing.',
    stars: 79400,
    starsDisplay: '79.4k',
    language: 'Go',
    category: 'Backend & APIs',
    categorySlug: 'backend-apis',
    url: 'https://github.com/gin-gonic/gin'
  },
  {
    id: 'actix-web',
    name: 'actix-web',
    owner: 'actix',
    fullName: 'actix/actix-web',
    description: 'Actix Web is a powerful, pragmatic, and blazingly fast asynchronous web framework for the Rust ecosystem.',
    stars: 21800,
    starsDisplay: '21.8k',
    language: 'Rust',
    category: 'Backend & APIs',
    categorySlug: 'backend-apis',
    url: 'https://github.com/actix/actix-web'
  },

  // 8. Developer Tools
  {
    id: 'vscode',
    name: 'vscode',
    owner: 'microsoft',
    fullName: 'microsoft/vscode',
    description: 'Visual Studio Code is a redefined code editor optimized for modern web and cloud app development.',
    stars: 168000,
    starsDisplay: '168k',
    language: 'TypeScript',
    category: 'Developer Tools',
    categorySlug: 'developer-tools',
    url: 'https://github.com/microsoft/vscode'
  },
  {
    id: 'neovim',
    name: 'neovim',
    owner: 'neovim',
    fullName: 'neovim/neovim',
    description: 'Vim-fork focused on extensibility, Lua configuration, and modern terminal UI engineering.',
    stars: 86200,
    starsDisplay: '86.2k',
    language: 'C',
    category: 'Developer Tools',
    categorySlug: 'developer-tools',
    url: 'https://github.com/neovim/neovim'
  },
  {
    id: 'uv',
    name: 'uv',
    owner: 'astral-sh',
    fullName: 'astral-sh/uv',
    description: 'An extremely fast Python package and project manager, written in Rust as a drop-in pip and pip-tools replacement.',
    stars: 44100,
    starsDisplay: '44.1k',
    language: 'Rust',
    category: 'Developer Tools',
    categorySlug: 'developer-tools',
    url: 'https://github.com/astral-sh/uv'
  },
  {
    id: 'ripgrep',
    name: 'ripgrep',
    owner: 'BurntSushi',
    fullName: 'BurntSushi/ripgrep',
    description: 'ripgrep recursively searches directories for a regex pattern while respecting gitignore rules at blazingly fast speeds.',
    stars: 51200,
    starsDisplay: '51.2k',
    language: 'Rust',
    category: 'Developer Tools',
    categorySlug: 'developer-tools',
    url: 'https://github.com/BurntSushi/ripgrep'
  },
  {
    id: 'starship',
    name: 'starship',
    owner: 'starship',
    fullName: 'starship/starship',
    description: 'The minimal, blazing-fast, and infinitely customizable cross-shell prompt written in Rust.',
    stars: 47300,
    starsDisplay: '47.3k',
    language: 'Rust',
    category: 'Developer Tools',
    categorySlug: 'developer-tools',
    url: 'https://github.com/starship/starship'
  },

  // 9. Cybersecurity
  {
    id: 'owasp-cheatsheet',
    name: 'CheatSheetSeries',
    owner: 'OWASP',
    fullName: 'OWASP/CheatSheetSeries',
    description: 'The OWASP Cheat Sheet Series provides developers with concise, high-value guidance on application security practices.',
    stars: 33100,
    starsDisplay: '33.1k',
    language: 'Python',
    category: 'Cybersecurity',
    categorySlug: 'cybersecurity',
    url: 'https://github.com/OWASP/CheatSheetSeries'
  },
  {
    id: 'seclists',
    name: 'SecLists',
    owner: 'danielmiessler',
    fullName: 'danielmiessler/SecLists',
    description: 'SecLists is the security tester companion collection of usernames, passwords, URLs, sensitive data patterns, and payloads.',
    stars: 59400,
    starsDisplay: '59.4k',
    language: 'Shell',
    category: 'Cybersecurity',
    categorySlug: 'cybersecurity',
    url: 'https://github.com/danielmiessler/SecLists'
  },
  {
    id: 'nuclei',
    name: 'nuclei',
    owner: 'projectdiscovery',
    fullName: 'projectdiscovery/nuclei',
    description: 'Fast and customizable vulnerability scanner based on simple YAML-based Domain Specific Language templates.',
    stars: 20400,
    starsDisplay: '20.4k',
    language: 'Go',
    category: 'Cybersecurity',
    categorySlug: 'cybersecurity',
    url: 'https://github.com/projectdiscovery/nuclei'
  },
  {
    id: 'sqlmap',
    name: 'sqlmap',
    owner: 'sqlmapproject',
    fullName: 'sqlmapproject/sqlmap',
    description: 'Automatic SQL injection and database takeover tool with powerful detection engine and target fingerprinting.',
    stars: 33800,
    starsDisplay: '33.8k',
    language: 'Python',
    category: 'Cybersecurity',
    categorySlug: 'cybersecurity',
    url: 'https://github.com/sqlmapproject/sqlmap'
  },
  {
    id: 'nmap',
    name: 'nmap',
    owner: 'nmap',
    fullName: 'nmap/nmap',
    description: 'Nmap - the Network Mapper. Free and open source utility for network discovery, port auditing, and host administration.',
    stars: 10400,
    starsDisplay: '10.4k',
    language: 'C',
    category: 'Cybersecurity',
    categorySlug: 'cybersecurity',
    url: 'https://github.com/nmap/nmap'
  },

  // 10. Self-Hosted Projects
  {
    id: 'home-assistant',
    name: 'core',
    owner: 'home-assistant',
    fullName: 'home-assistant/core',
    description: 'Open source home automation that puts local control and privacy first, integrating tens of thousands of IoT devices.',
    stars: 75200,
    starsDisplay: '75.2k',
    language: 'Python',
    category: 'Self-Hosted Projects',
    categorySlug: 'self-hosted',
    url: 'https://github.com/home-assistant/core'
  },
  {
    id: 'syncthing',
    name: 'syncthing',
    owner: 'syncthing',
    fullName: 'syncthing/syncthing',
    description: 'Open Source Continuous File Synchronization tool replacing proprietary cloud synchronization services.',
    stars: 67300,
    starsDisplay: '67.3k',
    language: 'Go',
    category: 'Self-Hosted Projects',
    categorySlug: 'self-hosted',
    url: 'https://github.com/syncthing/syncthing'
  },
  {
    id: 'n8n',
    name: 'n8n',
    owner: 'n8n-io',
    fullName: 'n8n-io/n8n',
    description: 'Fair-code workflow automation platform with native AI agent orchestration and hundreds of third-party nodes.',
    stars: 59100,
    starsDisplay: '59.1k',
    language: 'TypeScript',
    category: 'Self-Hosted Projects',
    categorySlug: 'self-hosted',
    url: 'https://github.com/n8n-io/n8n'
  },
  {
    id: 'jellyfin',
    name: 'jellyfin',
    owner: 'jellyfin',
    fullName: 'jellyfin/jellyfin',
    description: 'The volunteer-built Free Software Media System for streaming personal movies, shows, music, and live television.',
    stars: 37200,
    starsDisplay: '37.2k',
    language: 'C#',
    category: 'Self-Hosted Projects',
    categorySlug: 'self-hosted',
    url: 'https://github.com/jellyfin/jellyfin'
  },
  {
    id: 'calcom',
    name: 'cal.com',
    owner: 'calcom',
    fullName: 'calcom/cal.com',
    description: 'Scheduling infrastructure for everyone. Open source Calendly alternative that you can easily self-host.',
    stars: 35400,
    starsDisplay: '35.4k',
    language: 'TypeScript',
    category: 'Self-Hosted Projects',
    categorySlug: 'self-hosted',
    url: 'https://github.com/calcom/cal.com'
  },

  // 11. Mobile Development
  {
    id: 'flutter',
    name: 'flutter',
    owner: 'flutter',
    fullName: 'flutter/flutter',
    description: 'Flutter makes it easy and fast to build beautiful apps for mobile (iOS, Android), desktop, and web from a single codebase.',
    stars: 166000,
    starsDisplay: '166k',
    language: 'Dart',
    category: 'Mobile Development',
    categorySlug: 'mobile-dev',
    url: 'https://github.com/flutter/flutter'
  },
  {
    id: 'react-native',
    name: 'react-native',
    owner: 'facebook',
    fullName: 'facebook/react-native',
    description: 'A framework for building native applications for iOS and Android using React and declarative primitives.',
    stars: 119000,
    starsDisplay: '119k',
    language: 'JavaScript',
    category: 'Mobile Development',
    categorySlug: 'mobile-dev',
    url: 'https://github.com/facebook/react-native'
  },
  {
    id: 'ionic',
    name: 'ionic-framework',
    owner: 'ionic-team',
    fullName: 'ionic-team/ionic-framework',
    description: 'A powerful cross-platform UI toolkit for building native web applications with HTML, CSS, and modern JS frameworks.',
    stars: 51000,
    starsDisplay: '51k',
    language: 'TypeScript',
    category: 'Mobile Development',
    categorySlug: 'mobile-dev',
    url: 'https://github.com/ionic-team/ionic-framework'
  },
  {
    id: 'expo',
    name: 'expo',
    owner: 'expo',
    fullName: 'expo/expo',
    description: 'An open-source framework for apps that run natively on Android, iOS, and the web, using React Native tooling.',
    stars: 34200,
    starsDisplay: '34.2k',
    language: 'TypeScript',
    category: 'Mobile Development',
    categorySlug: 'mobile-dev',
    url: 'https://github.com/expo/expo'
  },
  {
    id: 'realm-swift',
    name: 'realm-swift',
    owner: 'realm',
    fullName: 'realm/realm-swift',
    description: 'A fast, reactive mobile database designed for iOS and macOS, offering a clean object-oriented replacement for SQLite.',
    stars: 16200,
    starsDisplay: '16.2k',
    language: 'Swift',
    category: 'Mobile Development',
    categorySlug: 'mobile-dev',
    url: 'https://github.com/realm/realm-swift'
  },

  // 12. Databases
  {
    id: 'supabase',
    name: 'supabase',
    owner: 'supabase',
    fullName: 'supabase/supabase',
    description: 'The open source Firebase alternative with Postgres, Authentication, Instant APIs, Realtime subscriptions, and Storage.',
    stars: 76100,
    starsDisplay: '76.1k',
    language: 'TypeScript',
    category: 'Databases',
    categorySlug: 'databases',
    url: 'https://github.com/supabase/supabase'
  },
  {
    id: 'redis',
    name: 'redis',
    owner: 'redis',
    fullName: 'redis/redis',
    description: 'Redis is an in-memory database that persists on disk, commonly used as a cache, message broker, and streaming engine.',
    stars: 67100,
    starsDisplay: '67.1k',
    language: 'C',
    category: 'Databases',
    categorySlug: 'databases',
    url: 'https://github.com/redis/redis'
  },
  {
    id: 'postgres',
    name: 'postgres',
    owner: 'postgres',
    fullName: 'postgres/postgres',
    description: 'The official mirror of the PostgreSQL relational database system, known for reliability, robust SQL, and extensibility.',
    stars: 16400,
    starsDisplay: '16.4k',
    language: 'C',
    category: 'Databases',
    categorySlug: 'databases',
    url: 'https://github.com/postgres/postgres'
  },
  {
    id: 'clickhouse',
    name: 'clickhouse',
    owner: 'clickhouse',
    fullName: 'clickhouse/clickhouse',
    description: 'ClickHouse is a fast, open-source column-oriented database management system for real-time analytical reporting.',
    stars: 38400,
    starsDisplay: '38.4k',
    language: 'C++',
    category: 'Databases',
    categorySlug: 'databases',
    url: 'https://github.com/clickhouse/clickhouse'
  },
  {
    id: 'prisma',
    name: 'prisma',
    owner: 'prisma',
    fullName: 'prisma/prisma',
    description: 'Next-generation ORM for Node.js & TypeScript with type safety, automated migrations, and intuitive database querying.',
    stars: 40500,
    starsDisplay: '40.5k',
    language: 'TypeScript',
    category: 'Databases',
    categorySlug: 'databases',
    url: 'https://github.com/prisma/prisma'
  }
];
