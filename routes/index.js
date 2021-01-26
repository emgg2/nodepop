var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.ejemplo = "esto es un ejemplo";
  res.locals.valorInyeccion = '<script>alert("codigo inyectado")</script>';

  const segundoActual = (new Date()).getSeconds();
  res.locals.condicion = {
    segundo: segundoActual,
    esPar: segundoActual % 2 === 0
  };

  res.locals.users = [
    {
      name: "Smith",
      age : 31
    },
    {
      name: "Brown",
      age : 39
    },
    {
      name: "Jones",
      age : 22
    }
  ];
  res.render('index');
});

module.exports = router;
