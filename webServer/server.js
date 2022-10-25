const express = require('express')
const path = require('path')
const http = require('http')
const PORT = 3000
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static('gameClient/', {index: 'chooseWeight.html'}))

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

io.on('connection', socket => {console.log(`New connection from ${socket.id}`)

    socket.on('joinSW', function() {
        socket.leaveAll()
        console.log(`Player ${socket.id} is trying to connect to the Strawweight lobby...`);
        socket.join('sw');
        console.log(`Player ${socket.id} has connected to the Strawweight lobby...`);
        console.log(socket.adapter.rooms);
    })
    
    socket.on('joinFLW', function() {
        socket.leaveAll()
        console.log(`Player ${socket.id} is trying to connect to the Flyweight lobby...`);
        socket.join('flw');
        console.log(`Player ${socket.id} has connected to the Flyweight lobby...`);
        console.log(socket.adapter.rooms);
    })
    socket.on('joinBW', function() {
        socket.leaveAll()
        console.log(`Player ${socket.id} is trying to connect to the Bantamweight lobby...`);
        socket.join('bw');
        console.log(`Player ${socket.id} has connected to the Bantamweight lobby...`);
        console.log(socket.adapter.rooms);
    })
    socket.on('joinFW', function() {
        socket.leaveAll()
        console.log(`Player ${socket.id} is trying to connect to the Featherweight lobby...`);
        socket.join('fw');
        console.log(`Player ${socket.id} has connected to the Featherweight lobby...`);
        console.log(socket.adapter.rooms);
    })
    socket.on('joinLW', function() {
        socket.leaveAll()
        console.log(`Player ${socket.id} is trying to connect to the Lightweight lobby...`);
        socket.join('lw');
        console.log(`Player ${socket.id} has connected to the Lightweight lobby...`);
        console.log(socket.adapter.rooms);
    })
    socket.on('joinWW', function() {
        socket.leaveAll()
        console.log(`Player ${socket.id} is trying to connect to the Welterweight lobby...`);
        socket.join('ww');
        console.log(`Player ${socket.id} has connected to the Welterweight lobby...`);
        console.log(socket.adapter.rooms);
    })
    socket.on('joinMW', function() {
        socket.leaveAll()
        console.log(`Player ${socket.id} is trying to connect to the Middleweight lobby...`);
        socket.join('mw');
        console.log(`Player ${socket.id} has connected to the Middleweight lobby...`);
        console.log(socket.adapter.rooms);
    })
    socket.on('joinLHW', function() {
        socket.leaveAll()
        console.log(`Player ${socket.id} is trying to connect to the Light Heavyweight lobby...`);
        socket.join('lhw');
        console.log(`Player ${socket.id} has connected to the Light HeavyWeight lobby...`);
        console.log(socket.adapter.rooms);
    })
    socket.on('joinHW', function() {
        socket.leaveAll()
        console.log(`Player ${socket.id} is trying to connect to the Heavyweight lobby...`);
        socket.join('hw');
        console.log(`Player ${socket.id} has connected to the Heavyweight lobby...`);
        console.log(socket.adapter.rooms);
    })
    

})




