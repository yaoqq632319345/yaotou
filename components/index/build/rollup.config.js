import vue from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import { name } from '../package.json';
import typescript from 'rollup-plugin-typescript2';

const overrides = {
  // 编译ts时覆盖配置
  compilerOptions: { declaration: true /** 生成.d.ts */ },
  // 这里新增了一个文件，应该是tsconfig 有点问题, 不加文件会报 .vue 错误
  include: ['src/main.ts', 'env.d.ts'],
};

const file = (type) => `dist/${name}.${type}.js`;

/**
 * @type { import('rollup').RollupOptions }
 */
export default {
  input: 'src/App.vue',
  output: {
    name,
    file: file('esm'),
    format: 'es',
  },
  plugins: [
    typescript({ tsconfigOverride: overrides }),
    vue(),
    css({ output: 'bundle.css' }),
  ],
};
