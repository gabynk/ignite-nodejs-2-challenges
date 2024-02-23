import { Institution, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { InstitutionRepository } from '../institution-repository'

export class InMemoryInstitutionRepository implements InstitutionRepository {
  public items: Institution[] = []

  async create(data: Prisma.InstitutionCreateInput) {
    const institution = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      cep: data.cep,
      address: data.address,
      phone: data.phone,
      created_at: new Date(),
    }

    this.items.push(institution)

    return institution
  }
}
