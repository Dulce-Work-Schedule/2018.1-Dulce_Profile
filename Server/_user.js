module.exports = function(options){
  this.add('role:profile, cmd:create', function create( msg, respond ) {
    var profile = this.make('profiles')
    profile.registration = msg.registration
    profile.user_type = msg.user_type
    profile.medical_speciality = msg.medical_speciality
    profile.user_id = msg.user_id
    profile.sector_id = msg.sector_id
    profile.hospital_id = msg.hospital_id

    // Validate if user id exists
    // Validate if sector id exists
    // Validate if hospital id exists

    profile.save$(function(err,profile){
      respond(null, profile)
    })
  })

  this.add('role:profile, cmd:listById', function listById (msg, respond){

    var profileId = msg.id;
    var profile = this.make('profiles')
    profile.load$(profileId, function(error, profile) {
      respond(null, profile);
    });
  })

  this.add('role:profile, cmd:listUser', function listUser(msg, respond){

    var profile = this.make('profiles');
    profile.list$( { all$: true } , function(error, profile){
      respond(null, profile);
    });


  })

  .add('role:profile, cmd:error', function error(msg, respond){
    respond(null, {success:false, message: 'acesso negado'});
  })

  this.add('role:profile, cmd:editUser', function(msg, respond){

    var profileId = msg.id;
    var profile = this.make('profiles')

    profile.load$(profileId, function(error, profile) {

      profile.name = msg.name
      profile.registration = msg.registration
      profile.sector = msg.sector
      profile.hospital = msg.hospital
      profile.password = msg.password
      profile.manager = msg.manager

      profile.save$(function(err,profile){
        respond( null, profile)
      });
    });
  })


}
