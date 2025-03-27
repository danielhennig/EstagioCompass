const express = require('express');

const server = express();

//queri params = ?node_NodeJS
//route params = /curso/2
//request body = { nome: "Node.js", tipo: "backend" }


const cursos = ['Node.js', 'Javascript', 'React Native'];


// localhost:3000/curso
server.get('/curso/:index', (req, res) => {
  const { index } = req.params;


  return res.json(cursos[index]);

});
server.listen(3000);