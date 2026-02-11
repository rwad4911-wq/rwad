
import React, { useState } from 'react';
import { getCharityThankYou } from '../services/geminiService';

interface Donor {
  name: string;
  amount: string;
  item: string;
}

const CharitySection: React.FC = () => {
  const [totalItems, setTotalItems] = useState(64);
  const [target] = useState(100);
  const [donors, setDonors] = useState<Donor[]>([
    { name: "فهد الخالدي", amount: "100 ر.س", item: "كرتين قدم" },
    { name: "سارة محمد", amount: "50 ر.س", item: "حذاء رياضي" },
  ]);
  const [aiMessage, setAiMessage] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const donationOptions = [
    { id: 1, name: "كرة الأمل", icon: "fa-futbol", price: "50 ر.س", desc: "توفير كرة قدم عالية الجودة لطفل" },
    { id: 2, name: "طقم البطل", icon: "fa-tshirt", price: "120 ر.س", desc: "قميص وشورت وجوارب رياضية" },
    { id: 3, name: "حذاء السرعة", icon: "fa-shoe-prints", price: "80 ر.س", desc: "حذاء رياضي مريح للملاعب" },
  ];

  const handleAIDonationResponse = async (name: string, item: string) => {
    setLoadingAI(true);
    const message = await getCharityThankYou(name, item);
    setAiMessage(message);
    setLoadingAI(false);
    
    setDonors([{ name, amount: "متبرع", item }, ...donors]);
    setTotalItems(prev => Math.min(target, prev + 1));
  };

  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (totalItems / target) * circumference;

  return (
    <section id="charity" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-10 w-2 bg-pink-500 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
        <div>
          <h2 className="text-3xl font-black text-slate-800">مبادرة رواد الخير 💝</h2>
          <p className="text-slate-500 mt-1 font-medium">الرياضة روح، والعطاء حياة. لنرسم البسمة معاً.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Progress & Target Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[3.5rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-50 flex flex-col items-center text-center h-full relative overflow-hidden group">
            
            {/* Soft Ambient Background Decor */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-50 rounded-full blur-[80px] opacity-60"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-50 rounded-full blur-[60px] opacity-40"></div>
            
            <div className="relative w-64 h-64 mb-10 flex items-center justify-center">
              {/* SVG Ring */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <defs>
                  <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#db2777" />
                  </linearGradient>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ec4899" floodOpacity="0.4"/>
                  </filter>
                </defs>
                
                {/* Track Circle */}
                <circle
                  cx="128"
                  cy="128"
                  r={radius}
                  stroke="#f1f5f9"
                  strokeWidth="14"
                  fill="none"
                />
                
                {/* Progress Circle */}
                <circle
                  cx="128"
                  cy="128"
                  r={radius}
                  stroke="url(#pinkGrad)"
                  strokeWidth="18"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  filter="url(#shadow)"
                  className="transition-all duration-[1500ms] ease-out"
                />
              </svg>
              
              {/* Inner Content - Redesigned for better aesthetics */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="flex items-start">
                  <span className="text-7xl font-black text-slate-800 tracking-tighter tabular-nums leading-none">
                    {totalItems}
                  </span>
                </div>
                <div className="mt-1 flex flex-col items-center">
                  <span className="text-xl font-black text-pink-500 bg-pink-50 px-3 py-0.5 rounded-full border border-pink-100 shadow-sm leading-none">%</span>
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mt-4 block">هدية تم توفيرها</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50/80 backdrop-blur-sm w-full p-8 rounded-[2.5rem] border border-slate-100 shadow-inner group-hover:bg-white transition-colors duration-500">
              <div className="flex justify-center mb-3">
                <div className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-wider">
                  الهدف القادم
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-1">{target} قطعة</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">تجهيز فريق الأحلام للموسم الجديد</p>
            </div>
            
            {aiMessage && (
              <div className="mt-8 bg-gradient-to-r from-pink-50 to-transparent p-5 rounded-3xl border-r-4 border-pink-400 animate-fade-in relative">
                <p className="text-pink-900 text-sm italic font-bold leading-relaxed pr-2">
                  <i className="fas fa-sparkles text-pink-400 ml-2"></i>
                  "{aiMessage}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Donation Options Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {donationOptions.map((opt) => (
              <div key={opt.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 hover:border-pink-200 hover:-translate-y-1 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                  <i className={`fas ${opt.icon} text-6xl`}></i>
                </div>
                <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-pink-500 group-hover:text-white transition-all shadow-inner">
                  <i className={`fas ${opt.icon}`}></i>
                </div>
                <h4 className="font-black text-slate-800 text-lg mb-2">{opt.name}</h4>
                <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">{opt.desc}</p>
                <div className="flex justify-between items-center border-t border-slate-50 pt-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase">القيمة</span>
                    <span className="font-black text-xl text-slate-800">{opt.price}</span>
                  </div>
                  <button 
                    onClick={() => handleAIDonationResponse("بطل مجهول", opt.name)}
                    disabled={loadingAI}
                    className="bg-slate-900 text-white w-12 h-12 rounded-2xl hover:bg-pink-600 shadow-lg transition-all flex items-center justify-center group-active:scale-90"
                  >
                    <i className={`fas ${loadingAI ? 'fa-spinner fa-spin' : 'fa-plus'} text-lg`}></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
             <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-right">
                   <h3 className="text-3xl font-black mb-2 flex items-center gap-3">
                    أبطال الخير 
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                    </span>
                   </h3>
                   <p className="opacity-50 font-medium">قائمة العطاء المستمرة لخدمة المستقبل</p>
                </div>
                <div className="flex -space-x-4 space-x-reverse">
                   {[1,2,3,4].map((i) => (
                     <div key={i} className="w-14 h-14 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center font-bold text-slate-500 shadow-xl overflow-hidden ring-2 ring-white/5">
                       <i className="fas fa-user-ninja text-xl"></i>
                     </div>
                   ))}
                   <div className="w-14 h-14 rounded-full border-4 border-slate-900 bg-pink-500 flex items-center justify-center text-sm font-black shadow-xl ring-2 ring-white/5">
                     +28
                   </div>
                </div>
             </div>
             <div className="mt-10 grid gap-4">
               {donors.slice(0, 3).map((d, i) => (
                 <div key={i} className="flex justify-between items-center bg-white/5 backdrop-blur-md p-4 px-6 rounded-2xl border border-white/10 animate-fade-in hover:bg-white/10 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                      <span className="font-bold text-lg group-hover:text-pink-400 transition-colors">{d.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black bg-white/10 px-3 py-1 rounded-lg border border-white/10 text-pink-300">{d.item}</span>
                    </div>
                 </div>
               ))}
             </div>
             {/* Large Decorative Icon */}
             <div className="absolute -bottom-16 -left-16 opacity-5 pointer-events-none rotate-12">
                <i className="fas fa-hand-holding-heart text-[18rem]"></i>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CharitySection;
