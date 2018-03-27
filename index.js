const program = require('commander')

require('./module/md5')
require('./module/base64')

program.title = 'ftool'

program.on('--help', function() {
  console.log('  Examples:')
  console.log('')
  console.log('    $ custom-help --help')
  console.log('    $ custom-help -h')
  console.log('')
})

program.parse(process.argv)
