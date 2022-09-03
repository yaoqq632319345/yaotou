'use strict';
const axios = require('axios');
const semver = require('semver');
const urlJoin = require('url-join');

// 获取包信息
function getNpmInfo(npmName, registry) {
  if (!npmName) {
    return null;
  }
  const registryUrl = registry || getDefaultRegistry();
  const npmInfoUrl = urlJoin(registryUrl, npmName);

  return axios
    .get(npmInfoUrl)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      Promise.reject(error);
    });
}

function getDefaultRegistry(isOriginal = false) {
  return isOriginal
    ? 'https://registry.npmjs.org'
    : 'https://registry.npm.taobao.org';
}

// 获取所有已发布版本信息
async function getNpmVersion(npmName, registry) {
  const data = await getNpmInfo(npmName, registry);
  if (data) {
    return Object.keys(data.versions);
  } else {
    return [];
  }
}

// 获取大于当前版本的所有版本号，并排序
function getSemverVersions(baseVersion, versions) {
  versions = versions
    .filter((version) => semver.satisfies(version, `^${baseVersion}`))
    .sort((a, b) => semver.gt(b, a));
  return versions;
}

// 获取最新版本号
async function getNpmSemverVersion(baseVersion, npmName, registry) {
  const versions = await getNpmVersion(npmName, registry);
  const newVersions = getSemverVersions(baseVersion, versions);
  if (newVersions && newVersions.length > 0) {
    return newVersions[0];
  }
  return null;
}

module.exports = {
  getNpmInfo,
  getNpmVersion,
  getNpmSemverVersion,
  getDefaultRegistry,
};
