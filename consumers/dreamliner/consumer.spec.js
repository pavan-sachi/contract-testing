const assert = require('assert')
const { Pact, Matchers } = require('@pact-foundation/pact')
const { fetchProperties } = require('./consumer')
const { eachLike, like, term, iso8601DateTimeWithMillis, iso8601Date } = Matchers

describe('Pact with Property API', () => {
  const provider = new Pact({
    port: 8080,
    consumer: 'Dreamliner',
    provider: 'Nexus',
  })

  beforeAll(() => provider.setup())

  afterAll(() => provider.finalize())

  describe('when a call to the API is made', () => {
    beforeEach(async () => {
      return provider.addInteraction({
        state: 'properties are available',
        uponReceiving: 'a request for properties',
        withRequest: {
          path: '/properties',
          method: 'GET',
        },
        willRespondWith: {
          body: eachLike({
            id: like(3),
            name: 'Four Seasons',
            address: '199 George St, Sydney NSW 2000',
            products: eachLike({
              id: like(1),
              name: like('Channel Mananger'),
              provisionedAt: iso8601DateTimeWithMillis()
            })
          }),
          status: 200,
        },
      })
    })

    it('will receive the list of current properties', async () => {
      const result = await fetchProperties()
      assert.ok(result.length)
    })
  })
})
