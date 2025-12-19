
import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { TechEvent, EventType, EventStatus, EventSource } from '../types';

const MOCK_EVENTS: TechEvent[] = [
  {
    id: 'evt_1',
    title: 'Global AI Summit 2024',
    summary: 'The world\'s premier gathering for AI innovators and ethical researchers.',
    description: 'Join us for three days of intensive workshops, keynote speeches from industry leaders...',
    type: 'Conference',
    organizer: 'TechPalava Global',
    registrationUrl: 'https://aisummit.techpalava.com',
    location: 'San Francisco, CA',
    isVirtual: false,
    startDate: '2024-06-15',
    endDate: '2024-06-17',
    timezone: 'PST',
    bannerUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
    status: 'Published',
    isFeatured: true,
    isSponsored: false,
    lastUpdated: '2024-03-20 12:00',
    source: 'Internal'
  },
  {
    id: 'evt_2',
    title: 'Future of Fintech Webinar',
    summary: 'Exploring the intersection of blockchain and traditional banking.',
    description: 'A deep dive into how digital assets are reshaping global commerce.',
    type: 'Webinar',
    organizer: 'Stripe Partners',
    registrationUrl: 'https://webinar.stripe.com/fintech',
    location: 'Online',
    isVirtual: true,
    startDate: '2024-04-10',
    endDate: '2024-04-10',
    timezone: 'EST',
    bannerUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    status: 'Scheduled',
    isFeatured: false,
    isSponsored: true,
    lastUpdated: '2024-03-18 15:30',
    source: 'Partner'
  },
  {
    id: 'evt_3',
    title: 'React Native Lagos Meetup',
    summary: 'Monthly gathering for mobile developers in the heart of Lagos.',
    description: 'Come network and share your latest projects with the local tech community.',
    type: 'Meetup',
    organizer: 'Lagos Dev Community',
    registrationUrl: 'https://meetup.com/react-native-lagos',
    location: 'Lagos, Nigeria',
    isVirtual: false,
    startDate: '2024-03-28',
    endDate: '2024-03-28',
    timezone: 'WAT',
    bannerUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200',
    status: 'Published',
    isFeatured: false,
    isSponsored: false,
    lastUpdated: '2024-03-21 10:00',
    source: 'Public'
  },
  {
    id: 'evt_4',
    title: 'Apple Product Launch Fall 2023',
    summary: 'Archived launch event for the iPhone 15 series.',
    description: 'Wonderlust. Re-watch the unveiling of the latest innovations from Cupertino.',
    type: 'Product Launch',
    organizer: 'Apple Inc.',
    registrationUrl: 'https://apple.com/events',
    location: 'Cupertino, CA',
    isVirtual: true,
    startDate: '2023-09-12',
    endDate: '2023-09-12',
    timezone: 'PST',
    bannerUrl: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&q=80&w=1200',
    status: 'Ended',
    isFeatured: false,
    isSponsored: false,
    lastUpdated: '2023-09-13 09:00',
    source: 'Internal'
  }
];

const EventsManagement: React.FC = () => {
  const [events, setEvents] = useState<TechEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<EventStatus | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Partial<TechEvent> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents(MOCK_EVENTS);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenModal = (event?: TechEvent) => {
    setEditingEvent(event || {
      title: '',
      summary: '',
      description: '',
      type: 'Conference',
      organizer: '',
      registrationUrl: '',
      location: '',
      isVirtual: false,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      timezone: 'UTC',
      bannerUrl: '',
      status: 'Draft',
      isFeatured: false,
      isSponsored: false,
      source: 'Internal'
    });
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: EventStatus) => {
    switch (status) {
      case 'Published': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Scheduled': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'Ended': return 'bg-slate-100 text-slate-500 border-slate-200';
      case 'Draft': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         e.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <LoadingSpinner />
          <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Syncing Calendar Data...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="editorial-title text-3xl text-slate-900 tracking-tight">Events Management</h1>
          <p className="text-slate-500 text-sm mt-1">Curate and schedule global tech gatherings</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-black transition-all shadow-lg shadow-slate-900/10 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          Create New Event
        </button>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Upcoming Events</p>
          <p className="text-2xl font-bold text-slate-900">{events.filter(e => e.status !== 'Ended').length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending Review</p>
          <p className="text-2xl font-bold text-amber-600">{events.filter(e => e.source === 'Public' && e.status === 'Draft').length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Featured Slots</p>
          <p className="text-2xl font-bold text-blue-600">{events.filter(e => e.isFeatured).length} / 4</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Partner Events</p>
          <p className="text-2xl font-bold text-indigo-600">{events.filter(e => e.isSponsored).length}</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-grow min-w-[240px]">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input 
            type="text" 
            placeholder="Search events, organizers..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select 
          className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
        >
          <option value="All">All Status</option>
          <option value="Published">Published</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Ended">Ended</option>
          <option value="Draft">Drafts</option>
        </select>
      </div>

      {/* Events Grid/List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-20 text-center flex flex-col items-center">
            <svg className="w-12 h-12 text-slate-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No events found in this category</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Event Detail</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type / Organizer</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date / Timezone</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEvents.map((event) => (
                  <tr key={event.id} className={`hover:bg-slate-50/50 transition-colors group ${event.status === 'Ended' ? 'opacity-60' : ''}`}>
                    <td className="px-6 py-4 max-w-sm">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                          <img src={event.bannerUrl} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate cursor-pointer" onClick={() => handleOpenModal(event)}>
                            {event.title}
                          </h4>
                          <div className="flex items-center space-x-2 mt-0.5">
                            {event.isFeatured && <span className="text-[8px] font-black uppercase tracking-tighter bg-blue-600 text-white px-1.5 py-0.5 rounded">Featured</span>}
                            {event.isSponsored && <span className="text-[8px] font-black uppercase tracking-tighter bg-amber-500 text-white px-1.5 py-0.5 rounded">Sponsored</span>}
                            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700">{event.type}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{event.organizer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700">{event.startDate}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">TZ: {event.timezone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${getStatusBadge(event.status)}`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button 
                          onClick={() => handleOpenModal(event)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit Event"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Delete Event">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT EVENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-4xl max-h-[95vh] rounded-[2rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <div>
                <h2 className="editorial-title text-2xl text-slate-900">
                  {editingEvent?.id ? 'Edit Event Details' : 'Curate New Tech Event'}
                </h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Event ID: {editingEvent?.id || 'NEW_EVENT'}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" /></svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-10 no-scrollbar space-y-10">
              {/* Internal Notes notice if Partner/Public source */}
              {editingEvent?.source !== 'Internal' && (
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-start text-indigo-800">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <div>
                    <p className="text-sm font-bold">External Submission Review</p>
                    <p className="text-xs">Source: {editingEvent?.source}. Please verify the registration link and organizer credentials.</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Side: General Info */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Event Title</label>
                    <input 
                      type="text"
                      className="w-full text-2xl editorial-title border-b border-slate-200 focus:border-blue-500 transition-colors py-2 outline-none"
                      placeholder="e.g. NextGen Hardware Expo"
                      value={editingEvent?.title}
                      onChange={(e) => setEditingEvent(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Organizer Name</label>
                      <input 
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                        placeholder="e.g. Google Developers"
                        value={editingEvent?.organizer}
                        onChange={(e) => setEditingEvent(prev => ({ ...prev, organizer: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Event Type</label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                        value={editingEvent?.type}
                        onChange={(e) => setEditingEvent(prev => ({ ...prev, type: e.target.value as any }))}
                      >
                        <option value="Conference">Conference</option>
                        <option value="Webinar">Webinar</option>
                        <option value="Meetup">Meetup</option>
                        <option value="Product Launch">Product Launch</option>
                        <option value="Hackathon">Hackathon</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Short Summary</label>
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none h-20 resize-none"
                      placeholder="A punchy one-liner for the events feed..."
                      value={editingEvent?.summary}
                      onChange={(e) => setEditingEvent(prev => ({ ...prev, summary: e.target.value }))}
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Location / Platform</label>
                      <input 
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none"
                        placeholder="e.g. Zoom / San Jose, CA"
                        value={editingEvent?.location}
                        onChange={(e) => setEditingEvent(prev => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Registration Link</label>
                      <input 
                        type="url"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none"
                        placeholder="https://..."
                        value={editingEvent?.registrationUrl}
                        onChange={(e) => setEditingEvent(prev => ({ ...prev, registrationUrl: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Start Date</label>
                      <input 
                        type="date"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs outline-none"
                        value={editingEvent?.startDate}
                        onChange={(e) => setEditingEvent(prev => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">End Date</label>
                      <input 
                        type="date"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs outline-none"
                        value={editingEvent?.endDate}
                        onChange={(e) => setEditingEvent(prev => ({ ...prev, endDate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Timezone</label>
                      <input 
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold outline-none"
                        placeholder="PST / UTC"
                        value={editingEvent?.timezone}
                        onChange={(e) => setEditingEvent(prev => ({ ...prev, timezone: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side: Media & Controls */}
                <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex justify-between">
                      Event Banner
                      <span className="text-blue-500">16:9 Aspect Ratio</span>
                    </label>
                    {editingEvent?.bannerUrl ? (
                      <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-100 group shadow-lg">
                        <img src={editingEvent.bannerUrl} className="w-full h-full object-cover" alt="" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            className="bg-white text-slate-900 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all"
                            onClick={() => setEditingEvent(prev => ({ ...prev, bannerUrl: '' }))}
                          >
                            Replace Media
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="aspect-video bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all"
                        onClick={() => setEditingEvent(prev => ({ ...prev, bannerUrl: 'https://images.unsplash.com/photo-1540575861501-7ad060e39fe5?auto=format&fit=crop&q=80&w=1200' }))}
                      >
                        <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Key Visual</p>
                      </div>
                    )}
                  </div>

                  <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Promotion & Visibility</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Workflow Status</span>
                        <div className="flex bg-slate-800 p-1 rounded-xl">
                          {(['Draft', 'Published', 'Scheduled'] as EventStatus[]).map(s => (
                            <button 
                              key={s}
                              onClick={() => setEditingEvent(prev => ({ ...prev, status: s }))}
                              className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${editingEvent?.status === s ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 pt-2">
                        <label className="flex items-center space-x-3 cursor-pointer group">
                          <div className="relative">
                            <input 
                              type="checkbox" 
                              className="sr-only" 
                              checked={editingEvent?.isFeatured}
                              onChange={(e) => setEditingEvent(prev => ({ ...prev, isFeatured: e.target.checked }))}
                            />
                            <div className={`w-10 h-5 rounded-full transition-colors ${editingEvent?.isFeatured ? 'bg-blue-600' : 'bg-slate-700'}`}></div>
                            <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform ${editingEvent?.isFeatured ? 'translate-x-5' : ''}`}></div>
                          </div>
                          <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">Feature on Events Homepage</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer group">
                          <div className="relative">
                            <input 
                              type="checkbox" 
                              className="sr-only" 
                              checked={editingEvent?.isSponsored}
                              onChange={(e) => setEditingEvent(prev => ({ ...prev, isSponsored: e.target.checked }))}
                            />
                            <div className={`w-10 h-5 rounded-full transition-colors ${editingEvent?.isSponsored ? 'bg-amber-500' : 'bg-slate-700'}`}></div>
                            <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform ${editingEvent?.isSponsored ? 'translate-x-5' : ''}`}></div>
                          </div>
                          <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">Mark as Sponsored / Partner Event</span>
                        </label>
                      </div>

                      <div className="pt-4 border-t border-slate-800">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Internal Notes</label>
                        <textarea 
                          className="w-full bg-slate-800 border-none rounded-2xl p-4 text-xs font-medium text-slate-300 outline-none h-24 resize-none"
                          placeholder="Editorial notes for internal teams..."
                          value={editingEvent?.internalNotes}
                          onChange={(e) => setEditingEvent(prev => ({ ...prev, internalNotes: e.target.value }))}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center sticky bottom-0 z-20">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
              >
                Discard Draft
              </button>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-10 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-900/20 active:scale-95"
                >
                  {editingEvent?.id ? 'Update Event Record' : 'Publish to Newsroom'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default EventsManagement;
