import { Request, Response } from 'express';
import UsersModel from '@models/Users';

export default {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const { Id, Login, Name, Email } = await UsersModel.create(req.body);
      return res.json({ Id, Login, Name, Email });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
};
