
import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';

// --- Components ---

const MetricCard: React.FC<{
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}> = ({ label, value, change, isPositive, icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-50 rounded-xl text-slate-400">
        {icon}
      </div>
      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        <span>{isPositive ? '↑' : '↓'}</span>
        <span>{change}</span>
      </div>
    </div>
    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</h4>
    <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
  </div>
);

const TrafficChart: React.FC = () => {
  // SVG-based line chart simulation
  return (
    <div className="h-64 w-full relative group">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 200" preserveAspectRatio="none">
        {/* Background Grid Lines */}
        {[0, 50, 100, 150, 200].map(y => (
          <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="#f1f5f9" strokeWidth="1" />
        ))}
        {/* The Line */}
        <path 
          d="M0,150 C50,140 100,160 150,120 C200,80 250,90 300,50 C350,10 400,60 450,80 C500,100 550,40 600,60 C650,80 700,30 750,40 C800,50 850,90 900,100 C950,110 1000,70 1000,80"
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinecap="round"
          className="animate-draw-path"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
        />
        {/* Area Gradient */}
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
        <path 
          d="M0,150 C50,140 100,160 150,120 C200,80 250,90 300,50 C350,10 400,60 450,80 C500,100 550,40 600,60 C650,80 700,30 750,40 C800,50 850,90 900,100 C950,110 1000,70 1000,80 V200 H0 Z"
          fill="url(#chartGradient)"
        />
      </svg>
      {/* Tooltip Simulation */}
      <div className="absolute top-1/4 left-1/3 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white px-3 py-2 rounded-lg text-xs font-bold pointer-events-none shadow-xl border border-slate-700">
        <p className="text-[8px] text-slate-400 mb-1">MARCH 15</p>
        <p>14.2k Visitors</p>
      </div>
    </div>
  );
};

const Analytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
          <div className="scale-150 text-blue-600">
            <LoadingSpinner />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">Synthesizing Real-time Insights...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* 1️⃣ Page Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="editorial-title text-4xl text-slate-900 tracking-tight">Intelligence Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">Comprehensive performance auditing for TechPalava Media</p>
        </div>
        <div className="flex items-center bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm space-x-1">
          {['24h', '7d', '30d', '90d'].map(range => (
            <button 
              key={range}
              onClick={() => setTimeRange(range === '30d' ? 'Last 30 Days' : range)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${timeRange.includes(range) ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
            >
              {range}
            </button>
          ))}
          <div className="h-6 w-px bg-slate-100 mx-2"></div>
          <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" /></svg>
          </button>
        </div>
      </div>

      {/* 2️⃣ Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <MetricCard 
          label="Total Site Views" 
          value="1.42M" 
          change="12.4%" 
          isPositive={true} 
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
        />
        <MetricCard 
          label="Unique Visitors" 
          value="842.1k" 
          change="8.2%" 
          isPositive={true} 
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
        />
        <MetricCard 
          label="Avg Read Time" 
          value="4m 32s" 
          change="1.4%" 
          isPositive={false} 
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <MetricCard 
          label="Articles Live" 
          value="128" 
          change="12%" 
          isPositive={true} 
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /></svg>}
        />
        <MetricCard 
          label="Active Jobs" 
          value="42" 
          change="24.1%" 
          isPositive={true} 
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
        />
        <MetricCard 
          label="Active Campaigns" 
          value="8" 
          change="0%" 
          isPositive={true} 
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* 3️⃣ Traffic Trends Chart */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Traffic Overview</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Growth trajectory over the {timeRange}</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-600 mr-2"></span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Page Views</span>
              </div>
              <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Download PDF</button>
            </div>
          </div>
          <TrafficChart />
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-50">
            {['Feb 1', 'Feb 10', 'Feb 20', 'Mar 1', 'Mar 10', 'Mar 20'].map(date => (
              <span key={date} className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{date}</span>
            ))}
          </div>
        </div>

        {/* 4️⃣ Device & Audience Breakdown */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-8">Audience Profile</h3>
            
            <div className="space-y-8 flex-1">
              {/* Device Usage */}
              <div>
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                  <span>Device Breakdown</span>
                  <span className="text-slate-900">Mobile Dominant</span>
                </div>
                <div className="flex h-3 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-blue-600" style={{ width: '68%' }}></div>
                  <div className="h-full bg-slate-100" style={{ width: '32%' }}></div>
                </div>
                <div className="flex justify-between text-[9px] font-bold">
                  <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-600 mr-1.5"></span> Mobile (68%)</div>
                  <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-slate-200 mr-1.5"></span> Desktop (32%)</div>
                </div>
              </div>

              {/* Top Traffic Sources */}
              <div>
                 <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                  <span>Acquisition Channel</span>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Google Search', val: '42%', color: 'bg-emerald-500' },
                    { label: 'Direct Access', val: '28%', color: 'bg-blue-500' },
                    { label: 'Twitter / X', val: '18%', color: 'bg-sky-400' },
                    { label: 'Newsletter', val: '12%', color: 'bg-slate-900' }
                  ].map((source, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1.5">
                        <span>{source.label}</span>
                        <span>{source.val}</span>
                      </div>
                      <div className="h-1 bg-slate-50 rounded-full overflow-hidden">
                        <div className={`h-full ${source.color}`} style={{ width: source.val }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10 mt-8 hover:bg-black transition-all">
              Export Segment Data
            </button>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        
        {/* 5️⃣ Content Performance Table */}
        <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm flex flex-col">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Editorial Standouts</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">High engagement manuscripts from {timeRange}</p>
            </div>
            <select className="text-[10px] font-black uppercase tracking-widest bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none">
              <option>All Sections</option>
              <option>Hardware</option>
              <option>Analysis</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Story</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Views</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Engagement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { title: "Apple Vision Pro: Year One Verdict", cat: "Hardware", views: "42,102", time: "6m 12s", trend: "up" },
                  { title: "The Sovereign AI Race in Africa", cat: "Analysis", views: "38,592", time: "8m 45s", trend: "up" },
                  { title: "NVIDIA Blackwell vs. The World", cat: "Hardware", views: "31,042", time: "4m 20s", trend: "down" },
                  { title: "Founder Spotlight: Paystack’s Pivot", cat: "Spotlight", views: "28,192", time: "12m 10s", trend: "up" },
                  { title: "The Ethics of Generative Audio", cat: "Policy", views: "24,501", time: "5m 30s", trend: "up" }
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{row.title}</span>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{row.cat}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right font-mono text-xs font-bold text-slate-600">
                      {row.views}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-slate-900">{row.time}</span>
                        <span className={`text-[8px] font-black uppercase tracking-tighter ${row.trend === 'up' ? 'text-emerald-500' : 'text-rose-400'}`}>
                          {row.trend === 'up' ? '↑ Increasing' : '↓ Cooling'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <button className="w-full py-3 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-600 transition-colors">View Deep Catalog Analytics →</button>
          </div>
        </div>

        {/* 6️⃣ Business Performance (Jobs/Events/Ads) */}
        <div className="grid grid-cols-1 gap-8">
           <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-2">Business Health Index</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-10">Revenue & Engagement Efficiency</p>
                
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Job Listing CTR</p>
                      <p className="text-2xl font-bold">14.2%</p>
                      <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-blue-500 w-[65%]"></div>
                      </div>
                    </div>
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Ad Fill Rate</p>
                      <p className="text-2xl font-bold">92%</p>
                      <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[92%]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Event Conversions</p>
                      <p className="text-2xl font-bold">8.4%</p>
                      <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-amber-500 w-[45%]"></div>
                      </div>
                    </div>
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Sponsorship ROI</p>
                      <p className="text-2xl font-bold">3.2x</p>
                      <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-indigo-500 w-[78%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-6 bg-blue-600 rounded-3xl group cursor-pointer hover:bg-blue-700 transition-all">
                <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                     <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   </div>
                   <div>
                     <p className="text-[9px] font-black text-blue-200 uppercase tracking-widest">Media Kit Performance</p>
                     <p className="font-bold text-white">Generate Quarterly Partner Report</p>
                   </div>
                </div>
                <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
           </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes draw-path {
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-draw-path {
          animation: draw-path 2s ease-out forwards;
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </AdminLayout>
  );
};

export default Analytics;
