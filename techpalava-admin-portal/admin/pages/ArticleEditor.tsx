
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { Article, ArticleStatus, ContentType } from '../types';

const ArticleEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const authorAvatarRef = useRef<HTMLInputElement>(null);
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    subtitle: '',
    excerpt: '',
    content: '',
    type: 'News',
    category: 'Hardware',
    status: 'Draft',
    author: 'Editor Admin',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    publishDate: new Date().toISOString().slice(0, 16), // datetime-local format
    tags: [],
    isFeatured: false,
    readingTime: 5,
    featuredImage: '',
    imageCaption: ''
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    if (isEditing) {
      // Simulate fetch existing article
      setTimeout(() => {
        setFormData({
          id,
          title: "Apple's New Reality Pro: A Deep Dive into Spatial Computing",
          subtitle: "How the M3 chip changes the game",
          excerpt: "Spatial computing is finally here, and Apple is leading the charge.",
          content: "The launch of Apple Vision Pro marks a pivot in spatial computing...",
          type: 'Analysis',
          category: 'Hardware',
          status: 'Published',
          author: 'Sarah Jenkins',
          authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
          publishDate: '2024-03-20T14:00',
          tags: ['Apple', 'M3'],
          isFeatured: true,
          readingTime: 12,
          featuredImage: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&q=80&w=1200',
          imageCaption: 'The Vision Pro headset represents a decade of R&D.'
        });
        setLoading(false);
      }, 600);
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, featuredImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, authorImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const triggerAvatarUpload = () => {
    authorAvatarRef.current?.click();
  };

  const handleSave = async (status: ArticleStatus) => {
    const errors = [];
    if (!formData.title) errors.push('Headline is required');
    if (!formData.excerpt) errors.push('Excerpt is required');
    if (!formData.content) errors.push('Article body cannot be empty');
    if (!formData.featuredImage) errors.push('A featured image is required for publication');
    if (!formData.author) errors.push('Author name is required');

    if (errors.length > 0) {
      setValidationErrors(errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSaving(true);
    setValidationErrors([]);
    
    setTimeout(() => {
      setSaving(false);
      navigate('/admin/articles');
    }, 1200);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <LoadingSpinner />
          <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Opening Manuscript...</p>
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
      <input 
        type="file" 
        ref={authorAvatarRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleAvatarChange} 
      />

      {/* Editor Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="editorial-title text-3xl text-slate-900 tracking-tight">
            {isEditing ? 'Edit Manuscript' : 'New Manuscript'}
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Refine your story for TechPalava audiences</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/admin/articles')}
            className="px-4 py-2 text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => handleSave('Draft')}
            disabled={saving}
            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-900 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-slate-50 transition-all flex items-center"
          >
            {saving ? <LoadingSpinner /> : 'Save Draft'}
          </button>
          <button 
            onClick={() => handleSave('Published')}
            disabled={saving}
            className="px-6 py-2.5 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center"
          >
            {saving ? <LoadingSpinner /> : (isEditing ? 'Update Story' : 'Publish Now')}
          </button>
        </div>
      </div>

      {validationErrors.length > 0 && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          <p className="font-bold text-xs uppercase tracking-widest mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Review required fields:
          </p>
          <ul className="list-disc list-inside text-sm">
            {validationErrors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Writing Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="space-y-6">
              {/* Title Section */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Main Headline</label>
                <input 
                  type="text"
                  name="title"
                  placeholder="The definitive story of..."
                  className="w-full text-4xl editorial-title border-none focus:ring-0 placeholder:text-slate-100 p-0"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              {/* Sub-headline */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Sub-headline / Context</label>
                <input 
                  type="text"
                  name="subtitle"
                  placeholder="Add a secondary hook..."
                  className="w-full text-xl font-medium text-slate-500 border-none focus:ring-0 placeholder:text-slate-100 p-0"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                />
              </div>

              <div className="h-px bg-slate-100 my-8"></div>

              {/* Excerpt */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">The Hook (Excerpt)</label>
                <textarea 
                  name="excerpt"
                  rows={2}
                  placeholder="A brief summary for cards and social previews..."
                  className="w-full text-sm font-medium text-slate-600 bg-slate-50 border border-slate-100 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              {/* Rich Text Editor Mockup */}
              <div className="mt-8">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Story Content</label>
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  {/* Fake Toolbar */}
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center space-x-4">
                    <button className="p-1 hover:bg-slate-200 rounded transition-colors" title="Bold"><span className="font-bold text-sm">B</span></button>
                    <button className="p-1 hover:bg-slate-200 rounded transition-colors" title="Italic"><span className="italic font-serif text-sm">I</span></button>
                    <button className="p-1 hover:bg-slate-200 rounded transition-colors text-sm font-bold" title="Heading">H1</button>
                    <div className="h-4 w-px bg-slate-200 mx-2"></div>
                    <button className="p-1 hover:bg-slate-200 rounded transition-colors" title="Link">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.172 13.828a4 4 0 015.656 0l4-4a4 4 0 10-5.656-5.656l-1.102 1.101" /></svg>
                    </button>
                    <button onClick={triggerFileUpload} className="p-1 hover:bg-slate-200 rounded transition-colors flex items-center" title="Insert Image into body">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span className="ml-1 text-[8px] font-black uppercase">Insert Media</span>
                    </button>
                  </div>
                  <textarea 
                    name="content"
                    rows={20}
                    className="w-full p-8 text-lg font-serif leading-relaxed border-none focus:ring-0 focus:outline-none min-h-[500px]"
                    placeholder="Tell your story..."
                    value={formData.content}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Metadata Column */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Author Identity Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Author Identity</h3>
            <div className="flex flex-col items-center space-y-4">
              <div 
                onClick={triggerAvatarUpload}
                className="w-24 h-24 rounded-full border-4 border-slate-50 shadow-md overflow-hidden relative group cursor-pointer"
              >
                {formData.authorImage ? (
                  <img src={formData.authorImage} className="w-full h-full object-cover" alt="Author" />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">Update</span>
                </div>
              </div>
              <div className="w-full">
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 text-center">Display Name</label>
                <input 
                  type="text"
                  name="author"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-center focus:ring-2 focus:ring-blue-500/10 outline-none"
                  placeholder="e.g. Michael Chen"
                  value={formData.author}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Schedule & Timing Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Publication Schedule</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 flex justify-between items-center">
                  Live Horizon
                  <span className="text-[8px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">Allows Backdating</span>
                </label>
                <input 
                  type="datetime-local" 
                  name="publishDate"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                />
                <p className="mt-2 text-[9px] text-slate-400 italic">Historical dates will move the story down the feed; future dates will trigger scheduling.</p>
              </div>
            </div>
          </div>

          {/* Featured Image Zone */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex justify-between items-center">
              Featured Hero Media
              {formData.featuredImage && (
                <button 
                  onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                  className="text-[9px] font-black text-rose-500 uppercase tracking-widest hover:underline"
                >
                  Remove
                </button>
              )}
            </h3>
            
            {formData.featuredImage ? (
              <div className="space-y-4">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-100 group shadow-sm">
                  <img src={formData.featuredImage} className="w-full h-full object-cover" alt="Featured" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={triggerFileUpload}
                      className="px-4 py-2 bg-white text-slate-900 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:scale-105 transition-all"
                    >
                      Replace Visual
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Asset Caption</label>
                  <input 
                    type="text"
                    name="imageCaption"
                    placeholder="e.g. Prototype rendering of the..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10"
                    value={formData.imageCaption}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            ) : (
              <div 
                onClick={triggerFileUpload}
                className="aspect-video bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center group cursor-pointer hover:border-blue-400 hover:bg-blue-50/20 transition-all"
              >
                <div className="text-center">
                  <svg className="w-10 h-10 text-slate-300 mx-auto mb-3 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-blue-600 transition-colors">Select Story Image</p>
                  <p className="text-[8px] text-slate-300 mt-1 uppercase tracking-widest font-bold">PNG, JPG or WEBP (Max 5MB)</p>
                </div>
              </div>
            )}
          </div>

          {/* Classification */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Article Logistics</h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Content Format</label>
                <select 
                  name="type"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold focus:outline-none"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="News">Standard News</option>
                  <option value="Analysis">Deep Analysis</option>
                  <option value="Spotlight">Editorial Spotlight</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Primary Taxonomy</label>
                <select 
                  name="category"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold focus:outline-none"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="Hardware">Hardware</option>
                  <option value="AI">Artificial Intelligence</option>
                  <option value="Software">Software</option>
                  <option value="Cloud">Cloud Infrastructure</option>
                  <option value="Fintech">Fintech</option>
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      name="isFeatured"
                      className="sr-only" 
                      checked={formData.isFeatured}
                      onChange={handleInputChange}
                    />
                    <div className={`w-10 h-5 rounded-full transition-colors ${formData.isFeatured ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                    <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform ${formData.isFeatured ? 'translate-x-5' : ''}`}></div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Apply Homepage Featured Slot</span>
                </label>
              </div>
            </div>
          </div>

          {/* Integrity Stats */}
          <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl shadow-slate-900/40">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Editorial Integrity</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. Reading Time</span>
                <div className="flex items-center space-x-2">
                  <input 
                    type="number" 
                    name="readingTime"
                    className="w-12 bg-slate-800 border-none rounded-lg p-2 text-xs text-center font-bold text-white outline-none"
                    value={formData.readingTime}
                    onChange={handleInputChange}
                  />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">min</span>
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Manuscript Depth</span>
                <span className="text-xs font-bold text-blue-400">{formData.content?.split(' ').length || 0} words</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default ArticleEditor;
