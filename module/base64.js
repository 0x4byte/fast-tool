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

program
  .command('base64')
  .description('quick base64')
  .alias('b')
  .option('-e, --encode', 'encode string')
  .option('-d, --decode', 'decode string')
  .option('-r, --url', 'encode/decode url')
  .action((value, cmd) => {
    if (!cmd) {
      return prompt.enter(printEncode)
    }

    if (cmd.url && !cmd.encode && !cmd.decode) {
      return log(chalk.red('please match -e or -d args use.'))
    }

    if (cmd.decode && cmd.url) return printDecodeURI(value)
    if (cmd.decode) return printDecode(value)
    if (cmd.encode && cmd.url) return printEncodeURI(value)

    printEncode(value)
  })
