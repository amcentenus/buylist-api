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
  },
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await UsersModel.findUserById(id, ['Login', 'Name', 'Email']);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado!' });
      }
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
  async update(req: Request, res: Response): Promise<Response> {
    try {

      const {
        Login, Name, Email, OldPassword, NewPassword, userID
      } = req.body;

      const user = await UsersModel.findUserById(userID);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado!' });
      }

      if (OldPassword) {
        if (!user.testPassword(OldPassword)) {
          return res.status(401)
            .json({ message: 'A senha fornecida não está correta!' });
        }
        user.Password = NewPassword;
      }

      if (Login && Login !== user.Login) { user.Login = Login };
      if (Name && Name !== user.Name) { user.Name = Name };
      if (Email && Email !== user.Email) { user.Email = Email };

      await user.save();

      res.status(200).json({ message: 'Alteração efetuada com sucesso!' })

    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
};
