//outro exemplo de pseudo-classe
module.exports = function(background, calc){
    var module = {};
    module.Asteroide = function(x, y, velocidade, tamanho, versor){
    this.x = x;
    this.y = y;
    this.vel = velocidade;
    this.tam = tamanho;
    this.v = versor;
    this.hp = 10;
}
    // declara vetor de asteroides
    module.vetor = [];

    // as quatro funcoes abaixo sao chamadas
    // na criacao de um asteroide, de acordo com um numero aleatorio
    // que determina em que borda vai nascer (esquerda, direita, superior, inferior)
    // sao identicas exceto nos valores das coordenadas e versor
    criaEsq = function(vel, tam, hp){
        var x = 1;
        // y -> numero de 1 ateh a altura do mapa
        var y = Math.floor((Math.random() * background.height) + 1);
        // ultima posicao no vetor
        var len = module.vetor.length;
        // cria novo versor (a partir de uma pseudo-classe)
        var versor = new calc.Versor();
        // joga no vetor (igual a fazer um "push")
        module.vetor[len] = new module.Asteroide(x, y, vel, tam, versor, hp);
        // seta o versor
        versor.x=1;
        var vy = (Math.random() - 0.5);
        versor.y=vy;
    };
    criaDir = function(vel, tam, hp){
        var x = background.width;
        var y = Math.floor((Math.random() * background.height) + 1);
        var len = module.vetor.length;
        var versor = new calc.Versor();
        module.vetor[len] = new module.Asteroide(x, y, vel, tam, versor, hp);
        versor.x=-1;
        var vy = (Math.random() - 0.5);
        versor.y=vy;
    };
    criaSup = function(vel, tam, hp){
        var x = Math.floor((Math.random() * background.height) + 1);
        var y = 1;
        var len = module.vetor.length;
        var versor = new calc.Versor();
        module.vetor[len] = new module.Asteroide(x, y, vel, tam, versor, hp);
        versor.y=1;
        var vx = (Math.random() - 0.5);
        versor.x=vx;
    };
    criaInf = function(vel, tam, hp){
        var x = Math.floor((Math.random() * background.height) + 1);
        var y = background.height;
        var len = module.vetor.length;
        var versor = new calc.Versor();
        module.vetor[len] = new module.Asteroide(x, y, vel, tam, versor, hp);
        versor.y=-1;
        var vx = (Math.random() - 0.5);
        versor.x=vx;
    };
    module.cria = function(){
        var randomize = Math.floor((Math.random())* 4);
        var vel = Math.floor((Math.random() * 10) + 1);
        var tam = Math.floor((Math.random() * 5) + 2);
        var hp = tam * 10;
        if (randomize == 0){
            criaEsq(vel, tam, hp);
        }
        else if (randomize == 1){
            criaDir(vel, tam, hp);
        }
        else if (randomize == 2){
            criaSup(vel, tam, hp);
        }
        else criaInf(vel, tam, hp);
    };
    // remove asteroide do vetor
    module.destroi = function(indice){
        this.vetor.splice(indice, 1);
    };
    // destroi todos os this
    module.limpa = function(){
        var i;
        var len = this.vetor.length;
        for (i = 0; i < len; i++){
            this.destroi(i, 1);
        }
    };
    return module;
};

