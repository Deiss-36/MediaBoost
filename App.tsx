import React, { useState, useEffect } from 'react';
import { NavBar } from './components/NavBar';
import { ServiceCard } from './components/ServiceCard';
import { AIPlanner } from './components/AIPlanner';
import { CheckoutForm } from './components/CheckoutForm';
import { EarnPoints } from './components/EarnPoints';
import { AuthModal } from './components/AuthModal';
import { SERVICES, EARN_TASKS } from './constants';
import { ServiceItem, CartItem, ServiceCategory, User } from './types';
import { ShoppingCart, Trash2, ArrowRight, ShieldCheck, Zap, Facebook, Wallet, Gamepad2, PlaySquare, BarChart3, Globe, Mail, Github, Gitlab, MessageCircle, Lock, Palette } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage or system preference
    if (typeof window !== 'undefined') {
        return localStorage.getItem('theme') === 'dark' || 
               (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return true;
  });

  // Apply theme class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleNavChange = (view: string) => {
    if (view === 'gaming') {
      setSelectedCategory(ServiceCategory.GAMING);
      setCurrentView('gaming');
    } else if (view === 'facebook-pages') {
      setSelectedCategory(ServiceCategory.FACEBOOK_PAGES);
      setCurrentView('facebook-pages');
    } else if (view === 'social') {
      setSelectedCategory(ServiceCategory.SOCIAL_GROWTH);
      setCurrentView('social');
    } else if (view === 'streaming') {
      setSelectedCategory(ServiceCategory.STREAMING);
      setCurrentView('streaming');
    } else if (view === 'financial') {
      setSelectedCategory(ServiceCategory.FINANCIAL);
      setCurrentView('financial');
    } else if (view === 'software') {
      setSelectedCategory(ServiceCategory.SOFTWARE);
      setCurrentView('software');
    } else if (view === 'services') {
      setSelectedCategory('ALL');
      setCurrentView('services');
    } else {
      setCurrentView(view);
    }
  };

  const addToCart = (service: ServiceItem, quantity: number = 1, customData: Record<string, string> = {}) => {
    setCart(prev => {
      // Create a unique key for the item based on ID and custom data
      const newItemKey = JSON.stringify({ id: service.id, ...customData });
      
      const existingIndex = prev.findIndex(item => {
          const itemKey = JSON.stringify({ id: item.id, ...item.customData });
          return itemKey === newItemKey;
      });

      if (existingIndex > -1) {
          // Update quantity if exactly same item configuration exists
          const newCart = [...prev];
          newCart[existingIndex].quantity += quantity;
          return newCart;
      }
      
      return [...prev, { ...service, quantity, customData }];
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckoutSuccess = () => {
    setCart([]);
    setCurrentView('home');
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleAddPoints = (points: number) => {
    if (!user) {
        setIsAuthModalOpen(true);
        return;
    }
    setUser(prev => prev ? ({ ...prev, points: prev.points + points }) : null);
  };

  const deductPoints = (amount: number) => {
    setUser(prev => prev ? ({ ...prev, points: Math.max(0, prev.points - amount) }) : null);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const renderHome = () => (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gold-500/10 dark:bg-gold-500/5 rounded-full blur-[120px] mix-blend-screen dark:mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-gold-600 dark:text-gold-400 text-sm font-medium mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
            </span>
            الوجهة الأولى للخدمات الرقمية وصفحات الفيسبوك
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            متجرك الشامل <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-500 via-gold-600 to-gold-500 dark:from-gold-300 dark:via-gold-500 dark:to-gold-300">
               للنمو والألعاب والترفيه
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
            أقوى متجر لبيع صفحات فيسبوك مفعلة الربح وموثقة، بالإضافة إلى خدمات بايبال وزيادة المتابعين وشحن الألعاب.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => handleNavChange('services')}
              className="px-8 py-4 bg-gold-500 text-slate-900 hover:bg-gold-400 rounded-xl font-bold text-lg transition-all shadow-xl shadow-gold-500/10 hover:shadow-gold-500/20 flex items-center justify-center gap-2"
            >
              تصفح الخدمات
              <ArrowRight size={18} className="rotate-180" />
            </button>
            <button 
              onClick={() => setCurrentView('ai-planner')}
              className="px-8 py-4 bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Zap size={18} />
              مستشار الذكاء الاصطناعي
            </button>
          </div>
        </div>
      </section>

      {/* Categories Grid (Quick Access) */}
      <section className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
               {/* Facebook Pages - Priority */}
              <button onClick={() => { setSelectedCategory(ServiceCategory.FACEBOOK_PAGES); setCurrentView('facebook-pages'); }} className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-blue-600/10 dark:hover:bg-blue-600/20 transition-all group lg:col-span-1 border-blue-500/30 shadow-blue-500/10">
                   <div className="p-3 bg-blue-500/10 rounded-full group-hover:bg-blue-600 text-blue-500 group-hover:text-white transition-colors relative">
                      <Facebook size={24} />
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                      </span>
                   </div>
                   <span className="text-slate-800 dark:text-white font-bold text-center">صفحات فيسبوك</span>
              </button>

              <button onClick={() => { setSelectedCategory(ServiceCategory.FINANCIAL); setCurrentView('financial'); }} className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-emerald-600/10 dark:hover:bg-emerald-600/20 transition-all group lg:col-span-1">
                   <div className="p-3 bg-emerald-500/10 rounded-full group-hover:bg-emerald-600 text-emerald-500 group-hover:text-white transition-colors">
                      <Wallet size={24} />
                   </div>
                   <span className="text-slate-800 dark:text-white font-bold text-center">خدمات مالية</span>
              </button>

              <button onClick={() => { setSelectedCategory(ServiceCategory.GAMING); setCurrentView('gaming'); }} className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-violet-600/10 dark:hover:bg-violet-600/20 transition-all group">
                   <div className="p-3 bg-violet-500/10 rounded-full group-hover:bg-violet-500 text-violet-400 group-hover:text-white transition-colors">
                      <Gamepad2 size={24} />
                   </div>
                   <span className="text-slate-800 dark:text-white font-bold">شحن الألعاب</span>
              </button>
              
              <button onClick={() => { setSelectedCategory(ServiceCategory.SOFTWARE); setCurrentView('software'); }} className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-purple-600/10 dark:hover:bg-purple-600/20 transition-all group">
                   <div className="p-3 bg-purple-500/10 rounded-full group-hover:bg-purple-500 text-purple-400 group-hover:text-white transition-colors">
                      <Palette size={24} />
                   </div>
                   <span className="text-slate-800 dark:text-white font-bold">برامج وتصاميم</span>
              </button>

              <button onClick={() => { setSelectedCategory(ServiceCategory.STREAMING); setCurrentView('streaming'); }} className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-red-600/10 dark:hover:bg-red-600/20 transition-all group">
                   <div className="p-3 bg-red-500/10 rounded-full group-hover:bg-red-500 text-red-400 group-hover:text-white transition-colors">
                      <PlaySquare size={24} />
                   </div>
                   <span className="text-slate-800 dark:text-white font-bold">ترفيه و Netflix</span>
              </button>
          </div>
      </section>

      {/* Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">لماذا يختار المحترفون MediaBoost؟</h2>
            <p className="text-slate-600 dark:text-slate-400">نقدم جودة تتحدث عن نفسها، مع ضمانات حقيقية.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-gold-500/30 transition-all">
            <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck size={24} className="text-gold-500 dark:text-gold-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">أمان وضمان 100%</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                جميع خدماتنا آمنة تماماً، وصفحات الفيسبوك تأتي مع ضمان نقل الملكية بالكامل.
            </p>
          </div>
          
          <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-purple-500/30 transition-all">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
              <Zap size={24} className="text-purple-500 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">تسليم فوري</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                معظم خدمات الشحن الرقمي (شدات، مجوهرات) يتم تسليمها بشكل فوري وآلي.
            </p>
          </div>
          
          <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-pink-500/30 transition-all">
            <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6">
              <BarChart3 size={24} className="text-pink-500 dark:text-pink-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">نتائج قابلة للقياس</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                نقدم صفحات جاهزة للأرباح فوراً، مما يوفر عليك شهوراً من العمل والانتظار.
            </p>
          </div>
        </div>
      </section>
    </div>
  );

  const renderServices = () => {
    const filteredServices = selectedCategory === 'ALL' 
      ? SERVICES 
      : SERVICES.filter(s => s.category === selectedCategory);

    const categories = [
      { id: 'ALL', label: 'الكل' },
      { id: ServiceCategory.FACEBOOK_PAGES, label: 'صفحات فيسبوك' },
      { id: ServiceCategory.SOFTWARE, label: 'برامج وتصاميم' },
      { id: ServiceCategory.FINANCIAL, label: 'خدمات بايبال' },
      { id: ServiceCategory.GAMING, label: 'الألعاب' },
      { id: ServiceCategory.STREAMING, label: 'اشتراكات' },
      { id: ServiceCategory.ACCOUNTS, label: 'حسابات أخرى' },
      { id: ServiceCategory.SOCIAL_GROWTH, label: 'باقات النمو' },
      { id: ServiceCategory.INTERACTIONS, label: 'التفاعل' },
      { id: ServiceCategory.ADS_MANAGEMENT, label: 'الإعلانات' },
    ];

    return (
      <div className="max-w-7xl mx-auto px-4 py-12 pb-24">
        
        {/* Dynamic Header based on category */}
        {selectedCategory === ServiceCategory.FINANCIAL ? (
             <div className="relative rounded-3xl overflow-hidden mb-12 bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-2xl animate-fade-in border border-emerald-500/30">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-900/30 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px] opacity-20 pointer-events-none"></div>
                
                <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-right flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 backdrop-blur-md border border-emerald-400/30 text-emerald-100 text-xs font-bold mb-4">
                            <ShieldCheck size={14} className="text-emerald-300" />
                            <span>بوابة مالية آمنة وموثوقة</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black mb-4">الخدمات المالية والرصيد</h2>
                        <p className="text-emerald-100/90 text-lg leading-relaxed max-w-xl">
                            نوفر لك حلول شحن الأرصدة (PayPal) وحسابات بنكية مفعلة جاهزة للاستخدام التجاري، مع ضمان كامل للأمان والسرية.
                        </p>
                    </div>
                    
                    {/* Visual Icons */}
                    <div className="flex gap-4 shrink-0">
                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex flex-col items-center justify-center backdrop-blur-md border border-white/10 shadow-lg hover:bg-emerald-500/30 transition-colors">
                            <Wallet size={32} className="text-emerald-300 mb-2" />
                            <span className="text-xs font-bold">محفظة</span>
                        </div>
                         <div className="w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex flex-col items-center justify-center backdrop-blur-md border border-white/10 shadow-lg hover:bg-emerald-500/30 transition-colors">
                            <Lock size={32} className="text-emerald-300 mb-2" />
                            <span className="text-xs font-bold">أمان 100%</span>
                        </div>
                    </div>
                </div>
             </div>
        ) : (
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">خدمات احترافية لنتائج حقيقية</h2>
                <p className="text-slate-600 dark:text-slate-400">اختر الحل الأنسب لنمو أعمالك وترفيهك</p>
            </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map(cat => (
             <button 
             key={cat.id}
             onClick={() => {
               setSelectedCategory(cat.id);
               if (cat.id === ServiceCategory.GAMING) setCurrentView('gaming');
               else if (cat.id === ServiceCategory.FACEBOOK_PAGES) setCurrentView('facebook-pages');
               else if (cat.id === ServiceCategory.SOCIAL_GROWTH) setCurrentView('social');
               else if (cat.id === ServiceCategory.STREAMING) setCurrentView('streaming');
               else if (cat.id === ServiceCategory.FINANCIAL) setCurrentView('financial');
               else if (cat.id === ServiceCategory.SOFTWARE) setCurrentView('software');
               else if (cat.id === 'ALL') setCurrentView('services');
               else setCurrentView('services');
             }}
             className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${
               selectedCategory === cat.id 
                 ? 'bg-gold-500 text-slate-900 border-gold-400 shadow-lg shadow-gold-500/20' 
                 : 'bg-white dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/10'
             }`}
           >
             {cat.label}
           </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onAddToCart={addToCart} 
            />
          ))}
        </div>
      </div>
    );
  };

  const renderCart = () => (
    <div className="max-w-5xl mx-auto px-4 py-12 pb-24 animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 flex items-center gap-3">
        <div className="p-3 bg-gold-500/20 rounded-xl border border-gold-500/20">
          <ShoppingCart className="text-gold-600 dark:text-gold-400" /> 
        </div>
        سلة الخدمات
      </h2>
      
      {cart.length === 0 ? (
        <div className="text-center py-24 glass-panel rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-slate-200 dark:ring-white/10">
            <ShoppingCart size={40} className="text-slate-400 dark:text-slate-500" />
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-xl font-medium mb-2">سلة المشتريات فارغة</p>
          <p className="text-slate-500 mb-8 text-sm">لم تقم بإضافة أي خدمات للنمو بعد.</p>
          <button 
            onClick={() => handleNavChange('services')}
            className="px-8 py-3 bg-gold-500 text-slate-900 rounded-xl hover:bg-gold-400 transition-all font-bold shadow-lg shadow-gold-500/20"
          >
            استعرض الخدمات
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="glass-card p-5 rounded-2xl flex items-center gap-5 hover:border-gold-500/30 transition-colors group">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1">{item.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                     <p className="text-gold-600 dark:text-gold-400 font-bold">${item.price}</p>
                     {item.unitSize && (
                         <span className="text-xs text-slate-500">
                             ({item.unitSize > 1000 ? `${item.unitSize/1000}k` : item.unitSize} {item.unitType})
                         </span>
                     )}
                  </div>
                  
                  {/* Display Custom Data Dynamically */}
                  {Object.entries(item.customData).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {Object.entries(item.customData).map(([key, value]) => (
                             key !== 'Type' && (
                                <div key={key} className="bg-slate-100 dark:bg-slate-900/50 rounded px-2 py-1 text-xs text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50 flex items-center gap-1">
                                    <span className="text-gold-600 dark:text-gold-500 font-bold">{key}:</span>
                                    <span className="truncate max-w-[150px] dir-ltr block">{value}</span>
                                </div>
                             )
                        ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-slate-600 dark:text-slate-300 font-bold text-sm border border-slate-200 dark:border-slate-700">
                    x{item.quantity}
                  </div>
                  <button 
                    onClick={() => removeFromCart(index)}
                    className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 rounded-2xl sticky top-24 border border-slate-200 dark:border-white/5 shadow-2xl">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">ملخص الطلب</h3>
              <div className="flex justify-between items-center mb-4 text-slate-600 dark:text-slate-300 text-sm">
                <span>المجموع الفرعي</span>
                <span className="font-mono">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-4 text-slate-600 dark:text-slate-300 text-sm">
                <span>رسوم الخدمة</span>
                <span className="font-mono text-emerald-500 dark:text-emerald-400">مجاناً</span>
              </div>
              <div className="h-px bg-slate-200 dark:bg-white/10 my-6"></div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-slate-800 dark:text-slate-200 font-bold">الإجمالي الكلي</span>
                <span className="text-3xl font-bold text-gold-500 dark:text-gold-400 font-mono tracking-tight">${cartTotal.toFixed(2)}</span>
              </div>

              {!user && (
                 <div className="mb-4 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20 text-xs text-amber-600 dark:text-amber-200">
                    يجب عليك تسجيل الدخول للمتابعة إلى الدفع.
                 </div>
              )}

              <button 
                onClick={() => {
                    if (user) {
                        setCurrentView('checkout');
                    } else {
                        setIsAuthModalOpen(true);
                    }
                }}
                className="w-full bg-gold-500 hover:bg-gold-400 text-slate-900 py-4 rounded-xl font-bold transition-all shadow-lg shadow-gold-500/20 active:scale-95 flex justify-center items-center gap-2"
              >
                {user ? (
                    <>
                        متابعة للدفع الآمن
                        <ArrowRight size={18} className="rotate-180" />
                    </>
                ) : (
                    <>تسجيل الدخول للمتابعة</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <NavBar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        currentView={currentView}
        setView={handleNavChange}
        userPoints={user ? user.points : 0}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      <main className="flex-grow">
        {currentView === 'home' && renderHome()}
        {['services', 'gaming', 'social', 'streaming', 'facebook-pages', 'financial', 'software'].includes(currentView) && renderServices()}
        {currentView === 'ai-planner' && <AIPlanner onAddToCart={addToCart} />}
        {currentView === 'cart' && renderCart()}
        {currentView === 'earn' && (
          <EarnPoints 
            tasks={EARN_TASKS} 
            userPoints={user ? user.points : 0} 
            onCompleteTask={handleAddPoints} 
          />
        )}
        {currentView === 'checkout' && user && (
          <CheckoutForm 
            cart={cart} 
            total={cartTotal} 
            onSuccess={handleCheckoutSuccess}
            onCancel={() => setCurrentView('cart')}
            userPoints={user.points}
            onDeductPoints={deductPoints}
          />
        )}
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* WhatsApp Support Floating Button */}
      <a
        href="https://wa.me/212608975464?text=مرحباً، أحتاج مساعدة في الموقع"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-[100] flex items-center bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all hover:scale-110 hover:-translate-y-1 group border border-white/10"
        title="تواصل عبر واتساب"
      >
         <MessageCircle size={28} className="fill-current" />
         <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-sm font-bold">
            <span className="pr-3">مساعدة في الشراء؟</span>
         </span>
      </a>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 border-t border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center">
                    <span className="text-slate-900 font-bold">M</span>
                </div>
                <span className="text-xl font-bold text-white">MediaBoost</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                المنصة الرائدة في الشرق الأوسط لخدمات النمو الرقمي وشحن الألعاب والخدمات الترفيهية.
              </p>
              
              <div className="flex gap-3">
                 <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all border border-slate-700 hover:border-slate-600">
                    <Github size={18} />
                 </a>
                 <a href="https://gitlab.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-[#fc6d26] hover:bg-slate-700 transition-all border border-slate-700 hover:border-slate-600">
                    <Gitlab size={18} />
                 </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">الشركة</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><button onClick={() => setCurrentView('home')} className="hover:text-gold-400 transition-colors">الرئيسية</button></li>
                <li><button onClick={() => setCurrentView('services')} className="hover:text-gold-400 transition-colors">خدماتنا</button></li>
                <li><button className="hover:text-gold-400 transition-colors">من نحن</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">الأقسام</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><button onClick={() => { setSelectedCategory(ServiceCategory.FACEBOOK_PAGES); setCurrentView('facebook-pages'); }} className="hover:text-gold-400 transition-colors">صفحات فيسبوك</button></li>
                <li><button onClick={() => { setSelectedCategory(ServiceCategory.GAMING); setCurrentView('gaming'); }} className="hover:text-gold-400 transition-colors">شحن ألعاب</button></li>
                <li><button onClick={() => { setSelectedCategory(ServiceCategory.ACCOUNTS); setCurrentView('services'); }} className="hover:text-gold-400 transition-colors">بيع الحسابات</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">تواصل معنا</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2"><Globe size={16}/> www.mediaboost.ai</li>
                <li className="flex items-center gap-2">
                   <Mail size={16} className="text-gold-500" /> 
                   <a href="mailto:essaiidriss.3@gmail.com" className="text-slate-300 hover:text-white transition-colors">essaiidriss.3@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-sm">© 2024 MediaBoost AI. جميع الحقوق محفوظة.</p>
            <div className="text-xs text-slate-700 font-mono">
               v1.5.0 • Theme Supported
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;