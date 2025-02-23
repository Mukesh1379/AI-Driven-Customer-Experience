'use client';

import React, { useCallback, useState } from 'react';
import { CustomerData } from '../types/churn';
import { CheckCircleIcon, SparklesIcon, ChartBarIcon, CurrencyDollarIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  customerData: CustomerData;
}

interface Strategy {
  title: string;
  description: string;
  impact: string;
  action: string;
  icon: any;
  priority: 'High' | 'Medium' | 'Low';
  expectedImpact: string;
  details: string[];
  implementationSteps: string[];
}

export default function RetentionStrategies({ customerData }: Props) {
  const [activeStrategy, setActiveStrategy] = useState<Strategy | null>(null);
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
  const [implementedStrategies, setImplementedStrategies] = useState<Set<string>>(new Set());

  const getStrategies = useCallback((customer: CustomerData): Strategy[] => {
    const strategies = [];

    if (customer.riskLevel === 'High') {
      strategies.push({
        title: 'Premium Discount Offer',
        description: `Offer a ${customer.segment === 'Premium' ? '20%' : '15%'} discount on the next 6 months`,
        impact: 'High probability of retention',
        action: 'Send Offer',
        icon: CurrencyDollarIcon,
        priority: 'High',
        expectedImpact: '85% retention chance',
        details: [
          'Personalized discount based on customer segment',
          'Limited-time offer to create urgency',
          'Includes premium features access',
          'No commitment required after promotional period'
        ],
        implementationSteps: [
          'Generate personalized offer code',
          'Send email notification',
          'Update billing system',
          'Schedule follow-up communication'
        ]
      });
    }

    if (customer.complaints > 1) {
      strategies.push({
        title: 'Priority Support Access',
        description: 'Provide VIP support access for 3 months',
        impact: 'Medium probability of retention',
        action: 'Activate VIP Support',
        icon: SparklesIcon,
        priority: 'Medium',
        expectedImpact: '65% retention chance',
        details: [
          '24/7 dedicated support line',
          'Priority ticket handling',
          'Personal account manager',
          'Monthly service review'
        ],
        implementationSteps: [
          'Assign dedicated support agent',
          'Update support tier',
          'Send welcome package',
          'Schedule initial consultation'
        ]
      });
    }

    if (customer.segment === 'Premium' || customer.segment === 'Standard') {
      strategies.push({
        title: 'Loyalty Rewards Program',
        description: 'Enroll in our premium loyalty program with exclusive benefits',
        impact: 'Medium probability of retention',
        action: 'Enroll Now',
        icon: CheckCircleIcon,
        priority: 'Medium',
        expectedImpact: '70% retention chance',
        details: [
          'Exclusive member benefits',
          'Points accumulation system',
          'Special event invitations',
          'Early access to new features'
        ],
        implementationSteps: [
          'Create loyalty account',
          'Award welcome points',
          'Send welcome kit',
          'Schedule orientation call'
        ]
      });
    }

    strategies.push({
      title: 'Personalized Policy Review',
      description: 'Schedule a free policy review with our insurance experts',
      impact: 'Medium probability of retention',
      action: 'Schedule Review',
      icon: ChartBarIcon,
      priority: 'Low',
      expectedImpact: '55% retention chance',
      details: [
        'Comprehensive policy analysis',
        'Cost-saving recommendations',
        'Coverage optimization',
        'Risk assessment review'
      ],
      implementationSteps: [
        'Assign review specialist',
        'Gather policy documents',
        'Schedule consultation',
        'Prepare recommendations'
      ]
    });

    return strategies;
  }, []);

  const handleActionClick = useCallback(async (strategy: Strategy) => {
    if (implementedStrategies.has(strategy.title)) {
      return;
    }

    setIsLoading(prev => ({ ...prev, [strategy.title]: true }));
    setActiveStrategy(strategy);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setImplementedStrategies(prev => new Set([...prev, strategy.title]));
    setIsLoading(prev => ({ ...prev, [strategy.title]: false }));
  }, [implementedStrategies]);

  const strategies = getStrategies(customerData);

  return (
    <AnimatePresence>
      <div className="space-y-4">
        {strategies.map((strategy, index) => (
          <motion.div
            key={index}
            className="border rounded-lg p-4 hover:shadow-xl transition-all duration-300 bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold flex items-center">
                    <strategy.icon className="h-5 w-5 text-indigo-500 mr-2" />
                    {strategy.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    strategy.priority === 'High' 
                      ? 'bg-red-100 text-red-800' 
                      : strategy.priority === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {strategy.priority} Priority
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{strategy.description}</p>
                
                {activeStrategy?.title === strategy.title && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4"
                  >
                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">Strategy Details</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {strategy.details.map((detail, idx) => (
                            <li key={idx} className="text-sm text-gray-600">{detail}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">Implementation Steps</h4>
                        <ul className="list-decimal list-inside space-y-1">
                          {strategy.implementationSteps.map((step, idx) => (
                            <li key={idx} className="text-sm text-gray-600">{step}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm text-gray-500">Expected Impact: {strategy.expectedImpact}</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setActiveStrategy(activeStrategy?.title === strategy.title ? null : strategy)}
                      className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center"
                    >
                      {activeStrategy?.title === strategy.title ? 'Hide Details' : 'View Details'}
                    </button>
                    <button 
                      onClick={() => handleActionClick(strategy)}
                      disabled={implementedStrategies.has(strategy.title)}
                      className={`px-4 py-2 rounded-md text-sm flex items-center gap-2 ${
                        implementedStrategies.has(strategy.title)
                          ? 'bg-green-100 text-green-700 cursor-not-allowed'
                          : 'bg-indigo-500 text-white hover:bg-indigo-600'
                      } transition-colors`}
                    >
                      {isLoading[strategy.title] ? (
                        <ArrowPathIcon className="h-4 w-4 animate-spin" />
                      ) : implementedStrategies.has(strategy.title) ? (
                        <CheckCircleIcon className="h-4 w-4" />
                      ) : null}
                      {implementedStrategies.has(strategy.title) ? 'Implemented' : strategy.action}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}