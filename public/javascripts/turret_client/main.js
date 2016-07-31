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
o segundo c_turret, eh onde o jogo eh efetivamente desenhado e em varios
trechos do codigo eh referenciado como camera
*/
var stub = 0;
var data = require('./data.js')(stub);
var calculo = require('./calculo.js')(stub);
var draw = require('./draw.js')(stub);
var socket = io({transports: ['websocket']});
var input = require('./input.js')(stub);
var c_background = document.getElementById("background");
var c_turret = document.getElementById("canvas_turret");
var ctx_background = c_background.getContext("2d");
var ctx_turret = c_turret.getContext("2d");
var camera = require('./camera.js')(ctx_turret);
var background = require('./background.js')(ctx_background);
var turret = require('./turret.js')(camera, background, data);


socket.on('message', function(message){
//    console.log(message);
});
socket.on('asteroides', function(novo){
    data.asteroids = novo;
});
var blasters = [];
socket.on('blasters', function(received_blasters){
    blasters = received_blasters;
});
var my_id = 0;
socket.on('myid', function(id){
   my_id = id;
   socket.emit('myid', my_id);
});
/* funcoes de inicializacao de variaveis*/


var sound = document.getElementById("blaster");
console.log(sound);
//Versão antiga -- usar quando o bug da mira for corrigido -----
//camera.setRes(1600, 900, c_turret);
//--------------------------------------------------------------
camera.setRes(window.innerWidth-10, window.innerHeight-10, c_turret);
console.log(window.innerWidth, window.innerHeight);
console.log(camera);


background.inicia(ctx_background, c_background);
turret.inicia();

socket.on('movimento', function(nova_pos){
//    console.log(nova_pos);
    turret.x = (nova_pos.x);
    turret.y = (nova_pos.y);
//    console.log(turret.x, turret.y);
});
socket.on('players', function(received_players){
//    console.log(other_players);
    players = received_players;
});
socket.on('players_id', function(received_ids){
//    console.log(other_players);
    players_id = received_ids;
});
socket.on('players_pointers', function(received_pointers){
//    console.log(other_players);
    players_pointers = received_pointers;
});

var lasers = [];
socket.on('lasers', function(received_lasers){
    lasers = received_lasers;
//    console.log(lasers);
});

socket.on('status', function(estado){
    turret.hud.stats.vida = estado.hp;
    turret.hud.stats.shield = estado.shield;
    turret.hud.stats.energy = estado.energy;
    turret.hud.stats.kills = estado.player_kills;
    turret.hud.stats.weapon = estado.weapon;
});

// funcoes de evento

var draw_coord = {x : 0, y :0};
function pegaCoordenadas(event){
    coord.x = event.clientX;
    coord.y = event.clientY;
    socket.emit('coord', coord);
}
function pegaCoordenadasMobile(event){
    coord.x = event.touches[0].clientX;
    coord.y = event.touches[0].clientY;
    socket.emit('coord', coord);
}

var bool = 0;
atirou = function(status_tiro){
      bool = status_tiro;
      if (!turret.weapon_cooldown)
          socket.emit('tiro', bool);
}

function desenhaBlasters(){
    for (var i = 0; i < blasters.length; i++){
        if (blasters[i] != undefined)
            desenhaBlaster(blasters[i]);
    }
}
// um jeito interessante de desenhar que fiz para brincar eh
// desenhar uma linha da nave ateh as coordenadas do inimigo
// o efeito eh tipo um laser que vai em direcao ao inimigo
function desenhaBlaster(blaster, previous){
    var borda_esq = turret.x - camera.width/2;
    var borda_dir = turret.x + camera.width/2;
    var borda_sup = turret.y - camera.height/2;
    var borda_inf = turret.y + camera.height/2;
    // confere se inimigoeroide entrou no canvas menor
    if (blaster.x > borda_esq && blaster.x < borda_dir && blaster.y > borda_sup && blaster.y < borda_inf){
            // e soh entao desenha na tela
            // calcula as coordenadas em relacao ao canvas menor
            // (cada canyvas teu o seu sistema de coordenadas)
        var x1 = blaster.x - borda_esq;
        var y1 = blaster.y - borda_sup;
        vx = blaster.versor.x * blaster.speed * 2;
        vy = blaster.versor.y * blaster.speed * 2;
        var y0 = y1 + vy;
        var x0 = x1 + vx;
        ctx_turret.beginPath();
        ctx_turret.strokeStyle= "#FF0000";
        ctx_turret.moveTo(x1, y1);
        ctx_turret.lineTo(x0, y0);
        ctx_turret.stroke();
    }
}
/* conjunto de eventos lidos a partir do mouse e do teclado,
na falta de um lugar melhor ainda estao aqui
A cada escuta de evento é associada uma acao + uma funcao
*/



//Nova forma de controlar o evento ---------------------------------------------
/*
var mousemove = document.createEvent('Event');
mousemove.initEvent('mousemove', true, true);
c_turret.addEventListener('mousemove', function(e) {
  pegaCoordenadas(e);
}, false)
*/


var mobile_coord = [];
//------------------------------------------------------------------------------
c_turret.addEventListener("touchstart", pegaCoordenadasMobile, false);
c_turret.addEventListener("touchstart", function(){ atirou(1); 
                                                   sound.currentTime = 0.07;
                                                   sound.play();},
                                                   false);
c_turret.addEventListener("touchend", function(){ atirou(0)}, false);
//c_turret.addEventListener("touchmove", pegaCoordenadasMobile, false);
c_turret.addEventListener("touchmove", turret.atualizaInputMobile, false);
c_turret.addEventListener("mousemove", pegaCoordenadas, false);
c_turret.addEventListener("mousedown", function(){ atirou(1); 
                                                   sound.currentTime = 0.07;
                                                   sound.play();},
                                                   false);
c_turret.addEventListener("mouseup", function(){ atirou(0)}, false);
window.addEventListener("keydown", function(event){ turret.atualizaInput(event)}, false);

//incializacao de variaveis do loop principal
var lastFrameTimeMs = 0;
var maxFPS = 90;
var tempo = 0;

/*loop principal do jogo -- eh necessario em razao de uma limitacao
do javascript que roda assincronamente (a rigor, tudo eh assincrono,
ateh sistemas operacionais, sei lah pq chamam assim */

function mainLoop(timestamp){


    //c_turret.dispatchEvent(mousemove);


    tempo++;                // indice utilizado para criacao de asteroides
//    console.log(tempo);

    // condicional de controle de FPS, soh atualiza o quadro quando
    // o intervalo minimo de tempo eh passado
    if (timestamp < lastFrameTimeMs + (1000/maxFPS)){
        requestAnimationFrame(mainLoop);
        return;
    }
    lastFrameTimeMs = timestamp;

    turret.trocaArmaClique();
    // chamadas de desenho & calculo
    background.blit_turret();           // desenha no canvas da camera
    draw.allAsteroids();          // desenha todos os asteroides do vetor
    inimigo.desenhaTodos();
    inimigo.desenhaLasers();
    desenhaBlasters();
    calculo.versor(turret.versor);      // calcula vetor versor (de geometria analitica) do turret
    turret.desenha(ctx_turret, turret.raio, turret.gira(turret, coord));                      // desenha o turret atualizado com a rotacao
    if (bool) {
        turret.atira();                 // apenas laser por enquanto
//        limob demanda que puxa esse script (e taAsteroides();
    }
//    console.log(turret.vetorLaser);
//    colisoes.confere();                 // confere colisao de tudo (asteroides, turret, laser, bordas)
    // if abaixo calcula um versor a partir do ultimo touch n drag
    // e manda para o servidor
    if (tempo % 10 == 0){
//        socket.emit('inputmobile', mobile_coord.length);
//        socket.emit('inputmobile', mobile_coord);
        if (mobile_coord != undefined && mobile_coord[0] != undefined){
            calculo.versor_mobile(turret.versor_mobile);
            socket.emit('inputmobile', turret.versor_mobile);
            mobile_coord = [];
        }
    }
    turret.vetorLaser.length = 0;       // reseta laser
    turret.hud.desenhar(turret.hud.stats);      // desenha hud
    requestAnimationFrame(mainLoop);            // chama proxima iteracao do loop
}


// testando firebug
console.log("1 c4n 7yp3 t0 c0ns0l3!");
//console.log(background.width, background.height);

// execucao principal aqui
// inicia iteracoes no loop principal
setTimeout(function(){
   console.log("my id is: " + my_id);
   socket.emit('camera', camera);
   requestAnimationFrame(mainLoop);
},
   2000);

