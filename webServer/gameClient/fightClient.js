
const socket = io();

var isMyTurn = false;

socket.on('test', (msg) => {
    console.log(msg);
})

socket.on('matchFound', function() {
    console.log('Received matchFound emit');
    document.getElementById('ChooseHeader').style.display = 'none';
    document.getElementById('LobbyButtons').style.display = 'none';
    document.getElementById('chosenWeight').innerHTML = 'Found a match! Starting the game...'
    if(document.getElementById('GameHud').style.display = 'block'){
        document.getElementById('chosenWeight').style.display = 'none';
    }
})

socket.on('status', (msg) => {
    document.getElementById('StatusUpdate').innerHTML = msg;
})

socket.on('changeTurn', function() {
    console.log(isMyTurn);
    isMyTurn != isMyTurn;
    console.log(isMyTurn);
    if(isMyTurn == true){
        document.getElementById('TurnUpdate').innerHTML = 'It is now your turn!';
    }
    else{
        document.getElementById('TurnUpdate').innerHTML = 'It is the opponent\'s turn';
    }
})

socket.on('takeDMG', (dmg) => {
    if (isMyTurn == false){
        console.log('Received takeDMG emit')
        var health = document.getElementById('fighter01Health');
        health.value -= dmg;
        isMyTurn = !isMyTurn;
    }
    
})



function move1(){
    var moveName = document.getElementById('Move1').innerText;
    if(socket.emit('move', moveName, isMyTurn)){
        console.log(`Sent move, ${moveName}, to server`);
        console.log(isMyTurn);
        isMyTurn = !isMyTurn;
    }
}
function move2(){
    var moveName = document.getElementById('Move2');
    socket.emit('move', moveName);
}
function move3(){
    var moveName = document.getElementById('Move3');
    socket.emit('move', moveName);
}
function move4(){
    var moveName = document.getElementById('Move4');
    socket.emit('move', moveName);
}

function swButton(){

    socket.emit('joinSW')
    alert('You have joined the Strawweight Lobby!')
    document.getElementById('chosenWeight').innerHTML = 'Currently waiting for a match in Strawweight...'
}

function flwButton(){

    socket.emit('joinFLW')
    alert('You have joined the Flyweight Lobby!')
    document.getElementById('chosenWeight').innerHTML = 'Currently waiting for a match in Flyweight...'
}


function bwButton(){

    socket.emit('joinBW')
    alert('You have joined the Bantamweight Lobby!')
    document.getElementById('chosenWeight').innerHTML = 'Currently waiting for a match in Bantamweight...'
}

function fwButton(){

    socket.emit('joinFW')
    alert('You have joined the Featherweight Lobby!')
    document.getElementById('chosenWeight').innerHTML = 'Currently waiting for a match in Featherweight...'
}

function lwButton(){

    socket.emit('joinLW')
    alert('You have joined the Lightweight Lobby!')
    document.getElementById('chosenWeight').innerHTML = 'Currently waiting for a match in Lightweight...'
}

function wwButton(){

    socket.emit('joinWW')
    alert('You have joined the Welterweight Lobby!')
    document.getElementById('chosenWeight').innerHTML = 'Currently waiting for a match in Welterweight...'
}

function mwButton(){

    socket.emit('joinMW')
    alert('You have joined the Middleweight Lobby!')
    document.getElementById('chosenWeight').innerHTML = 'Currently waiting for a match in Middleweight...'
}

function lhwButton(){

    socket.emit('joinLHW')
    alert('You have joined the Light Heavyweight Lobby!')
    document.getElementById('chosenWeight').innerHTML = 'Currently waiting for a match in Light Heavyweight...'
}

function hwButton(){

    socket.emit('joinHW')
    alert('You have joined the Heavyweight Lobby!')
    document.getElementById('chosenWeight').innerHTML = 'Currently waiting for a match in Heavyweight...'
}