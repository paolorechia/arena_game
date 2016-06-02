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

function desenhaCanhao(ctx, raio){
    ctx.strokeStyle = "#f0470e";
    ctx.moveTo(width/2, height/2);
    ctx.lineWidth = raio * 0.2;
    ctx.lineTo(width/2, height/2 - raio * 2);
    ctx.stroke();
}
function desenhaTurret(ctx, raio){
    ctx.beginPath();
    ctx.arc(width/2, height/2, raio, 0, 2*Math.PI);
    ctx.strokeStyle = "#f0470e";
    ctx.stroke();
    ctx.fillStyle = "#005252";
    ctx.fill();
    desenhaCanhao(ctx, raio);
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

// desenha turret
var raio = 15;
desenhaTurret(ctx, raio);

