'use client';

import { Dialog } from '@headlessui/react';
import { XMarkIcon, CheckCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline';
import { PolicyRecommendation } from '../types/policy';
import { useState } from 'react';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPolicy: PolicyRecommendation | null;
  similarPolicies: PolicyRecommendation[];
}

export default function ComparisonModal({
  isOpen,
  onClose,
  selectedPolicy,
  similarPolicies
}: ComparisonModalProps) {
  const [selectedTab, setSelectedTab] = useState<'features' | 'coverage' | 'cost'>('features');

  if (!selectedPolicy) return null;

  const allPolicies = [selectedPolicy, ...similarPolicies];

  const renderComparisonContent = () => {
    switch (selectedTab) {
      case 'features':
        return (
          <div className="mt-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-2 text-gray-900">Feature</th>
                  {allPolicies.map(policy => (
                    <th key={policy.id} className="text-center py-2 text-gray-900">{policy.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedPolicy.features.map((feature, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-2 text-gray-700">{feature}</td>
                    {allPolicies.map(policy => (
                      <td key={policy.id} className="text-center py-2">
                        {policy.features.includes(feature) ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500 inline" />
                        ) : (
                          <MinusCircleIcon className="h-5 w-5 text-red-500 inline" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'coverage':
        return (
          <div className="mt-4">
            <div className="space-y-4">
              {allPolicies.map(policy => (
                <div key={policy.id} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900">{policy.name}</h4>
                  <div className="mt-2">
                    <div className="flex justify-between items-center text-gray-700">
                      <span>Coverage Amount:</span>
                      <span className="font-medium">${policy.coverage.toLocaleString()}</span>
                    </div>
                    <div className="relative pt-2">
                      <div className="h-2 bg-gray-200 rounded">
                        <div
                          className="h-2 bg-indigo-600 rounded"
                          style={{
                            width: `${(policy.coverage / Math.max(...allPolicies.map(p => p.coverage))) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cost':
        return (
          <div className="mt-4">
            <div className="space-y-4">
              {allPolicies.map(policy => (
                <div key={policy.id} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900">{policy.name}</h4>
                  <div className="mt-2">
                    <div className="flex justify-between items-center text-gray-700">
                      <span>Monthly Premium:</span>
                      <span className="font-medium">${policy.monthlyPremium.toLocaleString()}</span>
                    </div>
                    <div className="relative pt-2">
                      <div className="h-2 bg-gray-200 rounded">
                        <div
                          className="h-2 bg-green-600 rounded"
                          style={{
                            width: `${(policy.monthlyPremium / Math.max(...allPolicies.map(p => p.monthlyPremium))) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      Annual Cost: ${(policy.monthlyPremium * 12).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6">
          <div className="flex justify-between items-start">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Policy Comparison
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'features', name: 'Features' },
                  { id: 'coverage', name: 'Coverage' },
                  { id: 'cost', name: 'Cost Analysis' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as any)}
                    className={`
                      border-b-2 py-4 px-1 text-sm font-medium
                      ${selectedTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                    `}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {renderComparisonContent()}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}