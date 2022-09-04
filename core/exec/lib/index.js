'use strict';

const path = require('path');
const cp = require('child_process');

const Package = require('@yaotou/package');
const log = require('@yaotou/log');

const SETTINGS = {
  init: '@yaotou/init',
};
const CACHE_DIR = 'dependencies';

async function exec(...args) {
  let targetPath = process.env.CLI_TARGET_PATH;
  let storeDir;
  let pkg;
  const homePath = process.env.CLI_HOME_PATH;
  log.verbose('@yaotou/exec', 'targetPath', targetPath);
  log.verbose('@yaotou/exec', 'homePath', homePath);

  // 1. targetPath -> modulePath
  // 2. modulePath -> Package(npm 模块)
  // 3. 创建Package 类, -> getRootFile() 获取入口文件
  // 4. Package.update / Package.install

  // 这里参数与视频不一致
  // args[0]: init [projectName]
  // args[1]: init 命令的 options
  // args[2]: init 命令对象
  const cmdObj = args[2],
    opt = args[1];
  const cmdName = cmdObj.name();
  const packageName = SETTINGS[cmdName]; // 动态获取包名，这里暂时写死了
  const packageVersion = 'latest';
  if (!targetPath) {
    // 走缓存
    targetPath = path.resolve(homePath, CACHE_DIR);
    storeDir = path.resolve(targetPath, 'node_modules');
    pkg = new Package({
      targetPath,
      storeDir,
      packageName,
      packageVersion,
    });
    if (await pkg.exists()) {
      // 更新
      await pkg.update();
    } else {
      // 安装
      await pkg.install();
    }
  } else {
    // 走具体路径
    pkg = new Package({
      targetPath,
      packageName,
      packageVersion,
    });
  }
  const rootFile = pkg.getRootFile();
  if (rootFile) {
    try {
      // 在当前进程执行
      // require(rootFile)(...args);
      // 其他进程执行
      // 复制命令对象
      const o = Object.create(null);
      Object.keys(cmdObj).forEach((k) => {
        if (
          // 命令对象自己的key
          cmdObj.hasOwnProperty(k) &&
          // 不以 _ 开头
          !k.startsWith('_') &&
          // 特殊键处理
          !['parent'].includes(k)
        ) {
          o[k] = cmdObj[k];
        }
      });
      const code = `require('${rootFile}')('${args[0]}', ${JSON.stringify(
        opt
      )}, ${JSON.stringify(o)})`;
      const child = spawn('node', ['-e', code], {
        cwd: process.cwd(),
        stdio: 'inherit',
      });
      child.on('error', (e) => {
        log.error(e.message);
        process.exit(1);
      });
      child.on('exit', (e) => {
        log.verbose('@yaotou/exec', '命令执行成功', e);
        process.exit(e);
      });
    } catch (error) {
      log.error(error.message);
    }
  }
}
// 兼容win32 cp.spawn('cmd', ['/c', 'node', '-e', code], options)
function spawn(command, args, options) {
  const win32 = process.platform === 'win32';
  // 命令区别 'cmd' --- 'node'
  const cmd = win32 ? 'cmd' : command;
  // 参数区别 ['/c', 'node', '-e', code] ---- ['-e', code]
  const cmdArgs = win32 ? ['/c'].concat(command /* 'node' */, args) : args;
  return cp.spawn(cmd, cmdArgs, options || {});
}

module.exports = exec;
