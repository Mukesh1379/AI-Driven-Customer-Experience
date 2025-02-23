'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PolicyRecommendation, PolicyFilters } from '../types/policy';
import { ChevronUpIcon, ChevronDownIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

async function fetchPolicyRecommendations(): Promise<PolicyRecommendation[]> {
  const response = await fetch('/api/recommend_policy');
  if (!response.ok) {
    throw new Error('Failed to fetch policy recommendations');
  }
  return response.json();
}

export default function PolicyTable() {
  const [filters, setFilters] = useState<PolicyFilters>({
    type: null,
    minCoverage: null,
    maxPremium: null,
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof PolicyRecommendation;
    direction: 'asc' | 'desc';
  } | null>(null);

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

  const sortedPolicies = [...filteredPolicies].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return sortConfig.direction === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const handleSort = (key: keyof PolicyRecommendation) => {
    setSortConfig((currentSort) => ({
      key,
      direction:
        currentSort?.key === key && currentSort.direction === 'asc'
          ? 'desc'
          : 'asc',
    }));
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading recommendations...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-8">Error loading recommendations</div>;
  }

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">AI Policy Recommendations</h2>
        
        {/* Filters */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <select
            className="rounded-md border border-gray-300 p-2"
            onChange={(e) => setFilters({ ...filters, type: e.target.value || null })}
          >
            <option value="">All Types</option>
            <option value="health">Health</option>
            <option value="life">Life</option>
            <option value="property">Property</option>
          </select>
          
          <input
            type="number"
            placeholder="Min Coverage"
            className="rounded-md border border-gray-300 p-2"
            onChange={(e) => setFilters({ ...filters, minCoverage: e.target.value ? Number(e.target.value) : null })}
          />
          
          <input
            type="number"
            placeholder="Max Premium"
            className="rounded-md border border-gray-300 p-2"
            onChange={(e) => setFilters({ ...filters, maxPremium: e.target.value ? Number(e.target.value) : null })}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['name', 'type', 'coverage', 'monthlyPremium', 'confidenceScore'].map((key) => (
                  <th
                    key={key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(key as keyof PolicyRecommendation)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      {sortConfig?.key === key && (
                        sortConfig.direction === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedPolicies.map((policy) => (
                <tr key={policy.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{policy.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{policy.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{policy.coverage.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{policy.monthlyPremium.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={clsx(
                          "h-2.5 rounded-full w-full mr-2",
                          policy.confidenceScore >= 80 ? "bg-green-500" :
                          policy.confidenceScore >= 60 ? "bg-yellow-500" :
                          "bg-red-500"
                        )}
                        style={{ width: `${policy.confidenceScore}%` }}
                      />
                      <span>{policy.confidenceScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      title={policy.justification}
                    >
                      <InformationCircleIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}