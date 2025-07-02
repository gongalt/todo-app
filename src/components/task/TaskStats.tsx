import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TaskStats as TaskStatsType } from '@/types/task';

interface TaskStatsProps {
  stats: TaskStatsType;
}

const TaskStats = React.memo<TaskStatsProps>(({ stats }) => {
  const getCompletionPercentage = (): number => {
    if (stats.total === 0) return 0;
    return Math.round((stats.completed / stats.total) * 100);
  };

  const getStatusBadgeVariant = () => {
    const percentage = getCompletionPercentage();
    if (percentage === 100) return 'default';
    if (percentage >= 50) return 'secondary';
    return 'outline';
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Tasks</p>
            <p className="text-2xl font-bold">
              {stats.completed} / {stats.total}
            </p>
          </div>
          <Badge variant={getStatusBadgeVariant()}>
            {getCompletionPercentage()}% Complete
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
});

TaskStats.displayName = 'TaskStats';

export default TaskStats;