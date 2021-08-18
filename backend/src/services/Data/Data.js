function getProjections () {
  return Promise.resolve({
    IPCA: 0.0485,
    ratesByRisk: {
      conservative: 0.005,
      moderatelyConservative: 0.02,
      moderatelyAggressive: 0.04,
      aggressive: 0.06,
      veryAggressive: 0.09
    }
  })
}

module.exports = {
  getProjections
}
