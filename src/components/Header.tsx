
import React from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { CheckCircle2 } from 'lucide-react';
import AddCategoryDialog from './AddCategoryDialog';

const Header: React.FC = () => {
  const { tasks } = useTaskContext();
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  return (
    <header className="pb-6 mb-6 border-b">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={28} className="text-taskflow-purple" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-taskflow-purple to-taskflow-blue bg-clip-text text-transparent">
            TaskFlow
          </h1>
        </div>
        <AddCategoryDialog />
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">My Tasks</h2>
          <p className="text-muted-foreground">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>
        
        <div className="bg-secondary rounded-full h-4 w-full md:w-48 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-taskflow-purple to-taskflow-blue h-full rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
