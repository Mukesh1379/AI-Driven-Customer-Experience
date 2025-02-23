export interface PolicyRecommendation {
  id: string;
  name: string;
  type: string;
  coverage: number;
  monthlyPremium: number;
  confidenceScore: number;
  justification: string;
  features: string[];
}

export interface PolicyFilters {
  type: string | null;
  minCoverage: number | null;
  maxPremium: number | null;
}