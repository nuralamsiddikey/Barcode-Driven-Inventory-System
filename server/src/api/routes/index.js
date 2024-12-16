import { Router } from 'express';

import orderRoute from '../../modules/product/product.route.js';
import categoryRoute from '../../modules/category/product.route.js'

const rootRouter = Router();

rootRouter.use(orderRoute);
rootRouter.use(categoryRoute)

export default rootRouter;
