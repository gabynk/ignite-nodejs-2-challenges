import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetRepository, SearchManyByCepQuery } from '../pet-repository'

export class PrismaPetRepository implements PetRepository {
  async searchManyByCep(
    cep: string,
    page: number,
    query: SearchManyByCepQuery,
  ) {
    const pets = await prisma.pet.findMany({
      where: {
        cep,
        ...query,
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })
    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
