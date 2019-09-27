const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../dist/test/server');

chai.should();
chai.use(chaiHttp);

describe('Express Power Router', () => {
  it('should get result', (done) => {
    chai.request(server)
      .get('/myController')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('result').equal('I can return a promise!');
        res.body.should.have.property('anotherResult').equal('The result has been changed!');
        done();
      });
  });

  it('should get result with custom end', (done) => {
    chai.request(server)
      .get('/myController/customEnd')
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.equal('my custom end');
        done();
      });
  });

  it('should throw error', (done) => {
    chai.request(server)
      .post('/myController/throwError')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').equal('My error message');
        done();
      });
  });
});