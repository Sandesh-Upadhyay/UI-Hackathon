
import React, { useState, useMemo, useCallback, memo } from 'react';
import { Category } from '@/types/task';
import { useTaskContext } from '@/context/TaskContext';
import TaskCard from './TaskCard';
import { PlusCircle, Sparkles, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CategorySectionProps {
  category: Category;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  const { getTasksByCategory, addTask, deleteCategory } = useTaskContext();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const isMobile = useIsMobile();
  
  const tasks = getTasksByCategory(category.id);
  
  // Memoize the filtered tasks to avoid recalculation on every render
  const { completedTasks, pendingTasks } = useMemo(() => {
    return {
      completedTasks: tasks.filter(task => task.completed),
      pendingTasks: tasks.filter(task => !task.completed)
    };
  }, [tasks]);

  const handleAddTask = useCallback(() => {
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle.trim(),
        completed: false,
        categoryId: category.id,
      });
      setNewTaskTitle('');
      setIsAddingTask(false);
    }
  }, [newTaskTitle, category.id, addTask]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  }, [handleAddTask]);

  const handleDeleteCategory = useCallback(() => {
    deleteCategory(category.id);
  }, [category.id, deleteCategory]);

  // Mock drag and drop for now (would implement real drag/drop in a full version)
  const dragHandleProps = useMemo(() => ({
    onMouseDown: (e: React.MouseEvent) => {
      e.preventDefault();
      // This would trigger real drag and drop in a full implementation
    }
  }), []);

  return (
    <Card className="mb-4 sm:mb-6 animate-fade-in neo-glass hover:shadow-xl transition-all duration-300 border border-white/30 dark:bg-slate-800/40 dark:border-slate-700/30">
      <CardHeader className={`bg-taskflow-${category.color}/5 backdrop-blur-md rounded-t-lg border-b border-white/20 dark:border-slate-700/20 p-3 sm:p-4`}>
        <CardTitle className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className={`text-taskflow-${category.color} dark:text-taskflow-${category.color}-light float-animation`} />
            <span className={`text-taskflow-${category.color} dark:text-taskflow-${category.color}-light text-lg md:text-xl font-light`}>{category.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs sm:text-sm font-normal text-muted-foreground backdrop-blur-sm bg-white/10 dark:bg-slate-800/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/20 dark:border-slate-700/20">
              {pendingTasks.length} pending · {completedTasks.length} completed
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto py-1 px-2 text-destructive hover:bg-destructive/10"
                  size="sm"
                >
                  <Trash2 size={16} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Category</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete the category "{category.name}"?
                    {tasks.length > 0 && (
                      <span className="block mt-2 font-semibold text-destructive">
                        Warning: This category contains {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}. 
                        You can't delete a category with existing tasks.
                      </span>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive hover:bg-destructive/90"
                    onClick={handleDeleteCategory}
                    disabled={tasks.length > 0}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3 sm:pt-4 backdrop-blur-sm p-3 sm:p-4">
        <div className="tasklist-container">
          {pendingTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              category={category}
              dragHandleProps={dragHandleProps}
            />
          ))}
          
          {completedTasks.length > 0 && (
            <div className="mt-3 sm:mt-4 mb-2">
              <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2 bg-white/10 dark:bg-slate-800/20 inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full backdrop-blur-sm">Completed</h4>
              {completedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  category={category}
                  dragHandleProps={dragHandleProps}
                />
              ))}
            </div>
          )}

          {isAddingTask ? (
            <div className="flex items-center mt-3 gap-2 neo-glass p-2 rounded-lg dark:bg-slate-800/40">
              <Input
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title..."
                onKeyDown={handleKeyDown}
                autoFocus
                className="flex-1 bg-white/40 dark:bg-slate-700/40 backdrop-blur-sm border-white/30 dark:border-slate-600/30 text-sm"
              />
              <Button 
                onClick={handleAddTask} 
                className="bg-gradient-to-r from-taskflow-purple to-taskflow-blue hover:opacity-90 text-xs sm:text-sm py-1 px-2 h-auto"
              >
                Add
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setIsAddingTask(false)}
                className="hover:bg-white/20 dark:hover:bg-slate-700/20 text-xs sm:text-sm py-1 px-2 h-auto"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              className="mt-2 w-full justify-start text-muted-foreground neo-button bg-white/10 hover:bg-white/20 dark:bg-slate-800/30 dark:hover:bg-slate-700/30 text-xs sm:text-sm py-1 px-2 h-auto"
              onClick={() => setIsAddingTask(true)}
            >
              <PlusCircle size={16} className="mr-2" />
              Add task
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(CategorySection);
