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
}: RegisterUseCaseRequest) {}
