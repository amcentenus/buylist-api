import 'dotenv/config';

import express from 'express';

import routes from './routes';

const server = express();
const porta = process.env.PORT || 3333;

server.use(express.json());
server.use(routes);

server.listen(porta);
