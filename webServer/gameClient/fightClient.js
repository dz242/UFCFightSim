
/*
var Memcached = require('memcached');
var memcached = new Memcached('127.0.0.1:11211');

if(memcached.get("username", function(err, data){
    (alert('welcome ' + data));
})){
    console.log(`Received username ${data}`);
}
else{
    console.log('Could not receive username from memcached');
}
*/

const socket = io();

var isMyTurn = false;
var hasLost = false;

//below are variables containing all of the names of both our's (f1,f2,f3) and the enemy's fighters (e1,e2,e3) and set them in the HTML

var f1_name = 'Default Fighter';
var f2_name = 'Default Fighter';
var f3_name = 'Default Fighter';

var currentFighter = 'fighter01';
var currentEnemy = 'enemy01';

var e1_name = 'Default Fighter';
var e2_name = 'Default Fighter';
var e3_name = 'Default Fighter';

document.getElementById('FighterName01') = f1_name;
document.getElementById('FighterName02') = f2_name;
document.getElementById('FighterName03') = f3_name;

document.getElementById('FighterName11') = e1_name;
document.getElementById('FighterName12') = e2_name;
document.getElementById('FighterName13') = e3_name;

//below are combat-state flags and stored buffs for each fighter

var f1_hasADV = false;
var f1_isTD = false;
var f1_isKD = false;
var f1_dmgBuff = 0;
var f1_buffTurnCounter = 0;

var f2_hasADV = false;
var f2_isTD = false;
var f2_isKD = false;
var f2_dmgBuff = 0;
var f2_buffTurnCounter = 0;

var f3_hasADV = false;
var f3_isTD = false;
var f3_isKD = false;
var f3_dmgBuff = 0;
var f3_buffTurnCounter = 0;

//below is where we are instantiating stats for each fighter to be overwritten by real stats for each fighter

var f1_sig_str_land_pM = 0.00;
var f1_sig_str_land_pct = 0.00;
var f1_sig_str_abs_pM = 0.00;
var f1_sig_str_def_pct = 0.00;
var f1_td_avg = 0.00;
var f1_td_land_pct = 0.00;
var f1_td_def_pct = 0.00;
var f1_sub_avg = 0.00;


var f2_sig_str_land_pM = 0.00;
var f2_sig_str_land_pct = 0.00;
var f2_sig_str_abs_pM = 0.00;
var f2_sig_str_def_pct = 0.00;
var f2_td_avg = 0.00;
var f2_td_land_pct = 0.00;
var f2_td_def_pct = 0.00;
var f2_sub_avg = 0.00;


var f3_sig_str_land_pM = 0.00;
var f3_sig_str_land_pct = 0.00;
var f3_sig_str_abs_pM = 0.00;
var f3_sig_str_def_pct = 0.00;
var f3_td_avg = 0.00;
var f3_td_land_pct = 0.00;
var f3_td_def_pct = 0.00;
var f3_sub_avg = 0.00;


socket.on('test', (msg) => {
    console.log(msg);
})

socket.on('OppDisconnected', function(){
    console.log('Received disconnect emit');
    document.getElementById('ChooseHeader').style.display = 'block';
    document.getElementById('LobbyButtons').style.display = 'block';
    document.getElementById('chosenWeight').innerHTML = 'Choose a weight class...'
    document.getElementById('GameHud').style.display = 'none'
    document.getElementById('chosenWeight').style.display = 'block';
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
    socket.emit('sendFighterNames', f1_name, f2_name, f3_name);
})

socket.on('status', (msg) => {
    document.getElementById('StatusUpdate').innerHTML = msg;
})

//140 fucking lines just to change the turn
socket.on('changeTurn', function() {
    console.log(isMyTurn);
    isMyTurn = !isMyTurn;
    console.log(`${isMyTurn}, changed by changeTurn event`);
    if(isMyTurn == true && (document.getElementById('fighter01Health').value > 0 || document.getElementById('fighter02Health').value > 0 || document.getElementById('fighter03Health').value > 0)){
        switch(currentFighter){
            case 'fighter01':
                if(f1_isTD || f1_isKD){
                    document.getElementById('f1_Move3').disabled = false;
                    document.getElementById('Gettup01').style.display = 'block';
                }
                else{
                    document.getElementById('f1_Move1').disabled = false;
                    document.getElementById('f1_Move2').disabled = false;
                    document.getElementById('f1_Move3').disabled = false;
                    document.getElementById('f1_Move4').disabled = false;
        
                }
                
                if(f1_hasADV == true){
                    document.getElementById('TurnUpdate').innerHTML = 'It is now your turn with advantage!';
                }
                else{
                    document.getElementById('TurnUpdate').innerHTML = 'It is now your turn!';
                }
        
                if(f1_buffTurnCounter > 0){
                    f1_buffTurnCounter -= 1;
                    console.log(`${currentFighter} buffTurnCounter = ${f1_buffTurnCounter} after changeTurn`);
                }
                break;

            case 'fighter02':
                if(f2_isTD || f2_isKD){
                    document.getElementById('f2_Move3').disabled = false;
                    document.getElementById('Gettup02').style.display = 'block';
                }
                else{
                    document.getElementById('f2_Move1').disabled = false;
                    document.getElementById('f2_Move2').disabled = false;
                    document.getElementById('f2_Move3').disabled = false;
                    document.getElementById('f2_Move4').disabled = false;
        
                }
                
                if(f2_hasADV == true){
                    document.getElementById('TurnUpdate').innerHTML = 'It is now your turn with advantage!';
                }
                else{
                    document.getElementById('TurnUpdate').innerHTML = 'It is now your turn!';
                }
        
                if(f2_buffTurnCounter > 0){
                    f2_buffTurnCounter -= 1;
                    console.log(`${currentFighter} buffTurnCounter = ${f2_buffTurnCounter} after changeTurn`);
                }
                break;

            case 'fighter03':
                if(f3_isTD || f3_isKD){
                    document.getElementById('f3_Move3').disabled = false;
                    document.getElementById('Gettup03').style.display = 'block';
                }
                else{
                    document.getElementById('f3_Move1').disabled = false;
                    document.getElementById('f3_Move2').disabled = false;
                    document.getElementById('f3_Move3').disabled = false;
                    document.getElementById('f3_Move4').disabled = false;
        
                }
                
                if(f3_hasADV == true){
                    document.getElementById('TurnUpdate').innerHTML = 'It is now your turn with advantage!';
                }
                else{
                    document.getElementById('TurnUpdate').innerHTML = 'It is now your turn!';
                }
        
                if(f3_buffTurnCounter > 0){
                    f3_buffTurnCounter -= 1;
                    console.log(`${currentFighter} buffTurnCounter = ${f3_buffTurnCounter} after changeTurn`);
                }
                break;
            default:
                console.log('Invalid Fighter chosen by changeTurn function');
                break;
        }
    }

    else if((document.getElementById('fighter01Health').value > 0 || document.getElementById('fighter02Health').value > 0 || document.getElementById('fighter03Health').value > 0)){
        document.getElementById('f1_Move1').disabled = true;
        document.getElementById('f1_Move2').disabled = true;
        document.getElementById('f1_Move3').disabled = true;
        document.getElementById('f1_Move4').disabled = true;
        document.getElementById('Gettup01').style.display = 'none';

        document.getElementById('f2_Move1').disabled = true;
        document.getElementById('f2_Move2').disabled = true;
        document.getElementById('f2_Move3').disabled = true;
        document.getElementById('f2_Move4').disabled = true;
        document.getElementById('Gettup02').style.display = 'none';

        document.getElementById('f3_Move1').disabled = true;
        document.getElementById('f3_Move2').disabled = true;
        document.getElementById('f3_Move3').disabled = true;
        document.getElementById('f3_Move4').disabled = true;
        document.getElementById('Gettup03').style.display = 'none';
        
        document.getElementById('TurnUpdate').innerHTML = 'It is the opponent\'s turn';
    }

    else{
        console.log(`${socket.id} just fucking lost, none of their fighters have health above 0`);

        hasLost = true;

        document.getElementById('f1_Move1').disabled = true;
        document.getElementById('f1_Move2').disabled = true;
        document.getElementById('f1_Move3').disabled = true;
        document.getElementById('f1_Move4').disabled = true;
        document.getElementById('Gettup01').style.display = 'none';

        document.getElementById('f2_Move1').disabled = true;
        document.getElementById('f2_Move2').disabled = true;
        document.getElementById('f2_Move3').disabled = true;
        document.getElementById('f2_Move4').disabled = true;
        document.getElementById('Gettup02').style.display = 'none';

        document.getElementById('f3_Move1').disabled = true;
        document.getElementById('f3_Move2').disabled = true;
        document.getElementById('f3_Move3').disabled = true;
        document.getElementById('f3_Move4').disabled = true;
        document.getElementById('Gettup03').style.display = 'none';

        socket.emit('endGame');

    }
})

socket.on('alertResults', function(){
    if(hasLost == true){
        document.getElementById('ChooseHeader').style.display = 'block';
        document.getElementById('LobbyButtons').style.display = 'block';
        document.getElementById('chosenWeight').innerHTML = 'Choose a weight class...'
        document.getElementById('GameHud').style.display = 'none'
        document.getElementById('chosenWeight').style.display = 'block';
        alert('You just lost! Skill issue');
    }
    else{
        document.getElementById('ChooseHeader').style.display = 'block';
        document.getElementById('LobbyButtons').style.display = 'block';
        document.getElementById('chosenWeight').innerHTML = 'Choose a weight class...'
        document.getElementById('GameHud').style.display = 'none'
        document.getElementById('chosenWeight').style.display = 'block';
        alert('You win!')
    }
})

socket.on('takeDMG', (dmg) => {
    if(isMyTurn == false){
        switch(currentFighter){
            case 'fighter01':
                console.log('Received takeDMG emit')
                var health = document.getElementById('fighter01Health');
                health.value -= dmg;
                break;

            case 'fighter02':
                console.log('Received takeDMG emit')
                var health = document.getElementById('fighter02Health');
                health.value -= dmg;
                break;

            case 'fighter03':
                console.log('Received takeDMG emit')
                var health = document.getElementById('fighter03Health');
                health.value -= dmg;
                break;
            
            default:
                console.log('Invalid Fighter given by takeDMG socket event');
        }
    }
    else {
        switch(currentEnemy){
            case 'enemy01':
                var health = document.getElementById('enemy01Health');
                health.value -= dmg;
                break;

            case 'enemy02':
                var health = document.getElementById('enemy02Health');
                health.value -= dmg;
                break;

            case 'enemy03':
                var health = document.getElementById('enemy03Health');
                health.value -= dmg;
                break;

            default:
                console.log('Invalid Enemy chosen by takeDMG socket event');
                break;

        }
    }
})


socket.on('takeDWN', function() {
    if (isMyTurn == false){
        console.log('Received takeDWN emit');

        switch(currentFighter){
            case 'fighter01':
                f1_isTD = true;
                document.getElementById('f1_Move1').disabled = true;
                document.getElementById('f1_Move2').disabled = true;
                document.getElementById('f1_Move4').disabled = true;
                document.getElementById('Gettup01').style.display = 'block';
                break;

            case 'fighter02':
                f2_isTD = true;
                document.getElementById('f2_Move1').disabled = true;
                document.getElementById('f2_Move2').disabled = true;
                document.getElementById('f2_Move4').disabled = true;
                document.getElementById('Gettup02').style.display = 'block';
                break;

            case 'fighter03':
                f3_isTD = true;
                document.getElementById('f3_Move1').disabled = true;
                document.getElementById('f3_Move2').disabled = true;
                document.getElementById('f3_Move4').disabled = true;
                document.getElementById('Gettup03').style.display = 'block';
                break;
            
            default:
                console.log('Invalid Fighter chosen by takeDWN socket event');
                break;
        }
    }
    else {
        switch(currentEnemy){
            case 'enemy01':
                switch(currentFighter){
                    case 'fighter01':
                        f1_hasADV = true;
                        document.getElementById('enemy01Status').innerHTML = '<strong>DOWN</strong>';
                        break;

                    case 'fighter02':
                        f2_hasADV = true;
                        document.getElementById('enemy01Status').innerHTML = '<strong>DOWN</strong>';
                        break;

                    case 'fighter03':
                        f3_hasADV = true;
                        document.getElementById('enemy01Status').innerHTML = '<strong>DOWN</strong>';
                        break;
                }
                break;

            case 'enemy02':
                switch(currentFighter){
                    case 'fighter01':
                        f1_hasADV = true;
                        document.getElementById('enemy02Status').innerHTML = '<strong>DOWN</strong>';
                        break;

                    case 'fighter02':
                        f2_hasADV = true;
                        document.getElementById('enemy02Status').innerHTML = '<strong>DOWN</strong>';
                        break;

                    case 'fighter03':
                        f3_hasADV = true;
                        document.getElementById('enemy02Status').innerHTML = '<strong>DOWN</strong>';
                        break;
                }
            
            case 'enemy03':
                switch(currentFighter){
                    case 'fighter01':
                        f1_hasADV = true;
                        document.getElementById('enemy03Status').innerHTML = '<strong>DOWN</strong>';
                        break;

                    case 'fighter02':
                        f2_hasADV = true;
                        document.getElementById('enemy03Status').innerHTML = '<strong>DOWN</strong>';
                        break;

                    case 'fighter03':
                        f3_hasADV = true;
                        document.getElementById('enemy03Status').innerHTML = '<strong>DOWN</strong>';
                        break;
                }

            
        }

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
    switch(currentFighter){
        case 'fighter01':
            f1_hasADV = false;
        case 'fighter01':
            f2_hasADV = false;
        case 'fighter01':
            f3_hasADV = false;
    }

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

socket.on('switchEnemy', switchedFighter => {
    switch(switchedFighter){
        case 'fighter01':
            currentEnemy = 'enemy01';
            document.getElementById('Enemy01').style.textAlign = left;
            document.getElementById('Enemy02').style.textAlign = right;
            document.getElementById('Enemy03').style.textAlign = right;
            break;

        case 'fighter02':
            currentEnemy = 'enemy02';
            document.getElementById('Enemy01').style.textAlign = right;
            document.getElementById('Enemy02').style.textAlign = left;
            document.getElementById('Enemy03').style.textAlign = right;
            break;

        case 'fighter03':
            currentEnemy = 'enemy03';
            document.getElementById('Enemy01').style.textAlign = right;
            document.getElementById('Enemy02').style.textAlign = right;
            document.getElementById('Enemy03').style.textAlign = left;
            break;
            
        default:
            console.log('Invalid Fighter chosen by the switchEnemy socket event');
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
        switch (currentFighter){
            case 'fighter01':
                socket.emit('tryGettup', isMyTurn, f1_td_def_pct)
                console.log(`Sent tryGettup to server while ${isMyTurn}`);
                console.log(`Turn value changed to ${isMyTurn}`);
                break;

            case 'fighter02':
                socket.emit('tryGettup', isMyTurn, f2_td_def_pct)
                console.log(`Sent tryGettup to server while ${isMyTurn}`);
                console.log(`Turn value changed to ${isMyTurn}`);
                break;            

            case 'fighter03':
                socket.emit('tryGettup', isMyTurn, f3_td_def_pct)
                console.log(`Sent tryGettup to server while ${isMyTurn}`);
                console.log(`Turn value changed to ${isMyTurn}`);
                break;

            default:
                console.log('Invalid Fighter chosen by tryGettup()');
        }


    }
}

function switchTo01(){
    currentFighter = 'fighter01';
    document.getElementById('Fighter01').style.textAlign = right;
    document.getElementById('f1_Moves').style.display = 'block';
    document.getElementById('Fighter02').style.textAlign = left;
    document.getElementById('f2_Moves').style.display = 'none';
    document.getElementById('Gettup02').style.display = 'none';
    document.getElementById('Fighter03').style.textAlign = left;
    document.getElementById('f3_Moves').style.display = 'none';
    document.getElementById('Gettup03').style.display = 'none';
    if(f1_isKD || f1_isTD){
        document.getElementById('Gettup01').style.display = 'block';
    }
    else{
        document.getElementById('Gettup01').style.display = 'none';
    }
    socket.emit('switchFighter', currentFighter);
}

function switchTo02(){
    currentFighter = 'fighter02';
    document.getElementById('Fighter01').style.textAlign = left;
    document.getElementById('f1_Moves').style.display = 'none';
    document.getElementById('Gettup01').style.display = 'none';
    document.getElementById('Fighter02').style.textAlign = right;
    document.getElementById('f2_Moves').style.display = 'block';
    document.getElementById('Fighter03').style.textAlign = left;
    document.getElementById('f3_Moves').style.display = 'none';
    document.getElementById('Gettup03').style.display = 'none';
    if(f2_isKD || f2_isTD){
        document.getElementById('Gettup02').style.display = 'block';
    }
    else{
        document.getElementById('Gettup02').style.display = 'block';
    }
    socket.emit('switchFighter', currentFighter);
}

function switchTo03(){
    document.getElementById('Fighter01').style.textAlign = left;
    document.getElementById('f1_Moves').style.display = 'none';
    document.getElementById('Gettup01').style.display = 'none';
    document.getElementById('Fighter02').style.textAlign = left;
    document.getElementById('f2_Moves').style.display = 'none';
    document.getElementById('Gettup02').style.display = 'none';
    document.getElementById('Fighter03').style.textAlign = right;
    document.getElementById('f3_Moves').style.display = 'block';
    if(f3_isKD || f3_isTD){
        document.getElementById('Gettup03').style.display = 'block';
    }
    else{
        document.getElementById('Gettup03').style.display = 'block';
    }
    socket.emit('switchFighter', currentFighter);
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