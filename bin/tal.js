#!/usr/bin/env node

let program = require('commander')
// 如果希望程序响应-v选项而不是-V
program
  .version('0.0.1','-v','--version')
  .description('项目快速初始化模板工程cli')
  .command('init <name>', 'create project')
  .command('add <name>','add somePlugins')

program.parse(process.argv)
