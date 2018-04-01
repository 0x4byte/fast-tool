#!/usr/bin/env node
const program = require('commander')
const pkg = require('./package.json')

require('./module/md5')
require('./module/base64')
require('./module/time')
require('./module/qrcode')

program.title = 'ftool'

program.version(pkg.version, '-v, --version')

program.parse(process.argv)
