import { it, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { execSync } from 'child_process'
import { app } from '../src/app'

describe('User routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
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
})
