(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(camera){
    var module = {};
    
    // objeto module, contem informacoes do canvas maior
    // declaracao de variaveis internas
    module.imagem = new Image();
    imagem2 = 0;
    width = 0;
    height = 0;
    // funcoes
    // grava -> recebe um canvas, gera uma imagem .png e salva o link
    // em module.imagem.src
    grava = function(ctx, width, height){
        module.imagem.src = ctx.canvas.toDataURL("image/png");
    };
    // blit -> redesenha o module no canvas menor (camera)
    // nao eh necessaria no momento
    blit = function(module){
        ctx_turret.drawImage(module, 0, 0);
    };
    // blit_turret -> 1. corta o module gigantesco na posicao certa;
    // 2. desenha ele na tela
    module.blit_turret = function(camera){
        ctx_turret.drawImage(module.imagem, turret.x - camera.width/2, turret.y - camera.height/2, camera.width, camera.height,0, 0, camera.width, camera.height);
    };

    // preenche module com pontos brancos que representam estrelas
    populaEstrelas = function(ctx, num){
        var i;
        ctx.fillStyle = "#FFFFFF";
        for (i=0; i<num; i++){
            var x = Math.floor((Math.random() * module.width) + 1);
            var y = Math.floor((Math.random() * module.height) + 1);
            ctx.fillRect(x, y, 1, 1);
        }
    };
    desenhaBorda = function(ctx, camera){
        ctx.strokeStyle = "#00002F";
        ctx.lineWidth = 800;
        var largura = ctx.lineWidth/2;
        ctx.rect(camera.width/2 - largura, camera.height/2 - largura, module.width - camera.width + ctx.lineWidth, module.height - camera.height + ctx.lineWidth);
        ctx.stroke();
    };
    // inicializa as variaveis internas ao module
    module.inicia = function (ctx, canvas){
        module.width = canvas.width;
        module.height = canvas.height;
        // Preenche module com preto
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,0,module.width,module.height);
        // e com estrelas
        populaEstrelas(ctx, module.width/4);
// salva module criado
        desenhaBorda(ctx, camera);
        grava(ctx, module.width, module.height);
    };    
    return module;
}

},{}],2:[function(require,module,exports){
module.exports = function(stub){
    var module = {};
    // objeto camera, contem dimensoes do canvas menor
    module.width = 0;
    module.height = 0;
        // seta tamanho do canvas menor
    module.updateResEvent = function(canvas) {
          window.addEventListener('resize', function(event) {

            //--- Para alterar a resolução mantendo a res. do jogo (buga a mira)
            //$(canvas).css('width', window.innerWidth-3)
            //$(canvas).css('height', window.innerHeight-3)
            //-------------------------
            
            canvas.width = window.innerWidth-3;
            canvas.height = window.innerHeight-3;
            module.width = window.innerWidth-3;
            module.height =  window.innerHeight-3;

          });
    };
    module.setRes = function (width, height, canvas){
            //Atua no canvas '#canvas_turret'
            canvas.width = width;
            canvas.height = height;
            //--- Para alterar a resolução mantendo a res. do jogo (buga a mira)
            //$(canvas).css('width', window.innerWidth-3)
            //$(canvas).css('height', window.innerHeight-3)
            //-------------------------
            module.width = width;
            module.height = height;
            module.updateResEvent(canvas);


    };
    return module;
}

},{}],3:[function(require,module,exports){
module.exports = function(stub){
    var module = {};
    module.asteroids = [];
    return module;
}

},{}],4:[function(require,module,exports){
module.exports = function(stub){
    var module = {};
    module.asteroid = function(ast){
        /* variaveis auxiliares, pega coordenadas do canvas pequeno
        (os quatro cantos) de um retangulo
        //(turret.x, turret.y) = posicao do turret
        */
        var borda_esq = turret.x - camera.width/2;      
        var borda_dir = turret.x + camera.width/2;
        var borda_sup = turret.y - camera.height/2;
        var borda_inf = turret.y + camera.height/2;
        // confere se asteroide entrou no canvas menor
        if (ast.x > borda_esq && ast.x < borda_dir && ast.y > borda_sup && ast.y < borda_inf){
            // e soh entao desenha na tela

            // calcula as coordenadas em relacao ao canvas menor
            // (cada canvas teu o seu sistema de coordenadas)
            var x = ast.x - borda_esq;
            var y = ast.y - borda_sup;

            // desenha o asteroide
            // strokeStyle = cor da linha
            ctx_turret.strokeStyle = "#FFFFFF";
            // comeca desenho
            ctx_turret.beginPath();
            // caminha um circulo nas coordenadas (x,y),
            // de raio ast.tam * 5,
            // 0??
            // arco 2pi
            ctx_turret.arc(x, y, ast.tam * 5, 0, 2*Math.PI);
            // desenha o caminho
            ctx_turret.stroke();
            // fillStyle = cor de preenchimento
            ctx_turret.fillStyle = "#FFFFFF";
            // preenche
            ctx_turret.fill();
        }
    };
    // desenha todos os asteroides
    module.allAsteroids = function(){
        var i;
        var len = data.asteroids.length;
        for (i = 0; i < len; i++){
            module.asteroid(data.asteroids[i]);
        }

    };
    return module;
}

},{}],5:[function(require,module,exports){
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
var draw = require('./draw.js')(stub);
var socket = io({transports: ['websocket']});
var c_background = document.getElementById("background");
var c_turret = document.getElementById("canvas_turret");
var ctx_background = c_background.getContext("2d");
var ctx_turret = c_turret.getContext("2d");
var camera = require('./camera.js')(ctx_turret);
var background = require('./background.js')(ctx_background);
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


},{"./background.js":1,"./camera.js":2,"./data.js":3,"./draw.js":4}]},{},[5]);
