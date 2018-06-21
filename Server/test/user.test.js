var Seneca = require('seneca')
var assert = require('assert')
var chai = require('chai')


var expect = chai.expect;

function test_user_seneca (fin){
  return Seneca({log: 'test'})
  .test(fin)

  .use("entity")
  .use(require('../_user'))
}

describe('Create user', function() {

  it('User entity creation', function(fin){
    var seneca = test_user_seneca(fin)

    seneca.act({
      role: 'profile',
      cmd: 'create',
      registration : "123456",
      user_type : "123456",
      speciality : "123456",
      user_id : "123456",
      sector_id : "123456",
      hospital_id : "123456"
    }, function(err, result){
      expect(result.registration).to.equal('123456')
      expect(result.user_type).to.equal('123456')
      expect(result.speciality).to.equal('123456')
      expect(result.user_id).to.equal('123456')
      expect(result.sector_id).to.equal('123456')
      expect(result.hospital_id).to.equal('123456')
      fin()
    })
  });

  it('User entity edit', function(fin){
    var seneca = test_user_seneca(fin)

    seneca.act({
      role: 'profile',
      cmd: 'create',
      registration : "140145575",
      user_type : "employee",
      speciality : "Reprovar",
      user_id : "123456",
      sector_id : "654312",
      hospital_id : "123456"
    }, function(err, result){
      seneca.act({
        role: 'profile',
        cmd: 'edit',
        registration : "140144474",
        user_type : "sector_manager",
        speciality : "Fazer os outros reprovarem",
        user_id : "654321",
        sector_id : "123456",
        hospital_id : "654321",
        profile_id : result.id
      }, function(err, result){
        expect(result.registration).to.equal('140144474')
        expect(result.user_type).to.equal('sector_manager')
        expect(result.speciality).to.equal("Fazer os outros reprovarem")
        expect(result.user_id).to.equal('654321')
        expect(result.sector_id).to.equal('123456')
        expect(result.hospital_id).to.equal('654321')
        fin()
      })
    })
  })

  it('User entity list', function(fin){
    var seneca = test_user_seneca(fin)

    seneca.act({
      role: 'profile',
      cmd: 'create',
      registration : "140145575",
      user_type : "employee",
      speciality : "Reprovar",
      user_id : "123456",
      sector_id : "654312",
      hospital_id : "123456"
    }, function(err, result){
      seneca.act({
        role: 'profile',
        cmd: 'list',
        user_id : result.user_id
      }, function(err, result){
        expect(result[0].registration).to.equal('140145575')
        expect(result[0].user_type).to.equal('employee')
        expect(result[0].speciality).to.equal("Reprovar")
        expect(result[0].user_id).to.equal('123456')
        expect(result[0].sector_id).to.equal('654312')
        expect(result[0].hospital_id).to.equal('123456')
        fin()
      })
    })
  })

  it('User entity view', function(fin){
    var seneca = test_user_seneca(fin)

    seneca.act({
      role: 'profile',
      cmd: 'create',
      registration : "140145575",
      user_type : "employee",
      speciality : "Reprovar",
      user_id : "123456",
      sector_id : "654312",
      hospital_id : "123456"
    }, function(err, result){
      seneca.act({
        role: 'profile',
        cmd: 'view',
        profile_id : result.id
      }, function(err, result){
        expect(result.registration).to.equal('140145575')
        expect(result.user_type).to.equal('employee')
        expect(result.speciality).to.equal("Reprovar")
        expect(result.user_id).to.equal('123456')
        expect(result.sector_id).to.equal('654312')
        expect(result.hospital_id).to.equal('123456')
        fin()
      })
    })
  })

});
