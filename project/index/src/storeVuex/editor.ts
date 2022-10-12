import type { Module } from 'vuex';
import type { EditorProps, GlobalDataProps } from '@/stroeTypes';
import { testComponents } from '@/storeDatas';

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: '',
  },
};

export default editor;
