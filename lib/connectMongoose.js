'use strict';

const mongoose = require('mongoose');

mongoose.connection.on ('error', err => {
    console.log("Error de conexión");
    process.exit(1);
});

mongoose.connect(
    'mongodb://localhost/nodepop',
    {
        useUnifiedTopology: true, 
        useNewUrlParser: true
    }
);

mongoose.connection.once("open", () => {
    console.log("Conectado a mongoDB en", mongoose.connection.name);

});

module.exports = mongoose.connection;