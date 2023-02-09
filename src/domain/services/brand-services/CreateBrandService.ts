import { Brand } from '../../entities/Brand'
import { BrandService } from '../_contracts/BrandService'

export class CreateBrandService extends BrandService {
  async execute(name: string): Promise<Brand> {
    const brand = Brand.create({ name })
    const savedBrand = await this.brandRepository.create(brand)

    return savedBrand
  }
}
