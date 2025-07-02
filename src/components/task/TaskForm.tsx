'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskPriority } from '@/types/task';
import { TASK_PRIORITIES, PRIORITY_LABELS } from '@/lib/constants';

interface TaskFormProps {
  onAddTask: (title: string, description: string, priority: TaskPriority) => void;
}

const TaskForm = React.memo<TaskFormProps>(({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>(TASK_PRIORITIES.MEDIUM);

  const isFormValid = useCallback((): boolean => {
    return title.trim().length > 0;
  }, [title]);

  const canSubmitForm = useCallback((): boolean => {
    return isFormValid();
  }, [isFormValid]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmitForm()) return;

    onAddTask(title.trim(), description.trim(), priority);

    setTitle('');
    setDescription('');
    setPriority(TASK_PRIORITIES.MEDIUM);
  }, [title, description, priority, canSubmitForm, onAddTask]);

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
              required
            />
          </div>

          <div>
            <Input
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Select value={priority} onValueChange={(value: TaskPriority) => setPriority(value)}>
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
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
});

TaskForm.displayName = 'TaskForm';

export default TaskForm;