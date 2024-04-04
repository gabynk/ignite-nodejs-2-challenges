import { InstitutionRepository } from '@/repositories/institution-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { PetRepository } from '@/repositories/pet-repository'
import { InMemoryPetRepository } from '@/repositories/in-memories/in-memory-pet.repository'
import { InMemoryInstitutionRepository } from '@/repositories/in-memories/in-memory-institution-repository'
import { GetPetUseCase } from './get-pet'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let institutionRepository: InstitutionRepository
let petRepository: PetRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(async () => {
    institutionRepository = new InMemoryInstitutionRepository()
    petRepository = new InMemoryPetRepository()
    sut = new GetPetUseCase(petRepository, institutionRepository)
  })

  it('Should be able to get a pet', async () => {
    const createdInstitution = await institutionRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cep: '13476-010',
      address: 'Estrada Praia Azul',
      phone: '19-2968-1146',
    })
    const createdPet = await petRepository.create({
      name: 'pet name example',
      description: 'pet description',
      age: 2,
      energy: 4,
      port: 'MEDIUM',
      dependency: 'MEDIUM',
      ambient: 'ambient exemple',
      requirements: 'requirement 1 | requirement 2',
      institution_id: createdInstitution.id,
      cep: createdInstitution.cep,
    })

    const { pet, institution } = await sut.execute({
      id: createdPet.id,
    })

    expect(pet.id).toEqual(createdPet.id)
    expect(pet.name).toEqual('pet name example')
    expect(institution.id).toEqual(createdInstitution.id)
    expect(institution.name).toEqual('John Doe')
  })

  it('Should not be able to get non-existent pet', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should not be able to get pet with non-existent institution id', async () => {
    const createdPet = await petRepository.create({
      name: 'pet name example',
      description: 'pet description',
      age: 2,
      energy: 4,
      port: 'MEDIUM',
      dependency: 'MEDIUM',
      ambient: 'ambient exemple',
      requirements: 'requirement 1 | requirement 2',
      institution_id: 'non-existent-id',
      cep: '13476-010',
    })
    await expect(() =>
      sut.execute({
        id: createdPet.id,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
