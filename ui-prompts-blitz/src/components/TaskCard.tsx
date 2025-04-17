
import React, { useState, memo, useCallback } from 'react';
import { Task, Category } from '@/types/task';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, GripVertical, Edit, Check, X } from 'lucide-react';
import { useTaskContext } from '@/context/TaskContext';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const { toggleTaskCompletion, deleteTask, updateTask } = useTaskContext();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const isMobile = useIsMobile();

  const handleToggleComplete = useCallback(() => {
    if (!task.completed) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        toggleTaskCompletion(task.id);
      }, 500);
    } else {
      toggleTaskCompletion(task.id);
    }
  }, [task.completed, task.id, toggleTaskCompletion]);

  const handleDelete = useCallback(() => {
    deleteTask(task.id);
  }, [task.id, deleteTask]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setEditedTitle(task.title);
  }, [task.title]);

  const handleSaveEdit = useCallback(() => {
    if (editedTitle.trim()) {
      updateTask(task.id, { title: editedTitle.trim() });
      setIsEditing(false);
    }
  }, [editedTitle, task.id, updateTask]);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditedTitle(task.title);
  }, [task.title]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  }, [handleSaveEdit, handleCancelEdit]);

  return (
    <div 
      className={cn(
        'task-card',
        'group', // Added for hover effects
        task.completed && 'completed',
        isAnimating && 'animate-task-complete',
        isDragging && 'shadow-lg',
        'dark:bg-slate-800/50 dark:border-slate-700/50'
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
        {isEditing ? (
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="py-0 h-7 bg-white/50 dark:bg-slate-700/50"
          />
        ) : (
          <p className={cn(
            "text-sm font-medium",
            task.completed && "line-through text-muted-foreground"
          )}>
            {task.title}
          </p>
        )}
      </div>
      
      <div className={`category-badge category-${category.color} hidden xs:block`}>
        {category.name}
      </div>
      
      {isEditing ? (
        <>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={handleSaveEdit}
          >
            <Check size={16} className="text-taskflow-green" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={handleCancelEdit}
          >
            <X size={16} className="text-taskflow-red" />
          </Button>
        </>
      ) : (
        <>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
            onClick={handleEdit}
          >
            <Edit size={16} className="text-muted-foreground" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
            onClick={handleDelete}
          >
            <Trash2 size={16} className="text-muted-foreground" />
          </Button>
        </>
      )}
    </div>
  );
};

export default memo(TaskCard, (prevProps, nextProps) => {
  // Custom comparison to prevent unnecessary re-renders
  return (
    prevProps.task.id === nextProps.task.id &&
    prevProps.task.completed === nextProps.task.completed &&
    prevProps.task.title === nextProps.task.title &&
    prevProps.category.id === nextProps.category.id &&
    prevProps.isDragging === nextProps.isDragging
  );
});
