
import React, { useState } from 'react';

interface Kit {
  id: string;
  name: string;
  price: number;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
}

interface ShopSectionProps {
  kits: Kit[];
}

const ShopSection: React.FC<ShopSectionProps> = ({ kits }) => {
  const [playerName, setPlayerName] = useState('RWAD');
  const [playerNumber, setPlayerNumber] = useState('10');
  const [selectedKit, setSelectedKit] = useState<Kit>(kits[0]);

  const handleOrder = () => {
    alert(`تمت إضافة ${selectedKit.name} باسم (${playerName}) ورقم (${playerNumber}) إلى السلة!`);
  };

  return (
    <section id="shop" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-10 w-2 bg-emerald-600 rounded-full shadow-lg"></div>
        <div>
          <h2 className="text-3xl font-black text-slate-800">متجر ملابس الأكاديمية 👕</h2>
          <p className="text-slate-500 mt-1 font-medium">احصل على طقمك الرسمي المخصص الآن</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Jersey Preview Box */}
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-[3rem] shadow-2xl border border-slate-100 relative overflow-hidden min-h-[500px]">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div 
            className="relative w-64 h-80 transition-all duration-500 transform hover:scale-105"
            style={{ 
              backgroundColor: selectedKit?.primaryColor || '#059669',
              borderRadius: '20px 20px 5px 5px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
              border: `4px solid ${selectedKit?.secondaryColor || '#064e3b'}`
            }}
          >
            <div className="absolute -left-12 top-0 w-16 h-28" style={{ backgroundColor: selectedKit?.primaryColor, borderRadius: '15px 0 0 15px', border: `4px solid ${selectedKit?.secondaryColor}`, borderRight: 'none' }}></div>
            <div className="absolute -right-12 top-0 w-16 h-28" style={{ backgroundColor: selectedKit?.primaryColor, borderRadius: '0 15px 15px 0', border: `4px solid ${selectedKit?.secondaryColor}`, borderLeft: 'none' }}></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-8 bg-slate-900/10 rounded-b-full"></div>
            
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
              <span className="text-2xl font-black tracking-widest uppercase mb-2 break-all px-2" style={{ color: selectedKit?.textColor }}>{playerName || 'NAME'}</span>
              <span className="text-9xl font-black italic drop-shadow-md" style={{ color: selectedKit?.textColor }}>{playerNumber || '00'}</span>
            </div>
          </div>
        </div>

        {/* Customization Options */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <i className="fas fa-edit text-emerald-600"></i>
              خصص قميصك
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block text-xs font-black text-slate-400 mb-2 uppercase">الاسم المكتوب</label>
                <input 
                  type="text"
                  maxLength={10}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-emerald-900 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 mb-2 uppercase">الرقم المفضل</label>
                <input 
                  type="number"
                  value={playerNumber}
                  onChange={(e) => setPlayerNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-emerald-900 outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase">اختر النوع</label>
              <div className="grid grid-cols-1 gap-3">
                {kits.map((kit) => (
                  <button
                    key={kit.id}
                    onClick={() => setSelectedKit(kit)}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                      selectedKit?.id === kit.id ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 hover:border-emerald-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg shadow-inner" style={{ backgroundColor: kit.primaryColor }}></div>
                      <div className="text-right">
                        <p className="font-bold text-slate-800">{kit.name}</p>
                        <p className="text-xs text-slate-400">{kit.price} ريال</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleOrder} className="w-full mt-8 bg-emerald-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-3">
              <i className="fas fa-shopping-bag"></i> طلب القميص الآن
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
