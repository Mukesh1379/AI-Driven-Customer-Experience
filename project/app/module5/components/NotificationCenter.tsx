'use client';

import React, { useState, useEffect } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import {
  BellIcon,
  ExclamationCircleIcon,
  ClockIcon,
  CheckCircleIcon,
  TrashIcon,
  CalendarIcon,
  UserCircleIcon,
  ChartBarIcon,
  ArrowPathIcon,
  XMarkIcon,
  ListBulletIcon,
  Squares2X2Icon,
  FunnelIcon,
  MagnifyingGlassIcon,
  CheckIcon,
  EyeIcon,
  QueueListIcon
} from '@heroicons/react/24/outline';
import type { Notification, Priority, Category, GroupBy } from '../types/notification';
import NotificationFilters, { FilterState } from './NotificationFilters';

const priorityColors: Record<Priority, string> = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-orange-100 text-orange-800',
  low: 'bg-green-100 text-green-800',
};

const priorityIcons: Record<Priority, React.ReactNode> = {
  high: <ExclamationCircleIcon className="h-5 w-5 text-red-500" />,
  medium: <ClockIcon className="h-5 w-5 text-orange-500" />,
  low: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
};

const categoryColors: Record<Category, string> = {
  insurance: 'bg-purple-100 text-purple-800',
  tasks: 'bg-blue-100 text-blue-800',
  reminders: 'bg-yellow-100 text-yellow-800',
  system: 'bg-gray-100 text-gray-800',
  reports: 'bg-indigo-100 text-indigo-800',
  approvals: 'bg-pink-100 text-pink-800',
};

interface NotificationCenterProps {
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
  onComplete?: (notification: Notification) => void;
  onDelete?: (notification: Notification) => void;
}

export default function NotificationCenter({ 
  notifications: initialNotifications, 
  onNotificationClick,
  onComplete,
  onDelete,
}: NotificationCenterProps) {
  const [notifications, setNotifications] = useState(initialNotifications.map(n => ({ ...n, isSelected: false })));
  const [filters, setFilters] = useState<FilterState>({
    priority: [],
    status: [],
    type: [],
    category: [],
  });
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');
  const [searchTerm, setSearchTerm] = useState('');
  const [groupBy, setGroupBy] = useState<GroupBy>('none');
  const [selectAll, setSelectAll] = useState(false);

  const filteredNotifications = notifications
    .filter((notification) => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          notification.title.toLowerCase().includes(searchLower) ||
          notification.message.toLowerCase().includes(searchLower)
        );
      }
      if (filters.priority.length && !filters.priority.includes(notification.priority)) return false;
      if (filters.status.length && !filters.status.includes(notification.status)) return false;
      if (filters.type.length && !filters.type.includes(notification.type)) return false;
      if (filters.category.length && !filters.category.includes(notification.category)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const groupedNotifications = React.useMemo(() => {
    if (groupBy === 'none') return { ungrouped: filteredNotifications };
    
    return filteredNotifications.reduce((acc, notification) => {
      const key = notification[groupBy];
      if (!acc[key]) acc[key] = [];
      acc[key].push(notification);
      return acc;
    }, {} as Record<string, Notification[]>);
  }, [filteredNotifications, groupBy]);

  const handleNotificationSelect = (notification: Notification) => {
    setSelectedNotification(notification);
    onNotificationClick(notification);
  };

  const handleComplete = (notification: Notification) => {
    onComplete?.(notification);
    if (selectedNotification?.id === notification.id) {
      setSelectedNotification(null);
    }
  };

  const handleDelete = (notification: Notification) => {
    onDelete?.(notification);
    if (selectedNotification?.id === notification.id) {
      setSelectedNotification(null);
    }
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setNotifications(notifications.map(n => ({ ...n, isSelected: newSelectAll })));
  };

  const toggleSelect = (notificationId: string) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, isSelected: !n.isSelected } : n
    ));
  };

  const handleBulkAction = (action: 'complete' | 'delete' | 'markAsRead') => {
    const selectedIds = notifications.filter(n => n.isSelected).map(n => n.id);
    if (selectedIds.length === 0) return;

    switch (action) {
      case 'complete':
        selectedIds.forEach(id => {
          const notification = notifications.find(n => n.id === id);
          if (notification) onComplete?.(notification);
        });
        break;
      case 'delete':
        selectedIds.forEach(id => {
          const notification = notifications.find(n => n.id === id);
          if (notification) onDelete?.(notification);
        });
        break;
      case 'markAsRead':
        setNotifications(notifications.map(n => 
          n.isSelected ? { ...n, status: 'read' } : n
        ));
        break;
    }

    setSelectAll(false);
    setNotifications(notifications.map(n => ({ ...n, isSelected: false })));
  };

  const renderNotificationCard = (notification: Notification) => (
    <div
      key={notification.id}
      className={`flex items-start gap-4 p-6 rounded-xl border transition-all transform hover:scale-[1.01] ${
        selectedNotification?.id === notification.id
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-gray-200 hover:shadow-lg bg-white'
      } ${notification.status === 'completed' ? 'bg-green-50 border-green-200' : ''}`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={notification.isSelected}
          onChange={() => toggleSelect(notification.id)}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          onClick={e => e.stopPropagation()}
        />
        <div className="flex-shrink-0">
          {notification.status === 'completed' ? (
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
          ) : (
            priorityIcons[notification.priority]
          )}
        </div>
      </div>
      <div 
        className="flex-grow cursor-pointer"
        onClick={() => handleNotificationSelect(notification)}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{notification.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[notification.category]}`}>
            {notification.category}
          </span>
        </div>
        <p className="text-gray-600 mt-2">{notification.message}</p>
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
          <span title={format(new Date(notification.createdAt), 'PPpp')}>
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </span>
          <span className={`px-3 py-1 rounded-full ${priorityColors[notification.priority]}`}>
            {notification.priority}
          </span>
          <span className={`capitalize px-3 py-1 rounded-full ${
            notification.status === 'completed' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {notification.status}
          </span>
        </div>
        {notification.dueDate && (
          <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4" />
            <span>Due {format(new Date(notification.dueDate), 'PP')}</span>
          </div>
        )}
        {notification.assignedTo && (
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <UserCircleIcon className="h-4 w-4" />
            <span>Assigned to {notification.assignedTo}</span>
          </div>
        )}
        {typeof notification.progress === 'number' && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-medium text-gray-700">{notification.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${notification.progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-grow md:flex-grow-0 max-w-md">
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isFilterVisible
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FunnelIcon className="h-5 w-5" />
              Filters
            </button>
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded-md transition-colors ${
                  view === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ListBulletIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded-md transition-colors ${
                  view === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'priority')}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
            </select>
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value as GroupBy)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="none">No Grouping</option>
              <option value="category">Group by Category</option>
              <option value="priority">Group by Priority</option>
              <option value="status">Group by Status</option>
              <option value="type">Group by Type</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md">
              <ArrowPathIcon className="h-5 w-5" />
              Refresh
            </button>
            <div className="flex gap-2">
              <span className="bg-red-100 text-red-800 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
                {notifications.filter(n => n.priority === 'high' && n.status === 'pending').length} high priority
              </span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
                {notifications.filter(n => n.status === 'pending').length} pending
              </span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
                {notifications.filter(n => n.status === 'completed').length} completed
              </span>
            </div>
          </div>
        </div>

        <NotificationFilters 
          onFilterChange={setFilters} 
          activeFilters={filters}
          isVisible={isFilterVisible}
          onClose={() => setIsFilterVisible(false)}
        />

        <div className="flex items-center justify-between mt-6 mb-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Select All</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkAction('markAsRead')}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <EyeIcon className="h-4 w-4" />
              Mark as Read
            </button>
            <button
              onClick={() => handleBulkAction('complete')}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
            >
              <CheckIcon className="h-4 w-4" />
              Complete Selected
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
            >
              <TrashIcon className="h-4 w-4" />
              Delete Selected
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(groupedNotifications).map(([group, groupNotifications]) => (
            <div key={group} className="space-y-4">
              {group !== 'ungrouped' && (
                <h3 className="text-lg font-semibold text-gray-900 capitalize">
                  {group.replace('_', ' ')}
                </h3>
              )}
              <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
                {groupNotifications.map(renderNotificationCard)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedNotification && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Notification Details</h3>
            <button
              onClick={() => setSelectedNotification(null)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{selectedNotification.status}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-700">Type</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">
                  {selectedNotification.type.replace('_', ' ')}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{selectedNotification.category}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-700">Priority</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{selectedNotification.priority}</p>
              </div>
            </div>

            {selectedNotification.sentiment && (
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-700">Sentiment</label>
                <div className="mt-1 flex items-center gap-2">
                  <ChartBarIcon className="h-5 w-5 text-gray-500" />
                  <p className="text-sm text-gray-900 capitalize">{selectedNotification.sentiment}</p>
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-4">
              <label className="text-sm font-medium text-gray-700">Timeline</label>
              <div className="mt-3 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <ClockIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Created:</span>
                  <span className="text-gray-900">
                    {format(new Date(selectedNotification.createdAt), 'PPpp')}
                  </span>
                </div>
                {selectedNotification.scheduledFor && (
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">Scheduled for:</span>
                    <span className="text-gray-900">
                      {format(new Date(selectedNotification.scheduledFor), 'PPpp')}
                    </span>
                  </div>
                )}
                {selectedNotification.completedAt && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Completed:</span>
                    <span className="text-gray-900">
                      {format(new Date(selectedNotification.completedAt), 'PPpp')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              {selectedNotification.status !== 'completed' && (
                <button
                  onClick={() => handleComplete(selectedNotification)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <CheckIcon className="h-4 w-4" />
                  Complete
                </button>
              )}
              <button
                onClick={() => handleDelete(selectedNotification)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
              >
                <TrashIcon className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}