/*puxa dois objetos tipo canvas do HTML gerado pelo node 
o primeiro, background, eh usado para criar o espaco 
(retangulo preto + pontos brancos)
o segundo c_turret, eh onde o jogo eh efetivamente desenhado e em varios
trechos do codigo eh referenciado como camera
*/
var socket = io({transports: ['websocket']});
var c_background = document.getElementById("background");
var c_turret = document.getElementById("canvas_turret");
var ctx_background = c_background.getContext("2d");
var ctx_turret = c_turret.getContext("2d");
socket.on('message', function(message){
//    console.log(message);
});
socket.on('asteroides', function(novo){
    asteroides.vetor = novo;
});
var my_id = 0;
socket.on('myid', function(id){
   my_id = id;
   socket.emit('myid', my_id);
});
/* funcoes de inicializacao de variaveis*/
camera.setRes(1600, 900, c_turret);
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


// funcoes de evento

function pegaCoordenadas(event){
    coord.x = event.clientX;
    coord.x -= c_turret.offsetLeft;
    coord.x += turret.x - camera.width/2;
    coord.y = event.clientY;
    coord.y -= c_turret.offsetTop;
    coord.y += turret.y - camera.height/2;
    socket.emit('coord', coord);
}

var bool = 0;
atirou = function(status_tiro){
      bool = status_tiro;
      socket.emit('tiro', bool);
}

/* conjunto de eventos lidos a partir do mouse e do teclado,
na falta de um lugar melhor ainda estao aqui
A cada escuta de evento é associada uma acao + uma funcao
*/
c_turret.addEventListener("mousemove", pegaCoordenadas, false);
c_turret.addEventListener("mousedown", function(){ atirou(1)}, false);
c_turret.addEventListener("mouseup", function(){ atirou(0)}, false);
window.addEventListener("keydown", function(event){ turret.atualizaDirecao(event)}, false);


//incializacao de variaveis do loop principal
var lastFrameTimeMs = 0;
var maxFPS = 90;
var tempo = 0;

/*loop principal do jogo -- eh necessario em razao de uma limitacao
do javascript que roda assincronamente (a rigor, tudo eh assincrono,
ateh sistemas operacionais, sei lah pq chamam assim */

function mainLoop(timestamp){

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
    background.blit_turret();           // desenha no canvas da camera
    asteroides.desenhaTodos();          // desenha todos os asteroides do vetor
    inimigo.desenhaTodos();
    inimigo.desenhaLasers();
    calculo.versor(turret.versor);      // calcula vetor versor (de geometria analitica) do turret
    turret.desenha(ctx_turret, turret.raio, turret.gira(turret, coord));                      // desenha o turret atualizado com a rotacao
    if (bool) {
        turret.atira();                 // apenas laser por enquanto
//        limob demanda que puxa esse script (e taAsteroides();
    }
//    console.log(turret.vetorLaser);
//    colisoes.confere();                 // confere colisao de tudo (asteroides, turret, laser, bordas)
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
   requestAnimationFrame(mainLoop);
},
   2000);
