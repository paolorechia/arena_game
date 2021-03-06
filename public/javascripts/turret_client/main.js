/*
Copyright (C) 2016 PR & DM web dev, Inc - All rights reserved.
Unauthorized copy, reproduction or distribution of this source code is strictly
prohibited.
Written by :
1 - Paolo Rechia <paolorechia at gmail dot com>
2 - Diogo Miloco <email...>

July, 2016

----------
Please note that this code runs on top of socket.io, which is subject to the
MIT licence however all derived code is subject to the proprietary copyright described above.
*/
/*puxa dois objetos tipo canvas do HTML gerado pelo node
o primeiro, background, eh usado para criar o espaco
(retangulo preto + pontos brancos)
o segundo c_ship, eh onde o jogo eh efetivamente desenhado e em varios
trechos do codigo eh referenciado como camera
*/
var stub = 0;
var data = require('./data.js')(stub);
var socket = io({transports: ['websocket']});

socket.on('myid', function(id){
   data.my_id = id;
   socket.emit('myid', data.my_id);
});

var c_background = document.getElementById("background");
var c_ship = document.getElementById("canvas_ship");
var ctx_background = c_background.getContext("2d");
var ctx_ship = c_ship.getContext("2d");

var input           = require('./input.js')(socket, data, c_ship);
var camera          = require('./camera.js')(socket);
var background      = require('./background.js')(ctx_background);
var ship            = require('./ship.js')(camera, background, data);
var calculo         = require('./calculo.js')(camera, data, ship);
var menu            = require('./menu.js')(data, camera, ctx_ship);
var lobby           = require('./lobby.js')(data, camera, ctx_ship);
var sound           = require('./sound.js')(data, ship); 
var settings        = require('./settings.js')(data, camera, ctx_ship, sound);
var draw            = require('./draw.js')(ship, camera, background, data, ctx_ship,calculo, menu, lobby, settings);
socket.on('message', function(message){
//    console.log(message);
});
socket.on('asteroides', function(novo){
    data.asteroids = novo;
});
socket.on('blasters', function(received_blasters){
    data.blasters = received_blasters;
});
/* funcoes de inicializacao de variaveis*/


console.log(sound);
//Versão antiga -- usar quando o bug da mira for corrigido -----
//camera.setRes(1600, 900, c_ship);
//--------------------------------------------------------------
camera.setRes(window.innerWidth-10, window.innerHeight-10, c_ship);
console.log(window.innerWidth, window.innerHeight);
console.log(camera);


background.inicia(ctx_background, c_background);
ship.inicia();
menu.initButtons();
lobby.initButtons();
settings.init();

console.log(ship);
socket.on('movimento', function(nova_pos){
//    console.log(nova_pos);
    ship.x = (nova_pos.x);
    ship.y = (nova_pos.y);
//    console.log(ship.x, ship.y);
});
socket.on('players', function(received_players){
//    console.log(other_players);
    data.players = received_players;
});
socket.on('players_id', function(received_ids){
//    console.log(other_players);
    data.players_id = received_ids;
});
socket.on('players_pointers', function(received_pointers){
//    console.log(other_players);
    data.players_pointers = received_pointers;
});

socket.on('lasers', function(received_lasers){
    data.lasers = received_lasers;
//    console.log(lasers);
});

socket.on('status', function(estado){
    ship.vida = estado.hp;
    ship.shield = estado.shield;
    ship.energy = estado.energy;
    ship.kills = estado.player_kills;
    ship.weapon = estado.weapon;
});



//incializacao de variaveis do loop principal
var lastFrameTimeMs = 0;
var maxFPS = 90;
var tempo = 0;

/*loop principal do jogo -- eh necessario em razao de uma limitacao
do javascript que roda assincronamente (a rigor, tudo eh assincrono,
ateh sistemas operacionais, sei lah pq chamam assim */

function gameLoop(timestamp){

    //c_ship.dispatchEvent(mousemove);


    tempo++;                // indice utilizado para criacao de asteroides
//    console.log(tempo);

    // condicional de controle de FPS, soh atualiza o quadro quando
    // o intervalo minimo de tempo eh passado
    if (timestamp < lastFrameTimeMs + (1000/maxFPS)){
        return;
    }
    lastFrameTimeMs = timestamp;
    // chamadas de desenho & calculo
    draw.camera(camera, ctx_ship);           // desenha no canvas da camera
    draw.allAsteroids();          // desenha todos os asteroides do vetor
    draw.allEnemies();
    draw.allLasers();
    draw.allBlasters();
    calculo.versor(ship.versor);      // calcula vetor versor (de geometria analitica) do ship
    draw.ship(ctx_ship, ship.raio, calculo.anguloGiro(ship, data.coord));                      // desenha o ship atualizado com a rotacao
//        limob demanda que puxa esse script (e taAsteroides();
//    console.log(ship.vetorLaser);
//    colisoes.confere();                 // confere colisao de tudo (asteroides, ship, laser, bordas)
    // if abaixo calcula um versor a partir do ultimo touch n drag
    // e manda para o servidor
    draw.hud();      // desenha hud
    sound.play();
}

function menuLoop(timestamp){
       gameLoop(timestamp);
       draw.menu();
       menu.checkHovers();
       menu.checkClicks();
       data.resetClick();
};

function lobbyLoop(timestamp){
    draw.lobby();
    lobby.checkHovers();
    lobby.checkClicks();
    data.resetClick();
}

function settingsLoop(timestamp){
    draw.settings();
    settings.checkBarHovers();
    settings.updateVolume();
    settings.checkHovers();
    settings.checkClicks();
    data.resetClick();
}


function mainLoop(timestamp){
    if (data.gameState == "playing"){
        (gameLoop(timestamp));
    }
    else if (data.gameState == "menu"){
        menuLoop(timestamp);
    }
    else if (data.gameState == "settings"){
        settingsLoop(timestamp);
    }
    else if (data.gameState == "lobby"){
        lobbyLoop(timestamp);
    }
    console.log(data.gameState);
    requestAnimationFrame(mainLoop);
}

// testando firebug
console.log("1 c4n 7yp3 t0 c0ns0l3!");
//console.log(background.width, background.height);

// execucao principal aqui
// inicia iteracoes no loop principal
setTimeout(function(){
   console.log("my id is: " + data.my_id);
   socket.emit('camera', camera);
   requestAnimationFrame(mainLoop);
},
   2000);

