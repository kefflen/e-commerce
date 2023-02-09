import { IBrandRepository } from '../../repositories/IBrandRepository'

export type brandServiceDepedencies = {
  brandRepository: IBrandRepository
}

export abstract class BrandService {
  protected readonly brandRepository: IBrandRepository

  constructor(dependencies: brandServiceDepedencies) {
    this.brandRepository = dependencies.brandRepository
  }

  abstract execute(...args: unknown[]): Promise<unknown>
}
