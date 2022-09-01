'use strict';
const path = require('path');
const semver = require('semver');
const colors = require('colors/safe');
const userHome = require('user-home');
const pathExists = require('path-exists').sync;
const commander = require('commander');
const log = require('@yaotou/log');
const pkg = require('../package.json');
const constant = require('./const');

// commands
const init = require('@yaotou/init');

const program = new commander.Command();
let args, config;
module.exports = core;

async function core(args) {
  // checInputArgs();
  try {
    checkVersion();
    checkNodeVersion();
    checkRoot();
    checkUserHome();
    checkEnv();
    await checkGlobalUpdate();
    // 注册命令
    registerCommand();
  } catch (error) {
    log.error(error);
  }
}
function registerCommand() {
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d --debug', '是否开启debug模式')
    .option('-tp --targetPath <targetPath>', '是否指定本地调试文件路径');

  program.on('option:targetPath', () => {
    process.env.CLI_TARGET_PATH = program.opts().targetPath;
  });

  // 注册命令
  program
    .command('init [projectName]')
    .option('-f --force', '是否强制初始化项目')
    .action(init);

  program.on('option:debug', () => {
    // program.debug -> program.opts().debug
    if (program.opts().debug) {
      process.env.LOG_LEVEL = 'verbose';
    } else {
      process.env.LOG_LEVEL = 'info';
    }
    log.level = process.env.LOG_LEVEL;
  });
  program.on('command:*', (obj) => {
    console.error('未知的命令:', obj[0]);
    // 拿到所有命令
    const allCmd = program.commands.map((cmd) => cmd.name());
    console.log('可用命令：', allCmd.join(', '));
  });
  program.parse(process.argv); // 先解析参数， 才能取program.args
  if (program.args && program.args.length < 1) {
    program.outputHelp();
  }
}

async function checkGlobalUpdate() {
  // 1. 获取当前版本号和模块名
  const currentVersion = pkg.version;
  const npmName = pkg.name;
  // 2. 调用npm api 获取所有版本号
  const { getNpmSemverVersion } = require('@yaotou/get-npm-info');
  // 3. 提取所有版本号，比对哪些版本号是大于当前版本号
  const lastVersion = await getNpmSemverVersion(currentVersion, npmName);
  // 4. 获取最新版本号，提示用户更新到该版本
  if (lastVersion && semver.gt(lastVersion, currentVersion)) {
    log.warn(
      colors.yellow(
        '更新提示',
        `请手动更新 ${npmName}, 当前版本：${currentVersion}, 最新版本：${lastVersion}
              更新命令： npm install -g ${npmName}
              `
      )
    );
  }
}

// npm: dotenv
function checkEnv() {
  const dotenv = require('dotenv');
  const dotenvPath = path.resolve(userHome, '.env');
  if (pathExists(dotenvPath)) {
    log.verbose('环境变量', '存在.env文件');
    dotenv.config({
      path: path.resolve(userHome, '.env'),
    });
  }
  createDefaultConfig();
  log.verbose('环境变量', process.env.CLI_HOME_PATH);
}
function createDefaultConfig() {
  if (process.env.CLI_HOME) {
    process.env.CLI_HOME_PATH = path.join(userHome, process.env.CLI_HOME);
  } else {
    process.env.CLI_HOME_PATH = path.join(userHome, constant.DEFAULT_CLI_HOME);
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
  log.verbose('检查用户主目录');
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
