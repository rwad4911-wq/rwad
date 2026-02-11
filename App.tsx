
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PortfolioSection from './components/PortfolioSection';
import SportsSection from './components/SportsSection';
import FeedbackSection from './components/FeedbackSection';
import GamesSection from './components/GamesSection';
import AcademySection from './components/AcademySection';
import ShopSection from './components/ShopSection';
import AcademyBook from './components/AcademyBook';
import CharitySection from './components/CharitySection';
import TeamsSection from './components/TeamsSection';
import AdminDashboard from './components/AdminDashboard';
import { StudentProfile, Achievement, TeacherFeedback } from './types';

const App: React.FC = () => {
  // Centralized State
  const [profile, setProfile] = useState<StudentProfile>({
    name: 'رواد عرب',
    age: 14,
    hobby: 'أحب كرة القدم ⚽',
    bio: 'أنا طالب شغوف بالتعلم والرياضة، أسعى دائماً لتطوير مهاراتي في الملعب وفي الصف الدراسي.'
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: '1', title: 'درجة كاملة في الرياضيات', description: 'حصلت على 100/100 في الاختبار النهائي.', date: '2023-12-10', category: 'academic' },
    { id: '2', title: 'قائد فريق المدرسة', description: 'تم اختياري كقائد لفريق كرة القدم بالمدرسة للروح الرياضية.', date: '2024-01-15', category: 'sport' },
    { id: '3', title: 'دورة البرمجة للمبتدئين', description: 'أنهيت دورة أساسيات Python بنجاح.', date: '2024-02-01', category: 'skill' },
  ]);

  const [feedbacks, setFeedbacks] = useState<TeacherFeedback[]>([
    { teacherName: "أ. محمد العتيبي", rating: 9, comment: "طالب مجتهد، يجمع بين التفوق الدراسي والنشاط الرياضي بشكل رائع. أتنبأ له بمستقبل مشرق.", date: "2024-03-01" }
  ]);

  const [tournaments, setTournaments] = useState([
    { name: "بطولة كأس المنطقة التعليمية", result: "المركز الأول 🥇", year: "2023", goals: "5 أهداف" },
    { name: "دوري النجوم للناشئين", result: "نصف النهائي", year: "2024", goals: "3 أهداف" },
    { name: "دورة الصداقة الرمضانية", result: "المركز الثالث 🥉", year: "2023", goals: "2 هدف" }
  ]);

  const [kits, setKits] = useState([
    { id: 'home', name: 'الطقم الأساسي', price: 150, primaryColor: '#059669', secondaryColor: '#064e3b', textColor: '#ffffff' },
    { id: 'away', name: 'الطقم الاحتياطي', price: 150, primaryColor: '#ffffff', secondaryColor: '#e2e8f0', textColor: '#064e3b' },
    { id: 'training', name: 'طقم التدريب', price: 120, primaryColor: '#f59e0b', secondaryColor: '#b45309', textColor: '#ffffff' }
  ]);

  const [storyPages, setStoryPages] = useState([
    {
      title: "البداية والحلم 🌟",
      content: "بدأت أكاديمية رواد كحلم بسيط في قلب ملعب صغير، حيث اجتمع مجموعة من المدربين الشغوفين لبناء جيل جديد يجمع بين الأخلاق الرياضية والمهارة العالية.",
      icon: "fa-seedling",
      imageColor: "from-emerald-500 to-green-700"
    },
    {
      title: "فلسفة التدريب 🧠",
      content: "في أكاديميتنا، نؤمن أن العقل يلعب قبل القدم. منهجنا يركز على التفكير التكتيكي، سرعة اتخاذ القرار، والعمل الجماعي.",
      icon: "fa-brain",
      imageColor: "from-blue-500 to-indigo-700"
    }
  ]);

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const scrollToIndex = (id: string) => {
    if (id === 'admin') {
      setIsAdminOpen(true);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden bg-emerald-50/50">
      <Navbar onNavigate={scrollToIndex} />
      
      <main>
        <Hero profile={profile} setProfile={setProfile} />
        
        <div id="portfolio">
          <PortfolioSection achievements={achievements} />
        </div>

        <div id="teams">
          <TeamsSection />
        </div>

        <div id="story">
          <AcademyBook pages={storyPages} />
        </div>

        <div id="charity">
          <CharitySection />
        </div>
        
        <div id="sports">
          <SportsSection tournaments={tournaments} />
        </div>

        <div id="academy">
          <AcademySection />
        </div>

        <div id="shop">
          <ShopSection kits={kits} />
        </div>

        <div id="games">
          <GamesSection />
        </div>
        
        <div id="feedback">
          <FeedbackSection feedbacks={feedbacks} setFeedbacks={setFeedbacks} />
        </div>
      </main>

      {isAdminOpen && (
        <AdminDashboard 
          profile={profile} 
          setProfile={setProfile}
          achievements={achievements}
          setAchievements={setAchievements}
          feedbacks={feedbacks}
          setFeedbacks={setFeedbacks}
          tournaments={tournaments}
          setTournaments={setTournaments}
          kits={kits}
          setKits={setKits}
          storyPages={storyPages}
          setStoryPages={setStoryPages}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      <footer className="text-center py-12 text-emerald-800/60 text-sm border-t border-emerald-100 bg-white/80 backdrop-blur-md">
        <p className="font-bold">تم التصميم بكل حب لطلاب المستقبل ⚽📚</p>
        <p className="mt-2 opacity-70 text-xs">© {new Date().getFullYear()} ملف إنجاز الطالب - رواد عرب</p>
      </footer>
    </div>
  );
};

export default App;
