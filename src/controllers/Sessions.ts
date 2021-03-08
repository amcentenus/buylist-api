import UsersModel from '@models/Users';

import IRequestResponseDTO from '@dtos/IRequestResponseDTO'
import IResponseDTO from '@dtos/IResponseDTO'

export default {
  async store({req, res}: IRequestResponseDTO): Promise<IResponseDTO> {
    try {
      const { UserName, Password } = req.body;
      const user = await UsersModel.findByUserName(UserName);
      if (!user) {
        return res.status(404).json({
          message: 'Usuário não existente!'
        });
      }
      if (!user.testPassword(Password)) {
        return res.status(400).json({
          message: 'Usuário ou senha inválidos!'
        });
      }
      const { Id, Login, Name, Email, Token } = user;
      return res.json({ Id, Login, Name, Email, Token });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
};
