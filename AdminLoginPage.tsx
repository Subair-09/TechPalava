
import React, { useState } from 'react';

interface AdminLoginPageProps {
  onLogin: () => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      onLogin();
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-4xl font-black text-blue-600 font-serif-heading">TP</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Admin Portal</h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-[0.2em] mt-2">Secure Newsroom Management</p>
        </div>

        <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-10 shadow-2xl transition-all">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Administrator Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all text-sm font-bold"
                placeholder="admin@techpalava.media"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all text-sm font-bold"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-600 transition-colors">Remember device</span>
              </label>
              <a href="#" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Reset access</a>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-950 dark:bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-black dark:hover:bg-blue-700 transition-all shadow-xl uppercase text-xs tracking-[0.2em] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Authenticate'}
            </button>
          </form>
        </div>

        <div className="mt-10 text-center">
          <a href="#" className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] hover:text-blue-600 transition-colors">
            ← Return to Public Site
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
