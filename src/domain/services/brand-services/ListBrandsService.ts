import { Brand } from '../../entities/Brand'
import { BrandService } from '../_contracts/BrandService'

export class ListCategoriesService extends BrandService {
  async execute(): Promise<Brand[]> {
    const categories = await this.brandRepository.list({})

    return categories
  }
}
