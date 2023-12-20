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
      within_diet: z.boolean(),
    })
    const { name, description, within_diet } = createMealBodySchema.parse(request.body)

    await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
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
      within_diet: z.boolean(),
    })
    const { id } = getMealParamsSchema.parse(request.params)
    const { name, description, within_diet } = changeMealBodySchema.parse(request.body)

    await knex('meals')
      .where({
        'user_id': request.userId,
        id,
      })
      .update({
        name,
        description,
        within_diet,
        updated_at: knex.fn.now()
      })

    return reply.status(201).send()
  })

  app.get('/', async (request, reply) => {
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