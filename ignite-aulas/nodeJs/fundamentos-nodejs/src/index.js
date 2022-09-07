const express = require('express');

const app = express();

app.use(express.json());

app.get('/courses', (req, res) => {
  const query = request.query;
  console.log(query);

  return res.status(200).json(['Curso 1', 'Curso 2', 'Curso 3']);
});

app.post('/courses', (req, res) => {
  const body = request.body;
  console.log(body);

  return res.status(200).json(['Curso 1', 'Curso 2', 'Curso 3', 'Curso 4']);
});

app.put('/courses/:id', (req, res) => {
  const { id } = request.params;
  console.log(id);

  return res.status(200).json(['Curso 6', 'Curso 2', 'Curso 3', 'Curso 4']);
});

app.patch('/courses/:id', (req, res) => {
  return res.status(200).json(['Curso 6', 'Curso 7', 'Curso 3', 'Curso 4']);
});

app.delete('/courses/:id', (req, res) => {
  return res.status(200).json(['Curso 6', 'Curso 7', 'Curso 4']);
});


app.listen(3333);