
import React from 'react';

interface AdminGenericModuleProps {
  title: string;
  description: string;
  icon: string;
}

const AdminGenericModule: React.FC<AdminGenericModuleProps> = ({ title, description, icon }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm text-center">
        <div className="w-20 h-20 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-4xl mb-6 shadow-inner">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {title}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-10 px-6 font-medium leading-relaxed">
          {description}. This module is currently under development. Our engineering team is finalizing the data models for this interface.
        </p>
        <div className="flex gap-4">
           <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95">
             Refresh Data
           </button>
           <button className="px-6 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-bold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-gray-100 dark:border-gray-700 active:scale-95">
             View Documentation
           </button>
        </div>
      </div>
    </div>
  );
};

export default AdminGenericModule;
