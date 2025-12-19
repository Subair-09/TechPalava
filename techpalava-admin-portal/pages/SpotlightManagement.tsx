
import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { SpotlightEntry, SpotlightType, SpotlightPlacement, SpotlightStatus } from '../types';

const MOCK_SPOTLIGHTS: SpotlightEntry[] = [
  {
    id: 'spot_1',
    title: "Reimagining the Future of AI with Sam Altman",
    personName: "Sam Altman",
    role: "CEO, OpenAI",
    summary: "An exclusive look at the next frontier of artificial general intelligence and its societal impact.",
    type: 'Interview',
    placement: 'Both',
    status: 'Published',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    order: 1,
    lastUpdated: '2024-03-22 10:00',
    isPinned: true
  },
  {
    id: 'spot_2',
    title: "The Vision Behind the New Vision Pro",
    personName: "Mike Rockwell",
    role: "VP, Technology Development Group",
    summary: "How Apple spent a decade perfecting the optics and sensors for spatial computing.",
    type: 'Feature',
    placement: 'Homepage Hero',
    status: 'Published',
    imageUrl: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&q=80&w=1200',
    order: 2,
    lastUpdated: '2024-03-21 14:30',
    isPinned: false
  },
  {
    id: 'spot_3',
    title: "Founder Spotlight: The Rise of Fintech in Africa",
    personName: "Shola Akinlade",
    role: "Co-founder, Paystack",
    summary: "From a simple payment link to a billion-dollar acquisition by Stripe.",
    type: 'Founder',
    placement: 'Spotlight Page',
    status: 'Scheduled',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=1200',
    order: 3,
    lastUpdated: '2024-03-20 09:15',
    isPinned: false
  },
  {
    id: 'spot_4',
    title: "Innovators 2024: The Carbon Capture Pioneers",
    personName: "Dr. Elena Grushina",
    role: "Lead Researcher, ClimeWorks",
    summary: "Scaling direct air capture to megaton levels before 2030.",
    type: 'Innovator',
    placement: 'Homepage Hero',
    status: 'Draft',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200',
    order: 4,
    lastUpdated: '2024-03-19 16:45',
    isPinned: false
  }
];

const SpotlightManagement: React.FC = () => {
  const [spotlights, setSpotlights] = useState<SpotlightEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingSpotlight, setEditingSpotlight] = useState<Partial<SpotlightEntry> | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setSpotlights(MOCK_SPOTLIGHTS.sort((a, b) => a.order - b.order));
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenModal = (spotlight?: SpotlightEntry) => {
    setValidationError(null);
    setEditingSpotlight(spotlight || {
      title: '',
      personName: '',
      role: '',
      summary: '',
      type: 'Feature',
      placement: 'Both',
      status: 'Draft',
      imageUrl: '',
      isPinned: false
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!editingSpotlight?.title || !editingSpotlight?.imageUrl || !editingSpotlight?.personName) {
      setValidationError("Headline, Person Name, and Hero Image are required.");
      return;
    }

    // Check homepage hero limit (e.g. max 5)
    if (editingSpotlight.placement !== 'Spotlight Page' && editingSpotlight.status === 'Published') {
      const activeHeroes = spotlights.filter(s => s.status === 'Published' && s.placement !== 'Spotlight Page' && s.id !== editingSpotlight.id);
      if (activeHeroes.length >= 5) {
        setValidationError("Maximum of 5 published spotlights allowed on the Homepage Hero. Please unpublish or move another one first.");
        return;
      }
    }

    // Simulate save
    setLoading(true);
    setTimeout(() => {
      if (editingSpotlight.id) {
        setSpotlights(prev => prev.map(s => s.id === editingSpotlight.id ? { ...s, ...editingSpotlight, lastUpdated: new Date().toISOString() } as SpotlightEntry : s));
      } else {
        const newSpot: SpotlightEntry = {
          ...editingSpotlight as SpotlightEntry,
          id: `spot_${Date.now()}`,
          order: spotlights.length + 1,
          lastUpdated: new Date().toISOString()
        };
        setSpotlights(prev => [...prev, newSpot]);
      }
      setLoading(false);
      setIsModalOpen(false);
    }, 800);
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    const newSpotlights = [...spotlights];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSpotlights.length) return;

    [newSpotlights[index], newSpotlights[targetIndex]] = [newSpotlights[targetIndex], newSpotlights[index]];
    
    // Update order property
    const updated = newSpotlights.map((s, i) => ({ ...s, order: i + 1 }));
    setSpotlights(updated);
  };

  const togglePin = (id: string) => {
    setSpotlights(prev => prev.map(s => s.id === id ? { ...s, isPinned: !s.isPinned } : s));
  };

  const getStatusBadge = (status: SpotlightStatus) => {
    switch (status) {
      case 'Published': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Draft': return 'bg-slate-100 text-slate-500 border-slate-200';
      case 'Scheduled': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  if (loading && spotlights.length === 0) {
    return (
      <AdminLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <LoadingSpinner />
          <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Assembling Spotlight Deck...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="editorial-title text-3xl text-slate-900 tracking-tight">Spotlight Management</h1>
          <p className="text-slate-500 text-sm mt-1">Curate high-impact visual stories for TechPalava's premium slots</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border rounded-lg transition-all flex items-center ${autoRotate ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200 text-slate-400'}`}
          >
            <svg className={`w-4 h-4 mr-2 ${autoRotate ? 'animate-spin-slow' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Auto-Rotation: {autoRotate ? 'ON' : 'OFF'}
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-black transition-all shadow-lg shadow-slate-900/10 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            Create New Spotlight
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-6">
        {spotlights.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-20 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Spotlight Items Found</h3>
            <p className="text-slate-500 max-w-xs mx-auto mt-2 mb-6">Start by creating a feature story for the homepage hero or the dedicated spotlight page.</p>
            <button onClick={() => handleOpenModal()} className="px-6 py-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-blue-700 transition-all">Add First Spotlight</button>
          </div>
        ) : (
          <div className="space-y-4">
            {spotlights.map((spot, index) => (
              <div key={spot.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row group relative">
                {/* Drag/Order Indicator */}
                <div className="bg-slate-50/50 w-12 flex flex-col items-center justify-center border-r border-slate-100 space-y-2">
                  <button 
                    disabled={index === 0}
                    onClick={() => moveOrder(index, 'up')}
                    className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-0 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
                  </button>
                  <span className="text-[10px] font-black text-slate-300 font-mono">0{index + 1}</span>
                  <button 
                    disabled={index === spotlights.length - 1}
                    onClick={() => moveOrder(index, 'down')}
                    className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-0 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                </div>

                {/* Thumbnail */}
                <div className="w-full md:w-64 aspect-video md:aspect-auto h-48 md:h-auto overflow-hidden relative">
                  <img src={spot.imageUrl} alt={spot.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 flex space-x-2">
                    <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[8px] font-black uppercase tracking-widest rounded">
                      {spot.type}
                    </span>
                    {spot.isPinned && (
                      <span className="px-2 py-0.5 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded flex items-center">
                        <svg className="w-2.5 h-2.5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>
                        Pinned
                      </span>
                    )}
                  </div>
                </div>

                {/* Info Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border ${getStatusBadge(spot.status)}`}>
                        {spot.status}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Last edited {spot.lastUpdated.split(' ')[0]}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => handleOpenModal(spot)}>
                      {spot.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">
                      {spot.personName} <span className="text-slate-300 mx-1">•</span> {spot.role}
                    </p>
                    <p className="text-xs text-slate-400 mt-3 line-clamp-1 italic">
                      {spot.summary}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                        {spot.placement}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => togglePin(spot.id)}
                        className={`p-2 rounded-lg transition-all ${spot.isPinned ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:bg-slate-50'}`}
                        title={spot.isPinned ? "Unpin from top" : "Pin to top"}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                      </button>
                      <button 
                        onClick={() => {
                          setEditingSpotlight(spot);
                          setIsPreviewOpen(true);
                        }}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        title="Live Preview"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                      <button 
                        onClick={() => handleOpenModal(spot)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit Spotlight"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button 
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Entry"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <div>
                <h2 className="editorial-title text-2xl text-slate-900">
                  {editingSpotlight?.id ? 'Edit Spotlight Entry' : 'New Spotlight Feature'}
                </h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Story ID: {editingSpotlight?.id || 'NEW_RECORD'}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
              {validationError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start text-red-700 animate-in slide-in-from-top-4 duration-300">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <p className="text-sm font-medium">{validationError}</p>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Side: Editorial Content */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Primary Headline</label>
                    <input 
                      type="text"
                      className="w-full text-2xl editorial-title border-b border-slate-200 focus:border-blue-500 transition-colors py-2 outline-none"
                      placeholder="The Vision Behind..."
                      value={editingSpotlight?.title}
                      onChange={(e) => setEditingSpotlight(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subject Name</label>
                      <input 
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500/10 outline-none"
                        placeholder="John Doe"
                        value={editingSpotlight?.personName}
                        onChange={(e) => setEditingSpotlight(prev => ({ ...prev, personName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Current Role / Title</label>
                      <input 
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/10 outline-none"
                        placeholder="Founder, Acme Corp"
                        value={editingSpotlight?.role}
                        onChange={(e) => setEditingSpotlight(prev => ({ ...prev, role: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Editorial Summary (Short Teaser)</label>
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/10 outline-none h-32 resize-none"
                      placeholder="Write a compelling 2-sentence summary for the card view..."
                      value={editingSpotlight?.summary}
                      onChange={(e) => setEditingSpotlight(prev => ({ ...prev, summary: e.target.value }))}
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Spotlight Type</label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                        value={editingSpotlight?.type}
                        onChange={(e) => setEditingSpotlight(prev => ({ ...prev, type: e.target.value as any }))}
                      >
                        <option value="Feature">Feature Story</option>
                        <option value="Interview">One-on-One Interview</option>
                        <option value="Founder">Founder Spotlight</option>
                        <option value="Innovator">Innovator Circle</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Placement</label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                        value={editingSpotlight?.placement}
                        onChange={(e) => setEditingSpotlight(prev => ({ ...prev, placement: e.target.value as any }))}
                      >
                        <option value="Both">Homepage & Spotlight Page</option>
                        <option value="Homepage Hero">Homepage Hero Only</option>
                        <option value="Spotlight Page">Spotlight Page Only</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Right Side: Visuals & Settings */}
                <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex justify-between">
                      Hero Image
                      <span className="text-blue-500">1920x1080px (Required)</span>
                    </label>
                    {editingSpotlight?.imageUrl ? (
                      <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-100 group">
                        <img src={editingSpotlight.imageUrl} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                          <button className="px-4 py-2 bg-white text-slate-900 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:scale-105 transition-all">Replace Image</button>
                          <button onClick={() => setEditingSpotlight(prev => ({ ...prev, imageUrl: '' }))} className="p-2 bg-red-600 text-white rounded-lg hover:scale-105 transition-all">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group"
                        onClick={() => setEditingSpotlight(prev => ({ ...prev, imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200' }))}
                      >
                        <svg className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600">Click to Upload Banner</p>
                      </div>
                    )}
                  </div>

                  <div className="p-6 bg-slate-900 rounded-3xl text-white">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Publishing Control</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300">Status</span>
                        <div className="flex bg-slate-800 p-1 rounded-xl">
                          {(['Draft', 'Published', 'Scheduled'] as SpotlightStatus[]).map(s => (
                            <button 
                              key={s}
                              onClick={() => setEditingSpotlight(prev => ({ ...prev, status: s }))}
                              className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${editingSpotlight?.status === s ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <label className="flex items-center space-x-3 cursor-pointer group">
                          <div className="relative">
                            <input 
                              type="checkbox" 
                              className="sr-only" 
                              checked={editingSpotlight?.isPinned}
                              onChange={(e) => setEditingSpotlight(prev => ({ ...prev, isPinned: e.target.checked }))}
                            />
                            <div className={`w-10 h-5 rounded-full transition-colors ${editingSpotlight?.isPinned ? 'bg-blue-600' : 'bg-slate-700'}`}></div>
                            <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform ${editingSpotlight?.isPinned ? 'translate-x-5' : ''}`}></div>
                          </div>
                          <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">Pin to top of list</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center sticky bottom-0 z-20">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
              >
                Discard Changes
              </button>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setIsPreviewOpen(true)}
                  className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all shadow-sm"
                >
                  Full Preview
                </button>
                <button 
                  onClick={handleSave}
                  className="px-10 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-900/20 active:scale-95"
                >
                  {editingSpotlight?.id ? 'Update Spotlight' : 'Publish Story'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          <div className="fixed inset-0 bg-slate-950 flex flex-col">
            {/* Preview Toolbar */}
            <div className="h-16 bg-slate-900 px-6 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-4">
                <span className="bg-emerald-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse">Live Preview Mode</span>
                <span className="text-slate-500 text-xs">Simulating Frontend Homepage Hero</span>
              </div>
              <button onClick={() => setIsPreviewOpen(false)} className="px-4 py-2 bg-slate-800 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-slate-700 transition-all">Exit Preview</button>
            </div>

            {/* Simulated Frontend Hero Component */}
            <div className="flex-1 bg-white relative overflow-hidden flex items-center">
              {/* Background Layer */}
              <div className="absolute inset-0 z-0">
                <img src={editingSpotlight?.imageUrl} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
              </div>

              {/* Content Layer */}
              <div className="relative z-10 max-w-7xl mx-auto px-20 w-full text-white">
                <div className="max-w-2xl space-y-6">
                  <div className="flex items-center space-x-3">
                    <span className="w-12 h-0.5 bg-blue-500"></span>
                    <span className="text-blue-500 font-black uppercase text-xs tracking-[0.3em]">{editingSpotlight?.type} SPOTLIGHT</span>
                  </div>
                  <h1 className="editorial-title text-7xl leading-none">{editingSpotlight?.title}</h1>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-white/20 flex items-center justify-center">
                      <span className="font-bold text-xs">{editingSpotlight?.personName?.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="font-bold text-xl">{editingSpotlight?.personName}</p>
                      <p className="text-slate-400 uppercase text-[10px] font-bold tracking-widest mt-0.5">{editingSpotlight?.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-200 text-lg font-medium leading-relaxed max-w-xl">
                    "{editingSpotlight?.summary}"
                  </p>
                  <div className="pt-8 flex space-x-4">
                    <button className="px-10 py-5 bg-blue-600 text-white font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/40">Read the Story</button>
                    <button className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 font-black uppercase text-xs tracking-widest hover:bg-white/20 transition-all">Watch Interview</button>
                  </div>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="absolute bottom-12 right-20 flex space-x-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`w-3 h-3 rounded-full border-2 border-white/40 ${i === 1 ? 'bg-white' : ''}`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default SpotlightManagement;
