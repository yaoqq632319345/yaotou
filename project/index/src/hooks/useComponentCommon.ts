import { pick } from 'lodash-es';
import { computed } from 'vue';
import type { AnyObject } from '@/stroeTypes';

export default function useComponentCommon<T extends AnyObject>(
  props: T,
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
