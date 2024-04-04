import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetRepository, SearchManyByCepQuery } from '../pet-repository'

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []

  async searchManyByCep(cep: string, page: number, q: SearchManyByCepQuery) {
    return this.items
      .filter(
        (item) =>
          item.cep === cep &&
          (!q.age || item.age === new Prisma.Decimal(Number(q.age))) &&
          (!q.energy || item.energy === new Prisma.Decimal(Number(q.energy))) &&
          (!q.dependency || item.dependency === q.dependency) &&
          (!q.ambient || item.ambient === q.ambient),
      )
      .slice((page - 1) * 20, page * 20)
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }
    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      institution_id: data.institution_id,
      name: data.name,
      cep: data.cep,
      description: data.description,
      age: new Prisma.Decimal(Number(data.age)),
      energy: new Prisma.Decimal(Number(data.energy)),
      port: data.port,
      dependency: data.dependency,
      ambient: data.ambient,
      requirements: data.requirements,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
