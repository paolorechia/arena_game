// canvas
var c = document.getElementById("canvas_turret");
var ctx = c.getContext("2d");

background.inicia(ctx);
//event listeners
c.addEventListener("mousemove", pegaCoordenadas, false);
c.addEventListener("mousedown", function(){ turret.atirou(1)}, false);
c.addEventListener("mouseup", function(){ turret.atirou(0)}, false);

var bool = 0;

var lastFrameTimeMs = 0;
var maxFPS = 60;
var tempo = 0;

function mainLoop(timestamp){
    tempo++;
//    console.log(tempo);
    if (timestamp < lastFrameTimeMs + (1000/maxFPS)){
        requestAnimationFrame(mainLoop);
        return;
    }
    lastFrameTimeMs = timestamp;
    background.blit(background.imagem);
    asteroides.atualiza();
    asteroides.desenhaTodos();
    calculo.versor(turret.versor);
    turret.hud.desenhar(turret.hud.stats);
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
//    console.log(asteroides.vetor.length);
    requestAnimationFrame(mainLoop);
}

// execucao principal aqui

// testando firebug
console.log("1 c4n 7yp3 t0 c0ns0l3!");

requestAnimationFrame(mainLoop);
