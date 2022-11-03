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

    socket.currentRoom = '';

    socket.on('joinSW', function() {
        socket.leaveAll()
        console.log(`Player ${socket.id} is trying to connect to the Strawweight lobby...`);
        socket.join('sw');
        //socket.currentRoom = 'sw';
        console.log(`Player ${socket.id} has connected to the Strawweight lobby...`);
        const numClientsSW = io.sockets.adapter.rooms.get('sw').size
        console.log(numClientsSW);
        console.log(io.sockets.adapter.rooms.get('sw'));

        if (numClientsSW >= 2){
            const clients = io.sockets.adapter.rooms.get('sw');
            var clientArr = [];
            for (const clientID of clients){
                const clientSocket = io.sockets.sockets.get(clientID).id;
                console.log(clientSocket);
                clientArr.push(clientSocket);
                console.log(clientArr);
                if(clientSocket == clientArr[0]){
                    io.sockets.sockets.get(clientID).leave('sw');
                    io.sockets.sockets.get(clientID).join(`${clientArr[0]}Room`);
                    io.sockets.sockets.get(clientID).emit('matchFound');
                    io.sockets.sockets.get(clientID).emit('changeTurn');
                }
                else if(clientSocket == clientArr[1]){
                    io.sockets.sockets.get(clientID).leave('sw');
                    io.sockets.sockets.get(clientID).join(`${clientArr[0]}Room`);
                    io.sockets.sockets.get(clientID).emit('matchFound');
                }
                else{
                    console.log('Could not match players into private room')
                }
                socket.currentRoom = `${clientArr[0]}Room`;
                console.log(io.sockets.adapter.rooms);
                console.log(socket.currentRoom);
            }
        }
    })
    
    socket.on('joinFLW', function() {
        socket.leaveAll()
        console.log(`Player ${socket.id} is trying to connect to the Flyweight lobby...`);
        socket.join('flw');
        currentRoom = 'flw';
        console.log(`Player ${socket.id} has connected to the Flyweight lobby...`);
        console.log(socket.adapter.rooms);
        const numClientsFLW = io.sockets.adapter.rooms.get('flw').size
        console.log(numClientsFLW);
        console.log(io.sockets.adapter.rooms.get('flw'));

        if (numClientsFLW >= 2){
            const clients = io.sockets.adapter.rooms.get('flw');
            var clientArr = [];
            for (const clientID of clients){
                const clientSocket = io.sockets.sockets.get(clientID).id;
                console.log(clientSocket);
                clientArr.push(clientSocket);
                console.log(clientArr);
                if(clientSocket == clientArr[0]){
                    io.sockets.sockets.get(clientID).leave('flw');
                    io.sockets.sockets.get(clientID).join(`${clientArr[0]}Room`);
                    currentRoom = `${clientArr[0]}Room`;
                    io.sockets.sockets.get(clientID).emit('matchFound');
                    io.sockets.sockets.get(clientID).emit('changeTurn');
                }
                else if(clientSocket == clientArr[1]){
                    io.sockets.sockets.get(clientID).leave('flw');
                    io.sockets.sockets.get(clientID).join(`${clientArr[0]}Room`);
                    currentRoom = `${clientArr[0]}Room`;
                    io.sockets.sockets.get(clientID).emit('matchFound');
                }
                else{
                    console.log('Could not match players into private room')
                }
                console.log(io.sockets.adapter.rooms);
            }
        }
    })
    socket.on('joinBW', function() {
        socket.leaveAll()
        console.log(`Player ${socket.id} is trying to connect to the Bantamweight lobby...`);
        socket.join('bw');
        currentRoom = 'bw';
        console.log(`Player ${socket.id} has connected to the Bantamweight lobby...`);
        console.log(socket.adapter.rooms);
        const numClientsBW = io.sockets.adapter.rooms.get('bw').size
        console.log(numClientsBW);
        console.log(io.sockets.adapter.rooms.get('bw'));

        if (numClientsBW >= 2){
            const clients = io.sockets.adapter.rooms.get('bw');
            var clientArr = [];
            for (const clientID of clients){
                const clientSocket = io.sockets.sockets.get(clientID).id;
                console.log(clientSocket);
                clientArr.push(clientSocket);
                console.log(clientArr);
                if(clientSocket == clientArr[0]){
                    io.sockets.sockets.get(clientID).leave('bw');
                    io.sockets.sockets.get(clientID).join(`${clientArr[0]}Room`);
                    currentRoom = `${clientArr[0]}Room`;
                    io.sockets.sockets.get(clientID).emit('matchFound');
                    io.sockets.sockets.get(clientID).emit('changeTurn');
                }
                else if(clientSocket == clientArr[1]){
                    io.sockets.sockets.get(clientID).leave('bw');
                    io.sockets.sockets.get(clientID).join(`${clientArr[0]}Room`);
                    currentRoom = `${clientArr[0]}Room`;
                    io.sockets.sockets.get(clientID).emit('matchFound');
                }
                else{
                    console.log('Could not match players into private room')
                }
                console.log(io.sockets.adapter.rooms);
            }
        }
    })
    socket.on('joinFW', function() {
        socket.leaveAll()
        console.log(`Player ${socket.id} is trying to connect to the Featherweight lobby...`);
        socket.join('fw');
        currentRoom = 'fw';
        console.log(`Player ${socket.id} has connected to the Featherweight lobby...`);
        console.log(socket.adapter.rooms);
        const numClientsFW = io.sockets.adapter.rooms.get('fw').size
        console.log(numClientsFW);
        console.log(io.sockets.adapter.rooms.get('fw'));

        if (numClientsFW >= 2){
            const clients = io.sockets.adapter.rooms.get('fw');
            var clientArr = [];
            for (const clientID of clients){
                const clientSocket = io.sockets.sockets.get(clientID).id;
                console.log(clientSocket);
                clientArr.push(clientSocket);
                console.log(clientArr);
                if(clientSocket == clientArr[0]){
                    io.sockets.sockets.get(clientID).leave('fw');
                    io.sockets.sockets.get(clientID).join(`${clientArr[0]}Room`);
                    currentRoom = `${clientArr[0]}Room`;
                    io.sockets.sockets.get(clientID).emit('matchFound');
                    io.sockets.sockets.get(clientID).emit('changeTurn');
                }
                else if(clientSocket == clientArr[1]){
                    io.sockets.sockets.get(clientID).leave('fw');
                    io.sockets.sockets.get(clientID).join(`${clientArr[0]}Room`);
                    io.sockets.sockets.get(clientID).emit('matchFound');
                }
                else{
                    console.log('Could not match players into private room')
                }
                console.log(io.sockets.adapter.rooms);
            }
        }
    })
    socket.on('joinLW', function() {
        socket.leaveAll()
        console.log(`Player ${socket.id} is trying to connect to the Lightweight lobby...`);
        socket.join('lw');
        currentRoom = 'lw';
        console.log(`Player ${socket.id} has connected to the Lightweight lobby...`);
        console.log(socket.adapter.rooms);
        const numClientsLW = io.sockets.adapter.rooms.get('lw').size
        console.log(numClientsLW);
        console.log(io.sockets.adapter.rooms.get('lw'));

        if (numClientsLW >= 2){
            const clients = io.sockets.adapter.rooms.get('lw');
            var clientArr = [];
            for (const clientID of clients){
                const clientSocket = io.sockets.sockets.get(clientID).id;
                console.log(clientSocket);
                clientArr.push(clientSocket);
                console.log(clientArr);
                if(clientSocket == clientArr[0]){
                    io.sockets.sockets.get(clientID).leave('lw');
                    io.sockets.sockets.get(clientID).join(`${clientArr[0]}Room`);
                    currentRoom = `${clientArr[0]}Room`;
                    io.sockets.sockets.get(clientID).emit('matchFound');
                    io.sockets.sockets.get(clientID).emit('changeTurn');
                }
                else if(clientSocket == clientArr[1]){
                    io.sockets.sockets.get(clientID).leave('lw');
                    io.sockets.sockets.get(clientID).join(`${clientArr[0]}Room`);
                    currentRoom = `${clientArr[0]}Room`;
                    io.sockets.sockets.get(clientID).emit('matchFound');
                }
                else{
                    console.log('Could not match players into private room')
                }
                console.log(io.sockets.adapter.rooms);
            }
        }
    })
    socket.on('joinWW', function() {
        socket.leaveAll()
        console.log(`Player ${socket.id} is trying to connect to the Welterweight lobby...`);
        socket.join('ww');
        currentRoom = 'ww';
        console.log(`Player ${socket.id} has connected to the Welterweight lobby...`);
        console.log(socket.adapter.rooms);
        const numClientsWW = io.sockets.adapter.rooms.get('ww').size
        console.log(numClientsWW);
        console.log(io.sockets.adapter.rooms.get('ww'));

        if (numClientsWW >= 2){
            const clients = io.sockets.adapter.rooms.get('ww');
            var clientArr = [];
            for (const clientID of clients){
                const clientSocket = io.sockets.sockets.get(clientID).id;
                console.log(clientSocket);
                clientArr.push(clientSocket);
                console.log(clientArr);
                if(clientSocket == clientArr[0]){
                    io.sockets.sockets.get(clientID).leave('ww');
                    io.sockets.sockets.get(clientID).join(`${clientArr[0]}Room`);
                    currentRoom = `${clientArr[0]}Room`;
                    io.sockets.sockets.get(clientID).emit('matchFound');
                    io.sockets.sockets.get(clientID).emit('changeTurn');
                }
                else if(clientSocket == clientArr[1]){
                    io.sockets.sockets.get(clientID).leave('ww');
                    io.sockets.sockets.get(clientID).join(`${clientArr[0]}Room`);
                    currentRoom = `${clientArr[0]}Room`;
                    io.sockets.sockets.get(clientID).emit('matchFound');
                }
                else{
                    console.log('Could not match players into private room')
                }
                console.log(io.sockets.adapter.rooms);
            }
        }
    })
    socket.on('joinMW', function() {
        socket.leaveAll()
        console.log(`Player ${socket.id} is trying to connect to the Middleweight lobby...`);
        socket.join('mw');
        currentRoom = 'mw';
        console.log(`Player ${socket.id} has connected to the Middleweight lobby...`);
        console.log(socket.adapter.rooms);
        const numClientsMW = io.sockets.adapter.rooms.get('mw').size
        console.log(numClientsMW);
        console.log(io.sockets.adapter.rooms.get('mw'));

        if (numClientsMW >= 2){
            const clients = io.sockets.adapter.rooms.get('mw');
            var clientArr = [];
            for (const clientID of clients){
                const clientSocket = io.sockets.sockets.get(clientID).id;
                console.log(clientSocket);
                clientArr.push(clientSocket);
                console.log(clientArr);
                if(clientSocket == clientArr[0]){
                    io.sockets.sockets.get(clientID).leave('mw');
                    io.sockets.sockets.get(clientID).join(`${clientArr[0]}Room`);
                    currentRoom = `${clientArr[0]}Room`;
                    io.sockets.sockets.get(clientID).emit('matchFound');
                    io.sockets.sockets.get(clientID).emit('changeTurn');
                }
                else if(clientSocket == clientArr[1]){
                    io.sockets.sockets.get(clientID).leave('mw');
                    io.sockets.sockets.get(clientID).join(`${clientArr[0]}Room`);
                    currentRoom = `${clientArr[0]}Room`;
                    io.sockets.sockets.get(clientID).emit('matchFound');
                }
                else{
                    console.log('Could not match players into private room')
                }
                console.log(io.sockets.adapter.rooms);
            }
        }
    })
    socket.on('joinLHW', function() {
        socket.leaveAll()
        console.log(`Player ${socket.id} is trying to connect to the Light Heavyweight lobby...`);
        socket.join('lhw');
        currentRoom = 'lhw';
        console.log(`Player ${socket.id} has connected to the Light HeavyWeight lobby...`);
        console.log(socket.adapter.rooms);
        const numClientsLHW = io.sockets.adapter.rooms.get('lhw').size
        console.log(numClientsLHW);
        console.log(io.sockets.adapter.rooms.get('lhw'));

        if (numClientsLHW >= 2){
            const clients = io.sockets.adapter.rooms.get('lhw');
            var clientArr = [];
            for (const clientID of clients){
                const clientSocket = io.sockets.sockets.get(clientID).id;
                console.log(clientSocket);
                clientArr.push(clientSocket);
                console.log(clientArr);
                if(clientSocket == clientArr[0]){
                    io.sockets.sockets.get(clientID).leave('lhw');
                    io.sockets.sockets.get(clientID).join(`${clientArr[0]}Room`);
                    currentRoom = `${clientArr[0]}Room`;
                    io.sockets.sockets.get(clientID).emit('matchFound');
                    io.sockets.sockets.get(clientID).emit('changeTurn');
                }
                else if(clientSocket == clientArr[1]){
                    io.sockets.sockets.get(clientID).leave('lhw');
                    io.sockets.sockets.get(clientID).join(`${clientArr[0]}Room`);
                    currentRoom = `${clientArr[0]}Room`;
                    io.sockets.sockets.get(clientID).emit('matchFound');
                }
                else{
                    console.log('Could not match players into private room')
                }
                console.log(io.sockets.adapter.rooms);
            }
        }
    })
    socket.on('joinHW', function() {
        socket.leaveAll()
        console.log(`Player ${socket.id} is trying to connect to the Heavyweight lobby...`);
        socket.join('hw');
        currentRoom = 'hw';
        console.log(`Player ${socket.id} has connected to the Heavyweight lobby...`);
        console.log(socket.adapter.rooms);
        const numClientsHW = io.sockets.adapter.rooms.get('hw').size
        console.log(numClientsHW);
        console.log(io.sockets.adapter.rooms.get('hw'));

        if (numClientsHW >= 2){
            const clients = io.sockets.adapter.rooms.get('hw');
            var clientArr = [];
            for (const clientID of clients){
                const clientSocket = io.sockets.sockets.get(clientID).id;
                console.log(clientSocket);
                clientArr.push(clientSocket);
                console.log(clientArr);
                if(clientSocket == clientArr[0]){
                    io.sockets.sockets.get(clientID).leave('hw');
                    io.sockets.sockets.get(clientID).join(`${clientArr[0]}Room`);
                    io.sockets.sockets.get(clientID).emit('matchFound');
                    currentRoom = `${clientArr[0]}Room`;
                    io.sockets.sockets.get(clientID).emit('changeTurn');
                }
                else if(clientSocket == clientArr[1]){
                    io.sockets.sockets.get(clientID).leave('hw');
                    io.sockets.sockets.get(clientID).join(`${clientArr[0]}Room`);
                    currentRoom = `${clientArr[0]}Room`;
                    io.sockets.sockets.get(clientID).emit('matchFound');
                }
                else{
                    console.log('Could not match players into private room')
                }
                console.log(io.sockets.adapter.rooms);
            }
        }
    })

    socket.on('heheheha', function(){
        console.log(`${socket.id} wants to send the heheheha`)
        var clientRooms = [];
            for (var room of socket.rooms){
                clientRooms.push(room);
            }
            const theRoom = clientRooms[0];

            if(io.to(theRoom).emit('playEmoteHeheheha', socket.id)){
                console.log('The room has been Heheheha\'d');
            }
    })

    socket.on('rogan', function(){
        console.log(`${socket.id} wants to send the Joe`)
        var clientRooms = [];
            for (var room of socket.rooms){
                clientRooms.push(room);
            }
            const theRoom = clientRooms[0];

            if(io.to(theRoom).emit('playEmoteRogan', socket.id)){
                console.log('The room has been Rogan\'d');
            }
    })

    socket.on('tryGettup', isMyTurn => {
        var clientRooms = [];
        for (var room of socket.rooms){
            clientRooms.push(room);
        }
        const theRoom = clientRooms[0];
        
        if(isMyTurn == true){
            if(Math.random() < 0.30){
                socket.to(theRoom).emit('gettup');
                io.to(theRoom).emit('status', 'The fighter got back up and is about to retaliate!');
                io.to(theRoom).emit('removeADV');
            }
            else{
                io.to(theRoom).emit('status', 'The fighter failed to get up');
                io.to(theRoom).emit('changeTurn');
            }
        }
    })

    socket.on('move', (moveName, isMyTurn, hasADV) => {
        
            console.log(`Received move, ${moveName}, from ${socket.id} while they are ${isMyTurn} with ${hasADV}`)
            var clientRooms = [];
            for (var room of socket.rooms){
                clientRooms.push(room);
            }
            const theRoom = clientRooms[0];
            console.log(theRoom);

            if (isMyTurn == true){
            switch(moveName){
                case "Jab":
                    if (Math.random() < 0.90){
                        
                        if(Math.random() < 0.15){
                            if(Math.random() < 0.10){
                                socket.to(theRoom).emit('takeDMG', 30);
                                socket.to(theRoom).emit('takeKD');
                                io.to(theRoom).emit('status', 'The move succeeded with a super crit and knocked them down!');
                                io.to(theRoom).emit('changeTurn');
                            }
                            else{
                                socket.to(theRoom).emit('takeDMG', 20);
                                io.to(theRoom).emit('status', 'The move succeeded with a critical hit!');
                                io.to(theRoom).emit('changeTurn');
                            }
                        }
                        else{
                            socket.to(theRoom).emit('takeDMG', 10);
                            io.to(theRoom).emit('status', 'The move succeeded');
                            io.to(theRoom).emit('changeTurn');
                        }
                    }
                    else{
                        io.to(theRoom).emit('status', 'The move failed');
                        io.to(theRoom).emit('changeTurn');
                    }
                    break;

                case "Single Leg":
                    if(Math.random() < 0.70){
                        socket.to(theRoom).emit('takeDWN');
                        io.to(theRoom).emit('status', 'The move succeeded');
                        io.to(theRoom).emit('changeTurn');
                    }
                    else{
                        io.to(theRoom).emit('status', 'The move failed');
                        io.to(theRoom).emit('changeTurn');
                    }
                    break;

                case "Rear Naked Choke":
                    if(hasADV == true){
                        console.log('Have ADV')
                        if(Math.random() < 0.30){
                            console.log('Sub');
                            socket.to(theRoom).emit('takeDMG', 200);
                            io.to(theRoom).emit('status', 'The move succeeded');
                            io.to(theRoom).emit('changeTurn');
                        }
                        else{
                            console.log('No Sub')
                            io.to(theRoom).emit('status', 'The move failed');
                            io.to(theRoom).emit('changeTurn');
                        }
                    }
                    else{
                        if(Math.random() < 0.05){
                            console.log('Sub');
                            socket.to(theRoom).emit('takeDMG', 200);
                            io.to(theRoom).emit('status', 'The move succeeded');
                            io.to(theRoom).emit('changeTurn');
                        }
                        else{
                            console.log('No Sub')
                            io.to(theRoom).emit('status', 'The move failed');
                            io.to(theRoom).emit('changeTurn');
                        }
                    }
                    break;

                case "Just Bleed":
                    break;

                default:
                    console.log('invalid move name')
                    
            }
        }
        else{
            console.log(`Received move from ${socket.id}, but it is not their turn yet`)
        }
    })
    
    
    socket.on('disconnect', function(){
        console.log(`Player ${socket.id} has disconnected`);

        console.log(socket.currentRoom);

        if(io.to(socket.currentRoom).emit('OppDisconnected')){
            console.log('Sent disconnect emit to room');
        }
        console.log(io.sockets.adapter.rooms);

    })


})




