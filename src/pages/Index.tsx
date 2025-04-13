
import React, { memo } from 'react';
import { TaskProvider } from '@/context/TaskContext';
import Header from '@/components/Header';
import TaskBoard from '@/components/TaskBoard';

const Index: React.FC = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-secondary/50 p-4 md:p-8 overflow-hidden">
        <div className="container max-w-6xl mx-auto neo-glass rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none holographic"></div>
          <Header />
          <TaskBoard />
        </div>
        
        <footer className="mt-8 text-center text-sm text-muted-foreground backdrop-blur-sm p-3 rounded-xl mx-auto max-w-md bg-white/10 border border-white/20">
          <p className="bg-clip-text text-transparent bg-gradient-to-r from-taskflow-purple to-taskflow-blue">
            TaskFlow • Quantum Task Management • 2025
          </p>
        </footer>
      </div>
    </TaskProvider>
  );
};

export default memo(Index);
