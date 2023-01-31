
export interface IRepository<T extends { id: unknown }> {
  create(entitie: T): Promise<T>
  list(): Promise<T[]>
  update(entitie: T): Promise<T|null>
  delete(id: T['id']): Promise<void>
  getById(id: T['id']): Promise<T|null>
}