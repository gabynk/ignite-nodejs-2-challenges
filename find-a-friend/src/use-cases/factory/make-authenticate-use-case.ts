import { PrismaInstitutionRepository } from '@/repositories/prisma/prisma-institution-repository'
import { AuthenticateUserCase } from '../auth/authenticate'

export function MakeAuthenticateUseCase() {
  const institutionRepository = new PrismaInstitutionRepository()
  const userCase = new AuthenticateUserCase(institutionRepository)

  return userCase
}
