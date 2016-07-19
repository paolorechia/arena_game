//outro exemplo de pseudo-classe
module.exports = function(height, width, calc){
    var module = {};
    module.Asteroide = function(x, y, velocidade, tamanho, versor){
    this.x = x;
    this.y = y;
    this.vel = velocidade;
    this.tam = tamanho;
    this.v = versor;
}
    module.asteroides = {
    // declara vetor de asteroides
    vetor : [],

    // as quatro funcoes abaixo sao chamadas
    // na criacao de um asteroide, de acordo com um numero aleatorio
    // que determina em que borda vai nascer (esquerda, direita, superior, inferior)
    // sao identicas exceto nos valores das coordenadas e versor
    'criaEsq' : function(vel, tam){
        var x = 1;
        // y -> numero de 1 ateh a altura do mapa
        var y = Math.floor((Math.random() * height) + 1);
        // ultima posicao no vetor
        var len = this.vetor.length;
        // cria novo versor (a partir de uma pseudo-classe)
        var versor = new calc.Versor();
        // joga no vetor (igual a fazer um "push")
        this.vetor[len] = new module.Asteroide(x, y, vel, tam, versor);
        // seta o versor
        versor.x=1;
        var vy = (Math.random() - 0.5);
        versor.y=vy;
    },
    'criaDir' : function(vel, tam){
        var x = width;
        var y = Math.floor((Math.random() * height) + 1);
        var len = this.vetor.length;
        var versor = new calc.Versor();
        this.vetor[len] = new module.Asteroide(x, y, vel, tam, versor);
        versor.x=-1;
        var vy = (Math.random() - 0.5);
        versor.y=vy;
    },
    'criaSup' : function(vel, tam){
        var x = Math.floor((Math.random() * height) + 1);
        var y = 1;
        var len = this.vetor.length;
        var versor = new calc.Versor();
        this.vetor[len] = new module.Asteroide(x, y, vel, tam, versor);
        versor.y=1;
        var vx = (Math.random() - 0.5);
        versor.x=vx;
    },
    'criaInf' : function(vel, tam){
        var x = Math.floor((Math.random() * height) + 1);
        var y = height;
        var len = this.vetor.length;
        var versor = new calc.Versor();
        this.vetor[len] = new module.Asteroide(x, y, vel, tam, versor);
        versor.y=-1;
        var vx = (Math.random() - 0.5);
        versor.x=vx;
    },
    'cria' : function(){
        var randomize = Math.floor((Math.random())* 4);
        var vel = Math.floor((Math.random() * 10) + 1);
        var tam = Math.floor((Math.random() * 5) + 2);
        if (randomize == 0){
            this.criaEsq(vel, tam);
        }
        else if (randomize == 1){
            this.criaDir(vel, tam);
        }
        else if (randomize == 2){
            this.criaSup(vel, tam);
        }
        else this.criaInf(vel, tam);
    },
    // atualiza posicao de todos os this
    // simples iteracao em um loop
    'atualiza' : function(){
        var i = 0;
        var len = this.vetor.length;
        for (i = 0; i < len; i++){
            // a cada interacao as coordenadas de um asteroide sao puxadas
            // e multiplacadas pelo versor desse asteroide
            this.vetor[i].x += this.vetor[i].v.x * this.vetor[i].vel;
            this.vetor[i].y += this.vetor[i].v.y * this.vetor[i].vel;
        }
    },

    // remove asteroide do vetor
    'destroi' : function(indice){
        this.vetor.splice(indice, 1);
    },

    // desenha um asteroide no canvas pequeno
    'desenha' : function(ast){
        /* variaveis auxiliares, pega coordenadas do canvas pequeno
        (os quatro cantos) de um retangulo
        //(turret.x, turret.y) = posicao do turret
        */
        var borda_esq = turret.x - camera.width/2;      
        var borda_dir = turret.x + camera.width/2;
        var borda_sup = turret.y - camera.height/2;
        var borda_inf = turret.y + camera.height/2;
        // confere se asteroide entrou no canvas menor
        if (ast.x > borda_esq && ast.x < borda_dir && ast.y > borda_sup && ast.y < borda_inf){
            // e soh entao desenha na tela

            // calcula as coordenadas em relacao ao canvas menor
            // (cada canvas teu o seu sistema de coordenadas)
            var x = ast.x - borda_esq;
            var y = ast.y - borda_sup;

            // desenha o asteroide
            // strokeStyle = cor da linha
            ctx_turret.strokeStyle = "#FFFFFF";
            // comeca desenho
            ctx_turret.beginPath();
            // caminha um circulo nas coordenadas (x,y),
            // de raio ast.tam * 5,
            // 0??
            // arco 2pi
            ctx_turret.arc(x, y, ast.tam * 5, 0, 2*Math.PI);
            // desenha o caminho
            ctx_turret.stroke();
            // fillStyle = cor de preenchimento
            ctx_turret.fillStyle = "#FFFFFF";
            // preenche
            ctx_turret.fill();
        }
    },
    // desenha todos os this
    'desenhaTodos' : function(){
        var i;
        var len = this.vetor.length;
        for (i = 0; i < len; i++){
            this.desenha(this.vetor[i]);
        }

    },
    // destroi todos os this
    'limpa' : function(){
        var i;
        var len = this.vetor.length;
        for (i = 0; i < len; i++){
            this.destroi(i, 1);
        }
    }
}
    return module;
};
