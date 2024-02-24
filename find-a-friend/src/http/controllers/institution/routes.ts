import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function institutionRoutes(app: FastifyInstance) {
  app.post('/institution', create)
}
