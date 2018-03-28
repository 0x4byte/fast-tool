const program = require('commander')
const Base64 = require('js-base64').Base64
const chalk = require('chalk')
const log = console.log
const prompt = require('../utils/prompt')

const printEncode = value => {
  log(chalk`
  Input:  {green ${value}}
  Encode: {green ${Base64.encode(value)}}
  `)
}

const printEncodeURI = value => {
  log(chalk`
  Input:     {green ${value}}
  EncodeURI: {green ${Base64.encodeURI(value)}}
  `)
}

const printDecode = value => {
  log(chalk`
  Input:  {green ${value}}
  Decode: {green ${Base64.decode(value)}}
  `)
}

/**
 * decodeURI => decode
 * @param {*} value
 */
const printDecodeURI = value => {
  log(chalk`
  Input:     {green ${value}}
  DecodeURI: {green ${Base64.decode(value)}}
  `)
}

const getCallback = cmd => {
  if (cmd.url && !cmd.encode && !cmd.decode) {
    log(chalk.red('please match -e or -d args use.'))
    return
  }

  if (cmd.decode && cmd.url) return printDecodeURI
  if (cmd.decode) return printDecode
  if (cmd.encode && cmd.url) return printEncodeURI

  return printEncode
}

program
  .command('base64')
  .description('base64 string')
  .alias('b')
  .option('-e, --encode', 'encode string')
  .option('-d, --decode', 'decode string')
  .option('-r, --url', 'encode/decode url')
  .action((value, cmd) => {
    if (typeof value === 'object') {
      const cb = getCallback(value)

      cb && prompt.enter(cb)
      return
    }

    getCallback(cmd)(value)
  })
