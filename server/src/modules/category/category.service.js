import { NotFoundError } from '../../utils/errors.js';
import BaseService from '../base/baseService.js';
import CategoryRepository from './category.repository.js';

class CategoryService extends BaseService {
  #categoryRepository;
  #serviceName;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#categoryRepository = repository;
    this.#serviceName = serviceName;
  }

  createCategory = async (categoryEntries) =>
    await this.#categoryRepository.createCategory(categoryEntries);

  getAllCategory = async () =>
    await this.#categoryRepository.getAllCategory()

}

export default new CategoryService(CategoryRepository, 'category');
