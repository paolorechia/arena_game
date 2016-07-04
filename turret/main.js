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

var vetorAsteroide = [];


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


        //console.log(Math.sqrt(Math.pow(x,2)+Math.pow(width/2,2)));
        //console.log(Math.sqrt(Math.pow(y,2)+Math.pow(height/2,2)));

        if( Math.sqrt(Math.pow(x-(width/2),2)) < raio*2  && Math.sqrt(Math.pow(y-(height/2),2)) < raio*2) {
          destroiAsteroide(i,1);

          if(hud_stats.shield > 0) {
            hud_stats.shield -=1;
          } else {
            hud_stats.vida -=1;
          }

          return;
        }

        //----------------------

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
