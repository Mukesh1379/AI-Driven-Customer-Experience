export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  behavior: BehaviorData;
  persona: PersonaData;
}

export interface BehaviorData {
  lastActive: string;
  pageViews: number;
  timeOnSite: number;
  interactions: string[];
  history: HistoryData[];
}

export interface HistoryData {
  date: string;
  views: number;
  duration: number;
}

export interface PersonaData {
  type: string;
  interests: string[];
  preferences: Record<string, string>;
  lastUpdated: string;
}