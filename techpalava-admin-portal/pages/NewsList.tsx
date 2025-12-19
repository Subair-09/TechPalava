
import React, { useState, useEffect } from 'react';
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
    status: 'Published',
    publishDate: '2024-03-20 14:00',
    lastUpdated: '2024-03-21 09:15',
    tags: ['Apple', 'M3', 'VR', 'AR'],
    readingTime: 12,
    isFeatured: true
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
    status: 'Published',
    publishDate: '2024-03-19 10:30',
    lastUpdated: '2024-03-19 11:00',
    tags: ['NVIDIA', 'AI', 'Blackwell'],
    readingTime: 5,
    isFeatured: false
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
    status: 'Draft',
    lastUpdated: '2024-03-21 16:45',
    tags: ['Edge', 'Cloud', 'Infrastructure'],
    readingTime: 15,
    isFeatured: true
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
    status: 'Scheduled',
    publishDate: '2024-03-25 08:00',
    lastUpdated: '2024-03-21 12:00',
    tags: ['Meta', 'Llama 3', 'Open Source'],
    readingTime: 8,
    isFeatured: false
  }
];

const NewsList: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<ContentType | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<ArticleStatus | 'All'>('All');

  useEffect(() => {
    // Simulate API fetch
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

  const getStatusColor = (status: ArticleStatus) => {
    switch (status) {
      case 'Published': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Draft': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Scheduled': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const getTypeIcon = (type: ContentType) => {
    switch (type) {
      case 'Analysis': return <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>;
      case 'News': return <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>;
      case 'Spotlight': return <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <LoadingSpinner />
          <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Newsroom Catalog...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="editorial-title text-3xl text-slate-900 tracking-tight">Editorial Catalog</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and publish TechPalava content</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/admin/articles/new')}
            className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-black transition-all shadow-lg shadow-slate-900/10 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            Create New Article
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-grow min-w-[240px]">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input 
            type="text" 
            placeholder="Search headline or author..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select 
          className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as any)}
        >
          <option value="All">All Types</option>
          <option value="News">News</option>
          <option value="Analysis">Analysis</option>
          <option value="Spotlight">Spotlight</option>
        </select>

        <select 
          className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
        >
          <option value="All">All Status</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
          <option value="Scheduled">Scheduled</option>
        </select>
      </div>

      {/* List Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Article Details</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Publish Date</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredArticles.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center opacity-40">
                    <svg className="w-12 h-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM7 8h5M7 12h8M7 16h8" /></svg>
                    <p className="text-sm font-bold uppercase tracking-widest">No articles found</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 max-w-md">
                    <div className="flex flex-col">
                      <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => navigate(`/admin/articles/${article.id}/edit`)}>
                        {article.title}
                      </h4>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">By {article.author}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{article.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-xs font-bold text-slate-600">
                      {getTypeIcon(article.type)}
                      {article.type}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(article.status)}`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-600 font-medium">{article.publishDate || '-'}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last updated {article.lastUpdated}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => navigate(`/admin/articles/${article.id}/edit`)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                        title="Edit Article"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete Article">
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
    </AdminLayout>
  );
};

export default NewsList;
