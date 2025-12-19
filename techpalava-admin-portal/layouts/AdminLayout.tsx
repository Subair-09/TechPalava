
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Auto-collapse sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Init

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
      />
      
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'pl-20' : 'pl-64'}`}
      >
        <Topbar sidebarCollapsed={isSidebarCollapsed} />
        
        <main className="flex-1 mt-16 p-8 overflow-y-auto min-h-[calc(100vh-64px)]">
          <div className="max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
