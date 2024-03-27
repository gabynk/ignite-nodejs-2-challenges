import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pet', { onRequest: [verifyJWT] }, create)
}
