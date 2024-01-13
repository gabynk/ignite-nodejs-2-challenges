import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { registerUseCase } from '../../use-cases/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    cep: z.string(),
    address: z.string(),
    phone: z.string(),
  })

  const { name, email, password, cep, address, phone } =
    registerBodySchema.parse(request.body)

  try {
    await registerUseCase({
      name,
      email,
      password,
      cep,
      address,
      phone,
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
