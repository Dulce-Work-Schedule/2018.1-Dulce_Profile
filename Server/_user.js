var Promise = require('bluebird');
module.exports = function(options){
  this.add('role:profile, cmd:create', function create( msg, respond ) {
    var profile = this.make('profiles')
    profile.registration = msg.registration
    profile.user_type = msg.user_type
    profile.speciality = msg.speciality
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

    var profile_id = msg.id;
    var profile = this.make('profiles')
    profile.load$(profile_id, function(error, profile) {
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

  this.add('role:profile, cmd:edit', async function(msg, respond){
    var profile = this.make('profiles')
    var profile_id = msg.profile_id;
    result = {};

    var load$ = Promise.promisify(profile.load$, { context: profile });

    await load$(profile_id)
    .then(function(profile){
      profile.registration = msg.registration
      profile.user_type = msg.user_type
      profile.speciality = msg.speciality
      profile.user_id = msg.user_id
      profile.sector_id = msg.sector_id
      profile.hospital_id = msg.hospital_id
      profile.save$(function(err,profile){
        respond( null, profile)
      });
    })
    .catch(function(error){
      result.not_find_error = "Perfil não encontrado";
      result.success = "false";
      console.log("Perfil não encontrado");
      respond(null, result)
    })
  })


}
