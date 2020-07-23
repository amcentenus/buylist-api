import { Router } from 'express';

import GenericsController from '@controllers/Generics';

const routes = Router();

routes.get('/', GenericsController.index);

export default routes;
