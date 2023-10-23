import  { create } from 'zustand';
import { devtools } from 'zustand/middleware'

interface StoreState {
  emailData: {
    tagName: string,
    attributes: any,
    children: any
  },
  activeNode: any | null
}

interface MJMLNodeAttributes {
  [key: string]: string;
}

interface MJMLNode {
  tagName: string;
  attributes: MJMLNodeAttributes;
  children: MJMLNode[];
  content?: string
  id?: string
}

interface ActiveNode {
  sectionIndex: number
  path?:string
  section: MJMLNode
}
interface StoreActions {
  setEmailData: (data: MJMLNode) => void;
  setActiveNode: (data: ActiveNode | null) => void;
}

const initialState = {
  emailData: {
    tagName: 'mj-body',
    attributes: {},
    children: []
  },
  activeNode: null
};

const useEmailDataStore = create<StoreState & StoreActions>()(
  devtools(
      (set) => ({
        setEmailData: (html) => set(() => ({ emailData: html })),
        setActiveNode: (node) => set(() => ({ activeNode: node  })),
        emailData: initialState.emailData,
        activeNode: initialState.activeNode
      }),
      {
        name: 'email-store',
      }
  )
)

export default useEmailDataStore;
