import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/institution').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cep: '13476-010',
      address: 'Estrada Praia Azul',
      phone: '19-2968-1146',
    })

    const response = await request(app.server).post('/session').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
