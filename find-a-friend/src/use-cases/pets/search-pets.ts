import { PetRepository } from '@/repositories/pet-repository'

export interface SearchPetsQueryParams {
  age?: number
  energy?: number
  dependency?: string
  ambient?: string
}

interface SearchPetUseCaseRequest {
  city: string
  page: number
  q: SearchPetsQueryParams
}

export class SearchPetsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({ city, page, q }: SearchPetUseCaseRequest) {
    const pets = await this.petRepository.searchManyByCep(city, page, q)

    return {
      pets,
    }
  }
}
