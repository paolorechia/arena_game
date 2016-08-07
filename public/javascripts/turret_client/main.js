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

var input = require('./input.js')(socket, data);
var c_background = document.getElementById("background");
var c_ship = document.getElementById("canvas_ship");
var ctx_background = c_background.getContext("2d");
var ctx_ship = c_ship.getContext("2d");
var camera = require('./camera.js')(socket);
var background = require('./background.js')(ctx_background);
var ship = require('./ship.js')(camera, background, data);
var calculo = require('./calculo.js')(camera, data, ship);
var menu = require('./menu.js')(data, camera, ctx_ship);
var draw = require('./draw.js')(ship, camera, background, data, ctx_ship,calculo, menu);


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


var sound = document.getElementById("blaster");
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

// funcoes de evento
function pegaCoordenadas(event){
    data.coord.x = event.clientX;
    data.coord.y = event.clientY;
    socket.emit('coord', data.coord);
}
function pegaCoordenadasMobile(event){
    data.coord.x = event.touches[0].clientX;
    data.coord.y = event.touches[0].clientY;
    socket.emit('coord', data.coord);
}
/* conjunto de eventos lidos a partir do mouse e do teclado,
na falta de um lugar melhor ainda estao aqui
A cada escuta de evento é associada uma acao + uma funcao
*/



//Nova forma de controlar o evento ---------------------------------------------
/*
var mousemove = document.createEvent('Event');
mousemove.initEvent('mousemove', true, true);
c_ship.addEventListener('mousemove', function(e) {
  pegaCoordenadas(e);
}, false)
*/


var mobile_coord = [];
//------------------------------------------------------------------------------
c_ship.addEventListener("touchstart", pegaCoordenadasMobile, false);
c_ship.addEventListener("touchstart", function(){ atirou(1); 
                                                   sound.currentTime = 0.07;
                                                   sound.play();},
                                                   false);
c_ship.addEventListener("touchend", function(){ atirou(0)}, false);
//c_ship.addEventListener("touchmove", pegaCoordenadasMobile, false);
c_ship.addEventListener("touchmove", input.atualizaMobile, false);
c_ship.addEventListener("mousemove", pegaCoordenadas, false);
c_ship.addEventListener("mousedown", function(){ input.mousePress(1); 
                                                   sound.currentTime = 0.07;
                                                   sound.play();},
                                                   false);
c_ship.addEventListener("mouseup", function(){ input.mousePress(0)}, false);
window.addEventListener("keydown", function(event){ input.atualiza(event)}, false);

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
    if (tempo % 10 == 0){
//        socket.emit('inputmobile', mobile_data.coord.length);
//        socket.emit('inputmobile', mobile_data.coord);
        if (mobile_coord != undefined && mobile_coord[0] != undefined){
            calculo.versor_mobile(ship.versor_mobile);
            socket.emit('inputmobile', ship.versor_mobile);
            mobile_coord = [];
        }
    }
    draw.hud();      // desenha hud
}

function menuLoop(timestamp){
       if (menu.buttons.back.clicked == true){
            data.gameState = "playing";
       }
       gameLoop(timestamp);
       draw.menu();
};


function mainLoop(timestamp){
    if (data.gameState == "playing"){
        (gameLoop(timestamp));
    }
    if (data.gameState == "menu"){
        menuLoop(timestamp);
    }
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

