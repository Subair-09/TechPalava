
import React from 'react';
import { Category, NewsItem, JobItem, TechEvent, AnalysisItem, Contributor } from './types';

export const CATEGORIES: Category[] = [
  { 
    name: 'General News', 
    slug: 'general', 
    color: 'from-blue-600/20 to-blue-400/20',
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM7 8h5-5 4h5m-5 4h10" /></svg>
  },
  { 
    name: 'Startups', 
    slug: 'startups', 
    color: 'from-emerald-600/20 to-emerald-400/20',
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  },
  { 
    name: 'AI & ML', 
    slug: 'ai', 
    color: 'from-purple-600/20 to-purple-400/20',
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
  },
  { 
    name: 'Fintech', 
    slug: 'fintech', 
    color: 'from-orange-600/20 to-orange-400/20',
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  },
  { 
    name: 'Policy', 
    slug: 'policy', 
    color: 'from-red-600/20 to-red-400/20',
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  },
  { 
    name: 'Crypto', 
    slug: 'crypto', 
    color: 'from-amber-600/20 to-amber-400/20',
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3m0 18a10.003 10.003 0 01-8.128-14.154M15 7l3 3m0 0l-3 3m3-3H9" /></svg>
  },
];

export const NAV_LINKS = [
  { name: 'News', href: '#news' },
  { name: 'Jobs', href: '#jobs' },
  { name: 'Events', href: '#events' },
  { name: 'Analysis', href: '#analysis' },
  { name: 'Advertise', href: '#advertise' },
];

export const SAMPLE_NEWS: NewsItem[] = [
  {
    id: '1',
    title: "The Silent Rise of Sovereign AI in Emerging Markets",
    excerpt: "Nations across the Global South are increasingly building their own localized LLMs to preserve linguistic heritage and ensure data sovereignty. Is this the end of Silicon Valley's monopoly on intelligence?",
    category: 'AI & ML',
    author: 'Elena Rodriguez',
    date: 'Oct 24, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop',
    readTime: '8 min read'
  },
  {
    id: '2',
    title: "Fintech 3.0: Beyond Digital Wallets",
    excerpt: "A new wave of startups is moving past simple payments to offer embedded credit, agricultural insurance, and cross-border trade finance for the unbanked millions.",
    category: 'Fintech',
    author: 'Kwame Mensah',
    date: 'Oct 22, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    readTime: '6 min read'
  },
  {
    id: '3',
    title: "Why Venture Capital is Cooling on Consumer Apps",
    excerpt: "Investors are shifting focus from social networks to 'Hard Tech'—energy, semiconductors, and robotics. We analyze what this pivot means for the next generation of founders.",
    category: 'Startups',
    author: 'Sarah Chen',
    date: 'Oct 20, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1200&auto=format&fit=crop',
    readTime: '10 min read'
  },
  {
    id: '4',
    title: "Regulation vs. Innovation: The EU AI Act Challenge",
    excerpt: "Six months in, European startups are grappling with the complexities of the new AI Act. Is the continent trading competitiveness for safety?",
    category: 'Policy',
    author: 'Marcus Weber',
    date: 'Oct 18, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1200&auto=format&fit=crop',
    readTime: '12 min read'
  },
  {
    id: '5',
    title: "Crypto's Institutional Era Begins",
    excerpt: "With the arrival of spot ETFs, Bitcoin and Ethereum have moved from the fringe to the foundation of modern portfolios. What's next for the decentralization dream?",
    category: 'Crypto',
    author: 'Aisha Bello',
    date: 'Oct 15, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200&auto=format&fit=crop',
    readTime: '7 min read'
  },
  {
    id: '6',
    title: "The Silicon Prairie: Tech's Midwestern Boom",
    excerpt: "As living costs in coastal hubs soar, a new generation of engineering talent is flocking to the American Midwest. Meet the cities leading the charge.",
    category: 'General News',
    author: 'David Thompson',
    date: 'Oct 12, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1449154117394-0207e2133751?q=80&w=1200&auto=format&fit=crop',
    readTime: '9 min read'
  }
];

export const SAMPLE_JOBS: JobItem[] = [
  {
    id: 'j1',
    role: 'Senior Rust Engineer',
    company: 'Solana Labs',
    location: 'Remote (Global)',
    salary: '$180k – $250k',
    type: 'Remote',
    logoUrl: 'https://cryptologos.cc/logos/solana-sol-logo.png'
  },
  {
    id: 'j2',
    role: 'Staff Product Manager, Payments',
    company: 'Stripe',
    location: 'Dublin, Ireland',
    salary: '€140k – €190k',
    type: 'Full-time',
    logoUrl: 'https://images.ctfassets.net/fzn2n1nzq965/33u3m9YvS9M44m4u3m9YvS/9c9c8a8c9c9c9c9c9c9c9c9c9c9c9c9c/stripe-logo.png'
  },
  {
    id: 'j3',
    role: 'AI Research Scientist',
    company: 'Mistral AI',
    location: 'Paris, France',
    salary: '€120k – €180k',
    type: 'Full-time',
    logoUrl: 'https://mistral.ai/images/logo_mistral_ai.png'
  },
  {
    id: 'j4',
    role: 'Founding Engineer (Mobile)',
    company: 'Stealth Startup',
    location: 'Lagos, Nigeria',
    salary: '$80k – $120k + Equity',
    type: 'Full-time',
    logoUrl: 'https://picsum.photos/seed/stealth/200/200'
  }
];

export const SAMPLE_EVENTS: TechEvent[] = [
  {
    id: 'e1',
    title: 'Global Tech Summit 2025',
    description: 'The premier gathering of innovators, investors, and engineers from across the African tech ecosystem.',
    date: 'November 15, 2025',
    location: 'Lagos, Nigeria',
    type: 'Conference',
    isVirtual: false,
    imageUrl: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=1200&auto=format&fit=crop',
    link: '#'
  },
  {
    id: 'e2',
    title: 'Fintech Founders Night',
    description: 'An exclusive networking evening for founders scaling payment solutions in emerging markets.',
    date: 'October 30, 2024',
    location: 'Nairobi, Kenya',
    type: 'Meetup',
    isVirtual: false,
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
    link: '#'
  },
  {
    id: 'e3',
    title: 'AI Ethics & Governance Workshop',
    description: 'A deep dive into the regulatory landscape of artificial intelligence for African startups.',
    date: 'November 05, 2024',
    location: 'Virtual',
    type: 'Workshop',
    isVirtual: true,
    imageUrl: 'https://images.unsplash.com/photo-1591115765373-520b7a3d72d4?q=80&w=1200&auto=format&fit=crop',
    link: '#'
  },
  {
    id: 'e4',
    title: 'Code4Africa Hackathon',
    description: '48 hours of building open-source solutions for continental challenges.',
    date: 'December 12, 2024',
    location: 'Johannesburg, SA',
    type: 'Hackathon',
    isVirtual: false,
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop',
    link: '#'
  }
];

export const SAMPLE_ANALYSIS: AnalysisItem[] = [
  {
    id: 'a1',
    title: "The Fragmentation of African Fintech: A Case for Regional Interoperability",
    summary: "As digital payments explode across the continent, the lack of seamless cross-border rails remains the biggest bottleneck. We examine the regulatory and technical hurdles to a unified African payment market.",
    category: "Fintech",
    author: "Dr. Amara Okafor",
    authorRole: "Senior Tech Economist",
    authorImage: "https://i.pravatar.cc/150?u=amara",
    date: "October 28, 2024",
    readTime: "12 min read",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop",
    tags: ["Fintech", "Policy", "Infrastructure"]
  },
  {
    id: 'a2',
    title: "Generative AI in Africa: From Consumer Curiosity to Enterprise Reality",
    summary: "While global headlines focus on LLM benchmarks, African enterprises are quietly deploying AI for agricultural yields, credit scoring, and customer service. Here is the state of adoption.",
    category: "AI & ML",
    author: "Samuel Vance",
    authorRole: "AI Strategy Consultant",
    authorImage: "https://i.pravatar.cc/150?u=samuel",
    date: "October 25, 2024",
    readTime: "10 min read",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    tags: ["AI", "Enterprise", "Innovation"]
  },
  {
    id: 'a3',
    title: "The Next Decade of Connectivity: Satellite Internet and the Rural Divide",
    summary: "Can Starlink and its competitors solve the last-mile challenge where fiber failed? A deep dive into the economics of satellite constellations in sub-Saharan Africa.",
    category: "Infrastructure",
    author: "Jean-Pierre Bakary",
    authorRole: "Telecom Analyst",
    authorImage: "https://i.pravatar.cc/150?u=jean",
    date: "October 20, 2024",
    readTime: "15 min read",
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop",
    tags: ["Connectivity", "SpaceTech", "RuralDev"]
  }
];

export const SAMPLE_CONTRIBUTORS: Contributor[] = [
  {
    id: 'c1',
    name: "Dr. Amara Okafor",
    role: "Senior Tech Economist",
    expertise: "Fintech & Macro Trends",
    image: "https://i.pravatar.cc/150?u=amara"
  },
  {
    id: 'c2',
    name: "Samuel Vance",
    role: "AI Strategy Consultant",
    expertise: "Machine Learning & Ethics",
    image: "https://i.pravatar.cc/150?u=samuel"
  },
  {
    id: 'c3',
    name: "Jean-Pierre Bakary",
    role: "Telecom Analyst",
    expertise: "Infrastructure & Policy",
    image: "https://i.pravatar.cc/150?u=jean"
  }
];
