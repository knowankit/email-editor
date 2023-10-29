import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware'

interface StoreState {
  undoStack: MJMLNode[];
  redoStack: MJMLNode[];
}

interface MJMLNodeAttributes {
  [key: string]: string;
}

interface MJMLNode {
  templateName: string
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

const useEmailHistoryStore = create<StoreState & StoreActions>()(devtools(persist((set) => ({
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
        const poppedData = state.undoStack.pop();
        return { undoStack: state.undoStack, poppedData };
      }

      return { undoStack: state.undoStack, poppedData: null };
    }),
  popFromRedoStack: () =>
    set((state) => {
      if (state.undoStack.length > 0) {
        const poppedData = state.undoStack.pop();
        return { undoStack: state.undoStack, poppedData };
      }

      return { undoStack: state.undoStack, poppedData: null };
    }),
}), {
    name: 'email-history-store',
})));

export default useEmailHistoryStore;
