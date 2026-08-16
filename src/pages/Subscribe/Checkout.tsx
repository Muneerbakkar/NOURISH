import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { plans, commonIngredients } from '../../data/mockData';
import { CheckCircle2, Calendar as CalendarIcon, ChevronLeft, ChevronRight, TrendingDown, Scale, TrendingUp } from 'lucide-react';

const iconMap = {
  TrendingDown: TrendingDown,
  Scale: Scale,
  TrendingUp: TrendingUp,
};

export function CheckoutDetails() {
  const { planId, durationId } = useParams();
  const navigate = useNavigate();
  const plan = plans.find(p => p.id === planId) || plans[0];
  const durationDays = parseInt(durationId || '7');
  const Icon = iconMap[plan.icon as keyof typeof iconMap];

  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    address: string;
    preferences: string[];
    allergies: string[];
  }>({
    name: '',
    phone: '',
    address: '',
    preferences: [],
    allergies: []
  });

  const toggleSelection = (field: 'allergies' | 'preferences', item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item) 
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const [skippedDates, setSkippedDates] = useState<string[]>([]);
  
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  const [currentMonth, setCurrentMonth] = useState(new Date(startDate.getFullYear(), startDate.getMonth(), 1));

  // Calculate covered dates dynamically based on duration and skipped dates
  const activeDates = new Set<string>();
  let tempDate = new Date(startDate);
  let daysCounted = 0;
  let endDate = new Date(startDate);

  while (daysCounted < durationDays) {
    const dateStr = `${tempDate.getFullYear()}-${tempDate.getMonth()}-${tempDate.getDate()}`;
    if (!skippedDates.includes(dateStr)) {
      activeDates.add(dateStr);
      daysCounted++;
      endDate = new Date(tempDate);
    }
    tempDate.setDate(tempDate.getDate() + 1);
  }

  const handleDayClick = (year: number, month: number, day: number) => {
    const clickedDate = new Date(year, month, day);
    if (clickedDate < startDate) return; // Cannot skip past dates

    const dateStr = `${year}-${month}-${day}`;
    setSkippedDates(prev => 
      prev.includes(dateStr) 
        ? prev.filter(d => d !== dateStr) 
        : [...prev, dateStr]
    );
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Complete Your Subscription</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">We just need a few details to start delivering your fresh meals.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Form Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[32px] shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Delivery Details</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                    <input type="text" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white transition-colors" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <input type="tel" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white transition-colors" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Delivery Address</label>
                  <textarea className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white transition-colors min-h-[100px]" placeholder="Full street address, apartment number, zip code..." value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required></textarea>
                </div>

                <hr className="border-slate-100 my-8" />

                <h2 className="text-2xl font-bold text-slate-900 mb-8">Dietary Requirements</h2>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4">Food Allergies (Optional)</label>
                  <div className="flex flex-wrap gap-2">
                    {commonIngredients.map(item => {
                      const isSelected = formData.allergies.includes(item);
                      return (
                        <button
                          key={`allergy-${item}`}
                          type="button"
                          onClick={() => toggleSelection('allergies', item)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${isSelected ? 'bg-red-50 text-red-600 border-red-200 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="pt-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-4">Special Preferences / Dislikes (Optional)</label>
                  <div className="flex flex-wrap gap-2">
                    {commonIngredients.map(item => {
                      const isSelected = formData.preferences.includes(item);
                      return (
                        <button
                          key={`pref-${item}`}
                          type="button"
                          onClick={() => toggleSelection('preferences', item)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${isSelected ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-emerald-50 p-6 md:p-10 rounded-2xl md:rounded-[32px] border border-emerald-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h3>
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-emerald-200">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                  {Icon && <Icon className="w-8 h-8" />}
                </div>
                <div>
                  <div className="font-bold text-lg text-slate-900">{plan.title} Plan</div>
                  <div className="text-emerald-700 font-medium">{durationDays} Days Subscription</div>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-700">3 Chef-prepared meals daily</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-700">Free delivery to your door</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-700">Cancel or pause anytime</span>
                </li>
              </ul>
            </div>

            {/* Delivery Calendar (Skip Days) */}
            <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[32px] shadow-sm border border-slate-200">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                    <CalendarIcon className="w-5 h-5" />
                 </div>
                 <div>
                   <h3 className="text-lg font-bold text-slate-900">Manage Deliveries</h3>
                   <p className="text-sm text-slate-500">Tap days you want to skip</p>
                 </div>
               </div>

               <div className="mb-4 flex items-center justify-between">
                 <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
                   <ChevronLeft className="w-5 h-5 text-slate-600" />
                 </button>
                 <span className="font-bold text-slate-800">{monthName}</span>
                 <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
                   <ChevronRight className="w-5 h-5 text-slate-600" />
                 </button>
               </div>

               <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-slate-400">
                 {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
               </div>
               
               <div className="grid grid-cols-7 gap-2">
                 {Array.from({ length: firstDay }).map((_, i) => (
                   <div key={`empty-${i}`} className="h-10"></div>
                 ))}
                 {Array.from({ length: daysInMonth }).map((_, i) => {
                   const day = i + 1;
                   const year = currentMonth.getFullYear();
                   const month = currentMonth.getMonth();
                   const dateStr = `${year}-${month}-${day}`;
                   const clickedDate = new Date(year, month, day);
                   
                   const isPast = clickedDate < startDate;
                   const isSkipped = skippedDates.includes(dateStr);
                   const isActive = activeDates.has(dateStr);
                   
                   let dayClass = 'bg-slate-50 text-slate-400';
                   if (isSkipped) {
                     dayClass = 'bg-red-50 text-red-600 border border-red-200 font-bold';
                   } else if (isActive) {
                     dayClass = 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold hover:bg-emerald-100 cursor-pointer shadow-sm';
                   } else if (!isPast) {
                     dayClass = 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50 cursor-pointer';
                   }

                   return (
                     <button 
                       key={day}
                       disabled={isPast && !isSkipped && !isActive}
                       onClick={() => handleDayClick(year, month, day)}
                       className={`h-10 rounded-xl flex items-center justify-center text-sm transition-all ${dayClass}`}
                     >
                       {day}
                     </button>
                   )
                 })}
               </div>
               
               <div className="mt-6 p-5 bg-slate-50 rounded-xl border border-slate-200">
                 <div className="flex justify-between items-center mb-3">
                   <span className="text-slate-600 text-sm font-medium">Start Date:</span>
                   <span className="text-slate-900 font-bold text-sm">{startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-slate-600 text-sm font-medium">End Date:</span>
                   <span className="text-emerald-700 font-bold text-sm">{endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                 </div>
                 {skippedDates.length > 0 && (
                   <div className="mt-4 pt-4 border-t border-slate-200">
                     <p className="text-xs text-red-600 font-medium mb-2">
                       Plan extended by {skippedDates.length} skipped day{skippedDates.length > 1 ? 's' : ''}.
                     </p>
                     <p className="text-xs text-slate-600 font-medium">
                       Extended dates: <span className="text-emerald-700 font-bold">{
                         Array.from(activeDates).slice(-skippedDates.length).map(d => {
                           const [y, m, date] = d.split('-');
                           return new Date(Number(y), Number(m), Number(date)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                         }).join(', ')
                       }</span>
                     </p>
                   </div>
                 )}
               </div>
            </div>

            <button 
              className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-emerald-600 transition-colors shadow-xl text-lg flex items-center justify-center gap-2"
              onClick={() => {
                alert('Checkout Complete! This is a demo.');
                navigate('/');
              }}
            >
              Complete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
