import { create } from 'zustand';
import { CustomerProfile } from '../types/customer';

interface CustomerState {
  profiles: CustomerProfile[];
  selectedProfile: CustomerProfile | null;
  loading: boolean;
  setProfiles: (profiles: CustomerProfile[]) => void;
  setSelectedProfile: (profile: CustomerProfile | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  profiles: [],
  selectedProfile: null,
  loading: false,
  setProfiles: (profiles) => set({ profiles }),
  setSelectedProfile: (profile) => set({ selectedProfile: profile }),
  setLoading: (loading) => set({ loading }),
}));