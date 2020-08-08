import { Router } from 'express';
import { celebrate } from 'celebrate';

import { createUser, sessionLogin, showUser } from '@config/Validation';

import GenericsController from '@controllers/Generics';
import UsersController from '@controllers/Users';
import SessionController from '@controllers/Sessions';

const routes = Router();

routes.get('/', GenericsController.index);

routes.post('/users', celebrate(createUser), UsersController.store);
routes.get('/users/:id', celebrate(showUser), UsersController.show);

routes.post('/sessions', celebrate(sessionLogin), SessionController.store);

export default routes;
