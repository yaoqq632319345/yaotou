#! /usr/bin/env node

const importLocal = require('import-local');

if (importLocal(__dirname)) {
  // console.log('本地版本');
  require('npmlog').info('cli', '正在使用 yaotou 的本地版本');
  require('../lib')(process.argv.slice(2));
} else {
  require('../lib')(process.argv.slice(2));
}
