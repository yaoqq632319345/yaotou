'use strict';

const Package = require('@yaotou/package');
const log = require('@yaotou/log');

const SETTINGS = {
  init: '@yaotou/init',
};

function exec(...args) {
  const targetPath = process.env.CLI_TARGET_PATH;
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
  const pkg = new Package({
    targetPath,
    packageName,
    packageVersion,
  });
  console.log(pkg);
}

module.exports = exec;
