import catchError from '../../middleware/errors/catchError.js';
import { BadRequestError } from '../../utils/errors.js';
import responseHandler from '../../utils/responseHandler.js';
import CategoryService from './category.service.js';
import { categoryValidate} from './category.validate.js';


class CategoryController {
  #categoryService;
  constructor(categoryService) {
    this.#categoryService = categoryService;
  }

  createCategory = catchError(async (req, res, next) => {
    const { error, value } = categoryValidate(req.body)

    if (error) {
      throw new BadRequestError(error.message)
    }
    const data = await this.#categoryService.createCategory(value);
    const resDoc = responseHandler(201, 'Category created successfully', data);
    res.status(resDoc.statusCode).json(resDoc);
  })


  getAllCategory = catchError(async (req, res, next) => {
    const data = await this.#categoryService.getAllCategory();
    const resDoc = responseHandler(201, 'Category fetched successfully', data);
    res.status(resDoc.statusCode).json(resDoc);
  })

}

export default new CategoryController(
  CategoryService
);
