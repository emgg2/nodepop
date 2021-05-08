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
const jwtAuth = require('./lib/jwtAuth');
const sessionAuth = require('./lib/sessionAuthMiddleware');
const multer = require('multer');
const bodyParser = require('body-parser');




var indexRouter = require('./routes/index');
var productsController = require('./controllers/productsController');
var tagsRouter = require('./routes/api/tags');
var changeLocale = require('./routes/change-locale');
var loginController = require('./controllers/loginController');
var privateController = require('./controllers/privateController');
var chatController = require('./controllers/chatController');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function(req,file,cb) {
    cb(null, file.fieldname+'-'+Date.now())
  }
});

var upload = multer({storage: storage});


var app = express();

app.use(bodyParser.json());

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
app.post('/api/authenticate',   loginController.postJWT)
app.use('/api-docs',            swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/api/products',        productsController.get);
app.post('/api/products/new',   jwtAuth, upload.single('picture'),  productsController.post);
app.put('/api/product/:id',     jwtAuth, productsController.put);
app.delete('/api/product/:id',  jwtAuth,  productsController.delete);
app.use('/api/tags',            tagsRouter);




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
app.get('/chat',         chatController.index);

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
