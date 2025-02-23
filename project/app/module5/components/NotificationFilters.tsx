'use client';

import React from 'react';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { Priority, NotificationStatus, NotificationType, Category } from '../types/notification';

interface NotificationFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  activeFilters: FilterState;
  isVisible: boolean;
  onClose: () => void;
}

export interface FilterState {
  priority: Priority[];
  status: NotificationStatus[];
  type: NotificationType[];
  category: Category[];
}

export default function NotificationFilters({ 
  onFilterChange, 
  activeFilters,
  isVisible,
  onClose
}: NotificationFiltersProps) {
  const handleFilterChange = (category: keyof FilterState, value: string) => {
    const currentFilters = [...activeFilters[category]];
    const index = currentFilters.indexOf(value as any);
    
    if (index === -1) {
      currentFilters.push(value as any);
    } else {
      currentFilters.splice(index, 1);
    }

    onFilterChange({
      ...activeFilters,
      [category]: currentFilters,
    });
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6 animate-slideDown">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 rounded-lg p-2">
            <FunnelIcon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Smart Filters</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <XMarkIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            Priority Level
          </h4>
          <div className="flex flex-wrap gap-2">
            {['high', 'medium', 'low'].map((priority) => (
              <button
                key={priority}
                onClick={() => handleFilterChange('priority', priority)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 ${
                  activeFilters.priority.includes(priority as Priority)
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Current Status
          </h4>
          <div className="flex flex-wrap gap-2">
            {['pending', 'sent', 'read', 'archived', 'deleted', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => handleFilterChange('status', status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 ${
                  activeFilters.status.includes(status as NotificationStatus)
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            Notification Type
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              'policy_abandon',
              'renewal_reminder',
              'follow_up',
              'task',
              'alert',
              'meeting',
              'deadline',
              'update',
              'report',
              'approval'
            ].map((type) => (
              <button
                key={type}
                onClick={() => handleFilterChange('type', type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 ${
                  activeFilters.type.includes(type as NotificationType)
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {type.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            Category
          </h4>
          <div className="flex flex-wrap gap-2">
            {['insurance', 'tasks', 'reminders', 'system', 'reports', 'approvals'].map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange('category', category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 ${
                  activeFilters.category.includes(category as Category)
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}