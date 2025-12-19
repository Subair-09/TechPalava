
import React from 'react';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  readTime: string;
}

export interface JobItem {
  id: string;
  role: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Remote' | 'Contract';
  logoUrl: string;
}

export interface Category {
  name: string;
  slug: string;
  color: string;
  icon: React.ReactNode;
}

export interface TechEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: 'Conference' | 'Meetup' | 'Workshop' | 'Hackathon';
  isVirtual: boolean;
  imageUrl: string;
  link: string;
  isPast?: boolean;
}

export interface AnalysisItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  category: string;
  author: string;
  authorRole: string;
  authorImage: string;
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
}

export interface Contributor {
  id: string;
  name: string;
  role: string;
  expertise: string;
  image: string;
}
