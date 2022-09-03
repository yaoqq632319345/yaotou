'use strict';
const log = require('@yaotou/log');
/**
 *  yaotou init projectName --targetPath targetPathName --force
 * @param {*} projectName === projectName
 * @param {*} opt === { force: true }
 * @param {*} cmdObj === 子命令
 * @param {*} cmdObj.parent.opts() === { targetPath: targetPathName }
 */
function init(projectName, opt, cmdObj) {
  // console.log(projectName, opt, cmdObj.parent.opts().targetPath);
  log.verbose('@yaotou/init', projectName, opt, process.env.CLI_TARGET_PATH);
}

module.exports = init;
