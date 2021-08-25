/* global test, expect */

const FirstMillion = require('./FirstMillion')
const Data = require('../Data')

test('FirstMillion.getFirstMillionProjection() - should return a projection for the clients first million', async () => {
  const mockBody = { initialValue: 10000, yearsToAccomplish: 12 }
  const result = await FirstMillion.getFirstMillionProjection(mockBody)
  const { parmaisPMT, regularPMT } = result

  expect(result).toEqual(
    expect.objectContaining({
      parmaisPMT: expect.any(Number),
      regularPMT: expect.any(Number)
    }))
  expect(parmaisPMT).toBeGreaterThan(0)
  expect(parmaisPMT).toBeLessThan(1000000)
  expect(regularPMT).toBeGreaterThan(0)
  expect(regularPMT).toBeLessThan(1000000)
})

test('FirstMillion.getTaxas() - should return an object with all taxes necessary to calculate the PMT', async () => {
  const projections = await Data.getProjections()
  const taxas = FirstMillion.getFees(projections.IPCA, projections.ratesByRisk.moderatelyAggressive)

  expect(taxas).toEqual(
    expect.objectContaining({
      grossNominalFee: expect.any(Number),
      netNominalFee: expect.any(Number),
      netAnnualRealRate: expect.any(Number),
      netMonthlyRealRate: expect.any(Number)
    }))
  expect(taxas.grossNominalFee).toBeGreaterThan(0)
  expect(taxas.netNominalFee).toBeGreaterThan(0)
  expect(taxas.netAnnualRealRate).toBeGreaterThan(0)
  expect(taxas.netMonthlyRealRate).toBeGreaterThan(0)
})
