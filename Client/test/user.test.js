var assert = require('assert');
var request = require('supertest');
var mongo = require('mongoose');
var should = require('should');
var express = require('express');

var app = express();

describe('should test new user creation', () => {
  this.timeout(15000);
    it('should create a new user',(done) => {
      var profile = {
        name: 'gui',
        registration: '12345',
        hospital: 'gama',          //creating a user to send
        sector: 'gama',
        password: 'test',
        manager: true
      };
      request(app)
      .post('/api/userManager/create')
      .send(profile)    //sending user to api
      .end((err,res) => {
        res.body.name.should.equal('gui');
        res.body.registration.should.equal('12345');
        res.body.manager.should.equal(true);
        res.body.hospital.should.equal('gama');
        res.body.sector.should.equal('gama');
        res.body.password.should.equal('test');
        res.status.should.expect(200, done);
      });
    });
  });
