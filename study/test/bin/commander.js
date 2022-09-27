#!/usr/bin/env node

const commander = require('commander');
const pkg = require('../package.json');

// const { program } = commander;
const program = new commander.Command();

program
  .name(Object.keys(pkg.bin)[0])
  .usage('<command> [options]')
  .version(pkg.version)
  .option('-d, --debug', '是否开启调试模式', false)
  .option('-e, --envName <envName>', '获取环境变量名称');

// console.log(program.debug);
// console.log(program.envName);
// console.log(program.opts());

// 注册命令
const clone = program.command('clone <source> [destination]');
clone
  .description('克隆代码')
  .option('-f --force', '是否强制克隆')
  .action((source, destination, cmdObj) => {
    console.log('source:', source, 'destination:', destination, cmdObj.force);
  });

// addCommand 注册子命令  yaotou-test service start [port]
const service = new commander.Command('service');
service
  .command('start [port]')
  .description(`开启服务`)
  .action((port) => {
    console.log(`使用${port}端口开启服务`);
  });
service
  .command('stop')
  .description('停止服务')
  .action(() => {
    console.log('停止服务');
  });
program.addCommand(service);

// command 其他两种用法
// 1. 注册任意命令
// program
//   .arguments('<cmd> [options]')
//   .description('test command', {
//     // 第二个参数是对参数的具体描述
//     cmd: 'cmd',
//     options: 'options',
//   })
//   .action((cmd, options) => {
//     console.log(cmd, options);
//   });

// 2. 输入yaotou-test install 会执行 yaotou-test-install
program
  .command('install [name]', 'install package', {
    // 实际执行的命令:  可以使用yaotou-test i 来调用其他的命令
    executableFile: 'yaotou',
    // 默认执行: 当 使用yaotou-test 时，默认执行当前命令，如果不加，则会执行1，从而抛出cmd未传的错误
    // isDefault: true,
    // 对-h隐藏
    hidden: true,
  })
  .alias('i');

// command 3种定制
// 1. 自定义help信息
// console.log(program.helpInformation()); // 此方法返回帮助信息
//  方法1)手动将帮助信息置空,或者直接返回自定义帮助
program.helpInformation = () => '';
//  方法2)监听--help, 打印自定义信息
program.on('--help', () => {
  console.log('自定义信息');
});
// 2. 定制debug, 监听--debug,修改process.env.log_level ,在yaotou命令中就不需要 对--debug进行操作了
// yaotou-test i --debug
program.on('option:debug', () => {
  const options = program.opts();
  // console.log(options);
  if (options.debug) {
    process.env.LOG_LEVEL = 'verbose';
  }
});
// 3. 对未知命令监听 : yaotou-test xxx
program.on('command:*', (obj) => {
  console.error('未知的命令:', obj[0]);
  // 拿到所有命令
  const allCmd = program.commands.map((cmd) => cmd.name());
  console.log('可用命令：', allCmd.join(', '));
});

program.parse(process.argv);
