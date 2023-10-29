import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware'
interface StoreState {
  templates: MJMLNode[];
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
  createNewTemplate: (data: MJMLNode) => void;
  deleteTemplate: (index: number) => void;
}

const useTemplatesStore = create<StoreState & StoreActions>()(devtools(persist((set) => ({
  templates: [],
  createNewTemplate: (template) =>
    set((state) => ({
      templates: [...state.templates, template],
    })),
  deleteTemplate: (indexToRemove) =>
    set((state) => ({
      templates: [...state.templates.filter((_,index) => index !== indexToRemove)],
    }),
)}), {
    name: 'templates-store',
})));

export default useTemplatesStore;
