module.exports = function(stub){
    var module = {};
    module.asteroid = function(ast){
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
    };
    // desenha todos os asteroides
    module.allAsteroids = function(){
        var i;
        var len = data.asteroids.length;
        for (i = 0; i < len; i++){
            module.asteroid(data.asteroids[i]);
        }

    };
    cano = function (ctx, raio, angulo, nave){
        var x = camera.width/2;
        var y = camera.height/2;
        // salva contexto (necessario em funcao da translacao)
        ctx.save();
        // desloca origem para as coordendas (x,y)
        ctx.translate(x, y);
        // rotaciona a imagem de acordo o angulo
        ctx.rotate(angulo);
        // move para a origem (que agora eh (x, y))
        ctx.moveTo(0, 0)
        ctx.lineWidth = raio * 0.2;
        ctx.lineTo(raio * 2, 0);
        ctx.stroke();
        // restaura contexto
        ctx.restore();
    };

    // desenha o corpo do turret e chama a funcao cano
    module.turret = function (ctx, raio, angulo){
        var x = camera.width/2;
        var y = camera.height/2;
        ctx.strokeStyle = "#f0470e";
        ctx.beginPath();
        ctx.arc(x, y, raio, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fillStyle = "#005252";
        ctx.fill();
        cano(ctx, raio, angulo);
        //Se tem shield, desenha o shield----------
        if(this.hud.stats.shield > 0) {
          ctx.strokeStyle = "#1244AA";
          ctx.beginPath();
          ctx.arc(x, y, raio*1.3, 0, 2*Math.PI);
          ctx.stroke();
        }
    };
    gira = function (nave, cursor){

        var cx = cursor.x + nave.x - camera.width/2;
        var cy = cursor.y + nave.y - camera.height/2;

        var ca = (nave.x - cx);
        var co = (nave.y - cy);

        tangente = (co/ca);
        atan = Math.round(Math.atan(tangente)*100)/100;

        deg = atan * 180/3.14;
     // console.log(deg);
        //Falta tratar quando cursor = background.height
        if(cursor.x > nave.x) {
            if(cursor.y >= nave.y) {
    //            console.log('DireitaBaixo');
            } else if(cursor.x < nave.x){
    //            console.log('DireitaCima');
            }
        } else {
            atan+=4*180/3.14;
            if(cursor.y >= nave.y) {
    //            console.log('EsquerdaBaixo');
            } else {
    //           console.log('EsquerdaCima');
            }
        }
        //console.log(nave);
        return atan;
    };
    return module;
}
