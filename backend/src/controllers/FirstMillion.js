const utils = require('../utils/writer')
const FirstMillion = require('../services/FirstMillion')

function getFirstMillionProjection (req, res, next) {
  let body = ''
  req.on('data', chunk => {
    body += chunk.toString()
  })
  req.on('end', () => {
    FirstMillion.getFirstMillionProjection(body)
      .then((response) => {
        utils.writeJson(res, response, 200)
      })
      .catch((response) => {
        utils.writeJson(res, response, 500)
      })
  })
}

module.exports = {
  getFirstMillionProjection
}
