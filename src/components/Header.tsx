
import React from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { CheckCircle2, Zap } from 'lucide-react';
import AddCategoryDialog from './AddCategoryDialog';
import ThemeToggle from './ThemeToggle';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const { tasks } = useTaskContext();
  const isMobile = useIsMobile();
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  return (
    <header className="pb-6 mb-6 border-b border-white/20 dark:border-slate-700/20">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <CheckCircle2 size={28} className="text-taskflow-purple relative z-10" />
            <div className="absolute inset-0 pulse-animation rounded-full"></div>
          </div>
          <h1 className="text-2xl md:text-3xl font-light bg-gradient-to-r from-taskflow-purple via-taskflow-blue to-taskflow-pink bg-clip-text text-transparent">
            TaskFlow
          </h1>
          <Zap size={16} className="text-taskflow-orange ml-1 float-animation" />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />
          <AddCategoryDialog />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-light text-transparent bg-clip-text bg-gradient-to-r from-taskflow-blue to-taskflow-purple">My Tasks</h2>
          <p className="text-muted-foreground backdrop-blur-sm inline-block px-2 py-1 rounded-md bg-white/10 dark:bg-slate-800/30 text-xs md:text-sm">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>
        
        <div className="bg-white/20 dark:bg-slate-800/30 backdrop-blur-sm rounded-full h-3 md:h-4 w-full md:w-48 overflow-hidden border border-white/30 dark:border-slate-700/50">
          <div 
            className="bg-gradient-to-r from-taskflow-purple via-taskflow-blue to-taskflow-pink h-full rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
