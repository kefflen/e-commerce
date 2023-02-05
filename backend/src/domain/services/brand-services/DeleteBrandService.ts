import { BrandService } from '../_contracts/BrandService'

export class DeleteBrandService extends BrandService {
  async execute(brandId: string): Promise<void> {
    await this.brandRepository.delete(brandId)
  }
}
