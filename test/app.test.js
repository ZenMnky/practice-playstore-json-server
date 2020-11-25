const app = require('../app')
const { expect } = require('chai');
const supertest = require('supertest');

describe('App module', () => {
    describe('/apps endpoint', () => {
        it('exists', () => {
            return supertest(app)
                .get('/apps')
                .expect(200)
        })
    })

})