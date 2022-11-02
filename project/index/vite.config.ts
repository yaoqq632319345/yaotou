/// <reference types="vitest" />
// 添加 vitest 的配置，与 vite 公用一份配置
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: "import { h } from 'vue';",
  },
  test: {
    // 全局api不用导入, vitest默认像test(), it()等方法需要导入
    globals: true,
  },
  resolve: {
    /**
     * vitest vi.mock('vue-router')
     * Vue Warns: injection "Symbol(router)" not found
     * https://github.com/vitest-dev/vitest/issues/1918
     */
    conditions: process.env.VITEST ? ['node'] : [],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
