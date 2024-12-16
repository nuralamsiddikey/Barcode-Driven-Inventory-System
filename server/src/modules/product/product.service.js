import { NotFoundError } from '../../utils/errors.js';
import BaseService from '../base/baseService.js';
import ProductRepository from './product.repository.js';

class ProductService extends BaseService {
  #productRepository;
  #serviceName;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#productRepository = repository;
    this.#serviceName = serviceName;
  }

  createProduct = async (productEntries) =>
    await this.#productRepository.createProduct(productEntries);

  getAllProduct = async (reqQuery) =>
    await this.#productRepository.getAllProduct(reqQuery)

  updateProductCategory = async (id,category) => {
    const updatedProduct = await this.#productRepository.updateProductCategory(id,category)
    if(!updatedProduct){
      throw new NotFoundError("Did not found the product")
    }
    return updatedProduct
  }
    

}

export default new ProductService(ProductRepository, 'product');
