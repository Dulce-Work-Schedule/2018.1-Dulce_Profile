// The RegExp Object above validates MongoBD ObjectIds
var checkObjectId = new RegExp('^[0-9a-fA-F]{24}$');

function validate_field(field, result){
  if (field.value == null || field.value == ''){
    result[field.field_name + '_error'] = 'O campo ' + field.verbose + ' é obrigatório.';
  } else if (typeof(field.value) != 'string') {
    result[field.field_name + '_error'] = 'O campo ' + field.verbose +' deve ser uma string.';
  }
  return result;
}

function validate_id(field, result){
  if (field.value == null || field.value == ''){
    result[field.field_name + '_error'] = 'O campo ' + field.verbose + ' é obrigatório.';
  } else if (!checkObjectId.test(field.value)) {
    result[field.field_name + '_error'] = 'O ' + field.verbose +' é inválido.';
  }
  return result;
}

function validate_user_type(field, result){
  if (field.value == null || field.value == ''){
    result[field.field_name + '_error'] = 'O campo ' + field.verbose + ' é obrigatório.';
  } else if (!(user_types.indexOf(field.value) >= 0)) {
    result[field.field_name + '_error'] = 'O ' + field.verbose +' é inválido.';
  }
  return result;
}

user_types = ["sector_manager", "employee", "institution_manager"];

module.exports = function api(options) {
  this.add('role:api,path:create', function (msg, respond) {
    var sector_id = {
      verbose: 'Setor',
      field_name: 'sector_id'
    }
    var user_id = {
      verbose: 'Usuário',
      field_name: 'user_id'
    }
    var hospital_id = {
      verbose: 'Hospital',
      field_name: 'hospital_id'
    }
    var registration = {
      verbose: 'Matricula',
      field_name: 'registration'
    }
    var user_type = {
      verbose: 'Tipo de usuário',
      field_name: 'user_type'
    }
    var speciality = {
      verbose: 'Especialidade',
      field_name: 'speciality'
    }
    var result = {}
    speciality.value = msg.args.body.speciality
    user_type.value = msg.args.body.user_type
    registration.value = msg.args.body.registration
    user_id.value = msg.args.body.user_id
    hospital_id.value = msg.args.body.hospital_id
    sector_id.value = msg.args.body.sector_id

    result = validate_user_type(user_type, result)
    result = validate_field(registration, result)
    result = validate_field(speciality, result)
    result = validate_id(sector_id, result)
    result = validate_id(hospital_id, result)
    result = validate_id(user_id, result)

    if (Object.entries(result)[0]) {
      console.log("Result:");
      console.log(result);
      result.success = false;
      respond(null, result)
    // else, everything sucess
    } else {
      this.act('role:profile,cmd:create', {
        registration: registration.value,
        user_type: user_type.value,
        speciality: speciality.value,
        user_id: user_id.value,
        sector_id: sector_id.value,
        hospital_id: hospital_id.value
      }, respond)
    }
  })

//##############################################################################

  this.add('role:api,path:list',function(msg, respond){
    result = {};
    var user_id = {
      verbose: 'Usuário',
      field_name: 'user_id'
    }
    user_id.value = msg.args.query.user_id

    result = validate_id(user_id, result)

    if (Object.entries(result)[0]) {
      console.log("Result:");
      console.log(result);
      result.success = false;
      respond(null, result)
    // else, everything sucess
    } else {
      this.act('role:profile, cmd:list', {
        user_id: user_id.value
      }, respond)
    }
  });

//##############################################################################

  this.add('role:api,path:view',function(msg, respond){
    result = {};
    var profile_id = {
      verbose: 'Perfil',
      field_name: 'profile_id'
    }
    profile_id.value = msg.args.query.profile_id

    result = validate_id(profile_id, result)

    if (Object.entries(result)[0]) {
      console.log("Result:");
      console.log(result);
      result.success = false;
      respond(null, result)
    // else, everything sucess
    } else {
      this.act('role:profile, cmd:view', {
        profile_id: profile_id.value
      }, respond)
    }
  });

///##############################################################################

  this.add('role:api,path:error', function(msg, respond){
    this.act('role:profile, cmd:error',{}, respond)
  });

//##############################################################################

this.add('role:api,path:edit', function(msg, respond){
  var sector_id = {
    verbose: 'Setor',
    field_name: 'sector_id'
  }
  var user_id = {
    verbose: 'Usuário',
    field_name: 'user_id'
  }
  var hospital_id = {
    verbose: 'Hospital',
    field_name: 'hospital_id'
  }
  var registration = {
    verbose: 'Matricula',
    field_name: 'registration'
  }
  var user_type = {
    verbose: 'Tipo de usuário',
    field_name: 'user_type'
  }
  var speciality = {
    verbose: 'Especialidade',
    field_name: 'speciality'
  }
  var profile_id = {
    verbose: 'Perfil',
    field_name: 'profile_id'
  }
  var result = {}
  speciality.value = msg.args.body.speciality
  user_type.value = msg.args.body.user_type
  registration.value = msg.args.body.registration
  user_id.value = msg.args.body.user_id
  hospital_id.value = msg.args.body.hospital_id
  sector_id.value = msg.args.body.sector_id
  profile_id.value = msg.args.body.profile_id

  result = validate_user_type(user_type, result)
  result = validate_field(registration, result)
  result = validate_field(speciality, result)
  result = validate_id(sector_id, result)
  result = validate_id(hospital_id, result)
  result = validate_id(profile_id, result)
  result = validate_id(user_id, result)

  if (Object.entries(result)[0]) {
    console.log("Result:");
    console.log(result);
    result.success = false;
    respond(null, result)
  // else, everything sucess
  } else {
    this.act('role:profile, cmd:edit', {
      registration: registration.value,
      user_type: user_type.value,
      speciality: speciality.value,
      user_id: user_id.value,
      sector_id: sector_id.value,
      hospital_id: hospital_id.value,
      profile_id: profile_id.value
    }, respond)
  }
});

//##############################################################################

  this.add('init:api', function (msg, respond) {

    this.act('role:web',{ routes: {
      prefix: '/api/profile',
      pin:    'role:api,path:*',
      map: {
        create: { POST:true },
        list: { GET:true},
        view: { GET:true},
        listUser: { GET: true,
                    auth: {
                      strategy: 'jwt',
                      fail: '/api/profile/error',
                    }
        },
        edit: { PUT: true },
        error: {GET:true}
      }
    }}, respond)
  });
}
