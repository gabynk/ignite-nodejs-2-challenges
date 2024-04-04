import { PetRepository } from '@/repositories/pet-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InstitutionRepository } from '@/repositories/institution-repository'

interface GetPetUseCaseRequest {
  id: string
}

export class GetPetUseCase {
  constructor(
    private petRepository: PetRepository,
    private institutionRepository: InstitutionRepository,
  ) {}

  async execute({ id }: GetPetUseCaseRequest) {
    const pet = await this.petRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const institution = await this.institutionRepository.findById(
      pet.institution_id,
    )

    if (!institution) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
      institution,
    }
  }
}
