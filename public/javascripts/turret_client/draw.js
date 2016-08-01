module.exports = function(turret, camera, background, data, ctx_turret, calculo){
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
        if(turret.shield > 0) {
          ctx.strokeStyle = "#1244AA";
          ctx.beginPath();
          ctx.arc(x, y, raio*1.3, 0, 2*Math.PI);
          ctx.stroke();
        }
    };
    module.laser = function(x0, y0, x1, y1){
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
        ctx_turret.beginPath();
        // move para inicio da linha
        ctx_turret.moveTo(x0,y0);
        // seta largura da linha
        ctx_turret.lineWidth=turret.raio*0.3;
        // cor
        ctx_turret.strokeStyle="rgba(0, 180, 0, 0.7)";
        // coordenada destino
        ctx_turret.lineTo(x1, y1);
        // desenha
        ctx_turret.stroke();

        ctx_turret.beginPath();
        // move para inicio da linha
        ctx_turret.moveTo(x0,y0);
        // seta largura da linha
        ctx_turret.lineWidth=turret.raio*0.1;
        // cor
        ctx_turret.strokeStyle="#00ff00";
        // coordenada destino
        ctx_turret.lineTo(x1, y1);
        // desenha
        ctx_turret.stroke();
    };

    module.allLasers = function(){
        for (var i = 0; i < data.players.length; i++){
               var laser = data.lasers[i]; 
               //console.log(laser);
               if (laser != undefined && laser.first != undefined){
                   module.laser(laser.first.x, laser.first.y,
                                       laser.last.x,  laser.last.y);
               }
        }
    },
          // desenha os stats na tela
    module.hud = function() {
            ctx_turret.font = "30px Arial";
            ctx_turret.fillStyle="green";
            ctx_turret.fillText("HP: " + turret.vida, camera.width/22, camera.height/18)
            ctx_turret.fillText("Weapon: " + turret.weapon, camera.width/22, camera.height/9)
            ctx_turret.fillStyle='red';
            ctx_turret.fillText('Kills: '+ turret.kills, camera.width/2.2, camera.height/18)
            ctx_turret.fillStyle='blue';
            ctx_turret.fillText('SH: ' + turret.shield, camera.width/22, camera.height/6)
            ctx_turret.fillStyle='#1244AA';
            ctx_turret.fillText('Energy: ' + turret.energy, camera.width/2.3, camera.height/1.05)
    };
    module.camera = function(camera, ctx){
        ctx.drawImage(background.imagem, turret.x - camera.width/2, turret.y - camera.height/2, camera.width, camera.height,0, 0, camera.width, camera.height);
    module.enemy = function(inimigo, cursor){
        /* variaveis auxiliares, pega coordenadas do canvas pequeno
        (os quatro cantos) de um retangulo
        //(turret.x, turret.y) = posicao do turret
        */
        var angulo = calculo.anguloGiro(inimigo, cursor);
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
        // comeca desenho
        ctx_turret.beginPath();
        // strokestyle = cor da linha
        ctx_turret.strokeStyle = "#FFFFFF";
        // caminha um circulo nas coordenadas (x,y),
        // de raio inimigo.tam * 5,
        // 0??
        // arco 2pi
        // desenha o caminho
        // fillstyle = cor de preenchimento
        
        ctx_turret.arc(x, y, turret.raio, 0, 2*Math.PI);
        ctx_turret.fillStyle = "#FF0000";
        // preenche
        ctx_turret.stroke();
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
    };

    module.allEnemies = function(){
        for (var i = 0; i < data.players.length; i++){
            if (data.players_id[i] != data.my_id){
                module.enemy(data.players[i], data.players_pointers[i]);
            }
        }
    };
}

// um jeito interessante de desenhar que fiz para brincar eh
// desenhar uma linha da nave ateh as data.coordenadas do inimigo
// o efeito eh tipo um laser que vai em direcao ao inimigo
    module.blaster = function(blaster, previous){
        var borda_esq = turret.x - camera.width/2;
        var borda_dir = turret.x + camera.width/2;
        var borda_sup = turret.y - camera.height/2;
        var borda_inf = turret.y + camera.height/2;
        // confere se inimigoeroide entrou no canvas menor
        if (blaster.x > borda_esq && blaster.x < borda_dir && blaster.y > borda_sup && blaster.y < borda_inf){
                // e soh entao desenha na tela
                // calcula as data.coordenadas em relacao ao canvas menor
                // (cada canyvas teu o seu sistema de data.coordenadas)
            var x1 = blaster.x - borda_esq;
            var y1 = blaster.y - borda_sup;
            vx = blaster.versor.x * blaster.speed * 2;
            vy = blaster.versor.y * blaster.speed * 2;
            var y0 = y1 + vy;
            var x0 = x1 + vx;
            ctx_turret.beginPath();
            ctx_turret.strokeStyle= "#FF0000";
            ctx_turret.moveTo(x1, y1);
            ctx_turret.lineTo(x0, y0);
            ctx_turret.stroke();
            var x1 = x1 - vx/3;
            var y1 = y1 - vy/3;
//            var y0 = y0 + vy/3;
//            var x0 = x0 + vx/3;
            
            ctx_turret.beginPath();
            ctx_turret.strokeStyle = "rgba(255, 0, 0, 0.5)";
            ctx_turret.moveTo(x1, y1);
            ctx_turret.lineTo(x0, y0);
            ctx_turret.stroke();
        }
    };

    module.allBlasters = function(){
        for (var i = 0; i < data.blasters.length; i++){
            if (data.blasters[i] != undefined)
                module.blaster(data.blasters[i]);
        }
    };
    return module;
}
