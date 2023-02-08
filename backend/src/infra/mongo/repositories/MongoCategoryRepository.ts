import { Category, categoryDTO } from '../../../domain/entities/Category'
import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository'
import { CategoryModel } from '../models/CategoryModel'
import { MongoRepository } from './MongoRepository'

export class MongoCategoryRepository
  extends MongoRepository<typeof CategoryModel, Category, categoryDTO>
  implements ICategoryRepository {}
