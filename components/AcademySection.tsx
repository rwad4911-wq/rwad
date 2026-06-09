
import React, { useState } from 'react';

interface Question {
  q: string;
  options: string[];
  answer: number;
}

const AcademySection: React.FC = () => {
  const [step, setStep] = useState<'info' | 'testing' | 'result' | 'booking' | 'subscribed'>('info');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [bookingType, setBookingType] = useState<string>('مقابلة قياس مهارات واختبار لياقة بدنية');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [playerId] = useState<number>(() => Math.floor(Math.random() * 9000) + 1000);

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
    setStep('booking');
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
                    className="bg-amber-400 text-slate-900 px-12 py-4 rounded-2xl font-black text-xl shadow-xl hover:scale-105 transition-all animate-pulse"
                  >
                    أكمل الاشتراك وحجز موعدك الآن 🚀
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

            {step === 'booking' && (
              <div className="flex flex-col h-full animate-fade-in relative z-10 w-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-amber-400 text-slate-900 rounded-2xl flex items-center justify-center text-xl shadow-lg">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-amber-400">حجز موعد المقابلة والاختبار 📅</h4>
                    <p className="text-slate-300 text-sm mt-0.5 font-medium">اختر الموعد المناسب لإكمال انضمامك للنادي</p>
                  </div>
                </div>

                <div className="space-y-5 flex-1 flex flex-col justify-between">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Select Service */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-amber-300">نوع الحصة أو المقابلة الميدانية</label>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          "مقابلة قياس مهارات واختبار لياقة بدنية",
                          "حصة تدريبية تجريبية أولى",
                          "استشارة رياضية مع المدير الفني"
                        ].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => {
                              setBookingType(type);
                              setErrorMsg('');
                            }}
                            className={`p-3 rounded-xl border text-right text-xs font-bold transition-all ${
                              bookingType === type
                                ? 'bg-amber-400 border-amber-400 text-slate-900 shadow-md'
                                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                            }`}
                          >
                            <i className={`fas ${bookingType === type ? 'fa-dot-circle' : 'fa-circle'} ml-2 text-xs`}></i>
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Choose Date */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-amber-300">اختر التاريخ المناسب لك</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { label: "الأحد", date: "2026-06-14" },
                            { label: "الاثنين", date: "2026-06-15" },
                            { label: "الثلاثاء", date: "2026-06-16" },
                          ].map((item) => (
                            <button
                              key={item.date}
                              type="button"
                              onClick={() => {
                                setBookingDate(item.date);
                                setErrorMsg('');
                              }}
                              className={`p-2 rounded-xl border text-center text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                                bookingDate === item.date
                                  ? 'bg-amber-400 border-amber-400 text-slate-900 shadow-md scale-105'
                                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                              }`}
                            >
                              <span className="opacity-75">{item.label}</span>
                              <span className="text-sm font-black whitespace-nowrap">{item.date.split('-').slice(1).join('/')}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Choose Time */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-amber-300">اختر فترة الحضور والتدريب</label>
                        <div className="grid grid-cols-3 gap-1">
                          {[
                            "4:00 - 5:30 م",
                            "5:30 - 7:00 م",
                            "7:00 - 8:30 م"
                          ].map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => {
                                setBookingTime(time);
                                setErrorMsg('');
                              }}
                              className={`p-1.5 rounded-lg border text-center text-[10px] font-bold transition-all ${
                                bookingTime === time
                                  ? 'bg-amber-400 border-amber-400 text-slate-900 shadow-md'
                                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                              }`}
                            >
                              <i className="far fa-clock ml-1"></i>
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                    <div className="flex flex-col">
                      <label className="block text-xs font-bold text-slate-400 mb-1.5">رقم جوال ولي الأمر للمتابعة وتأكيد الحضور (مطلوب)</label>
                      <div className="relative">
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                          <i className="fas fa-phone"></i>
                        </span>
                        <input
                          type="tel"
                          placeholder="05xxxxxxxx"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            setErrorMsg('');
                          }}
                          className="w-full bg-slate-900/60 border border-white/10 rounded-xl py-2 pr-10 pl-4 text-white placeholder-slate-500 font-mono focus:border-amber-400 focus:outline-none transition-all text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="bg-red-500/20 border border-red-500/30 text-red-200 text-xs px-4 py-2.5 rounded-lg font-bold flex items-center gap-2 animate-pulse">
                      <i className="fas fa-exclamation-circle text-red-400"></i>
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setStep('result')}
                      className="px-4 py-2 rounded-xl border border-white/10 text-slate-300 font-bold hover:bg-white/5 transition-all text-xs"
                    >
                      <i className="fas fa-chevron-right ml-1"></i> العودة للنتيجة
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        if (!bookingDate) {
                          setErrorMsg('الرجاء اختيار تاريخ الحجز أولاً 📅');
                          return;
                        }
                        if (!bookingTime) {
                          setErrorMsg('الرجاء اختيار فترة الحضور المناسبة لك ⏰');
                          return;
                        }
                        if (!phone.trim()) {
                          setErrorMsg('الرجاء كتابة رقم الجوال لتأكيد الحجز ومتابعة التسجيل 📱');
                          return;
                        }
                        if (!/^05\d{8}$/.test(phone.trim())) {
                          setErrorMsg('يرجى إدخال رقم جوال سعودي صحيح مكون من 10 خانات ويبدأ بـ 05');
                          return;
                        }
                        setStep('subscribed');
                      }}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg transition-all flex items-center gap-1.5 hover:scale-102 text-xs"
                    >
                      تأكيد الحجز والاستراك <i className="fas fa-check-circle"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 'subscribed' && (
              <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in relative z-10">
                <div className="w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center text-4xl text-slate-900 mb-6 animate-bounce shadow-[0_0_40px_rgba(245,158,11,0.6)]">
                  <i className="fas fa-trophy"></i>
                </div>
                <h4 className="text-3xl font-black mb-2 text-amber-400 animate-pulse">تم الانضمام بنجاح وحجز موعدك! ⚽</h4>
                <p className="text-base text-slate-300 max-w-md mx-auto leading-relaxed">
                  أهلاً بك في نادي رواد. لقد اجتزت الاختبار بنجاح وتم تفعيل عضويتك وحجز موعدك الميداني.
                </p>

                {bookingDate && bookingTime && (
                  <div className="mt-5 bg-slate-900/50 p-4 rounded-xl border border-white/10 max-w-sm w-full text-right">
                    <h5 className="text-amber-400 font-bold mb-2 flex items-center gap-1.5 text-xs justify-start">
                      <i className="fas fa-calendar-check text-slate-400"></i>
                      <span>تفاصيل موعد المقابلة الميدانية:</span>
                    </h5>
                    <div className="space-y-1.5 text-slate-300 text-xs">
                      <div className="flex justify-between">
                        <span className="opacity-70">نوع الخدمة:</span>
                        <span className="font-bold text-white text-left">{bookingType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-70">التاريخ المختار:</span>
                        <span className="font-bold text-white">{bookingDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-70">الوقت المحدد:</span>
                        <span className="font-bold text-white">{bookingTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-70">جوال ولي الأمر:</span>
                        <span className="font-bold text-white font-mono">{phone}</span>
                      </div>
                    </div>
                    <div className="mt-3 text-[10px] text-center text-emerald-400 font-bold border-t border-white/5 pt-2">
                       يرجى التواجد بمقر النادي بالزي الرياضي الموحد قبل الموعد بـ 15 دقيقة
                    </div>
                  </div>
                )}

                <div className="mt-6 flex flex-col items-center gap-4">
                  <div className="bg-emerald-500/20 text-emerald-400 px-6 py-2 rounded-full text-sm font-black border border-emerald-500/30">
                    رقم اللاعب الخاص بك: #RWAD-{playerId}
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
