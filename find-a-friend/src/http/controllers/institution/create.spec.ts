import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Create Institution (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create institution', async () => {
    const response = await request(app.server).post('/institution').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cep: '13476-010',
      address: 'Estrada Praia Azul',
      phone: '19-2968-1146',
    })

    expect(response.statusCode).toEqual(201)
  })
})
