import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateInstitution } from '@/utils/test/create-and-authenticate-institution'

describe('Search Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pet', async () => {
    const { token } = await createAndAuthenticateInstitution(app)
    await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'pet example',
        description: 'pet description',
        age: 2,
        energy: 4,
        port: 'MEDIUM',
        dependency: 'MEDIUM',
        ambient: 'ambient exemple',
        requirements: ['requirement 1', 'requirement 2'],
      })
    const response = await request(app.server)
      .get('/pet/search')
      .query({
        city: '13476-010',
        page: 1,
      })
      .send()

    expect(response.statusCode).toEqual(201)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'pet example',
      }),
    ])
  })
})
