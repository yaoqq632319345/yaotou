import type { Module } from 'vuex';
import type { ComponentData, EditorProps, GlobalDataProps } from '@/stroeTypes';
import { testComponents } from '@/storeDatas';
import { v4 as uuidv4 } from 'uuid';

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: '',
  },
  mutations: {
    addComponent(state, props) {
      const newComponent: ComponentData = {
        id: uuidv4(),
        name: 'l-text',
        props,
      };
      state.components.push(newComponent);
    },
  },
};

export default editor;
