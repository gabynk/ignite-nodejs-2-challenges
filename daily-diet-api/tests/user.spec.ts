import { it, beforeAll, afterAll, describe, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('User routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new user', async () => {
    const createdUser = await request(app.server)
      .post('/user')
      .send({
        name: 'User test',
        email: 'test@test.com',
        password: '123456',
      })

    expect(createdUser.body.user).toEqual(
      expect.objectContaining({
        name: 'User test',
        email: 'test@test.com',
      }),
    )
  })

  it('should be return an error when try to create an existing user', async () => {
    await request(app.server)
      .post('/user')
      .send({
        name: 'Exist user test',
        email: 'exist-user@test.com',
        password: '123456',
      })

    const existUser = await request(app.server)
      .post('/user')
      .send({
        name: 'Exist user test',
        email: 'exist-user@test.com',
        password: '123456',
      })

    expect(existUser.statusCode).toBe(400);
  })
})
