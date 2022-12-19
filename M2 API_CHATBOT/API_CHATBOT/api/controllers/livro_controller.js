'use strict'

const livroRepository = require('../repositories/livro_respository')
const ctrlBase = require('../bin/base/controller-base')
const validators = require('../bin/lib/validators')
const _repo = new livroRepository()
const config = require('../config');

function livroController() {}

livroController.prototype.post = async (req, res) => {
  let _validator = new validators()

  _validator.isRequired(req.body.alunoId, 'Informe o Aluno')
  _validator.isRequired(req.body.emprestimoId, 'Informe o livro')
  _validator.isRequired(req.body.author, 'Informe o autor')
 

  ctrlBase.post(_repo, _validator, req, res)
}

livroController.prototype.put = async (req, res) => {
  let _validator = new validators()

  _validator.isRequired(req.body.alunoId, 'Informe o Aluno')
  _validator.isRequired(req.body.emprestimoId, 'Informe o livro')
  _validator.isRequired(req.body.author, 'Informe o autor')
  

  ctrlBase.put(_repo, _validator, req, res)
}

livroController.prototype.get = async (req, res) => {
  ctrlBase.get(_repo, req, res)
}

livroController.prototype.getById = async (req, res) => {
  ctrlBase.getById(_repo, req, res)
}

livroController.prototype.delete = async (req, res) => {
  ctrlBase.delete(_repo, req, res)
}

livroController.prototype.authenticate = async (req, res) => {
  let _validator = new validators()

  _validator.isRequired(req.body.email, 'Informe o seu email')
  _validator.isEmail(req.body.email, 'O email informado é inválido')
  _validator.isRequired(req.body.password, 'Informe a sua senha')

  if (!_validator.isValid()) {
    res.status(400).send({
      message: 'Não foi possível efetuar o Login!',
      validation: _validator.errors()
    })
  }

  let professor = await _repo.authenticate(req.body.email, req.body.password)
  if (professor) {
    res.status(200).send({
      professor: professor,
      token: jwt.sign(
        {
          user: professor
        },
        config.secretKey
      )
    })
  } else {
    res.status(404).send({
      message: 'Usuário e senha inválidos!'
    })
  }
}

module.exports = livroController
