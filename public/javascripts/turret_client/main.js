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


/* funcoes de inicializacao de variaveis*/
background.inicia(ctx_background, c_background);
camera.setRes(1600, 900, c_turret);
turret.inicia();

/* conjunto de eventos lidos a partir do mouse e do teclado,
na falta de um lugar melhor ainda estao aqui
A cada escuta de evento é associada uma acao + uma funcao
*/
c_turret.addEventListener("mousemove", pegaCoordenadas, false);
c_turret.addEventListener("mousedown", function(){ turret.atirou(1)}, false);
c_turret.addEventListener("mouseup", function(){ turret.atirou(0)}, false);
window.addEventListener("keydown", function(event){ turret.atualizaDirecao(event)}, false);


//incializacao de variaveis do loop principal
var lastFrameTimeMs = 0;
var bool = 0;
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
    asteroides.atualiza();              // atualiza vetor de asteroides
    asteroides.desenhaTodos();          // desenha todos os asteroides do vetor
    calculo.versor(turret.versor);      // calcula vetor versor (de geometria analitica) do turret
    turret.gira();                      // desenha o turret atualizado com a rotacao
    if (bool) {
        turret.atira();                 // apenas laser por enquanto
//        limob demanda que puxa esse script (e taAsteroides();
    }
//    console.log(turret.vetorLaser);
    colisoes.confere();                 // confere colisao de tudo (asteroides, turret, laser, bordas)
    turret.vetorLaser.length = 0;       // reseta laser
    turret.move();                      // atualiza posicao do turret no mapa
    turret.hud.desenhar(turret.hud.stats);      // desenha hud
    requestAnimationFrame(mainLoop);            // chama proxima iteracao do loop
}


// testando firebug
console.log("1 c4n 7yp3 t0 c0ns0l3!");
console.log(background.width, background.height);

// execucao principal aqui
// inicia iteracoes no loop principal
requestAnimationFrame(mainLoop);
