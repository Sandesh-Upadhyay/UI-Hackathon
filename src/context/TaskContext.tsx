
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, Category } from '@/types/task';
import { useToast } from '@/components/ui/use-toast';

interface TaskContextType {
  tasks: Task[];
  categories: Category[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  reorderTasks: (categoryId: string, startIndex: number, endIndex: number) => void;
  getTasksByCategory: (categoryId: string) => Task[];
}

// Default data
const defaultCategories: Category[] = [
  { id: '1', name: 'Work', color: 'blue' },
  { id: '2', name: 'Personal', color: 'purple' },
  { id: '3', name: 'Shopping', color: 'green' },
  { id: '4', name: 'Health', color: 'pink' },
  { id: '5', name: 'Ideas', color: 'orange' },
];

const defaultTasks: Task[] = [
  { 
    id: '1', 
    title: 'Complete UI design for TaskFlow', 
    completed: false, 
    categoryId: '1', 
    createdAt: new Date() 
  },
  { 
    id: '2', 
    title: 'Present project to hackathon judges', 
    completed: false, 
    categoryId: '1', 
    createdAt: new Date() 
  },
  { 
    id: '3', 
    title: 'Buy groceries for the week', 
    completed: false, 
    categoryId: '3', 
    createdAt: new Date() 
  },
  { 
    id: '4', 
    title: 'Morning run (30 minutes)', 
    completed: true, 
    categoryId: '4', 
    createdAt: new Date(Date.now() - 86400000) 
  },
  { 
    id: '5', 
    title: 'Call mom on her birthday', 
    completed: false, 
    categoryId: '2', 
    createdAt: new Date(Date.now() + 86400000) 
  },
  { 
    id: '6', 
    title: 'Research drag and drop libraries', 
    completed: true, 
    categoryId: '1', 
    createdAt: new Date(Date.now() - 172800000) 
  },
  { 
    id: '7', 
    title: 'App idea: Food delivery for pets', 
    completed: false, 
    categoryId: '5', 
    createdAt: new Date() 
  },
];

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const { toast } = useToast();

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
    toast({
      description: "Task added successfully",
    });
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...updates } : task)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      variant: "destructive",
      description: "Task deleted",
    });
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories([...categories, newCategory]);
    toast({
      description: "Category added successfully",
    });
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(
      categories.map(category => 
        category.id === id ? { ...category, ...updates } : category
      )
    );
  };

  const deleteCategory = (id: string) => {
    // Only delete if no tasks use this category
    const tasksWithCategory = tasks.filter(task => task.categoryId === id);
    if (tasksWithCategory.length > 0) {
      toast({
        variant: "destructive",
        description: "Cannot delete category with existing tasks",
      });
      return;
    }
    
    setCategories(categories.filter(category => category.id !== id));
    toast({
      variant: "destructive",
      description: "Category deleted",
    });
  };

  const reorderTasks = (categoryId: string, startIndex: number, endIndex: number) => {
    const categoryTasks = [...tasks.filter(task => task.categoryId === categoryId)];
    const [removed] = categoryTasks.splice(startIndex, 1);
    categoryTasks.splice(endIndex, 0, removed);
    
    // Create a new tasks array with the reordered tasks
    const newTasks = [
      ...tasks.filter(task => task.categoryId !== categoryId),
      ...categoryTasks
    ];
    
    setTasks(newTasks);
  };

  const getTasksByCategory = (categoryId: string) => {
    return tasks.filter(task => task.categoryId === categoryId);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        categories,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        addCategory,
        updateCategory,
        deleteCategory,
        reorderTasks,
        getTasksByCategory,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
