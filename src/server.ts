import express from 'express';

const server = express();
const porta = process.env.PORT || 3333;

server.use(express.json());


server.listen(porta);