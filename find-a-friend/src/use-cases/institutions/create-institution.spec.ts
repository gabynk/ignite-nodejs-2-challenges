import { InstitutionRepository } from '@/repositories/institution-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateInstitutionUseCase } from './create-institution'
import { InMemoryInstitutionRepository } from '@/repositories/in-memories/in-memory-institution-repository'
import { compare } from 'bcryptjs'
import { InstitutionAlreadyExistsError } from '../errors/institution-already-exists-error'

let institutionRepository: InstitutionRepository
let createInstitutionUseCase: CreateInstitutionUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    institutionRepository = new InMemoryInstitutionRepository()
    createInstitutionUseCase = new CreateInstitutionUseCase(
      institutionRepository,
    )
  })

  it('Should be able to register', async () => {
    const { institution } = await createInstitutionUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cep: '13476-010',
      address: 'Estrada Praia Azul',
      phone: '19-2968-1146',
    })

    expect(institution.id).toEqual(expect.any(String))
  })

  it('Should hash institution password upon registration', async () => {
    const { institution } = await createInstitutionUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cep: '13476-010',
      address: 'Estrada Praia Azul',
      phone: '19-2968-1146',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      institution.password,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not be able to register with same email twice', async () => {
    await createInstitutionUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cep: '13476-010',
      address: 'Estrada Praia Azul',
      phone: '19-2968-1146',
    })

    await expect(() =>
      createInstitutionUseCase.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        cep: '13476-010',
        address: 'Estrada Praia Azul',
        phone: '19-2968-1146',
      }),
    ).rejects.toBeInstanceOf(InstitutionAlreadyExistsError)
  })
})
