import express from 'express';

import './database/connection';

const app = express();

// serve para o express entender json, qnd passar no body
app.use(express.json());

app.post('/users/:id', (request, response) => {
  return response.json({ message: 'Hello World' });
});

app.listen(3333);

// ROTA = conjunto (app.get('/users', (request, response) => {
//  return response.json({ message: 'Hello World' });});)

// RECURSO = usuário (users)

// Métodos HTTP = GET, POST, PUT DELETE
// GET = Buscar uma informação (lista, item)
// POST = Criando uma informação
// PUT = Editando uma informação
// DELETE = Deletando uma informação

// Parâmetros

// Query Params: http://localhost:3333/users?search=alison&page=2
// Query é utilizado para filtrar algo, paginação e etc

// Route Params: http://localhost:3333/users/1 (identificar um recurso)

//Body: é o corpo da requisição, que poderia ser um JSON

// Drive nativo, Query Builder, ORM

// Drive nativo se escreve na linguagem SQL
// Query Builder se escreve na linguagem javascript e dps converte pra SQL
// ORM se trabalha com classes, cada tabela vai ter sua própria classe, objeto e seus atributos
