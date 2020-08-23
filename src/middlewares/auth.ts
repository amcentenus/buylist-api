import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import authConfig from '../config/Auth';

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido!' });
  }
  const [, token] = authHeader.split(' ');
  try {
    const decode = <any>jwt.verify(token, authConfig.Secret);
    req.body = { ...req.body, userID: decode.Id };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido!' });
  }
};
