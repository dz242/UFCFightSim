
const socket = io();

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