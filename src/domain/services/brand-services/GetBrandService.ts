import { Brand } from '../../entities/Brand'
import { AppError } from '../../errors/AppError'
import { BrandService } from '../_contracts/BrandService'

export class GetBrandService extends BrandService {
  async execute(brandId: string): Promise<Brand> {
    const brand = await this.brandRepository.getById(brandId)

    if (!brand) throw AppError.notFound('Brand not found')

    return brand
  }
}
