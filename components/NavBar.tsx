import React from 'react';
import { ShoppingCart, Zap, Menu, LayoutGrid, BrainCircuit, Coins, LogIn, Gamepad2, PlaySquare, TrendingUp, Facebook, Wallet, Sun, Moon, Palette } from 'lucide-react';
import { User } from '../types';

interface NavBarProps {
  cartCount: number;
  currentView: string;
  setView: (view: string) => void;
  userPoints: number;
  user: User | null;
  onOpenAuth: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ cartCount, currentView, setView, userPoints, user, onOpenAuth, isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: <LayoutGrid size={18} /> },
    { id: 'facebook-pages', label: 'صفحات فيسبوك', icon: <Facebook size={18} className="text-blue-500" /> },
    { id: 'software', label: 'برامج وتصاميم', icon: <Palette size={18} className="text-purple-500" /> },
    { id: 'financial', label: 'خدمات مالية', icon: <Wallet size={18} className="text-emerald-500" /> },
    { id: 'social', label: 'متابعين', icon: <TrendingUp size={18} className="text-pink-500" /> },
    { id: 'gaming', label: 'ألعاب', icon: <Gamepad2 size={18} className="text-violet-500" /> },
    { id: 'streaming', label: 'ترفيه', icon: <PlaySquare size={18} className="text-red-500" /> },
    { id: 'services', label: 'المزيد', icon: <Zap size={18} /> },
    { id: 'earn', label: 'النقاط', icon: <Coins size={18} className="text-gold-500" /> },
    { id: 'ai-planner', label: 'AI', icon: <BrainCircuit size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b-0 shadow-lg shadow-black/5 dark:shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer group shrink-0" onClick={() => setView('home')}>
            <div className="w-9 h-9 bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 rounded-xl flex items-center justify-center mr-2 ml-2 shadow-lg shadow-gold-500/20 group-hover:shadow-gold-500/40 transition-all duration-300">
              <span className="text-slate-900 font-black text-xl tracking-tighter">M</span>
            </div>
            <span className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight hidden sm:block">
              MediaBoost
            </span>
          </div>

          {/* Desktop Nav - Changed to 2xl to prevent overcrowding on laptops */}
          <div className="hidden 2xl:block">
            <div className="flex items-baseline space-x-1 space-x-reverse bg-slate-100/50 dark:bg-white/5 p-1 rounded-full border border-slate-200 dark:border-white/5 backdrop-blur-md">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                    currentView === item.id
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-slate-900 shadow-lg shadow-gold-500/30'
                      : 'text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cart, Auth & Mobile */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-gold-500 transition-all"
              title={isDarkMode ? "الوضع النهاري" : "الوضع الليلي"}
            >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User Auth Section */}
            {user ? (
               <div className="hidden sm:flex items-center gap-3 bg-white/50 dark:bg-slate-800/50 pl-2 pr-4 py-1.5 rounded-full border border-slate-200 dark:border-gold-500/20">
                  <div className="flex flex-col items-end leading-tight">
                     <span className="text-xs text-slate-700 dark:text-slate-400 font-bold">{user.name}</span>
                     <span className="text-2xs text-gold-600 dark:text-gold-400 font-mono flex items-center gap-1">
                        {user.points} <Coins size={10} />
                     </span>
                  </div>
                  <img src={user.avatar} alt="User" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border border-gold-500/30" />
               </div>
            ) : (
                <button 
                  onClick={onOpenAuth}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-full text-sm font-bold transition-all border border-slate-800 dark:border-white/5 hover:border-gold-500/30"
                >
                   <LogIn size={16} />
                   دخول
                </button>
            )}

            <button 
              onClick={() => setView('cart')}
              className="relative p-2.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 transition-all group"
            >
              <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-bold text-slate-900 bg-gold-500 rounded-full shadow-lg shadow-gold-500/40 border-2 border-slate-50 dark:border-slate-900">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Changed to 2xl here to show hamburger on laptops */}
            <div className="flex 2xl:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-slate-100 dark:bg-white/5 p-2 rounded-lg text-slate-500 dark:text-slate-300 hover:text-gold-500 border border-slate-200 dark:border-white/5 transition-colors"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Enhanced with top-16 and better containment */}
      {isMenuOpen && (
        <div className="2xl:hidden glass-panel border-t border-slate-200 dark:border-white/5 animate-fade-in absolute top-16 left-0 w-full z-40 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto backdrop-blur-xl">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {/* Mobile User Profile */}
            {user ? (
               <div className="flex items-center gap-3 mb-4 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-gold-500/20">
                  <img src={user.avatar} alt="" className="w-10 h-10 rounded-full" />
                  <div>
                     <p className="text-slate-900 dark:text-white font-bold">{user.name}</p>
                     <p className="text-gold-600 dark:text-gold-400 text-xs font-bold flex items-center gap-1">
                        <Coins size={12} /> {user.points} نقطة
                     </p>
                  </div>
               </div>
            ) : (
               <button 
                 onClick={() => { onOpenAuth(); setIsMenuOpen(false); }}
                 className="w-full flex items-center justify-center gap-2 bg-gold-500 text-slate-900 py-3 rounded-xl font-bold mb-4"
               >
                 <LogIn size={18} /> تسجيل الدخول
               </button>
            )}

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 w-full text-right px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    currentView === item.id
                      ? 'bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/30'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};