'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PolicyRecommendation, PolicyFilters } from '../types/policy';
import PolicyCard from './PolicyCard';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';

async function fetchPolicyRecommendations(): Promise<PolicyRecommendation[]> {
  const response = await fetch('/api/recommend_policy');
  if (!response.ok) {
    throw new Error('Failed to fetch policy recommendations');
  }
  return response.json();
}

export default function Dashboard() {
  const [filters, setFilters] = useState<PolicyFilters>({
    type: null,
    minCoverage: null,
    maxPremium: null,
  });
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyRecommendation | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { data: policies = [], isLoading, error } = useQuery({
    queryKey: ['policyRecommendations'],
    queryFn: fetchPolicyRecommendations,
  });

  const filteredPolicies = policies.filter((policy) => {
    if (filters.type && policy.type !== filters.type) return false;
    if (filters.minCoverage && policy.coverage < filters.minCoverage) return false;
    if (filters.maxPremium && policy.monthlyPremium > filters.maxPremium) return false;
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-800 rounded-lg p-4">
          <p className="font-medium">Error loading recommendations</p>
          <p className="text-sm mt-1">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Recommended Policies</h2>
          <p className="mt-2 text-gray-600">AI-powered recommendations based on your profile</p>
        </div>
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-900 hover:bg-gray-50"
        >
          <FunnelIcon className="h-5 w-5 mr-2 text-gray-400" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPolicies.map((policy) => (
          <PolicyCard
            key={policy.id}
            policy={policy}
            onSelect={setSelectedPolicy}
          />
        ))}
      </div>

      {/* Filter Modal */}
      <Dialog
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-900">Filter Policies</Dialog.Title>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Policy Type
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 p-2 text-gray-900"
                  value={filters.type || ''}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value || null })}
                >
                  <option value="">All Types</option>
                  <option value="health">Health</option>
                  <option value="life">Life</option>
                  <option value="property">Property</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Coverage
                </label>
                <input
                  type="number"
                  className="w-full rounded-md border border-gray-300 p-2 text-gray-900"
                  placeholder="Enter amount"
                  value={filters.minCoverage || ''}
                  onChange={(e) => setFilters({ ...filters, minCoverage: e.target.value ? Number(e.target.value) : null })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Monthly Premium
                </label>
                <input
                  type="number"
                  className="w-full rounded-md border border-gray-300 p-2 text-gray-900"
                  placeholder="Enter amount"
                  value={filters.maxPremium || ''}
                  onChange={(e) => setFilters({ ...filters, maxPremium: e.target.value ? Number(e.target.value) : null })}
                />
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setFilters({ type: null, minCoverage: null, maxPremium: null });
                  setIsFilterModalOpen(false);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Reset
              </button>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
              >
                Apply Filters
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}