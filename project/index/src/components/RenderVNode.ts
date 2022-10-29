import { defineComponent } from 'vue';

const RenderVnode = defineComponent({
  props: {
    vNode: {
      type: [Object, String],
      required: true,
    },
  },
  render() {
    console.log(this.vNode);

    return this.vNode;
  },
});

export default RenderVnode;
