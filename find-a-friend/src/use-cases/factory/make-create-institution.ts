import { CreateInstitutionUseCase } from '../institutions/create-institution'
import { PrismaInstitutionRepository } from '@/repositories/prisma/prisma-institution-repository'

export function MakeCreateInstitutionUseCase() {
  const institutionRepository = new PrismaInstitutionRepository()
  const useCase = new CreateInstitutionUseCase(institutionRepository)

  return useCase
}
