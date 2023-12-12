require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors')


const express = require('express');
const routes = require('./routes');
const http = require('http')

const app = express();

const server = http.createServer(app)
const socketIo = require('socket.io')
const io = socketIo(server, {})

io.on('connection', socket => {
    socket.on('chat', (msg) => {
        io.emit('chat', msg)
    })
    socket.on('disconnect', (msg) => {
        console.log('Dispositivo desconnectado')
    })
})

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(routes);

server.listen(3000, ()=> {
    console.log('Servidor foi iniciado na porta 3000');
});