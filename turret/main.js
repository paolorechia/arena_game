// estrutura 800x600
// matriz 80x60 - quadrados de 10x10 pixels
// ainda não é usado

// variaveis globais
var array = [];

var i;
for (i = 0; i < 80; i++){
        array[i] = [];
}

// obj coorenadas X, Y
var coord = {
    x:0,
    y:0
}

function Versor(){
    this.x = 0;
    this.y = 0;
}

// versor do canhao
var versor = new Versor();


// canvas
var c = document.getElementById("canvas_turret");
var ctx = c.getContext("2d");

background.width = 800;
background.height = 600;
// Preenche background com preto
ctx.fillStyle = "#000000";
ctx.fillRect(0,0,background.width,background.height);
// e com estrelas
background.populaEstrelas(ctx, 200);
background.grava(ctx, background.width, background.height);

// salva background criado


//event listeners
c.addEventListener("mousemove", pegaCoordenadas, false);
//c.addEventListener("mousemove", giraCanhao, false);
//c.addEventListener("mousemove", logCoordenadas, false);
//c.addEventListener("mousemove", calculaVersor, false);

//c.addEventListener("click", atiraCanhao, false);
c.addEventListener("mousedown", function(){ atirou(1)}, false);
c.addEventListener("mouseup", function(){ atirou(0)}, false);

// a funcao "rotate" rotaciona o Canvas INTEIRO
// dah para implementar coisas legais com isso



// funcao para pegar as coordenadas do mouse
function pegaCoordenadas(event){
    coord.x = event.clientX;
    coord.x -= c.offsetLeft;
    coord.y = event.clientY;
    coord.y -= c.offsetTop;
//    return coord;
}

// imprimir coordenadas pro console
function logCoordenadas(){
    var x = coord.x.toString();
    var y = coord.y.toString();
    var string = "x = ";
    string = string.concat(x);
    string = string.concat("; y = ");
    string = string.concat(y);
    console.log(string);
}

function calculaVersor(v){
    // pega coordenadas e desloca origem para o centro
    var x = coord.x - background.width/2;
    var y = coord.y - background.height/2;

    // calcula modulo do vetor (x,y)
    var mod = Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
    var a = 1 / mod;

    // calcula versor
    v.x = x * a;
    v.y = y * a;
}

var vetorLaser = [];
function laser(x, y){
    this.x;
    this.y;
}

var vetorAsteroide = [];


function distGeometrica(x0, y0, x1, y1){
    var x = Math.pow((x0 - x1), 2);
    var y = Math.pow((y0 - y1), 2);
    return Math.sqrt(x + y);
}

var bool = 0;

function atirou(status_tiro){
    bool = status_tiro;
}

var lastFrameTimeMs = 0;
var maxFPS = 60;
var tempo = 0;
asteroides.cria();
asteroides.atualiza();



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
    calculaVersor(versor);
    turret.gira();
    hud.desenhar(hud.stats);


    if ((tempo % 10) == 0)
        asteroides.cria();
    if (bool) {
        turret.atira();
//        limpaAsteroides();
    }
//    console.log(vetorLaser);
    colisoes.confere();
    vetorLaser.length = 0;
//    console.log(vetorAsteroide.length);
    requestAnimationFrame(mainLoop);
}

// execucao principal aqui


// testando firebug
console.log("1 c4n 7yp3 t0 c0ns0l3!");

// desenha turret
var raio = 15;
requestAnimationFrame(mainLoop);
