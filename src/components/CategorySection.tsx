
import React, { useState, useMemo, useCallback, memo } from 'react';
import { Category } from '@/types/task';
import { useTaskContext } from '@/context/TaskContext';
import TaskCard from './TaskCard';
import { PlusCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface CategorySectionProps {
  category: Category;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  const { getTasksByCategory, addTask } = useTaskContext();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  
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

  // Mock drag and drop for now (would implement real drag/drop in a full version)
  const dragHandleProps = useMemo(() => ({
    onMouseDown: (e: React.MouseEvent) => {
      e.preventDefault();
      // This would trigger real drag and drop in a full implementation
    }
  }), []);

  return (
    <Card className="mb-6 animate-fade-in neo-glass hover:shadow-xl transition-all duration-300 border border-white/30">
      <CardHeader className={`bg-taskflow-${category.color}/5 backdrop-blur-md rounded-t-lg border-b border-white/20`}>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className={`text-taskflow-${category.color} float-animation`} />
            <span className={`text-taskflow-${category.color} text-xl font-light`}>{category.name}</span>
          </div>
          <div className="text-sm font-normal text-muted-foreground backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full border border-white/20">
            {pendingTasks.length} pending · {completedTasks.length} completed
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 backdrop-blur-sm">
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
            <div className="mt-4 mb-2">
              <h4 className="text-sm font-medium text-muted-foreground mb-2 bg-white/10 inline-block px-3 py-1 rounded-full backdrop-blur-sm">Completed</h4>
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
            <div className="flex items-center mt-3 gap-2 neo-glass p-2 rounded-lg">
              <Input
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title..."
                onKeyDown={handleKeyDown}
                autoFocus
                className="flex-1 bg-white/40 backdrop-blur-sm border-white/30"
              />
              <Button 
                onClick={handleAddTask} 
                className="bg-gradient-to-r from-taskflow-purple to-taskflow-blue hover:opacity-90"
              >
                Add
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setIsAddingTask(false)}
                className="hover:bg-white/20"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              className="mt-2 w-full justify-start text-muted-foreground neo-button bg-white/10 hover:bg-white/20"
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
