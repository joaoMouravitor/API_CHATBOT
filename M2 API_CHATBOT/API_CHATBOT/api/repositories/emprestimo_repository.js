const repBase = require('../bin/base/repository-base');

class emprestimoRepository {
    constructor() {
        this._repBase = new repBase('emprestimo', 'emprestimos');
    }

    async create(data) {
        return await this._repBase.create(data);
    }

    async update(id, data) {
        return await this._repBase.update(id, {
            alunoId: data.alunoId,
            livroId: data.livroId,
            authorId: data.authorId,
            statusId: data.statusId

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

module.exports = emprestimoRepository;