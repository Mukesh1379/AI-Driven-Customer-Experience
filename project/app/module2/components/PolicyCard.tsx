'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PolicyRecommendation } from '../types/policy';
import { CheckCircleIcon, ShieldCheckIcon, CurrencyDollarIcon, DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';
import ComparisonModal from './ComparisonModal';

interface PolicyCardProps {
  policy: PolicyRecommendation;
  onSelect: (policy: PolicyRecommendation) => void;
}

export default function PolicyCard({ policy, onSelect }: PolicyCardProps) {
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [similarPolicies, setSimilarPolicies] = useState<PolicyRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCompareClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/compare_policies?id=${policy.id}`);
      if (!response.ok) throw new Error('Failed to fetch comparison data');
      const data = await response.json();
      setSimilarPolicies(data.similarPolicies);
      setIsComparisonModalOpen(true);
    } catch (error) {
      console.error('Error fetching comparison data:', error);
      alert('Failed to load comparison data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{policy.name}</h3>
            <span className="inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full capitalize" 
              style={{
                backgroundColor: policy.type === 'health' ? '#E8F5E9' : 
                              policy.type === 'life' ? '#E3F2FD' : '#FFF3E0',
                color: policy.type === 'health' ? '#2E7D32' :
                       policy.type === 'life' ? '#1565C0' : '#E65100'
              }}>
              {policy.type}
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: policy.confidenceScore >= 80 ? '#E8F5E9' :
                              policy.confidenceScore >= 60 ? '#FFF3E0' : '#FFEBEE'
              }}>
              <span className="text-sm font-bold"
                style={{
                  color: policy.confidenceScore >= 80 ? '#2E7D32' :
                         policy.confidenceScore >= 60 ? '#E65100' : '#C62828'
                }}>
                {policy.confidenceScore}%
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <ShieldCheckIcon className="h-5 w-5 mr-2 text-indigo-500" />
            <span>Coverage: ₹{policy.coverage.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CurrencyDollarIcon className="h-5 w-5 mr-2 text-green-500" />
            <span>Monthly Premium: ₹{policy.monthlyPremium.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <h4 className="font-medium text-gray-900">Key Features:</h4>
          <ul className="space-y-1">
            {policy.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <CheckCircleIcon className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 mb-4">{policy.justification}</p>
          <div className="space-y-2">
            <button
              onClick={() => router.push(`/policy/${policy.id}`)}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
            >
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              View Full Details & Select
            </button>
            <button
              onClick={handleCompareClick}
              disabled={isLoading}
              className="w-full bg-white border border-indigo-600 text-gray-900 py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600 mr-2" />
              ) : (
                <ClockIcon className="h-5 w-5 mr-2" />
              )}
              Compare & Calculate
            </button>
          </div>
        </div>
      </div>

      <ComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        selectedPolicy={policy}
        similarPolicies={similarPolicies}
      />
    </>
  );
}