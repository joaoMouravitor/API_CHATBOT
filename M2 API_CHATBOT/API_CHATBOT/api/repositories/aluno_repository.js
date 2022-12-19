const repBase = require('../bin/base/repository-base');

class alunoRepository {
    constructor() {
        this._repBase = new repBase('aluno', 'alunos');
    }

    async create(data) {
        return await this._repBase.create(data);
    }

    async update(id, data) {
        return await this._repBase.update(id, {
            name: data.name,
            email: data.email,
            registration: data.registration
           
        });
    }

    async getAll() {
        return await this._repBase.getAll();
    }

    async getById(id) {
       return await this._repBase.getById(id);
    }

    async delete(id) {
        return await this._repBase.delete(id);
    }
}

module.exports = alunoRepository;