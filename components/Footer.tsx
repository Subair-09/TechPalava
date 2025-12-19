
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 pt-20 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-extrabold tracking-tighter text-blue-600 font-serif-heading">TP</span>
              <span className="text-2xl font-bold tracking-tight dark:text-white transition-colors">TechPalava</span>
            </a>
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed transition-colors">
              Leading the conversation on global tech innovation. Truth, context, and insight for the modern builder.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-50 dark:bg-gray-900 rounded-full text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="p-2 bg-gray-50 dark:bg-gray-900 rounded-full text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-6 uppercase tracking-wider text-sm">Sections</h4>
            <ul className="space-y-4">
              <li><a href="#news/startups" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Startups</a></li>
              <li><a href="#news/crypto" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Crypto & Web3</a></li>
              <li><a href="#news/fintech" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Venture Capital</a></li>
              <li><a href="#news/ai" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Big Tech</a></li>
              <li><a href="#news/policy" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Policy & Govt</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">About Us</a></li>
              <li><a href="#advertise" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Advertise</a></li>
              <li><a href="#jobs" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Careers</a></li>
              <li><a href="#press" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Press Kit</a></li>
              <li><a href="#contact" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-6 uppercase tracking-wider text-sm">Newsletter</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 transition-colors">The only tech newsletter you'll actually want to read. Join 50k+ readers.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-gray-900 dark:text-white"
              />
              <button className="bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 dark:shadow-blue-900/10">
                Join Palava
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 dark:text-gray-600 text-sm transition-colors">© 2025 TechPalava Media. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-xs font-bold text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="text-xs font-bold text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400">Terms of Service</a>
            <a href="#" className="text-xs font-bold text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
