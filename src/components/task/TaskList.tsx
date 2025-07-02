'use client';

import React, { useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TaskItem from './TaskItem';
import { Task, TaskFilters } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskList = React.memo<TaskListProps>(({
  tasks,
  filters,
  onFiltersChange,
  onToggleTask,
  onDeleteTask
}) => {
  const hasNoTasks = useCallback((): boolean => {
    return tasks.length === 0;
  }, [tasks.length]);

  const getEmptyStateMessage = useCallback((): string => {
    if (!filters.showCompleted) {
      return 'No pending tasks. Great job!';
    }
    return 'No tasks yet. Add one above to get started!';
  }, [filters.showCompleted]);

  const handleSortChange = useCallback((sortBy: 'priority' | 'name' | 'created') => {
    onFiltersChange({ ...filters, sortBy });
  }, [filters, onFiltersChange]);

  const handleShowCompletedChange = useCallback((showCompleted: boolean) => {
    onFiltersChange({ ...filters, showCompleted });
  }, [filters, onFiltersChange]);

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Sort by</label>
              <Select
                value={filters.sortBy}
                onValueChange={handleSortChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="created">Date Created</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-completed"
                  checked={filters.showCompleted}
                  onCheckedChange={handleShowCompletedChange}
                />
                <label htmlFor="show-completed" className="text-sm font-medium">
                  Show completed tasks
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <div className="space-y-3">
        {hasNoTasks() ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                {getEmptyStateMessage()}
              </p>
            </CardContent>
          </Card>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
});

TaskList.displayName = 'TaskList';

export default TaskList;