'use client';

import React from 'react';
import { CustomerData } from '../types/churn';
import { motion } from 'framer-motion';
import {
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/solid';
import RetentionStrategies from './RetentionStrategies';

interface Props {
  customer: CustomerData;
  onBack: () => void;
}

export default function CustomerDetails({ customer, onBack }: Props) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSegmentBadge = (segment: string) => {
    switch (segment) {
      case 'Premium':
        return 'bg-purple-100 text-purple-800';
      case 'Standard':
        return 'bg-blue-100 text-blue-800';
      case 'Basic':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-start space-x-4">
            <UserCircleIcon className="h-16 w-16 text-gray-400" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
              <div className="flex space-x-2 mt-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(customer.riskLevel)}`}>
                  {customer.riskLevel} Risk
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${getSegmentBadge(customer.segment)}`}>
                  {customer.segment}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 flex items-center">
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                Contact Information
              </h3>
              <p className="mt-2 text-gray-900">{customer.email}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 flex items-center">
                <ClockIcon className="h-4 w-4 mr-2" />
                Last Active
              </h3>
              <p className="mt-2 text-gray-900">{customer.lastActive}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 flex items-center">
                <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                Premium Cost
              </h3>
              <p className="mt-2 text-gray-900">${customer.premiumCost}/month</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 flex items-center">
                <DocumentTextIcon className="h-4 w-4 mr-2" />
                Claims History
              </h3>
              <p className="mt-2 text-gray-900">{customer.claimHistory} claims</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 flex items-center">
              <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
              Risk Factors
            </h3>
            <div className="mt-2 space-y-2">
              {customer.reasons.length > 0 ? (
                customer.reasons.map((reason, index) => (
                  <div
                    key={index}
                    className="bg-white px-3 py-2 rounded-md text-sm text-gray-800"
                  >
                    {reason}
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No significant risk factors identified</p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Recommended Retention Strategies
          </h2>
          <RetentionStrategies customerData={customer} />
        </div>
      </div>
    </motion.div>
  );
}