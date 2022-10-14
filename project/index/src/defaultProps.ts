import { mapValues, without } from 'lodash-es';
import type { AnyObject } from './stroeTypes';

export const commonDefaultProps = {
  // actions
  actionType: '',
  url: '',
  // size
  height: '',
  width: '318px',
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
  opacity: 1,
  // position and x,y
  position: 'absolute',
  left: '0',
  top: '0',
  right: '0',
};

export const textDefaultProps = {
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

// 将text组件需要的 style 键过滤出来
export const textStylePropNames = without(
  Object.keys(textDefaultProps),
  'text',
  'url',
  'actionType'
);

// mapValues 将键值对转为vue props 需要的格式
// { text: xxx } => { type: xxx.constructor, default: xxx }
export const transformToComponentProps = (props: AnyObject) => {
  return mapValues(props, (item) => ({
    type: item.constructor,
    default: item,
  }));
};
