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
        it('returns an error if sort is provided but not equal to rating nor app', () => {
            return supertest(app)
                .get('/apps')
                .query({ sort: 'INVALID' })
                .expect(400)
        })
        // returns an error if sort does not have a value
        // returns an error if genre is not a valid type
        // returns an error if genre does not have a value
        // filters by genre correctly
        // sorts by app correctly
        // it sorts by rating correctly
    })

})