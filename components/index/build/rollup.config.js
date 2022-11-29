import vue from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import { name } from '../package.json';
// rollup 识别不了node_modules 下的模块
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const overrides = {
  // 编译ts时覆盖配置
  compilerOptions: { declaration: true /** 生成.d.ts */ },
  // 这里新增了一个文件，应该是tsconfig 有点问题, 不加文件会报 .vue 错误
  include: ['env.d.ts'],
  exclude: ['node_modules'],
};

const file = (type) => `dist/${name}.${type}.js`;

export { name, file };
/**
 * @type { import('rollup').RollupOptions }
 */
export default {
  input: 'src/index.ts',
  output: {
    name,
    file: file('esm'),
    format: 'es',
  },
  plugins: [
    nodeResolve(),
    typescript({ tsconfigOverride: overrides }),
    vue(),
    css({ output: 'bundle.css' }),
  ],

  // 外部引用，不加入打包 这样输出的文件不含有这两个包，配合package.json 中的peerdependecies 告诉使用者如果要使用需要自行安装
  external: ['vue', 'lodash-es'],
};
