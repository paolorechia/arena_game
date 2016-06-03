// estrutura 800x600
// matriz 80x60 - quadrados de 10x10 pixels
// ainda não é usado

var width = 800;
var height = 600;

var array = [];

var i;
for (i = 0; i < 80; i++){
        array[i] = [];
}

// vetor de coorenadas X, Y
var coord = [];
coord[0] = 0;
coord[1] = 0;

// canvas
var c = document.getElementById("canvas_turret");


//event listeners
c.addEventListener("mousemove", pegaCoordenadas, false);
c.addEventListener("mousemove", giraCanhao, false);
c.addEventListener("mousemove", logCoordenadas, false);


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

// desenhaCanhao mesclada com a antiga "rotacionaCanhao"

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
    ctx.beginPath();
    ctx.arc(width/2, height/2, raio, 0, 2*Math.PI);
    ctx.strokeStyle = "#f0470e";
    ctx.stroke();
    ctx.fillStyle = "#005252";
    ctx.fill();
    desenhaCanhao(ctx, raio, angulo);
}

// funcao para pegar as coordenadas do mouse
function pegaCoordenadas(event){
    coord[0] = event.clientX;
    coord[0] -= c.offsetLeft;
    coord[1] = event.clientY;
    coord[1] -= c.offsetTop;
//    return coord;
}

// imprimir coordenadas pro console
function logCoordenadas(){
    var x = coord[0].toString();
    var y = coord[1].toString();
    var string = "x = ";
    string = string.concat(x);
    string = string.concat("; y = ");
    string = string.concat(y);
    console.log(string);
}

// acho que o calculo do angulo pode sgonometriaer feito com trigonometria
// CoordCanhao(x,y) - CoordMouse(x,y)
// x1 - x2 = cateto adjacente
// y1 - y2 = cateto oposto
// CO/CA = tanO = senO / cos0

// tem algo errado nisso

function giraCanhao(){

    var ca = (width/2 - coord[0]);
    var co = (height/2 - coord[1]);

    tangente = (co/ca);
    atan = Math.round(Math.atan(tangente)*100)/100;

    deg = atan * 180/3.14;
    console.log(deg);
    //Falta tratar quando coord = height
    if(coord[0] > width/2) {
        if(coord[1] >= height/2) {
            console.log('DireitaBaixo');
        } else if(coord[0] < width/2){
            console.log('DireitaCima');
        }
    } else {
        atan+=4*180/3.14;
        if(coord[1] >= height/2) {
            console.log('EsquerdaBaixo');
        } else {
            console.log('EsquerdaCima');
        }
    }






    blitBackground(background);     // redesenha o background

    desenhaTurret(ctx, raio, atan);
}


// execucao principal aqui

var ctx = c.getContext("2d");

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
