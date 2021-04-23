'use strict';

const mongoose = require('mongoose');

mongoose.connection.on ('error', err => {
    console.log("Error de conexión");
    process.exit(1);
});


mongoose.connect(
    process.env.MONGODB_CONNECTION_STR,
    {
        useUnifiedTopology: true, 
        useNewUrlParser: true,
        useCreateIndex:true
    }
);

mongoose.connection.once("open", () => {
    console.log("Conectado a mongoDB en", mongoose.connection.name);

});

module.exports = mongoose.connection;