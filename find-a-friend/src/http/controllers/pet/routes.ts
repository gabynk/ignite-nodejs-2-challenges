import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { search } from './search'
import { getPet } from './get-pet'

export async function petRoutes(app: FastifyInstance) {
  app.get('/pet/search', search)
  app.get('/pet/:petId', getPet)
  app.post('/pet', { onRequest: [verifyJWT] }, create)
}
