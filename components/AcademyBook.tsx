
import React, { useState } from 'react';

interface Page {
  title: string;
  content: string;
  icon: string;
  imageColor: string;
}

interface AcademyBookProps {
  pages: Page[];
}

const AcademyBook: React.FC<AcademyBookProps> = ({ pages }) => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <section id="story" className="py-20 px-6 max-w-5xl mx-auto overflow-hidden">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-10 w-2 bg-emerald-600 rounded-full shadow-lg"></div>
        <div>
          <h2 className="text-3xl font-black text-slate-800">كتاب الأكاديمية الذهبي 📖</h2>
          <p className="text-slate-500 mt-1 font-medium">رحلة من الشغف والنجاح</p>
        </div>
      </div>

      <div className="relative group">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row min-h-[500px] transition-all duration-700">
          
          <div className={`md:w-1/2 bg-gradient-to-br ${pages[currentPage]?.imageColor || 'from-emerald-500 to-green-700'} p-12 flex flex-col items-center justify-center text-white relative transition-all duration-700`}>
            <div className="relative z-10 animate-bounce">
              <i className={`fas ${pages[currentPage]?.icon || 'fa-seedling'} text-9xl drop-shadow-2xl`}></i>
            </div>
            <div className="mt-8 text-center relative z-10">
              <span className="text-xs font-black tracking-widest uppercase opacity-60">الفصل {currentPage + 1}</span>
              <h3 className="text-3xl font-black mt-2">{pages[currentPage]?.title}</h3>
            </div>
          </div>

          <div className="md:w-1/2 p-12 flex flex-col justify-between bg-slate-50">
            <div>
              <i className="fas fa-quote-right text-4xl text-emerald-200 mb-6"></i>
              <p className="text-xl text-slate-700 leading-loose font-medium text-right italic">
                {pages[currentPage]?.content}
              </p>
            </div>

            <div className="mt-12 flex justify-between items-center">
              <button 
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${currentPage === 0 ? 'border-slate-200 text-slate-300' : 'border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white'}`}
              >
                <i className="fas fa-chevron-right"></i>
              </button>

              <div className="flex gap-2">
                {pages.map((_, idx) => (
                  <div key={idx} className={`h-2 rounded-full transition-all duration-500 ${idx === currentPage ? 'w-8 bg-emerald-600' : 'w-2 bg-slate-200'}`}></div>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
                disabled={currentPage === pages.length - 1}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${currentPage === pages.length - 1 ? 'border-slate-200 text-slate-300' : 'border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white'}`}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademyBook;
