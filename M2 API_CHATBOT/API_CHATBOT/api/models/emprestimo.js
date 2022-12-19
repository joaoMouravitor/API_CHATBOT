class emprestimo {
    //implementando o construtor da classe
    constructor(id, alunoId, livroId, author, status) {
        this.id = id;
        this.alunoId = alunoId;
        this.livroId = livroId;
        this.author = author;
        this.status = status;
    }
}

module.exports = emprestimo;