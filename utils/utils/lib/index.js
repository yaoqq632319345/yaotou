'use strict';

const Spinner = require('cli-spinner').Spinner;
const cp = require('child_process');

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function spinnerStart(msg, spinnerStr = '|/-\\') {
  const spinner = new Spinner(`${msg} %s`);
  spinner.setSpinnerString(spinnerStr);
  spinner.start();

  return spinner;
}
function sleep(time = 300) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function exec(command, args, options) {
  const win32 = process.platform === 'win32';
  // 命令区别 'cmd' --- 'node'
  const cmd = win32 ? 'cmd' : command;
  // 参数区别 ['/c', 'node', '-e', code] ---- ['-e', code]
  const cmdArgs = win32 ? ['/c'].concat(command /* 'node' */, args) : args;
  return cp.spawn(cmd, cmdArgs, options || {});
}
function execAsync(command, args, options) {
  return new Promise((resolve, reject) => {
    const p = exec(command, args, options);
    p.on('error', (e) => {
      reject(e);
    });
    p.on('exit', (c) => {
      resolve(c);
    });
  });
}
module.exports = {
  spinnerStart,
  sleep,
  isObject,
  exec,
  execAsync,
};
