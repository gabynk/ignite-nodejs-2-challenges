import { InstitutionRepository } from '@/repositories/institution-repository'

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
    const institution = await this.institutionRepository.create({
      name,
      email,
      password,
      cep,
      address,
      phone,
    })

    return {
      institution,
    }
  }
}
