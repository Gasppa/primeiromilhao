const utils = require('../utils/writer')
const FirstMillion = require('../services/FirstMillion')

function getFirstMillionProjection (req, res, next) {
  const body = req.swagger.params.body.value
  FirstMillion.getFirstMillionProjection(body)
    .then((response) => {
      utils.writeJson(res, response, 200)
    })
    .catch((response) => {
      utils.writeJson(res, response, 500)
    })
}

module.exports = {
  getFirstMillionProjection
}
