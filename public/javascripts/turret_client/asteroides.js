//outro exemplo de pseudo-classe
Asteroide = function(x, y, velocidade, tamanho, versor){
    this.x = x;
    this.y = y;
    this.vel = velocidade;
    this.tam = tamanho;
    this.v = versor;
}
var asteroides = {
    // declara vetor de asteroides
    vetor : [],

    // as quatro funcoes abaixo sao chamadas
    // na criacao de um asteroide, de acordo com um numero aleatorio
    // que determina em que borda vai nascer (esquerda, direita, superior, inferior)
    // sao identicas exceto nos valores das coordenadas e versor
    'criaEsq' : function(vel, tam){
        var x = 1;
        // y -> numero de 1 ateh a altura do mapa
        var y = Math.floor((Math.random() * background.height) + 1);
        // ultima posicao no vetor
        var len = asteroides.vetor.length;
        // cria novo versor (a partir de uma pseudo-classe)
        var versor = new Versor();
        // joga no vetor (igual a fazer um "push")
        asteroides.vetor[len] = new Asteroide(x, y, vel, tam, versor);
        // seta o versor
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
    // atualiza posicao de todos os asteroides
    // simples iteracao em um loop
    'atualiza' : function(){
        socket.on('asteroides', function(novo){
            console.log("ATUALIZEI");
            console.log(novo);
            asteroides.vetor = novo;
            console.log("vetor atualizado" + asteroides.vetor);
            console.log(asteroides.vetor[0]);
        });
    },

    // remove asteroide do vetor
    'destroi' : function(indice){
        asteroides.vetor.splice(indice, 1);
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
    // desenha todos os asteroides
    'desenhaTodos' : function(){
        var i;
        var len = asteroides.vetor.length;
        for (i = 0; i < len; i++){
            asteroides.desenha(asteroides.vetor[i]);
        }

    },
    // destroi todos os asteroides
    'limpa' : function(){
        var i;
        var len = asteroides.vetor.length;
        for (i = 0; i < len; i++){
            asteroides.destroi(i, 1);
        }
    }
}
//} // end of module exports
