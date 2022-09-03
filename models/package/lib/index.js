'use strict';
const pkgDir = require('pkg-dir').sync;
const npminstall = require('npminstall');
const path = require('path');
const { isObject } = require('@yaotou/utils');
const formatPath = require('@yaotou/format-path');
const { getDefaultRegistry } = require('@yaotou/get-npm-info');
class Package {
  constructor(options) {
    if (!options) {
      throw new Error('Package 类的options参数不能为空');
    }
    if (!isObject(options)) {
      throw new Error('Package 类的options参数必选为对象');
    }
    // package 路径
    this.targetPath = options.targetPath;
    this.storeDir = options.storeDir;
    this.packageName = options.packageName;
    this.packageVersion = options.packageVersion;
  }
  // 判断当前package 是否存在
  exists() {}
  // 安装
  install() {
    // npm: npminstall
    npminstall({
      root: this.targetPath,
      storeDir: this.storeDir,
      register: getDefaultRegistry(),
      pkgs: [
        {
          name: this.packageName,
          version: this.packageVersion,
        },
      ],
    });
  }
  // 更新
  update() {}
  // 获取入口文件
  getRootFile() {
    // 1. 获取package.json 所在目录  --- pkg-dir
    const dir = pkgDir(this.targetPath);
    if (dir) {
      // 2. 读取package.json ----------- require() 支持json
      const pkgFile = require(path.resolve(dir, 'package.json'));
      // 3. 读取main - lib 字段
      if (pkgFile && pkgFile.main) {
        // 4. 路径兼容
        return formatPath(path.resolve(dir, pkgFile.main));
      }
    }
    return null;
  }
}
module.exports = Package;
