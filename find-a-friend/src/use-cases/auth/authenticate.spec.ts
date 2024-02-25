import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUserCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InMemoryInstitutionRepository } from '@/repositories/in-memories/in-memory-institution-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let institutionRepository: InMemoryInstitutionRepository
let sut: AuthenticateUserCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    institutionRepository = new InMemoryInstitutionRepository()
    sut = new AuthenticateUserCase(institutionRepository)
  })

  it('Should be able to authenticate', async () => {
    await institutionRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '13476-010',
      address: 'Estrada Praia Azul',
      phone: '19-2968-1146',
      password: await hash('123456', 6),
    })

    const { institution } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(institution.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    await institutionRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '13476-010',
      address: 'Estrada Praia Azul',
      phone: '19-2968-1146',
      password: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
