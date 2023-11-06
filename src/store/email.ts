import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

import { getDefaultTags } from "@/lib/util/get-default-tags";

interface StoreState {
  emailData: {
    tagName: string;
    attributes: any;
    children: any;
    templateId?: string;
  };
  activeNode: any | null;
  history: MJMLNode[]
  currentHistoryIndex: number
}

interface MJMLNodeAttributes {
  [key: string]: string;
}

interface MJMLNode {
  tagName: string;
  attributes: MJMLNodeAttributes;
  children: MJMLNode[];
  content?: string;
  id?: string;
}

interface ActiveNode {
  sectionIndex: number;
  path?: string;
  section: MJMLNode;
}

interface StoreActions {
  setEmailData: (data: MJMLNode) => void;
  setActiveNode: (data: ActiveNode | null) => void;
  pushTagElement: (tagType: string, keys: string) => void
  updateAttributes: (attributes: any, keys: string) => void
  updateActiveNodeAttributes: (key: string, attributes: any) => void
  updateContent: (content: string, keys: string) => void
  popTagElement: (path: string) => void
  resetEmailData: () => void;
  undoEmail: () => void;
  redoEmail: () => void;

}

export const initialState = {
  emailData: {
    tagName: 'mj-body',
    attributes: {},
    children: [],
  },
  activeNode: null,
};

const useEmailDataStore = create<StoreState & StoreActions>()(
  devtools((set) => ({
    setEmailData: (html) =>
      set(
        produce((draft) => {
          draft.emailData = html;
        })
      ),

    setActiveNode: (node) =>
      set(
        produce((draft) => {
          draft.activeNode = node;
        })
      ),

    pushTagElement: (tagType: string, keys: string) => {
        set(produce((draft) => {
          let currentArray = draft.emailData;
          const keysArray = keys.split(".");

          for (let i = 0; i < keysArray.length; i++) {
            currentArray = currentArray[keysArray[i]];
          }

        if (Array.isArray(currentArray)) {
          currentArray.push(getDefaultTags(tagType));
        }

        draft.history.push(draft.emailData)
        draft.currentHistoryIndex++
      }));
    },

    popTagElement: (path: string) => {
      set(produce((draft) => {
        let currentArray = draft.emailData;

        const index = parseInt(path.slice(-1));
        const keysArray = path.split(".");

        for (let i = 0; i < keysArray.length - 1; i++) {
          currentArray = currentArray[keysArray[i]];
        }

        if (Array.isArray(currentArray)) {
          currentArray.splice(index, 1);
        }

        draft.history.push(draft.emailData)
        draft.currentHistoryIndex++
      }));
    },

    updateAttributes: (newAttributes: any, keys: string) => {
      set(produce((draft) => {
        let currentObj = draft.emailData;
        const keysArray = keys.split(".");

        for (let i = 0; i < keysArray.length; i++) {
          currentObj = currentObj[keysArray[i]];
        }

        currentObj.attributes = newAttributes

        draft.history.push(draft.emailData)
        draft.currentHistoryIndex++
      }))
    },

    updateActiveNodeAttributes: (key: string, newAttributes: any) => {
      set(produce((draft) => {
        draft.activeNode['section'][key] = newAttributes
      }))
    },

    resetEmailData: () =>
      set(
        produce((draft) => {
          draft.emailData = initialState.emailData;
          draft.activeNode = initialState.activeNode;
          draft.history = []
        })
    ),

    updateContent: (newContent: string, keys: string) => {
      set(produce((draft) => {
        let currentObj = draft.emailData;
        const keysArray = keys.split(".");

        for (let i = 0; i < keysArray.length; i++) {
          currentObj = currentObj[keysArray[i]];
        }

        currentObj.content = newContent

        draft.history.push(draft.emailData)
        draft.currentHistoryIndex++
      }))
    },

    undoEmail: () => {
      set(produce((draft) => {
        const index = draft.currentHistoryIndex - 1
        const data = index >= 0 ? draft.history[index] : initialState.emailData
        draft.emailData = data

        draft.currentHistoryIndex--
        draft.activeNode = null
      }))
    },

    redoEmail: () => {
      set(produce((draft) => {
        const index = draft.currentHistoryIndex + 1
        const data = index >= draft.history.length ?   draft.history[draft.history.length - 1] : draft.history[index]
        draft.emailData = data

        draft.currentHistoryIndex++
        draft.activeNode = null
      }))
    },

    emailData: initialState.emailData,
    activeNode: initialState.activeNode,
    history: [],
    currentHistoryIndex: -1
  }), {
    name: 'email-store',
  })
);

export default useEmailDataStore;
