
import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { Category, ContentType } from '../types';

const MOCK_CATEGORIES: Category[] = [
  { id: 'cat_1', name: 'Artificial Intelligence', slug: 'ai', type: 'News', description: 'Machine learning, neural networks, and generative models.', articleCount: 156, isVisible: true, isFeatured: true, order: 1, lastUpdated: '2024-03-20 10:00' },
  { id: 'cat_2', name: 'Venture Capital', slug: 'venture-capital', type: 'Analysis', description: 'Deep dives into funding rounds and market trends.', articleCount: 84, isVisible: true, isFeatured: false, order: 2, lastUpdated: '2024-03-19 14:30' },
  { id: 'cat_3', name: 'Hardware & Chips', slug: 'hardware', type: 'News', description: 'Processors, GPUs, and consumer electronics.', articleCount: 212, isVisible: true, isFeatured: true, order: 3, lastUpdated: '2024-03-21 09:15' },
  { id: 'cat_4', name: 'Software Engineering', slug: 'software-engineering', type: 'Jobs', description: 'Developer roles and engineering culture.', articleCount: 45, isVisible: true, isFeatured: false, order: 4, lastUpdated: '2024-03-15 11:00' },
  { id: 'cat_5', name: 'Privacy & Security', slug: 'privacy', type: 'News', description: 'Cybersecurity, encryption, and digital rights.', articleCount: 92, isVisible: false, isFeatured: false, order: 5, lastUpdated: '2024-03-18 16:20' },
];

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<ContentType | 'All'>('All');

  useEffect(() => {
    const timer = setTimeout(() => {
      setCategories(MOCK_CATEGORIES);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenModal = (category?: Category) => {
    setEditingCategory(category || {
      name: '',
      slug: '',
      type: 'News',
      description: '',
      isVisible: true,
      isFeatured: false,
      order: categories.length + 1
    });
    setIsModalOpen(true);
  };

  const handleNameChange = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setEditingCategory(prev => ({ ...prev, name, slug }));
  };

  const filteredCategories = categories.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || cat.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleDelete = (id: string, count: number) => {
    if (count > 0) {
      alert(`Dependency Conflict: Cannot remove "${categories.find(c => c.id === id)?.name}" while it contains ${count} active manuscripts. Reassign content first.`);
      return;
    }
    if (confirm('Critical Action: Are you sure you want to purge this category? This cannot be reversed.')) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  const toggleVisibility = (id: string) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, isVisible: !c.isVisible } : c));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
          <LoadingSpinner />
          <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">Mapping Content Taxonomy...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* 1️⃣ Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <h1 className="editorial-title text-4xl text-slate-900 tracking-tight">Taxonomy & Navigation</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Define the structural pillars of TechPalava's editorial coverage</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-8 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-900/10 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          Add Pillar Category
        </button>
      </div>

      {/* 2️⃣ Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Coverage Areas', value: categories.length, color: 'text-slate-900' },
          { label: 'Public Sections', value: categories.filter(c => c.isVisible).length, color: 'text-emerald-600' },
          { label: 'Featured on Home', value: categories.filter(c => c.isFeatured).length, color: 'text-blue-600' },
          { label: 'Linked Manuscripts', value: categories.reduce((acc, c) => acc + c.articleCount, 0), color: 'text-slate-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 3️⃣ Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-grow min-w-[300px]">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input 
            type="text" 
            placeholder="Search categories by name or slug..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 focus:outline-none transition-all"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as any)}
        >
          <option value="All">All Pillars</option>
          <option value="News">News</option>
          <option value="Analysis">Analysis</option>
          <option value="Jobs">Jobs</option>
          <option value="Events">Events</option>
        </select>
      </div>

      {/* 4️⃣ Table Registry */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden mb-20">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-200">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest w-[35%]">Category Identity</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Manuscripts</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Visibility</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right pr-12">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center opacity-30">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                    <p className="text-sm font-bold uppercase tracking-widest">No Pillars Defined</p>
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-900 text-base">{cat.name}</span>
                          {cat.isFeatured && (
                            <span className="bg-blue-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm">Home Featured</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-[10px] font-black text-slate-400 font-mono tracking-tighter uppercase">ID: {cat.id}</span>
                          <span className="text-slate-200">/</span>
                          <span className="text-[10px] font-bold text-blue-600/60 lowercase">techpalava.com/{cat.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold text-slate-800">{cat.articleCount}</span>
                        <div className="w-8 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                           <div className="h-full bg-slate-400" style={{ width: `${Math.min(100, (cat.articleCount/250)*100)}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        <button 
                          onClick={() => toggleVisibility(cat.id)}
                          className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all border ${cat.isVisible ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200 opacity-50'}`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${cat.isVisible ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                          <span className="text-[10px] font-black uppercase tracking-widest">{cat.isVisible ? 'Public' : 'Hidden'}</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] px-2.5 py-1 bg-slate-100 rounded-lg">{cat.type}</span>
                    </td>
                    <td className="px-8 py-6 text-right pr-12">
                      <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenModal(cat)}
                          className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                          title="Configure Pillar"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </button>
                        <button 
                          onClick={() => handleDelete(cat.id, cat.articleCount)}
                          className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                          title="Purge Pillar"
                        >
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
      </div>

      {/* 5️⃣ CONFIGURATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <div>
                <h2 className="editorial-title text-2xl text-slate-900">
                  {editingCategory?.id ? 'Adjust Content Pillar' : 'Configure New Coverage Area'}
                </h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Taxonomy Entry: {editingCategory?.id || 'AUTH_NEW'}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" /></svg>
              </button>
            </div>
            
            <div className="p-10 space-y-10 max-h-[70vh] overflow-y-auto no-scrollbar">
              <section className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Display Title</label>
                  <input 
                    type="text"
                    className="w-full text-2xl editorial-title border-b border-slate-200 focus:border-blue-500 transition-colors py-2 outline-none"
                    placeholder="e.g. Artificial Intelligence"
                    value={editingCategory?.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Permanent Slug (URL)</label>
                    <div className="flex items-center space-x-2 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200">
                       <span className="text-[10px] font-bold text-slate-400">/</span>
                       <input 
                        type="text"
                        disabled
                        className="w-full bg-transparent text-sm font-mono text-slate-500 outline-none"
                        value={editingCategory?.slug}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Pillar Format</label>
                    <select 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
                      value={editingCategory?.type}
                      onChange={(e) => setEditingCategory(prev => ({ ...prev, type: e.target.value as any }))}
                    >
                      <option value="News">Standard News Feed</option>
                      <option value="Analysis">Deep Analysis Feed</option>
                      <option value="Jobs">Talent & Job Board</option>
                      <option value="Events">Global Event Registry</option>
                      <option value="Spotlight">Spotlight Features</option>
                    </select>
                  </div>
                </div>
              </section>

              <section>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Public Index Description</label>
                <textarea 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm focus:ring-4 focus:ring-blue-500/5 outline-none h-28 resize-none font-medium text-slate-600 leading-relaxed"
                  placeholder="Describe this category for search engines and user discovery..."
                  value={editingCategory?.description}
                  onChange={(e) => setEditingCategory(prev => ({ ...prev, description: e.target.value }))}
                ></textarea>
              </section>

              <section className="bg-slate-900 rounded-3xl p-8 text-white">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Structural Governance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <label className="flex items-center space-x-4 cursor-pointer group">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={editingCategory?.isVisible}
                        onChange={(e) => setEditingCategory(prev => ({ ...prev, isVisible: e.target.checked }))}
                      />
                      <div className={`w-12 h-6 rounded-full transition-colors ${editingCategory?.isVisible ? 'bg-blue-600' : 'bg-slate-700'}`}></div>
                      <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${editingCategory?.isVisible ? 'translate-x-6' : ''}`}></div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">Visible to Public</p>
                      <p className="text-[10px] text-slate-500 uppercase font-black">Indexing Active</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-4 cursor-pointer group">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={editingCategory?.isFeatured}
                        onChange={(e) => setEditingCategory(prev => ({ ...prev, isFeatured: e.target.checked }))}
                      />
                      <div className={`w-12 h-6 rounded-full transition-colors ${editingCategory?.isFeatured ? 'bg-indigo-500' : 'bg-slate-700'}`}></div>
                      <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${editingCategory?.isFeatured ? 'translate-x-6' : ''}`}></div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">Homepage Featured</p>
                      <p className="text-[10px] text-slate-500 uppercase font-black">Top Bar Navigation</p>
                    </div>
                  </label>
                </div>
              </section>
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-3 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
              >
                Discard
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-12 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-900/20 active:scale-95"
              >
                Save Content Pillar
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default CategoryManagement;
