'use strict';
const semver = require('semver');
const colors = require('colors/safe');
const pkg = require('../package.json');
const log = require('@yaotou/log');

const constant = require('./const');
module.exports = core;

function core(args) {
  try {
    checkVersion();
    checkNodeVersion();
    checkRoot();
  } catch (error) {
    log.error(error);
  }
}

// 检查root 登录账户,
// npm: root-check
function checkRoot() {
  log.verbose(process.geteuid());
  const rootCheck = require('root-check');
  rootCheck();
  log.verbose(process.geteuid());
}

function checkVersion() {
  log.notice('cli version', pkg.version);
}

function checkNodeVersion() {
  // 1. 获取当前node 版本
  const current = process.version;
  // 2. 对比最低版本
  const lowest_version = constant.LOWEST_NODE_VERSION;
  log.verbose('对比node version', '当前：', current, '最低：', lowest_version);
  if (!semver.gte(current, lowest_version)) {
    throw new Error(
      colors.red(`需要安装 v${lowest_version} 以上版本的 Node.js`)
    );
  }
}
