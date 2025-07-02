'use client';

import { useState, useMemo, useCallback } from 'react';
import { Task, TaskPriority, TaskStats, TaskFilters } from '@/types/task';
import { PRIORITY_WEIGHTS } from '@/lib/constants';

// Mock data for development
const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Setup project structure',
    description: 'Create folders and initial files',
    priority: 'HIGH',
    completed: true,
    createdAt: new Date('2024-01-01'),
    completedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    title: 'Build task components',
    priority: 'MEDIUM',
    completed: false,
    createdAt: new Date('2024-01-02'),
  },
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filters, setFilters] = useState<TaskFilters>({
    sortBy: 'priority',
    showCompleted: true,
  });

  const shouldShowTask = useCallback((task: Task): boolean => {
    if (!filters.showCompleted && task.completed) return false;
    return true;
  }, [filters.showCompleted]);

  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter(shouldShowTask)
      .sort((a, b) => {
        if (filters.sortBy === 'priority') {
          return PRIORITY_WEIGHTS[b.priority] - PRIORITY_WEIGHTS[a.priority];
        }
        if (filters.sortBy === 'name') {
          return a.title.localeCompare(b.title);
        }
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
  }, [tasks, shouldShowTask, filters.sortBy]);

  const taskStats = useMemo((): TaskStats => {
    const completed = tasks.filter(task => task.completed).length;
    return { total: tasks.length, completed };
  }, [tasks]);

  const addTask = useCallback((title: string, description: string, priority: TaskPriority) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      completed: false,
      createdAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
  }, []);

  const toggleTask = useCallback((taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id !== taskId) return task;

      return {
        ...task,
        completed: !task.completed,
        completedAt: !task.completed ? new Date() : undefined,
      };
    }));
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, []);

  return {
    tasks: filteredAndSortedTasks,
    taskStats,
    filters,
    setFilters,
    addTask,
    toggleTask,
    deleteTask,
  };
};