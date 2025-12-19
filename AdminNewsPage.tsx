
import React, { useState, useMemo } from 'react';
import { NewsItem } from './types';
import { CATEGORIES } from './constants';
import AdminNewsEditor from './components/AdminNewsEditor';

interface AdminNewsPageProps {
  news: NewsItem[];
  loading: boolean;
}

const AdminNewsPage: React.FC<AdminNewsPageProps> = ({ news, loading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'scheduled'>('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsItem | null>(null);

  const filteredNews = useMemo(() => {
    return news.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      // In this demo, we treat all sample news as "published"
      const matchesStatus = filterStatus === 'all' || filterStatus === 'published';
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [news, searchQuery, filterStatus, filterCategory]);

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredNews.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredNews.map(n => n.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleEdit = (article: NewsItem) => {
    setEditingArticle(article);
    setEditorOpen(true);
  };

  const handleCreate = () => {
    setEditingArticle(null);
    setEditorOpen(true);
  };

  const handleSave = (updated: Partial<NewsItem>) => {
    console.log("Saving article:", updated);
    setEditorOpen(false);
    // In a real app, you'd trigger a state update here
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Action Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black font-serif-heading dark:text-white tracking-tight uppercase italic">Newsroom</h1>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Manage global coverage and editorial pipeline</p>
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none px-6 py-3 border-2 border-gray-200 dark:border-gray-800 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all">
            Export Report
          </button>
          <button 
            onClick={handleCreate}
            className="flex-1 lg:flex-none px-8 py-3 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
            Create Article
          </button>
        </div>
      </div>

      {/* Filter Matrix */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border-2 border-gray-100 dark:border-gray-800 p-6 lg:p-10 shadow-sm transition-all">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Headline Search</label>
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Find a story..." 
                className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 py-3 pl-10 pr-4 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:text-white"
              />
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Status Filter</label>
            <select 
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value as any)}
              className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 py-3 px-4 rounded-xl text-xs font-bold focus:outline-none dark:text-white appearance-none"
            >
              <option value="all">All States</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Desk / Category</label>
            <select 
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 py-3 px-4 rounded-xl text-xs font-bold focus:outline-none dark:text-white appearance-none"
            >
              <option value="all">All Desks</option>
              {CATEGORIES.map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          <div className="flex items-end">
            <button 
              onClick={() => {setSearchQuery(''); setFilterStatus('all'); setFilterCategory('all');}}
              className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border-2 border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b-2 border-gray-100 dark:border-gray-800">
                <th className="py-6 px-8 w-10">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.size === filteredNews.length && filteredNews.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" 
                  />
                </th>
                <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Headline</th>
                <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Desk</th>
                <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Author</th>
                <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                <th className="py-6 px-8 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-50 dark:divide-gray-800">
              {loading ? (
                [1,2,3,4,5].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={7} className="p-8 h-16 bg-gray-50/20 dark:bg-gray-900/20"></td>
                  </tr>
                ))
              ) : filteredNews.length > 0 ? (
                filteredNews.map(item => (
                  <tr key={item.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all cursor-default">
                    <td className="py-6 px-8">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.has(item.id)}
                        onChange={() => toggleSelect(item.id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" 
                      />
                    </td>
                    <td className="py-6 px-4 max-w-xs">
                      <p className="font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors leading-tight">
                        {item.title}
                      </p>
                    </td>
                    <td className="py-6 px-4">
                      <span className="text-[10px] font-black uppercase px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400 tracking-tighter">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-6 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
                        <span className="text-[11px] font-bold text-gray-600 dark:text-gray-300 whitespace-nowrap">{item.author}</span>
                      </div>
                    </td>
                    <td className="py-6 px-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-800">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        Published
                      </span>
                    </td>
                    <td className="py-6 px-4">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter whitespace-nowrap">{item.date}</p>
                    </td>
                    <td className="py-6 px-8 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-40 text-center">
                    <div className="w-20 h-20 bg-gray-50 dark:bg-gray-950 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /></svg>
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter dark:text-white">Empty Newsroom</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">No articles match your current search parameters</p>
                    <button 
                      onClick={handleCreate}
                      className="mt-8 px-8 py-3 bg-gray-900 dark:bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl"
                    >
                      Draft First Story
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="p-8 bg-gray-50/50 dark:bg-gray-800/30 border-t-2 border-gray-50 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            {selectedIds.size > 0 ? `${selectedIds.size} Selected` : `Showing ${filteredNews.length} of ${news.length} articles`}
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border-2 border-gray-100 dark:border-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors disabled:opacity-50">Prev</button>
            <div className="flex gap-1 px-4">
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black">1</span>
              <span className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-xs font-black text-gray-400 cursor-pointer transition-colors">2</span>
            </div>
            <button className="px-4 py-2 border-2 border-gray-100 dark:border-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">Next</button>
          </div>
        </div>
      </div>

      <AdminNewsEditor 
        isOpen={editorOpen} 
        onClose={() => setEditorOpen(false)} 
        article={editingArticle}
        onSave={handleSave}
      />
    </div>
  );
};

export default AdminNewsPage;
