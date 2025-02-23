import { NextResponse } from 'next/server';
import type { PolicyRecommendation } from '@/app/types/policy';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const policyId = searchParams.get('id');

  // Fetch all policies (in a real app, this would come from a database)
  const response = await fetch(`${request.headers.get('origin')}/api/recommend_policy`);
  const policies: PolicyRecommendation[] = await response.json();

  // Get the selected policy
  const selectedPolicy = policies.find(p => p.id === policyId);
  
  if (!selectedPolicy) {
    return NextResponse.json({ error: 'Policy not found' }, { status: 404 });
  }

  // Find similar policies for comparison
  const similarPolicies = policies
    .filter(p => p.id !== policyId && p.type === selectedPolicy.type)
    .sort((a, b) => {
      // Sort by similarity in coverage and premium
      const aCoverageDiff = Math.abs(a.coverage - selectedPolicy.coverage);
      const bCoverageDiff = Math.abs(b.coverage - selectedPolicy.coverage);
      const aPremiumDiff = Math.abs(a.monthlyPremium - selectedPolicy.monthlyPremium);
      const bPremiumDiff = Math.abs(b.monthlyPremium - selectedPolicy.monthlyPremium);
      
      return (aCoverageDiff + aPremiumDiff) - (bCoverageDiff + bPremiumDiff);
    })
    .slice(0, 2); // Get top 2 similar policies

  return NextResponse.json({
    selectedPolicy,
    similarPolicies
  });
}