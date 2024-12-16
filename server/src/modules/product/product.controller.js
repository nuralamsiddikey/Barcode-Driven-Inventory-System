import catchError from '../../middleware/errors/catchError.js';
import { BadRequestError } from '../../utils/errors.js';
import { idValidate } from '../../utils/requestValidate.js';
import responseHandler from '../../utils/responseHandler.js';
import ProductService from './product.service.js';
import { productCategoryUpdateValidate, productQueryValidate, productValidate} from './product.validate.js';

class ProductController {
  #productService;
  constructor(productService) {
    this.#productService = productService;
  }

  createProduct = catchError(async (req, res, next) => {
    const { error, value } = productValidate(req.body)
    if (error) {
      throw new BadRequestError(error.message)
    }
    const data = await this.#productService.createProduct(value);
    const resDoc = responseHandler(201, 'Product created successfully', data);
    res.status(resDoc.statusCode).json(resDoc);
  })

  getAllProduct = catchError(async (req, res, next) => {
    const {error,value:reqQuery} = productQueryValidate(req.query)
    if(error){
      throw new BadRequestError(error.message)
    }
    const data = await this.#productService.getAllProduct(reqQuery);
    const resDoc = responseHandler(200, 'Successfully fetched successfully', data);
    res.status(resDoc.statusCode).json(resDoc);
  });


  updateProductCategory = catchError(async (req, res, next) => {
     const { id } = req.params;
    const {error: reqBodyError,value:category} = productCategoryUpdateValidate(req.body)

    if(reqBodyError){
      throw new BadRequestError(reqBodyError.message)
    }

     await this.#productService.updateProductCategory(
      id,
      category.category
    )
     const resDoc = responseHandler(200, 'Successfully updated product category');
     res.status(resDoc.statusCode).json(resDoc);
  })


}

export default new ProductController(
  ProductService
);
