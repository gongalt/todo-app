'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { Task, TaskPriority, TaskStats, TaskFilters } from '@/types/task';
import { PRIORITY_WEIGHTS } from '@/lib/constants';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Interface for raw task data from API (snake_case fields)
interface RawApiTask {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  completed: boolean;
  created_at: string;
  completed_at?: string;
}

/**
 * Custom hook for managing task state and API operations
 * 
 * Provides centralized state management for:
 * - Task CRUD operations (Create, Read, Update, Delete)
 * - Loading states and error handling
 * - Task filtering and sorting
 * - API communication with the PHP backend
 * 
 * @returns Object containing task data, operations, and state
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({
    sortBy: 'priority',
    showCompleted: true,
  });

  const handleApiError = useCallback((error: string) => {
    setError(error);
    console.error('API Error:', error);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    clearError();

    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      const result: ApiResponse<RawApiTask[]> = await response.json();

      if (!result.success) {
        handleApiError(result.error || 'Failed to fetch tasks');
        return;
      }

      // Convert date strings back to Date objects and map snake_case to camelCase
      const tasksWithDates: Task[] = (result.data || []).map(rawTask => ({
        id: rawTask.id,
        title: rawTask.title,
        description: rawTask.description,
        priority: rawTask.priority,
        completed: rawTask.completed,
        createdAt: new Date(rawTask.created_at),
        completedAt: rawTask.completed_at ? new Date(rawTask.completed_at) : undefined,
      }));

      setTasks(tasksWithDates);
    } catch (err) {
      handleApiError('Network error: Unable to connect to server' + err);
    } finally {
      setLoading(false);
    }
  }, [handleApiError, clearError]);

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Following your style guide: extract complex conditions to named functions
  const shouldShowTask = useCallback((task: Task): boolean => {
    if (!filters.showCompleted && task.completed) return false;
    return true;
  }, [filters.showCompleted]);

  // Following your style guide: useMemo for expensive operations
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

  // API Functions
  const addTask = useCallback(async (title: string, description: string, priority: TaskPriority) => {
    setLoading(true);
    clearError();

    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          priority,
        }),
      });

      const result: ApiResponse<Task> = await response.json();

      if (!result.success) {
        handleApiError(result.error || 'Failed to create task');
        return;
      }

      // Refresh tasks from server
      await fetchTasks();
    } catch (err) {
      handleApiError('Network error: Unable to create task' + err);
    } finally {
      setLoading(false);
    }
  }, [fetchTasks, handleApiError, clearError]);

  const toggleTask = useCallback(async (taskId: string) => {
    const currentTask = tasks.find(task => task.id === taskId);
    if (!currentTask) return;

    setLoading(true);
    clearError();

    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !currentTask.completed,
        }),
      });

      const result: ApiResponse<Task> = await response.json();

      if (!result.success) {
        handleApiError(result.error || 'Failed to update task');
        return;
      }

      // Refresh tasks from server
      await fetchTasks();
    } catch (err) {
      handleApiError('Network error: Unable to update task' + err);
    } finally {
      setLoading(false);
    }
  }, [tasks, fetchTasks, handleApiError, clearError]);

  const deleteTask = useCallback(async (taskId: string) => {
    setLoading(true);
    clearError();

    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      });

      const result: ApiResponse<null> = await response.json();

      if (!result.success) {
        handleApiError(result.error || 'Failed to delete task');
        return;
      }

      // Refresh tasks from server
      await fetchTasks();
    } catch (err) {
      handleApiError('Network error: Unable to delete task' + err);
    } finally {
      setLoading(false);
    }
  }, [fetchTasks, handleApiError, clearError]);

  return {
    tasks: filteredAndSortedTasks,
    taskStats,
    filters,
    loading,
    error,
    setFilters,
    addTask,
    toggleTask,
    deleteTask,
    refetch: fetchTasks,
    clearError,
  };
};