import { InstitutionAlreadyExistsError } from '@/use-cases/errors/institution-already-exists-error'
import { MakeCreateInstitutionUseCase } from '@/use-cases/factory/make-create-institution'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    cep: z.string(),
    address: z.string(),
    phone: z.string(),
  })

  const { name, email, password, cep, address, phone } = createBodySchema.parse(
    request.body,
  )

  try {
    const createInstitutionUseCase = MakeCreateInstitutionUseCase()

    await createInstitutionUseCase.execute({
      name,
      email,
      password,
      cep,
      address,
      phone,
    })
  } catch (err) {
    if (err instanceof InstitutionAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }

  return reply.status(201).send()
}
