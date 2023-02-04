import { Category } from '../../entities/Category'
import { CategoryService } from '../_contracts/CategoryService'

export class ListCategoriesService extends CategoryService {
  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list({})

    return categories
  }
}