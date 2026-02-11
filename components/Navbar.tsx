
import React from 'react';

interface NavbarProps {
  onNavigate: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="sticky top-0 z-50 glass shadow-md px-6 py-4 flex justify-between items-center text-right" dir="rtl">
      <div className="flex items-center gap-2">
        <div className="bg-emerald-600 p-2 rounded-lg text-white">
          <i className="fas fa-futbol text-xl"></i>
        </div>
        <span className="font-bold text-xl text-emerald-900 hidden sm:block">ملفي الرياضي</span>
      </div>
      <div className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar items-center">
        <button onClick={() => onNavigate('home')} className="hover:text-emerald-600 font-semibold transition-colors whitespace-nowrap">الرئيسية</button>
        <button onClick={() => onNavigate('portfolio')} className="hover:text-emerald-600 font-semibold transition-colors whitespace-nowrap">إنجازاتي</button>
        <button onClick={() => onNavigate('teams')} className="hover:text-emerald-600 font-semibold transition-colors whitespace-nowrap">فرقنا 🛡️</button>
        <button onClick={() => onNavigate('charity')} className="hover:text-pink-600 font-bold transition-colors whitespace-nowrap flex items-center gap-1 text-pink-500">
          <i className="fas fa-heart animate-pulse"></i> الخير
        </button>
        <button onClick={() => onNavigate('academy')} className="hover:text-emerald-600 font-semibold transition-colors whitespace-nowrap">الأكاديمية 🎓</button>
        <button onClick={() => onNavigate('shop')} className="hover:text-emerald-600 font-semibold transition-colors whitespace-nowrap text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">التيشرتات 👕</button>
        <button onClick={() => onNavigate('games')} className="hover:text-emerald-600 font-semibold transition-colors whitespace-nowrap">الألعاب 🎮</button>
        <button onClick={() => onNavigate('feedback')} className="hover:text-emerald-600 font-semibold transition-colors whitespace-nowrap">التقييم</button>
        
        {/* Admin Link */}
        <button 
          onClick={() => onNavigate('admin')} 
          className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg hover:bg-emerald-600 transition-all flex items-center gap-2"
        >
          <i className="fas fa-cog"></i> الإدارة
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
