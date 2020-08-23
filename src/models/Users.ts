import { Model, Optional, DataTypes, Op } from 'sequelize';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { uuid } from 'uuidv4';

import dbConfig, { createdAt, updatedAt } from '../database';
import authConfig from '@config/Auth';

interface UserAttributes {
  Id: string;
  Login: string;
  Name: string;
  Email: string;
  Password: string | null;
  ConfirmPassword: string | null;
  Token: string | null;
  Hash: string;
}

type UserNewAttributes = Optional<UserAttributes, 'Id'>

class Users extends Model<UserAttributes, UserNewAttributes>
  implements UserAttributes {
  public Id!: string;
  public Login!: string;
  public Name!: string;
  public Email!: string;
  public Hash!: string;

  // Campos virtuais, usados apenas para geração do Hash
  public Password!: string;
  public ConfirmPassword!: string;

  // Campo virtual para o retorno do TOKEN gerado no momento do Login
  public Token!: string;

  // Timestamps
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public testPassword(_password: string): boolean {
    try {
      const hash = crypto.createHmac('sha512', this.Id);
      hash.update(_password);
      return this.Hash === hash.digest('hex');
    } catch (err) {
      return false;
    }
  }

  public getToken(): string {
    try {
      return jwt.sign({ Id: this.Id }, authConfig.Secret, {
        expiresIn: authConfig.ExpiresIn,
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  static async findByUserName(_userName: string): Promise<Users> {
    try {
      const user = await Users.findOne({
        where: {
          [Op.or]: [{ Login: _userName }, { Email: _userName }]
        }
      });
      return user;
    } catch (err) {
      return null;
    }
  }

  static async findDuplicateUserByLoginOrEmail(
    _login: string, _email: string): Promise<Users> {
    try {
      const user = await Users.findOne({
        where: {
          [Op.or]: [{ Login: _login }, { Email: _email }]
        }
      });
      return user;
    } catch (err) {
      return null;
    }
  }

  static async findUserById(_id: string, _attr?: string[]): Promise<Users> {
    try {
      const user = await Users.findOne({
        attributes: _attr,
        where: { Id: _id }
      });
      return user;
    } catch (err) {
      return null;
    }
  }
}

Users.init({
  Id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  Login: DataTypes.STRING,
  Name: DataTypes.STRING,
  Email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  Password: DataTypes.VIRTUAL,
  ConfirmPassword: DataTypes.VIRTUAL,
  Token: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.getToken();
    }
  },
  Hash: DataTypes.STRING
}, {
  tableName: 'Users',
  sequelize: dbConfig,
  createdAt,
  updatedAt,
});

Users.beforeCreate(async (user) => {
  user.Id = uuid();
  const hash = crypto.createHmac('sha512', user.Id);
  hash.update(user.Password);
  user.Hash = hash.digest('hex');
});

Users.beforeUpdate(async (user) => {
  if (user.Password) {
    const hash = crypto.createHmac('sha512', user.Id);
    hash.update(user.Password);
    user.Hash = hash.digest('hex');
  }
});

export default Users;
