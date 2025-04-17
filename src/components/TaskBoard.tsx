
import React, { memo } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import CategorySection from './CategorySection';
import { useIsMobile } from '@/hooks/use-mobile';

const TaskBoard: React.FC = () => {
  const { categories } = useTaskContext();
  const isMobile = useIsMobile();

  return (
    <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4 md:gap-6`}>
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
