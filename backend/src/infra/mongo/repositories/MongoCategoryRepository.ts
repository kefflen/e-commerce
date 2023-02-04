import { Category } from '../../../domain/entities/Category'
import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository'
import { repositoryOptions } from '../../../domain/repositories/_contracts/IRepository'
import { CategoryModel } from '../models/CategoryModel'

export class MongoCategoryRepository implements ICategoryRepository {
  async list(options: repositoryOptions<Category>): Promise<Category[]> {
    let query = CategoryModel.find()

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

    const categorysData = await query

    return categorysData.map(
      (categoryData) => new Category(categoryData.toJSON()),
    )
  }

  async create(category: Category): Promise<Category> {
    const categoryData = new CategoryModel(category.toJSON())
    const newCategoryData = await categoryData.save()

    return new Category(newCategoryData.toJSON())
  }

  async update(category: Category): Promise<Category | null> {
    const updatedCategoryData = await CategoryModel.findOneAndUpdate(
      category.toJSON(),
    )

    if (!updatedCategoryData) return null

    return new Category(updatedCategoryData.toJSON())
  }

  async delete(id: string): Promise<void> {
    await CategoryModel.deleteOne({ _id: id })
  }

  async getById(id: string): Promise<Category | null> {
    const categoryData = await CategoryModel.findOne({ _id: id })

    if (!categoryData) return null

    return new Category(categoryData.toJSON())
  }

  async getBySlug(slug: string): Promise<Category | null> {
    const categoryData = await CategoryModel.findOne({ slug })

    if (!categoryData) return null

    return new Category(categoryData.toJSON())
  }
}
