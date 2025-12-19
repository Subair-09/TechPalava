
import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';

type SettingsTab = 'general' | 'branding' | 'editorial' | 'monetization' | 'seo' | 'integrations' | 'advanced';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Simulated settings state
  const [settings, setSettings] = useState({
    siteName: 'TechPalava',
    tagline: 'Global Technology Journalism & Media',
    language: 'English (US)',
    timezone: 'UTC +0',
    maintenanceMode: false,
    primaryColor: '#2563eb',
    accentColor: '#0f172a',
    maxFeaturedArticles: 5,
    requireEditorReview: true,
    jobPriceBase: 199,
    jobPriceFeatured: 299,
    currency: 'USD',
    metaTitleTemplate: '{{title}} | TechPalava',
    metaDescription: 'The latest in global technology news, analysis, and innovator spotlights.',
    emailNotifications: true,
    googleAnalyticsId: 'G-XXXXXXXXXX',
    newsletterProvider: 'Substack',
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setHasChanges(true);
  };

  const saveChanges = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setHasChanges(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  const navItems: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { id: 'general', label: 'General Platform', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
    { id: 'branding', label: 'Branding & Identity', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg> },
    { id: 'editorial', label: 'Editorial Rules', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> },
    { id: 'monetization', label: 'Monetization', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { id: 'seo', label: 'SEO & Metadata', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> },
    { id: 'integrations', label: 'Integrations', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
    { id: 'advanced', label: 'Advanced Safety', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
          <LoadingSpinner />
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Loading System Configuration...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row gap-8 pb-20">
        {/* Left Side: Category Navigation */}
        <aside className="lg:w-72 flex-shrink-0">
          <div className="sticky top-24 space-y-1">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">System Settings</h2>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10' 
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span className="text-sm font-bold">{item.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Right Side: Tab Content */}
        <main className="flex-1 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
          <div className="p-10 flex-1">
            {activeTab === 'general' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h3 className="editorial-title text-3xl text-slate-900 mb-2">General Platform</h3>
                  <p className="text-sm text-slate-500">Global defaults for the TechPalava public interface.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Site Name</label>
                    <input 
                      type="text" 
                      name="siteName"
                      value={settings.siteName}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/10"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Site Tagline</label>
                    <input 
                      type="text" 
                      name="tagline"
                      value={settings.tagline}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/10"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">System Language</label>
                    <select 
                      name="language"
                      value={settings.language}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                    >
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>French</option>
                      <option>Spanish</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Global Timezone</label>
                    <select 
                      name="timezone"
                      value={settings.timezone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                    >
                      <option>UTC +0</option>
                      <option>PST (UTC -8)</option>
                      <option>EST (UTC -5)</option>
                      <option>WAT (UTC +1)</option>
                    </select>
                  </div>
                </div>

                <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Maintenance Mode</p>
                      <p className="text-xs text-slate-500 font-medium">When enabled, the public site will show a maintenance notice.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onChange={handleInputChange}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'branding' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h3 className="editorial-title text-3xl text-slate-900 mb-2">Branding & Identity</h3>
                  <p className="text-sm text-slate-500">Visual elements that define the TechPalava experience.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Site Logo (Primary)</label>
                      <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center bg-slate-50 group hover:border-blue-400 hover:bg-white transition-all cursor-pointer">
                        <h1 className="editorial-title text-3xl tracking-tighter text-slate-900 mb-4">
                          Tech<span className="text-blue-600">Palava</span>
                        </h1>
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-blue-600 group-hover:border-blue-200 transition-all">Upload New Logo</button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Favicon</label>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl shadow-sm">
                          T
                        </div>
                        <button className="text-xs font-bold text-blue-600 hover:underline">Change Icon (32x32)</button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Visual Theme (Core)</h4>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-700">Brand Primary</span>
                          <div className="flex items-center space-x-3">
                            <span className="text-xs font-mono text-slate-400">#2563EB</span>
                            <div className="w-10 h-10 rounded-xl shadow-inner border border-white/20 bg-blue-600 cursor-pointer"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-700">Accent Deep</span>
                          <div className="flex items-center space-x-3">
                            <span className="text-xs font-mono text-slate-400">#0F172A</span>
                            <div className="w-10 h-10 rounded-xl shadow-inner border border-white/20 bg-slate-900 cursor-pointer"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-xl">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Footer Credit</p>
                      <textarea 
                        className="w-full bg-slate-800 border-none rounded-2xl p-4 text-xs font-medium text-slate-300 outline-none h-24 resize-none"
                        defaultValue="Global technology journalism covering the intersection of innovation and humanity."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'monetization' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h3 className="editorial-title text-3xl text-slate-900 mb-2">Monetization & Pricing</h3>
                  <p className="text-sm text-slate-500">Configure revenue streams and business defaults.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-slate-50 p-8 rounded-3xl space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jobs Board Pricing</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-slate-700">Standard Post (30 Days)</label>
                        <div className="flex items-center">
                          <span className="text-slate-400 mr-2">$</span>
                          <input 
                            type="number" 
                            name="jobPriceBase"
                            value={settings.jobPriceBase}
                            onChange={handleInputChange}
                            className="w-20 bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold text-center outline-none" 
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-slate-700">Featured Add-on</label>
                        <div className="flex items-center">
                          <span className="text-slate-400 mr-2">$</span>
                          <input 
                            type="number" 
                            name="jobPriceFeatured"
                            value={settings.jobPriceFeatured}
                            onChange={handleInputChange}
                            className="w-20 bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold text-center outline-none" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-8 rounded-3xl space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Currency</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-2">Display Currency</label>
                        <select 
                          name="currency"
                          value={settings.currency}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="NGN">NGN (₦)</option>
                        </select>
                      </div>
                    </div>
                    <div className="p-4 bg-amber-100/50 rounded-2xl border border-amber-200 flex items-start text-amber-900">
                      <svg className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <p className="text-[10px] font-medium italic">Currency changes affect frontend displays immediately. It does not auto-convert existing database records.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h3 className="editorial-title text-3xl text-slate-900 mb-2 text-rose-600">Advanced Safety Controls</h3>
                  <p className="text-sm text-slate-500">Critical system overrides and safety configurations.</p>
                </div>

                <div className="space-y-6">
                  <div className="p-8 border-2 border-rose-100 bg-rose-50/30 rounded-[2.5rem] space-y-6">
                    <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Data & Deletion Integrity</h4>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-slate-900">Enforce Soft-Deletion</p>
                          <p className="text-xs text-slate-500">Deleted articles are moved to Trash instead of being permanently removed.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked className="sr-only peer" readOnly />
                          <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-slate-900">Audit Logging</p>
                          <p className="text-xs text-slate-500">Track every administrative action for security auditing.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked className="sr-only peer" readOnly />
                          <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-bold">Factory System Reset</h4>
                      <p className="text-xs text-slate-500 mt-1 uppercase font-black tracking-widest">Danger Zone: Irreversible Action</p>
                    </div>
                    <button className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-rose-600/20">
                      Request System Wipe
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Fallback for other tabs */}
            {!['general', 'branding', 'monetization', 'advanced'].includes(activeTab) && (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-30 animate-in fade-in duration-300">
                <svg className="w-16 h-16 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
                <h3 className="text-xl font-bold uppercase tracking-widest">Configuration module ready</h3>
                <p className="text-sm font-medium mt-2">Section: {activeTab.toUpperCase()}</p>
              </div>
            )}
          </div>

          {/* Sticky Action Footer */}
          <div className={`p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center transition-all ${hasChanges ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <p className="text-xs font-bold text-slate-400 italic">You have unsaved configuration changes.</p>
            <div className="flex space-x-3">
              <button 
                onClick={() => setHasChanges(false)}
                className="px-6 py-2.5 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600"
              >
                Discard
              </button>
              <button 
                onClick={saveChanges}
                disabled={saving}
                className="px-10 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-900/20 flex items-center"
              >
                {saving ? (
                  <>
                    <LoadingSpinner />
                    <span className="ml-2">Updating...</span>
                  </>
                ) : 'Deploy Changes'}
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-10 right-10 z-[300] bg-slate-900 text-white px-8 py-4 rounded-[2rem] shadow-2xl flex items-center space-x-4 animate-in slide-in-from-bottom-10 duration-500">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          </div>
          <div>
            <p className="text-sm font-bold">System synchronized</p>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Configuration deployed globally</p>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminSettings;
