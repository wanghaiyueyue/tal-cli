#!/usr/bin/env node
const clone = require('git-clone')
const program = require('commander')
const shell = require('shelljs')
const log = require('tracer').colorConsole()

program.version('0.0.1').description('项目快速初始化模板工程cli')

program.command('tal')