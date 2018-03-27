const prompt = require('prompt')

/**
 * exec default encode by input value
 */
const enterValue = callback => {
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

exports.enter = enterValue
