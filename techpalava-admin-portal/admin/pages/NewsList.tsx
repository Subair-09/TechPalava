
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { Article, ArticleStatus, ContentType } from '../types';

const MOCK_ARTICLES: Article[] = [
  {
    id: 'art_1',
    title: "Apple's New Reality Pro: A Deep Dive into Spatial Computing",
    subtitle: "How the M3 chip changes the game",
    excerpt: "Spatial computing is finally here, and Apple is leading the charge with its most ambitious product yet.",
    content: "Full content here...",
    type: 'Analysis',
    category: 'Hardware',
    author: 'Sarah Jenkins',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    status: 'Published',
    publishDate: '2024-03-20 14:00',
    lastUpdated: '2024-03-21 09:15',
    tags: ['Apple', 'M3', 'VR', 'AR'],
    readingTime: 12,
    isFeatured: true,
    featuredImage: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'art_2',
    title: "NVIDIA Blackwell: The Future of Generative AI Hardware",
    subtitle: "Everything announced at GTC 2024",
    excerpt: "Jensen Huang unveiled the next generation of AI chips, and the numbers are staggering.",
    content: "Full content here...",
    type: 'News',
    category: 'AI',
    author: 'Michael Chen',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    status: 'Published',
    publishDate: '2024-03-19 10:30',
    lastUpdated: '2024-03-19 11:00',
    tags: ['NVIDIA', 'AI', 'Blackwell'],
    readingTime: 5,
    isFeatured: false,
    featuredImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'art_3',
    title: "Why Edge Computing is the Next Frontier for Tech Journalism",
    subtitle: "A TechPalava Spotlight",
    excerpt: "Latency matters more than ever in the age of real-time streaming and AI inference.",
    content: "Full content here...",
    type: 'Spotlight',
    category: 'Cloud',
    author: 'Editor Admin',
    authorImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    status: 'Draft',
    lastUpdated: '2024-03-21 16:45',
    tags: ['Edge', 'Cloud', 'Infrastructure'],
    readingTime: 15,
    isFeatured: true,
    featuredImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'art_4',
    title: "The Rise of Open Source AI: Llama 3 Performance Preview",
    subtitle: "Can Meta beat GPT-4?",
    excerpt: "New benchmarks suggest open source models are catching up to proprietary leaders.",
    content: "Full content here...",
    type: 'Analysis',
    category: 'Software',
    author: 'Elena Rodriguez',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'Scheduled',
    publishDate: '2024-03-25 08:00',
    lastUpdated: '2024-03-21 12:00',
    tags: ['Meta', 'Llama 3', 'Open Source'],
    readingTime: 8,
    isFeatured: false,
    featuredImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=200'
  }
];

const NewsList: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<ContentType | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<ArticleStatus | 'All'>('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setArticles(MOCK_ARTICLES);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         art.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || art.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || art.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: ArticleStatus) => {
    switch (status) {
      case 'Published': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Draft': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Scheduled': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredArticles.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredArticles.map(a => a.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const triggerRowUpload = (id: string) => {
    setActiveUploadId(id);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeUploadId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setArticles(prev => prev.map(art => 
          art.id === activeUploadId ? { ...art, featuredImage: reader.result as string } : art
        ));
        setActiveUploadId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
          <LoadingSpinner />
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 animate-pulse">Retrieving Manuscript Registry...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />

      {/* 1️⃣ Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <h1 className="editorial-title text-4xl text-slate-900 tracking-tight">Editorial Catalog</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Global manuscripts, analysis, and featured narratives</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/admin/articles/new')}
            className="px-8 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-900/10 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            Compose New
          </button>
        </div>
      </div>

      {/* 2️⃣ Editorial Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Live Stories', value: articles.filter(a => a.status === 'Published').length, color: 'text-emerald-600' },
          { label: 'Work in Progress', value: articles.filter(a => a.status === 'Draft').length, color: 'text-amber-500' },
          { label: 'Featured Active', value: articles.filter(a => a.isFeatured).length, color: 'text-blue-600' },
          { label: 'Catalog Total', value: articles.length, color: 'text-slate-900' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 3️⃣ Filtering & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-grow min-w-[300px]">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input 
            type="text" 
            placeholder="Filter catalog by headline, author, or keywords..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-3">
          <select 
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 focus:outline-none transition-all"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
          >
            <option value="All">All Formats</option>
            <option value="News">News</option>
            <option value="Analysis">Analysis</option>
            <option value="Spotlight">Spotlight</option>
          </select>

          <select 
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 focus:outline-none transition-all"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="All">All Lifecycle</option>
            <option value="Published">Published</option>
            <option value="Draft">Drafts</option>
            <option value="Scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      {/* 4️⃣ Bulk Actions Strip (Conditional) */}
      {selectedIds.length > 0 && (
        <div className="bg-slate-900 text-white p-4 rounded-2xl mb-6 flex justify-between items-center animate-in slide-in-from-top-4 duration-300 shadow-2xl">
          <div className="flex items-center space-x-4 pl-2">
            <span className="text-xs font-black uppercase tracking-widest text-blue-400">{selectedIds.length} Selected</span>
            <div className="h-4 w-px bg-white/10"></div>
            <button className="text-[10px] font-bold uppercase tracking-widest hover:text-blue-400 transition-colors">Bulk Unpublish</button>
            <button className="text-[10px] font-bold uppercase tracking-widest hover:text-rose-400 transition-colors">Move to Trash</button>
          </div>
          <button onClick={() => setSelectedIds([])} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" /></svg>
          </button>
        </div>
      )}

      {/* 5️⃣ Main Table Registry */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden mb-20">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/80 border-b border-slate-200">
              <tr>
                <th className="px-6 py-5 w-12 text-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 text-slate-900 focus:ring-0 cursor-pointer"
                    checked={selectedIds.length === filteredArticles.length && filteredArticles.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Manuscript Details</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Attribution</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Lifecycle</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Published At</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center opacity-30">
                      <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM7 8h5M7 12h8M7 16h8" /></svg>
                      <h3 className="text-xl font-bold uppercase tracking-[0.2em]">Registry Clear</h3>
                      <p className="text-sm font-medium mt-2">No manuscripts matching the current criteria were found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredArticles.map((article) => (
                  <tr key={article.id} className={`hover:bg-slate-50/50 transition-colors group ${selectedIds.includes(article.id) ? 'bg-blue-50/30' : ''}`}>
                    <td className="px-6 py-4 text-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300 text-slate-900 focus:ring-0 cursor-pointer"
                        checked={selectedIds.includes(article.id)}
                        onChange={() => toggleSelect(article.id)}
                      />
                    </td>
                    <td className="px-6 py-4 max-w-md">
                      <div className="flex items-center space-x-5">
                        <div 
                          className="w-20 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 relative group-hover:shadow-lg transition-all shadow-sm cursor-pointer"
                          onClick={() => triggerRowUpload(article.id)}
                          title="Click to change featured image"
                        >
                          <img src={article.featuredImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          </div>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <h4 
                            className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer truncate text-base leading-snug"
                            onClick={() => navigate(`/admin/articles/${article.id}/edit`)}
                          >
                            {article.title}
                          </h4>
                          <div className="flex items-center mt-1 space-x-2">
                             <span className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">{article.type}</span>
                             <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                             <span className="text-[10px] font-bold text-blue-600/70 uppercase tracking-widest">{article.category}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                         <div className="w-8 h-8 rounded-full border border-slate-200 overflow-hidden bg-slate-50 flex-shrink-0">
                            <img src={article.authorImage} className="w-full h-full object-cover" alt={article.author} />
                         </div>
                         <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-700">{article.author}</span>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{article.readingTime}m read</span>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.1em] border ${getStatusBadge(article.status)}`}>
                          {article.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end">
                        <p className="text-xs font-bold text-slate-800">{article.publishDate?.replace('T', ' ') || '-'}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Manual Schedule</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right pr-8">
                      <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => navigate(`/admin/articles/${article.id}/edit`)}
                          className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" 
                          title="Open Editor"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" title="Archive Manuscript">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer / Mock Pagination */}
        <div className="px-8 py-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Showing <span className="text-slate-900">{filteredArticles.length}</span> of <span className="text-slate-900">{articles.length}</span> manuscripts
          </p>
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white cursor-not-allowed">Previous</button>
            <button className="px-4 py-1.5 rounded-lg bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-900/10 transition-all active:scale-95">01</button>
            <button className="px-4 py-1.5 rounded-lg hover:bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-all">02</button>
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600 bg-white hover:bg-slate-50 transition-all">Next</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewsList;
