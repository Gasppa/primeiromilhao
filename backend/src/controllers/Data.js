const utils = require('../utils/writer')
const Data = require('../services/Data')

function getProjections (req, res, next) {
  Data.getProjections()
    .then((response) => {
      utils.writeJson(res, response, 200)
    })
    .catch((response) => {
      utils.writeJson(res, response, 500)
    })
}

module.exports = {
  getProjections
}
