'use client';

import { useEffect, useState } from 'react';
import { PolicyRecommendation } from '@/app/types/policy';
import { CheckCircleIcon, ShieldCheckIcon, CurrencyDollarIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function PolicyDetails({ params }: { params: { id: string } }) {
  const [policy, setPolicy] = useState<PolicyRecommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchPolicy() {
      try {
        const response = await fetch('/api/recommend_policy');
        const policies = await response.json();
        const foundPolicy = policies.find((p: PolicyRecommendation) => p.id === params.id);
        setPolicy(foundPolicy || null);
      } catch (error) {
        console.error('Error fetching policy:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPolicy();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Policy Not Found</h2>
          <p className="mt-2 text-gray-600">The requested policy could not be found.</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => router.push('/')}
          className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Policies
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">{policy.name}</h1>
                <span className="inline-block px-3 py-1 text-sm font-medium rounded-full capitalize"
                  style={{
                    backgroundColor: policy.type === 'health' ? '#E8F5E9' :
                      policy.type === 'life' ? '#E3F2FD' : '#FFF3E0',
                    color: policy.type === 'health' ? '#2E7D32' :
                      policy.type === 'life' ? '#1565C0' : '#E65100'
                  }}>
                  {policy.type}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center text-gray-700">
                  <ShieldCheckIcon className="h-6 w-6 mr-3 text-indigo-500" />
                  <div>
                    <p className="font-medium">Coverage Amount</p>
                    <p className="text-2xl font-bold">${policy.coverage.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <CurrencyDollarIcon className="h-6 w-6 mr-3 text-green-500" />
                  <div>
                    <p className="font-medium">Monthly Premium</p>
                    <p className="text-2xl font-bold">${policy.monthlyPremium.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Annual Cost: ${(policy.monthlyPremium * 12).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900">Policy Features</h2>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {policy.features.map((feature, index) => (
                    <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:border-l lg:pl-8">
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Recommendation</h2>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4"
                    style={{
                      backgroundColor: policy.confidenceScore >= 80 ? '#E8F5E9' :
                        policy.confidenceScore >= 60 ? '#FFF3E0' : '#FFEBEE'
                    }}>
                    <span className="text-lg font-bold"
                      style={{
                        color: policy.confidenceScore >= 80 ? '#2E7D32' :
                          policy.confidenceScore >= 60 ? '#E65100' : '#C62828'
                      }}>
                      {policy.confidenceScore}%
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Confidence Score</p>
                    <p className="text-gray-600">Our AI recommends this policy based on your profile</p>
                  </div>
                </div>
                <p className="text-gray-700">{policy.justification}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Apply Now</h2>
                <p className="text-gray-600">
                  Ready to secure your future? Complete your application in just a few minutes.
                </p>
                <button
                  onClick={() => {/* Handle application process */}}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                >
                  Start Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}