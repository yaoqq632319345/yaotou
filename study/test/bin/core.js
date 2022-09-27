#!/usr/bin/env node

// 让 node 支持 esmodule
// 1. webpack
// 2. .mjs

import path from 'path';
import { exists } from './utils';
console.log(path.resolve('.'));
console.log(exists(path.resolve('.')));

(async function () {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('ok');
})();
