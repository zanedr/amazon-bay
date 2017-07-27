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

it.skip("should return a 404 for a route that does not exist", (done) => {
    chai.request(server)
    .get("/secretOfLife")
    .end((err, response) => {
      response.should.have.status(404)
      done()
    })
  })
})