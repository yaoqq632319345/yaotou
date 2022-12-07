export default function () {
  /**
   * @type { import('rollup').Plugin }
   */
  const plugin = {
    name: 'rollup-plugin-test',
    buildStart(ctx, options) {
      console.log(options);
    },
    load(ctx, id) {},
    transform(ctx, code, id) {},
  };
  return plugin;
}
