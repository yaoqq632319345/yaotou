'use strict';

const Spinner = require('cli-spinner').Spinner;

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function spinnerStart(msg, spinnerStr = '|/-\\') {
  const spinner = new Spinner(`${msg} %s`);
  spinner.setSpinnerString(spinnerStr);
  spinner.start();

  return spinner;
}
function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
module.exports = {
  spinnerStart,
  sleep,
  isObject,
};
