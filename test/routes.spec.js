const chai = require("chai")
const should = chai.should()
const chaiHttp = require("chai-http")
const server = require("../server.js")

process.env.NODE_ENV = "test"
const environment = "test"
const configuration = require("../knexfile")[environment]
const database = require("knex")(configuration)

chai.use(chaiHttp)

describe("client routes", () => {
  it("should return homepage", (done) => {
    chai.request(server).get("/")
    .end((err, response) => {
      response.should.have.status(200)
      response.should.be.html
      done()
    })
  })

it("should return a 404 for a route that does not exist", (done) => {
    chai.request(server)
    .get("/coffee")
    .end((err, response) => {
      response.should.have.status(404)
      done()
    })
  })
})

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
    .then(() => done());
  });

  beforeEach((done) => {
    database.seed.run()
    .then(() => {
      done();
    });
  });

it('GET: should return all items in db', (done) => {
    chai.request(server)
    .get('api/v1//items')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.json;
      response.body.should.be.a('array');
      response.body.length.should.equal(4);
      response.body[0].should.have.property('title');
      done();
    });
  });

  it('GET: purchase history should initially be empty', (done) => {
    chai.request(server)
    .get('/api/v1/purchasehistory')
    .end((err, response) => {
      response.should.have.status(404);
      response.should.be.json;
      response.body.should.be.a('object');
      response.body.should.have.property('error');
      done();
    });
  });
});