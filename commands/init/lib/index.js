'use strict';
const log = require('@yaotou/log');
const Command = require('@yaotou/command');

class InitCommand extends Command {}
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
