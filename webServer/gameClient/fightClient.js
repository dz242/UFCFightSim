//import { createRequire } from 'module';
//const require = createRequire(import.meta.url);

//const e = require("express");

import * as e from "express";

import * as Memcached from 'memcached';
//var Memcached = require('memcached');
var memcached = new Memcached('127.0.0.1:11211');

if (memcached.get("username", function (err, data) {
	alert('welcome ' + data);
})){
	console.log(`Recieved username ${data}`);
}
else {
	console.log('Could not recieve username fro memcached');
}
const socket = io();


var isMyTurn = false;
var hasADV = false;
var isTD = false;
var isKD = false;
var dmgBuff = 0;
var buffTurnCounter = 0;


socket.on('test', (msg) => {
    console.log(msg);
})

socket.on('OppDisconnected', function(){
    console.log('Received disconnect emit');
    document.getElementById('ChooseHeader').style.display = 'block';
    document.getElementById('LobbyButtons').style.display = 'block';
    document.getElementById('chosenWeight').innerHTML = 'Found a match! Starting the game...'
    if(document.getElementById('GameHud').style.display = 'none'){
        document.getElementById('chosenWeight').style.display = 'block';
    }
    alert('Your opponent has left the match, you may choose to join another lobby');
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
    isMyTurn = !isMyTurn;
    console.log(`${isMyTurn}, changed by changeTurn event`);
    if(isMyTurn == true && document.getElementById('fighter01Health').value > 0){
        if(isTD || isKD){
            document.getElementById('Move3').disabled = false;
            document.getElementById('Gettup').style.display = 'block';
        }
        else{
            document.getElementById('Move1').disabled = false;
            document.getElementById('Move2').disabled = false;
            document.getElementById('Move3').disabled = false;
            document.getElementById('Move4').disabled = false;

        }
        
        if(hasADV == true){
            document.getElementById('TurnUpdate').innerHTML = 'It is now your turn with advantage!';
        }
        else{
            document.getElementById('TurnUpdate').innerHTML = 'It is now your turn!';
        }

        if(buffTurnCounter > 0){
            buffTurnCounter -= 1;
            console.log(`buffTurnCounter = ${buffTurnCounter} after changeTurn`)
        }

    }
    else{
        document.getElementById('Move1').disabled = true;
        document.getElementById('Move2').disabled = true;
        document.getElementById('Move3').disabled = true;
        document.getElementById('Move4').disabled = true;
        document.getElementById('Gettup').style.display = 'none';
        
        document.getElementById('TurnUpdate').innerHTML = 'It is the opponent\'s turn';
    }
})

socket.on('takeDMG', (dmg) => {
    if(isMyTurn == false){
        console.log('Received takeDMG emit')
        var health = document.getElementById('fighter01Health');
        health.value -= dmg;
    }
    else{
        var health = document.getElementById('fighter11Health');
        health.value -= dmg;
    }
})


socket.on('takeDWN', function() {
    if (isMyTurn == false){
        console.log('Received takeDWN emit');
        isTD = true;
        document.getElementById('Move1').disabled = true;
        document.getElementById('Move2').disabled = true;
        document.getElementById('Move4').disabled = true;
        document.getElementById('Gettup').style.display = 'block';
    }
    else{
        hasADV = true;
        document.getElementById('fighter11Status').innerHTML = '<strong>DOWN</strong>'
    }
})

socket.on('takeKD', function(){
    if (isMyTurn == false){
        console.log('Received takeKD emit');
        isKD = true;
        document.getElementById('Move1').disabled = true;
        document.getElementById('Move2').disabled = true;
        document.getElementById('Move4').disabled = true;
        document.getElementById('Gettup').style.display = 'block';
    }
    else{
        document.getElementById('fighter11Status').innerHTML = '<strong>DOWN</strong>'
    }
})

socket.on('removeADV', function(){
    hasADV = false;
})

socket.on('playEmoteHeheheha', senderID => {
    console.log(`Received emote from ${senderID}`);
    if(socket.id === senderID){
        document.getElementById('emoteUs').src = 'heheheha.gif'
        setTimeout(hideUs, 3000);
    }
    else{
        document.getElementById('emoteThem').src = 'heheheha.gif'
        setTimeout(hideThem, 3000);
    }
})

socket.on('playEmoteRogan', senderID => {
    console.log(`Received emote from ${senderID}`);
    if(socket.id === senderID){
        document.getElementById('emoteUs').src = 'rogan.gif';
        setTimeout(hideUs, 3000);
    }
    else{
        document.getElementById('emoteThem').src = 'rogan.gif';
        setTimeout(hideThem, 3000);
    }
})

socket.on('receiveDMGBuff', (buff, buffDuration) =>{
    if(isMyTurn == true){
        dmgBuff += buff;
        console.log(`dmgBuff = ${dmgBuff}`);
        buffTurnCounter = buffDuration;
        console.log(`buffTurnCounter = ${buffTurnCounter}`);
    }

})


socket.on('gettup', function(){
    if(isMyTurn == true){
        isTD = false;
        isKD = false;
        document.getElementById('Move1').disabled = false;
        document.getElementById('Move2').disabled = false;
        document.getElementById('Move4').disabled = false;
        document.getElementById('Gettup').style.display = 'none';
    }
})

function hideUs(){
    document.getElementById('emoteUs').src = '';
}

function hideThem(){
    document.getElementById('emoteThem').src = '';
}

function move1(){
    var moveName = document.getElementById('Move1').innerText;
    if(isMyTurn == true){
        socket.emit('move', moveName, isMyTurn, hasADV, dmgBuff)
        console.log(`Sent move, ${moveName}, to server while ${isMyTurn}`);
        console.log(`Turn value changed to ${isMyTurn}`)
    }
        
}
function move2(){
    var moveName = document.getElementById('Move2').innerText;
    if(isMyTurn == true){
        socket.emit('move', moveName, isMyTurn, hasADV)
        console.log(`Sent move, ${moveName}, to server while ${isMyTurn}`);
        console.log(`Turn value changed to ${isMyTurn}`)
    }
}
function move3(){
    var moveName = document.getElementById('Move3').innerText;
    if(isMyTurn == true){
        socket.emit('move', moveName, isMyTurn, hasADV)
        console.log(`Sent move, ${moveName}, to server while ${isMyTurn}`);
        console.log(`Turn value changed to ${isMyTurn}`)
    }
}
function move4(){
    var moveName = document.getElementById('Move4').innerText;
    if(isMyTurn == true){
        socket.emit('move', moveName, isMyTurn, hasADV)
        console.log(`Sent move, ${moveName}, to server while ${isMyTurn}`);
        console.log(`Turn value changed to ${isMyTurn}`)
    }
}

function tryGettup(){
    if(isMyTurn == true){
        socket.emit('tryGettup', isMyTurn)
        console.log(`Sent tryGettup to server while ${isMyTurn}`);
        console.log(`Turn value changed to ${isMyTurn}`);
    }
}


function heheEmote(){
    socket.emit('heheheha');
}

function roganEmote(){
    socket.emit('rogan');
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
