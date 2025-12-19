
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
      alert(`Cannot delete "${categories.find(c => c.id === id)?.name}" because it contains ${count} active articles. Please reassign or delete the articles first.`);
      return;
    }
    if (confirm('Are you sure you want to remove this category? This action cannot be undone.')) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <LoadingSpinner />
          <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Taxonomy...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="editorial-title text-3xl text-slate-900 tracking-tight">Taxonomy & Categories</h1>
          <p className="text-slate-500 text-sm mt-1">Manage the structural foundation of TechPalava content</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-black transition-all shadow-lg shadow-slate-900/10 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          Add New Category
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-grow min-w-[240px]">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input 
            type="text" 
            placeholder="Filter by name..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
          <option value="Jobs">Jobs</option>
          <option value="Events">Events</option>
        </select>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest w-1/3">Category Details</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Articles</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCategories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center opacity-40">
                  <p className="text-sm font-bold uppercase tracking-widest">No categories match your filter</p>
                </td>
              </tr>
            ) : (
              filteredCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900">{cat.name}</span>
                        {cat.isFeatured && (
                          <span className="bg-blue-50 text-blue-600 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">Featured</span>
                        )}
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 font-mono tracking-tight mt-1">/{cat.slug}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-bold text-slate-700">{cat.articleCount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <button 
                        className={`p-1.5 rounded-lg transition-all ${cat.isVisible ? 'text-blue-600 bg-blue-50' : 'text-slate-300 bg-slate-50'}`}
                        title={cat.isVisible ? 'Category is Public' : 'Category is Hidden'}
                      >
                        {cat.isVisible ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{cat.type}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleOpenModal(cat)}
                        className="p-2 text-slate-400 hover:text-blue-600 transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(cat.id, cat.articleCount)}
                        className="p-2 text-slate-400 hover:text-red-600 transition-all"
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

      {/* Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="editorial-title text-xl text-slate-900">
                {editingCategory?.id ? 'Edit Category' : 'New Taxonomy Category'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" /></svg>
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Display Name</label>
                <input 
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="e.g. Software Engineering"
                  value={editingCategory?.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">URL Slug</label>
                  <input 
                    type="text"
                    disabled
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 text-sm font-mono text-slate-500"
                    value={editingCategory?.slug}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Type</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none"
                    value={editingCategory?.type}
                    onChange={(e) => setEditingCategory(prev => ({ ...prev, type: e.target.value as any }))}
                  >
                    <option value="News">News</option>
                    <option value="Analysis">Analysis</option>
                    <option value="Jobs">Jobs</option>
                    <option value="Events">Events</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Short Description</label>
                <textarea 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none h-24 resize-none"
                  placeholder="Summarize this category for SEO and index pages..."
                  value={editingCategory?.description}
                  onChange={(e) => setEditingCategory(prev => ({ ...prev, description: e.target.value }))}
                ></textarea>
              </div>

              <div className="flex items-center space-x-8 pt-2">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={editingCategory?.isVisible}
                      onChange={(e) => setEditingCategory(prev => ({ ...prev, isVisible: e.target.checked }))}
                    />
                    <div className={`w-10 h-5 rounded-full transition-colors ${editingCategory?.isVisible ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                    <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform ${editingCategory?.isVisible ? 'translate-x-5' : ''}`}></div>
                  </div>
                  <span className="text-xs font-bold text-slate-700">Publicly Visible</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={editingCategory?.isFeatured}
                      onChange={(e) => setEditingCategory(prev => ({ ...prev, isFeatured: e.target.checked }))}
                    />
                    <div className={`w-10 h-5 rounded-full transition-colors ${editingCategory?.isFeatured ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                    <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform ${editingCategory?.isFeatured ? 'translate-x-5' : ''}`}></div>
                  </div>
                  <span className="text-xs font-bold text-slate-700">Featured (Homepage)</span>
                </label>
              </div>
            </div>

            <div className="p-6 bg-slate-50 flex justify-end space-x-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
              >
                Discard
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-black transition-all"
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default CategoryManagement;
