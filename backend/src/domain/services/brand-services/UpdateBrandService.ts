import { Brand, brandDTO } from '../../entities/Brand'
import { AppError } from '../../errors/AppError'
import { BrandService } from '../_contracts/BrandService'

export class UpdateBrandService extends BrandService {
  async execute(
    brandDTO: Omit<brandDTO, 'createdAt' | 'updatedAt'>,
  ): Promise<Brand> {
    const brand = await this.brandRepository.getById(brandDTO._id)

    if (!brand) throw AppError.notFound('Brand not found')
    const newBrand = brand.update(brandDTO)
    const updatedBrand = await this.brandRepository.update(newBrand)
    if (!updatedBrand)
      throw AppError.serverError('Updated brand should not be null')

    return updatedBrand
  }
}
