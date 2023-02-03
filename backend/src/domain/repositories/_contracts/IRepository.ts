export type repositoryOptions<T> = {
  pagination?: {
    take: number
    page: number
  }
  where?: IQueryOptions<T>
  sortings?: ISortingsOptions<T>
}

export type ISortingsOptions<T> = {
  [k in keyof T as T[k] extends string | number | Date ? k : never]?: 1 | -1
}

export type IQueryOptions<T> = {
  [k in keyof T as T[k] extends string | number | Date ? k : never]?:
    | T[k]
    | {
        $lte: T[k]
        $gte: T[k]
      }
}

export interface IRepository<T extends { id: unknown }> {
  create(entitie: T): Promise<T>
  list(options: repositoryOptions<T>): Promise<T[]>
  update(entitie: T): Promise<T | null>
  delete(id: T['id']): Promise<void>
  getById(id: T['id']): Promise<T | null>
}
