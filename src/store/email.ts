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
  updateContent: (content: string, keys: string) => void
  popTagElement: (path: string) => void
  resetEmailData: () => void;
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
      }))
    },

    resetEmailData: () =>
      set(
        produce((draft) => {
          draft.emailData = initialState.emailData;
          draft.activeNode = initialState.activeNode;
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
      }))
    },


    emailData: initialState.emailData,
    activeNode: initialState.activeNode,
  }), {
    name: 'email-store',
  })
);

export default useEmailDataStore;
