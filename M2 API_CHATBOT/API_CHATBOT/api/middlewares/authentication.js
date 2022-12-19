const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = async (req, res, next) => {
  let token = req.body.token || req.query.query || req.headers['x-access-token']
  if (token) {
    try {
      let decoded = jwt.verify(token, config.secretKey)
      console.log(decoded)
      req.usuarioLogado = decoded
      next()
    } catch (error) {
      res.status(401).send({
        message: 'O token inválido.'
      })
    }
  } else {
    res.status(401).send({
      message: 'Para acessar, é necessário um Token correto!'
    })
  }
}
