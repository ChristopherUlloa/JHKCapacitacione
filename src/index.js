const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { database } = require('./keys');
const enviarCorreoRouter = require('./js/enviar_correo');

//initializations
const app = express();

//settings
app.set('port', process.env.port || 4000);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

//Routes
app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'index.html'))
});

app.use('/enviar_correo', enviarCorreoRouter);

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on Port', app.get('port'));
});
