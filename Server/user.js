require('seneca')()
 .use("entity")
 .use('mongo-store',{
    name: process.env.MONGO_DATABASE,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT
  })
 .use('seneca-amqp-transport')
 .listen({
    type:'amqp',
    pin:'role:user',
    port: process.env.RABBITMQ_PORT,
    username: process.env.RABBITMQ_DEFAULT_USER,
    password: process.env.RABBITMQ_DEFAULT_PASS,
    url: 'amqp://' + process.env.RABBITMQ_HOST
})
    .add('role:user, cmd:create', function create( msg, respond ) {

      var user = this.make('users')

      user.name = msg.name
      user.registration = msg.registration
      user.sector = msg.sector
      user.hospital = msg.hospital
      user.password = msg.password
      user.manager = msg.manager

      user.save$(function(err,user){
        respond( null, user)
    })
})

  .add('role:user, cmd:listById', function listById (msg, respond){

      var userId = msg.id;
      var user = this.make('users')
	     user.load$(userId, function(error, user) {
		      respond(null, user);
	});
})

  .add('role:user, cmd:listUser', function listUser(msg, respond){

    var user = this.make('users');
    user.list$( { all$: true } , function(error, user){
      respond(null, user);
    });


})

.add('role:user, cmd:error', function error(msg, respond){
    respond(null, {success:false, message: 'acesso negado'});
  })

  .add('role:user, cmd:editUser', function(msg, respond){

  var userId = msg.id;
  var user = this.make('users')

  user.load$(userId, function(error, user) {

    user.name = msg.name
    user.registration = msg.registration
    user.sector = msg.sector
    user.hospital = msg.hospital
    user.password = msg.password
    user.manager = msg.manager

    user.save$(function(err,user){
      respond( null, user)
    });
  });
})
