import { CategoryService } from '../_contracts/CategoryService'

export class DeleteCategoryService extends CategoryService {
  async execute(categoryId: string): Promise<void> {
    await this.categoryRepository.delete(categoryId)
  }
}
