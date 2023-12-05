require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors')


const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(routes);

app.listen(3259, ()=> {
    console.log('Servidor foi iniciado na porta 3259');
});