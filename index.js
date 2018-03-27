#!/usr/bin/env node

const program = require('commander')

require('./module/md5')
require('./module/base64')
require('./module/time')

program.title = 'ftool'

program.parse(process.argv)
