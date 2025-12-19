
import React from 'react';
import { NewsItem } from '../types';

interface NewsCardProps {
  item: NewsItem;
  large?: boolean;
  minimal?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, large, minimal }) => {
  if (minimal) {
    return (
      <article className="group flex gap-4 items-start py-6 border-b border-gray-100 dark:border-gray-900 last:border-0">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">{item.category}</span>
          </div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            <a href="#">{item.title}</a>
          </h4>
          <p className="text-xs text-gray-500 mt-2 font-medium uppercase tracking-tighter">{item.date} • {item.readTime}</p>
        </div>
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500" />
        </div>
      </article>
    );
  }

  return (
    <article className={`group flex flex-col ${large ? 'lg:flex-row gap-10' : 'gap-5'} transition-all duration-300`}>
      <div className={`relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 ${large ? 'lg:w-7/12 aspect-[16/10]' : 'aspect-[3/2]'}`}>
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </div>
      
      <div className={`flex flex-col justify-center ${large ? 'lg:w-5/12' : ''}`}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-md">{item.category}</span>
          <span className="text-[11px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">{item.readTime}</span>
        </div>
        
        <h3 className={`${large ? 'text-3xl lg:text-5xl mb-5' : 'text-2xl mb-3'} font-bold text-gray-900 dark:text-gray-100 leading-[1.15] font-serif-heading group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight`}>
          <a href="#">{item.title}</a>
        </h3>
        
        <p className={`text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed ${large ? 'text-lg mb-8' : 'text-sm mb-6'}`}>
          {item.excerpt}
        </p>
        
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50 dark:border-gray-900/50">
          <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden ring-2 ring-white dark:ring-gray-950 shadow-sm">
            <img src={`https://i.pravatar.cc/100?u=${item.author}`} alt={item.author} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-black text-gray-900 dark:text-gray-200 uppercase tracking-tighter">{item.author}</p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold">{item.date}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
