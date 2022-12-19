'use strict'
const alunoRepository = require('../repositories/aluno_repository')
const config = require('../config');
const validators = require('../bin/lib/validators')
const _repo = new alunoRepository()
const ctrlBase = require('../bin/base/controller-base')
const jwt = require('jsonwebtoken');
const md5 = require('md5');


function alunoController() {}

alunoController.prototype.post = async (req, res) => {

  let _validator = new validators()
  _validator.isRequired(req.body.name, 'Informe o nome do Aluno')
  _validator.isRequired(req.body.email, 'Informe o seu email')
  _validator.isEmail(req.body.email, 'O email informado é inválido')

  ctrlBase.post(_repo, _validator, req, res)
}

alunoController.prototype.put = async (req, res) => {
  let _validator = new validators()

  _validator.isRequired(req.body.name, 'Informe o seu nome Aluno')
  _validator.isRequired(req.body.email, 'Informe o seu email')
  _validator.isEmail(req.body.email, 'O email informado é inválido')

  ctrlBase.put(_repo, _validator, req, res)
}

alunoController.prototype.get = async (req, res) => {
  ctrlBase.get(_repo, req, res)
}

alunoController.prototype.getById = async (req, res) => {
  ctrlBase.getById(_repo, req, res)
}

alunoController.prototype.delete = async (req, res) => {
  ctrlBase.delete(_repo, req, res)
}

alunoController.prototype.authenticate = async (req, res) => {
  let _validator = new validators()

  _validator.isRequired(req.body.email, 'Informe o seu email')
  _validator.isEmail(req.body.email, 'O email informado é inválido')
  _validator.isRequired(req.body.password, 'Informe a sua senha')

  if (!_validator.isValid()) {
    res.status(400).send({
      message: 'Não foi possível efetuar seu login',
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
      message: 'Usuário ou senha incorretos'
    })
  }
}

module.exports = alunoController
