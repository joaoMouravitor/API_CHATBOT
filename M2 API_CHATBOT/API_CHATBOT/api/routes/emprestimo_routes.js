'use strict'

//Importações

const express = require('express');
const controller = require('../controllers/emprestimo_controller');
const router = express.Router();
const auth = require('../middlewares/authentication');


let _ctrl = new controller()

//definindo as rotas
router.get('/',  _ctrl.get);
router.get('/:id', _ctrl.getById);
router.post('/', _ctrl.post);
router.put('/:id', _ctrl.put);
router.delete('/:id', auth, _ctrl.delete);

//exportando o modulo
module.exports = router;