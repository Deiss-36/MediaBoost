import React, { useState, useEffect, useRef } from 'react';
import { CreditCard, CheckCircle, Lock, Loader2, ArrowRight, Package, Coins, AlertTriangle, Phone, FileText, Terminal, Copy, Download } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutFormProps {
  cart: CartItem[];
  total: number;
  onSuccess: () => void;
  onCancel: () => void;
  userPoints: number;
  onDeductPoints: (points: number) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ cart, total, onSuccess, onCancel, userPoints, onDeductPoints }) => {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'points'>('card');
  const [notes, setNotes] = useState('');
  
  // Automation State
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [generatedCodes, setGeneratedCodes] = useState<Record<string, string>>({});
  const logEndRef = useRef<HTMLDivElement>(null);

  const POINTS_EXCHANGE_RATE = 100;
  const totalPointsCost = total * POINTS_EXCHANGE_RATE;
  const canPayWithPoints = userPoints >= totalPointsCost;

  // Scroll to bottom of logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `> ${message}`]);
  };

  const generateRandomCode = (platform: string | undefined) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    if (platform === 'Google Play') {
        return `GPLAY-${Array(4).fill(0).map(() => Array(4).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('')).join('-')}`;
    }
    if (platform === 'Netflix' || platform === 'Spotify') {
        return `${platform.toUpperCase()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    }
    if (platform === 'PUBG' || platform === 'FreeFire') {
        return `UC-${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
    }
    return `KEY-${Array(4).fill(0).map(() => Array(4).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('')).join('-')}`;
  };

  const processAutomation = async () => {
    setStep('processing');
    setLogs([]);
    setProgress(0);

    const steps = [
      { msg: "Connecting to secure payment gateway...", delay: 800 },
      { msg: "Verifying user credentials...", delay: 1500 },
      { msg: paymentMethod === 'points' ? `Deducting ${totalPointsCost} points from wallet...` : `Authorizing card transaction ($${total})...`, delay: 1200 },
      { msg: "Transaction approved. ID: TXN-" + Math.floor(Math.random() * 999999), delay: 800 },
      { msg: "Initiating order fulfillment system...", delay: 1000 },
    ];

    // Check for digital items to generate codes
    const digitalItems = cart.filter(item => item.serviceType === 'ASSET' || item.serviceType === 'SUBSCRIPTION');
    
    if (digitalItems.length > 0) {
        steps.push({ msg: `Detected ${digitalItems.length} digital assets. Generating keys...`, delay: 1000 });
        digitalItems.forEach(item => {
             steps.push({ msg: `Generating unique key for: ${item.title}...`, delay: 800 });
        });
    } else {
        steps.push({ msg: "Scheduling service delivery queue...", delay: 1000 });
    }

    steps.push({ msg: "Finalizing order...", delay: 800 });
    steps.push({ msg: "COMPLETE.", delay: 500 });

    let currentDelay = 0;
    const codes: Record<string, string> = {};

    for (let i = 0; i < steps.length; i++) {
        const stepData = steps[i];
        currentDelay += stepData.delay;
        
        setTimeout(() => {
            addLog(stepData.msg);
            setProgress(prev => Math.min(prev + (100 / steps.length), 100));
            
            // Generate codes during the specific step
            if (stepData.msg.includes("Generating unique key")) {
                 // Find which item corresponds roughly (simulation)
                 // In a real app, we'd map this better, but for simulation we just generate all at the end
            }
        }, currentDelay);
    }

    // Final Success Trigger
    setTimeout(() => {
        // Actually generate codes object
        cart.forEach(item => {
            if (item.serviceType === 'ASSET' || item.serviceType === 'SUBSCRIPTION') {
                codes[item.id] = generateRandomCode(item.platform);
            }
        });
        setGeneratedCodes(codes);
        
        if (paymentMethod === 'points') {
            onDeductPoints(totalPointsCost);
        }
        setStep('success');
    }, currentDelay + 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'points' && !canPayWithPoints) {
        alert("عفواً، رصيد نقاطك غير كافي.");
        return;
    }
    processAutomation();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('تم نسخ الكود!');
  };

  // --- RENDER SUCCESS VIEW ---
  if (step === 'success') {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 animate-fade-in">
        <div className="text-center mb-10">
            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
            <CheckCircle size={48} className="text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">تم تنفيذ الطلب بنجاح!</h2>
            <p className="text-slate-600 dark:text-slate-400">
                شكراً لطلبك، {name}. تم إرسال الفاتورة إلى {email}.
            </p>
        </div>

        {/* Display Generated Codes (Instant Delivery) */}
        {Object.keys(generatedCodes).length > 0 && (
            <div className="glass-panel rounded-2xl p-6 border border-emerald-500/30 mb-8 bg-emerald-50/50 dark:bg-emerald-900/10">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <Package className="text-emerald-500" />
                    المشتريات الرقمية (تسليم فوري)
                </h3>
                <div className="space-y-4">
                    {cart.filter(item => generatedCodes[item.id]).map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                             <div className="flex items-center gap-3 w-full md:w-auto">
                                <img src={item.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                                    <span className="text-xs text-slate-500">الكمية: {item.quantity}</span>
                                </div>
                             </div>
                             
                             <div className="flex items-center gap-2 w-full md:w-auto">
                                <div className="flex-1 md:flex-none bg-slate-100 dark:bg-slate-800 py-2 px-4 rounded-lg font-mono text-emerald-600 dark:text-emerald-400 font-bold border border-slate-200 dark:border-slate-700 tracking-wider text-center select-all">
                                    {generatedCodes[item.id]}
                                </div>
                                <button 
                                    onClick={() => copyToClipboard(generatedCodes[item.id])}
                                    className="p-2.5 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-600/20 dark:hover:bg-indigo-600/40 text-indigo-600 dark:text-indigo-400 rounded-lg transition-colors"
                                    title="نسخ الكود"
                                >
                                    <Copy size={18} />
                                </button>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Order Details for Service items */}
        {cart.some(item => !generatedCodes[item.id]) && (
             <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/5 mb-8">
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">خدمات قيد المعالجة</h3>
                 <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                     سيقوم فريقنا بالعمل على الخدمات التالية وإعلامك فور الانتهاء:
                 </p>
                 <ul className="space-y-2">
                     {cart.filter(item => !generatedCodes[item.id]).map((item, idx) => (
                         <li key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                             <Loader2 size={16} className="text-gold-500 animate-spin" />
                             {item.title}
                         </li>
                     ))}
                 </ul>
             </div>
        )}

        <button 
            onClick={() => { onSuccess(); }}
            className="w-full bg-gold-500 hover:bg-gold-400 text-slate-900 py-4 rounded-xl font-bold transition-all shadow-lg"
        >
            العودة للصفحة الرئيسية
        </button>
      </div>
    );
  }

  // --- RENDER PROCESSING VIEW ---
  if (step === 'processing') {
      return (
          <div className="max-w-2xl mx-auto py-20 px-4">
              <div className="glass-panel bg-black/90 dark:bg-black/80 rounded-3xl p-8 border border-slate-800 shadow-2xl overflow-hidden relative">
                  {/* CRT Screen Effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
                  
                  <div className="relative z-30 font-mono text-sm md:text-base">
                      <div className="flex items-center gap-2 text-emerald-500 mb-6 border-b border-white/10 pb-4">
                          <Terminal size={20} />
                          <span className="font-bold">MediaBoost Automated System v1.5</span>
                      </div>

                      <div className="h-64 overflow-y-auto space-y-2 mb-6 pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                          {logs.map((log, index) => (
                              <div key={index} className="text-green-400 animate-fade-in break-words">
                                  {log}
                              </div>
                          ))}
                          <div ref={logEndRef} />
                          <div className="text-green-400/50 animate-pulse">_</div>
                      </div>

                      <div className="space-y-2">
                          <div className="flex justify-between text-xs text-slate-400">
                              <span>PROCESSING ORDER...</span>
                              <span>{Math.round(progress)}%</span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-emerald-500 transition-all duration-300 ease-out shadow-[0_0_10px_#10b981]"
                                style={{ width: `${progress}%` }}
                              ></div>
                          </div>
                      </div>
                  </div>
              </div>
              <p className="text-center text-slate-500 mt-6 text-sm animate-pulse">يرجى عدم إغلاق الصفحة أثناء المعالجة الآلية...</p>
          </div>
      );
  }

  // --- RENDER FORM VIEW ---
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pb-24">
      <button 
        onClick={onCancel}
        className="flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors group text-sm font-bold"
      >
        <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg mr-3 group-hover:bg-slate-300 dark:group-hover:bg-slate-700">
             <ArrowRight className="rotate-180" size={16} />
        </div>
        العودة وتعديل السلة
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Form */}
        <div className="lg:col-span-8">
          <div className="glass-panel rounded-3xl p-8 md:p-10 border border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
            
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 pb-6 border-b border-slate-200 dark:border-white/5 flex items-center gap-3">
              <FileText className="text-indigo-500 dark:text-indigo-400" />
              تفاصيل المشروع والدفع
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Project Details */}
              <div className="space-y-6">
                <h3 className="text-slate-900 dark:text-white font-bold text-lg flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs text-slate-700 dark:text-white">1</span>
                    معلومات العميل
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">الاسم الكامل</label>
                    <input 
                        required 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-glass w-full rounded-xl px-4 py-3.5 outline-none focus:border-indigo-500 transition-all"
                        placeholder="الاسم"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">البريد الإلكتروني</label>
                    <input 
                        required 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-glass w-full rounded-xl px-4 py-3.5 outline-none focus:border-indigo-500 transition-all"
                        placeholder="name@example.com"
                    />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">رقم الهاتف (اختياري)</label>
                        <div className="relative">
                            <input 
                                type="tel" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="input-glass w-full rounded-xl pl-4 pr-12 py-3.5 outline-none focus:border-indigo-500 transition-all text-right"
                                placeholder="+966 5..."
                            />
                            <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        </div>
                        <p className="text-xs text-slate-500 mt-1">يستخدم فقط للتواصل في حال وجود مشكلة في البيانات.</p>
                    </div>
                     <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">ملاحظات إضافية (اختياري)</label>
                        <textarea 
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="input-glass w-full rounded-xl px-4 py-3.5 outline-none focus:border-indigo-500 transition-all min-h-[80px] resize-none"
                            placeholder="أي تفاصيل إضافية ترغب بإخبارنا بها..."
                        />
                    </div>
                </div>
              </div>

              <div className="h-px bg-slate-200 dark:bg-white/5 my-8"></div>

              {/* Payment Section */}
              <div className="space-y-6">
                 <h3 className="text-slate-900 dark:text-white font-bold text-lg flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs text-slate-700 dark:text-white">2</span>
                    طريقة الدفع
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border text-right transition-all duration-200 ${
                      paymentMethod === 'card' 
                        ? 'bg-indigo-50 dark:bg-indigo-600/10 border-indigo-500 ring-1 ring-indigo-500' 
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500'
                    }`}
                  >
                     <div className="flex items-center gap-3 mb-2">
                        <CreditCard size={20} className={paymentMethod === 'card' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'} />
                        <span className={`font-bold ${paymentMethod === 'card' ? 'text-slate-900 dark:text-white' : ''}`}>بطاقة ائتمان / مدى</span>
                     </div>
                     <p className="text-xs text-slate-500 leading-relaxed">دفع آمن ومشفر 100% عبر Stripe</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('points')}
                    className={`p-4 rounded-xl border text-right transition-all duration-200 ${
                      paymentMethod === 'points' 
                        ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-500 ring-1 ring-amber-500' 
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                        <Coins size={20} className={paymentMethod === 'points' ? 'text-amber-500 dark:text-amber-400' : 'text-slate-500'} />
                        <span className={`font-bold ${paymentMethod === 'points' ? 'text-slate-900 dark:text-white' : ''}`}>رصيد المحفظة</span>
                     </div>
                     <p className="text-xs text-slate-500 leading-relaxed">استخدم نقاطك المكتسبة للدفع</p>
                  </button>
                </div>

                {/* Conditional Payment UI */}
                {paymentMethod === 'card' && (
                     <div className="bg-slate-100 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700 animate-fade-in">
                        <div className="space-y-4 opacity-50 pointer-events-none select-none filter blur-[1px]">
                            {/* Dummy Card Fields for Visual Only - Not Functional in Simulation */}
                            <input type="text" className="w-full bg-white dark:bg-slate-800 p-3 rounded border border-slate-300 dark:border-slate-600" placeholder="Card Number" />
                            <div className="flex gap-4">
                                <input type="text" className="w-full bg-white dark:bg-slate-800 p-3 rounded border border-slate-300 dark:border-slate-600" placeholder="MM/YY" />
                                <input type="text" className="w-full bg-white dark:bg-slate-800 p-3 rounded border border-slate-300 dark:border-slate-600" placeholder="CVC" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 justify-center">
                            <Lock size={12} /> محاكاة بيئة دفع آمنة
                        </div>
                     </div>
                )}
                 {paymentMethod === 'points' && (
                     <div className="bg-amber-50 dark:bg-amber-500/5 p-5 rounded-xl border border-amber-200 dark:border-amber-500/10 animate-fade-in">
                         <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-slate-600 dark:text-slate-300">رصيدك:</span>
                            <span className="font-bold text-amber-500 dark:text-amber-400">{userPoints.toLocaleString()} نقطة</span>
                         </div>
                         <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-slate-600 dark:text-slate-300">التكلفة:</span>
                            <span className="font-bold text-slate-900 dark:text-white">{totalPointsCost.toLocaleString()} نقطة</span>
                         </div>
                         {!canPayWithPoints && (
                            <p className="text-red-500 dark:text-red-400 text-xs flex items-center gap-1">
                                <AlertTriangle size={12} /> الرصيد غير كافي
                            </p>
                         )}
                     </div>
                )}
              </div>

              <button 
                type="submit" 
                disabled={paymentMethod === 'points' && !canPayWithPoints}
                className={`w-full py-4 rounded-xl font-bold shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-lg mt-8 ${
                    paymentMethod === 'points' 
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 hover:shadow-amber-500/20' 
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-indigo-500/30'
                }`}
              >
                  <Lock size={18} />
                  إتمام الطلب وتأكيد الدفع (${total.toFixed(2)})
              </button>
              <p className="text-center text-xs text-slate-500">بالنقر على الزر أعلاه، ستبدأ عملية المعالجة الآلية للطلب.</p>
            </form>
          </div>
        </div>

        {/* Order Sidebar */}
        <div className="lg:col-span-4">
             <div className="glass-panel rounded-2xl p-6 sticky top-24 border border-slate-200 dark:border-white/5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <Package size={18} className="text-slate-500" />
                    ملخص الطلب
                </h3>
                
                <div className="space-y-4 mb-6">
                    {cart.map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="flex gap-3 items-start">
                            <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-slate-200 dark:bg-slate-800" />
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{item.title}</h4>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-slate-500">الكمية: {item.quantity}</span>
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                                
                                {Object.keys(item.customData).length > 0 && (
                                   <div className="mt-2 space-y-1">
                                       {Object.entries(item.customData).map(([key, value]) => (
                                           key !== 'Type' && (
                                               <div key={key} className="text-[10px] text-slate-500 flex gap-1 items-center bg-slate-100 dark:bg-slate-800/50 rounded px-1.5 py-0.5 w-fit">
                                                   <span className="text-gold-600 dark:text-gold-500/80">{key}:</span>
                                                   <span className="truncate max-w-[100px] dir-ltr">{value}</span>
                                               </div>
                                           )
                                       ))}
                                   </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t border-slate-200 dark:border-white/10 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                        <span>المجموع</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                        <span>الضرائب</span>
                        <span>$0.00</span>
                    </div>
                    <div className="h-px bg-slate-200 dark:bg-white/5 my-2"></div>
                    <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-white">
                        <span>الإجمالي</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-500/10 rounded-xl p-4 mt-6 border border-indigo-100 dark:border-indigo-500/20">
                    <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-indigo-500 dark:text-indigo-400 mt-0.5" />
                        <p className="text-xs text-indigo-700 dark:text-indigo-200/80 leading-relaxed">
                            يتم تنفيذ الطلبات الرقمية بشكل آلي فوري، بينما تخضع خدمات النمو لمراجعة بشرية سريعة لضمان الجودة.
                        </p>
                    </div>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};