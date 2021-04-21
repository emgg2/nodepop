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

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/api/products');
var tagsRouter = require('./routes/api/tags');

var app = express();


require('./lib/connectMongoose');

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/products', productsRouter);
app.use('/api/tags', tagsRouter);



/**
 * Application URL
 */

app.use('/', indexRouter);

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
