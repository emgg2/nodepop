var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const constant = require('./util/constant');
const i18n = require('./lib/i18nConfigure');
const session = require('express-session');
const sessionAuth = require('./lib/sessionAuthMiddleware');

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/api/products');
var tagsRouter = require('./routes/api/tags');
var changeLocale = require('./routes/change-locale');
var loginController = require('./controllers/loginController');
var privateController = require('./controllers/privateController');


var app = express();


require('./models/connectMongoose');

global.constant = constant;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.locals.title = 'Nodepop'

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);



/**
 * API URL
 */
app.post('/api/loginJWT',   loginController.postJWT)
app.use('/api-docs',        swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/products',    productsRouter);
app.use('/api/tags',        tagsRouter);



/**
 * Middleware website sessions handler
 */

app.use(session({
  name: 'nodepop-session',
  secret: 'aldkfjie9399302348()=(&%asdfjk', //Sirve pra generar los tocken de identificación
  saveUninitialized: true, // Fuerza que una sesion que no está inicializada sea guardada
  resave: false, // cada petición que se recibe va a buscar la sesión correspondiente y desde memoria la va a poner en req.session = obj. Cuando termine la petició resave impide que se guarde la información siempre, solo cuando cambia
  cookie: {
    secure: process.env.NODE_ENV !== 'dev',
    //secure: true, // browser no mandará al servidor la cookie si no tiene https
    maxAge: 1000 * 60 * 60 * 24 * 2  
  }

}));

/**
 * make session visible for every single view
 */

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
})


/**
 * Application URL
 */

app.use('/',              indexRouter);
app.use('/change-locale', changeLocale);
app.get('/login',         loginController.index);
app.post('/login',        loginController.post);
app.get('/logout',       loginController.logout);
app.get('/private',       sessionAuth,privateController.index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // validation error
  if(err.array) {
    const errorInfo = err.array({onlyFirstError: true})[0];
    err.message = `Not valid - ${errorInfo.param} ${errorInfo.msg}`;
    err.status = 422;
  }
  

  res.status(err.status || 500);
   
;  if(isApiRequest(req))
  {
    return res.json ({error: err.message});
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');

});

function isApiRequest(req){
  
  return req.originalUrl.indexOf('/api/') === 0 ;
}


module.exports = app;
