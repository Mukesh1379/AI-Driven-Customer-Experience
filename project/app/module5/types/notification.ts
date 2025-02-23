export type Priority = 'high' | 'medium' | 'low';
export type NotificationStatus = 'pending' | 'sent' | 'read' | 'archived' | 'deleted' | 'completed';
export type NotificationType = 
  | 'policy_abandon' 
  | 'renewal_reminder' 
  | 'follow_up' 
  | 'task' 
  | 'alert' 
  | 'meeting' 
  | 'deadline'
  | 'update'
  | 'report'
  | 'approval';
export type Sentiment = 'positive' | 'negative' | 'neutral';
export type Category = 'insurance' | 'tasks' | 'reminders' | 'system' | 'reports' | 'approvals';
export type GroupBy = 'none' | 'category' | 'priority' | 'status' | 'type';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  priority: Priority;
  type: NotificationType;
  status: NotificationStatus;
  category: Category;
  sentiment?: Sentiment;
  createdAt: Date;
  scheduledFor?: Date;
  dueDate?: Date;
  completedAt?: Date;
  assignedTo?: string;
  actions?: NotificationAction[];
  metadata?: Record<string, any>;
  isSelected?: boolean;
  progress?: number;
}

export interface NotificationAction {
  label: string;
  type: 'primary' | 'secondary' | 'danger' | 'success';
  icon?: string;
  onClick: () => void;
}