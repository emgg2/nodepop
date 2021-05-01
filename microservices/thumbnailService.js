'use strict';

//get image thumbnail 
const cote = require('cote');

// declarar el microservicio

const responder = new cote.Responder({name: 'servicio de moneda'});

//tabla de conversión de moneda

const rates = {
    usd_eur: 0.86,
    eur_usd: 1.14
}


//lógica del microservicio

responder.on('convertir moneda', (req,done) => {
    //resultado = "buenos días";
     const {desde, hacia, cantidad} = req;
     console.log("servicio:", desde, hacia, cantidad, Date.now());

    //alcular el resultado
     const resultado = rates[`${desde}_${hacia}`] * cantidad;

    done(resultado);
});
