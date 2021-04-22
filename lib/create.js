

const path = require('path')
const log = require('tracer').colorConsole()
const fs = require('fs-extra')
const inquirer = require('inquirer')
const {promisify} = require('util')
const downLoad = promisify(require('download-git-repo'))
const mainOra = require('ora')
const ora = mainOra('start creating')
const config = require('./config')
const minimist = require('minimist')
const validateProjectName = require('validate-npm-package-name')


async function create(projectName, options){
  const cwd = options.cwd||process.cwd()
  const inCurrent = projectName === '.'
  const newName = inCurrent? path.relative('../',cwd): projectName
  const targetDir = path.resolve(cwd,projectName || '.')
  const result = validateProjectName(projectName)
  if(!result.validForNewPackages){
    log.info('invalid project name: ' + newName)
    process.exit(1)
  }
  if(fs.existsSync(targetDir)){
    const {action} = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: `target directory ${targetDir} already rexists`,
        choices:[
          {name: 'Overwrite',value:'overwrite'},
          {name: 'Cancel', value: false}
        ]
      }
    ])
    if(!action){
      log.info('user cancel')
      process.exit(1)
    }else if(action === 'overwrite'){
      await fs.remove(targetDir)
    }
  }
  ora.start()
  downLoad(config.githubOrigin, projectName,{clone: true}).then(res => {
    // 文件下载成功后，初始化git
    ora.succeed(`cd ${projectName} && git init && git remote origin set-url [xxx]`)
    ora.succeed('finished success')
    process.exit(1)
  }).catch(error => {
    ora.fail('finished failed' + error)
    process.exit(1)
  })
}


module.exports = (...args) => create(...args).catch(err => {
  console.log(err)
  process.exit(1)
})