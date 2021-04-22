#!/usr/bin/env node

let program = require('commander')
program
  .version('0.0.1','-v','--version')

program
  .command('init <app-name>')
  .description('Initialize a new project powered by tal-cli')
  .action(async(name, options) => {
    require('../lib/create')(name, options)
  })

program.parse(process.argv)
