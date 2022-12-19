exports.post = async (repository, validator, req, res) => {
    try {
      let data = req.body
      if (!validator.isValid()) {
        res
          .status(400)
          .send({
            message: 'Erro ao na sua requisição.',
            validation: validator.errors()
          })
          .end()
        return
      }
      await repository.create(data)
      res.status(201).send('Requisição cadastrada.')
    } catch (err) {
      console.log('Erro no post ', err)
      res.status(500).send({
        message: 'Erro no processamento',
        error: err
      })
    }
  }
  
  exports.put = async (repository, validator, req, res) => {
    try {
      let data = req.body
      if (!validator.isValid()) {
        res
          .status(400)
          .send({
            message: 'Erro, dados inválidos na requisição',
            validation: validator.errors()
          })
          .end()
        return
      }
      await repository.update(req.params.id, data)
      res.status(202).send('Atualização realizada!')
    } catch (err) {
      console.log('Put com erro, motivo: ', err)
      res.status(500).send({
        message: 'Erro em seu processamento',
        error: err
      })
    }
  }
  
  exports.get = async (repository, req, res) => {
    try {
      let data = await repository.getAll()
      res.status(200).send(data)
    } catch (err) {
      console.log('Get com erro, motivo: ', err)
      res.status(500).send({
        message: 'Erro em seu processamento.',
        error: err
      })
    }
  }
  
  exports.getById = async (repository, req, res) => {
    try {
      let id = req.params.id
      if (id) {
        let data = await repository.getById(id)
        res.status(200).send(data)
      } else {
        res.status(400).send({
          message: 'ID não informado'
        })
      }
    } catch (err) {
      console.log('getByID com erro, motivo: ', err)
      res.status(500).send({
        message: 'Erro com processamento',
        error: err
      })
    }
  }
  
  exports.delete = async (repository, req, res) => {
    try {
      let id = req.params.id
      if (id) {
        await repository.delete(id)
        res.status(200).send({
          message: 'Documento excluído com sucesso.'
        })
      } else {
        res.status(400).send({
          message: 'ID precisa ser informado.'
        })
      }
    } catch (err) {
      console.log('Delete com erro, motivo: ', err)
      res.status(500).send({
        message: 'Erro no processamento',
        error: err
      })
    }
  }
  