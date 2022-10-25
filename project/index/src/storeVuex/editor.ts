import type { Module } from 'vuex';
import type { ComponentData, EditorProps, GlobalDataProps } from '@/stroeTypes';
import { testComponents } from '@/storeDatas';
import { v4 as uuidv4 } from 'uuid';
import type { TextComponentProps } from '@/defaultProps';

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: '',
  },
  mutations: {
    addComponent(state, props: Partial<TextComponentProps>) {
      const newComponent: ComponentData = {
        id: uuidv4(),
        name: 'l-text',
        props,
      };
      state.components.push(newComponent);
    },
    setActive(state, currentId: string) {
      state.currentElement = currentId;
    },
    updateComponent(state, { key, value }) {
      const updatedComponent = state.components.find(
        (component) => component.id === state.currentElement
      );
      if (updatedComponent) {
        updatedComponent.props[key as keyof TextComponentProps] = value;
      }
    },
  },
  getters: {
    getCurrentElement: (state) =>
      state.components.find(
        (component) => component.id === state.currentElement
      ),
  },
};

export default editor;
