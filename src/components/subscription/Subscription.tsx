import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, ArrowLeft, Coffee, Sun, Moon } from 'lucide-react';
import { plans } from '../../data/mockData';
import React, { useState, useRef, useEffect } from 'react';

const weeklyMenu = [
  {
    day: 1,
    breakfast: { 
      name: "Oatmeal with Berries & Nuts", 
      cals: "350 kcal", 
      desc: "Rolled oats, almond milk, fresh mixed berries, chia seeds.", 
      image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&q=80&w=600",
      benefits: ["High in antioxidants", "Provides sustained energy", "Supports heart health"],
      macros: { protein: "12g", carbs: "55g", fat: "10g" },
      micros: ["Iron", "Magnesium", "Vitamin C"]
    },
    lunch: { 
      name: "Grilled Chicken Quinoa Bowl", 
      cals: "550 kcal", 
      desc: "Marinated chicken breast, tricolor quinoa, roasted vegetables.", 
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
      benefits: ["Lean muscle building", "Complete protein profile", "Anti-inflammatory"],
      macros: { protein: "45g", carbs: "40g", fat: "15g" },
      micros: ["Vitamin B6", "Zinc", "Potassium"]
    },
    dinner: { 
      name: "Baked Salmon with Asparagus", 
      cals: "450 kcal", 
      desc: "Wild-caught salmon, lemon garlic asparagus, sweet potato mash.", 
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600",
      benefits: ["Rich in Omega-3s", "Supports brain function", "Low glycemic index"],
      macros: { protein: "35g", carbs: "25g", fat: "22g" },
      micros: ["Vitamin D", "Selenium", "Vitamin K"]
    }
  },
  {
    day: 2,
    breakfast: { name: "Avocado Toast with Egg", cals: "400 kcal", desc: "Whole grain sourdough, smashed avocado, poached egg, chili flakes.", image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&q=80&w=600", benefits: ["Healthy fats for satiety", "Promotes gut health", "Rich in fiber"], macros: { protein: "18g", carbs: "35g", fat: "22g" }, micros: ["Folate", "Vitamin E", "Potassium"] },
    lunch: { name: "Mediterranean Lentil Salad", cals: "480 kcal", desc: "Green lentils, cucumber, cherry tomatoes, feta, vinaigrette.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600", benefits: ["Plant-based protein", "Stabilizes blood sugar", "Heart-healthy fats"], macros: { protein: "20g", carbs: "55g", fat: "18g" }, micros: ["Iron", "Calcium", "Vitamin C"] },
    dinner: { name: "Turkey Meatballs & Zucchini Noodles", cals: "420 kcal", desc: "Lean turkey, homemade marinara, fresh zucchini noodles.", image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=600", benefits: ["Low-carb alternative", "High protein", "Antioxidant rich"], macros: { protein: "40g", carbs: "15g", fat: "18g" }, micros: ["Vitamin B12", "Lycopene", "Zinc"] }
  },
  {
    day: 3,
    breakfast: { name: "Greek Yogurt Parfait", cals: "320 kcal", desc: "Low-fat Greek yogurt, honey, granola, sliced peaches.", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600", benefits: ["Probiotics for digestion", "Calcium for bone health", "Quick energy"], macros: { protein: "22g", carbs: "45g", fat: "5g" }, micros: ["Calcium", "Vitamin D", "Phosphorus"] },
    lunch: { name: "Tuna Salad Lettuce Wraps", cals: "380 kcal", desc: "Albacore tuna, celery, light mayo, romaine lettuce leaves.", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=600", benefits: ["Low calorie density", "Omega-3 fatty acids", "Hydrating"], macros: { protein: "35g", carbs: "10g", fat: "20g" }, micros: ["Selenium", "Vitamin A", "Iodine"] },
    dinner: { name: "Lean Steak with Broccoli", cals: "550 kcal", desc: "Grass-fed sirloin, steamed broccoli, brown rice.", image: "https://images.unsplash.com/photo-1544025162-8111f4a7a0a0?auto=format&fit=crop&q=80&w=600", benefits: ["Muscle recovery", "Iron-rich", "High fiber"], macros: { protein: "48g", carbs: "40g", fat: "22g" }, micros: ["Iron", "Zinc", "Vitamin K"] }
  },
  {
    day: 4,
    breakfast: { name: "Protein Pancakes", cals: "450 kcal", desc: "Whey protein, oats, banana, sugar-free maple syrup.", image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=600", benefits: ["Muscle repairing", "Sustained morning energy", "No refined sugars"], macros: { protein: "35g", carbs: "50g", fat: "10g" }, micros: ["Potassium", "Vitamin B6", "Calcium"] },
    lunch: { name: "Chickpea & Spinach Curry", cals: "520 kcal", desc: "Chickpeas, spinach, coconut milk, basmati rice.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600", benefits: ["High in plant fiber", "Rich in healthy fats", "Anti-inflammatory spices"], macros: { protein: "18g", carbs: "65g", fat: "22g" }, micros: ["Iron", "Folate", "Magnesium"] },
    dinner: { name: "Lemon Herb Cod", cals: "390 kcal", desc: "Baked cod fillet, roasted brussels sprouts, quinoa.", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600", benefits: ["Ultra-lean protein", "Supports immune system", "Light on digestion"], macros: { protein: "40g", carbs: "35g", fat: "8g" }, micros: ["Iodine", "Vitamin C", "Vitamin B12"] }
  },
  {
    day: 5,
    breakfast: { name: "Spinach & Mushroom Omelet", cals: "360 kcal", desc: "Three eggs, fresh spinach, cremini mushrooms, feta.", image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&q=80&w=600", benefits: ["High quality protein", "Boosts brain health", "Vegetable forward"], macros: { protein: "24g", carbs: "8g", fat: "26g" }, micros: ["Choline", "Vitamin D", "Iron"] },
    lunch: { name: "Chicken Caesar Wrap", cals: "490 kcal", desc: "Grilled chicken, whole wheat wrap, romaine, light dressing.", image: "https://images.unsplash.com/photo-1626804475297-41609ea004eb?auto=format&fit=crop&q=80&w=600", benefits: ["Portable energy", "Lean protein source", "Complex carbs"], macros: { protein: "38g", carbs: "42g", fat: "18g" }, micros: ["Calcium", "Vitamin A", "Phosphorus"] },
    dinner: { name: "Stir-Fried Tofu & Veggies", cals: "410 kcal", desc: "Firm tofu, bell peppers, snap peas, soy-ginger glaze.", image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&q=80&w=600", benefits: ["Heart healthy soy", "Rich in antioxidants", "Low cholesterol"], macros: { protein: "22g", carbs: "35g", fat: "20g" }, micros: ["Vitamin C", "Calcium", "Iron"] }
  },
  {
    day: 6,
    breakfast: { name: "Smoothie Bowl", cals: "380 kcal", desc: "Acai, banana, spinach, topped with coconut and seeds.", image: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?auto=format&fit=crop&q=80&w=600", benefits: ["Antioxidant powerhouse", "Hydrating", "Omega-3 from seeds"], macros: { protein: "10g", carbs: "55g", fat: "16g" }, micros: ["Vitamin C", "Potassium", "Manganese"] },
    lunch: { name: "Quinoa Black Bean Salad", cals: "450 kcal", desc: "Quinoa, black beans, corn, red onion, lime vinaigrette.", image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=600", benefits: ["Complete plant protein", "High fiber content", "Sustained energy"], macros: { protein: "16g", carbs: "65g", fat: "14g" }, micros: ["Folate", "Magnesium", "Iron"] },
    dinner: { name: "Grilled Shrimp Skewers", cals: "430 kcal", desc: "Garlic shrimp, bell peppers, onions, wild rice.", image: "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&q=80&w=600", benefits: ["Low fat protein", "Heart healthy", "Supports joint health"], macros: { protein: "35g", carbs: "45g", fat: "10g" }, micros: ["Selenium", "Zinc", "Vitamin B12"] }
  },
  {
    day: 7,
    breakfast: { name: "Chia Seed Pudding", cals: "340 kcal", desc: "Chia seeds, almond milk, vanilla, fresh raspberries.", image: "https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?auto=format&fit=crop&q=80&w=600", benefits: ["Superfood energy", "High in soluble fiber", "Omega-3 rich"], macros: { protein: "8g", carbs: "35g", fat: "20g" }, micros: ["Calcium", "Magnesium", "Vitamin C"] },
    lunch: { name: "Turkey Wrap with Hummus", cals: "460 kcal", desc: "Sliced turkey breast, hummus, cucumber, spinach.", image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&q=80&w=600", benefits: ["Balanced macros", "Lean meats", "Gut-friendly hummus"], macros: { protein: "32g", carbs: "40g", fat: "18g" }, micros: ["Iron", "Vitamin B6", "Folate"] },
    dinner: { name: "Beef & Broccoli Stir-fry", cals: "510 kcal", desc: "Lean beef strips, broccoli florets, low-sodium soy sauce.", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600", benefits: ["Iron absorption", "Muscle building", "Immune support"], macros: { protein: "42g", carbs: "25g", fat: "26g" }, micros: ["Iron", "Zinc", "Vitamin C"] }
  }
];

export function SubscriptionPlan() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const plan = plans.find(p => p.id === planId) || plans[1];

  const handleSelectPlan = (durationId: string) => {
    navigate(`/plan/${planId}/menu/${durationId}`);
  };

  const subscriptionOptions = [
    {
      id: '7-day',
      title: '7 Day Plan',
      days: 7,
      description: 'Perfect for trying us out.',
      discount: 0,
      popular: false,
    },
    {
      id: '15-day',
      title: '15 Day Plan',
      days: 15,
      description: 'Build healthy habits over two weeks.',
      discount: 5,
      popular: true,
    },
    {
      id: '30-day',
      title: '30 Day Plan',
      days: 30,
      description: 'Commit to your goals and save more.',
      discount: 10,
      popular: false,
    }
  ];

  const calculatePrice = (days: number, discount: number) => {
    const dailyPrice = plan.pricePerWeek / 7;
    const basePrice = dailyPrice * days;
    const finalPrice = basePrice * (1 - discount / 100);
    return Math.round(finalPrice);
  };

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="max-w-5xl mx-auto w-full">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-emerald-600 mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">{plan.title} Subscription</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Choose how long you'd like to commit to the {plan.title.toLowerCase()} plan. The longer you commit, the more you save.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {subscriptionOptions.map((option, index) => {
            const price = calculatePrice(option.days, option.discount);
            const isFeatured = option.popular;
            
            return (
              <motion.div 
                key={option.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col p-6 md:p-8 rounded-2xl md:rounded-[32px] ${isFeatured ? 'bg-emerald-600 text-white shadow-xl lg:scale-105 z-10' : 'bg-white text-slate-900 border border-slate-200 shadow-sm'}`}
              >
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-300 text-emerald-900 text-xs font-black uppercase tracking-wider py-1 px-3 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <h3 className={`text-2xl font-bold mb-2 ${isFeatured ? 'text-white' : 'text-slate-900'}`}>{option.title}</h3>
                <p className={`text-sm mb-6 min-h-[40px] ${isFeatured ? 'text-emerald-50' : 'text-slate-500'}`}>{option.description}</p>
                
                <div className="mb-6 flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-extrabold">₹{price}</span>
                  <span className={`text-sm font-medium ${isFeatured ? 'text-emerald-200' : 'text-slate-400'}`}>total</span>
                </div>

                {option.discount > 0 && (
                  <div className={`inline-block mb-8 px-3 py-1 rounded-full text-xs font-bold w-fit ${isFeatured ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-700'}`}>
                    Save {option.discount}%
                  </div>
                )}
                {!option.discount && <div className="mb-8 h-6"></div>}

                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${isFeatured ? 'text-emerald-300' : 'text-emerald-500'}`} />
                    <span className="font-medium text-sm">Chef-prepared meals</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${isFeatured ? 'text-emerald-300' : 'text-emerald-500'}`} />
                    <span className="font-medium text-sm">Free daily delivery</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${isFeatured ? 'text-emerald-300' : 'text-emerald-500'}`} />
                    <span className="font-medium text-sm">{plan.title} macros</span>
                  </li>
                </ul>

                <button 
                  onClick={() => handleSelectPlan(option.id)}
                  className={`w-full py-4 rounded-2xl font-bold transition-colors flex items-center justify-center gap-2 ${isFeatured ? 'bg-white text-emerald-700 hover:bg-slate-50' : 'bg-slate-100 text-slate-800 hover:bg-emerald-50 hover:text-emerald-600'}`}
                >
                  Select Plan <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function PlanMenu() {
  const { planId, durationId } = useParams();
  const navigate = useNavigate();
  const plan = plans.find(p => p.id === planId) || plans[1];
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');

  const durationDays = parseInt(durationId?.split('-')[0] || '7');

  // Generate menu for the full duration by repeating the 6-day menu
  const sixDayMenu = weeklyMenu.slice(0, 6);
  const fullMenu = Array.from({ length: durationDays }, (_, i) => {
    const baseMeal = sixDayMenu[i % 6];
    return {
      ...baseMeal,
      day: i + 1
    };
  });

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-emerald-600 mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Plans
        </button>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Your {plan.title} Menu</h2>
          <p className="text-slate-500 text-lg">
            Here is a sneak peek at what you'll be eating on the {plan.title} plan for {durationDays} days.
          </p>
        </div>

        {/* Meal Type Navigation */}
        <div className="flex overflow-x-auto gap-4 pb-4 mb-8 justify-center snap-x hide-scrollbar">
          {(['breakfast', 'lunch', 'dinner'] as const).map((mealType) => (
            <button
              key={mealType}
              onClick={() => setSelectedMealType(mealType)}
              className={`snap-center shrink-0 px-8 py-3 rounded-full font-bold transition-all capitalize ${
                selectedMealType === mealType 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {mealType}
            </button>
          ))}
        </div>

        {/* Meals Grid */}
        <motion.div 
          key={selectedMealType}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {fullMenu.map((dayMenu, idx) => {
            const meal = dayMenu[selectedMealType];
            const icon = selectedMealType === 'breakfast' ? <Coffee className="w-5 h-5" /> : selectedMealType === 'lunch' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />;
            const color = selectedMealType === 'breakfast' ? 'text-amber-500' : selectedMealType === 'lunch' ? 'text-orange-500' : 'text-indigo-500';

            return (
              <div 
                key={idx}
                onClick={() => navigate(`/plan/${planId}/menu/${durationId}/meal/${dayMenu.day}/${selectedMealType}`)}
                className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1"
              >
                <div className="w-full h-48 relative bg-slate-100">
                  <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                  <div className={`absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm ${color} rounded-2xl flex items-center justify-center shadow-sm`}>
                    {icon}
                  </div>
                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    Day {dayMenu.day}
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">{meal.name}</h3>
                  <p className="text-slate-500 text-sm mb-6 flex-grow">{meal.desc}</p>
                  <div className="font-semibold text-emerald-600 mt-auto">{meal.cals}</div>
                </div>
              </div>
            );
          })}
        </motion.div>
        
        <div className="mt-12 text-center">
           <button 
             onClick={() => {
               const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
               if (isLoggedIn) {
                 navigate(`/checkout/${planId}/${durationId}`);
               } else {
                 navigate('/login', { state: { from: { pathname: `/checkout/${planId}/${durationId}` } } });
               }
             }}
             className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-12 rounded-full shadow-lg transition-transform hover:scale-105"
           >
             Checkout & Start {durationDays} Days
           </button>
        </div>
      </div>
    </div>
  );
}

export function MealDetails() {
  const { planId, durationId, dayId, mealType } = useParams();
  const navigate = useNavigate();
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [zoomProps, setZoomProps] = useState({ scale: 1, x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const zoomStateRef = useRef({ scale: 1, x: 50, y: 50 });
  
  const dayIndex = (parseInt(dayId || '1') - 1) % 6;
  const mealTypeStr = mealType as 'breakfast' | 'lunch' | 'dinner';
  const meal = weeklyMenu[dayIndex]?.[mealTypeStr];

  // reset image index when navigating between meals
  useEffect(() => {
    setActiveImageIndex(0);
  }, [meal]);

  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container) return;

    let initialDist = 0;
    let initialScale = 1;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;

      zoomStateRef.current = {
        ...zoomStateRef.current,
        scale: Math.min(Math.max(1, zoomStateRef.current.scale - e.deltaY * 0.01), 5),
        x,
        y
      };
      
      setZoomProps({ ...zoomStateRef.current });
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialDist = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
        initialScale = zoomStateRef.current.scale;
        
        const centerX = (touch1.clientX + touch2.clientX) / 2;
        const centerY = (touch1.clientY + touch2.clientY) / 2;
        const { left, top, width, height } = container.getBoundingClientRect();
        
        zoomStateRef.current = {
          ...zoomStateRef.current,
          x: ((centerX - left) / width) * 100,
          y: ((centerY - top) / height) * 100
        };
        setZoomProps({ ...zoomStateRef.current });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const dist = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
        
        const newScale = Math.min(Math.max(1, initialScale * (dist / initialDist)), 5);
        
        zoomStateRef.current = {
          ...zoomStateRef.current,
          scale: newScale
        };
        setZoomProps({ ...zoomStateRef.current });
      } else if (e.touches.length === 1 && zoomStateRef.current.scale > 1) {
        e.preventDefault(); // Prevent page scroll when zoomed in
        
        // Allow panning with 1 finger
        const touch = e.touches[0];
        const { left, top, width, height } = container.getBoundingClientRect();
        const x = ((touch.clientX - left) / width) * 100;
        const y = ((touch.clientY - top) / height) * 100;
        
        zoomStateRef.current = {
          ...zoomStateRef.current,
          x,
          y
        };
        setZoomProps({ ...zoomStateRef.current });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  if (!meal) {
    return (
      <div className="py-24 bg-slate-50 min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-500">Meal not found.</p>
      </div>
    );
  }

  const extras = {
    breakfast: [
      "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?auto=format&fit=crop&q=80&w=600"
    ],
    lunch: [
      "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=600"
    ],
    dinner: [
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&q=80&w=600"
    ]
  };

  const galleryImages = [meal.image, ...extras[mealTypeStr]];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    zoomStateRef.current = { ...zoomStateRef.current, x, y };
    setZoomProps({ ...zoomStateRef.current });
  };

  const handleMouseLeave = () => {
    zoomStateRef.current = { scale: 1, x: 50, y: 50 };
    setZoomProps({ ...zoomStateRef.current });
  };

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-emerald-600 mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Menu
        </button>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl md:rounded-[32px] overflow-hidden shadow-sm border border-slate-200 p-6 md:p-12 lg:p-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Left Column: Product Gallery */}
            <div className="flex flex-col gap-6">
              <div 
                ref={imageContainerRef}
                className={`w-full aspect-[4/3] rounded-2xl md:rounded-3xl relative bg-slate-100 overflow-hidden border border-slate-100 ${zoomProps.scale > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img 
                  src={galleryImages[activeImageIndex]} 
                  alt={meal.name} 
                  className="w-full h-full object-cover transition-opacity duration-500" 
                  style={{
                    transformOrigin: `${zoomProps.x}% ${zoomProps.y}%`,
                    transform: `scale(${zoomProps.scale})`,
                    transition: zoomProps.scale > 1 ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </div>
              
              {/* Thumbnails Row */}
              <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                {galleryImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-24 h-24 shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-emerald-500 shadow-md scale-105' : 'border-transparent opacity-60 hover:opacity-100 hover:border-slate-300'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Gallery thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Product Details */}
            <div className="flex flex-col">
              <div className="text-emerald-600 font-black tracking-widest uppercase text-xs mb-4">
                Day {dayId} &bull; {mealTypeStr}
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                {meal.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl md:text-4xl font-black text-emerald-500">{meal.cals}</span>
                <span className="text-slate-400 font-medium bg-slate-100 px-3 py-1 rounded-full text-sm">Per Serving</span>
              </div>
              
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                {meal.desc} Expertly crafted by our nutritionists, this meal ensures you get the perfect balance of flavor and fuel. Every ingredient is carefully sourced to provide maximum nutritional value, support your metabolism, and keep you satisfied throughout the day.
              </p>

              <div className="mb-10">
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Key Benefits</h4>
                <ul className="space-y-4">
                  {meal.benefits.map((benefit: string, i: number) => (
                    <li key={i} className="flex items-center gap-4">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                      <span className="text-slate-800 font-bold text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          <hr className="border-slate-100 my-16" />

          {/* Bottom Section: Nutrition Facts Specifications */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-10">Detailed Nutrition Facts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              
              {/* Macros */}
              <div className="bg-slate-50 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-200">
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8">Macronutrients</h4>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between text-lg mb-3">
                      <span className="font-semibold text-slate-600">Protein</span>
                      <span className="font-black text-slate-900">{meal.macros.protein}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div className="bg-blue-500 h-3 rounded-full shadow-sm" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-lg mb-3">
                      <span className="font-semibold text-slate-600">Carbs</span>
                      <span className="font-black text-slate-900">{meal.macros.carbs}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div className="bg-amber-500 h-3 rounded-full shadow-sm" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-lg mb-3">
                      <span className="font-semibold text-slate-600">Fat</span>
                      <span className="font-black text-slate-900">{meal.macros.fat}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div className="bg-red-500 h-3 rounded-full shadow-sm" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Micros */}
              <div className="bg-emerald-50/50 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-emerald-100">
                <h4 className="text-sm font-black uppercase tracking-widest text-emerald-600/70 mb-8">Micronutrient Profile</h4>
                <p className="text-slate-600 mb-6">This meal is particularly rich in the following essential vitamins and minerals:</p>
                <div className="flex flex-wrap gap-3">
                  {meal.micros.map((micro: string, i: number) => (
                    <span key={i} className="bg-white text-emerald-700 px-5 py-3 rounded-xl text-base font-bold border border-emerald-100 shadow-sm">
                      {micro}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function MenuExplorer() {
  const [planId, setPlanId] = useState('balance');
  const [durationId, setDurationId] = useState('7-days');
  const navigate = useNavigate();

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Explore Our Menus</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Preview the delicious, chef-crafted meals you'll enjoy on each of our specialized diet plans.</p>
        </div>
        
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-sm border border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">1. Select your diet goal</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {plans.map(p => (
              <button 
                key={p.id}
                onClick={() => setPlanId(p.id)}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${planId === p.id ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 hover:border-emerald-200'}`}
              >
                <h4 className="font-bold text-lg text-slate-900 mb-2">{p.title}</h4>
                <p className="text-sm text-slate-600">{p.description}</p>
              </button>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-6">2. Select duration</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { id: '7-days', label: '7 Days', desc: 'A great starter plan to build habits.' },
              { id: '15-days', label: '15 Days', desc: 'Commit to better eating and feel the difference.' },
              { id: '30-days', label: '30 Days', desc: 'A full month of transformation and consistency.' }
            ].map(d => (
              <button 
                key={d.id}
                onClick={() => setDurationId(d.id)}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${durationId === d.id ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 hover:border-emerald-200'}`}
              >
                <h4 className="font-bold text-lg text-slate-900 mb-2">{d.label}</h4>
                <p className="text-sm text-slate-600">{d.desc}</p>
              </button>
            ))}
          </div>

          <div className="text-center pt-8 border-t border-slate-100">
            <button 
              onClick={() => navigate(`/plan/${planId}/menu/${durationId}`)}
              className="bg-slate-900 text-white font-bold text-lg px-12 py-4 rounded-full hover:bg-emerald-600 transition-colors shadow-lg"
            >
              View {plans.find(p => p.id === planId)?.title || 'Plan'} Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
