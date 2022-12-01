import type { TextComponentProps } from '../defaultProps';
import { pick } from 'lodash-es';
import { computed } from 'vue';

export default function useComponentCommon(
  // vue 中的 props 是只读并可选
  props: Readonly<Partial<TextComponentProps>>,
  picks: string[]
) {
  // pick(): { text: xxx, tag: xxx, fontSize: xxx } => { fontSize: xxx }
  const styleProps = computed(() => pick(props, picks));
  const handleClick = () => {
    if (props.actionType === 'url' && props.url) {
      window.location.href = props.url;
    }
  };

  return {
    styleProps,
    handleClick,
  };
}
