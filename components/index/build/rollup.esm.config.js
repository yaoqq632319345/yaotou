import basicConfig, { name, file } from './rollup.config';
/**
 * @type { import('rollup').RollupOptions }
 */
export default {
  ...basicConfig,
  output: {
    name,
    file: file('esm'),
    format: 'es',
  },
};
