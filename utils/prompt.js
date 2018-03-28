const prompt = require('prompt')

prompt.start()

const enterStr = callback => {
  prompt.get(
    {
      properties: {
        value: {
          description: 'please enter your value'
        }
      }
    },
    (err, res) => {
      res && callback(res.value)
    }
  )
}

const enterInt = callback => {
  prompt.get(
    [
      {
        name: 'value',
        type: 'integer',
        description: 'please enter int value',
        message: 'invalid integer'
      }
    ],
    (err, res) => {
      res && callback(res.value)
    }
  )
}

exports.enter = enterStr
exports.enterInt = enterInt
