import { create } from 'zustand';

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

const useTemplatesStore = create<StoreState & StoreActions>((set) => ({
  templates: [],
  createNewTemplate: (template) =>
    set((state) => ({
      templates: [...state.templates, template],
    })),
  deleteTemplate: (index) =>
    set((state) => ({
      templates: [...state.templates.slice(index , 1)],
    })),
}));

export default useTemplatesStore;
