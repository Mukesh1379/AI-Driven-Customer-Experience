export interface CustomerData {
  id: string;
  name: string;
  email: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  churnProbability: number;
  reasons: string[];
  lastActive: string;
  premiumCost: number;
  claimHistory: number;
  complaints: number;
  segment: 'Basic' | 'Standard' | 'Premium';
}

export interface ChurnMetrics {
  date: string;
  churnRate: number;
  newCustomers: number;
}

export interface RetentionStrategy {
  id: string;
  type: 'discount' | 'loyalty_reward' | 'plan_adjustment';
  description: string;
  impact: number;
}