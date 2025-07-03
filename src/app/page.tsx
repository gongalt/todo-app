'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, RefreshCw } from 'lucide-react';
import TaskForm from '@/components/task/TaskForm';
import TaskList from '@/components/task/TaskList';
import TaskStats from '@/components/task/TaskStats';
import { useTasks } from '@/hooks/useTasks';

const HomePage = React.memo(() => {
  const {
    tasks,
    taskStats,
    filters,
    loading,
    error,
    setFilters,
    addTask,
    toggleTask,
    deleteTask,
    refetch,
    clearError,
  } = useTasks();

  const hasError = (): boolean => {
    return error !== null;
  };

  const isLoading = (): boolean => {
    return loading;
  };

  const handleRetry = () => {
    clearError();
    refetch();
  };

  // Error state component
  const ErrorDisplay = () => (
    <Card className="border-destructive">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 text-destructive">
          <AlertCircle className="h-5 w-5" />
          <div className="flex-1">
            <h3 className="font-medium">Something went wrong</h3>
            <p className="text-sm text-muted-foreground mt-1">{error}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleRetry}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Loading overlay component
  const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-lg">
      <div className="flex items-center gap-2 text-muted-foreground">
        <RefreshCw className="h-4 w-4 animate-spin" />
        <span className="text-sm">Loading...</span>
      </div>
    </div>
  );

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

        {/* Error Display */}
        {hasError() && (
          <div className="mb-8">
            <ErrorDisplay />
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 relative">
          <TaskStats stats={taskStats} />
          {isLoading() && <LoadingOverlay />}
        </div>

        {/* Two Column Layout - Mobile Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Form - Takes 1 column on desktop */}
          <div className="lg:col-span-1 relative">
            <TaskForm onAddTask={addTask} loading={loading} />
            {isLoading() && <LoadingOverlay />}
          </div>

          {/* Task List - Takes 2 columns on desktop, full width on mobile */}
          <div className="lg:col-span-2 relative">
            <TaskList
              tasks={tasks}
              filters={filters}
              onFiltersChange={setFilters}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
            {isLoading() && <LoadingOverlay />}
          </div>
        </div>

        {/* Server Status Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <div className={`w-2 h-2 rounded-full ${hasError() ? 'bg-destructive' : 'bg-green-500'}`} />
            {hasError() ? 'Server connection error' : 'Connected to server'}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>Built with Next.js, TypeScript, PHP, and SQLite</p>
        </footer>
      </div>
    </div>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;