/* global test, expect */

const Data = require('./Data')

test('Data.getProjections() - should return projections', async () => {
  const data = await Data.getProjections()

  expect(data).toEqual(
    expect.objectContaining({
      IPCA: expect.any(Number),
      ratesByRisk: expect.any(Object)
    })
  )

  expect(data.ratesByRisk).toEqual(
    expect.objectContaining({
      conservative: expect.any(Number),
      moderatelyConservative: expect.any(Number),
      moderatelyAggressive: expect.any(Number),
      aggressive: expect.any(Number),
      veryAggressive: expect.any(Number)
    })
  )
})
