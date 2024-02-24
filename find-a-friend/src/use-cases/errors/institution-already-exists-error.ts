export class InstitutionAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
