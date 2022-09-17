const fse = require('fs-extra');
const ejs = require('ejs');
const glob = require('glob');
const inquirer = require('inquirer');

module.exports = install;

const prompt = [
  {
    type: 'input',
    name: 'description',
    message: '请输入项目描述',
    default: '',
    validate(v) {
      const done = this.async();
      if (!v) {
        done('项目描述不能为空');
        return;
      }
      done(null, true);
    },
  },
];
async function install(opt) {
  console.log(opt);
  // 获取模板路径和当前路径
  const { sourcePath, targetPath } = opt;
  // 录入描述信息
  const { description } = await inquirer.prompt(prompt);
  opt.projectInfo.description = description;
  try {
    // copy 模板代码至当前目录
    fse.ensureDirSync(sourcePath);
    fse.ensureDirSync(targetPath);
    fse.copySync(sourcePath, targetPath);
    await renderEjsTemplate(opt);
  } catch (error) {
    throw error;
  }
}

function renderEjsTemplate(opt) {
  const { ejsIgnore, targetPath: cwd, projectInfo } = opt;
  const ignore = (ejsIgnore || []).concat('**/node_modules/**');
  return new Promise((resolve, reject) => {
    glob(
      '**',
      {
        cwd,
        ignore,
        nodir: true,
      },
      (err, files) => {
        if (err) reject(err);
        Promise.all(
          files.map((file) => {
            const filePath = path.join(cwd, file);
            return new Promise((resolve, reject) => {
              ejs.renderFile(filePath, projectInfo, (err, res) => {
                if (err) reject(err);
                else {
                  fse.writeFileSync(filePath, res);
                  resolve(res);
                }
              });
            });
          })
        )
          .then(() => resolve())
          .catch((e) => reject(e));
      }
    );
  });
}
