import { Router } from 'express';

import orderRoute from '../../modules/product/product.route.js';


const rootRouter = Router();
rootRouter.use(orderRoute);

export default rootRouter;
