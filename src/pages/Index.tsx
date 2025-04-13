
import React from 'react';
import { TaskProvider } from '@/context/TaskContext';
import Header from '@/components/Header';
import TaskBoard from '@/components/TaskBoard';

const Index: React.FC = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 p-4 md:p-8">
        <div className="container max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8">
          <Header />
          <TaskBoard />
        </div>
        
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>TaskFlow - Modern Task Management • UI Hackathon 2025</p>
        </footer>
      </div>
    </TaskProvider>
  );
};

export default Index;
