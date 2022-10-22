import type { TextComponentProps } from './defaultProps';
export interface PropToForm {
  component: string;
  value?: string;
  extraProps?: { [key: string]: any };
  text?: string;
}
export type PropsToForms = {
  [P in keyof TextComponentProps]?: PropToForm;
};

// 属性到组件的映射 -> text属性需要一个input来获取
export const mapPropsToForms: PropsToForms = {
  text: {
    text: '文本',
    component: 'a-textarea',
    extraProps: { rows: 3 },
  },
  fontSize: {
    text: '字号',
    component: 'a-input-number',
  },
  lineHeight: {
    text: '行高',
    component: 'a-slider',
    extraProps: { min: 0, max: 3, step: 0.1 },
  },
};
