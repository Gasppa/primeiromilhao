/* global test, expect */

const FirstMillion = require('./FirstMillion')

test('FirstMillion.getFirstMillionProjection() - should return a projection for the clients first million', async () => {
  const data = await FirstMillion.getFirstMillionProjection()

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
