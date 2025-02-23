'use client';

import React, { useState, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChurnMetrics, CustomerData } from '../types/churn';
import RiskDistributionChart from './RiskDistributionChart';
import RetentionStrategies from './RetentionStrategies';
import StatCard from './StatCard';
import CustomerList from './CustomerList';
import CustomerDetails from './CustomerDetails';
import { motion, AnimatePresence } from 'framer-motion';

const mockChurnData: ChurnMetrics[] = [
  { date: '2023-01', churnRate: 2.4, newCustomers: 15 },
  { date: '2023-02', churnRate: 2.8, newCustomers: 12 },
  { date: '2023-03', churnRate: 2.1, newCustomers: 18 },
  { date: '2023-04', churnRate: 2.9, newCustomers: 14 },
  { date: '2023-05', churnRate: 2.3, newCustomers: 20 },
  { date: '2023-06', churnRate: 1.9, newCustomers: 22 },
];

const mockCustomerData: CustomerData[] = [
  {
    id: '1',
    name: 'John Doe',
    riskLevel: 'High',
    churnProbability: 0.85,
    reasons: ['High Premium', 'Inactive'],
    lastActive: '2023-08-15',
    premiumCost: 1200,
    claimHistory: 2,
    complaints: 3,
    email: 'john@example.com',
    segment: 'Premium'
  },
  {
    id: '2',
    name: 'Jane Smith',
    riskLevel: 'Medium',
    churnProbability: 0.45,
    reasons: ['Service Issues'],
    lastActive: '2023-09-01',
    premiumCost: 800,
    claimHistory: 1,
    complaints: 1,
    email: 'jane@example.com',
    segment: 'Standard'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    riskLevel: 'Low',
    churnProbability: 0.15,
    reasons: [],
    lastActive: '2023-09-10',
    premiumCost: 600,
    claimHistory: 0,
    complaints: 0,
    email: 'mike@example.com',
    segment: 'Basic'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    riskLevel: 'High',
    churnProbability: 0.78,
    reasons: ['Price Sensitivity', 'Competitor Offer'],
    lastActive: '2023-08-20',
    premiumCost: 1100,
    claimHistory: 3,
    complaints: 2,
    email: 'sarah@example.com',
    segment: 'Premium'
  },
  {
    id: '5',
    name: 'David Brown',
    riskLevel: 'Low',
    churnProbability: 0.12,
    reasons: [],
    lastActive: '2023-09-12',
    premiumCost: 750,
    claimHistory: 1,
    complaints: 0,
    email: 'david@example.com',
    segment: 'Standard'
  },
  {
    id: '6',
    name: 'Emily Davis',
    riskLevel: 'Medium',
    churnProbability: 0.52,
    reasons: ['Service Response Time'],
    lastActive: '2023-09-05',
    premiumCost: 900,
    claimHistory: 2,
    complaints: 2,
    email: 'emily@example.com',
    segment: 'Premium'
  },
  {
    id: '7',
    name: 'Michael Wilson',
    riskLevel: 'High',
    churnProbability: 0.81,
    reasons: ['Billing Issues', 'Service Quality'],
    lastActive: '2023-08-18',
    premiumCost: 1300,
    claimHistory: 4,
    complaints: 3,
    email: 'michael@example.com',
    segment: 'Premium'
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    riskLevel: 'Low',
    churnProbability: 0.18,
    reasons: [],
    lastActive: '2023-09-11',
    premiumCost: 550,
    claimHistory: 0,
    complaints: 0,
    email: 'lisa@example.com',
    segment: 'Basic'
  },
  {
    id: '9',
    name: 'Robert Taylor',
    riskLevel: 'Medium',
    churnProbability: 0.48,
    reasons: ['Price Sensitivity'],
    lastActive: '2023-09-02',
    premiumCost: 850,
    claimHistory: 1,
    complaints: 1,
    email: 'robert@example.com',
    segment: 'Standard'
  },
  {
    id: '10',
    name: 'Amanda Martinez',
    riskLevel: 'High',
    churnProbability: 0.75,
    reasons: ['Competitor Offer', 'Service Issues'],
    lastActive: '2023-08-25',
    premiumCost: 1150,
    claimHistory: 3,
    complaints: 2,
    email: 'amanda@example.com',
    segment: 'Premium'
  },
  {
    id: '11',
    name: 'Thomas Wright',
    riskLevel: 'High',
    churnProbability: 0.79,
    reasons: ['Service Quality', 'Price Sensitivity'],
    lastActive: '2023-08-22',
    premiumCost: 1250,
    claimHistory: 3,
    complaints: 4,
    email: 'thomas@example.com',
    segment: 'Premium'
  },
  {
    id: '12',
    name: 'Sophie Chen',
    riskLevel: 'Medium',
    churnProbability: 0.55,
    reasons: ['Billing Issues'],
    lastActive: '2023-09-03',
    premiumCost: 950,
    claimHistory: 2,
    complaints: 1,
    email: 'sophie@example.com',
    segment: 'Standard'
  },
  {
    id: '13',
    name: 'James Wilson',
    riskLevel: 'High',
    churnProbability: 0.82,
    reasons: ['Competitor Offer', 'High Premium'],
    lastActive: '2023-08-19',
    premiumCost: 1400,
    claimHistory: 4,
    complaints: 3,
    email: 'james@example.com',
    segment: 'Premium'
  },
  {
    id: '14',
    name: 'Emma Thompson',
    riskLevel: 'Low',
    churnProbability: 0.20,
    reasons: [],
    lastActive: '2023-09-10',
    premiumCost: 600,
    claimHistory: 1,
    complaints: 0,
    email: 'emma@example.com',
    segment: 'Basic'
  },
  {
    id: '15',
    name: 'Daniel Lee',
    riskLevel: 'Medium',
    churnProbability: 0.49,
    reasons: ['Service Response Time'],
    lastActive: '2023-09-04',
    premiumCost: 875,
    claimHistory: 2,
    complaints: 2,
    email: 'daniel@example.com',
    segment: 'Standard'
  }
];

export default function ChurnDashboard() {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<string>('All');
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);

  const filteredCustomers = selectedSegment === 'All' 
    ? mockCustomerData 
    : mockCustomerData.filter(c => c.segment === selectedSegment);

  const segments = ['All', ...new Set(mockCustomerData.map(c => c.segment))];

  const handleCustomerSelect = useCallback((customer: CustomerData) => {
    setSelectedCustomer(customer);
    setShowCustomerDetails(true);
  }, []);

  const handleBack = useCallback(() => {
    setShowCustomerDetails(false);
  }, []);

  if (showCustomerDetails && selectedCustomer) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="customer-details"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-6 max-w-7xl mx-auto"
        >
          <CustomerDetails 
            customer={selectedCustomer}
            onBack={handleBack}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="dashboard"
        className="p-6 max-w-7xl mx-auto bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Churn Prediction Dashboard
              </h1>
              <div className="flex gap-2 bg-white p-2 rounded-lg shadow-md">
                {segments.map(segment => (
                  <button
                    key={segment}
                    onClick={() => setSelectedSegment(segment)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      selectedSegment === segment
                        ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                        : 'bg-white text-gray-600 hover:bg-indigo-50'
                    }`}
                  >
                    {segment}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Customers"
                value={filteredCustomers.length}
                trend="+5%"
                trendDirection="up"
                icon="users"
              />
              <StatCard
                title="Average Churn Rate"
                value={2.3}
                suffix="%"
                trend="-0.4%"
                trendDirection="down"
                icon="chart"
              />
              <StatCard
                title="High Risk Customers"
                value={filteredCustomers.filter(c => c.riskLevel === 'High').length}
                trend="+2"
                trendDirection="up"
                isNegative
                icon="alert"
              />
              <StatCard
                title="Retention Rate"
                value={97.7}
                suffix="%"
                trend="+0.4%"
                trendDirection="up"
                icon="shield"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg backdrop-blur-lg backdrop-filter"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Churn Rate & New Customers</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockChurnData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#6b7280" />
                    <YAxis yAxisId="left" stroke="#6b7280" />
                    <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="churnRate" 
                      stroke="#6366f1" 
                      name="Churn Rate %" 
                      strokeWidth={2}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="newCustomers" 
                      stroke="#10b981" 
                      name="New Customers" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg backdrop-blur-lg backdrop-filter"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Risk Distribution</h2>
              <RiskDistributionChart customerData={filteredCustomers} />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg backdrop-blur-lg backdrop-filter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-6 text-gray-800">At-Risk Customers</h2>
              <CustomerList 
                customers={filteredCustomers} 
                onSelectCustomer={handleCustomerSelect}
              />
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg backdrop-blur-lg backdrop-filter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-6 text-gray-800">AI-Powered Retention Strategies</h2>
              <RetentionStrategies 
                customerData={selectedCustomer || filteredCustomers[0]} 
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}