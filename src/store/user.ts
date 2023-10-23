import  { create }from 'zustand';
import type { User } from '@/types/user.types'


// Define the types for store state
interface StoreState {
  currentUser: User | null;
}

// Define the types for store actions
interface StoreActions {
  setCurrentUser: (data: User) => void;
}

// Create store
const useUserStore = create<StoreState & StoreActions>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set(() => ({ currentUser: user })),
}));

export default useUserStore
