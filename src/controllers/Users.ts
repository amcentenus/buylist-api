import { Request, Response } from 'express';
import UsersModel from '@models/Users';

export default {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const { Login: reqLogin, Email: reqEmail } = req.body;
      if (await UsersModel.findDuplicateUserByLoginOrEmail(
        reqLogin, reqEmail
      )) {
        return res.status(400).json({
          message: 'Login ou E-mail já cadastrado'
        });
      }
      await UsersModel.create(req.body);
      return res.status(201).json();
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
};
