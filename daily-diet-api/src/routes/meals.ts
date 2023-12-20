import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { randomUUID } from "crypto";
import { checkAuthenticate } from "../middlewares/check-authenticate";

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    await checkAuthenticate(request, reply)
  })

  app.post('/', async (request, reply) => {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string(),
      hours: z.string(),
      within_diet: z.boolean(),
    })
    const { name, description, date, hours, within_diet } = createMealBodySchema.parse(request.body)

    await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      date,
      hours,
      within_diet,
      user_id: request.userId,
    })

    return reply.status(201).send()
  })

  app.put('/:id', async (request, reply) => {
    const getMealParamsSchema = z.object({
      id: z.string()
    })
    const changeMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string(),
      hours: z.string(),
      within_diet: z.boolean(),
    })
    const { id } = getMealParamsSchema.parse(request.params)
    const { name, description, date, hours, within_diet } = changeMealBodySchema.parse(request.body)

    await knex('meals')
      .where({
        'user_id': request.userId,
        id,
      })
      .update({
        name,
        description,
        within_diet,
        date,
        hours,
        updated_at: knex.fn.now()
      })

    return reply.status(201).send()
  })

  app.get('/', async (request) => {
    const mealsList = await knex('meals').where('user_id', request.userId)

    return {
      meals: mealsList
    }
  })

  app.get('/:id', async (request) => {
    const getMealParamsSchema = z.object({
      id: z.string()
    })
    const { id } = getMealParamsSchema.parse(request.params)

    const meal = await knex('meals')
      .where({
        'user_id': request.userId,
        id,
      })
      .first()

    return {
      meal
    }
  })

  app.get('/metrics', async (request) => {
    const total_meals = await knex('meals')
      .where('user_id', request.userId)
      .orderBy('date', 'asc')

    const in_diet = await knex('meals')
      .where('user_id', request.userId)
      .count('within_diet as total')
      .where('within_diet', true)
      .first()

    const out_diet = await knex('meals')
      .where('user_id', request.userId)
      .count('within_diet as total')
      .where('within_diet', false)
      .first()

    let total_best_sequence = 1
    if (total_meals.length > 0) {
      let count = 1;
      for (let i = 1; i < total_meals.length; i++) {
        const currentDate = new Date(total_meals[i].date)
        const prevDate = new Date(total_meals[i - 1].date)

        const diffInDays = (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24); // 1d
        if (diffInDays === 1 && total_meals[i - 1].within_diet) {
          count++;
        }
      }

      total_best_sequence = count
    }

    return {
      total_meals: total_meals.length,
      total_within_diet: in_diet?.total ?? 0,
      total_without_diet: out_diet?.total ?? 0,
      total_best_sequence
    }
  })

  app.delete('/:id', async (request, reply) => {
    const getMealParamsSchema = z.object({
      id: z.string()
    })
    const { id } = getMealParamsSchema.parse(request.params)

    await knex('meals')
      .where({
        'user_id': request.userId,
        id,
      })
      .delete()

    return reply.status(200).send()
  })
}