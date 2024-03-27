import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateInstitution } from '@/utils/test/create-and-authenticate-institution'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create pet', async () => {
    const { token } = await createAndAuthenticateInstitution(app)
    const response = await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pet name',
        description: 'pet description',
        age: 2,
        energy: 4,
        port: 'MEDIUM',
        dependency: 'MEDIUM',
        ambient: 'ambient exemple',
        requirements: ['requirement 1', 'requirement 2'],
      })

    expect(response.statusCode).toEqual(201)
  })
})
