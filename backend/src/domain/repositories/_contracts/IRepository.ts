export type repositoryOptions<T> = {
  pagination?: {
    take: number
    page: number
  }
  where?: IQueryOptions<T>
}

export type IQueryOptions<T> = {
  [k in keyof T as T[k] extends Function ? never : k]?:
    | T[k]
    | {
        lte: T[k]
        gte: T[k]
      }
}

export interface IRepository<T extends { id: unknown }> {
  create(entitie: T): Promise<T>
  list(options: repositoryOptions<T>): Promise<T[]>
  update(entitie: T): Promise<T | null>
  delete(id: T['id']): Promise<void>
  getById(id: T['id']): Promise<T | null>
}
