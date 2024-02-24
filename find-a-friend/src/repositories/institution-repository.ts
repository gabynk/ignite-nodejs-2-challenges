import { Institution, Prisma } from '@prisma/client'

export interface InstitutionRepository {
  findByEmail(email: string): Promise<Institution | null>
  create(data: Prisma.InstitutionCreateInput): Promise<Institution>
}
