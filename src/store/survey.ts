import  { create }from 'zustand';
import type { Survey } from '@/types/survey.types'

interface StoreState {
  activeSurvey: Survey;
  isDeleteDialogOpen: boolean
  isAddQuestionDrawerOpen: boolean
}

interface StoreActions {
  setActiveSurvey: (data: Survey) => void;
  setDeleteDialogVisibility: (value: boolean) => void;
  setAddQuestionDrawerVisibility: (value: boolean) => void;
}

const useActiveSurveyStore = create<StoreState & StoreActions>((set) => ({
  activeSurvey: { name: '', permalink: '',  id: '', created_at: new Date(), is_published: false, questions: [] },
  isDeleteDialogOpen: false,
  isAddQuestionDrawerOpen: false,
  setActiveSurvey: (survey) => set(() => ({ activeSurvey: survey })),
  setDeleteDialogVisibility: (value) => set(() => ({ isDeleteDialogOpen: value })),
  setAddQuestionDrawerVisibility: (value) => set(() => ({ isAddQuestionDrawerOpen: value })),
}));

export default useActiveSurveyStore;
