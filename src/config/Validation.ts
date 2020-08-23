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

export const showUser = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  })
};

export const updateUser = {
  headers: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
  body: Joi.object().keys({
    Login: Joi.string(),
    Name: Joi.string(),
    Email: Joi.string().email(),
    OldPassword: Joi.string(),
    NewPassword: Joi.string(),
    ConfirmNewPassword: Joi.ref('NewPassword'),
    userID: Joi.string().required()
  })
};
