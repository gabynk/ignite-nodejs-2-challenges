import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { randomUUID } from "crypto";
import { hash } from "bcryptjs";

export async function userRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })
    const { name, email, password } = createUserBodySchema.parse(request.body)
    
    const isAlreadyExistUser = await knex('users').where('email', email).first()

    if (isAlreadyExistUser) {
      return reply.status(401).send()
    }

    const passwordHash = await hash(password, 10);

    const createdUser = await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      password: passwordHash,
    }).returning(['id', 'name', 'email'])

    return {
      user: createdUser[0]
    }
  })
}