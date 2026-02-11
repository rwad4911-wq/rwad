
import React, { useState } from 'react';
import { TeacherFeedback } from '../types';

interface FeedbackSectionProps {
  feedbacks: TeacherFeedback[];
  setFeedbacks: (f: TeacherFeedback[]) => void;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ feedbacks, setFeedbacks }) => {
  const [newName, setNewName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(10);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newComment) return;
    
    setFeedbacks([{
      teacherName: newName,
      comment: newComment,
      rating: newRating,
      date: new Date().toLocaleDateString('ar-EG')
    }, ...feedbacks]);
    
    setNewName("");
    setNewComment("");
    setShowForm(false);
  };

  return (
    <section id="feedback" className="py-16 px-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-2 bg-blue-600 rounded-full"></div>
          <h2 className="text-3xl font-black text-blue-900">تقييم المعلمين</h2>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
        >
          {showForm ? 'إلغاء' : 'إضافة تقييم'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 mb-10 animate-fade-in">
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">اسم المعلم</label>
              <input 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="أدخل اسم المعلم..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">التقييم (من 10)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" min="1" max="10" 
                  value={newRating}
                  onChange={(e) => setNewRating(parseInt(e.target.value))}
                  className="flex-1 accent-blue-600"
                />
                <span className="text-2xl font-black text-blue-600">{newRating}/10</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">ملاحظات المعلم</label>
              <textarea 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none h-32"
                placeholder="اكتب ملاحظات المعلم هنا..."
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-black hover:bg-blue-700 transition-all shadow-xl">
              حفظ التقييم
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {feedbacks.map((f, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-6 items-start">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center text-slate-400">
              <i className="fas fa-user-tie text-3xl"></i>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-xl text-slate-800">{f.teacherName}</h3>
                <div className="flex items-center gap-1 text-yellow-500">
                   {Array.from({ length: 5 }).map((_, starIdx) => (
                     <i key={starIdx} className={`fas fa-star ${starIdx < Math.round(f.rating / 2) ? '' : 'opacity-20'}`}></i>
                   ))}
                </div>
              </div>
              <p className="text-slate-600 italic leading-relaxed mb-4">"{f.comment}"</p>
              <div className="text-xs font-bold text-slate-400">تاريخ التقييم: {f.date}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeedbackSection;
