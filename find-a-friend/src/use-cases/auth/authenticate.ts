import { InstitutionRepository } from '@/repositories/institution-repository'
import { Institution } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface AuthenticateUserCaseRequest {
  email: string
  password: string
}

interface AuthenticateUserCaseResponse {
  institution: Institution
}

export class AuthenticateUserCase {
  constructor(private institutionRepository: InstitutionRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserCaseRequest): Promise<AuthenticateUserCaseResponse> {
    const institution = await this.institutionRepository.findByEmail(email)

    if (!institution) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, institution.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      institution,
    }
  }
}
