'use strict';
const { isObject } = require('@yaotou/utils');
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
    // package 存储路径
    this.storePath = options.storePath;
    this.packageName = options.packageName;
    this.packageVersion = options.packageVersion;
  }
  // 判断当前package 是否存在
  exists() {}
  // 安装
  install() {}
  // 更新
  update() {}
  // 获取入口文件
  getRootFile() {}
}
module.exports = Package;
