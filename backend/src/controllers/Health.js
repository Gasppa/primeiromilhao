const utils = require('../utils/writer')
const Health = require('../services/Health')

function checkHealth (req, res, next) {
  Health.checkHealth()
    .then((response) => {
      utils.writeJson(res, response, 200)
    })
    .catch((response) => {
      utils.writeJson(res, response, 500)
    })
}

module.exports = {
  checkHealth
}
