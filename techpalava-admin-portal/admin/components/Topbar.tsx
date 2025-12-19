
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface TopbarProps {
  sidebarCollapsed: boolean;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'content' | 'system' | 'business' | 'security';
  isRead: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'New Content Wire',
    description: 'Alex Rivera submitted "Future of Carbon Capture" for review.',
    time: '2m ago',
    type: 'content',
    isRead: false
  },
  {
    id: '2',
    title: 'Security Alert',
    description: 'A successful login was recorded from a new IP in Lagos, NG.',
    time: '45m ago',
    type: 'security',
    isRead: false
  },
  {
    id: '3',
    title: 'Listing Expired',
    description: 'The "Staff Rust Engineer" role for Entropy Labs has ended.',
    time: '3h ago',
    type: 'business',
    isRead: true
  },
  {
    id: '4',
    title: 'System Registry',
    description: 'Weekly database optimization completed successfully.',
    time: '1d ago',
    type: 'system',
    isRead: true
  }
];

const Topbar: React.FC<TopbarProps> = ({ sidebarCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  // Derive page title from path
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop() || 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
  };

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'content': return <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /></svg></div>;
      case 'business': return <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745" /></svg></div>;
      case 'security': return <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>;
      default: return <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg></div>;
    }
  };

  return (
    <header 
      className={`fixed top-0 right-0 h-16 bg-white border-b border-slate-200 z-40 transition-all duration-300 ease-in-out flex items-center justify-between px-8 ${sidebarCollapsed ? 'left-20' : 'left-64'}`}
    >
      {/* Page Title / Breadcrumb */}
      <div className="flex items-center space-x-3">
        <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Platform</span>
        <svg className="w-3 h-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        <h2 className="text-slate-900 font-bold text-lg tracking-tight">{getPageTitle()}</h2>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-4 lg:space-x-8">
        
        {/* Notifications Hub */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className={`relative p-2 rounded-xl transition-all duration-200 focus:outline-none ${showNotifications ? 'bg-blue-50 text-blue-600 shadow-inner' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white ring-4 ring-blue-500/10"></span>
            )}
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)}></div>
              <div className="absolute right-0 mt-3 w-96 bg-white rounded-[2rem] shadow-2xl border border-slate-100 z-20 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                   <div>
                     <h3 className="font-bold text-slate-900 tracking-tight">Activity Wire</h3>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{unreadCount} unread dispatches</p>
                   </div>
                   <button 
                    onClick={markAllRead}
                    className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors"
                   >
                     Mark all as read
                   </button>
                </div>
                
                <div className="max-h-[400px] overflow-y-auto no-scrollbar py-2">
                  {notifications.map(n => (
                    <div 
                      key={n.id} 
                      className={`px-6 py-4 hover:bg-slate-50 transition-colors flex items-start space-x-4 cursor-pointer relative group ${!n.isRead ? 'bg-blue-50/20' : ''}`}
                    >
                      {!n.isRead && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full"></div>}
                      <div className="flex-shrink-0 mt-1">
                        {getTypeIcon(n.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className={`text-xs uppercase font-black tracking-widest ${!n.isRead ? 'text-slate-900' : 'text-slate-400'}`}>{n.title}</p>
                          <span className="text-[9px] font-bold text-slate-300">{n.time}</span>
                        </div>
                        <p className={`text-xs leading-relaxed line-clamp-2 ${!n.isRead ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>{n.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-slate-50 bg-slate-50/50">
                   <button 
                    onClick={() => { navigate('/admin/submissions'); setShowNotifications(false); }}
                    className="w-full py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm"
                   >
                     Open Triage Console
                   </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Identity */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center space-x-4 hover:opacity-80 transition-opacity focus:outline-none p-1 rounded-xl"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 leading-tight">Editor Admin</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Global Controller</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden shadow-lg shadow-slate-900/10 border-2 border-white">
              <span className="text-white font-black text-xs uppercase">EA</span>
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowProfileMenu(false)}
              ></div>
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 z-20 py-2 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-50 mb-1">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Identity</p>
                   <p className="text-xs font-bold text-slate-900 truncate mt-0.5 tracking-tight">admin@techpalava.com</p>
                </div>
                <button 
                  className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center transition-colors"
                  onClick={() => { navigate('/admin/profile'); setShowProfileMenu(false); }}
                >
                  <svg className="w-4 h-4 mr-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  Personnel Profile
                </button>
                <button 
                  className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center transition-colors"
                  onClick={() => { navigate('/admin/security'); setShowProfileMenu(false); }}
                >
                  <svg className="w-4 h-4 mr-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  Security Key Management
                </button>
                <div className="h-px bg-slate-50 my-1"></div>
                <button 
                  className="w-full text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-rose-600 hover:bg-rose-50 flex items-center transition-colors group"
                  onClick={handleLogout}
                >
                  <svg className="w-4 h-4 mr-3 text-rose-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  Terminate Session
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
