import basicConfig, { name, file } from './rollup.config';
/**
 * @type { import('rollup').RollupOptions }
 */
export default {
  ...basicConfig,
  output: {
    name: 'yaotouComponents',
    file: file('umd'),
    format: 'umd',
    globals: {
      vue: 'Vue',
      'lodash-es': '_',
    },
    exports: 'named',
  },
};
