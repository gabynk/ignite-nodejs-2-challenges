import { MakeGetPetUseCase } from '@/use-cases/factory/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const searchParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = searchParamsSchema.parse(request.params)

  const getPetUseCase = MakeGetPetUseCase()

  const { pet, institution } = await getPetUseCase.execute({
    id: petId,
  })

  return reply.status(201).send({
    pet,
    institution,
  })
}
