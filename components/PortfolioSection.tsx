
import React from 'react';
import { Achievement } from '../types';

interface PortfolioSectionProps {
  achievements: Achievement[];
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ achievements }) => {
  return (
    <section id="portfolio" className="py-16 px-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-10 w-2 bg-blue-600 rounded-full"></div>
        <h2 className="text-3xl font-black text-blue-900">ملف الإنجاز</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((ach) => (
          <div key={ach.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white ${
              ach.category === 'academic' ? 'bg-indigo-500' : 
              ach.category === 'sport' ? 'bg-green-500' : 'bg-amber-500'
            }`}>
              <i className={`fas ${
                ach.category === 'academic' ? 'fa-graduation-cap' : 
                ach.category === 'sport' ? 'fa-trophy' : 'fa-laptop-code'
              }`}></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{ach.title}</h3>
            <p className="text-slate-600 mb-4 line-clamp-3">{ach.description}</p>
            <div className="text-xs font-bold text-slate-400 border-t pt-4 flex justify-between items-center">
              <span>{ach.date}</span>
              <span className="uppercase tracking-widest">{ach.category === 'academic' ? 'أكاديمي' : ach.category === 'sport' ? 'رياضي' : 'مهارة'}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
