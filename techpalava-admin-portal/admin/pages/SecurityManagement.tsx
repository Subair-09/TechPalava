
import React, { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';

const SecurityManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const toggle2FA = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTwoFactorEnabled(!twoFactorEnabled);
    }, 800);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto pb-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="editorial-title text-4xl text-slate-900 tracking-tight">Security & Governance</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">Manage cryptographic keys, authentication protocols, and access logs</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Main Credentials */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm overflow-hidden">
             <div className="flex items-center space-x-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Core Authentication</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Adjust your primary access keys</p>
                </div>
             </div>

             <div className="space-y-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                   <div>
                      <p className="text-sm font-bold text-slate-900">Personnel Password</p>
                      <p className="text-xs text-slate-500 mt-1">Last rotated 42 days ago. Minimum 12 characters required.</p>
                   </div>
                   <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-100 transition-all shadow-sm">
                      Rotate Password
                   </button>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-slate-900 rounded-3xl shadow-xl shadow-slate-900/20 text-white">
                   <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${twoFactorEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></div>
                      <div>
                        <p className="text-sm font-bold">Multi-Factor Authentication (2FA)</p>
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">State: {twoFactorEnabled ? 'ENFORCED' : 'DISABLED'}</p>
                      </div>
                   </div>
                   <button 
                    onClick={toggle2FA}
                    disabled={loading}
                    className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${twoFactorEnabled ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20'}`}
                   >
                     {loading ? <LoadingSpinner /> : (twoFactorEnabled ? 'Revoke Protocol' : 'Initialize 2FA')}
                   </button>
                </div>
             </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-10 border-b border-slate-100 bg-slate-50/30">
               <h3 className="text-lg font-bold text-slate-900">Session Registry</h3>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Active cryptographic identifiers for your account</p>
            </div>
            <div className="divide-y divide-slate-100">
               {[
                 { device: 'MacBook Pro 14 (Sonoma)', location: 'Lagos, NG', ip: '197.210.64.12', current: true },
                 { device: 'iPhone 15 Pro', location: 'London, UK', ip: '82.12.24.101', current: false }
               ].map((session, i) => (
                 <div key={i} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center space-x-6">
                       <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={session.device.includes('iPhone') ? "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" : "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"} />
                          </svg>
                       </div>
                       <div>
                          <div className="flex items-center space-x-3">
                             <p className="text-sm font-bold text-slate-900">{session.device}</p>
                             {session.current && <span className="bg-emerald-100 text-emerald-700 text-[8px] font-black uppercase px-2 py-0.5 rounded-full">Primary</span>}
                          </div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{session.location} • {session.ip}</p>
                       </div>
                    </div>
                    {!session.current && (
                      <button className="text-[10px] font-black text-rose-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity hover:underline">
                        Purge Session
                      </button>
                    )}
                 </div>
               ))}
            </div>
            <div className="p-8 bg-slate-50 flex justify-end">
               <button className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-rose-600 transition-colors">Terminate All Foreign Sessions</button>
            </div>
          </div>

          {/* Audit Logs */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-10 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Integrity Audit Trail</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Last 50 administrative and security events</p>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="bg-slate-50/50">
                      <tr>
                         <th className="px-10 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Horizon</th>
                         <th className="px-10 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Event Classifier</th>
                         <th className="px-10 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Origin Point</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {[
                        { time: '2024-03-25 09:12:04', event: 'Successful Login (OAuth)', origin: 'Lagos, NG (Chrome/MacOS)' },
                        { time: '2024-03-24 18:42:12', event: 'API Key Rotation: PROD_CATALOG', origin: 'System Automated' },
                        { time: '2024-03-22 14:30:55', event: 'Permission Elevation: Article_Archive', origin: 'Self Triggered' }
                      ].map((log, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                           <td className="px-10 py-5 text-xs font-mono text-slate-400 uppercase">{log.time}</td>
                           <td className="px-10 py-5 text-sm font-bold text-slate-700">{log.event}</td>
                           <td className="px-10 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.origin}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SecurityManagement;
