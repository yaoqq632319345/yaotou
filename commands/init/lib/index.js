'use strict';
const log = require('@yaotou/log');
const semver = require('semver');
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const userHome = require('user-home');
const inquirer = require('inquirer');
const Command = require('@yaotou/command');
const Package = require('@yaotou/package');
const { spinnerStart, sleep, execAsync } = require('@yaotou/utils');
const DEFAULT_CLI_HOME = process.env.CLI_HOME_PATH;

const getProjectTemplate = require('./getProjectTemplate');

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
      this.projectInfo = res;
      // 2. 下载模板
      await this.downloadTemplate();
      // 3. 安装模板
      await this.installTemplate();
    } catch (error) {
      log.error(error.message);
    }
  }
  async installTemplate() {
    if (this.templateInfo) {
      if (this.templateInfo.type === 'normal') {
        // 普通安装
        this.installNormalTemplate();
      } else if (this.templateInfo.type === 'custom') {
        this.installCustomTemplate();
      } else {
        throw new Error('项目模板类型错误');
      }
    } else {
      throw new Error('项目模板信息不存在');
    }
  }
  async installNormalTemplate() {
    let spinner = spinnerStart('正在安装模板...');
    await sleep();
    try {
      // copy 模板代码至当前目录
      const temPath = path.resolve(
        this.templatePackage.cacheFilePath,
        'template'
      );
      const currPath = process.cwd();
      // 确保目录存在
      fse.ensureDirSync(temPath);
      fse.ensureDirSync(currPath);
      fse.copySync(temPath, currPath);
    } catch (error) {
      throw error;
    } finally {
      spinner.stop(true);
      log.notice('模板安装成功');
    }
    // 依赖安装
    const { installCommand, startCommand } = this.templateInfo;
    let installResult;
    if (installCommand) {
      // npm install
      const installCmd = installCommand.split(' ');
      const cmd = installCmd[0];
      const args = installCmd.slice(1);
      installResult = await execAsync(cmd, args, {
        stdio: 'inherit',
        cwd: process.cwd(),
      });
    }
    if (installResult !== 0) {
      throw new Error('模板 installCommand 失败');
    }
    // 启动命令
    if (startCommand) {
      const startCmd = startCommand.split(' ');
      const cmd = startCmd[0];
      const args = startCmd.slice(1);
      await execAsync(cmd, args, {
        stdio: 'inherit',
        cwd: process.cwd(),
      });
    }
  }
  installCustomTemplate() {}
  async downloadTemplate() {
    // 1. 通过项目模板API获取项目模板信息
    // 1.1 通过egg.js 搭建一套后端系统
    // 1.2 通过npm 存储项目模板 (vue-cli/vue-element-admin)
    // 1.3 将项目模板信息存储到mongodb数据库中
    // 1.4 通过egg.js 获取mongodb中的数据并返回
    const { projectTemplate: packageName } = this.projectInfo;
    const templateInfo = this.template.find(
      (item) => item.npmName === packageName
    );
    const targetPath = path.resolve(DEFAULT_CLI_HOME, 'template'),
      storeDir = path.resolve(DEFAULT_CLI_HOME, 'template', 'node_modules');
    const templatePackage = new Package({
      targetPath,
      storeDir,
      packageName,
      packageVersion: templateInfo.version,
    });
    this.templateInfo = templateInfo;
    if (!(await templatePackage.exists())) {
      const spinner = spinnerStart('正在下载模板...');
      await sleep();
      try {
        await templatePackage.install();
      } catch (error) {
        throw error;
      } finally {
        spinner.stop(true);
        if (await templatePackage.exists()) {
          log.notice('下载模板成功');
          this.templatePackage = templatePackage;
        }
      }
    } else {
      const spinner = spinnerStart('正在更新模板...');
      await sleep();
      try {
        await templatePackage.update();
      } catch (error) {
        throw error;
      } finally {
        spinner.stop(true);
        if (await templatePackage.exists()) {
          log.notice('更新模板成功');
          this.templatePackage = templatePackage;
        }
      }
    }
  }
  async prepare() {
    // 判断模板是否存在
    const template = await getProjectTemplate();
    if (!template || template.length === 0) {
      throw new Error('项目模板不存在');
    }
    this.template = template;
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
    // 3. 选择创建项目类型
    // 4. 获取项目的基本信息
    return await this.getProjectInfo();
  }
  async getProjectInfo() {
    let projectInfo = {};
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
      const project = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: '请输入项目名称',
          default: '',
          validate(v) {
            const done = this.async();
            if (
              !/^[a-zA-Z]+([-][a-zA-Z][a-zA-Z0-9]*|[_][a-zA-Z][a-zA-Z0-9]*|[a-zA-Z0-9])*$/.test(
                v
              )
            ) {
              done('项目名称校验未通过');
              return;
            }
            done(null, true);
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
            const done = this.async();
            if (!semver.valid(v)) {
              done('项目版本号校验未通过');
              return;
            }
            done(null, true);
          },
          filter(v) {
            const res = semver.valid(v);
            return res ? res : v;
          },
        },
        {
          type: 'list',
          name: 'projectTemplate',
          message: '请选择项目模板',
          choices: this.createTemplateChoice(),
        },
      ]);
      projectInfo = {
        type,
        ...project,
      };
    } else if (type === TYPE_COMPONENT) {
    }
    return projectInfo;
  }
  createTemplateChoice() {
    return this.template.map((temp) => {
      return { value: temp.npmName, name: temp.name };
    });
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
