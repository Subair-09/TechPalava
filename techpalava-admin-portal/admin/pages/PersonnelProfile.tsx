
import React, { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';

const PersonnelProfile: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Editor Admin',
    email: 'admin@techpalava.com',
    role: 'Global Controller',
    bio: 'Lead administrative architect for TechPalava Media Group. Specializing in editorial workflows, global talent recruitment, and structural taxonomy design.',
    location: 'Lagos, Nigeria (Remote / Global)',
    joined: 'January 2023',
    articlesCount: 124,
    reachCount: '2.4M',
    twitter: '@techpalava_hq',
    website: 'techpalava.com'
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEditing(false);
    }, 1000);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="editorial-title text-4xl text-slate-900 tracking-tight">Personnel Profile</h1>
            <p className="text-slate-500 text-sm mt-1 font-medium italic">Internal identity and editorial performance registry</p>
          </div>
          <button 
            onClick={() => editing ? handleSave() : setEditing(true)}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl flex items-center ${editing ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/10' : 'bg-slate-900 text-white hover:bg-black shadow-slate-900/10'}`}
          >
            {loading ? <LoadingSpinner /> : (editing ? 'Save Changes' : 'Adjust Profile')}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Identity Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 text-center shadow-sm">
               <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-3xl bg-slate-900 flex items-center justify-center text-white text-4xl font-black shadow-2xl border-4 border-white">
                    EA
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 text-white rounded-2xl flex items-center justify-center border-4 border-white hover:scale-110 transition-transform">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </button>
               </div>
               <h2 className="editorial-title text-2xl text-slate-900 leading-tight">{profile.name}</h2>
               <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">{profile.role}</p>
               
               <div className="mt-8 pt-8 border-t border-slate-50 space-y-4 text-left">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Personnel Email</p>
                    <p className="text-sm font-bold text-slate-700">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Locality</p>
                    <p className="text-sm font-bold text-slate-700">{profile.location}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Registry Since</p>
                    <p className="text-sm font-bold text-slate-700">{profile.joined}</p>
                  </div>
               </div>
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-2xl flex items-center justify-between group cursor-pointer hover:bg-slate-950 transition-all">
               <div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Public Portfolio</p>
                  <p className="text-sm font-bold">techpalava.com/authors/admin</p>
               </div>
               <svg className="w-5 h-5 text-slate-600 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio & Details */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Personnel Biography</h3>
               {editing ? (
                 <textarea 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 text-sm font-medium text-slate-600 outline-none h-48 focus:ring-4 focus:ring-blue-500/5 transition-all leading-relaxed"
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                 />
               ) : (
                 <p className="text-lg text-slate-600 leading-relaxed font-serif">
                   "{profile.bio}"
                 </p>
               )}

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 pt-10 border-t border-slate-50">
                  <div>
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Personnel Twitter</label>
                    <input 
                      type="text" 
                      disabled={!editing}
                      className={`w-full text-sm font-bold outline-none ${editing ? 'bg-slate-50 border-b border-slate-200 py-2 text-slate-900' : 'bg-transparent text-blue-600'}`}
                      value={profile.twitter}
                      onChange={(e) => setProfile(prev => ({ ...prev, twitter: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Domain</label>
                    <input 
                      type="text" 
                      disabled={!editing}
                      className={`w-full text-sm font-bold outline-none ${editing ? 'bg-slate-50 border-b border-slate-200 py-2 text-slate-900' : 'bg-transparent text-slate-700'}`}
                      value={profile.website}
                      onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>
               </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-2 gap-6">
               <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM7 8h5M7 12h8M7 16h8" /></svg>
                    </div>
                    <span className="text-[10px] font-black text-emerald-600 uppercase">+12%</span>
                  </div>
                  <p className="text-3xl font-black text-slate-900">{profile.articlesCount}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Registry Manuscripts</p>
               </div>
               <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </div>
                    <span className="text-[10px] font-black text-emerald-600 uppercase">+4%</span>
                  </div>
                  <p className="text-3xl font-black text-slate-900">{profile.reachCount}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Narrative Reach</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PersonnelProfile;
