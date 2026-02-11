
import React, { useState } from 'react';

interface Question {
  q: string;
  options: string[];
  answer: number;
}

const AcademySection: React.FC = () => {
  const [step, setStep] = useState<'info' | 'testing' | 'result' | 'subscribed'>('info');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  const questions: Question[] = [
    { q: "كم عدد لاعبي الفريق الواحد داخل أرض الملعب في مباراة رسمية؟", options: ["9 لاعبين", "11 لاعب", "12 لاعب"], answer: 1 },
    { q: "ما هي مدة الشوط الواحد في مباراة كرة القدم الرسمية (بدون الوقت الضائع)؟", options: ["30 دقيقة", "45 دقيقة", "60 دقيقة"], answer: 1 },
    { q: "أي من هذه الحالات تؤدي لضربة جزاء؟", options: ["لمسة يد داخل المنطقة", "تسلل", "رمية تماس"], answer: 0 },
  ];

  const handleAnswer = (idx: number) => {
    if (idx === questions[currentQ].answer) {
      setScore(s => s + 1);
    }
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep('result');
    }
  };

  const startTest = () => {
    setStep('testing');
    setCurrentQ(0);
    setScore(0);
  };

  const handleSubscribe = () => {
    setStep('subscribed');
  };

  return (
    <section id="academy" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-10 w-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
        <div>
          <h2 className="text-3xl font-black text-slate-800">أكاديمية رواد للتميز الرياضي 🎓</h2>
          <p className="text-slate-500 mt-1 font-medium">طور مهاراتك الفنية والتكتيكية مع خبراء اللعبة</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Package Card (Left Side) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 h-full flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner">
                <i className="fas fa-crown"></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">باقة الاحتراف</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-600 font-medium">
                  <i className="fas fa-check-circle text-green-500"></i>
                  تدريب ميداني مكثف
                </li>
                <li className="flex items-center gap-3 text-slate-600 font-medium">
                  <i className="fas fa-check-circle text-green-500"></i>
                  تحليل أداء بالفيديو
                </li>
                <li className="flex items-center gap-3 text-slate-600 font-medium">
                  <i className="fas fa-check-circle text-green-500"></i>
                  نظام غذائي متكامل
                </li>
                <li className="flex items-center gap-3 text-slate-600 font-medium">
                  <i className="fas fa-check-circle text-green-500"></i>
                  شهادة معتمدة
                </li>
              </ul>
            </div>
            <div className="pt-6 border-t border-slate-50">
              <button 
                onClick={startTest}
                disabled={step === 'subscribed' || step === 'testing'}
                className={`w-full py-4 rounded-2xl font-black shadow-lg transition-all flex items-center justify-center gap-2 ${
                  step === 'subscribed' 
                  ? 'bg-emerald-500 text-white cursor-default' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02]'
                }`}
              >
                {step === 'subscribed' ? (
                  <><i className="fas fa-check"></i> مشترك حالياً</>
                ) : (
                  <><i className="fas fa-clipboard-check"></i> ابدأ اختبار القبول</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Testing/Success Area (Right Side) */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] p-10 text-white shadow-2xl min-h-[500px] flex flex-col relative overflow-hidden border-4 border-slate-700">
            
            {step === 'info' && (
              <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in relative z-10">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center text-4xl mb-6">
                  <i className="fas fa-shield-alt text-amber-400"></i>
                </div>
                <h4 className="text-3xl font-black mb-4">اختبار الموهبة 🏟️</h4>
                <p className="text-slate-300 max-w-md mx-auto leading-relaxed mb-8 font-medium">
                  للانضمام إلى فريقنا، يجب أن تثبت لنا معرفتك الأساسية بقوانين اللعبة. الاختبار سريع وسهل ويهدف لقياس شغفك!
                </p>
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                    <span className="block text-amber-400 font-black text-xl">3</span>
                    <span className="text-[10px] uppercase opacity-60">أسئلة سريعة</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                    <span className="block text-emerald-400 font-black text-xl">80%</span>
                    <span className="text-[10px] uppercase opacity-60">درجة النجاح</span>
                  </div>
                </div>
              </div>
            )}

            {step === 'testing' && (
              <div className="flex flex-col h-full animate-fade-in relative z-10">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-amber-400 uppercase tracking-widest">اختبار القبول</span>
                    <h5 className="text-xl font-bold">السؤال {currentQ + 1} من {questions.length}</h5>
                  </div>
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center font-black">
                    {currentQ + 1}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <div className="bg-white/5 p-8 rounded-3xl border border-white/10 mb-8">
                    <p className="text-2xl font-bold leading-relaxed">{questions[currentQ].q}</p>
                  </div>

                  <div className="grid gap-4">
                    {questions[currentQ].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        className="w-full bg-white/5 hover:bg-white/10 border border-white/10 p-5 rounded-2xl text-right font-bold transition-all hover:pr-8 flex justify-between items-center group"
                      >
                        <span>{opt}</span>
                        <i className="fas fa-chevron-left opacity-0 group-hover:opacity-100 transition-opacity"></i>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 w-full bg-white/10 h-1 rounded-full overflow-hidden">
                   <div className="h-full bg-amber-400 transition-all duration-300" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}></div>
                </div>
              </div>
            )}

            {step === 'result' && (
              <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in relative z-10">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl mb-8 shadow-2xl ${score >= 2 ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                  <i className={`fas ${score >= 2 ? 'fa-check-double' : 'fa-redo'}`}></i>
                </div>
                <h4 className="text-4xl font-black mb-2">
                  {score >= 2 ? 'مبروك يا بطل!' : 'حاول مرة أخرى!'}
                </h4>
                <p className="text-xl text-slate-300 mb-10">
                  لقد حصلت على <span className="text-white font-black">{score}</span> من أصل <span className="text-white font-black">{questions.length}</span>
                </p>

                {score >= 2 ? (
                  <button 
                    onClick={handleSubscribe}
                    className="bg-amber-400 text-slate-900 px-12 py-4 rounded-2xl font-black text-xl shadow-xl hover:scale-105 transition-all"
                  >
                    أكمل الاشتراك الآن 🚀
                  </button>
                ) : (
                  <button 
                    onClick={startTest}
                    className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-2xl font-black hover:bg-white/20 transition-all"
                  >
                    إعادة الاختبار
                  </button>
                )}
              </div>
            )}

            {step === 'subscribed' && (
              <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in relative z-10">
                <div className="w-32 h-32 bg-amber-400 rounded-full flex items-center justify-center text-5xl text-slate-900 mb-8 animate-bounce shadow-[0_0_40px_rgba(245,158,11,0.6)]">
                  <i className="fas fa-trophy"></i>
                </div>
                <h4 className="text-4xl font-black mb-4 text-amber-400">تم الانضمام بنجاح! ⚽</h4>
                <p className="text-xl text-slate-300 max-w-md mx-auto leading-relaxed">
                  أهلاً بك في أكاديمية رواد. لقد اجتزت الاختبار بنجاح وتم تفعيل عضويتك. سيصلك جدول التمارين قريباً.
                </p>
                <div className="mt-10 flex flex-col items-center gap-4">
                  <div className="bg-emerald-500/20 text-emerald-400 px-8 py-3 rounded-full text-lg font-black border border-emerald-500/30">
                    رقم اللاعب: #RWAD-{Math.floor(Math.random() * 9000) + 1000}
                  </div>
                </div>
              </div>
            )}

            {/* Background Cog Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
              <i className="fas fa-cog text-[25rem] animate-[spin_20s_linear_infinite]"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademySection;
