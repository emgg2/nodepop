var express = require('express');
var router = express.Router();
const cote = require('cote');

//requester
const requester = new cote.Requester({name: 'cliente de moneda'});
/* GET users listing. */
router.get('/:cantidad/:desde/:hacia', function(req, res, next) {
  const {desde, hacia, cantidad} = req.params;
  requester.send({
    type: 'convertir moneda', 
    desde,
    hacia,
    cantidad
  }, resultado => {
      res.send(`cambiamos ${cantidad} ${desde} = ${resultado} ${hacia}`);
  })
  

});

module.exports = router;
