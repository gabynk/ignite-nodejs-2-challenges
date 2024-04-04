import { MakeSearchPetsUseCase } from '@/use-cases/factory/make-search-pets-use-case'
import { SearchPetsQueryParams } from '@/use-cases/pets/search-pets'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchQuerySchema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
    age: z.number().optional(),
    energy: z.number().optional(),
    dependency: z.string().optional(),
    ambient: z.string().optional(),
  })

  const { city, page, ...res } = searchQuerySchema.parse(request.query)

  const searchPetsUseCase = MakeSearchPetsUseCase()

  const q = {} as SearchPetsQueryParams
  if (res.age) q.age = res.age
  if (res.energy) q.energy = res.energy
  if (res.dependency) q.dependency = res.dependency
  if (res.ambient) q.ambient = res.ambient

  const { pets } = await searchPetsUseCase.execute({
    city,
    page,
    q,
  })

  return reply.status(201).send({ pets })
}
