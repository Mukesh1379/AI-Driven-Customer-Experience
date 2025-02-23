export interface FraudClaim {
  id: string;
  claimAmount: number;
  location: string;
  timestamp: Date;
  riskScore: number;
  status: 'pending' | 'approved' | 'flagged' | 'rejected';
  explanation?: string[];
}

export interface FraudStats {
  totalClaims: number;
  fraudulentClaims: number;
  averageRiskScore: number;
  hotspots: { location: string; count: number }[];
}