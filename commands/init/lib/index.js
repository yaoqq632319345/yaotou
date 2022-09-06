'use strict';
const log = require('@yaotou/log');
const fs = require('fs');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const Command = require('@yaotou/command');

const TYPE_PROJECT = 'TYPE_PROJECT';
const TYPE_COMPONENT = 'TYPE_COMPONENT';

class InitCommand extends Command {
  init() {
    log.verbose('@yaotou/init', this._projectName, this._opt.force);
  }
  async exec() {
    log.verbose('@yaotou/init', 'exec');
    try {
      // 1. 准备阶段
      const res = await this.prepare();
      if (!res) return;
      // 2. 下载模板
      // 3. 安装模板
    } catch (error) {
      log.error(error.message);
    }
  }
  async prepare() {
    const localPath = process.cwd(); // path.resolve('.')
    // 1. 判断当前目录是否为空
    const res = this.isDirEmpty(localPath);
    if (!res) {
      let ifContinue = false;
      if (!this._opt.force) {
        ifContinue = (
          await inquirer.prompt([
            {
              type: 'confirm',
              message: '当前文件夹不为空, 是否继续创建项目?',
              default: false,
              name: 'ifContinue',
            },
          ])
        ).ifContinue;
        if (!ifContinue) return false;
      }
      // 2. 是否启动强制更新
      if (ifContinue || this._opt.force) {
        // 二次确认
        const { confirmDelete } = await inquirer.prompt([
          {
            type: 'confirm',
            message: '确定要清空目录吗？',
            default: false,
            name: 'confirmDelete',
          },
        ]);
        if (confirmDelete) {
          fse.emptyDirSync(localPath);
        }
      }
    }
    return await this.getProjectInfo();
    // 3. 选择创建项目类型
    // 4. 获取项目的基本信息
  }
  async getProjectInfo() {
    const projectInfo = {};
    const { type } = await inquirer.prompt({
      type: 'list',
      name: 'type',
      message: '请选择初始化类型',
      default: TYPE_PROJECT,
      choices: [
        { name: '项目', value: TYPE_PROJECT },
        { name: '组件', value: TYPE_COMPONENT },
      ],
    });
    if (type === TYPE_PROJECT) {
      const o = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: '请输入项目名称',
          default: '',
          validate(v) {
            return true;
          },
          filter(v) {
            return v;
          },
        },
        {
          type: 'input',
          name: 'projectVersion',
          message: '请输入项目版本号',
          default: '1.0.0',
          validate(v) {
            return true;
          },
          filter(v) {
            return v;
          },
        },
      ]);
      console.log(o);
    } else if (type === TYPE_COMPONENT) {
    }
    return projectInfo;
  }
  isDirEmpty(localPath) {
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
