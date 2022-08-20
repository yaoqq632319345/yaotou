'use strict';
const semver = require('semver');
const colors = require('colors/safe');
const userHome = require('user-home');
// const pathExists = require('path-exists');

const log = require('@yaotou/log');
const pkg = require('../package.json');
const constant = require('./const');

let args;
module.exports = core;

function core(args) {
  checInputArgs();
  try {
    checkVersion();
    checkNodeVersion();
    checkRoot();
    // checkUserHome();
  } catch (error) {
    log.error(error);
  }
}

// 检查debug 参数
// npm: minimist
function checInputArgs() {
  const minimist = require('minimist');
  args = minimist(process.argv.slice(2));
  checkArgs();
}

function checkArgs() {
  if (args.debug) {
    process.env.LOG_LEVEL = 'verbose';
  } else {
    process.env.LOG_LEVEL = 'info';
  }
  log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
}

// 检查用户主目录
// npm: user-home & path-exists
// path-exists 不支持require 4.0 版本也装不上，先不用了，跳过
function checkUserHome() {
  if (!userHome || !pathExists(userHome)) {
    throw new Error(colors.red('当前登录用户主目录不存在'));
  }
}

// 检查root 登录账户,
// npm: root-check
function checkRoot() {
  log.verbose('检查登录账户，前：', process.geteuid());
  const rootCheck = require('root-check');
  rootCheck();
  log.verbose('检查登录账户，后：', process.geteuid());
}

// 项目版本
// npm: npmlog
function checkVersion() {
  log.notice('cli version', pkg.version);
}

// 检查node 版本
// npm: semver
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
