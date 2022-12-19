class livro {
    //implementando o construtor da classe
    constructor(id, name, description, author, pages) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.author = author;
        this.pages = pages;
    }
}

module.exports = livro;