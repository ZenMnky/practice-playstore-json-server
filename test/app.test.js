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
        // returns an error if genre does not have a value

        it('returns a JSON array of apps', () => {
            return supertest(app)
                .get('/apps')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.lengthOf.at.least(10);//>= 10
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]).to.includes.keys('App', 'Category', 'Genres');
                })
        } )

        it('returns an error if genre is not a valid type', () => {

        })

        it('filters by genre', () => {

        })
        it('sorts by app title', () => {
            return supertest(app)
                .get('/apps')
                .query({ genres: 'Card' })
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    let sorted = true;

                    let i = 0;

                    while (i < res.body.length -1 ){
                        const itemAtI = res.body[i];
                        const itemAtIPlus1 = res.body[i + 1];

                        if (itemAtIPlus1.App <itemAtI){
                            //items were not sorted correctly
                            sorted = false;
                            break; //exit the loop
                        }
                        i++;
                    }
                    expect(sorted).to.be.true;


                })
        })
        it('it sorts by rating', () => {

        })
    })

})