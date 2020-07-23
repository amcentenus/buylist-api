import { Request, Response } from 'express';
import config from '../config';

export default {
  async index(req: Request, res: Response): Promise<Response> {
    try {
      return res.json(config);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
};
