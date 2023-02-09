import { Document } from 'mongoose'
import { Brand, brandDTO } from '../../../domain/entities/Brand'
import { IBrandRepository } from '../../../domain/repositories/IBrandRepository'
import { BrandModel } from '../models/BrandModel'
import { MongoRepository } from './MongoRepository'

export class MongoBrandRepository
  extends MongoRepository<typeof BrandModel, Brand, brandDTO>
  implements IBrandRepository {}
