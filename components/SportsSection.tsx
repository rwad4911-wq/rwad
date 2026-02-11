
import React from 'react';

interface SportsSectionProps {
  tournaments: any[];
}

const SportsSection: React.FC<SportsSectionProps> = ({ tournaments }) => {
  return (
    <section id="sports" className="py-16 px-6 bg-slate-900 text-white rounded-[3rem] my-10 max-w-6xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <i className="fas fa-medal text-4xl text-yellow-400 mb-4"></i>
          <h2 className="text-4xl font-black mb-2">السجل الرياضي</h2>
          <p className="opacity-60">شغفي بكرة القدم في أرقام وبطولات</p>
        </div>

        <div className="space-y-4">
          {tournaments.map((t, idx) => (
            <div key={idx} className="bg-white/5 hover:bg-white/10 transition-colors p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center font-black text-xl">
                  {t.year.slice(-2)}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t.name}</h3>
                  <p className="text-yellow-400 font-semibold">{t.result}</p>
                </div>
              </div>
              <div className="bg-white/10 px-6 py-2 rounded-full flex items-center gap-3">
                <i className="fas fa-futbol text-blue-400"></i>
                <span className="font-bold">{t.goals}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Soccer field design elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 border-4 border-white m-10 rounded-lg"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-4 border-white rounded-full"></div>
      </div>
    </section>
  );
};

export default SportsSection;
