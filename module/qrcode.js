const program = require('commander')
const QRCode = require('qrcode')
const chalk = require('chalk')
const prompt = require('../utils/prompt')
const log = console.log

const printStrToImg = value => {
  QRCode.toDataURL(value)
    .then(url => {
      log(chalk`
      Input:  {green ${value}}
      Output: {green ${url}}
      `)
      return QRCode.toString(value, { type: 'terminal' })
    })
    .then(img => {
      log(img)
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
