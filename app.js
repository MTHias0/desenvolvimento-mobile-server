require('./config/database');
const cors = require('cors')


const express = require('express');
const routes = require('./routes');

const app = express();

app.use(cors())

app.use(express.json());
app.use(routes);

app.listen(3000, ()=> {
    console.log('Servidor foi iniciado na porta 3000');
});