'use strict';

module.exports = exec;

function exec() {
  console.log('exec', process.env.CLI_TARGET_PATH);
  console.log('exec', process.env.CLI_HOME_PATH);
  // 1. targetPath -> modulePath
  // 2. modulePath -> Package(npm 模块)
  // 3. 创建Package 类, -> getRootFile() 获取入口文件
  // 4. Package.update / Package.install
}
