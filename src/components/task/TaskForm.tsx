'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, RefreshCw } from 'lucide-react';
import { TaskPriority } from '@/types/task';
import { TASK_PRIORITIES, PRIORITY_LABELS } from '@/lib/constants';

interface TaskFormProps {
  /** Callback function to handle task creation */
  onAddTask: (title: string, description: string, priority: TaskPriority) => Promise<void>;
  /** Loading state to disable form during submission */
  loading?: boolean;
}

/**
 * Form component for creating new tasks
 * 
 * Features:
 * - Input validation (title required)
 * - Priority selection
 * - Loading states and disabled inputs
 * - Form reset after successful submission
 * - Accessible form controls
 */
const TaskForm = React.memo<TaskFormProps>(({ onAddTask, loading = false }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>(TASK_PRIORITIES.MEDIUM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = useCallback((): boolean => {
    return title.trim().length > 0;
  }, [title]);

  const canSubmitForm = useCallback((): boolean => {
    return isFormValid() && !isSubmitting && !loading;
  }, [isFormValid, isSubmitting, loading]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmitForm()) return;

    setIsSubmitting(true);

    try {
      await onAddTask(title.trim(), description.trim(), priority);

      // Reset form on success
      setTitle('');
      setDescription('');
      setPriority(TASK_PRIORITIES.MEDIUM);
    } catch (error) {
      // Error handling is done in the parent component
      console.error('Failed to add task:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [title, description, priority, canSubmitForm, onAddTask]);

  const getButtonText = useCallback((): string => {
    if (isSubmitting) return 'Adding Task...';
    if (loading) return 'Loading...';
    return 'Add Task';
  }, [isSubmitting, loading]);

  const getButtonIcon = useCallback(() => {
    if (isSubmitting || loading) {
      return <RefreshCw className="h-4 w-4 animate-spin" />;
    }
    return <Plus className="h-4 w-4" />;
  }, [isSubmitting, loading]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting || loading}
              required
            />
          </div>

          <div>
            <Input
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting || loading}
            />
          </div>

          <div>
            <Select
              value={priority}
              onValueChange={(value: TaskPriority) => setPriority(value)}
              disabled={isSubmitting || loading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TASK_PRIORITIES.HIGH}>
                  {PRIORITY_LABELS.HIGH}
                </SelectItem>
                <SelectItem value={TASK_PRIORITIES.MEDIUM}>
                  {PRIORITY_LABELS.MEDIUM}
                </SelectItem>
                <SelectItem value={TASK_PRIORITIES.LOW}>
                  {PRIORITY_LABELS.LOW}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={!canSubmitForm()}
            className="w-full"
          >
            {getButtonIcon()}
            <span className="ml-2">{getButtonText()}</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
});

TaskForm.displayName = 'TaskForm';

export default TaskForm;