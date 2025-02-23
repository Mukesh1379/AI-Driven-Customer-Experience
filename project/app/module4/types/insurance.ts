export interface LifeEvent {
  type: 'marriage' | 'parenthood' | 'retirement' | 'newJob';
  probability: number;
  predictedDate: Date;
  financialImpact: number;
}

export interface PolicyAdjustment {
  eventType: LifeEvent['type'];
  currentCoverage: number;
  recommendedCoverage: number;
  premiumChange: number;
  benefits: string[];
}

export interface UserProfile {
  name: string;
  age: number;
  currentPolicy: string;
  monthlyPremium: number;
  coverageAmount: number;
}