'use strict';

const path = require('path');

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
    // 在当前进程执行
    require(rootFile)(...args);
    // 其他进程执行
  }
}

module.exports = exec;
