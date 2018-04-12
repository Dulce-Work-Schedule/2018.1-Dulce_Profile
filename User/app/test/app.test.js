var assert = require('assert');
var request = require('supertest');
var mongo    = require('mongoose');
var should = require('should');

describe('Routing', function() {
  var url = 'http://localhost:8080';

  describe('Login', function() {
    it('should create a new user', function(done){
      var profile = {
        name: 'gui',
        registration: '12345',
        password: 'test',
        manager: true
      };
	request(url)
		.post('/user/add')
		.send(profile)//Status code
		.end(function(err,res) {
			if (err) {
				throw err;
			}
	    res.body.name.should.equal('gui');
	    res.body.registration.should.equal('12345');
	    res.body.manager.should.equal(true);
			done();
		});
	});

  it('should return a json', function(done){
    var profile = {
      registration: '1234',
      password: 'test',
    };
request(url)
  .post('/user/login')
  .send(profile)//Status code
  .end(function(err,res) {
    if (err) {
      throw err;
    }
    res.should.be.json;
    done();
  });
});

  });
});
