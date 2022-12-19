'use strict'

const express = require('express');
const controller = require('../controllers/professor_controller');
const router = express.Router();
const auth = require('../middlewares/authentication');


let _ctrl = new controller()

//definindo as rotas
router.post('/login', _ctrl.authenticate);
router.get('/', auth,  _ctrl.get);
router.get('/:id',auth, _ctrl.getById);
router.post('/',auth, _ctrl.post);
router.put('/:id',auth, _ctrl.put);
router.delete('/:id',auth, _ctrl.delete);

//exportando o modulo
module.exports = router;