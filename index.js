#!/usr/bin/env node

const program = require('commander')

require('./module/md5')
require('./module/base64')

program.title = 'ftool'

program.parse(process.argv)
