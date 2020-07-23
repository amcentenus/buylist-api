import { Sequelize } from 'sequelize';

export const createdAt = 'created_at';
export const updatedAt = 'updated_at';

export default new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});
