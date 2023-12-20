import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

export async function authenticateRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const authUserBodySchema = z.object({
      email: z.string(),
      password: z.string(),
    })
    const { email, password } = authUserBodySchema.parse(request.body)

    const user = await knex('users').where('email', email).first()

    if (!user) {
      return reply.status(401).send()
    }

    const isUser = await compare(password, user.password);
    if (!isUser) {
      return reply.status(401).send()
    }

    const token = sign({}, process.env.SECRETE_TOKEN as string, {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      token
    }
  })
}