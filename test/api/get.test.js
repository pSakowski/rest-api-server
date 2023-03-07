const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Concert = require('../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testConOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'Concert 1', genre: 'Genre 1', price: 40, day: 1, image: '#Image 1' });
    await testConOne.save();

    const testConTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: 'Concert 2', genre: 'Genre 2', price: 80, day: 2, image: '#Image 2' });
    await testConTwo.save();
  });

  it('should return a concert by performer', async () => {
    const res = await request(server).get('/api/concerts/performer/Concert 1');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(1);
  });

  it('should return a concert by genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Genre 1');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(1);
  });

  it('should return a concert by price', async () => {
    const res = await request(server).get('/api/concerts/price/10/50');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(1);
  });

  it('should return a concert by day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  after(async () => {
    await Concert.deleteMany({});
  });
});