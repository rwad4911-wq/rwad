
import React, { useState, useEffect, useRef } from 'react';

type GameState = 'idle' | 'playing' | 'ended';

interface Question {
  q: string;
  options: string[];
  answer: number;
}

const GamesSection: React.FC = () => {
  // Clicker Game State
  const [clickerState, setClickerState] = useState<GameState>('idle');
  const [clickerScore, setClickerScore] = useState(0);
  const [clickerTime, setClickerTime] = useState(10); // Reduced to 10s
  const [ballPos, setBallPos] = useState({ top: '50%', left: '50%' });
  const [showGoal, setShowGoal] = useState(false);
  const clickerTimerRef = useRef<number | null>(null);
  const ballMovementRef = useRef<number | null>(null);

  // Trivia Game State
  const [triviaState, setTriviaState] = useState<GameState>('idle');
  const [currentQ, setCurrentQ] = useState(0);
  const [triviaScore, setTriviaScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | 'timeout' | null>(null);
  const [triviaTimer, setTriviaTimer] = useState(7); // 7 seconds per question
  const triviaIntervalRef = useRef<number | null>(null);

  const questions: Question[] = [
    { q: "من هو اللاعب الوحيد الذي فاز بكأس العالم 3 مرات كلاعب؟", options: ["مارادونا", "بيليه", "رونالدو الظاهرة"], answer: 1 },
    { q: "أي منتخب فاز بلقب يورو 1992 بعد استدعاؤه كبديل ليوغوسلافيا؟", options: ["اليونان", "الدنمارك", "التشيك"], answer: 1 },
    { q: "من هو الهداف التاريخي لنهائيات كأس العالم في نسخة واحدة برصيد 13 هدفاً؟", options: ["جاست فونتين", "ميروسلاف كلوزه", "جيرد مولر"], answer: 0 },
    { q: "ما هو النادي الذي فاز بأول 5 نسخ متتالية من دوري أبطال أوروبا؟", options: ["ميلان", "بايرن ميونخ", "ريال مدريد"], answer: 2 },
  ];

  // Clicker Logic
  useEffect(() => {
    if (clickerState === 'playing') {
      clickerTimerRef.current = window.setInterval(() => {
        setClickerTime(t => {
          if (t <= 1) {
            clearInterval(clickerTimerRef.current!);
            clearInterval(ballMovementRef.current!);
            setClickerState('ended');
            return 0;
          }
          return t - 1;
        });
      }, 1000);

      // Ball moves automatically every 800ms if not clicked!
      ballMovementRef.current = window.setInterval(() => {
        moveBall();
      }, 800);
    }
    return () => {
      if (clickerTimerRef.current) clearInterval(clickerTimerRef.current);
      if (ballMovementRef.current) clearInterval(ballMovementRef.current);
    };
  }, [clickerState]);

  const startClicker = () => {
    setClickerScore(0);
    setClickerTime(10);
    setClickerState('playing');
    moveBall();
  };

  const moveBall = () => {
    const top = Math.random() * 75 + 10 + '%';
    const left = Math.random() * 75 + 10 + '%';
    setBallPos({ top, left });
  };

  const handleBallClick = () => {
    if (clickerState !== 'playing') return;
    
    // Reset the auto-movement timer on click to give a small window
    if (ballMovementRef.current) clearInterval(ballMovementRef.current);
    ballMovementRef.current = window.setInterval(() => moveBall(), 800);

    setClickerScore(s => s + 1);
    setShowGoal(true);
    setTimeout(() => setShowGoal(false), 300);
    moveBall();
  };

  // Trivia Logic
  useEffect(() => {
    if (triviaState === 'playing' && feedback === null) {
      triviaIntervalRef.current = window.setInterval(() => {
        setTriviaTimer(t => {
          if (t <= 1) {
            handleAnswer(-1); // Timeout
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (triviaIntervalRef.current) clearInterval(triviaIntervalRef.current);
    };
  }, [triviaState, currentQ, feedback]);

  const startTrivia = () => {
    setTriviaScore(0);
    setCurrentQ(0);
    setTriviaTimer(7);
    setTriviaState('playing');
    setFeedback(null);
  };

  const handleAnswer = (idx: number) => {
    if (feedback !== null) return;
    if (triviaIntervalRef.current) clearInterval(triviaIntervalRef.current);

    if (idx === questions[currentQ].answer) {
      setTriviaScore(s => s + 1);
      setFeedback('correct');
    } else if (idx === -1) {
      setFeedback('timeout');
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setTriviaTimer(7);
      if (currentQ < questions.length - 1) {
        setCurrentQ(c => c + 1);
      } else {
        setTriviaState('ended');
      }
    }, 1200);
  };

  return (
    <section id="games" className="py-16 px-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-10 w-2 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">ساحة التحدي: نمط المحترفين 🔥</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Game 1: Hardcore Clicker */}
        <div className="bg-gradient-to-br from-slate-900 via-emerald-900 to-black rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col items-center border-4 border-emerald-500/30">
          <div className="relative z-10 w-full text-center flex flex-col h-full justify-between flex-1">
            <div className="mb-4">
              <div className="inline-block bg-red-600 text-[10px] font-black px-2 py-1 rounded mb-2 uppercase tracking-tighter animate-pulse">Extreme Mode</div>
              <h3 className="text-2xl font-bold mb-1">صياد الأهداف السريعة ⚡</h3>
              <p className="text-xs opacity-60">الكرة لا تتوقف.. كن أسرع منها!</p>
            </div>

            {clickerState === 'idle' && (
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                   <i className="fas fa-bolt text-4xl text-yellow-400"></i>
                </div>
                <button onClick={startClicker} className="bg-emerald-500 text-white px-12 py-4 rounded-2xl font-black text-xl shadow-[0_10px_30px_rgba(16,185,129,0.4)] hover:scale-110 active:scale-95 transition-all">
                  دخول التحدي
                </button>
              </div>
            )}

            {clickerState === 'playing' && (
              <div className="flex justify-between w-full px-4 mb-4 relative z-30">
                <div className={`bg-black/50 backdrop-blur-md px-5 py-2 rounded-2xl border transition-colors ${clickerTime <= 3 ? 'border-red-500 animate-pulse' : 'border-white/10'}`}>
                  <span className="block text-[10px] uppercase opacity-60 font-black">الوقت المتبقي</span>
                  <span className={`text-2xl font-black tabular-nums ${clickerTime <= 3 ? 'text-red-500' : 'text-white'}`}>{clickerTime}s</span>
                </div>
                <div className="bg-black/50 backdrop-blur-md px-5 py-2 rounded-2xl border border-white/10">
                  <span className="block text-[10px] uppercase opacity-60 font-black">سكور المحترفين</span>
                  <span className="text-2xl font-black tabular-nums text-emerald-400">{clickerScore}</span>
                </div>
              </div>
            )}

            {clickerState === 'ended' && (
              <div className="flex-1 flex flex-col justify-center items-center animate-fade-in relative z-30">
                <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 mb-8 shadow-2xl">
                  <p className="text-[10px] font-black text-emerald-400 uppercase mb-2">النتيجة النهائية</p>
                  <p className="text-7xl font-black mb-2 tracking-tighter">{clickerScore}</p>
                  <p className="text-xs opacity-50 font-bold">هدقاً في النمط الصعب</p>
                </div>
                <button onClick={startClicker} className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-emerald-400 transition-colors">
                  إعادة المحاولة
                </button>
              </div>
            )}
          </div>

          {clickerState === 'playing' && (
            <>
              <button 
                onClick={handleBallClick}
                style={{ top: ballPos.top, left: ballPos.left }}
                className="absolute w-14 h-14 transition-all duration-150 ease-out z-20 group"
              >
                <i className="fas fa-futbol text-5xl drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] text-white group-hover:scale-125 transition-transform"></i>
              </button>
              {showGoal && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none animate-ping">
                  <span className="text-6xl font-black text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]">+1</span>
                </div>
              )}
            </>
          )}

          {/* Stadium BG Decor */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute inset-0 border-[20px] border-white/5 m-4 rounded-[2rem]"></div>
             <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/5"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/5 rounded-full"></div>
          </div>
        </div>

        {/* Game 2: Elite Football Trivia */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-black rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col border-4 border-blue-500/30">
          <div className="relative z-10 h-full flex flex-col">
            <div className="text-center mb-6">
              <div className="inline-block bg-blue-600 text-[10px] font-black px-2 py-1 rounded mb-2 uppercase tracking-tighter">Elite Knowledge</div>
              <h3 className="text-2xl font-bold mb-1">تحدي معلومات النخبة 🧠</h3>
              <p className="text-xs opacity-60">7 ثوانٍ فقط لكل سؤال.. هل أنت جاهز؟</p>
            </div>

            {triviaState === 'idle' && (
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                   <i className="fas fa-brain text-4xl text-blue-400"></i>
                </div>
                <button onClick={startTrivia} className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black text-xl shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:scale-110 active:scale-95 transition-all">
                  ابدأ الاختبار الصعب
                </button>
              </div>
            )}

            {triviaState === 'playing' && (
              <div className="flex-1 flex flex-col">
                <div className="mb-6">
                  <div className="flex justify-between items-end text-xs mb-3 font-black">
                    <div className="flex flex-col gap-1">
                       <span className="opacity-50">التقدم</span>
                       <span className="text-blue-400">السؤال {currentQ + 1} / {questions.length}</span>
                    </div>
                    <div className="text-center">
                       <span className="opacity-50 block mb-1">المؤقت</span>
                       <span className={`text-2xl tabular-nums ${triviaTimer <= 2 ? 'text-red-500 animate-bounce' : 'text-white'}`}>{triviaTimer}s</span>
                    </div>
                    <div className="flex flex-col gap-1 text-left">
                       <span className="opacity-50">النقاط</span>
                       <span className="text-emerald-400">{triviaScore}</span>
                    </div>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className={`h-full transition-all duration-1000 ${triviaTimer <= 2 ? 'bg-red-500' : 'bg-blue-400'}`} 
                      style={{ width: `${(triviaTimer / 7) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 mb-6 min-h-[120px] flex items-center justify-center text-center shadow-inner">
                  <h4 className="text-xl font-bold leading-relaxed">{questions[currentQ].q}</h4>
                </div>

                <div className="space-y-3">
                  {questions[currentQ].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={feedback !== null}
                      className={`w-full p-5 rounded-2xl text-right font-bold transition-all border-2 flex justify-between items-center group ${
                        feedback === null 
                          ? 'bg-white/5 border-white/5 hover:border-blue-500/50 hover:bg-white/10' 
                          : feedback === 'correct' && i === questions[currentQ].answer
                            ? 'bg-emerald-500/80 border-emerald-400 scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                            : feedback === 'wrong' && i === questions[currentQ].answer
                              ? 'bg-emerald-500/80 border-emerald-400'
                              : (feedback === 'wrong' || feedback === 'timeout') && i !== questions[currentQ].answer
                                ? 'bg-red-500/20 border-red-500/40 opacity-50'
                                : 'bg-white/5 border-white/5'
                      }`}
                    >
                      <span className="text-sm">{opt}</span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                         <i className="fas fa-chevron-left text-blue-400 text-xs"></i>
                      </div>
                    </button>
                  ))}
                </div>
                
                {feedback === 'timeout' && (
                  <div className="mt-4 text-center text-red-500 font-black animate-bounce">
                    <i className="fas fa-clock mr-2"></i> انتهى الوقت!
                  </div>
                )}
              </div>
            )}

            {triviaState === 'ended' && (
              <div className="flex-1 flex flex-col justify-center items-center text-center animate-fade-in">
                <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white text-4xl mb-6 shadow-2xl rotate-3 border-4 border-blue-400">
                  <i className="fas fa-award"></i>
                </div>
                <h4 className="text-3xl font-black mb-2">انتهى التحدي</h4>
                <div className="bg-white/5 px-8 py-4 rounded-2xl border border-white/10 mb-8">
                  <p className="text-4xl font-black text-blue-400">{triviaScore} / {questions.length}</p>
                  <p className="text-[10px] opacity-50 font-bold uppercase mt-1">نتيجة النخبة</p>
                </div>
                <button onClick={startTrivia} className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-blue-400 transition-colors">
                  إعادة المحاولة
                </button>
              </div>
            )}
          </div>

          {/* Abstract Stadium Lights */}
          <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
             <i className="fas fa-microchip text-[15rem] rotate-12"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
