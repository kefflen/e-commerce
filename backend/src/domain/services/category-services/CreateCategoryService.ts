import { Category } from '../../entities/Category'
import { CategoryService } from '../_contracts/CategoryService'

export class CreateCategoryService extends CategoryService {
  async execute(name: string): Promise<Category> {
    const category = Category.create({ name })
    const savedCategory = await this.categoryRepository.create(category)

    return savedCategory
  }
}