
function Asteroide(x, y, velocidade, tamanho, versor){
    this.x = x;
    this.y = y;
    this.vel = velocidade;
    this.tam = tamanho;
    this.v = versor;
}
var asteroides = {
    vetor : [],
    'criaEsq' : function(vel, tam){
        var x = 1;
        var y = Math.floor((Math.random() * background.height) + 1);
        var len = asteroides.vetor.length;
        var versor = new Versor();
        asteroides.vetor[len] = new Asteroide(x, y, vel, tam, versor);
        versor.x=1;
        var vy = (Math.random() - 0.5);
        versor.y=vy;
    },
    'criaDir' : function(vel, tam){
        var x = background.width;
        var y = Math.floor((Math.random() * background.height) + 1);
        var len = asteroides.vetor.length;
        var versor = new Versor();
        asteroides.vetor[len] = new Asteroide(x, y, vel, tam, versor);
        versor.x=-1;
        var vy = (Math.random() - 0.5);
        versor.y=vy;
    },
    'criaSup' : function(vel, tam){
        var x = Math.floor((Math.random() * background.height) + 1);
        var y = 1;
        var len = asteroides.vetor.length;
        var versor = new Versor();
        asteroides.vetor[len] = new Asteroide(x, y, vel, tam, versor);
        versor.y=1;
        var vx = (Math.random() - 0.5);
        versor.x=vx;
    },
    'criaInf' : function(vel, tam){
        var x = Math.floor((Math.random() * background.height) + 1);
        var y = background.height;
        var len = asteroides.vetor.length;
        var versor = new Versor();
        asteroides.vetor[len] = new Asteroide(x, y, vel, tam, versor);
        versor.y=-1;
        var vx = (Math.random() - 0.5);
        versor.x=vx;
    },
    'cria' : function(){
        var randomize = Math.floor((Math.random())* 4);
        var vel = Math.floor((Math.random() * 10) + 1);
        var tam = Math.floor((Math.random() * 5) + 2);
        if (randomize == 0){
            asteroides.criaEsq(vel, tam);
        }
        else if (randomize == 1){
            asteroides.criaDir(vel, tam);
        }
        else if (randomize == 2){
            asteroides.criaSup(vel, tam);
        }
        else asteroides.criaInf(vel, tam);
    },
    'atualiza' : function(){
        var i = 0;
        var len = asteroides.vetor.length;
        for (i = 0; i < len; i++){
            asteroides.vetor[i].x += asteroides.vetor[i].v.x * asteroides.vetor[i].vel;
            asteroides.vetor[i].y += asteroides.vetor[i].v.y * asteroides.vetor[i].vel;
        /*
            console.log(asteroides.vetor[i]);
            console.log(asteroides.vetor[i]);
        */
        }
    },

    'destroi' : function(indice){
        asteroides.vetor.splice(indice, 1);
    },
    'desenha' : function(ast){
        ctx.strokeStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(ast.x,
                ast.y,
                ast.tam * 5, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
    },
    'desenhaTodos' : function(){
        var i;
        var len = asteroides.vetor.length;
        for (i = 0; i < len; i++){
            asteroides.desenha(asteroides.vetor[i]);
        }

    },
    'limpa' : function(){
        var i;
        var len = asteroides.vetor.length;
        for (i = 0; i < len; i++){
            asteroides.destroi(i, 1);
        }
    }
}
