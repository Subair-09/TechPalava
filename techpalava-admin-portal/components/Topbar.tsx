
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface TopbarProps {
  sidebarCollapsed: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ sidebarCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Derive page title from path
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop() || 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
  };

  const handleLogout = () => {
    navigate('/admin/login');
  };

  return (
    <header 
      className={`fixed top-0 right-0 h-16 bg-white border-b border-slate-200 z-40 transition-all duration-300 ease-in-out flex items-center justify-between px-8 ${sidebarCollapsed ? 'left-20' : 'left-64'}`}
    >
      {/* Page Title / Breadcrumb */}
      <div className="flex items-center space-x-3">
        <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">Admin</span>
        <svg className="w-3 h-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        <h2 className="text-slate-900 font-bold text-lg tracking-tight">{getPageTitle()}</h2>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-lg">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity focus:outline-none"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 leading-none">Editor Admin</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Senior Editor</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
              <span className="text-slate-500 font-bold text-xs uppercase">EA</span>
            </div>
            <svg className={`w-4 h-4 text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowProfileMenu(false)}
              ></div>
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 z-20 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <svg className="w-4 h-4 mr-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  Your Profile
                </button>
                <div className="h-px bg-slate-100 my-1"></div>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center font-medium"
                  onClick={handleLogout}
                >
                  <svg className="w-4 h-4 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  Log out
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
