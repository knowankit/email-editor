import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';
import useEmailDataStore, { initialState } from '@/store/email';

interface StoreState {
  undoStack: MJMLNode[];
  redoStack: MJMLNode[];
}

interface MJMLNodeAttributes {
  [key: string]: string;
}

interface MJMLNode {
  templateName?: string;
  tagName: string;
  attributes: MJMLNodeAttributes;
  children: MJMLNode[];
  content?: string;
  id?: string;
}

interface StoreActions {
  pushToUndoStack: (data: MJMLNode) => void;
  pushToRedoStack: (data: MJMLNode) => void;
  popFromUndoStack: () => void;
  popFromRedoStack: () => void;
  resetStack: () => void
}

const useEmailHistoryStore = create<StoreState & StoreActions>()(
  devtools((set) => ({
    undoStack: [],
    redoStack: [],
    pushToUndoStack: (data) =>
      set(produce((draft) => {
        draft.undoStack.push(data);
      })),

    pushToRedoStack: (data) =>
      set(produce((draft) => {
        draft.redoStack.push(data);
      })),

    resetStack: () =>
      set(produce((draft) => {
        draft.redoStack = []
        draft.undoStack = []
      })),

    popFromUndoStack: () =>
      set(produce((draft) => {
        if (draft.undoStack.length > 0) {
          const poppedData = draft.undoStack.pop();

          if (poppedData) {
            draft.redoStack.push(poppedData);
          }

          const undoIndex = draft.undoStack.length - 1;
          const data = undoIndex === -1 ? initialState.emailData : draft.undoStack[undoIndex];

          useEmailDataStore.getState().setEmailData(data);
        }
      })),

    popFromRedoStack: () =>
      set(produce((draft) => {
        if (draft.redoStack.length > 0) {
          const poppedData = draft.redoStack.pop();

          if (poppedData) {
            draft.undoStack.push(poppedData);
            useEmailDataStore.getState().setEmailData(poppedData);
          }

          const redoIndex = draft.redoStack.length - 1;
          // const data = redoIndex === -1 ? initialState.emailData : draft.redoStack[redoIndex];

        }
      })),
  }), {
    name: 'email-history-store',
  })
);

export default useEmailHistoryStore;
