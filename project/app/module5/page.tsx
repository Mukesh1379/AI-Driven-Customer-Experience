'use client';

import { useState } from 'react';
import NotificationCenter from './components/NotificationCenter';
import type { Notification } from './types/notification';

const sampleNotifications: Notification[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Policy Selection Abandoned',
    message: 'We noticed you left your policy selection. Here\'s an exclusive discount to help you decide!',
    priority: 'high',
    type: 'policy_abandon',
    status: 'pending',
    category: 'insurance',
    sentiment: 'negative',
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    progress: 0
  },
  {
    id: '2',
    userId: 'user1',
    title: 'Policy Renewal Reminder',
    message: 'Your policy is due for renewal in 30 days. Review your options now.',
    priority: 'medium',
    type: 'renewal_reminder',
    status: 'pending',
    category: 'reminders',
    sentiment: 'neutral',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days from now
    progress: 25
  },
  {
    id: '3',
    userId: 'user1',
    title: 'New Policy Options Available',
    message: 'Check out our new policy options that match your preferences.',
    priority: 'low',
    type: 'follow_up',
    status: 'pending',
    category: 'insurance',
    sentiment: 'positive',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    progress: 50
  },
  {
    id: '4',
    userId: 'user1',
    title: 'Task Assignment',
    message: 'You have been assigned to review policy claims for the month.',
    priority: 'high',
    type: 'task',
    status: 'completed',
    category: 'tasks',
    createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    assignedTo: 'John Doe',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
    completedAt: new Date(),
    progress: 100
  },
  {
    id: '5',
    userId: 'user1',
    title: 'System Alert',
    message: 'System maintenance scheduled for tonight at 2 AM EST.',
    priority: 'medium',
    type: 'alert',
    status: 'pending',
    category: 'system',
    createdAt: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 8), // 8 hours from now
    progress: 0
  },
  {
    id: '6',
    userId: 'user1',
    title: 'Team Meeting',
    message: 'Weekly team sync to discuss ongoing projects and updates.',
    priority: 'medium',
    type: 'meeting',
    status: 'pending',
    category: 'tasks',
    createdAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 24), // tomorrow
    assignedTo: 'Team',
    progress: 0
  },
  {
    id: '7',
    userId: 'user1',
    title: 'Project Deadline',
    message: 'Final submission for Q3 reports due by end of week.',
    priority: 'high',
    type: 'deadline',
    status: 'pending',
    category: 'tasks',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
    progress: 75
  },
  {
    id: '8',
    userId: 'user1',
    title: 'Monthly Performance Report',
    message: 'The monthly performance report for August 2023 is ready for review.',
    priority: 'medium',
    type: 'report',
    status: 'pending',
    category: 'reports',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    assignedTo: 'Management Team',
    progress: 0
  },
  {
    id: '9',
    userId: 'user1',
    title: 'Budget Approval Required',
    message: 'New budget proposal for Q4 2023 needs your approval.',
    priority: 'high',
    type: 'approval',
    status: 'pending',
    category: 'approvals',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    progress: 30
  },
  {
    id: '10',
    userId: 'user1',
    title: 'System Update Complete',
    message: 'The latest system update has been successfully installed.',
    priority: 'low',
    type: 'update',
    status: 'completed',
    category: 'system',
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    completedAt: new Date(),
    progress: 100
  },
  {
    id: '11',
    userId: 'user1',
    title: 'Client Meeting Follow-up',
    message: 'Document action items from the client meeting and assign tasks.',
    priority: 'high',
    type: 'task',
    status: 'pending',
    category: 'tasks',
    createdAt: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
    assignedTo: 'Project Team',
    progress: 45
  },
  {
    id: '12',
    userId: 'user1',
    title: 'Insurance Policy Update',
    message: 'Review and approve changes to the standard policy template.',
    priority: 'medium',
    type: 'approval',
    status: 'pending',
    category: 'insurance',
    createdAt: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 48), // 2 days from now
    progress: 60
  },
  {
    id: '13',
    userId: 'user1',
    title: 'Quarterly Compliance Review',
    message: 'Complete the quarterly compliance checklist and submit report.',
    priority: 'high',
    type: 'deadline',
    status: 'pending',
    category: 'reports',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
    progress: 80
  },
  {
    id: '14',
    userId: 'user1',
    title: 'Team Training Session',
    message: 'Mandatory training session on new compliance procedures.',
    priority: 'medium',
    type: 'meeting',
    status: 'pending',
    category: 'tasks',
    createdAt: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 72), // 3 days from now
    assignedTo: 'All Staff',
    progress: 0
  },
  {
    id: '15',
    userId: 'user1',
    title: 'Customer Feedback Analysis',
    message: 'Review and categorize recent customer feedback for product improvements.',
    priority: 'low',
    type: 'task',
    status: 'pending',
    category: 'reports',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    assignedTo: 'Product Team',
    progress: 15
  }
];

export default function Home() {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

  const handleNotificationClick = (notification: Notification) => {
    if (notification.status === 'pending') {
      setNotifications(notifications.map(n => 
        n.id === notification.id ? { ...n, status: 'read' } : n
      ));
    }
  };

  const handleComplete = (notification: Notification) => {
    setNotifications(notifications.map(n =>
      n.id === notification.id ? { 
        ...n, 
        status: 'completed', 
        completedAt: new Date(), 
        progress: 100 
      } : n
    ));
  };

  const handleDelete = (notification: Notification) => {
    setNotifications(notifications.map(n =>
      n.id === notification.id ? { ...n, status: 'deleted' } : n
    ));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-2xl p-8 mb-8 shadow-glass">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 mb-2">
                Smart Task Automation
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full animate-pulse-soft">
                  Beta
                </span>
              </h1>
              <p className="text-lg text-gray-600">
                Streamline your workflow with intelligent task management
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex gap-2">
                <span className="status-badge bg-red-100 text-red-800 px-4 py-2 rounded-xl text-sm font-medium shadow-soft hover-scale">
                  {notifications.filter(n => n.priority === 'high' && n.status === 'pending').length} high priority
                </span>
                <span className="status-badge bg-blue-100 text-blue-800 px-4 py-2 rounded-xl text-sm font-medium shadow-soft hover-scale">
                  {notifications.filter(n => n.status === 'pending').length} pending
                </span>
                <span className="status-badge bg-green-100 text-green-800 px-4 py-2 rounded-xl text-sm font-medium shadow-soft hover-scale">
                  {notifications.filter(n => n.status === 'completed').length} completed
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <NotificationCenter 
          notifications={notifications}
          onNotificationClick={handleNotificationClick}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
      </div>
    </main>
  );
}