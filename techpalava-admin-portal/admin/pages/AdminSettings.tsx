
import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';

type SettingsTab = 'general' | 'branding' | 'monetization' | 'editorial' | 'safety';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [settings, setSettings] = useState({
    siteName: 'TechPalava',
    tagline: 'Global Technology Journalism & Media',
    language: 'English (US)',
    maintenanceMode: false,
    jobPriceBase: 199,
    jobPriceFeatured: 299,
    currency: 'USD',
    auditLogging: true,
    enforceReview: true
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setHasChanges(true);
  };

  const handleDeploy = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setHasChanges(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  const tabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { id: 'general', label: 'Platform Basics', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
    { id: 'branding', label: 'Identity & Theme', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg> },
    { id: 'monetization', label: 'Commercial Tier', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { id: 'editorial', label: 'Governance', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> },
    { id: 'safety', label: 'Advanced Safety', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
          <LoadingSpinner />
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Opening System Vault...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row gap-8 pb-20 relative">
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-1">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">System Settings</h2>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === t.id ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10' : 'text-slate-500 hover:bg-slate-100'}`}>
                {t.icon} <span className="text-sm font-bold">{t.label}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
          <div className="p-10 flex-1">
            {activeTab === 'general' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
                <div><h3 className="editorial-title text-3xl text-slate-900 mb-2">Platform Basics</h3><p className="text-sm text-slate-500">Define the global identity of TechPalava public interface.</p></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div><label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Brand Name</label><input type="text" name="siteName" value={settings.siteName} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 outline-none" /></div>
                  <div><label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Brand Tagline</label><input type="text" name="tagline" value={settings.tagline} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 outline-none" /></div>
                </div>
                <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-between">
                  <div className="flex items-center space-x-4"><div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div><div><p className="text-sm font-bold text-slate-900">Maintenance Mode</p><p className="text-xs text-slate-500 font-medium italic">Broadcast internal policy notice to visitors</p></div></div>
                  <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleInputChange} className="sr-only peer" /><div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-amber-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div></label>
                </div>
              </div>
            )}

            {activeTab === 'monetization' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
                <div><h3 className="editorial-title text-3xl text-slate-900 mb-2">Commercial Tier</h3><p className="text-sm text-slate-500">Configure global commercial pricing and revenue defaults.</p></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-slate-50 p-8 rounded-3xl space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jobs Board Pricing</h4>
                    <div className="flex items-center justify-between"><label className="text-sm font-bold text-slate-700">Base Listing</label><div className="flex items-center"><span className="text-slate-400 mr-2">$</span><input type="number" name="jobPriceBase" value={settings.jobPriceBase} onChange={handleInputChange} className="w-20 bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold text-center outline-none" /></div></div>
                    <div className="flex items-center justify-between"><label className="text-sm font-bold text-slate-700">Featured Placement</label><div className="flex items-center"><span className="text-slate-400 mr-2">$</span><input type="number" name="jobPriceFeatured" value={settings.jobPriceFeatured} onChange={handleInputChange} className="w-20 bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold text-center outline-none" /></div></div>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-3xl space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Currency</h4>
                    <div><label className="block text-[10px] font-bold text-slate-500 mb-2">Active ISO</label><select name="currency" value={settings.currency} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none"><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option><option value="NGN">NGN (₦)</option></select></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'safety' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
                <div><h3 className="editorial-title text-3xl text-rose-600 mb-2">Advanced Safety</h3><p className="text-sm text-slate-500">Security protocols and system integrity controls.</p></div>
                <div className="space-y-6">
                   <div className="p-8 border-2 border-rose-100 bg-rose-50/30 rounded-[2.5rem] space-y-6">
                      <div className="flex items-center justify-between"><div><p className="text-sm font-bold text-slate-900">Cryptographic Audit Logging</p><p className="text-xs text-slate-500">Record every administrative action with immutable timestamping.</p></div><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" name="auditLogging" checked={settings.auditLogging} onChange={handleInputChange} className="sr-only peer" /><div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div></label></div>
                   </div>
                   <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white flex justify-between items-center"><div><h4 className="text-lg font-bold">Factory State Restoration</h4><p className="text-xs text-slate-500 mt-1 uppercase font-black tracking-widest">Wipe all non-article system data</p></div><button className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-rose-600/20">Init Reset</button></div>
                </div>
              </div>
            )}

            {/* Fallback placeholder for other tabs */}
            {!['general', 'monetization', 'safety'].includes(activeTab) && (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-30 animate-in fade-in duration-300"><svg className="w-16 h-16 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg><h3 className="text-xl font-bold uppercase tracking-widest">Policy module online</h3><p className="text-sm font-medium mt-2">Section: {activeTab.toUpperCase()}</p></div>
            )}
          </div>

          <div className={`p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center transition-all ${hasChanges ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <p className="text-xs font-bold text-slate-400 italic">Policy modifications pending deployment.</p>
            <div className="flex space-x-3">
              <button onClick={() => setHasChanges(false)} className="px-6 py-2.5 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600">Revert</button>
              <button onClick={handleDeploy} disabled={saving} className="px-10 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-900/20 flex items-center">{saving ? <><LoadingSpinner /><span className="ml-2">Deploying...</span></> : 'Commit Changes'}</button>
            </div>
          </div>
        </main>
      </div>

      {showToast && (
        <div className="fixed bottom-10 right-10 z-[300] bg-slate-900 text-white px-8 py-4 rounded-[2rem] shadow-2xl flex items-center space-x-4 animate-in slide-in-from-bottom-10 duration-500">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center"><svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
          <div><p className="text-sm font-bold">System synchronized</p><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Configuration deployed globally</p></div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminSettings;
