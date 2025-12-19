
import React, { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  group: 'content' | 'system' | 'stats';
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', group: 'content', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
  { id: 'news', label: 'News', group: 'content', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /></svg> },
  { id: 'analysis', label: 'Analysis', group: 'content', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
  { id: 'jobs', label: 'Jobs', group: 'content', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
  { id: 'events', label: 'Events', group: 'content', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
  { id: 'spotlight', label: 'Spotlight', group: 'content', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg> },
  { id: 'inbox', label: 'Inbox', group: 'stats', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg> },
  { id: 'analytics', label: 'Analytics', group: 'stats', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg> },
  { id: 'advertise', label: 'Advertise', group: 'system', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg> },
  { id: 'users', label: 'Users', group: 'system', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
  { id: 'settings', label: 'Settings', group: 'system', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  { id: 'audit', label: 'Audit Logs', group: 'system', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  activeModule: string;
  onModuleChange: (id: string) => void;
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeModule, onModuleChange, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const groups = [
    { id: 'content', label: 'Management' },
    { id: 'stats', label: 'Reporting' },
    { id: 'system', label: 'System' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* 1️⃣ Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r-2 border-gray-200 dark:border-gray-800 transition-all duration-300 z-50 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="h-20 flex items-center px-6 border-b-2 border-gray-100 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-blue-600 font-serif-heading">TP</span>
            {!isCollapsed && <span className="text-sm font-bold tracking-tight uppercase dark:text-white">Admin Console</span>}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar py-6 px-3">
          {groups.map((group) => (
            <div key={group.id} className="mb-8">
              {!isCollapsed && (
                <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                  {group.label}
                </p>
              )}
              <div className="space-y-1">
                {NAV_ITEMS.filter(item => item.group === group.id).map(item => (
                  <button
                    key={item.id}
                    onClick={() => onModuleChange(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all group relative ${
                      activeModule === item.id 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className={`${activeModule === item.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform shrink-0`}>
                      {item.icon}
                    </span>
                    {!isCollapsed && <span>{item.label}</span>}
                    {isCollapsed && (
                      <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl">
                        {item.label}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t-2 border-gray-100 dark:border-gray-800 shrink-0">
          <button 
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all ${isCollapsed ? 'justify-center' : ''}`}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* 2️⃣ Top Bar & 3️⃣ Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <header className="h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b-2 border-gray-100 dark:border-gray-800 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              {NAV_ITEMS.find(i => i.id === activeModule)?.label || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" placeholder="Global search..." className="bg-transparent border-none focus:outline-none text-xs font-bold w-48" />
            </div>

            <div className="flex items-center gap-3 pl-6 border-l-2 border-gray-100 dark:border-gray-800">
               <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black dark:text-white uppercase tracking-tighter">Admin User</p>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">TechPalava Editor</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm border-2 border-gray-100 dark:border-gray-800">
                AU
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
