import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API Call
    setTimeout(() => {
      const mockUser = {
        id: 'u-123',
        name: isLogin ? 'زائر مميز' : name,
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        points: isLogin ? 50 : 200, // Bonus for Signup
        isVerified: true
      };
      
      onLogin(mockUser);
      setLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -ml-12 -mb-12 pointer-events-none"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 z-10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
              {isLogin ? 'أهلاً بعودتك' : 'انضم إلينا الآن'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {isLogin 
                ? 'سجل دخولك لمتابعة طلباتك وإدارة نقاطك' 
                : 'أنشئ حساباً واحصل على 200 نقطة مجانية فوراً!'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs text-slate-500 dark:text-slate-400 font-bold mr-1">الاسم</label>
                <div className="relative">
                  <User className="absolute right-3 top-3.5 text-slate-400 dark:text-slate-500" size={18} />
                  <input 
                    type="text" 
                    required={!isLogin}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-glass w-full rounded-xl pr-10 pl-4 py-3 outline-none focus:border-indigo-500 transition-all"
                    placeholder="اسمك الكريم"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
               <label className="text-xs text-slate-500 dark:text-slate-400 font-bold mr-1">البريد الإلكتروني</label>
               <div className="relative">
                  <Mail className="absolute right-3 top-3.5 text-slate-400 dark:text-slate-500" size={18} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-glass w-full rounded-xl pr-10 pl-4 py-3 outline-none focus:border-indigo-500 transition-all text-right dir-rtl"
                    placeholder="name@example.com"
                  />
               </div>
            </div>

            <div className="space-y-1">
               <label className="text-xs text-slate-500 dark:text-slate-400 font-bold mr-1">كلمة المرور</label>
               <div className="relative">
                  <Lock className="absolute right-3 top-3.5 text-slate-400 dark:text-slate-500" size={18} />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-glass w-full rounded-xl pr-10 pl-4 py-3 outline-none focus:border-indigo-500 transition-all"
                    placeholder="••••••••"
                  />
               </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
                  <ArrowRight size={18} className="rotate-180" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/5 text-center">
             <button 
               onClick={() => setIsLogin(!isLogin)}
               className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 text-sm font-bold transition-colors"
             >
               {isLogin ? 'ليس لديك حساب؟ سجل الآن' : 'لديك حساب بالفعل؟ سجل دخولك'}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};