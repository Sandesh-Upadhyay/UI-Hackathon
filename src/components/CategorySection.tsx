
import React, { useState } from 'react';
import { Category } from '@/types/task';
import { useTaskContext } from '@/context/TaskContext';
import TaskCard from './TaskCard';
import { PlusCircle } from 'lucide-react';
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
  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle.trim(),
        completed: false,
        categoryId: category.id,
      });
      setNewTaskTitle('');
      setIsAddingTask(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  // Mock drag and drop for now (would implement real drag/drop in a full version)
  const dragHandleProps = {
    onMouseDown: (e: React.MouseEvent) => {
      e.preventDefault();
      // This would trigger real drag and drop in a full implementation
    }
  };

  return (
    <Card className="mb-6 animate-fade-in">
      <CardHeader className={`bg-taskflow-${category.color}/5 rounded-t-lg`}>
        <CardTitle className="flex justify-between items-center">
          <span className={`text-taskflow-${category.color}`}>{category.name}</span>
          <div className="text-sm font-normal text-muted-foreground">
            {pendingTasks.length} pending · {completedTasks.length} completed
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
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
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Completed</h4>
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
            <div className="flex items-center mt-3 gap-2">
              <Input
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title..."
                onKeyDown={handleKeyDown}
                autoFocus
                className="flex-1"
              />
              <Button onClick={handleAddTask}>Add</Button>
              <Button 
                variant="ghost" 
                onClick={() => setIsAddingTask(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              className="mt-2 w-full justify-start text-muted-foreground"
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

export default CategorySection;
