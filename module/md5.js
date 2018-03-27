const program = require('commander')
const md5 = require('md5')
const chalk = require('chalk')
const prompt = require('../utils/prompt')
const log = console.log

const printMd5 = value => {
  log(chalk`
  Input:      {green ${value}}
  Md5:        {green ${md5(value)}}
  Md5(upper): {green ${md5(value).toUpperCase()}}
  `)
}

program
  .command('md5')
  .description('quick md5')
  .alias('m')
  .action(value => {
    if (!value || typeof value === 'object') {
      return prompt.enter(printMd5)
    }

    printMd5(value)
  })
