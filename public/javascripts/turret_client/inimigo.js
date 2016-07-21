var players = [];
var players_id = [];
var players_pointers = [];

var inimigo = {
    'desenha' : function(inimigo, cursor){
        /* variaveis auxiliares, pega coordenadas do canvas pequeno
        (os quatro cantos) de um retangulo
        //(turret.x, turret.y) = posicao do turret
        */
        var angulo = turret.gira(inimigo, cursor);
        var borda_esq = turret.x - camera.width/2;      
        var borda_dir = turret.x + camera.width/2;
        var borda_sup = turret.y - camera.height/2;
        var borda_inf = turret.y + camera.height/2;
        // confere se inimigoeroide entrou no canvas menor
        if (inimigo.x > borda_esq && inimigo.x < borda_dir && inimigo.y > borda_sup && inimigo.y < borda_inf){
            // e soh entao desenha na tela

            // calcula as coordenadas em relacao ao canvas menor
            // (cada canvas teu o seu sistema de coordenadas)
            var x = inimigo.x - borda_esq;
            var y = inimigo.y - borda_sup;

            // desenha o inimigoeroide
            // strokeStyle = cor da linha
            ctx_turret.strokeStyle = "#FFFFFF";
            // comeca desenho
            ctx_turret.beginPath();
            // caminha um circulo nas coordenadas (x,y),
            // de raio inimigo.tam * 5,
            // 0??
            // arco 2pi
            ctx_turret.arc(x, y, turret.raio, 0, 2*Math.PI);
            // desenha o caminho
            ctx_turret.stroke();
            // fillStyle = cor de preenchimento
                ctx_turret.fillStyle = "#FF0000";
            // preenche
            ctx_turret.fill();
            ctx_turret.save();
            // desloca origem para as coordendas (x,y)
            ctx_turret.translate(x, y);
            // rotaciona a imagem de acordo o angulo
            ctx_turret.rotate(angulo);
            // move para a origem (que agora eh (x, y))
            ctx_turret.moveTo(0, 0)
            ctx_turret.lineWidth = turret.raio * 0.2;
            ctx_turret.lineTo(turret.raio * 2, 0);
            ctx_turret.stroke();
            // restaura contexto
            ctx_turret.restore();
       }
    },
    'desenhaTodos' : function(){
        for (var i = 0; i < players.length; i++){
            if (players_id[i] != my_id){
                inimigo.desenha(players[i], players_pointers[i]);
            }
        }
    },
}
