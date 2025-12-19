
import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserAccount, UserRole, UserStatus, SYSTEM_PERMISSIONS, ROLE_CAPABILITIES } from '../types';

const MOCK_USERS: UserAccount[] = [
  { id: 'usr_1', name: 'Editor Admin', email: 'admin@techpalava.com', role: 'Super Admin', status: 'Active', lastLogin: '2024-03-24 14:30', dateCreated: '2023-01-15', avatar: 'EA' },
  { id: 'usr_2', name: 'Sarah Jenkins', email: 's.jenkins@techpalava.com', role: 'Editor-in-Chief', status: 'Active', lastLogin: '2024-03-24 09:15', dateCreated: '2023-03-10', avatar: 'SJ' },
  { id: 'usr_3', name: 'Elena Vance', email: 'e.vance@techpalava.com', role: 'Business', status: 'Suspended', lastLogin: '2024-03-15 11:00', dateCreated: '2023-11-05', avatar: 'EV' },
];

const UserManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'directory' | 'roles'>('directory');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<UserAccount> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenModal = (user?: UserAccount) => {
    setEditingUser(user || { name: '', email: '', role: 'Editor', status: 'Active' });
    setIsModalOpen(true);
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'Super Admin': return 'bg-slate-900 text-white shadow-lg';
      case 'Editor-in-Chief': return 'bg-indigo-600 text-white';
      case 'Editor': return 'bg-blue-600 text-white';
      case 'Business': return 'bg-amber-500 text-white';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
          <LoadingSpinner />
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Synchronizing User Permissions...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <h1 className="editorial-title text-4xl text-slate-900 tracking-tight">Identity & Access</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage newsroom personnel and security accountability</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-8 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-900/10 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
          Invite Personnel
        </button>
      </div>

      <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl w-fit mb-10">
        <button 
          onClick={() => setView('directory')}
          className={`px-8 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${view === 'directory' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Personnel Directory
        </button>
        <button 
          onClick={() => setView('roles')}
          className={`px-8 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${view === 'roles' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          RBAC Matrix
        </button>
      </div>

      {view === 'directory' ? (
        <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-200">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Team Member</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Login</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_USERS.map(user => (
                <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-bold text-[10px] uppercase">{user.avatar}</div>
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{user.name}</h4>
                        <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-2.5 py-1 rounded text-[8px] font-black uppercase tracking-widest ${getRoleBadge(user.role)}`}>{user.role}</span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs text-slate-600 font-medium">{user.lastLogin}</p>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1">Ref ID: {user.id}</p>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>{user.status}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button onClick={() => handleOpenModal(user)} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-200">
                <tr>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest w-64">Policy Permission</th>
                  {(Object.keys(ROLE_CAPABILITIES) as UserRole[]).map(r => (
                    <th key={r} className="px-4 py-6 text-[9px] font-black text-slate-900 uppercase tracking-widest text-center whitespace-nowrap">{r}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SYSTEM_PERMISSIONS.map(p => (
                  <tr key={p.key} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-slate-900 leading-tight block">{p.label}</span>
                      <span className="text-[10px] font-medium text-slate-400 mt-1">{p.description}</span>
                    </td>
                    {(Object.keys(ROLE_CAPABILITIES) as UserRole[]).map(r => (
                      <td key={r} className="px-4 py-6 text-center">
                         <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center transition-all ${ROLE_CAPABILITIES[r].includes(p.key) ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-100 text-slate-300'}`}>
                           {ROLE_CAPABILITIES[r].includes(p.key) && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>}
                         </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <div>
                <h2 className="editorial-title text-2xl text-slate-900">Personnel Profile</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Identity: {editingUser?.id || 'AUTH_NEW'}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" /></svg>
              </button>
            </div>
            <div className="p-10 space-y-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Legal Name</label>
                  <input type="text" className="w-full text-xl font-bold border-b border-slate-200 focus:border-blue-500 py-2 outline-none" value={editingUser?.name} onChange={e => setEditingUser(p => ({...p, name: e.target.value}))} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Corporate Email</label>
                  <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/10 outline-none" value={editingUser?.email} onChange={e => setEditingUser(p => ({...p, email: e.target.value}))} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Policy Role</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none" value={editingUser?.role} onChange={e => setEditingUser(p => ({...p, role: e.target.value as any}))}>
                      {(Object.keys(ROLE_CAPABILITIES) as UserRole[]).map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Lifecycle State</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none" value={editingUser?.status} onChange={e => setEditingUser(p => ({...p, status: e.target.value as any}))}>
                      <option value="Active">Authorized / Active</option>
                      <option value="Suspended">Suspended / Frozen</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center sticky bottom-0">
              <button onClick={() => setIsModalOpen(false)} className="px-8 py-3 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Discard</button>
              <button onClick={() => setIsModalOpen(false)} className="px-10 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-900/20 active:scale-95">Verify & Save</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default UserManagement;
