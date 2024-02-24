import { InstitutionRepository } from '@/repositories/institution-repository'
import { InstitutionAlreadyExistsError } from '../errors/institution-already-exists-error'
import { hash } from 'bcryptjs'

interface CreateInstitutionUseCaseRequest {
  name: string
  email: string
  password: string
  cep: string
  address: string
  phone: string
}

export class CreateInstitutionUseCase {
  constructor(private institutionRepository: InstitutionRepository) {}

  async execute({
    name,
    email,
    password,
    cep,
    address,
    phone,
  }: CreateInstitutionUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail =
      await this.institutionRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new InstitutionAlreadyExistsError()
    }

    const institution = await this.institutionRepository.create({
      name,
      email,
      password: password_hash,
      cep,
      address,
      phone,
    })

    return {
      institution,
    }
  }
}
