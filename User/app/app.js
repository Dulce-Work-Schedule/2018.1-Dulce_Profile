var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongoose');

var newUser = require('./Components/newUser');
var allUsers = require('./Components/allUsers');
var viewUser = require('./Components/viewUser');
var editUser = require('./Components/editUser');
var login = require('./Components/login');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


var mongoaddr = 'mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':27017/testeapi';
console.log(mongoaddr);
mongo.connect(mongoaddr);


app.post('/user/add', newUser);
app.get('/user/all', allUsers);
app.post('/user/login', login);
app.get('/user/view/:id', viewUser);
app.put('/user/edit/:id', editUser);



app.listen(8080, function() {
	console.log('Funcionando');
});
