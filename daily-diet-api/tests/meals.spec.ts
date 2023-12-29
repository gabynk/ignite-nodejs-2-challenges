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
        name: "Test new meal",
        description: "description new meal",
        date: "2023-12-15",
        hours: "12:00",
        within_diet: true
      })
      .set({
        authorization: `Bearer ${authUser.body.token}`,
      })

    expect(createdMeal.statusCode).toEqual(201);
  })

  it('should be able to list all of the users meals', async () => {
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

    await request(app.server)
      .post('/meals')
      .send({
        name: "Test Update",
        description: "description",
        date: "2023-12-01",
        hours: "12:00",
        within_diet: true
      })
      .set({
        authorization: `Bearer ${authUser.body.token}`,
      })

    const mealsList = await request(app.server)
      .get('/meals')
      .set({
        authorization: `Bearer ${authUser.body.token}`,
      })

    expect(mealsList.statusCode).toEqual(200);
    expect(mealsList.body.meals[0]).toEqual(
      expect.objectContaining({
        name: "Test Update",
        description: "description",
        date: "2023-12-01",
        hours: "12:00",
        within_diet: 1
      }),
    )
  })

  it('should be able to update a meal', async () => {
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

    await request(app.server)
      .post('/meals')
      .send({
        name: "Test new",
        description: "description new",
        date: "2023-12-15",
        hours: "12:00",
        within_diet: true
      })
      .set({
        authorization: `Bearer ${authUser.body.token}`,
      })

      const mealsList = await request(app.server)
      .get('/meals')
      .set({
        authorization: `Bearer ${authUser.body.token}`,
      })

    const updatedMeal = await request(app.server)
      .put(`/meals/${mealsList.body.meals[0].id}`)
      .send({
        name: "Test Update",
        description: "description",
        date: "2023-12-01",
        hours: "12:00",
        within_diet: true
      })
      .set({
        authorization: `Bearer ${authUser.body.token}`,
      })

    expect(updatedMeal.statusCode).toEqual(201);
  })
})
