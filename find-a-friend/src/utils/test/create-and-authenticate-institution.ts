import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateInstitution(app: FastifyInstance) {
  await prisma.institution.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
      cep: '13476-010',
      address: 'Estrada Praia Azul',
      phone: '19-2968-1146',
    },
  })

  const authResponse = await request(app.server).post('/session').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
