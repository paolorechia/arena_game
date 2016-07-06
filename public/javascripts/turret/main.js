// canvas
var c_background = document.getElementById("background");
var c_turret = document.getElementById("canvas_turret");
var ctx_background = c_background.getContext("2d");
var ctx_turret = c_turret.getContext("2d");

background.inicia(ctx_background, c_background);
camera.inicia(ctx_turret, c_turret);
turret.inicia();

//event listeners
c_turret.addEventListener("mousemove", pegaCoordenadas, false);
c_turret.addEventListener("mousedown", function(){ turret.atirou(1)}, false);
c_turret.addEventListener("mouseup", function(){ turret.atirou(0)}, false);
window.addEventListener("keydown", function(event){ turret.atualizaDirecao(event)}, false);
var lastFrameTimeMs = 0;
var bool = 0;
var maxFPS = 90;
var tempo = 0;
var bool = 0;

function mainLoop(timestamp){
    tempo++;
//    console.log(tempo);
    if (timestamp < lastFrameTimeMs + (1000/maxFPS)){
        requestAnimationFrame(mainLoop);
        return;
    }
    lastFrameTimeMs = timestamp;
//    background.blit(background.imagem);
    background.blit_turret();
    asteroides.atualiza();
    asteroides.desenhaTodos();
    calculo.versor(turret.versor);
    turret.gira();

    if ((tempo % 10) == 0)
        asteroides.cria();
    if (bool) {
        turret.atira();
//        limpaAsteroides();
    }
//    console.log(turret.vetorLaser);
    colisoes.confere();
    turret.vetorLaser.length = 0;
    turret.move();
//    console.log(asteroides.vetor.length);
    turret.hud.desenhar(turret.hud.stats);
//    logCoordenadas();
    requestAnimationFrame(mainLoop);
}

// execucao principal aqui

// testando firebug
console.log("1 c4n 7yp3 t0 c0ns0l3!");
console.log(background.width, background.height);

requestAnimationFrame(mainLoop);
