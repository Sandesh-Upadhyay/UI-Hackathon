
import React, { memo } from 'react';
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

// Using React.memo with explicit equality check to prevent unnecessary re-renders
export default memo(TaskBoard, (prevProps, nextProps) => {
  return true; // Custom comparison always returns true since this component has no props
});
