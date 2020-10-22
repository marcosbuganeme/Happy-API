import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan'

// serve para lidar com erros/exceções async
import 'express-async-errors';

import './database/connection';
import routes from './routes';
// Informando a mensagem de erro
import errorHandler from './errors/handler';

const app = express();

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// serve para o express entender json, qnd passar no body
app.use(express.json());
app.use(routes);

/**
 * Acessando as imagens que estão dentro da api.
 * se usa sempre o path quando for mexer com caminhos.
 */
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

export default app