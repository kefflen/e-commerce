import { Category } from '../../entities/Category'
import { AppError } from '../../errors/AppError'
import { CategoryService } from '../_contracts/CategoryService'

export class GetCategoryService extends CategoryService {
  async execute(categoryId: string): Promise<Category> {
    const category = await this.categoryRepository.getById(categoryId)

    if (!category) throw AppError.notFound('Category not found')

    return category
  }
}