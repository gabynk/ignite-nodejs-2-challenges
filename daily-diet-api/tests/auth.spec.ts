import { it, beforeAll, afterAll, describe, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Authenticate routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server)
      .post('/user')
      .send({
        name: 'Auth test',
        email: 'auth@test.com',
        password: '123456',
      })
    const authUser = await request(app.server)
      .post('/auth')
      .send({
        email: 'auth@test.com',
        password: '123456',
      })

    expect(authUser.statusCode).toEqual(200)
    expect(authUser.body).toEqual({
      token: expect.any(String)
    })
  })

  it('should be return error if try to sing in with wrong password', async () => {
    await request(app.server)
      .post('/user')
      .send({
        name: 'Wrong password user test',
        email: 'test1@test.com',
        password: '123456',
      })
    const authUser = await request(app.server)
      .post('/auth')
      .send({
        email: 'test1@test.com',
        password: '123456789',
      })

    expect(authUser.statusCode).toEqual(401)
  })

  it('should be return error if try to sing in with non-exist user', async () => {
    const existUser = await request(app.server)
      .post('/auth')
      .send({
        email: 'test2@test.com',
        password: '123456789',
      })

    expect(existUser.statusCode).toBe(401)
  })
})
