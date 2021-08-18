function checkHealth () {
  return Promise.resolve({ status: 'OK' })
}

module.exports = {
  checkHealth
}
