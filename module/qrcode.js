const program = require('commander')
const QRCode = require('qrcode')
const chalk = require('chalk')
const prompt = require('../utils/prompt')
const log = console.log

const printStrToImg = value => {
  QRCode.toString(value, { type: 'terminal' })
    .then(url => {
      log(chalk`
      Input: {green ${value}}
      Output:
      `)
      log(url)
    })
    .catch(err => {
      log(chalk.red(err))
    })
}

program
  .command('qrcode')
  .description('qrcode string')
  .alias('q')
  .action(value => {
    if (!value || typeof value === 'object') {
      return prompt.enter(printStrToImg)
    }

    printStrToImg(value)
  })
