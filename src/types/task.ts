/**
 * Core task data structure
 */
export interface Task {
    /** Unique identifier for the task */
    id: string;
    /** Task title/name (required) */
    title: string;
    /** Optional task description */
    description?: string;
    /** Task priority level */
    priority: TaskPriority;
    /** Whether the task is completed */
    completed: boolean;
    /** When the task was created */
    createdAt: Date;
    /** When the task was completed (if completed) */
    completedAt?: Date;
  }

  /**
   * Available task priority levels
   * Used for sorting and visual indication
   */
  export type TaskPriority = 'HIGH' | 'MEDIUM' | 'LOW';

  /**
   * Statistics about task completion
   */
  export interface TaskStats {
    /** Total number of tasks */
    total: number;
    /** Number of completed tasks */
    completed: number;
  }

  /**
   * Filter and sorting options for task list
   */
  export interface TaskFilters {
    /** How to sort the task list */
    sortBy: 'priority' | 'name' | 'created';
    /** Whether to show completed tasks */
    showCompleted: boolean;
  }