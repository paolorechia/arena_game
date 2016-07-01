// estrutura 800x600
// matriz 80x60 - quadrados de 10x10 pixels
// ainda não é usado

// variaveis globais
var width = 800;
var height = 600;

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


function tipoVersor(){
    this.x = 0;
    this.y = 0;
}

// versor do canhao
var versor = new tipoVersor();


// canvas
var c = document.getElementById("canvas_turret");
var ctx = c.getContext("2d");


//event listeners
c.addEventListener("mousemove", pegaCoordenadas, false);
//c.addEventListener("mousemove", giraCanhao, false);
//c.addEventListener("mousemove", logCoordenadas, false);
//c.addEventListener("mousemove", calculaVersor, false);

//c.addEventListener("click", atiraCanhao, false);
c.addEventListener("mousedown", function(){ atirou(1)}, false);
c.addEventListener("mouseup", function(){ atirou(0)}, false);



//redesenha o background
function blitBackground(background){
    ctx.putImageData(background, 0, 0);
}

// preenche background com pontos brancos que representam estrelas
function populaEstrelas(ctx, num){
    var i;
    ctx.fillStyle = "#FFFFFF";
    for (i=0; i<num; i++){
        var x = Math.floor((Math.random() * width) + 1);
        var y = Math.floor((Math.random() * height) + 1);
        ctx.fillRect(x, y, 1, 1);
    }
}

// a funcao "rotate" rotaciona o Canvas INTEIRO
// dah para implementar coisas legais com isso

function desenhaCanhao(ctx, raio, angulo){
    ctx.save();
    ctx.translate(width/2, height/2);
    ctx.rotate(angulo);
    ctx.moveTo(0, 0)
    ctx.lineWidth = raio * 0.2;
    ctx.lineTo(raio * 2, 0);
    ctx.stroke();
    ctx.restore();
}

// desenha o circulo e o canhao
function desenhaTurret(ctx, raio, angulo){
    ctx.strokeStyle = "#f0470e";
    ctx.beginPath();
    ctx.arc(width/2, height/2, raio, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = "#005252";
    ctx.fill();
    desenhaCanhao(ctx, raio, angulo);

    //------Exemplo--------
    var hud_stats =  {
      vida: 10,
      kills: 0,
      energy: 100
    }
    //----------------------

}

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

function giraCanhao(){

    var ca = (width/2 - coord.x);
    var co = (height/2 - coord.y);

    tangente = (co/ca);
    atan = Math.round(Math.atan(tangente)*100)/100;

    deg = atan * 180/3.14;
    // console.log(deg);
    //Falta tratar quando coord = height
    if(coord.x > width/2) {
        if(coord.y >= height/2) {
//            console.log('DireitaBaixo');
        } else if(coord.x < width/2){
//            console.log('DireitaCima');
        }
    } else {
        atan+=4*180/3.14;
        if(coord.y >= height/2) {
//            console.log('EsquerdaBaixo');
        } else {
//           console.log('EsquerdaCima');
        }
    }
    desenhaTurret(ctx, raio, atan);
}


function calculaVersor(v){
    // pega coordenadas e desloca origem para o centro
    var x = coord.x - width/2;
    var y = coord.y - height/2;

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

function atiraCanhao(){
    // desenha linha usando versor (apenas para ilustrar)

//    console.log("atirei");
    var tam = 14;
    var base = 2;
    var x0 = width/2 + versor.x * raio * base;
    var x1 = width/2 + versor.x * raio * (tam + base);
    var y0 = height/2 + versor.y * raio * base;
    var y1 = height/2 +versor.y * raio * (tam + base);
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.lineWidth=raio*0.2;
    ctx.strokeStyle="#00FF00";
    ctx.lineTo(x1, y1);
    ctx.stroke();
    var i;
    for (i = 0; i< tam; i++){
        vetorLaser[i] = new laser(0,0);
        vetorLaser[i].x = (x0 + versor.x * raio * i);
        vetorLaser[i].y = (y0 + versor.y * raio * i);
    }
}

var vetorAsteroide = [];

function asteroide(x, y, velocidade, tamanho, versor){
    this.x = x;
    this.y = y;
    this.vel = velocidade;
    this.tam = tamanho;
    this.v = versor;
}

function criaEsq(vel, tam){
    var x = 1;
    var y = Math.floor((Math.random() * height) + 1);
    var len = vetorAsteroide.length;
    var versor = new tipoVersor();
    vetorAsteroide[len] = new asteroide(x, y, vel, tam, versor);
    versor.x=1;
    var vy = (Math.random() - 0.5);
    versor.y=vy;
}
function criaDir(vel, tam){
    var x = width;
    var y = Math.floor((Math.random() * height) + 1);
    var len = vetorAsteroide.length;
    var versor = new tipoVersor();
    vetorAsteroide[len] = new asteroide(x, y, vel, tam, versor);
    versor.x=-1;
    var vy = (Math.random() - 0.5);
    versor.y=vy;
}
function criaSup(vel, tam){
    var x = Math.floor((Math.random() * height) + 1);
    var y = 1;
    var len = vetorAsteroide.length;
    var versor = new tipoVersor();
    vetorAsteroide[len] = new asteroide(x, y, vel, tam, versor);
    versor.y=1;
    var vx = (Math.random() - 0.5);
    versor.x=vx;
}
function criaInf(vel, tam){
    var x = Math.floor((Math.random() * height) + 1);
    var y = height;
    var len = vetorAsteroide.length;
    var versor = new tipoVersor();
    vetorAsteroide[len] = new asteroide(x, y, vel, tam, versor);
    versor.y=-1;
    var vx = (Math.random() - 0.5);
    versor.x=vx;
}

function criaAsteroide(){
    var randomize = Math.floor((Math.random())* 4);
    var vel = Math.floor((Math.random() * 10) + 1);
    var tam = Math.floor((Math.random() * 5) + 2);
    if (randomize == 0){
        criaEsq(vel, tam);
    }
    else if (randomize == 1){
        criaDir(vel, tam);
    }
    else if (randomize == 2){
        criaSup(vel, tam);
    }
    else criaInf(vel, tam);
}
function atualizaAsteroides(){
    var i = 0;
    var len = vetorAsteroide.length;
    for (i = 0; i < len; i++){
        vetorAsteroide[i].x += vetorAsteroide[i].v.x * vetorAsteroide[i].vel;
        vetorAsteroide[i].y += vetorAsteroide[i].v.y * vetorAsteroide[i].vel;
    /*
        console.log(vetorAsteroide[i]);
        console.log(vetorAsteroide[i]);
    */
    }

}

function distGeometrica(x0, y0, x1, y1){
    var x = Math.pow((x0 - x1), 2);
    var y = Math.pow((y0 - y1), 2);
    return Math.sqrt(x + y);
}

function confereColisoes(){
    var i = 0;
    var x, y;
    var x1, y1;
    var dist;
    var len = vetorAsteroide.length;
    var tam = vetorLaser.length;
    for (i = 0; i < len; i++){
        x = vetorAsteroide[i].x;
        y = vetorAsteroide[i].y;
        // testa se asteroide saiu do board
        if (x > width || x < 0 || y > height || y < 0){
            destroiAsteroide(i, 1);
            return;
        }
        for (j = 0; j < tam; j++){
            x1 = vetorLaser[j].x;
            y1 = vetorLaser[j].y;
            dist = distGeometrica(x, y, x1, y1)
            if (dist < (vetorAsteroide[i].tam * 5)){
                destroiAsteroide(i, 1);


                //------Exemplo--------
                hud_stats.kills += 1;
                //----------------------

                return;
            }
        }
    }
}


function destroiAsteroide(indice){
    vetorAsteroide.splice(indice, 1);
}

function desenhaAst(ast){
    ctx.strokeStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(ast.x,
            ast.y,
            ast.tam * 5, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
}

function desenhaAsteroides(){
    var i;
    var len = vetorAsteroide.length;
    for (i = 0; i < len; i++){
        desenhaAst(vetorAsteroide[i]);
    }

}
function limpaAsteroides(){
    var i;
    var len = vetorAsteroide.length;
    for (i = 0; i < len; i++){
        destroiAsteroide(i, 1);
    }
}


var bool = 0;

function atirou(status_tiro){
    bool = status_tiro;
}

var lastFrameTimeMs = 0;
var maxFPS = 60;
var tempo = 0;
criaAsteroide();
atualizaAsteroides();
function mainLoop(timestamp){
    tempo++;
//    console.log(tempo);
    if (timestamp < lastFrameTimeMs + (1000/maxFPS)){
        requestAnimationFrame(mainLoop);
        return;
    }
    lastFrameTimeMs = timestamp;
    blitBackground(background);
    atualizaAsteroides();
    desenhaAsteroides();
    calculaVersor(versor);
    giraCanhao();
    desenhaHud(hud_stats);


            if ((tempo % 10) == 0)
        criaAsteroide();
    if (bool) {
        atiraCanhao();
//        limpaAsteroides();
    }
//    console.log(vetorLaser);
    confereColisoes();
    vetorLaser.length = 0;
//    console.log(vetorAsteroide.length);
    requestAnimationFrame(mainLoop);
}

// execucao principal aqui


// testando firebug
console.log("1 c4n 7yp3 t0 c0ns0l3!");

// Preenche background com preto
ctx.fillStyle = "#000000";
ctx.fillRect(0,0,800,600);
// e com estrelas
populaEstrelas(ctx, 200);

// salva background criado
var background = ctx.getImageData(0,0,800,600)
// desenha turret
var raio = 15;
desenhaTurret(ctx, raio);
requestAnimationFrame(mainLoop);
