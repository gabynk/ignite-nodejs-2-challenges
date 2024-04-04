import { InstitutionRepository } from '@/repositories/institution-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryInstitutionRepository } from '@/repositories/in-memories/in-memory-institution-repository'
import { CreatePetUseCase } from './create-pet'
import { PetRepository } from '@/repositories/pet-repository'
import { InMemoryPetRepository } from '@/repositories/in-memories/in-memory-pet.repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let institutionRepository: InstitutionRepository
let petRepository: PetRepository
let sut: CreatePetUseCase

describe('Create Pets Use Case', () => {
  beforeEach(async () => {
    institutionRepository = new InMemoryInstitutionRepository()
    petRepository = new InMemoryPetRepository()
    sut = new CreatePetUseCase(petRepository, institutionRepository)
  })

  it('Should be able to create', async () => {
    const institution = await institutionRepository.create({
      id: 'id-1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cep: '13476-010',
      address: 'Estrada Praia Azul',
      phone: '19-2968-1146',
    })

    const { pet } = await sut.execute({
      name: 'Pet name',
      description: 'pet description',
      age: 2,
      energy: 4,
      port: 'MEDIUM',
      dependency: 'MEDIUM',
      ambient: 'ambient exemple',
      requirements: ['requirement 1', 'requirement 2'],
      institutionId: institution.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('Should not be able to create with invalid institution id', async () => {
    await expect(() =>
      sut.execute({
        name: 'Pet name',
        description: 'pet description',
        age: 2,
        energy: 4,
        port: 'MEDIUM',
        dependency: 'MEDIUM',
        ambient: 'ambient exemple',
        requirements: ['requirement 1', 'requirement 2'],
        institutionId: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
