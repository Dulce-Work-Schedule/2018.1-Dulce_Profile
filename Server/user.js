var Http = require('http')
var Express = require('express')
// create a seneca instance
require('seneca')()
.use("entity")
.use('mongo-store',{
  name: process.env.MONGO_DATABASE,
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT
})
.use('seneca-amqp-transport')
.use('_user')
.listen({
  type:'amqp',
  pin:'role:user',
  port: process.env.RABBITMQ_PORT,
  username: process.env.RABBITMQ_DEFAULT_USER,
  password: process.env.RABBITMQ_DEFAULT_PASS,
  url: 'amqp://' + process.env.RABBITMQ_HOST
})
// use the user and auth plugins
// the user plugin gives you user account business logic
.use('user')
// the auth plugin handles HTTP authentication
.use('auth', {
  // redirects after login are needed for traditional multi-page web apps
  redirect: {
    login: { win: '/listUser', fail: '/login#failed' },
    register: { win: '/account', fail: '/#failed' }
  }
})

// load configuration for plugins
// top level properties match plugin names
// copy template config.template.js to config.mine.js and customize
.use('options', 'config.js')

// Load the google-auth plugin
.use('google-auth')
.use()

// use the express module in the normal way



// create some test accounts
// the "pin" creates a more convenient api, avoiding the need for
// a full action specification: seneca.act( {role: 'user', cmd: 'register', ... } )
var u = seneca.pin({role: 'user', cmd: '*'})
u.register({ nick: 'u1', name: 'nu1', email: 'u1@example.com', password: 'u1', active: true })
u.register({ nick: 'u2', name: 'nu2', email: 'u2@example.com', password: 'u2', active: true })
u.register({ nick: 'a1', name: 'na1', email: 'a1@example.com', password: 'a1', active: true, admin: true })


// create a HTTP server using the core Node API
// this lets the admin plugin use web sockets
// var server = Http.createServer(app)
// server.listen(conf.port)
//
// // visit http://localhost[:port]/admin to see the admin page
// // you'll need to logged in as an admin - user 'a1' above
// seneca.use('admin', {server: server})
