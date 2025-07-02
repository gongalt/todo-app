// Following your style guide: constants use ALL_CAPS
export const TASK_PRIORITIES = {
    HIGH: 'HIGH' as const,
    MEDIUM: 'MEDIUM' as const,
    LOW: 'LOW' as const,
  } as const;

  export const PRIORITY_WEIGHTS = {
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1,
  } as const;

  export const PRIORITY_LABELS = {
    HIGH: 'High Priority',
    MEDIUM: 'Medium Priority',
    LOW: 'Low Priority',
  } as const;

  export const PRIORITY_COLORS = {
    HIGH: 'destructive',
    MEDIUM: 'default',
    LOW: 'secondary',
  } as const;