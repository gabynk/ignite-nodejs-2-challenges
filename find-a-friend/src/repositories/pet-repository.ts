import { Pet, Prisma } from '@prisma/client'

export interface SearchManyByCepQuery {
  age?: number
  energy?: number
  dependency?: string
  ambient?: string
}

export interface PetRepository {
  searchManyByCep(
    cep: string,
    page: number,
    query: SearchManyByCepQuery,
  ): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
