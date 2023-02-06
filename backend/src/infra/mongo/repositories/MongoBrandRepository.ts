import { Brand } from '../../../domain/entities/Brand'
import { IBrandRepository } from '../../../domain/repositories/IBrandRepository'
import { repositoryOptions } from '../../../domain/repositories/_contracts/IRepository'
import { BrandModel } from '../models/BrandModel'

export class MongoBrandRepository implements IBrandRepository {
  async list(options: repositoryOptions<Brand>): Promise<Brand[]> {
    let query = BrandModel.find()

    if (options.pagination) {
      const { take, page } = options.pagination
      query = query.limit(take).skip((page - 1) * take)
    }

    if (options.where) {
      query.where(options.where)
    }

    if (options.sortings) {
      query.sort(options.sortings)
    }

    const brandsData = await query

    return brandsData.map(
      (brandData) => new Brand(brandData.toJSON()),
    )
  }

  async create(brand: Brand): Promise<Brand> {
    const brandData = new BrandModel(brand.toJSON())
    const newBrandData = await brandData.save()

    return new Brand(newBrandData.toJSON())
  }

  async update(brand: Brand): Promise<Brand | null> {
    const updatedBrandData = await BrandModel.findOneAndUpdate(
      brand.toJSON(),
    )

    if (!updatedBrandData) return null

    return new Brand(updatedBrandData.toJSON())
  }

  async delete(id: string): Promise<void> {
    await BrandModel.deleteOne({ _id: id })
  }

  async getById(id: string): Promise<Brand | null> {
    const brandData = await BrandModel.findOne({ _id: id })

    if (!brandData) return null

    return new Brand(brandData.toJSON())
  }
}
