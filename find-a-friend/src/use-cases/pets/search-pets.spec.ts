import { InstitutionRepository } from '@/repositories/institution-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { PetRepository } from '@/repositories/pet-repository'
import { InMemoryPetRepository } from '@/repositories/in-memories/in-memory-pet.repository'
import { SearchPetsUseCase } from './search-pets'
import { InMemoryInstitutionRepository } from '@/repositories/in-memories/in-memory-institution-repository'

let institutionRepository: InstitutionRepository
let petRepository: PetRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    institutionRepository = new InMemoryInstitutionRepository()
    petRepository = new InMemoryPetRepository()
    sut = new SearchPetsUseCase(petRepository)
  })

  it('Should be able to create', async () => {
    const institution = await institutionRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cep: '13476-010',
      address: 'Estrada Praia Azul',
      phone: '19-2968-1146',
    })
    await petRepository.create({
      name: 'pet name example',
      description: 'pet description',
      age: 2,
      energy: 4,
      port: 'MEDIUM',
      dependency: 'MEDIUM',
      ambient: 'ambient exemple',
      requirements: 'requirement 1 | requirement 2',
      institution_id: institution.id,
      cep: institution.cep,
    })

    const { pets } = await sut.execute({
      city: '13476-010',
      page: 1,
      q: {},
    })

    expect(pets[0].name).toEqual('pet name example')
  })

  it('Should be able to fetch paginated pets search page 2', async () => {
    const institution = await institutionRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cep: '13476-010',
      address: 'Estrada Praia Azul',
      phone: '19-2968-1146',
    })
    for (let i = 1; i <= 22; i++) {
      await petRepository.create({
        name: `pet-test-${i}`,
        description: 'pet description',
        age: 2,
        energy: 4,
        port: 'MEDIUM',
        dependency: 'MEDIUM',
        ambient: 'ambient exemple',
        requirements: 'requirement 1 | requirement 2',
        institution_id: institution.id,
        cep: institution.cep,
      })
    }

    const { pets } = await sut.execute({
      city: '13476-010',
      page: 2,
      q: {},
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'pet-test-21' }),
      expect.objectContaining({ name: 'pet-test-22' }),
    ])
  })
})
