import { it, beforeAll, afterAll, describe, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Meals routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new meal', async () => {
    await request(app.server)
      .post('/user')
      .send({
        name: 'Meal test1',
        email: 'meal1@test.com',
        password: '123456',
      })

    const authUser = await request(app.server)
      .post('/auth')
      .send({
        email: 'meal1@test.com',
        password: '123456',
      })

    const createdMeal = await request(app.server)
      .post('/meals')
      .send({
        name: "Test Update",
        description: "description update",
        date: "2023-12-15",
        hours: "12:00",
        within_diet: true
      })
      .set({
        authorization: `Bearer ${authUser.body.token}`,
      })

    expect(createdMeal.statusCode).toEqual(201);
  })
})
