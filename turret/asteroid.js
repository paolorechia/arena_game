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

