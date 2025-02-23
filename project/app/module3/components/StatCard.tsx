'use client';

import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, UserGroupIcon, ChartBarIcon, ExclamationTriangleIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  value: number;
  suffix?: string;
  trend: string;
  trendDirection: 'up' | 'down';
  isNegative?: boolean;
  icon?: 'users' | 'chart' | 'alert' | 'shield';
}

export default function StatCard({ 
  title, 
  value, 
  suffix = '', 
  trend, 
  trendDirection,
  isNegative = false,
  icon
}: Props) {
  const getIcon = () => {
    switch (icon) {
      case 'users':
        return <UserGroupIcon className="h-6 w-6 text-indigo-600" />;
      case 'chart':
        return <ChartBarIcon className="h-6 w-6 text-blue-600" />;
      case 'alert':
        return <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />;
      case 'shield':
        return <ShieldCheckIcon className="h-6 w-6 text-green-600" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
      whileHover={{ scale: 1.02, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        {getIcon()}
      </div>
      <div className="flex items-baseline">
        <div className="text-3xl font-bold text-gray-900">
          <CountUp end={value} decimals={value % 1 !== 0 ? 1 : 0} duration={2} />
          {suffix}
        </div>
        <span
          className={`ml-2 flex items-center text-sm font-medium ${
            isNegative
              ? trendDirection === 'up'
                ? 'text-red-600'
                : 'text-green-600'
              : trendDirection === 'up'
              ? 'text-green-600'
              : 'text-red-600'
          }`}
        >
          {trendDirection === 'up' ? (
            <ArrowUpIcon className="h-4 w-4 flex-shrink-0 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 flex-shrink-0 mr-1" />
          )}
          {trend}
        </span>
      </div>
    </motion.div>
  );
}