import React, { useState } from 'react';
import { Bot, Sparkles, Loader2 } from 'lucide-react';
import { getGrowthStrategy } from '../services/geminiService';
import { ServiceItem, AIRecommendation } from '../types';
import { SERVICES } from '../constants';
import { ServiceCard } from './ServiceCard';

interface AIPlannerProps {
  onAddToCart: (service: ServiceItem, quantity: number, customData: Record<string, string>) => void;
}

export const AIPlanner: React.FC<AIPlannerProps> = ({ onAddToCart }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [recommendedServices, setRecommendedServices] = useState<ServiceItem[]>([]);

  const handleConsult = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setRecommendation(null);
    
    try {
      const result = await getGrowthStrategy(query);
      setRecommendation(result);
      
      // Filter services based on IDs returned by AI
      const matched = SERVICES.filter(s => result.recommendedServiceIds.includes(s.id));
      setRecommendedServices(matched);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 pb-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-5 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full mb-6 ring-1 ring-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
          <Bot size={40} className="text-indigo-500 dark:text-indigo-400" />
        </div>
        <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">مستشار النمو الذكي (AI)</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto text-lg">
          صف لنا مشروعك أو أهدافك، وسيقوم الذكاء الاصطناعي ببناء خطة نمو مخصصة لك فوراً.
        </p>
      </div>

      {/* Input Section */}
      <div className="glass-panel rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-white/5 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <label className="block text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 relative z-10">
          كيف يمكننا مساعدتك اليوم؟
        </label>
        <div className="relative z-10">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="مثال: عندي متجر ملابس جديد وأريد زيادة المبيعات وبناء ثقة العملاء، واحتاج موقع احترافي."
            className="input-glass w-full rounded-2xl p-5 text-lg placeholder-slate-400 dark:placeholder-slate-500 min-h-[160px] resize-none focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all shadow-inner"
          />
          <button
            onClick={handleConsult}
            disabled={isLoading || !query.trim()}
            className="absolute bottom-4 left-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                جاري التحليل...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                تحليل وبناء الخطة
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {recommendation && (
        <div className="animate-fade-in space-y-10">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-3xl p-8 border border-indigo-200 dark:border-indigo-500/30 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <Sparkles className="text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400" size={24} />
              {recommendation.strategyTitle}
            </h3>
            <p className="text-slate-700 dark:text-slate-200 text-lg leading-relaxed opacity-90">
              {recommendation.analysis}
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
              الخدمات المقترحة لك:
            </h4>
            {recommendedServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendedServices.map(service => (
                  <ServiceCard 
                    key={service.id} 
                    service={service} 
                    onAddToCart={onAddToCart} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400 glass-panel rounded-2xl border-dashed border-slate-300 dark:border-slate-700">
                لم يتم العثور على خدمات مطابقة تماماً في الكتالوج الحالي، ولكن يمكنك تصفح جميع الخدمات.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};