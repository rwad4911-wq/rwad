
import React, { useState } from 'react';
import { StudentProfile, Achievement, TeacherFeedback } from '../types';

interface Kit {
  id: string;
  name: string;
  price: number;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
}

interface Page {
  title: string;
  content: string;
  icon: string;
  imageColor: string;
}

interface AdminDashboardProps {
  profile: StudentProfile;
  setProfile: (p: StudentProfile) => void;
  achievements: Achievement[];
  setAchievements: (a: Achievement[]) => void;
  feedbacks: TeacherFeedback[];
  setFeedbacks: (f: TeacherFeedback[]) => void;
  tournaments: any[];
  setTournaments: (t: any[]) => void;
  kits: Kit[];
  setKits: (k: Kit[]) => void;
  storyPages: Page[];
  setStoryPages: (p: Page[]) => void;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
  const [activeTab, setActiveTab] = useState('profile');

  const handleDelete = (list: any[], setList: Function, idKey: string, idValue: any) => {
    if (window.confirm('هل أنت متأكد من الحذف؟')) {
      setList(list.filter(item => item[idKey] !== idValue));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-4 animate-fade-in">
            <h4 className="font-bold text-slate-800 border-b pb-2">بيانات الملف الشخصي</h4>
            <div className="grid grid-cols-2 gap-4">
              <input 
                className="bg-slate-50 p-3 rounded-xl border" 
                value={props.profile.name} 
                onChange={e => props.setProfile({...props.profile, name: e.target.value})}
                placeholder="الاسم"
              />
              <input 
                className="bg-slate-50 p-3 rounded-xl border" 
                type="number" 
                value={props.profile.age} 
                onChange={e => props.setProfile({...props.profile, age: parseInt(e.target.value)})}
                placeholder="العمر"
              />
            </div>
            <textarea 
              className="w-full bg-slate-50 p-3 rounded-xl border h-32" 
              value={props.profile.bio} 
              onChange={e => props.setProfile({...props.profile, bio: e.target.value})}
              placeholder="النبذة التعريفية"
            />
          </div>
        );
      case 'achievements':
        return (
          <div className="space-y-4 animate-fade-in">
             <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-800">إدارة الإنجازات</h4>
                <button 
                  onClick={() => props.setAchievements([{id: Date.now().toString(), title: 'إنجاز جديد', description: 'وصف الإنجاز', date: '2024', category: 'sport'}, ...props.achievements])}
                  className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs"
                >+ إضافة</button>
             </div>
             <div className="max-h-[400px] overflow-y-auto space-y-2 no-scrollbar">
               {props.achievements.map((ach) => (
                 <div key={ach.id} className="bg-slate-50 p-3 rounded-xl border flex justify-between items-center">
                   <div className="flex-1">
                     <input 
                        className="bg-transparent font-bold w-full outline-none" 
                        value={ach.title} 
                        onChange={e => props.setAchievements(props.achievements.map(a => a.id === ach.id ? {...a, title: e.target.value} : a))}
                     />
                   </div>
                   <button onClick={() => handleDelete(props.achievements, props.setAchievements, 'id', ach.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                     <i className="fas fa-trash"></i>
                   </button>
                 </div>
               ))}
             </div>
          </div>
        );
      case 'shop':
        return (
          <div className="space-y-4 animate-fade-in">
            <h4 className="font-bold text-slate-800">إدارة أطقم المتجر</h4>
            <div className="grid gap-3">
              {props.kits.map((kit) => (
                <div key={kit.id} className="bg-slate-50 p-4 rounded-xl border grid grid-cols-3 gap-2 items-center">
                  <input className="font-bold bg-transparent outline-none" value={kit.name} onChange={e => props.setKits(props.kits.map(k => k.id === kit.id ? {...k, name: e.target.value} : k))} />
                  <input type="number" className="bg-white border rounded p-1 text-center" value={kit.price} onChange={e => props.setKits(props.kits.map(k => k.id === kit.id ? {...k, price: parseInt(e.target.value)} : k))} />
                  <div className="flex gap-2 justify-end">
                    <input type="color" value={kit.primaryColor} onChange={e => props.setKits(props.kits.map(k => k.id === kit.id ? {...k, primaryColor: e.target.value} : k))} className="w-8 h-8 rounded cursor-pointer" />
                    <button onClick={() => handleDelete(props.kits, props.setKits, 'id', kit.id)} className="text-red-500"><i className="fas fa-trash"></i></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'feedback':
        return (
          <div className="space-y-4 animate-fade-in">
            <h4 className="font-bold text-slate-800">إدارة تقييمات المعلمين</h4>
            <div className="space-y-2">
              {props.feedbacks.map((f, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded-xl border flex justify-between items-center">
                  <div>
                    <p className="font-bold">{f.teacherName}</p>
                    <p className="text-xs text-slate-500 truncate max-w-xs">{f.comment}</p>
                  </div>
                  <button onClick={() => handleDelete(props.feedbacks, props.setFeedbacks, 'teacherName', f.teacherName)} className="text-red-500"><i className="fas fa-trash"></i></button>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div className="p-10 text-center opacity-50">اختر تبويب للبدء في التعديل</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl h-[80vh] rounded-[2.5rem] shadow-2xl flex overflow-hidden border-4 border-emerald-600/20 animate-fade-in">
        
        {/* Sidebar */}
        <div className="w-64 bg-slate-900 text-white p-8 flex flex-col gap-2">
          <div className="mb-8 flex items-center gap-3">
             <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
               <i className="fas fa-tools"></i>
             </div>
             <span className="font-black">لوحة الإدارة</span>
          </div>
          
          {[
            { id: 'profile', icon: 'fa-user', label: 'الملف الشخصي' },
            { id: 'achievements', icon: 'fa-trophy', label: 'الإنجازات' },
            { id: 'shop', icon: 'fa-shirt', label: 'المتجر' },
            { id: 'feedback', icon: 'fa-comment', label: 'التقييمات' },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all font-bold text-sm ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow-lg' : 'hover:bg-white/5 opacity-60 hover:opacity-100'}`}
            >
              <i className={`fas ${tab.icon} w-5`}></i>
              {tab.label}
            </button>
          ))}

          <div className="mt-auto flex flex-col gap-3">
            <button 
              onClick={props.onClose}
              className="w-full bg-red-500/10 text-red-400 p-3 rounded-xl font-bold text-sm hover:bg-red-500 hover:text-white transition-all"
            >
              إغلاق
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-10 bg-white overflow-y-auto no-scrollbar">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
