export type repositoryOptions = {
  pagination?: {
    take: number
    page: number
  }
}

export interface IRepository<T extends { id: unknown }> {
  create(entitie: T): Promise<T>
  list(options: repositoryOptions): Promise<T[]>
  update(entitie: T): Promise<T | null>
  delete(id: T['id']): Promise<void>
  getById(id: T['id']): Promise<T | null>
}
