import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { InstitutionRepository } from '../institution-repository'

export class PrismaInstitutionRepository implements InstitutionRepository {
  async findByEmail(email: string) {
    const user = await prisma.institution.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.institution.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async create(data: Prisma.InstitutionCreateInput) {
    const user = await prisma.institution.create({
      data,
    })

    return user
  }
}
