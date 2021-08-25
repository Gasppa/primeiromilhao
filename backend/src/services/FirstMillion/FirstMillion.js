const Data = require('../Data')
const REGULAR_REAL_FEE = 0.01

async function getFirstMillionProjection (body) {
  try {
    const { initialValue, yearsToAccomplish } = body
    const projections = await Data.getProjections()

    const parmaisFees = getFees(projections.IPCA, projections.ratesByRisk.moderatelyAggressive)
    const regularFees = getFees(projections.IPCA, REGULAR_REAL_FEE)

    const parmaisPMT = PMT(parmaisFees.netMonthlyRealRate, yearsToAccomplish, initialValue, -1000000, 0)
    const regularPMT = PMT(regularFees.netMonthlyRealRate, yearsToAccomplish, initialValue, -1000000, 0)

    return {
      parmaisPMT,
      regularPMT
    }
  } catch (error) {
    return error
  }
}

function getFees (IPCA, RealFee) {
  const feesObj = {}
  feesObj.grossNominalFee = ((1 + (1 * RealFee)) * (1 + IPCA)) - 1
  feesObj.netNominalFee = feesObj.grossNominalFee * 0.85
  feesObj.netAnnualRealRate = ((1 + feesObj.netNominalFee) / (1 + IPCA)) - 1
  feesObj.netMonthlyRealRate = ((1 + feesObj.netAnnualRealRate) ** (1 / 12)) - 1
  return feesObj
}

function PMT (rate, nperiodYears, pv, fv, type) {
  const nperiod = nperiodYears * 12

  if (!fv) fv = 0
  if (!type) type = 0

  if (rate === 0) return -(pv + fv) / nperiod

  const pvif = Math.pow(1 + rate, nperiod)
  let pmt = rate / (pvif - 1) * -(pv * pvif + fv)

  if (type === 1) {
    pmt /= (1 + rate)
  };

  return pmt
}

module.exports = {
  getFirstMillionProjection,
  getFees
}
