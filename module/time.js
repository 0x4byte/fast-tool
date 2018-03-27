const dateFormat = require('dateformat-util')
const program = require('commander')
const chalk = require('chalk')
const prompt = require('../utils/prompt')
const log = console.log

const printUnixToStr = value => {
  let dt = new Date(Number(value) * 1000)
  !value && (dt = new Date())
  const res = dateFormat.format(dt, 'yyyy-MM-dd hh:mm:ss')

  log(chalk`
  UnixTimestamp: {green ${value}}
  DateString:    {green ${res}}
  `)
}

const printStrToUnix = value => {
  const dt = dateFormat.formatToDate(value)
  const t = (dt.getTime() / 1000).toFixed()

  log(chalk`
  DateString:    {green ${value}}
  UnixTimestamp: {green ${t}}
  `)
}

const getCallback = cmd => {
  if (cmd.str) return printStrToUnix

  return printUnixToStr
}

program
  .command('time')
  .description('quick time convert')
  .alias('t')
  .option('-u, --unix', 'please input a unix timestamp')
  .option('-s, --str', 'please input a format[yyyy-mm-dd HH:MM:ss] string')
  .action((value, cmd) => {
    const _cmd = cmd || value
    const cb = getCallback(_cmd)

    if (typeof value !== 'object') {
      // 有参数传入
      return cb(value)
    }

    // 没有参数传入
    if (value.str) return prompt.enter(cb)

    return prompt.enterInt(cb)
  })
