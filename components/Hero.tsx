
import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { refineText } from '../services/geminiService';

interface HeroProps {
  profile: StudentProfile;
  setProfile: (p: StudentProfile) => void;
}

const Hero: React.FC<HeroProps> = ({ profile, setProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);

  const handleRefineBio = async () => {
    setLoadingAI(true);
    const refined = await refineText(profile.bio);
    setProfile({ ...profile, bio: refined });
    setLoadingAI(false);
  };

  return (
    <section id="home" className="relative sporty-gradient text-white py-20 px-6 rounded-b-[3rem] overflow-hidden shadow-2xl">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="relative">
          <div className="w-40 h-40 rounded-full border-4 border-white/30 overflow-hidden bg-white/10 flex items-center justify-center shadow-inner">
            <i className="fas fa-user-ninja text-6xl opacity-80"></i>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-blue-900 w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg">
            {profile.age}
          </div>
        </div>

        <div className="flex-1 text-center md:text-right">
          {isEditing ? (
            <div className="space-y-4">
              <input 
                value={profile.name} 
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg p-2 w-full text-white placeholder-white/50"
                placeholder="اسم الطالب"
              />
              <textarea 
                value={profile.bio} 
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg p-2 w-full text-white h-24"
                placeholder="نبذة تعريفية..."
              />
              <div className="flex gap-2 justify-center md:justify-start">
                <button onClick={() => setIsEditing(false)} className="bg-white text-blue-900 px-4 py-2 rounded-lg font-bold">حفظ</button>
                <button 
                  onClick={handleRefineBio} 
                  disabled={loadingAI}
                  className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2"
                >
                  <i className={`fas ${loadingAI ? 'fa-spinner fa-spin' : 'fa-wand-magic-sparkles'}`}></i>
                  تحسين بالذكاء الاصطناعي
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-black mb-4">أهلاً، أنا {profile.name || "[أدخل اسمك]"}</h1>
              <p className="text-xl opacity-90 mb-6 leading-relaxed">
                {profile.bio}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <i className="fas fa-futbol"></i> {profile.hobby}
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <i className="fas fa-calendar"></i> {profile.age} سنة
                </span>
                <button onClick={() => setIsEditing(true)} className="text-sm underline opacity-70 hover:opacity-100">تعديل الملف الشخصي</button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Abstract soccer ball background elements */}
      <div className="absolute top-10 right-10 opacity-10 pointer-events-none">
        <i className="fas fa-futbol text-[15rem] rotate-12"></i>
      </div>
    </section>
  );
};

export default Hero;
