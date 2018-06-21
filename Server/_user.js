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

//##############################################################################

  this.add('role:profile, cmd:list', async function list (msg, respond){
    result = {};
    var profile = this.make('profiles')
    var user_id = msg.user_id;
    console.log(msg);

    var list$ = Promise.promisify(profile.list$, { context: profile });

    list$({user_id:user_id})
    .then(function(profile){
      console.log("profile"+profile);
      respond(null, profile);
    })
    .catch(function(error){
      result.user_not_found_error = "Usuário não possui nenhum perfil"
      result.success = "false"
      console.log("result"+result);
      respond(null, result)
    })
  })

//##############################################################################

  this.add('role:profile, cmd:error', function error(msg, respond){
    respond(null, {success:false, message: 'acesso negado'});
  })

//##############################################################################

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
