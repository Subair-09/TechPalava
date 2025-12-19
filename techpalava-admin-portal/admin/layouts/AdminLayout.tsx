
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
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
      />
      
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out relative ${isSidebarCollapsed ? 'pl-20' : 'pl-64'}`}
      >
        <Topbar sidebarCollapsed={isSidebarCollapsed} />
        
        {/* Main scrollable area */}
        <main className="flex-1 overflow-y-auto pt-16 no-scrollbar">
          <div className="p-8 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
            {children}
            
            {/* Added extra padding at bottom to ensure no content is cut off by viewport edge */}
            <div className="h-20 w-full flex-shrink-0" aria-hidden="true" />
          </div>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}} />
    </div>
  );
};

export default AdminLayout;
