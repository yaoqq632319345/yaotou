'use strict';
const semver = require('semver');
const colors = require('colors');
const LOWEST_NODE_VERSION = '12.0.0';

class Command {
  constructor(projectName, opt, cmdObj) {
    this._projectName = projectName;
    this._opt = opt;
    this._cmdObj = cmdObj;

    let runner = new Promise((resove, reject) => {
      let chain = Promise.resolve();
      chain = chain.then(() => {
        this.checkNodeVersion();
      });
    });
  }

  // 检查node 版本
  // npm: semver
  checkNodeVersion() {
    // 1. 获取当前node 版本
    const current = process.version;
    // 2. 对比最低版本
    const lowest_version = LOWEST_NODE_VERSION;
    // log.verbose('对比node version', '当前：', current, '最低：', lowest_version);
    if (!semver.gte(current, lowest_version)) {
      throw new Error(
        colors.red(`需要安装 v${lowest_version} 以上版本的 Node.js`)
      );
    }
  }
  init() {
    throw new Error('来自 @yaotou/command 的报错：init方法子类必须实现');
  }
  exec() {
    throw new Error('来自 @yaotou/command 的报错：exec方法子类必须实现');
  }
}

module.exports = Command;
