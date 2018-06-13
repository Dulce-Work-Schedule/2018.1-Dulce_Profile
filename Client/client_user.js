var express = require('express');
var bodyParser = require('body-parser');
var SenecaWeb = require('seneca-web');
var Passport = require('passport');
var PassportJwt = require('passport-jwt')
var Router = express.Router;
var context = new Router();

var ExtractJwt = PassportJwt.ExtractJwt
var JwtStrategy = PassportJwt.Strategy

var jwtOptions = {}
jwtOptions.jwtFromRequest = PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = '123456789'

var strategy = new JwtStrategy(jwtOptions, async function(payload, next) {
    console.log('payload received', payload)
    console.log(next)
    next(null, payload)
})

Passport.use(strategy)

Passport.serializeUser((user, cb) => {
    cb(null, user)
})

Passport.deserializeUser((user, cb) => {
    cb(null, user)
})


var app = express()
    .use(require('body-parser').json())
    .use(Passport.initialize())
    .use(context)

// app.enable('trust proxy')
// app.use(Express.cookieParser())
//   .use(Express.query())
//   .use(Express.bodyParser())
//   .use(Express.methodOverride())
//   .use(Express.json())
//   .use(Express.session({secret: 'seneca'}))
//   .use(Express.static(__dirname + '/public'))

    // add any middleware provided by seneca plugins
    // app.use(seneca.export('web'))


    // some express views
    // app.engine('ejs', require('ejs-locals'))
    //     .set('views', __dirname + '/views')
    //     .set('view engine', 'ejs')

    // app.get('/login', function (req, res) {
    //   res.render('login.ejs', {})
    // })

    // when rendering the account page, use the req.seneca.user object
    // to get user details. This is automatically set up by the auth plugin
    // app.get('/account', function (req, res) {
    //   res.render('account.ejs', { locals: { user: req.seneca.user } })
    // })

var senecaWebConfig = {
    context: context,
    adapter: require('seneca-web-adapter-express'),
    options: { parseBody: false },
    auth: Passport
}

var seneca = require('seneca')()
    .use(SenecaWeb, senecaWebConfig)
    .use('seneca-amqp-transport')
    .use("entity")
    .use('api')
    .client({
        type: 'amqp',
        pin: 'role:user',
        port: process.env.RABBITMQ_PORT,
        username: process.env.RABBITMQ_DEFAULT_USER,
        password: process.env.RABBITMQ_DEFAULT_PASS,
        url: 'amqp://' + process.env.RABBITMQ_HOST
    })
    .ready(() => {
        app.listen(8080)
    })

module.exports = app
