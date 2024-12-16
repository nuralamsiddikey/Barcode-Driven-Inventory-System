import { Router } from 'express';
import ProductController from './product.controller.js';
const productRouter = Router();

productRouter
  .post('/products', ProductController.createProduct)
  .get('/products',ProductController.getAllProduct)
  .put('/products/category/:id',ProductController.updateProductCategory)

export default productRouter
