import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { randomUUID } from "crypto";

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      within_diet: z.boolean(),
      user_id: z.string(),
    })
    const { name, description, within_diet, user_id } = createMealBodySchema.parse(request.body)

   await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      within_diet,
      user_id,
    })

    return reply.status(201).send()
  })
}