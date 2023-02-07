import { Category, categoryDTO } from '../../entities/Category'
import { AppError } from '../../errors/AppError'
import { CategoryService } from '../_contracts/CategoryService'

export class UpdateCategoryService extends CategoryService {
  async execute(
    categoryDTO: Omit<categoryDTO, 'createdAt' | 'updatedAt'>,
  ): Promise<Category> {
    const category = await this.categoryRepository.getById(categoryDTO._id)

    if (!category) throw AppError.notFound('Category not found')
    category.update(categoryDTO)
    const updatedCategory = await this.categoryRepository.update(category)
    if (!updatedCategory)
      throw AppError.serverError('Updated category should not be null')

    return updatedCategory
  }
}
