import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { MakeCreatePetUseCase } from '@/use-cases/factory/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.number(),
    energy: z.number(),
    port: z.string(),
    dependency: z.string(),
    ambient: z.string(),
    requirements: z.array(z.string()),
  })

  const {
    name,
    description,
    age,
    energy,
    port,
    dependency,
    ambient,
    requirements,
  } = createBodySchema.parse(request.body)

  try {
    const createPetUseCase = MakeCreatePetUseCase()
    // console.log(request)
    await createPetUseCase.execute({
      name,
      description,
      age,
      energy,
      port,
      dependency,
      ambient,
      requirements,
      institutionId: request.user.sub,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }

  return reply.status(201).send()
}
