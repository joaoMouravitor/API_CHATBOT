'use strict'

const express = require("express");
const cors = require("cors");
const config = require('./config');
const professorRoutes = require('./routes/professor_routes');
const alunoRoutes = require('./routes/aluno_routes');
const emprestimoRoutes = require('./routes/emprestimo_routes');
const livroRoutes = require('./routes/livro_routes');
const app = express();


app.use(express.json());

//definindo a do cors
app.use(cors());

//definindo as rotas
app.use('/api/professores', professorRoutes);
app.use('/api/alunos', alunoRoutes);
app.use('/api/emprestimos', emprestimoRoutes);
app.use('/api/livros', livroRoutes);

//definindo a porta onde o servidor estara ouvindo
app.listen(config.port, () => {
    console.log(`API rodando em ${config.url}`);
})