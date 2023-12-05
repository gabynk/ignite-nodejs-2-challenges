import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { randomUUID } from "crypto";

export async function userRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })
    const { name, email, password } = createUserBodySchema.parse(request.body)

    const createdUser = await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      password,
    }).returning(['id', 'name', 'email'])

    return {
      user: createdUser[0]
    }
  })
}