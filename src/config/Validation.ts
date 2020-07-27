import { Joi } from 'celebrate';

export const createUser = {
  body: Joi.object().keys({
    Login: Joi.string().required(),
    Name: Joi.string().required(),
    Email: Joi.string().required().email(),
    Password: Joi.string().min(4).required(),
    ConfirmPassword: Joi.ref('Password'),
  })
};

export const sessionLogin = {
  body: Joi.object().keys({
    UserName: Joi.string().required(),
    Password: Joi.string().min(4).required(),
  })
};
