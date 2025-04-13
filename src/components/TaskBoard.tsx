
import React from 'react';
import { useTaskContext } from '@/context/TaskContext';
import CategorySection from './CategorySection';

const TaskBoard: React.FC = () => {
  const { categories } = useTaskContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map(category => (
        <CategorySection key={category.id} category={category} />
      ))}
    </div>
  );
};

export default TaskBoard;
