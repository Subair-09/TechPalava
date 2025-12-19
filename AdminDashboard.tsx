
import React from 'react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total News', value: '1,284', change: '+12 this week', icon: '📰' },
    { label: 'Active Jobs', value: '42', change: '+5 new today', icon: '💼' },
    { label: 'Upcoming Events', value: '18', change: '3 pending review', icon: '🗓️' },
    { label: 'Analysis Posts', value: '156', change: '+2 draft', icon: '📈' },
  ];

  const recentActivity = [
    { type: 'News', title: 'The Silent Rise of Sovereign AI...', status: 'Published', time: '2 hours ago', admin: 'Elena R.' },
    { type: 'Job', title: 'Senior Rust Engineer at Solana', status: 'Pending', time: '4 hours ago', admin: 'System' },
    { type: 'Analysis', title: 'The Fragmentation of African Fintech', status: 'Draft', time: 'Yesterday', admin: 'Amara O.' },
    { type: 'Event', title: 'Global Tech Summit 2025', status: 'Published', time: '2 days ago', admin: 'Marcus W.' },
  ];

  const inboxPreview = [
    { sender: 'Fatima Lawal', company: 'Flutterwave', type: 'Advertising', time: '10 min ago' },
    { sender: 'David Miller', company: 'Google', type: 'Partnership', time: '1 hour ago' },
    { sender: 'Sarah Jenkins', company: 'Freelance', type: 'Job Inquiry', time: '3 hours ago' },
  ];

  return (
    <div>
      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border-2 border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded-lg uppercase tracking-widest">{stat.change}</span>
            </div>
            <p className="text-3xl font-black text-gray-900 dark:text-white mb-1 tracking-tighter">{stat.value}</p>
            <p className="text-xs font-black uppercase text-gray-400 tracking-[0.2em]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Recent Activity Section */}
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-gray-900 rounded-[2.5rem] border-2 border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b-2 border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h3 className="font-black text-lg dark:text-white tracking-tighter uppercase">Content Pipeline</h3>
            <button className="text-xs font-black text-blue-600 hover:underline tracking-widest">VIEW ALL →</button>
          </div>
          <div className="divide-y-2 divide-gray-50 dark:divide-gray-800">
            {recentActivity.map((item, i) => (
              <div key={i} className="p-6 flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-[10px] uppercase tracking-tighter shadow-sm ${
                    item.type === 'News' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30' :
                    item.type === 'Job' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30' :
                    'bg-purple-50 text-purple-600 dark:bg-purple-900/30'
                  }`}>
                    {item.type[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-tight">{item.title}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Edited by {item.admin} • {item.time}</p>
                  </div>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border-2 ${
                  item.status === 'Published' ? 'bg-emerald-50 border-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:border-emerald-800' :
                  item.status === 'Draft' ? 'bg-gray-50 border-gray-100 text-gray-400 dark:bg-gray-800/50 dark:border-gray-700' :
                  'bg-amber-50 border-amber-100 text-amber-500 dark:bg-amber-900/20 dark:border-amber-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Side Area: Quick Actions & Inbox Preview */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-gray-950 rounded-[2.5rem] p-8 text-white border-4 border-white dark:border-gray-800 shadow-2xl">
            <h3 className="font-black text-lg mb-6 tracking-tighter uppercase italic">Quick Command</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-white/10 hover:bg-blue-600 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 transition-all group">
                <span className="text-xl">✍️</span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] group-hover:text-white">New Article</span>
              </button>
              <button className="bg-white/10 hover:bg-emerald-600 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 transition-all group">
                <span className="text-xl">💼</span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] group-hover:text-white">Add Job</span>
              </button>
              <button className="bg-white/10 hover:bg-purple-600 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 transition-all group">
                <span className="text-xl">✨</span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] group-hover:text-white">Analysis</span>
              </button>
              <button className="bg-white/10 hover:bg-amber-600 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 transition-all group">
                <span className="text-xl">✉️</span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] group-hover:text-white">Broadcast</span>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border-2 border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="p-8 border-b-2 border-gray-100 dark:border-gray-800 text-center sm:text-left">
              <h3 className="font-black text-lg dark:text-white tracking-tighter uppercase">Inquiry Inbox</h3>
            </div>
            <div className="p-4 space-y-3">
              {inboxPreview.map((msg, i) => (
                <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-transparent hover:border-blue-600/30 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-black text-xs group-hover:text-blue-600 transition-colors uppercase tracking-tighter">{msg.sender}</p>
                    <span className="text-[8px] font-bold text-gray-400">{msg.time}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{msg.company}</p>
                  <div className="mt-3 flex items-center justify-between">
                     <span className="text-[8px] font-black bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-2 py-0.5 rounded text-gray-400 uppercase tracking-widest">{msg.type}</span>
                     <svg className="w-3 h-3 text-gray-300 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 text-[10px] font-black text-gray-400 hover:text-blue-600 uppercase tracking-[0.3em] transition-all">VIEW ALL MESSAGES</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
