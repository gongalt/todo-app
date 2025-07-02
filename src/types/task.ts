export interface Task {
    id: string;
    title: string;
    description?: string;
    priority: TaskPriority;
    completed: boolean;
    createdAt: Date;
    completedAt?: Date;
  }

  export type TaskPriority = 'HIGH' | 'MEDIUM' | 'LOW';

  export interface TaskStats {
    total: number;
    completed: number;
  }

  export interface TaskFilters {
    sortBy: 'priority' | 'name' | 'created';
    showCompleted: boolean;
  }