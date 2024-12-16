import BaseRepository from '../base/baseRepository.js';
import Category from './category.model.js';

class CategoryRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }
  createCategory = async(categoryEntries)=> {
     const category = new this.#model(categoryEntries)
     return await category.save()
  }

  getAllCategory = async()=>{
    const condition = {};

    const categoriesWithProducts = await Category.aggregate([
      {
        $lookup: {
          from: 'products', 
          localField: '_id', 
          foreignField: 'category', 
          as: 'products', 
        },
      },
      {
        $project: {
          _id: 1,
          category_name: 1,
          status: 1,
          products: 1, 
          
        },
      },
    ]);

    return categoriesWithProducts;
  }

}

export default new CategoryRepository(Category);