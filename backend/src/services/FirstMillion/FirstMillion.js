const Data = require('../Data')
const TAXA_REAL_SEMPARMAIS = 0.01

async function getFirstMillionProjection (body) {
  try {
    const { initialValue, yearsToAccomplish } = JSON.parse(body)
    const projections = await Data.getProjections()

    const taxasComParMais = getTaxas(projections.IPCA, projections.ratesByRisk.moderatelyAggressive)
    const taxasSemParMais = getTaxas(projections.IPCA, TAXA_REAL_SEMPARMAIS)

    const pmtComParMais = PMT(taxasComParMais.taxaRealLiquidaMes, yearsToAccomplish, initialValue, -1000000, 0)
    const pmtSemParMais = PMT(taxasSemParMais.taxaRealLiquidaMes, yearsToAccomplish, initialValue, -1000000, 0)

    return Promise.resolve({
      pmtComParMais,
      pmtSemParMais
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

function getTaxas (IPCA, TaxaReal) {
  const taxasObj = {}
  taxasObj.taxaNominalBruta = ((1 + (1 * TaxaReal)) * (1 + IPCA)) - 1
  taxasObj.taxaNominalLiquida = taxasObj.taxaNominalBruta * 0.85
  taxasObj.taxaRealLiquidaAno = ((1 + taxasObj.taxaNominalLiquida) / (1 + IPCA)) - 1
  taxasObj.taxaRealLiquidaMes = ((1 + taxasObj.taxaRealLiquidaAno) ** (1 / 12)) - 1
  return taxasObj
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
  getTaxas
}
