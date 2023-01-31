type ratings = {
  stars: number
  postedBy: string
}

export type productDTO = {
  title: string
  slug: string
  description: string
  price: number
  categoryId: string
  brand: string
  quantity: number
  imagesPaths: string[]
  color: string
  sold: number
  ratings: ratings
  createdAt: Date
  updatedAt: Date
}

export class Product {
  private readonly _title: string
  private readonly _slug: string
  private readonly _description: string
  private readonly _price: number
  private readonly _categoryId: string
  private readonly _brand: string
  private readonly _quantity: number
  private readonly _imagesPaths: string[]
  private readonly _color: string
  private readonly _sold: number
  private readonly _ratings: ratings
  private readonly _createdAt: Date
  private readonly _updatedAt: Date

  constructor(productDTO: productDTO) {
    this._title = productDTO.title
    this._slug = productDTO.slug
    this._description = productDTO.description
    this._price = productDTO.price
    this._categoryId = productDTO.categoryId
    this._brand = productDTO.brand
    this._quantity = productDTO.quantity
    this._imagesPaths = productDTO.imagesPaths
    this._color = productDTO.color
    this._sold = productDTO.sold
    this._ratings = productDTO.ratings
    this._createdAt = productDTO.createdAt
    this._updatedAt = productDTO.updatedAt
  }

  toJSON(): productDTO {
    return {
      title: this.title,
      brand: this.brand,
      categoryId: this.categoryId,
      color: this.color,
      description: this.description,
      imagesPaths: this.imagesPaths,
      price: this.price,
      quantity: this.quantity,
      ratings: this.ratings,
      slug: this.slug,
      sold: this.sold,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  update(productDTO: Partial<productDTO>): Product {
    return new Product({
      title: productDTO.title || this.title,
      brand: productDTO.brand || this.brand,
      categoryId: productDTO.categoryId || this.categoryId,
      color: productDTO.color || this.color,
      description: productDTO.description || this.description,
      imagesPaths: productDTO.imagesPaths || this.imagesPaths,
      price: productDTO.price || this.price,
      quantity: productDTO.quantity || this.quantity,
      ratings: productDTO.ratings || this.ratings,
      slug: productDTO.slug || this.slug,
      sold: productDTO.sold || this.sold,
      createdAt: productDTO.createdAt || this.createdAt,
      updatedAt: productDTO.updatedAt || this.updatedAt,
    })
  }

  get title(): string {
    return this._title
  }

  get slug(): string {
    return this._slug
  }

  get description(): string {
    return this._description
  }

  get price(): number {
    return this._price
  }

  get categoryId(): string {
    return this._categoryId
  }

  get brand(): string {
    return this._brand
  }

  get quantity(): number {
    return this._quantity
  }

  get imagesPaths(): string[] {
    return this._imagesPaths
  }

  get color(): string {
    return this._color
  }

  get sold(): number {
    return this._sold
  }

  get ratings(): ratings {
    return this._ratings
  }

  get createdAt(): Date {
    return this._createdAt
  }

  get updatedAt(): Date {
    return this._updatedAt
  }
}
