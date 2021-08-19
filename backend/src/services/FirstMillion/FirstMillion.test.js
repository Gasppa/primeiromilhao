/* global test, expect */

const FirstMillion = require('./FirstMillion')
const Data = require('../Data')

test('FirstMillion.getFirstMillionProjection() - should return a projection for the clients first million', async () => {
  const mockBodyString = JSON.stringify({ initialValue: 10000, yearsToAccomplish: 12 })
  const result = await FirstMillion.getFirstMillionProjection(mockBodyString)
  expect(result).toEqual(
    expect.objectContaining({
      pmtComParMais: expect.any(Number),
      pmtSemParMais: expect.any(Number)
    }))
})

test('FirstMillion.getTaxas() - should return an object with all taxes necessary to calculate the PMT', async () => {
  const projections = await Data.getProjections()
  const taxas = FirstMillion.getTaxas(projections.IPCA, projections.ratesByRisk.moderatelyAggressive)

  expect(taxas).toEqual(
    expect.objectContaining({
      taxaNominalBruta: expect.any(Number),
      taxaNominalLiquida: expect.any(Number),
      taxaRealLiquidaAno: expect.any(Number),
      taxaRealLiquidaMes: expect.any(Number)
    }))
})
