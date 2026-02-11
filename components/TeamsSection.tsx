
import React, { useState, useEffect } from 'react';
import { getTeamTrainingFocus } from '../services/geminiService';

interface Team {
  id: string;
  name: string;
  age: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

const TeamsSection: React.FC = () => {
  const [activeAdvice, setActiveAdvice] = useState<Record<string, string>>({});
  const [loadingTeam, setLoadingTeam] = useState<string | null>(null);

  const teams: Team[] = [
    {
      id: 'baraem',
      name: 'فريق البراعم',
      age: '6 - 10 سنوات',
      description: 'هنا نزرع بذور النجومية. نركز على حب اللعبة، التحكم بالكرة، وأساسيات الحركة الرياضية في جو مليء بالمرح.',
      icon: 'fa-seedling',
      color: 'from-amber-400 to-orange-500',
      features: ['تحكم مذهل بالكرة', 'تنمية المهارات الحركية', 'بيئة تعليمية ممتعة']
    },
    {
      id: 'nashiin',
      name: 'فريق الناشئين',
      age: '11 - 15 سنة',
      description: 'مرحلة صقل الموهبة وبناء الشخصية القيادية. نبدأ بتعلم الخطط التكتيكية المعقدة وتطوير اللياقة البدنية التنافسية.',
      icon: 'fa-user-graduate',
      color: 'from-blue-500 to-indigo-600',
      features: ['تكتيك متقدم', 'لياقة بدنية عالية', 'بناء روح الفريق']
    },
    {
      id: 'awwal',
      name: 'الفريق الأول',
      age: '16 سنة فما فوق',
      description: 'نخبة الأكاديمية وواجهتها المشرفة. تركيزنا هنا على النتائج، الاحترافية التامة، والجاهزية للمشاركة في البطولات الكبرى.',
      icon: 'fa-trophy',
      color: 'from-emerald-500 to-green-700',
      features: ['أداء احترافي', 'عقلية الانتصار', 'تحليل أداء متطور']
    }
  ];

  const fetchAdvice = async (teamName: string, teamId: string) => {
    setLoadingTeam(teamId);
    const advice = await getTeamTrainingFocus(teamName);
    setActiveAdvice(prev => ({ ...prev, [teamId]: advice }));
    setLoadingTeam(null);
  };

  return (
    <section id="teams" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-900 mb-4">هيكل فرق الأكاديمية 🛡️</h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          نظام متكامل يتدرج باللاعب من المهارات الأساسية وصولاً إلى منصات التتويج والاحتراف العالمي.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teams.map((team) => (
          <div key={team.id} className="group relative bg-white rounded-[3rem] p-8 shadow-xl border border-slate-50 hover:shadow-2xl transition-all duration-500 overflow-hidden">
            {/* Gradient Header */}
            <div className={`absolute top-0 inset-x-0 h-3 bg-gradient-to-r ${team.color}`}></div>
            
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-8">
                <div className={`w-16 h-16 bg-gradient-to-br ${team.color} rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg transform group-hover:rotate-6 transition-transform`}>
                  <i className={`fas ${team.icon}`}></i>
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">الفئة العمرية</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600">{team.age}</span>
                </div>
              </div>

              <h3 className="text-2xl font-black text-slate-800 mb-4">{team.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
                {team.description}
              </p>

              <div className="space-y-3 mb-10">
                {team.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${team.color}`}></div>
                    <span className="text-xs font-bold text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* AI Coach Part */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 relative overflow-hidden">
                {activeAdvice[team.id] ? (
                  <div className="animate-fade-in">
                    <span className="text-[10px] font-black text-emerald-600 mb-1 block">توجيه المدرب الذكي:</span>
                    <p className="text-[11px] font-bold text-slate-700 italic">"{activeAdvice[team.id]}"</p>
                  </div>
                ) : (
                  <button 
                    onClick={() => fetchAdvice(team.name, team.id)}
                    disabled={loadingTeam === team.id}
                    className="w-full text-[11px] font-black text-slate-400 hover:text-emerald-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <i className={`fas ${loadingTeam === team.id ? 'fa-spinner fa-spin' : 'fa-magic'}`}></i>
                    {loadingTeam === team.id ? 'جاري التحليل...' : 'اطلب نصيحة تدريبية'}
                  </button>
                )}
              </div>
            </div>
            
            {/* Backglow decor */}
            <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${team.color} opacity-5 rounded-full blur-3xl`}></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamsSection;
