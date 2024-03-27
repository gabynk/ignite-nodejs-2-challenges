import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { PrismaInstitutionRepository } from '@/repositories/prisma/prisma-institution-repository'
import { CreatePetUseCase } from '../pets/create-pet'

export function MakeCreatePetUseCase() {
  const institutionRepository = new PrismaInstitutionRepository()
  const petRepository = new PrismaPetRepository()
  const useCase = new CreatePetUseCase(petRepository, institutionRepository)

  return useCase
}
