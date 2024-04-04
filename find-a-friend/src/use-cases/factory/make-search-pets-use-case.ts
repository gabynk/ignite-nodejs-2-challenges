import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { SearchPetsUseCase } from '../pets/search-pets'

export function MakeSearchPetsUseCase() {
  const petRepository = new PrismaPetRepository()
  const useCase = new SearchPetsUseCase(petRepository)

  return useCase
}
