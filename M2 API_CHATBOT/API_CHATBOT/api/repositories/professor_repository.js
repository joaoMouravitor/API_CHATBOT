const repBase = require('../bin/base/repository-base');
const md5 = require('md5');
const firebase = require('../db');
const firestore = firebase.firestore();

class professorRepository {
    constructor() {
        this._repBase = new repBase('professor', 'professores');
    }

    async create(data) {
        return await this._repBase.create(data);
    }

    async update(id, data) {
        return await this._repBase.update(id, {
            name: data.name,
            userName: data.userName,
            email: data.email,
            password: data.password,
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

    async authenticate(email, password) {
        let _hashPassword = md5(password);
        let professor
        const res = await firestore
          .collection('professores')
          .where('email', '==', email)
          .where('password', '==', _hashPassword)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              console.log(doc.id, ' => ', doc.data())
              professor = doc.data()
            })
          })
          return professor;
      }
}

module.exports = professorRepository;