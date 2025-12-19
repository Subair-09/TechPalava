
import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';

// --- Types & Mock Data ---

interface KPI {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: string; positive: boolean };
  color: string;
}

interface Activity {
  id: string;
  action: string;
  subject: string;
  timestamp: string;
  type: 'article' | 'system' | 'user' | 'business';
}

interface PendingItem {
  id: string;
  type: string;
  title: string;
  status: string;
  urgency: 'high' | 'medium' | 'low';
}

const DASHBOARD_KPIS: KPI[] = [
  { 
    label: 'Articles Published', 
    value: '1,284', 
    trend: { value: '12%', positive: true },
    color: 'text-blue-600',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /></svg>
  },
  { 
    label: 'Draft Articles', 
    value: '42', 
    color: 'text-slate-600',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
  },
  { 
    label: 'Jobs Posted', 
    value: '156', 
    trend: { value: '5%', positive: true },
    color: 'text-green-600',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  },
  { 
    label: 'Events Live', 
    value: '8', 
    color: 'text-purple-600',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" /></svg>
  },
  { 
    label: 'Submissions', 
    value: '12', 
    trend: { value: '2 new', positive: true },
    color: 'text-amber-600',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5" /></svg>
  },
];

const RECENT_ACTIVITY: Activity[] = [
  { id: '1', action: 'Sarah Jenkins published', subject: "Apple's New Reality Pro: A Deep Dive", timestamp: '2m ago', type: 'article' },
  { id: '2', action: 'New job submission from', subject: 'Intel Corporation (DevOps Lead)', timestamp: '15m ago', type: 'business' },
  { id: '3', action: 'Admin Login:', subject: 'Editor Admin (Senior Editor)', timestamp: '42m ago', type: 'user' },
  { id: '4', action: 'Spotlight updated:', subject: 'AI Ethics in Journalism', timestamp: '1h ago', type: 'article' },
  { id: '5', action: 'System:', subject: 'Automatic backup completed successfully', timestamp: '3h ago', type: 'system' },
];

const PENDING_ITEMS: PendingItem[] = [
  { id: 'p1', type: 'Draft', title: 'The Future of Edge Computing', status: 'Editorial Review', urgency: 'medium' },
  { id: 'p2', type: 'Scheduled', title: 'NVIDIA Blackwell GPU Benchmarks', status: 'Live in 4h', urgency: 'low' },
  { id: 'p3', type: 'Submission', title: 'Guest Post: Satya Nadella on Cloud', status: 'Needs Approval', urgency: 'high' },
  { id: 'p4', type: 'Expiring', title: 'Senior React Developer (Meta)', status: 'Ends today', urgency: 'high' },
];

// --- Component ---

const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // Simulation of data fetching
    const timer = setTimeout(() => {
      setLoading(false);
      // Change to setIsEmpty(true) or setError("message") to test other states
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center text-slate-400">
          <div className="scale-150 mb-4 text-blue-600">
            <LoadingSpinner />
          </div>
          <p className="text-sm font-medium animate-pulse uppercase tracking-widest">Initialising Newsroom Dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-red-50 rounded-2xl border border-red-100">
          <svg className="w-16 h-16 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Failed to load dashboard data</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-black transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* 1️⃣ Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Overview of TechPalava activity and key editorial metrics</p>
      </div>

      {/* 2️⃣ KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {DASHBOARD_KPIS.map((kpi, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className={`p-2 rounded-lg bg-slate-50 ${kpi.color}`}>
                {kpi.icon}
              </span>
              {kpi.trend && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${kpi.trend.positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {kpi.trend.positive ? '↑' : '↓'} {kpi.trend.value}
                </span>
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{kpi.value}</p>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{kpi.label}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* 3️⃣ Quick Actions */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 flex flex-wrap items-center gap-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2 ml-2">Quick Actions:</span>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.1" d="M12 4v16m8-8H4" /></svg>
          <span>New Article</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-slate-200 transition-all active:scale-95">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10" /></svg>
          <span>New Analysis</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-slate-200 transition-all active:scale-95">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745" /></svg>
          <span>New Job</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-slate-200 transition-all active:scale-95">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674" /></svg>
          <span>New Spotlight</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 4️⃣ Recent Activity Feed */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <h2 className="font-bold text-slate-800 tracking-tight">Recent Activity</h2>
              <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">View All History</button>
            </div>
            
            {isEmpty ? (
              <div className="p-12 text-center text-slate-400">
                <svg className="w-12 h-12 mx-auto mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-xs font-medium uppercase tracking-widest">No recent activity recorded</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {RECENT_ACTIVITY.map((activity) => (
                  <div key={activity.id} className="px-6 py-4 hover:bg-slate-50/80 transition-colors flex items-start group">
                    <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 mr-4 ${
                      activity.type === 'article' ? 'bg-blue-500' :
                      activity.type === 'business' ? 'bg-green-500' :
                      activity.type === 'user' ? 'bg-purple-500' : 'bg-slate-400'
                    }`}></div>
                    <div className="flex-grow">
                      <p className="text-sm text-slate-600 leading-tight">
                        <span className="font-bold text-slate-900">{activity.action}</span>{" "}
                        <span className="group-hover:text-blue-600 transition-colors">{activity.subject}</span>
                      </p>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">
                        {activity.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 5️⃣ Pending Items Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
              <h2 className="font-bold text-slate-800 tracking-tight">Pending Attention</h2>
            </div>
            
            <div className="p-4 space-y-3">
              {PENDING_ITEMS.map((item) => (
                <div key={item.id} className="p-4 rounded-lg border border-slate-100 bg-slate-50/30 hover:bg-white hover:shadow-sm hover:border-slate-200 transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[9px] font-black uppercase tracking-[0.15em] text-slate-500">
                      {item.type}
                    </span>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      item.urgency === 'high' ? 'bg-red-500' :
                      item.urgency === 'medium' ? 'bg-amber-500' : 'bg-slate-300'
                    }`} title={`${item.urgency} urgency`}></div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.status}</span>
                    <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                      Review →
                    </button>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-3 mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border border-dashed border-slate-200 rounded-lg hover:border-slate-400 hover:text-slate-600 transition-all">
                See All Pending Items
              </button>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
