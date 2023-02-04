import { ICategoryRepository } from '../../repositories/ICategoryRepository'

export type categoryServiceDepedencies = {
  categoryRepository: ICategoryRepository
}

export abstract class CategoryService {
  protected readonly categoryRepository: ICategoryRepository

  constructor(dependencies: categoryServiceDepedencies) {
    this.categoryRepository = dependencies.categoryRepository
  }

  abstract execute(...args: unknown[]): Promise<unknown>
}
