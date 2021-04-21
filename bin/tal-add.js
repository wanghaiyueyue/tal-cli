#!/usr/bin/env node
const program = require('commander')
const {args} = require('commander')
const ora = require('ora')
const spinner = ora('is developing')
program.action(params => {
  spinner.start()
  spinner.fail('-_-!!!')
})

program.parse(process.argv)