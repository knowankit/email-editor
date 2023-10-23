import  { create }from 'zustand';
import { devtools, persist } from 'zustand/middleware'

// Define the types for store state
interface StoreState {
  isSidebarOpen: boolean;
}

// Define the types for store actions
interface StoreActions {
  setSidebarStatus: (data: boolean) => void;
}

const useSidebarStore = create<StoreState & StoreActions>()(
  devtools(
    persist(
      (set) => ({
        isSidebarOpen: true,
        setSidebarStatus: (value) => set(() => ({ isSidebarOpen: value })),
      }),
      {
        name: 'sidebar-store',
      }
    )
  )
)

export default useSidebarStore;
