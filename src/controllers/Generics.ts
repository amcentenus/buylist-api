import config from '../config';

import IRequestResponseDTO from '@dtos/IRequestResponseDTO'
import IResponseDTO from '@dtos/IResponseDTO'

export default {
  async index({req, res}: IRequestResponseDTO): Promise<IResponseDTO> {
    try {
      return res.json(config);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
};
