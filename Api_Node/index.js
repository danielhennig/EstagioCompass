const express = require('express');

const server = express();

server.use(express.json());

//queri params = ?node_NodeJS
//route params = /curso/2
//request body = { nome: "Node.js", tipo: "backend" }

//Crud > create, read, update, delete
//Métodos HTTP > GET, POST, PUT, DELETE

const cursos = ['Node.js', 'Javascript', 'React Native'];

//Middleware global
server.use((req, res, next) => {
  console.log(`URL CHAMADA: ${req.url}`);

  return next();
});

function checkCurso(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'name é obrigatório' });
  }
  return next();
}

function checkIndexCurso(req, res, next) {
  const curso = cursos[req.params.index];


  if (!curso) {
    return res.status(400).json({ error: 'Curso não existe' });
  }

  req.curso = curso;
  return next();
}



server.get('/cursos', (req, res) => {
  return res.json(cursos);
});


// localhost:3000/cursos
server.get('/cursos/:index', checkIndexCurso, (req, res) => {
  return res.json(req.curso); //req.curso é o curso que foi verificado no middleware checkIndexCurso

});

//criando novo curso
server.post('/cursos', checkCurso, (req, res) => {
  const { name } = req.body;
  cursos.push(name);

  return res.json(cursos);
});

//atualizando curso
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  cursos[index] = name;

  return res.json(cursos);
});

//deletando curso
server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
  const { index } = req.params;

  cursos.splice(index, 1);

  return res.json(cursos);
});

server.listen(3000);