
import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types';
import { CATEGORIES } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface AdminNewsEditorProps {
  article?: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: Partial<NewsItem>) => void;
}

const AdminNewsEditor: React.FC<AdminNewsEditorProps> = ({ article, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<NewsItem>>({
    title: '',
    excerpt: '',
    category: 'General News',
    author: 'Admin User',
    imageUrl: '',
    readTime: '5 min read',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  });
  
  const [isGeneratingSEO, setIsGeneratingSEO] = useState(false);
  const [seoDescription, setSeoDescription] = useState('');

  useEffect(() => {
    if (article) {
      setFormData(article);
    } else {
      setFormData({
        title: '',
        excerpt: '',
        category: 'General News',
        author: 'Admin User',
        imageUrl: '',
        readTime: '5 min read',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
    }
    setSeoDescription('');
  }, [article, isOpen]);

  const generateSEO = async () => {
    if (!formData.title) return;
    setIsGeneratingSEO(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a compelling, SEO-friendly meta description (max 160 chars) for a tech article titled: "${formData.title}". Excerpt: "${formData.excerpt}"`,
      });
      setSeoDescription(response.text || '');
    } catch (error) {
      console.error("SEO Generation failed", error);
    } finally {
      setIsGeneratingSEO(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-gray-950/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-4xl transform transition-all duration-500 ease-in-out">
          <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-950 shadow-2xl border-l-2 border-gray-100 dark:border-gray-800">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md px-8 py-6 border-b-2 border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black font-serif-heading dark:text-white tracking-tight italic">
                  {article ? 'Edit Article' : 'Compose Story'}
                </h2>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">TechPalava Editorial Suite</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={onClose} className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Discard
                </button>
                <button 
                  onClick={() => onSave(formData)}
                  className="px-8 py-2.5 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 lg:p-12 space-y-12">
              <section className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-[0.2em]">Article Headline</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter a gripping headline..."
                    className="w-full bg-transparent text-4xl lg:text-5xl font-black font-serif-heading dark:text-white border-b-2 border-gray-100 dark:border-gray-800 focus:border-blue-600 focus:outline-none transition-colors py-4 placeholder:text-gray-200 dark:placeholder:text-gray-800"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-[0.2em]">Category Vertical</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-2xl p-4 text-sm font-bold dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    >
                      {CATEGORIES.map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-[0.2em]">Featured Media URL</label>
                    <input 
                      type="text" 
                      value={formData.imageUrl}
                      onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-2xl p-4 text-sm font-bold dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-[0.2em]">Summary / Excerpt</label>
                  <textarea 
                    rows={4}
                    value={formData.excerpt}
                    onChange={e => setFormData({...formData, excerpt: e.target.value})}
                    placeholder="Provide a concise summary of the story..."
                    className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-2xl p-6 text-sm font-medium leading-relaxed dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
              </section>

              {/* AI SEO Assistant */}
              <section className="bg-gray-50 dark:bg-gray-900/50 rounded-[2rem] p-8 border-2 border-gray-100 dark:border-gray-800 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-black uppercase tracking-widest dark:text-white flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      AI SEO Optimizer
                    </h3>
                    <button 
                      onClick={generateSEO}
                      disabled={isGeneratingSEO || !formData.title}
                      className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 disabled:opacity-50"
                    >
                      {isGeneratingSEO ? 'Analyzing...' : 'Generate Description'}
                    </button>
                  </div>
                  <textarea 
                    rows={3}
                    readOnly={isGeneratingSEO}
                    value={seoDescription}
                    onChange={e => setSeoDescription(e.target.value)}
                    placeholder="AI-generated meta description will appear here..."
                    className="w-full bg-white dark:bg-gray-950 border-2 border-gray-100 dark:border-gray-800 rounded-xl p-4 text-xs font-medium dark:text-gray-300 focus:outline-none"
                  />
                </div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/5 rounded-full blur-3xl" />
              </section>

              {/* Editorial Notes */}
              <section className="pt-8 border-t-2 border-gray-50 dark:border-gray-900">
                <div className="flex flex-wrap gap-12">
                   <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-[0.2em]">Byline</label>
                    <p className="text-sm font-bold dark:text-white">{formData.author}</p>
                   </div>
                   <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-[0.2em]">Est. Read Time</label>
                    <input 
                      type="text" 
                      value={formData.readTime}
                      onChange={e => setFormData({...formData, readTime: e.target.value})}
                      className="bg-transparent border-none text-sm font-bold dark:text-white p-0 focus:outline-none"
                    />
                   </div>
                   <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-[0.2em]">Publication Date</label>
                    <p className="text-sm font-bold dark:text-white">{formData.date}</p>
                   </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNewsEditor;
