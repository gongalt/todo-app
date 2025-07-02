'use client';

import React from 'react';
import TaskForm from '@/components/task/TaskForm';
import TaskList from '@/components/task/TaskList';
import TaskStats from '@/components/task/TaskStats';
import { useTasks } from '@/hooks/useTasks';

// Following your style guide: React.memo for optimization
const HomePage = React.memo(() => {
  const {
    tasks,
    taskStats,
    filters,
    setFilters,
    addTask,
    toggleTask,
    deleteTask,
  } = useTasks();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Todo List Manager
          </h1>
          <p className="text-muted-foreground">
            Organize your tasks with priorities and stay productive
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <TaskStats stats={taskStats} />
        </div>

        {/* Two Column Layout - Mobile Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Form - Takes 1 column on desktop */}
          <div className="lg:col-span-1">
            <TaskForm onAddTask={addTask} />
          </div>

          {/* Task List - Takes 2 columns on desktop, full width on mobile */}
          <div className="lg:col-span-2">
            <TaskList
              tasks={tasks}
              filters={filters}
              onFiltersChange={setFilters}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>Built with Next.js, TypeScript, and ShadcnUI</p>
        </footer>
      </div>
    </div>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;