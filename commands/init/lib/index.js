'use strict';
const log = require('@yaotou/log');
const fs = require('fs');
const Command = require('@yaotou/command');

class InitCommand extends Command {
  init() {
    log.verbose('@yaotou/init', this._projectName, this._opt.force);
  }
  exec() {
    log.verbose('@yaotou/init', 'exec');
    try {
      // 1. 准备阶段
      this.prepare();
      // 2. 下载模板
      // 3. 安装模板
    } catch (error) {
      log.error(error.message);
    }
  }
  prepare() {
    // 1. 判断当前目录是否为空
    const res = this.isCwdEmpty();
    // 2. 是否启动强制更新
    // 3. 选择创建项目类型
    // 4. 获取项目的基本信息
  }
  isCwdEmpty() {
    const localPath = process.cwd(); // path.resolve('.')
    let fileList = fs.readdirSync(localPath);
    fileList = fileList.filter((file) => {
      // 特殊文件夹可以存在
      return !file.startsWith('.') && !['node_modules'].includes(file);
    });
    return !fileList || fileList.length === 0;
  }
}
/**
 *  yaotou init projectName --targetPath targetPathName --force
 * @param {*} projectName === projectName
 * @param {*} opt === { force: true }
 * @param {*} cmdObj === 子命令
 * @param {*} cmdObj.parent.opts() === { targetPath: targetPathName }
 */
function init(projectName, opt, cmdObj) {
  // log.verbose('@yaotou/init', projectName, opt, process.env.CLI_TARGET_PATH);
  return new InitCommand(projectName, opt, cmdObj);
}

module.exports = init;
module.exports.InitCommand = InitCommand;
