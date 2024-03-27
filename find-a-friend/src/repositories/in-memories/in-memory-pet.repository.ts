import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetRepository } from '../pet-repository'

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      institution_id: data.institution_id,
      name: data.name,
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
