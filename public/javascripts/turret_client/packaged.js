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

    // preenche module com pontos brancos que representam estrelas
    populaEstrelas = function(ctx, num){
        var i;
        ctx.fillStyle = "#FFFFFF";
        for (i=0; i<num; i++){
            var x = Math.floor((Math.random() * module.width) + 1);
            var y = Math.floor((Math.random() * module.height) + 1);
            var width = Math.floor(Math.random() * 3 + 1);
            ctx.fillRect(x, y, width, width);
        }
    };
    desenhaBorda = function(ctx, camera){
        ctx.beginPath();
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
module.exports = function(camera, data, turret){
    var module = {};

    // objeto de coorenadas X, Y do cursor do mouse
    // imprimir data.coordenadas pro console
    module.logCoordenadas= function(){
        var x = data.coord.x.toString();
        var y = data.coord.y.toString();
        var string = "x = ";
        string = string.concat(x);
        string = string.concat("; y = ");
        string = string.concat(y);
        console.log(string);
    };
    module.versor = function (v){
        // pega data.coordenadas e desloca origem para o centro
        var x = data.coord.x - turret.x;
        var y = data.coord.y - turret.y;

        // calcula modulo do vetor (x,y)
        var mod = Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
        var a = 1 / mod;

        // calcula versor
        v.x = x * a;
        v.y = y * a;
    };
    module.versor_mobile = function (v){
        var len = mobile_data.coord.length;
        var x = mobile_data.coord[len-1].x - mobile_data.coord[0].x;
        var y = mobile_data.coord[len-1].y - mobile_data.coord[0].y;

        var mod = Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
        var a = 1 / mod;
        v.x = x * a;
        v.y = y * a;
    };
    module.distGeometrica = function (x0, y0, x1, y1){
        var x = Math.pow((x0 - x1), 2);
        var y = Math.pow((y0 - y1), 2);
        return Math.sqrt(x + y);
    };
    module.anguloGiro = function (nave, cursor){

        var cx = cursor.x + nave.x - camera.width/2;
        var cy = cursor.y + nave.y - camera.height/2;

        var ca = (nave.x - cx);
        var co = (nave.y - cy);

        tangente = (co/ca);
        atan = Math.round(Math.atan(tangente)*100)/100;

        deg = atan * 180/3.14;
     // console.log(deg);
        //Falta tratar quando cursor = background.height
        if(cx > nave.x) {
            if(cy >= nave.y) {
    //            console.log('DireitaBaixo');
            } else if(cx < nave.x){
    //            console.log('DireitaCima');
            }
        } else {
            atan+=4*180/3.14;
            if(cy >= nave.y) {
    //            console.log('EsquerdaBaixo');
            } else {
    //           console.log('EsquerdaCima');
            }
        }
        //console.log(nave);
        return atan;
    };

    return module;
}

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
module.exports = function(stub){
    var module = {};
    module.asteroids = [];
    module.lasers = [];
    module.blasters = [];
    module.players = [];
    module.players_id = [];
    module.players_pointers = [];

    module.coord = {
        x:0,
        y:0
    };
    module.Versor = function(){
        this.x = 0;
        this.y = 0;
    }

    module.atirou = 0;
    return module;
}

},{}],5:[function(require,module,exports){
module.exports = function(turret, camera, background, data, ctx_turret, my_id, calculo){
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
    cano = function (ctx, raio, angulo, nave){
        var x = camera.width/2;
        var y = camera.height/2;
        // salva contexto (necessario em funcao da translacao)
        ctx.save();
        // desloca origem para as coordendas (x,y)
        ctx.translate(x, y);
        // rotaciona a imagem de acordo o angulo
        ctx.rotate(angulo);
        // move para a origem (que agora eh (x, y))
        ctx.moveTo(0, 0)
        ctx.lineWidth = raio * 0.2;
        ctx.lineTo(raio * 2, 0);
        ctx.stroke();
        // restaura contexto
        ctx.restore();
    };

    // desenha o corpo do turret e chama a funcao cano
    module.turret = function (ctx, raio, angulo){
        var x = camera.width/2;
        var y = camera.height/2;
        ctx.strokeStyle = "#f0470e";
        ctx.beginPath();
        ctx.arc(x, y, raio, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fillStyle = "#005252";
        ctx.fill();
        cano(ctx, raio, angulo);
        //Se tem shield, desenha o shield----------
        if(turret.shield > 0) {
          ctx.strokeStyle = "#1244AA";
          ctx.beginPath();
          ctx.arc(x, y, raio*1.3, 0, 2*Math.PI);
          ctx.stroke();
        }
    };
    module.laser = function(x0, y0, x1, y1){
        var borda_esq = turret.x - camera.width/2;      
        var borda_dir = turret.x + camera.width/2;
        var borda_sup = turret.y - camera.height/2;
        var borda_inf = turret.y + camera.height/2;
            // e soh entao desenha na tela

            // calcula as coordenadas em relacao ao canvas menor
            // (cada canvas teu o seu sistema de coordenadas)
        var x0 = x0 - borda_esq;
        var y0 = y0 - borda_sup;
        var x1 = x1 - borda_esq;
        var y1 = y1 - borda_sup;
        ctx_turret.beginPath();
        // move para inicio da linha
        ctx_turret.moveTo(x0,y0);
        // seta largura da linha
        ctx_turret.lineWidth=turret.raio*0.2;
        // cor
        ctx_turret.strokeStyle="#00ff00";
        // coordenada destino
        ctx_turret.lineTo(x1, y1);
        // desenha
        ctx_turret.stroke();
    };

    module.allLasers = function(){
        for (var i = 0; i < data.players.length; i++){
               var laser = data.lasers[i]; 
               //console.log(laser);
               if (laser != undefined && laser.first != undefined){
                   module.laser(laser.first.x, laser.first.y,
                                       laser.last.x,  laser.last.y);
               }
        }
    },
          // desenha os stats na tela
    module.hud = function() {
            ctx_turret.font = "30px Arial";
            ctx_turret.fillStyle="green";
            ctx_turret.fillText("HP: " + turret.vida, camera.width/22, camera.height/18)
            ctx_turret.fillText("Weapon: " + turret.weapon, camera.width/22, camera.height/9)
            ctx_turret.fillStyle='red';
            ctx_turret.fillText('Kills: '+ turret.kills, camera.width/2.2, camera.height/18)
            ctx_turret.fillStyle='blue';
            ctx_turret.fillText('SH: ' + turret.shield, camera.width/22, camera.height/6)
            ctx_turret.fillStyle='#1244AA';
            ctx_turret.fillText('Energy: ' + turret.energy, camera.width/2.3, camera.height/1.05)
    };
    module.camera = function(camera, ctx){
        ctx.drawImage(background.imagem, turret.x - camera.width/2, turret.y - camera.height/2, camera.width, camera.height,0, 0, camera.width, camera.height);
    module.enemy = function(inimigo, cursor){
        /* variaveis auxiliares, pega coordenadas do canvas pequeno
        (os quatro cantos) de um retangulo
        //(turret.x, turret.y) = posicao do turret
        */
        var angulo = calculo.anguloGiro(inimigo, cursor);
        var borda_esq = turret.x - camera.width/2;      
        var borda_dir = turret.x + camera.width/2;
        var borda_sup = turret.y - camera.height/2;
        var borda_inf = turret.y + camera.height/2;
        // confere se inimigoeroide entrou no canvas menor
        if (inimigo.x > borda_esq && inimigo.x < borda_dir && inimigo.y > borda_sup && inimigo.y < borda_inf){
        // e soh entao desenha na tela

        // calcula as coordenadas em relacao ao canvas menor
        // (cada canvas teu o seu sistema de coordenadas)
        var x = inimigo.x - borda_esq;
        var y = inimigo.y - borda_sup;

        // desenha o inimigoeroide
        // strokestyle = cor da linha
        ctx_turret.strokeStyle = "#ffffff";
        // comeca desenho
        ctx_turret.beginPath();
        // caminha um circulo nas coordenadas (x,y),
        // de raio inimigo.tam * 5,
        // 0??
        // arco 2pi
        ctx_turret.arc(x, y, turret.raio, 0, 2*Math.pi);
        // desenha o caminho
        ctx_turret.stroke();
        // fillstyle = cor de preenchimento
            ctx_turret.fillstyle = "#ff0000";
        // preenche
        ctx_turret.fill();
        ctx_turret.save();
        // desloca origem para as coordendas (x,y)
        ctx_turret.translate(x, y);
        // rotaciona a imagem de acordo o angulo
        ctx_turret.rotate(angulo);
        // move para a origem (que agora eh (x, y))
        ctx_turret.moveTo(0, 0)
        ctx_turret.lineWidth = turret.raio * 0.2;
        ctx_turret.lineTo(turret.raio * 2, 0);
        ctx_turret.stroke();
        // restaura contexto
        ctx_turret.restore();
        }
    };

    module.allEnemies = function(){
        for (var i = 0; i < data.players.length; i++){
            if (data.players_id[i] != my_id){
                module.enemy(data.players[i], data.players_pointers[i]);
            }
        }
    };
}

// um jeito interessante de desenhar que fiz para brincar eh
// desenhar uma linha da nave ateh as data.coordenadas do inimigo
// o efeito eh tipo um laser que vai em direcao ao inimigo
    module.blaster = function(blaster, previous){
        var borda_esq = turret.x - camera.width/2;
        var borda_dir = turret.x + camera.width/2;
        var borda_sup = turret.y - camera.height/2;
        var borda_inf = turret.y + camera.height/2;
        // confere se inimigoeroide entrou no canvas menor
        if (blaster.x > borda_esq && blaster.x < borda_dir && blaster.y > borda_sup && blaster.y < borda_inf){
                // e soh entao desenha na tela
                // calcula as data.coordenadas em relacao ao canvas menor
                // (cada canyvas teu o seu sistema de data.coordenadas)
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
    };

    module.allBlasters = function(){
        for (var i = 0; i < data.blasters.length; i++){
            if (data.blasters[i] != undefined)
                module.blaster(data.blasters[i]);
        }
    };
    return module;
}

},{}],6:[function(require,module,exports){
module.exports = function(socket, data){
    var module = {};
    module.atualiza = function (event){
        if (event.key == 'w'){
            socket.emit('input', 'w');
        }
        if (event.key == 's'){
            socket.emit('input', 's');
        }
        if (event.key == 'd'){
            socket.emit('input', 'd');
        }
        if (event.key == 'a'){
            socket.emit('input', 'a');
        }
        if (event.key == ' '){
            socket.emit('input', ' ');
        }
    };
    module.atualizaMobile = function(event){
        var coord = { x: event.touches[0].clientX,
                      y: event.touches[0].clientY};
        mobile_coord.push(coord);
    };
    module.mousePress = function(status_tiro){
          data.atirou = status_tiro;
          socket.emit('tiro', data.atirou);
    };
    return module;
}

},{}],7:[function(require,module,exports){
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
var socket = io({transports: ['websocket']});

var input = require('./input.js')(socket, data);
var c_background = document.getElementById("background");
var c_turret = document.getElementById("canvas_turret");
var ctx_background = c_background.getContext("2d");
var ctx_turret = c_turret.getContext("2d");
var camera = require('./camera.js')(ctx_turret);
var background = require('./background.js')(ctx_background);

var my_id = 0;
socket.on('myid', function(id){
   my_id = id;
   socket.emit('myid', my_id);
});

var turret = require('./turret.js')(camera, background, data);
var calculo = require('./calculo.js')(camera, data, turret);
var draw = require('./draw.js')(turret, camera, background, data, ctx_turret,my_id, calculo);


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
//camera.setRes(1600, 900, c_turret);
//--------------------------------------------------------------
camera.setRes(window.innerWidth-10, window.innerHeight-10, c_turret);
console.log(window.innerWidth, window.innerHeight);
console.log(camera);


background.inicia(ctx_background, c_background);
turret.inicia();

console.log(turret);
socket.on('movimento', function(nova_pos){
//    console.log(nova_pos);
    turret.x = (nova_pos.x);
    turret.y = (nova_pos.y);
//    console.log(turret.x, turret.y);
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
    turret.vida = estado.hp;
    turret.shield = estado.shield;
    turret.energy = estado.energy;
    turret.kills = estado.player_kills;
    turret.weapon = estado.weapon;
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
c_turret.addEventListener("touchmove", input.atualizaMobile, false);
c_turret.addEventListener("mousemove", pegaCoordenadas, false);
c_turret.addEventListener("mousedown", function(){ input.mousePress(1); 
                                                   sound.currentTime = 0.07;
                                                   sound.play();},
                                                   false);
c_turret.addEventListener("mouseup", function(){ input.mousePress(0)}, false);
window.addEventListener("keydown", function(event){ input.atualiza(event)}, false);

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
    // chamadas de desenho & calculo
    draw.camera(camera, ctx_turret);           // desenha no canvas da camera
    draw.allAsteroids();          // desenha todos os asteroides do vetor
//    draw.allEnemies();
    draw.allLasers();
    draw.allBlasters();
    calculo.versor(turret.versor);      // calcula vetor versor (de geometria analitica) do turret
    draw.turret(ctx_turret, turret.raio, calculo.anguloGiro(turret, data.coord));                      // desenha o turret atualizado com a rotacao
//        limob demanda que puxa esse script (e taAsteroides();
//    console.log(turret.vetorLaser);
//    colisoes.confere();                 // confere colisao de tudo (asteroides, turret, laser, bordas)
    // if abaixo calcula um versor a partir do ultimo touch n drag
    // e manda para o servidor
    if (tempo % 10 == 0){
//        socket.emit('inputmobile', mobile_data.coord.length);
//        socket.emit('inputmobile', mobile_data.coord);
        if (mobile_coord != undefined && mobile_coord[0] != undefined){
            calculo.versor_mobile(turret.versor_mobile);
            socket.emit('inputmobile', turret.versor_mobile);
            mobile_coord = [];
        }
    }
    draw.hud();      // desenha hud
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


},{"./background.js":1,"./calculo.js":2,"./camera.js":3,"./data.js":4,"./draw.js":5,"./input.js":6,"./turret.js":8}],8:[function(require,module,exports){
module.exports = function (camera, background, data){
    var module = {};

    module.versor = new data.Versor(),
    module.versor_mobile = new data.Versor(),
    module.vetorLaser = [],
    module.raio = 15,
    module.vel = 0,
    module.acel= 4,
    module.turn_rate= 1,
    module.max_speed = 4,
    module.vx = 0,
    module.vy = 0,
    module.x = 0,
    module.y = 0,
    module.vida= 10,
    module.shield= 2,
    module.kills= 0,
    module.energy= 100,
    module.weapon= 'laser',
    module.weapon_cooldown = false,
        // inicializa posicao do turret
    module.inicia = function(){
            module.x = background.width/2;
            module.y = background.height/2;
            
    };
    return module;
}


},{}]},{},[7]);
