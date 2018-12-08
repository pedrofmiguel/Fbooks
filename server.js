//criar as rotas e definir o servidor

global.express = require('express');
var port = process.env.PORT;

//carregar as bibliotecas globais 
global.fs = require('fs');
global.mysql = require('mysql');
global.bodyParser = require('body-parser');

var session = require('express-session');
var cookieParser = require('cookie-parser');

global.nodemailer = require('nodemailer');
global.smtp = require('smtp');
global.smtpTransport = require('nodemailer-smtp-transport');
var router = global.express.Router();

var xoauth2 = require('xoauth2');




//iniciar a aplicação
global.app = global.express();

global.app.listen(port);

global.app.use(cookieParser());



global.app.use(session({
    secret: "kitty cat",
    resave: true,
    saveUninitialized: true
}))

global.app.use(global.bodyParser.json(), global.bodyParser.urlencoded({ extended: true }));





//definir rotas estáticas para ficheiros
global.app.use('/controller', global.express.static('controller'));


//carregar ficheiros MVC


/*Model*/
global.connect = require('./assets/connect');

global.modelUser = require('./model/registo.model');

global.modelLivros = require('./model/registodelivros.model.js')

global.modelCatalogo = require('./model/catalogo.model.js')

global.modelPerfil = require('./model/perfil.model.js')

global.modelRequisicoes = require('./model/requisicoes.model.js')

global.modelFeedback = require('./model/feedback.model.js')


/*ROUTES*/ 

global.routesIndex = require('./controller/index.route.js');

global.routesUser = require('./controller/registo.route.js');

global.routesLivro = require('./controller/registodelivros.route.js')

global.routeCatalogo = require('./controller/catalogo.route.js')

global.routeRequisicoes = require('./controller/requisicoes.route.js')

global.routePerfil = require('./controller/perfil.route.js')

global.routeEmail = require('./controller/email.route.js')



global.root = __dirname;
//criar as rotas e definir o servidor

