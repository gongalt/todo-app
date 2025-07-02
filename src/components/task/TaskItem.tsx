'use client';

import React, { useCallback } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { Task } from '@/types/task';
import { PRIORITY_LABELS, PRIORITY_COLORS } from '@/lib/constants';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem = React.memo<TaskItemProps>(({ task, onToggle, onDelete }) => {
  const isTaskCompleted = useCallback((): boolean => {
    return task.completed;
  }, [task.completed]);

  const getTaskDisplayStyles = useCallback(() => {
    return isTaskCompleted()
      ? 'line-through text-muted-foreground'
      : '';
  }, [isTaskCompleted]);

  const formatDate = useCallback((date: Date): string => {
    return date.toLocaleDateString();
  }, []);

  // Following your style guide: small, focused functions
  const handleToggle = useCallback(() => {
    onToggle(task.id);
  }, [task.id, onToggle]);

  const handleDelete = useCallback(() => {
    onDelete(task.id);
  }, [task.id, onDelete]);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isTaskCompleted()}
            onCheckedChange={handleToggle}
            className="mt-1"
          />

          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className={`font-medium ${getTaskDisplayStyles()}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-sm text-muted-foreground ${getTaskDisplayStyles()}`}>
                    {task.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={PRIORITY_COLORS[task.priority]}>
                  {PRIORITY_LABELS[task.priority]}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              Created: {formatDate(task.createdAt)}
              {task.completedAt && (
                <span className="ml-4">
                  Completed: {formatDate(task.completedAt)}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

TaskItem.displayName = 'TaskItem';

export default TaskItem;