#!/usr/bin/env node
const program = require('commander')
const log = require('tracer').colorConsole()
const mainOra = require('ora')
const ora = mainOra('start creating')
const fs = require('fs')
const path = require('path')
const {promisify} = require('util')
const download = promisify(require('download-git-repo'))
const config = require('../config')
program
  .option('-f, --force', 'force installation')
  .parse(process.argv)
let pkgs = program.args
if(!pkgs.length){
  ora.fail('请输入项目名')
  process.exit(1)
}
const projectName = pkgs[0]
if(fs.existsSync(projectName)){
  ora.fail(`${projectName}项目已经存在`)
  process.exit(1)
}
ora.start()
download(config.githubOrigin, projectName,{clone: true}).then(res => {
  // 文件下载成功后，初始化git
  ora.succeed(`cd ${projectName} && git init && git remote origin set-url [xxx]`)
  ora.succeed('finished success')
  process.exit(1)
}).catch(error => {
  ora.fail('finished failed' + error)
  process.exit(1)
})