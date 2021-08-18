/* global test, expect */

const Health = require('./Health')

test('Health.checkHealth() - should return server health status', () => {
  return expect(Health.checkHealth()).resolves.toEqual({ status: 'OK' })
})
