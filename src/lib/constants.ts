/**
 * Application constants for task management
 * Following style guide: constants use ALL_CAPS for better readability
 */

/** 
 * Task priority enumeration
 * Used as the single source of truth for priority values
 */
export const TASK_PRIORITIES = {
    HIGH: 'HIGH' as const,
    MEDIUM: 'MEDIUM' as const,
    LOW: 'LOW' as const,
  } as const;

  /**
   * Numeric weights for priority-based sorting
   * Higher numbers indicate higher priority
   */
  export const PRIORITY_WEIGHTS = {
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1,
  } as const;

  /**
   * Human-readable labels for priority display
   * Used in UI components and form options
   */
  export const PRIORITY_LABELS = {
    HIGH: 'High Priority',
    MEDIUM: 'Medium Priority',
    LOW: 'Low Priority',
  } as const;

  /**
   * Badge color variants for priority indication
   * Maps to Tailwind CSS/Radix UI badge variants
   */
  export const PRIORITY_COLORS = {
    HIGH: 'destructive',
    MEDIUM: 'default',
    LOW: 'secondary',
  } as const;