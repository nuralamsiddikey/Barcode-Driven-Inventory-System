// import { OrderCancelReason } from '../../models/index.js';
import BaseRepository from '../base/baseRepository.js';
import Product from './product.model.js';

class ProductRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }
  createProduct = async(productEntries)=>{
     const product = new this.#model(productEntries)
     return await product.save()
  }
  getAllProduct = async(reqQuery)=>{
    const {category} = reqQuery
    const condition = {}

    if(category)
      condition.category = category

   return await this.#model.find(condition)
  }

  updateProductCategory = async(id,category) => {
    return await this.#model.findByIdAndUpdate(
      id,
      {category},
      {new: true}
    )
  }
}

export default new ProductRepository(Product);
