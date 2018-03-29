const program = require('commander')
const Base64 = require('js-base64').Base64
const chalk = require('chalk')
const mimeType = require('mime-types')
const path = require('path')
const fs = require('fs')
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

const printFile = filePath => {
  const _filePath = path.resolve(filePath)
  let data

  try {
    data = fs.readFileSync(_filePath)
  } catch (e) {
    return log(chalk.red(e))
  }

  data = new Buffer(data).toString('base64')
  const base64 = `data:${mimeType.lookup(filePath)};base64,${data}`

  log(chalk`
  Input:  {green ${_filePath}}
  Base64: {green ${base64}}
  `)
}

const getCallback = cmd => {
  if (cmd.file) return printFile

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
  .option('-f, --file', 'covert file to base64 string')
  .action((value, cmd) => {
    if (typeof value === 'object') {
      const cb = getCallback(value)

      cb && prompt.enter(cb)
      return
    }

    getCallback(cmd)(value)
  })
