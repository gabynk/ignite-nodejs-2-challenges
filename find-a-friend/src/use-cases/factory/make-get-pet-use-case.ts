import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { PrismaInstitutionRepository } from '@/repositories/prisma/prisma-institution-repository'
import { GetPetUseCase } from '../pets/get-pet'

export function MakeGetPetUseCase() {
  const institutionRepository = new PrismaInstitutionRepository()
  const petRepository = new PrismaPetRepository()
  const useCase = new GetPetUseCase(petRepository, institutionRepository)

  return useCase
}
