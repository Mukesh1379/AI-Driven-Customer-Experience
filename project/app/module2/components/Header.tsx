'use client';

import { useState } from 'react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [notifications] = useState(3);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-indigo-600">InsureAI</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <BellIcon className="h-6 w-6 text-gray-500 hover:text-indigo-600 cursor-pointer" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </div>
            <UserCircleIcon className="h-8 w-8 text-gray-500 hover:text-indigo-600 cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
}