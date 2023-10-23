import  { create }from 'zustand';
import { Response } from '@/types/response.types'

interface StoreState {
  responses: Response[]
}

interface StoreActions {
  setResponses: (data: Response[]) => void;
}

const useResponsesStore = create<StoreState & StoreActions>((set) => ({
  responses: [],
  setResponses: (responses) => set(() => ({ responses })),
}));

export default useResponsesStore;
