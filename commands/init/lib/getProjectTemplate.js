'use strict';
const request = require('@yaotou/request');

module.exports = function () {
  return request({
    url: '/project/getTemplate',
  });
};
