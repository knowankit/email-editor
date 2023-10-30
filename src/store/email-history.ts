import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import useEmailDataStore, { initialState } from '@/store/email';

interface StoreState {
  undoStack: MJMLNode[];
  redoStack: MJMLNode[];
}

interface MJMLNodeAttributes {
  [key: string]: string;
}

interface MJMLNode {
  templateName?: string
  tagName: string;
  attributes: MJMLNodeAttributes;
  children: MJMLNode[];
  content?: string;
  id?: string;
}

interface StoreActions {
  pushToUndoStack: (data: MJMLNode) => void;
  pushToRedoStack: (data: MJMLNode) => void;
  popFromUndoStack: () => any;
  popFromRedoStack: () => any
}

const useEmailHistoryStore = create<StoreState & StoreActions>()(devtools((set) => ({
  undoStack: [],
  redoStack: [],
  pushToUndoStack: (data) =>
    set((state) => ({
      undoStack: [...state.undoStack, data],
    })),

  pushToRedoStack: (data) =>
    set((state) => ({
      redoStack: [...state.redoStack, data],
    })),

  popFromUndoStack: () =>
    set((state) => {
      if (state.undoStack.length > 0) {
        const poppedData = state.undoStack.pop()

        if (poppedData) {
          state.redoStack.push(poppedData)
        }

        const undoIndex = state.undoStack.length - 1
        const data = undoIndex === - 1 ? initialState.emailData : state.undoStack[undoIndex]

        useEmailDataStore.getState().setEmailData(data)

        return {
          undoStack: [...state.undoStack],
          redoStack: [...state.redoStack],
        }
      }

      return { undoStack: state.undoStack, redoStack: state.redoStack };

    }),

  popFromRedoStack: () =>
    set((state) => {
      if (state.redoStack.length > 0) {
        const poppedData = state.redoStack.pop();


        if (poppedData) {
          state.undoStack.push(poppedData)
        }

        const redoIndex = state.redoStack.length - 1
        const data = redoIndex === - 1 ? initialState.emailData : state.undoStack[redoIndex]

        useEmailDataStore.getState().setEmailData(data)

        return {
          undoStack: [...state.undoStack],
          redoStack: [...state.redoStack],
        }
      }

      return { redoStack: state.redoStack, undoStack: state.undoStack  };
    }),
}), {
    name: 'email-history-store',
}));

export default useEmailHistoryStore;
