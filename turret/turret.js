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

// desenha o turret pela primeira vez (Apenas!)
// nas próximas vezes imagino que deve ser usado uma rotação


// funcao desenha esta em desuso, mantida no codigo soh para reverter se algo der errado
function desenhaCanhao(ctx, raio, angulo){
    ctx.strokeStyle = "#f0470e";
    ctx.moveTo(width/2, height/2);
    ctx.lineWidth = raio * 0.2;
    ctx.lineTo(width/2, height/2 - raio * 2);
    ctx.stroke();
}

// a funcao "rotate" rotaciona o Canvas INTEIRO
// dah para implementar coisas legais com isso

// rotacionaCanhao na realidade desenha
// o canhao no angulo dado

function rotacionaCanhao(ctx, raio, angulo){
    ctx.save();
    ctx.translate(width/2, height/2);
    ctx.rotate(angulo);
    ctx.moveTo(0, 0)
    ctx.lineWidth = raio * 0.2;
    ctx.lineTo(0, raio * 2);
    ctx.stroke();
    ctx.restore();
}
function desenhaTurret(ctx, raio, angulo){
    ctx.beginPath();
    ctx.arc(width/2, height/2, raio, 0, 2*Math.PI);
    ctx.strokeStyle = "#f0470e";
    ctx.stroke();
    ctx.fillStyle = "#005252";
    ctx.fill();
    rotacionaCanhao(ctx, raio, angulo);
}


// testando firebug
console.log("1 c4n 7yp3 t0 c0ns0l3!");
    
// canvas
var c = document.getElementById("canvas_turret");
var ctx = c.getContext("2d");

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
for (i=0; i< 10; i++)
    blitBackground(background);   // blita background
    desenhaTurret(ctx, raio, i * 10);

