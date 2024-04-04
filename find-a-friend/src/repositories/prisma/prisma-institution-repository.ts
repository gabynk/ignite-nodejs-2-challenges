import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { InstitutionRepository } from '../institution-repository'

export class PrismaInstitutionRepository implements InstitutionRepository {
  async findByEmail(email: string) {
    const institution = await prisma.institution.findUnique({
      where: {
        email,
      },
    })

    return institution
  }

  async findById(id: string) {
    const institution = await prisma.institution.findUnique({
      where: {
        id,
      },
    })

    return institution
  }

  async create(data: Prisma.InstitutionCreateInput) {
    const institution = await prisma.institution.create({
      data,
    })

    return institution
  }
}
