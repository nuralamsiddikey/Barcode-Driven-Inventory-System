import { Router } from 'express';
import CategoryController from './category.controller.js';
const categoryRouter = Router();

categoryRouter
  .post('/categories', CategoryController.createCategory)
  .get('/categories',CategoryController.getAllCategory)

export default categoryRouter
