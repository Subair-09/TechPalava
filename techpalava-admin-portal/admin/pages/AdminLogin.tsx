
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import LoadingSpinner from '../components/LoadingSpinner';
import { AuthState, LoginFormData } from '../types';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [status, setStatus] = useState<AuthState>(AuthState.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const performLogin = (email: string, pass: string) => {
    setStatus(AuthState.LOADING);
    setErrorMessage(null);

    // Simulate API authentication call
    setTimeout(() => {
      if (email === 'admin@techpalava.com' && pass === 'password123') {
        setStatus(AuthState.SUCCESS);
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 800);
      } else {
        setStatus(AuthState.ERROR);
        setErrorMessage('Invalid credentials. Please check your email and password.');
      }
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLogin(formData.email, formData.password);
  };

  const handleDemoLogin = () => {
    const demoEmail = 'admin@techpalava.com';
    const demoPass = 'password123';
    
    // Visual feedback of filling
    setFormData(prev => ({ ...prev, email: demoEmail, password: demoPass }));
    
    // Short delay before submitting for better UX
    setTimeout(() => {
      performLogin(demoEmail, demoPass);
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md">
        {/* Layout: Centered Login Card */}
        <div className="bg-white p-10 rounded-xl shadow-2xl border border-slate-100 transition-all duration-300">
          <div className="mb-10 text-center">
            <Logo />
            <h2 className="mt-6 text-xl font-bold text-slate-800 tracking-tight">Admin Login</h2>
            <p className="text-slate-500 text-sm mt-1">Sign in to manage TechPalava content</p>
          </div>

          {/* Authentication Feedback States: Error */}
          {status === AuthState.ERROR && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">
                    {errorMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Authentication Feedback States: Success */}
          {status === AuthState.SUCCESS && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-md animate-pulse">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700 font-medium">
                    Authentication successful. Redirecting...
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={status === AuthState.LOADING || status === AuthState.SUCCESS}
                className="block w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50 disabled:opacity-50"
                placeholder="editor@techpalava.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-bold text-slate-700 uppercase tracking-widest">
                  Password
                </label>
                <button 
                  type="button" 
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  onClick={() => alert("Password reset workflow triggered for authorized users.")}
                >
                  Forgot password?
                </button>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={status === AuthState.LOADING || status === AuthState.SUCCESS}
                className="block w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50 disabled:opacity-50"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                disabled={status === AuthState.LOADING || status === AuthState.SUCCESS}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer disabled:opacity-50"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-600 cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={status === AuthState.LOADING || status === AuthState.SUCCESS}
              className={`w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white uppercase tracking-widest transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30 ${
                status === AuthState.LOADING || status === AuthState.SUCCESS
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-slate-900 hover:bg-black active:scale-[0.98]'
              }`}
            >
              {status === AuthState.LOADING ? (
                <>
                  <LoadingSpinner />
                  Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Quick Access Helper */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <button 
              onClick={handleDemoLogin}
              disabled={status === AuthState.LOADING || status === AuthState.SUCCESS}
              className="text-xs font-medium text-slate-400 hover:text-blue-600 transition-colors disabled:opacity-50"
            >
              Try with <span className="font-bold underline">demo account</span>
            </button>
          </div>
        </div>

        {/* Minimal Footer (Internal Only) */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} TechPalava Media Group. <br/>
            Internal administration system. Unauthorized access prohibited.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
