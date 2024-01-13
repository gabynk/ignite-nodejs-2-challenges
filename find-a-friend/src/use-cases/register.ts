import { hash } from 'bcryptjs'
import { prisma } from '../lib/prisma'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  cep: string
  address: string
  phone: string
}

export async function registerUseCase({
  name,
  email,
  password,
  cep,
  address,
  phone,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const corporationWithSameEmail = await prisma.corporation.findUnique({
    where: {
      email,
    },
  })

  if (corporationWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  await prisma.corporation.create({
    data: {
      name,
      email,
      cep,
      address,
      phone,
      password: password_hash,
    },
  })
}
