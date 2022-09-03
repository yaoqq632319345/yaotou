'use strict';
const path = require('path');

function formatPath(p) {
  if (p && typeof p === 'string') {
    const sep = path.sep; // 路径分隔符
    if (sep === '/') {
      // macOS
      return p;
    } else {
      // window
      return p.replace(/\\/g, '/');
    }
  }
  return p;
}

module.exports = formatPath;
