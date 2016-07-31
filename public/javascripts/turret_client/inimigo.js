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
            // strokestyle = cor da linha
            ctx_turret.strokestyle = "#ffffff";
            // comeca desenho
            ctx_turret.beginpath();
            // caminha um circulo nas coordenadas (x,y),
            // de raio inimigo.tam * 5,
            // 0??
            // arco 2pi
            ctx_turret.arc(x, y, turret.raio, 0, 2*math.pi);
            // desenha o caminho
            ctx_turret.stroke();
            // fillstyle = cor de preenchimento
                ctx_turret.fillstyle = "#ff0000";
            // preenche
            ctx_turret.fill();
            ctx_turret.save();
            // desloca origem para as coordendas (x,y)
            ctx_turret.translate(x, y);
            // rotaciona a imagem de acordo o angulo
            ctx_turret.rotate(angulo);
            // move para a origem (que agora eh (x, y))
            ctx_turret.moveto(0, 0)
            ctx_turret.linewidth = turret.raio * 0.2;
            ctx_turret.lineto(turret.raio * 2, 0);
            ctx_turret.stroke();
            // restaura contexto
            ctx_turret.restore();
       }
    },
    'desenhalaser' : function(x0, y0, x1, y1){
        var borda_esq = turret.x - camera.width/2;      
        var borda_dir = turret.x + camera.width/2;
        var borda_sup = turret.y - camera.height/2;
        var borda_inf = turret.y + camera.height/2;
            // e soh entao desenha na tela

            // calcula as coordenadas em relacao ao canvas menor
            // (cada canvas teu o seu sistema de coordenadas)
        var x0 = x0 - borda_esq;
        var y0 = y0 - borda_sup;
        var x1 = x1 - borda_esq;
        var y1 = y1 - borda_sup;
        ctx_turret.beginpath();
        // move para inicio da linha
        ctx_turret.moveto(x0,y0);
        // seta largura da linha
        ctx_turret.linewidth=turret.raio*0.2;
        // cor
        ctx_turret.strokestyle="#00ff00";
        // coordenada destino
        ctx_turret.lineto(x1, y1);
        // desenha
        ctx_turret.stroke();
    },

    'desenhalasers' : function(){
        for (var i = 0; i < players.length; i++){
               var laser = lasers[i]; 
               //console.log(laser);
               if (laser != undefined && laser.first != undefined){
                   inimigo.desenhalaser(laser.first.x, laser.first.y,
                                       laser.last.x,  laser.last.y);
               }
        }
    },
    'desenhatodos' : function(){
        for (var i = 0; i < players.length; i++){
            if (players_id[i] != my_id){
                inimigo.desenha(players[i], players_pointers[i]);
            }
        }
    },
}
