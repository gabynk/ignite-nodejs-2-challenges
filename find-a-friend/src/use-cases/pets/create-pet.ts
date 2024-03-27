import { PetRepository } from '@/repositories/pet-repository'
import { InstitutionRepository } from '@/repositories/institution-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: number
  energy: number
  port: string
  dependency: string
  ambient: string
  requirements: string[]
  institutionId: string
}

export class CreatePetUseCase {
  constructor(
    private petRepository: PetRepository,
    private institutionRepository: InstitutionRepository,
  ) {}

  async execute({
    name,
    description,
    age,
    energy,
    port,
    dependency,
    ambient,
    requirements,
    institutionId,
  }: CreatePetUseCaseRequest) {
    const institution = await this.institutionRepository.findById(institutionId)

    if (!institution) {
      throw new InvalidCredentialsError()
    }

    const pet = await this.petRepository.create({
      name,
      description,
      age,
      energy,
      port,
      dependency,
      ambient,
      requirements: requirements.join(' | '),
      institution_id: institution.id,
    })

    return {
      pet,
    }
  }
}
