
import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserAccount, UserRole, UserStatus, SYSTEM_PERMISSIONS, ROLE_CAPABILITIES } from '../types';

const MOCK_USERS: UserAccount[] = [
  {
    id: 'usr_1',
    name: 'Editor Admin',
    email: 'admin@techpalava.com',
    role: 'Super Admin',
    status: 'Active',
    lastLogin: '2024-03-24 14:30',
    dateCreated: '2023-01-15',
    avatar: 'EA'
  },
  {
    id: 'usr_2',
    name: 'Sarah Jenkins',
    email: 's.jenkins@techpalava.com',
    role: 'Editor',
    status: 'Active',
    lastLogin: '2024-03-24 09:15',
    dateCreated: '2023-03-10',
    avatar: 'SJ'
  },
  {
    id: 'usr_3',
    name: 'Michael Chen',
    email: 'm.chen@techpalava.com',
    role: 'Contributor',
    status: 'Active',
    lastLogin: '2024-03-21 16:45',
    dateCreated: '2023-08-22',
    avatar: 'MC'
  },
  {
    id: 'usr_4',
    name: 'Elena Vance',
    email: 'e.vance@techpalava.com',
    role: 'Business',
    status: 'Suspended',
    lastLogin: '2024-03-15 11:00',
    dateCreated: '2023-11-05',
    failedAttempts: 3,
    avatar: 'EV'
  },
  {
    id: 'usr_5',
    name: 'David Rodriguez',
    email: 'd.rodriguez@techpalava.com',
    role: 'Analyst',
    status: 'Active',
    lastLogin: '2024-03-23 20:20',
    dateCreated: '2024-01-20',
    avatar: 'DR'
  }
];

const UserManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'directory' | 'roles'>('directory');
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<UserAccount> | null>(null);
  const [isConfirmingAction, setIsConfirmingAction] = useState<{ type: 'suspend' | 'delete' | 'promote', userId: string } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(MOCK_USERS);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenModal = (user?: UserAccount) => {
    setEditingUser(user || {
      name: '',
      email: '',
      role: 'Contributor',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Suspended': return 'bg-rose-50 text-rose-700 border-rose-100';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'Super Admin': return 'bg-slate-900 text-white shadow-lg';
      case 'Editor-in-Chief': return 'bg-indigo-600 text-white';
      case 'Editor': return 'bg-blue-600 text-white';
      case 'Contributor': return 'bg-slate-100 text-slate-600';
      case 'Business': return 'bg-amber-500 text-white';
      case 'Analyst': return 'bg-teal-500 text-white';
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const confirmAction = () => {
    if (!isConfirmingAction) return;
    const { type, userId } = isConfirmingAction;
    
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        if (type === 'suspend') return { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return u;
    }));
    
    if (type === 'delete') {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }

    setIsConfirmingAction(null);
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
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <h1 className="editorial-title text-4xl text-slate-900 tracking-tight">Identity & Access</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage internal newsroom roles and system accountability</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-900/10 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
          Invite Member
        </button>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl w-fit mb-8">
        <button 
          onClick={() => setViewMode('directory')}
          className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'directory' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          User Directory
        </button>
        <button 
          onClick={() => setViewMode('roles')}
          className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'roles' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Role Permissions Matrix
        </button>
      </div>

      {viewMode === 'directory' ? (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center">
            <div className="relative flex-grow min-w-[280px]">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
              <input 
                type="text" 
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="h-10 w-px bg-slate-100 mx-2 hidden lg:block"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing {filteredUsers.length} active personnel</p>
          </div>

          {/* User List Table */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-200">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Details</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Login</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                          {user.avatar}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{user.name}</h4>
                          <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${getRoleBadge(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-xs text-slate-600 font-medium">{user.lastLogin}</p>
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-0.5">Created {user.dateCreated}</p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-center">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${getStatusBadge(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleOpenModal(user)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit User"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button 
                          onClick={() => setIsConfirmingAction({ type: 'suspend', userId: user.id })}
                          className={`p-2 rounded-lg transition-all ${user.status === 'Suspended' ? 'text-emerald-600 hover:bg-emerald-50' : 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'}`}
                          title={user.status === 'Active' ? 'Suspend Account' : 'Reactivate Account'}
                        >
                          {user.status === 'Active' ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          )}
                        </button>
                        <button 
                          onClick={() => setIsConfirmingAction({ type: 'delete', userId: user.id })}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          title="Delete User"
                        >
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
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-slate-100">
             <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">RBAC Control Matrix</h3>
             <p className="text-xs text-slate-500 font-medium">Visual representation of role-based access control across the TechPalava platform.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-200">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest w-64">Permission</th>
                  {(Object.keys(ROLE_CAPABILITIES) as UserRole[]).map(role => (
                    <th key={role} className="px-6 py-5 text-[9px] font-black text-slate-900 uppercase tracking-widest text-center whitespace-nowrap">
                      {role}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SYSTEM_PERMISSIONS.map((perm) => (
                  <tr key={perm.key} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 leading-tight">{perm.label}</span>
                        <span className="text-[10px] font-medium text-slate-400 mt-1">{perm.description}</span>
                      </div>
                    </td>
                    {(Object.keys(ROLE_CAPABILITIES) as UserRole[]).map(role => {
                      const hasAccess = ROLE_CAPABILITIES[role].includes(perm.key);
                      return (
                        <td key={role} className="px-6 py-6 text-center">
                          <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center transition-all ${hasAccess ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-100 text-slate-300'}`}>
                            {hasAccess ? (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                            ) : (
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l18 18" /></svg>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-10 bg-slate-900 text-white flex justify-between items-center">
             <div>
               <p className="text-sm font-bold">Standardized Policy Compliance</p>
               <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Audit log records all role modifications</p>
             </div>
             <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/20 transition-all">
               Print Configuration
             </button>
          </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-xl rounded-[2rem] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <div>
                <h2 className="editorial-title text-2xl text-slate-900">
                  {editingUser?.id ? 'Edit Team Member' : 'Invite New Personnel'}
                </h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Personnel ID: {editingUser?.id || 'AUTH_NEW'}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" /></svg>
              </button>
            </div>

            <div className="p-10 space-y-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Legal Name</label>
                <input 
                  type="text"
                  className="w-full text-xl font-bold border-b border-slate-200 focus:border-blue-500 transition-colors py-2 outline-none"
                  placeholder="e.g. Jean Doe"
                  value={editingUser?.name}
                  onChange={(e) => setEditingUser(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Corporate Email Address</label>
                <input 
                  type="email"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/10 outline-none"
                  placeholder="name@techpalava.com"
                  value={editingUser?.email}
                  onChange={(e) => setEditingUser(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Newsroom Role</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                    value={editingUser?.role}
                    onChange={(e) => setEditingUser(prev => ({ ...prev, role: e.target.value as any }))}
                  >
                    {(Object.keys(ROLE_CAPABILITIES) as UserRole[]).map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Initial Status</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                    value={editingUser?.status}
                    onChange={(e) => setEditingUser(prev => ({ ...prev, status: e.target.value as any }))}
                  >
                    <option value="Active">Active Access</option>
                    <option value="Suspended">Suspended / Frozen</option>
                  </select>
                </div>
              </div>

              {editingUser?.role === 'Super Admin' && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start text-rose-800 animate-in shake-in-1 duration-300">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1">Privilege Escalation Warning</p>
                    <p className="text-[10px] font-medium leading-relaxed">Super Admin role grants full read/write access to all system data including financial partner records and user management. Proceed with extreme caution.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center sticky bottom-0 z-20">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
              >
                Discard
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-10 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-900/20 active:scale-95"
              >
                {editingUser?.id ? 'Update Credentials' : 'Send Invite Link'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL */}
      {isConfirmingAction && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setIsConfirmingAction(null)}></div>
          <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-center p-10">
            <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6 ${isConfirmingAction.type === 'delete' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
              {isConfirmingAction.type === 'delete' ? (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              ) : (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Are you absolutely sure?</h3>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              This action {isConfirmingAction.type === 'delete' ? 'permanently removes' : 'modifies the access for'} this user. This decision will be logged for security audits.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setIsConfirmingAction(null)}
                className="py-3 bg-slate-100 text-slate-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={confirmAction}
                className={`py-3 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-xl transition-all ${isConfirmingAction.type === 'delete' ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20' : 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'}`}
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default UserManagement;
