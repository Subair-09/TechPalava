
import { GoogleGenAI, Type } from "@google/genai";
import { NewsItem, JobItem } from "../types";
import { SAMPLE_NEWS, SAMPLE_JOBS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const CACHE_KEY_NEWS = 'techpalava_news_cache';
const CACHE_KEY_JOBS = 'techpalava_jobs_cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

const getCachedData = <T>(key: string): T | null => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_DURATION) return null;
  return data;
};

const setCachedData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};

export const fetchLatestNews = async (): Promise<NewsItem[]> => {
  const cached = getCachedData<NewsItem[]>(CACHE_KEY_NEWS);
  if (cached) return cached;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate 6 realistic tech news articles for a platform called TechPalava. Focus on emerging markets, AI, and startups. Provide title, excerpt, category, and author. Make them sound very current. Ensure categories match: General News, Startups, AI & ML, Fintech, Policy, Crypto.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              excerpt: { type: Type.STRING },
              category: { type: Type.STRING },
              author: { type: Type.STRING },
              date: { type: Type.STRING },
              readTime: { type: Type.STRING },
            },
            required: ["id", "title", "excerpt", "category", "author", "date", "readTime"],
          },
        },
      },
    });

    const items = JSON.parse(response.text || "[]") as NewsItem[];
    
    if (items.length === 0) return SAMPLE_NEWS;

    const newsWithImages = items.map((item, idx) => ({
      ...item,
      imageUrl: `https://picsum.photos/seed/${item.id || idx + 50}/800/600`,
    }));

    setCachedData(CACHE_KEY_NEWS, newsWithImages);
    return newsWithImages;
  } catch (error) {
    console.warn("Gemini API Quota reached or error occurred, using fallback/cache:", error);
    return cached || SAMPLE_NEWS;
  }
};

export const fetchJobs = async (): Promise<JobItem[]> => {
  const cached = getCachedData<JobItem[]>(CACHE_KEY_JOBS);
  if (cached) return cached;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate 6 realistic tech job listings at top companies. Include role, company, location, salary range, and job type (Full-time, Remote, or Contract).",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              role: { type: Type.STRING },
              company: { type: Type.STRING },
              location: { type: Type.STRING },
              salary: { type: Type.STRING },
              type: { type: Type.STRING },
            },
            required: ["id", "role", "company", "location", "salary", "type"],
          },
        },
      },
    });

    const jobs = JSON.parse(response.text || "[]") as JobItem[];
    if (jobs.length === 0) return SAMPLE_JOBS;

    const jobsWithLogos = jobs.map((job, idx) => ({
      ...job,
      logoUrl: `https://picsum.photos/seed/${job.id || idx + 100}/100/100`,
    }));

    setCachedData(CACHE_KEY_JOBS, jobsWithLogos);
    return jobsWithLogos;
  } catch (error) {
    console.warn("Gemini API Quota reached or error occurred, using fallback/cache:", error);
    return cached || SAMPLE_JOBS;
  }
};
