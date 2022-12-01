import { mapValues, without } from 'lodash-es';
export interface CommonComponentProps {
  // actions
  actionType: string;
  url: string;
  // size
  height: string;
  width: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
  // border type
  borderStyle: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  // shadow and opacity
  boxShadow: string;
  opacity: string;
  // position and x,y
  position: string;
  left: string;
  top: string;
  right: string;
}
export const commonDefaultProps: CommonComponentProps = {
  // actions
  actionType: '',
  url: '',
  // size
  height: '',
  width: '373px',
  paddingLeft: '0px',
  paddingRight: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
  // border type
  borderStyle: 'none',
  borderColor: '#000',
  borderWidth: '0',
  borderRadius: '0',
  // shadow and opacity
  boxShadow: '0 0 0 #000000',
  opacity: '1',
  // position and x,y
  position: 'absolute',
  left: '0',
  top: '0',
  right: '0',
};

/**
 * LImage组件的props类型
 */
export interface ImageComponentProps extends CommonComponentProps {
  src: string;
}
/**
 * LImage组件的props默认值
 */
export const imageDefaultProps: ImageComponentProps = {
  src: 'test.url',
  ...commonDefaultProps,
};

/**
 * img 标签的样式keys
 */
export const imageStylePropsNames = without(
  Object.keys(imageDefaultProps),
  'src'
);

/**
 * text 组件props类型
 */
export interface TextComponentProps extends CommonComponentProps {
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  lineHeight: string;
  textAlign: string;
  color: string;
  backgroundColor: string;
}
/**
 * text 组件props默认值
 */
export const textDefaultProps: TextComponentProps = {
  // basic props - font styles
  text: '正文内容',
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  lineHeight: '1',
  textAlign: 'left',
  color: '#000000',
  backgroundColor: '',
  ...commonDefaultProps,
};
/**
 * 将text组件需要的 style 键过滤出来
 */
export const textStylePropNames = without(
  Object.keys(textDefaultProps),
  'text',
  'url',
  'actionType'
);

/**
 * shape 组件props类型
 */
export interface ShapeComponentProps extends CommonComponentProps {
  backgroundColor: string;
}
/**
 * shape 组件props默认值
 */
export const shapeDefaultProps: ShapeComponentProps = {
  backgroundColor: '',
  ...commonDefaultProps,
};
/**
 * shape 组件的样式keys
 */
export const shapeStylePropsNames = without(
  Object.keys(imageDefaultProps),
  'actionType',
  'url'
);

export const isEditingProp = {
  isEditing: {
    type: Boolean,
    default: false,
  },
};
/**
 * 将默认的键值对，转为VUE 的props
 * mapValues 将键值对转为vue props 需要的格式
 * { text: xxx } => { type: xxx.constructor, default: xxx }
 * @param props
 */
export const transformToComponentProps = <T extends {}>(props: T) => {
  return {
    ...mapValues(props, (item) => ({
      type: (item as any).constructor as StringConstructor,
      default: item,
    })),
    ...isEditingProp,
  };
};
