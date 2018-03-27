const prompt = require('prompt')

const enterStr = callback => {
  prompt.start()
  prompt.get(
    {
      properties: {
        value: {
          description: 'please enter your value'
        }
      }
    },
    (err, res) => {
      callback(res.value)
    }
  )
}

const enterInt = callback => {
  prompt.start()
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
      callback(res.value)
    }
  )
}

exports.enter = enterStr
exports.enterInt = enterInt
