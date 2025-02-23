'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { ClockIcon, BoltIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useCustomerStore } from '../store/customerStore';

const CHART_TYPES = ['activity', 'engagement', 'history'];
const TIME_RANGES = [
  { label: '7 Days', value: '7d' },
  { label: '30 Days', value: '30d' },
  { label: '90 Days', value: '90d' }
];

export default function CustomerProfile() {
  const [activeTab, setActiveTab] = useState('activity');
  const [timeRange, setTimeRange] = useState('7d');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const { profiles, selectedProfile, setProfiles, setSelectedProfile, loading } = useCustomerStore();

  useEffect(() => {
    setIsMounted(true);
    fetchProfiles();
  }, [timeRange]);

  const fetchProfiles = async () => {
    try {
      const response = await fetch(`/api/user_behavior?timeRange=${timeRange}`);
      const data = await response.json();
      setProfiles(data.profiles);
      if (!selectedProfile && data.profiles.length > 0) {
        setSelectedProfile(data.profiles[0]);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.persona.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChart = () => {
    if (!selectedProfile) return null;

    const data = selectedProfile.behavior.history;

    switch (activeTab) {
      case 'activity':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => format(new Date(date), 'MMM d')}
                stroke="#9ca3af"
              />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value) => [`${value} views`, 'Page Views']}
                labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#colorViews)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'engagement':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => format(new Date(date), 'MMM d')}
                stroke="#9ca3af"
              />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value) => [`${value} seconds`, 'Duration']}
                labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
              />
              <Line
                type="monotone"
                dataKey="duration"
                stroke="#ec4899"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'history':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => format(new Date(date), 'MMM d')}
                stroke="#9ca3af"
              />
              <YAxis yAxisId="left" stroke="#9ca3af" />
              <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value, name) => [value, name === 'views' ? 'Page Views' : 'Duration (s)']}
                labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="views"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="duration"
                stroke="#ec4899"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <h1 className="text-4xl font-bold gradient-text">
              Customer Insights Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search profiles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-xl glass-card focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <div className="flex gap-2">
                {TIME_RANGES.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => setTimeRange(value)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all hover-scale ${
                      timeRange === value
                        ? 'gradient-bg text-white shadow-neon'
                        : 'glass-card text-gray-700 hover:shadow-glass-hover'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer List */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-2xl font-semibold gradient-text">
                  Customer Profiles
                </h2>
              </div>
              <div className="divide-y divide-white/10 max-h-[600px] overflow-y-auto scrollbar-hide">
                <AnimatePresence>
                  {filteredProfiles.map((profile) => (
                    <motion.div
                      key={profile.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 cursor-pointer transition-all hover:bg-white/40 ${
                        selectedProfile?.id === profile.id ? 'bg-gradient-to-r from-primary-50/50 to-pink-50/50' : ''
                      }`}
                      onClick={() => setSelectedProfile(profile)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-xl gradient-bg flex items-center justify-center shadow-neon">
                            <span className="text-white font-medium text-lg">
                              {profile.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-base font-medium text-gray-900">{profile.name}</h3>
                            <p className="text-sm text-gray-500">{profile.persona.type}</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gradient-bg text-white shadow-neon">
                          {profile.behavior.pageViews} views
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          Last active: {format(new Date(profile.behavior.lastActive), 'MMM d, HH:mm')}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Charts and Analytics */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-2xl font-semibold gradient-text">
                  Behavior Analytics
                </h2>
                <div className="flex flex-wrap gap-2">
                  {CHART_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveTab(type)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all hover-scale ${
                        activeTab === type
                          ? 'gradient-bg text-white shadow-neon'
                          : 'glass-card text-gray-700 hover:shadow-glass-hover'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {isMounted && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="h-[400px]"
                  >
                    {renderChart()}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Selected Profile Details */}
            {selectedProfile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 glass-card rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold gradient-text">
                    Profile Details
                  </h2>
                  <span className="text-sm text-gray-500">
                    ID: {selectedProfile.id}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.persona.interests.map((interest) => (
                        <span
                          key={interest}
                          className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium gradient-bg text-white shadow-neon hover-scale"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Preferences</h3>
                    <div className="space-y-3">
                      {Object.entries(selectedProfile.persona.preferences).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between glass-card p-3 rounded-xl hover-scale">
                          <span className="text-sm text-gray-600 capitalize">{key}</span>
                          <span className="text-sm font-medium gradient-text">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Recent Interactions</h3>
                    <div className="glass-card rounded-xl p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedProfile.behavior.interactions.map((interaction, index) => (
                          <div
                            key={index}
                            className="flex items-center text-sm text-gray-600 glass-card rounded-lg p-3 hover-scale"
                          >
                            <BoltIcon className="h-4 w-4 mr-2 text-primary-500" />
                            <span className="capitalize">{interaction.replace('_', ' ')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}