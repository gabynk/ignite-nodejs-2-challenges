import { Institution, Prisma } from '@prisma/client'

export interface InstitutionRepository {
  create(data: Prisma.InstitutionCreateInput): Promise<Institution>
}
