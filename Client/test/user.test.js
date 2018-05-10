var assert = require('assert');
var request = require('supertest');
var mongo = require('mongoose');
var should = require('should');
var express = require('express');

var app = require('../client_user')

describe('should test new user creation', () => {
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
        console.log(res)
        console.log('oi')
        res.body.name.should.equal('gui');



      });
    });
  });
