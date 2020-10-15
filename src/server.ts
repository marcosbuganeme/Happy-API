import express from 'express';
import path from 'path';

import './database/connection';
import routes from './routes';

const app = express();

// serve para o express entender json, qnd passar no body
app.use(express.json());
app.use(routes);

/**
 * Acessando as imagens que estão dentro da api.
 * se usa sempre o path quando for mexer com caminhos.
 */
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(3333);
