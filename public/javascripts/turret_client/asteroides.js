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
}
