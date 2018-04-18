var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = '123456789';
const expiresIn = '1h';

module.exports = function Login(options) {

  this.add('role:login, cmd:authenticate', function(msg, respond) {

          var registration = msg.registration;
          var user = this.make('users')
    	     user.load$({registration},function(error, user) {
             if (!user) {
               respond( null,{
                 success: false,
                 message: ' Falha de autenticação. Usuário não encontrado.'
               });
             } else {
                if(msg.password == user.password ){
                  var payload = {
                    registration: msg.registration,
                    password: msg.password
                  }
                  var token = jwt.sign(payload, SECRET_KEY, {expiresIn});
                  respond(null,{
                    success: true,
                    message: 'Autenticação realizada com sucesso!',
                    token: token,
                    user: {
                        id: user.id,
                        name: user.name,
                        sector: user.sector,
                        hospital: user.hospital,
                        manager: user.manager,
                        registration: user.registration }

                  });
                } else {
                  respond(null,{
                    success: false,
                    message: 'Falha de autenticação. Senha incorreta! '
                  })
                }
              }
    	});
    });
}
