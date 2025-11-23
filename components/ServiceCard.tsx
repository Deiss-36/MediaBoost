import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { 
  Check, ShoppingBag, Eye, X, Link as LinkIcon, Minus, Plus, Mail, Lock, 
  Gamepad2, ChevronDown, ChevronUp, Instagram, Facebook, Youtube, Twitter, 
  Music, Globe, Wallet, PlaySquare, Monitor, Zap, Ghost, Tv, Crosshair, 
  Flame, Target, Trophy, Swords, Play, Linkedin, Headphones, Palette, PenTool, Scissors
} from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
  onAddToCart: (service: ServiceItem, quantity: number, customData: Record<string, string>) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onAddToCart }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  // Dynamic form states
  const [inputValue, setInputValue] = useState(''); // Handles Link, Email, ID depending on context
  const [quantity, setQuantity] = useState(1);

  const handleInitialClick = () => {
    setQuantity(1); // Reset quantity when opening
    setShowConfig(true);
  };

  const handleConfirmAdd = () => {
    const customData: Record<string, string> = {};
    
    // Validation Logic based on Requirements
    if (service.requiredInputs.includes('LINK') && !inputValue.trim()) {
      alert("يرجى إدخال الرابط المطلوب.");
      return;
    }
    if (service.requiredInputs.includes('EMAIL') && !inputValue.trim()) {
        alert("يرجى إدخال البريد الإلكتروني.");
        return;
    }
    if (service.requiredInputs.includes('PLAYER_ID') && !inputValue.trim()) {
        alert("يرجى إدخال معرف اللاعب (ID).");
        return;
    }

    // Map input to meaningful keys
    if (service.requiredInputs.includes('LINK')) customData['رابط'] = inputValue;
    if (service.requiredInputs.includes('EMAIL')) customData['البريد'] = inputValue;
    if (service.requiredInputs.includes('PLAYER_ID')) customData['ID'] = inputValue;
    if (service.requiredInputs.includes('USERNAME')) customData['المعرف'] = inputValue;
    
    // For Assets, we might just mark as "Ready to Deliver"
    if (service.serviceType === 'ASSET') {
        customData['Type'] = 'Digital Asset Delivery';
    }

    onAddToCart(service, quantity, customData);
    setShowConfig(false);
    setInputValue('');
    setQuantity(1);
  };

  // Helper to get platform specific icon
  const getPlatformIcon = (platform: string | undefined) => {
    const iconBaseClass = "transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6 drop-shadow-sm";
    const size = 18;

    switch (platform) {
      case 'Instagram': return <Instagram size={size} className={`text-pink-600 dark:text-pink-400 ${iconBaseClass}`} />;
      case 'TikTok': return <Music size={size} className={`text-cyan-600 dark:text-cyan-400 ${iconBaseClass}`} />;
      case 'YouTube': return <Youtube size={size} className={`text-red-600 dark:text-red-500 ${iconBaseClass}`} />;
      case 'Facebook':
      case 'Meta': return <Facebook size={size} className={`text-blue-600 dark:text-blue-500 ${iconBaseClass}`} />;
      case 'X':
      case 'Twitter': return <Twitter size={size} className={`text-slate-900 dark:text-white ${iconBaseClass}`} />;
      case 'Snapchat': return <Ghost size={size} className={`text-yellow-500 ${iconBaseClass}`} />;
      case 'LinkedIn': return <Linkedin size={size} className={`text-blue-700 dark:text-blue-400 ${iconBaseClass}`} />;
      case 'Gaming': return <Gamepad2 size={size} className={`text-violet-600 dark:text-violet-400 ${iconBaseClass}`} />;
      case 'PayPal': 
      case 'Financial': return <Wallet size={size} className={`text-emerald-600 dark:text-emerald-400 ${iconBaseClass}`} />;
      case 'Streaming': return <PlaySquare size={size} className={`text-rose-600 dark:text-rose-400 ${iconBaseClass}`} />;
      case 'Google': return <Globe size={size} className={`text-blue-500 ${iconBaseClass}`} />;
      case 'Web': return <Monitor size={size} className={`text-indigo-500 ${iconBaseClass}`} />;
      // New Specific Icons
      case 'Netflix': return <Tv size={size} className={`text-red-600 dark:text-red-500 ${iconBaseClass}`} />;
      case 'Spotify': return <Headphones size={size} className={`text-green-500 ${iconBaseClass}`} />;
      case 'FreeFire': return <Flame size={size} className={`text-orange-500 ${iconBaseClass}`} />;
      case 'PUBG': return <Crosshair size={size} className={`text-yellow-600 ${iconBaseClass}`} />;
      case 'Call of Duty': return <Target size={size} className={`text-green-600 ${iconBaseClass}`} />;
      case 'Fortnite': return <Trophy size={size} className={`text-purple-500 ${iconBaseClass}`} />;
      case 'Apex Legends': return <Swords size={size} className={`text-red-500 ${iconBaseClass}`} />;
      case 'Google Play': return <Play size={size} className={`text-emerald-500 fill-emerald-500 ${iconBaseClass}`} />;
      case 'Canva': return <Palette size={size} className={`text-cyan-500 dark:text-cyan-400 ${iconBaseClass}`} />;
      case 'Adobe': return <PenTool size={size} className={`text-red-600 dark:text-red-500 ${iconBaseClass}`} />;
      case 'CapCut': return <Scissors size={size} className={`text-slate-900 dark:text-white ${iconBaseClass}`} />;
      default: return <Zap size={size} className={`text-gold-500 ${iconBaseClass}`} />;
    }
  };

  // Helper to render the correct input field
  const renderInputSection = () => {
      if (service.requiredInputs.includes('LINK')) {
          return (
            <div>
                <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-2">
                <LinkIcon size={16} className="text-gold-500" />
                رابط الحساب / المنشور
                </label>
                <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 outline-none focus:border-gold-500 transition-all text-left dir-ltr"
                autoFocus
                />
            </div>
          );
      }
      if (service.requiredInputs.includes('EMAIL')) {
        return (
          <div>
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-2">
              <Mail size={16} className="text-gold-500" />
              البريد الإلكتروني (لتنفيذ الخدمة)
              </label>
              <input 
              type="email" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 outline-none focus:border-gold-500 transition-all text-left dir-ltr"
              autoFocus
              />
          </div>
        );
      }
      if (service.requiredInputs.includes('PLAYER_ID')) {
        return (
          <div>
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-2">
              <Gamepad2 size={16} className="text-gold-500" />
              معرف اللاعب (Player ID)
              </label>
              <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="123456789"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 outline-none focus:border-gold-500 transition-all text-left dir-ltr"
              autoFocus
              />
          </div>
        );
      }
      if (service.requiredInputs.includes('USERNAME')) {
        return (
          <div>
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-2">
              <LinkIcon size={16} className="text-gold-500" />
              اسم المستخدم (Username)
              </label>
              <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="@username"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 outline-none focus:border-gold-500 transition-all text-left dir-ltr"
              autoFocus
              />
          </div>
        );
      }
      
      // If Asset/Account (No input needed)
      if (service.serviceType === 'ASSET' || service.serviceType === 'SUBSCRIPTION') {
          return (
              <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-xl p-4 flex items-start gap-3">
                  <Lock className="text-indigo-500 dark:text-indigo-400 mt-1" size={20} />
                  <div>
                      <h4 className="text-indigo-900 dark:text-white font-bold text-sm">تسليم آمن للبيانات</h4>
                      <p className="text-xs text-indigo-700 dark:text-slate-400 mt-1">
                          سيتم إرسال الكود الرقمي أو بيانات الحساب إلى بريدك الإلكتروني فور إتمام عملية الدفع.
                      </p>
                  </div>
              </div>
          );
      }

      return null;
  };

  return (
    <>
      <div className="glass-card rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col h-full relative border border-slate-200 dark:border-white/5 hover:border-gold-500/50 hover:shadow-2xl hover:shadow-gold-500/5">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent z-10 opacity-60" />
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          
          {/* Enhanced Platform Badge */}
          <div className="absolute top-3 right-3 z-20 bg-white/95 dark:bg-slate-900/80 backdrop-blur-xl pl-3 pr-4 py-1.5 rounded-full text-xs font-bold text-slate-800 dark:text-white border border-white/20 dark:border-white/10 shadow-lg shadow-black/5 flex items-center gap-2 transition-transform group-hover:scale-105">
             {getPlatformIcon(service.platform)}
             <span className="translate-y-[1px]">
               {service.serviceType === 'ASSET' ? 'كود رقمي' : service.serviceType === 'TOPUP' ? 'شحن فوري' : service.platform}
             </span>
          </div>
          
          {service.previewImage && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowPreview(true);
              }}
              className="absolute bottom-3 left-3 z-20 bg-white/80 dark:bg-black/40 hover:bg-gold-500 dark:hover:bg-gold-500 backdrop-blur-md p-2 rounded-full text-slate-900 dark:text-white border border-white/20 transition-all hover:scale-110 group/preview shadow-lg"
              title="معاينة نموذج / ديمو"
            >
              <Eye size={16} className="text-slate-900 dark:text-white group-hover/preview:text-slate-900" />
            </button>
          )}
        </div>
        
        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="mb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors leading-tight">
              {service.title}
              </h3>
          </div>
          
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
            {service.description}
          </p>

          <div className="mb-6">
             {/* Collapsed View: Show summary tags */}
             {!showDetails && (
                <div className="flex flex-wrap gap-2 mb-3">
                    {service.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 py-1 px-2.5 rounded-lg border border-slate-200 dark:border-white/5">
                        <Check size={12} className="text-emerald-500 dark:text-emerald-400 ml-1.5" />
                        {feature}
                    </div>
                    ))}
                    {service.features.length > 2 && (
                        <span className="text-xs text-slate-400 dark:text-slate-500 py-1 px-1">+{service.features.length - 2}</span>
                    )}
                </div>
             )}

             {/* Toggle Button */}
             <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetails(!showDetails);
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-gold-600 dark:text-gold-500 hover:text-gold-500 dark:hover:text-gold-400 transition-colors focus:outline-none"
             >
                {showDetails ? (
                    <>
                        إخفاء المميزات <ChevronUp size={14} />
                    </>
                ) : (
                    <>
                        عرض كافة التفاصيل <ChevronDown size={14} />
                    </>
                )}
             </button>

             {/* Expanded View: Detailed List */}
             {showDetails && (
                 <div className="mt-4 p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/10 animate-fade-in shadow-inner">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-3 border-b border-slate-200 dark:border-white/10 pb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                        مميزات الخدمة الكاملة:
                    </h4>
                    <ul className="space-y-2.5">
                        {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                <Check size={16} className="text-emerald-500 dark:text-emerald-400 mt-0.5 shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                 </div>
             )}
          </div>

          <div className="mt-auto space-y-4 pt-4 border-t border-slate-200 dark:border-white/5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-radiant">
                    ${service.price}
                  </span>
                  {service.unitType && service.unitSize && service.unitSize > 1 && (
                      <span className="text-xs text-slate-500 font-bold">/ {service.unitSize > 1000 ? `${service.unitSize/1000}k` : service.unitSize}</span>
                  )}
                </div>
              </div>
              
              <button 
                onClick={handleInitialClick}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-slate-900 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-gold-500/20 active:scale-95 hover:shadow-gold-500/40"
              >
                <ShoppingBag size={16} />
                {service.serviceType === 'ASSET' ? 'شراء الآن' : 'طلب الخدمة'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Modal */}
      {showConfig && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 dark:bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowConfig(false)}
        >
          <div 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
             <button 
                onClick={() => setShowConfig(false)}
                className="absolute top-4 left-4 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 pr-2 border-r-4 border-gold-500">
               {service.serviceType === 'ASSET' ? 'تأكيد شراء الكود الرقمي' : 'تفاصيل الطلب'}
            </h3>
            
            <div className="space-y-6">
               {/* Render Dynamic Inputs based on Requirement */}
               {renderInputSection()}

               {/* Quantity Input - Hide if it's a unique asset with maxQuantity=1 */}
               {(service.maxQuantity !== 1) && (
                 <div>
                    <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">
                       الكمية
                    </label>
                    <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 rounded-xl p-2 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg shadow-sm transition-colors"
                          >
                            <Minus size={18} />
                          </button>
                          <span className="w-12 text-center font-black text-2xl text-slate-900 dark:text-white">
                            {quantity}
                          </span>
                          <button 
                            onClick={() => {
                                if (service.maxQuantity && quantity >= service.maxQuantity) return;
                                setQuantity(quantity + 1)
                            }}
                            className={`w-10 h-10 flex items-center justify-center text-slate-900 font-bold rounded-lg transition-colors shadow-sm ${
                                service.maxQuantity && quantity >= service.maxQuantity 
                                ? 'bg-slate-300 dark:bg-slate-600 cursor-not-allowed text-slate-500' 
                                : 'bg-gold-500 hover:bg-gold-400 text-slate-900'
                            }`}
                          >
                            <Plus size={18} />
                          </button>
                      </div>
                      
                      {service.unitSize && (
                        <div className="text-left px-3">
                           <p className="text-xs text-slate-500">الإجمالي:</p>
                           <p className="text-sm font-bold text-slate-900 dark:text-white">
                             {(service.unitSize * quantity).toLocaleString()} {service.unitType}
                           </p>
                        </div>
                      )}
                    </div>
                 </div>
               )}

                {/* Price Summary */}
                <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-inner">
                    <span className="text-slate-600 dark:text-slate-400 font-bold">السعر الإجمالي</span>
                    <span className="text-3xl font-black text-radiant tracking-tight">${(service.price * quantity).toFixed(2)}</span>
                </div>

               {/* Actions */}
               <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
                 <button 
                   onClick={() => setShowConfig(false)}
                   className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold transition-colors"
                 >
                   إلغاء
                 </button>
                 <button 
                   onClick={handleConfirmAdd}
                   className="flex-[2] py-3 rounded-xl font-bold transition-all btn-radiant shadow-lg"
                 >
                   تأكيد وإضافة للسلة
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal Overlay */}
      {showPreview && service.previewImage && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in cursor-zoom-out"
          onClick={() => setShowPreview(false)}
        >
          <div 
            className="bg-white dark:bg-slate-900 border border-white/10 rounded-3xl max-w-4xl w-full p-2 relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={() => setShowPreview(false)}
                className="bg-black/50 hover:bg-red-500/80 text-white p-2 rounded-full backdrop-blur-md border border-white/10 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden flex-1 bg-slate-100 dark:bg-black flex items-center justify-center">
               <img 
                 src={service.previewImage} 
                 alt={`Preview of ${service.title}`} 
                 className="w-auto h-auto max-w-full max-h-[70vh] object-contain"
               />
            </div>
            
            <div className="p-6 bg-white dark:bg-slate-900">
                <div className="flex items-center gap-3 mb-2">
                   <span className="inline-block px-3 py-1 bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/30 rounded-full text-xs font-bold backdrop-blur-sm">
                    معاينة الخدمة
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{service.title}</h3>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm">هذه الصورة هي نموذج توضيحي لشكل الخدمة أو النتائج التي ستحصل عليها.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};