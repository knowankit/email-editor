import  { create }from 'zustand';
import type { Survey } from '@/types/survey.types'


// Define the types for store state
interface StoreState {
  surveys: Survey[];
}

// Define the types for store actions
interface StoreActions {
  setSurveys: (data: Survey[]) => void;
}

// Create store
const useSurveysStore = create<StoreState & StoreActions>((set) => ({
  surveys: [],
  setSurveys: (surveys) => set(() => ({ surveys })),
}));

export default useSurveysStore;
