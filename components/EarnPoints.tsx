import React, { useState } from 'react';
import { TaskItem } from '../types';
import { Coins, ExternalLink, CheckCircle, Loader2, ThumbsUp, UserPlus, MessageCircle, Share2, Instagram, Youtube, Facebook, Twitter, Trophy, Gift } from 'lucide-react';

interface EarnPointsProps {
  tasks: TaskItem[];
  userPoints: number;
  onCompleteTask: (points: number) => void;
}

export const EarnPoints: React.FC<EarnPointsProps> = ({ tasks, userPoints, onCompleteTask }) => {
  const [processingTask, setProcessingTask] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const getIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return <Instagram className="text-pink-500" />;
      case 'YouTube': return <Youtube className="text-red-500" />;
      case 'Twitter': return <Twitter className="text-blue-400" />;
      case 'Facebook': return <Facebook className="text-blue-600" />;
      case 'General': return <Gift className="text-purple-500" />;
      default: return <ExternalLink />;
    }
  };

  const handleTaskClick = (task: TaskItem) => {
    if (completedTasks.includes(task.id) || processingTask) return;

    window.open(task.url, '_blank');
    setProcessingTask(task.id);

    setTimeout(() => {
      onCompleteTask(task.points);
      setCompletedTasks(prev => [...prev, task.id]);
      setProcessingTask(null);
    }, 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pb-24">
      {/* Header */}
      <div className="text-center mb-16 relative">
        <div className="inline-flex items-center justify-center p-6 bg-gold-500/10 rounded-3xl mb-6 border border-gold-500/20 shadow-[0_0_30px_rgba(255,184,0,0.1)]">
          <Trophy size={48} className="text-gold-500" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">برنامج ولاء العملاء (Rewards)</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          نقدر دعمك لمجتمعنا. قم بإتمام بعض المهام البسيطة لدعم تواجدنا الرقمي واحصل على رصيد مجاني يمكن استخدامه في طلباتك القادمة.
        </p>
        
        <div className="mt-10 inline-flex items-center gap-6 glass-panel rounded-2xl p-6 border border-gold-500/30">
          <div className="text-right">
             <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">رصيد المحفظة</p>
             <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{userPoints.toLocaleString()}</p>
          </div>
          <div className="h-10 w-px bg-slate-300 dark:bg-white/10"></div>
          <div className="flex items-center gap-2 text-gold-500 dark:text-gold-400">
             <Coins size={24} />
             <span className="font-bold">نقطة ذهبية</span>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tasks.map((task) => {
          const isCompleted = completedTasks.includes(task.id);
          const isProcessing = processingTask === task.id;

          return (
            <button 
              key={task.id}
              onClick={() => handleTaskClick(task)}
              disabled={isCompleted || isProcessing || processingTask !== null}
              className={`group flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 text-right w-full ${
                isCompleted 
                  ? 'bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-60 cursor-default' 
                  : 'bg-white dark:bg-slate-800/30 border-slate-200 dark:border-white/5 hover:border-gold-500/30 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${isCompleted ? 'bg-slate-200 dark:bg-slate-800' : 'bg-slate-100 dark:bg-slate-700/50 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'}`}>
                  {isCompleted ? <CheckCircle className="text-emerald-500" size={24} /> : getIcon(task.platform)}
                </div>
                <div>
                    <h3 className={`font-bold text-lg mb-1 ${isCompleted ? 'text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>
                        {task.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                         <span className="bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400">{task.platform}</span>
                         {isProcessing && <span className="text-gold-500 animate-pulse">جاري التحقق...</span>}
                    </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                 <span className={`text-xl font-bold ${isCompleted ? 'text-slate-400 dark:text-slate-600' : 'text-gold-500 dark:text-gold-400'}`}>
                    +{task.points}
                 </span>
                 <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-medium">نقطة</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};