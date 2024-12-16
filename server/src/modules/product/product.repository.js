// import { OrderCancelReason } from '../../models/index.js';
import BaseRepository from '../base/baseRepository.js';
import Category from '../category/category.model.js';
import Product from './product.model.js';


class ProductRepository extends BaseRepository {
  #model
  #categoryModel
  constructor(model,categoryModel) {
    super(model);
    this.#model = model;
    this.#categoryModel = categoryModel
  }
  createProduct = async (productEntries) => {
    let uncategorizedCategory = await Category.findOne({ category_name: 'Uncategorized' });
    if (!uncategorizedCategory) {
      uncategorizedCategory = await Category.create({ category_name: 'Uncategorized' });
    }
   
    productEntries.category = uncategorizedCategory._id

    const product = new this.#model(productEntries);
    return await product.save();
  };
  getAllProduct = async (reqQuery) => {
    const { category } = reqQuery;
    const condition = {};

    if (category) condition.category = category;

    return await this.#model.find(condition).populate({
      path: 'category',
      select: 'category_name',
    });
  };

  updateProductCategory = async (id, category) => {
    return await this.#model.findByIdAndUpdate(id, { category }, { new: true });
  };
}

export default new ProductRepository(Product,Category);
