
import React, { useState } from 'react';
import { Task, Category } from '@/types/task';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, GripVertical } from 'lucide-react';
import { useTaskContext } from '@/context/TaskContext';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  category: Category;
  isDragging?: boolean;
  dragHandleProps?: any;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  category, 
  isDragging = false,
  dragHandleProps
}) => {
  const { toggleTaskCompletion, deleteTask } = useTaskContext();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggleComplete = () => {
    if (!task.completed) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        toggleTaskCompletion(task.id);
      }, 500);
    } else {
      toggleTaskCompletion(task.id);
    }
  };

  return (
    <div 
      className={cn(
        'task-card',
        task.completed && 'completed',
        isAnimating && 'animate-task-complete',
        isDragging && 'shadow-lg',
      )}
    >
      <div {...dragHandleProps} className="task-drag-handle">
        <GripVertical size={18} className="text-gray-400" />
      </div>
      
      <Checkbox 
        checked={task.completed}
        onCheckedChange={handleToggleComplete}
        className="mr-1"
      />
      
      <div className="flex-1">
        <p className={cn(
          "text-sm font-medium",
          task.completed && "line-through text-muted-foreground"
        )}>
          {task.title}
        </p>
      </div>
      
      <div className={`category-badge category-${category.color}`}>
        {category.name}
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
        onClick={() => deleteTask(task.id)}
      >
        <Trash2 size={16} className="text-muted-foreground" />
      </Button>
    </div>
  );
};

export default TaskCard;
