
import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { TechEvent, EventType, EventStatus, EventSource } from '../types';

const MOCK_EVENTS: TechEvent[] = [
  {
    id: 'evt_1',
    title: 'Global AI Summit 2024',
    summary: 'The world\'s premier gathering for AI innovators.',
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
    title: 'React Ecosystem Meetup',
    summary: 'Deep dive into the future of React and Server Components.',
    description: 'A community-led event focused on the latest framework updates...',
    type: 'Meetup',
    organizer: 'Lagos React Group',
    registrationUrl: 'https://meetup.com/lagos-react',
    location: 'Lagos, Nigeria',
    isVirtual: false,
    startDate: '2024-04-12',
    endDate: '2024-04-12',
    timezone: 'WAT',
    bannerUrl: 'https://images.unsplash.com/photo-1591115765373-520b7a3d7294?auto=format&fit=crop&q=80&w=1200',
    status: 'Scheduled',
    isFeatured: false,
    isSponsored: true,
    lastUpdated: '2024-03-21 14:00',
    source: 'Partner'
  }
];

const EventsManagement: React.FC = () => {
  const [events, setEvents] = useState<TechEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Partial<TechEvent> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingEvent(prev => ({ ...prev, bannerUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const getStatusBadge = (status: EventStatus) => {
    switch (status) {
      case 'Published': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Scheduled': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'Draft': return 'bg-slate-100 text-slate-500 border-slate-200';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

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
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="editorial-title text-4xl text-slate-900 tracking-tight">Events Management</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Curate and schedule global tech gatherings</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-8 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-900/10 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" /></svg>
          Schedule New Event
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Upcoming Registry', value: events.length, color: 'text-slate-900' },
          { label: 'Partner Keynotes', value: events.filter(e => e.isSponsored).length, color: 'text-amber-600' },
          { label: 'Published Events', value: events.filter(e => e.status === 'Published').length, color: 'text-emerald-600' },
          { label: 'Featured Active', value: events.filter(e => e.isFeatured).length, color: 'text-blue-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-200">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest w-1/3">Event Entity</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type / Organizer</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timeline</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Lifecycle</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                        <img src={evt.bannerUrl} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate text-base" onClick={() => handleOpenModal(evt)}>{evt.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          {evt.isFeatured && <span className="bg-blue-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest shadow-sm">Home Featured</span>}
                          <span className="text-[10px] font-bold text-slate-400 uppercase truncate">{evt.location}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{evt.type}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{evt.organizer}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900">{evt.startDate}</span>
                      <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tighter uppercase mt-0.5">ZONE: {evt.timezone}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getStatusBadge(evt.status)}`}>
                        {evt.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => handleOpenModal(evt)} className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Modify Event">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" title="Archive Registry">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-5xl max-h-[95vh] rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <div>
                <h2 className="editorial-title text-2xl text-slate-900">{editingEvent?.id ? 'Adjust Global Tech Event' : 'Curate New Calendar Entry'}</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Registry Entry: {editingEvent?.id || 'AUTH_NEW'}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" /></svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-12 space-y-12 no-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <section className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Public Event Headline</label>
                      <input 
                        type="text"
                        className="w-full text-3xl editorial-title border-b border-slate-200 focus:border-blue-500 transition-colors py-2 outline-none"
                        placeholder="e.g. AI Horizons Summit"
                        value={editingEvent?.title}
                        onChange={(e) => setEditingEvent(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Organizer Brand</label>
                        <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none" value={editingEvent?.organizer} onChange={(e) => setEditingEvent(prev => ({ ...prev, organizer: e.target.value }))} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Physical/Digital Locality</label>
                        <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" value={editingEvent?.location} onChange={(e) => setEditingEvent(prev => ({ ...prev, location: e.target.value }))} />
                      </div>
                    </div>
                  </section>

                  <section className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Registration Link (CTA URL)</label>
                      <input 
                        type="url"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/10"
                        placeholder="https://eventbrite.com/e/your-event-id"
                        value={editingEvent?.registrationUrl}
                        onChange={(e) => setEditingEvent(prev => ({ ...prev, registrationUrl: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Event Brief (Summary)</label>
                      <textarea 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm focus:ring-4 focus:ring-blue-500/5 outline-none h-40 resize-none font-medium text-slate-600 leading-relaxed"
                        placeholder="High-level description for the main index..."
                        value={editingEvent?.summary}
                        onChange={(e) => setEditingEvent(prev => ({ ...prev, summary: e.target.value }))}
                      ></textarea>
                    </div>
                  </section>
                </div>

                <div className="space-y-10">
                  <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-8 flex items-center">
                      <span className="w-1 h-4 bg-emerald-500 mr-2 rounded-full"></span>
                      Calendar Logistics
                    </h3>
                    <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Registry Lifecycle</label>
                          <select className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-xs font-bold text-white outline-none" value={editingEvent?.status} onChange={(e) => setEditingEvent(prev => ({ ...prev, status: e.target.value as any }))}>
                            <option value="Draft">Internal Draft</option>
                            <option value="Published">Live Registry</option>
                            <option value="Scheduled">Scheduled</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Event Classification</label>
                          <select className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-xs font-bold text-white outline-none" value={editingEvent?.type} onChange={(e) => setEditingEvent(prev => ({ ...prev, type: e.target.value as any }))}>
                            <option value="Conference">Conference</option>
                            <option value="Meetup">Community Meetup</option>
                            <option value="Webinar">Digital Webinar</option>
                            <option value="Product Launch">Product Launch</option>
                            <option value="Hackathon">Hackathon</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                         <div>
                          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Start Horizon</label>
                          <input type="date" className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-xs font-bold text-white outline-none" value={editingEvent?.startDate} onChange={(e) => setEditingEvent(prev => ({ ...prev, startDate: e.target.value }))} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Primary Timezone</label>
                          <input type="text" className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-xs font-bold text-white outline-none" value={editingEvent?.timezone} placeholder="e.g. UTC, PST" onChange={(e) => setEditingEvent(prev => ({ ...prev, timezone: e.target.value }))} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex justify-between items-center">
                      Key Visual (Banner)
                      {editingEvent?.bannerUrl && (
                        <button 
                          onClick={() => setEditingEvent(prev => ({ ...prev, bannerUrl: '' }))}
                          className="text-[9px] font-black text-rose-500 uppercase tracking-widest hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </label>
                    <div 
                      className={`w-full aspect-[2/1] rounded-[1.5rem] border-2 border-dashed transition-all overflow-hidden relative group flex flex-col items-center justify-center cursor-pointer ${editingEvent?.bannerUrl ? 'border-slate-100 bg-white' : 'border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-white'}`}
                      onClick={triggerFileUpload}
                    >
                      {editingEvent?.bannerUrl ? (
                        <>
                          <img src={editingEvent.bannerUrl} className="w-full h-full object-cover" alt="" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <span className="bg-white text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Replace Visual</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-6">
                           <svg className="w-10 h-10 text-slate-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Click to Upload Banner</p>
                        </div>
                      )}
                    </div>
                    <p className="text-[9px] text-slate-400 italic mt-3 text-center">Recommended 16:9 Aspect Ratio (e.g. 1280x720)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 bg-slate-50 border-t border-slate-100 flex justify-between items-center sticky bottom-0 z-20">
              <button onClick={() => setIsModalOpen(false)} className="px-10 py-4 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Discard</button>
              <button onClick={() => setIsModalOpen(false)} className="px-16 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-black transition-all shadow-2xl shadow-slate-900/20 active:scale-95">Finalize Registry Entry</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default EventsManagement;
