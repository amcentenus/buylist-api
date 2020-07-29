import { Request, Response } from 'express';

import UsersModel from '@models/Users';

export default {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const { UserName, Password } = req.body;
      const user = await UsersModel.findByUserName(UserName);
      if (!user) {
        return res.status(404).json({
          message: 'Usuário não existente!'
        });
      }
      if (!user.testPassword(Password)) {
        return res.status(403).json({
          message: 'Usuário ou senha inválidos!'
        });
      }
      return res.json({ Token: user.Token });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
};
