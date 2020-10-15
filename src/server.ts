import express from 'express';

import './database/connection';
import routes from './routes';

const app = express();

// serve para o express entender json, qnd passar no body
app.use(express.json());
app.use(routes);

app.listen(3333);
