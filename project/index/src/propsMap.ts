import type { TextComponentProps } from './defaultProps';
export interface PropToForm {
  component: string;
  value?: string;
}
export type PropsToForms = {
  [P in keyof TextComponentProps]?: PropToForm;
};

// 属性到组件的映射 -> text属性需要一个input来获取
export const mapPropsToForms: PropsToForms = {
  text: {
    component: 'a-input',
  },
};
