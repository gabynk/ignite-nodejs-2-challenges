import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateInstitution } from '@/utils/test/create-and-authenticate-institution'

describe('Get Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet', async () => {
    const { token } = await createAndAuthenticateInstitution(app)
    const createdPet = await request(app.server)
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

    const { id } = createdPet.body.pet
    const response = await request(app.server).get(`/pet/${id}`).send()

    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'pet example',
      }),
    )
    expect(response.body.institution.id).toEqual(
      response.body.pet.institution_id,
    )
  })
})
