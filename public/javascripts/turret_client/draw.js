module.exports = function(ship, camera, background, data, ctx_ship, calculo){
    var module = {};
    module.asteroid = function(ast){
        /* variaveis auxiliares, pega coordenadas do canvas pequeno
        (os quatro cantos) de um retangulo
        //(ship.x, ship.y) = posicao do ship
        */
        var borda_esq = ship.x - camera.width/2;      
        var borda_dir = ship.x + camera.width/2;
        var borda_sup = ship.y - camera.height/2;
        var borda_inf = ship.y + camera.height/2;
        // confere se asteroide entrou no canvas menor
        if (ast.x > borda_esq && ast.x < borda_dir && ast.y > borda_sup && ast.y < borda_inf){
            // e soh entao desenha na tela

            // calcula as coordenadas em relacao ao canvas menor
            // (cada canvas teu o seu sistema de coordenadas)
            var x = ast.x - borda_esq;
            var y = ast.y - borda_sup;

            // desenha o asteroide
            // strokeStyle = cor da linha
            ctx_ship.strokeStyle = "#FFFFFF";
            // comeca desenho
            ctx_ship.beginPath();
            // caminha um circulo nas coordenadas (x,y),
            // de raio ast.tam * 5,
            // 0??
            // arco 2pi
            ctx_ship.arc(x, y, ast.tam * 5, 0, 2*Math.PI);
            // desenha o caminho
            ctx_ship.stroke();
            // fillStyle = cor de preenchimento
            ctx_ship.fillStyle = "#FFFFFF";
            // preenche
            ctx_ship.fill();
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
    cano = function (ctx, raio, angulo, ship){
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

    // desenha o corpo do ship e chama a funcao cano
    module.ship = function (ctx, raio, angulo){
        var x = camera.width/2;
        var y = camera.height/2;
        if(ship.shield > 0) {
          //sombra
          ctx.beginPath();
          ctx.strokeStyle = "rgba(10, 10, 255, 0.3)";
          ctx.lineWidth = ship.shield / 10;
          ctx.arc(x, y, raio*1.4, 0, 2*Math.PI);
          ctx.stroke();

          //luz intensa
          ctx.beginPath();
          ctx.strokeStyle = "rgba(100, 100, 200, 1)";
          ctx.lineWidth = 1;
          ctx.arc(x, y, raio*1.4, 0, 2*Math.PI);
          ctx.stroke();
        }
        ctx.strokeStyle = "#f0470e";
        ctx.beginPath();
        ctx.arc(x, y, raio, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fillStyle = "#005252";
        ctx.fill();
        cano(ctx, raio, angulo);
        //Se tem shield, desenha o shield----------
    };
    module.laser = function(x0, y0, x1, y1, hit){
        var borda_esq = ship.x - camera.width/2;      
        var borda_dir = ship.x + camera.width/2;
        var borda_sup = ship.y - camera.height/2;
        var borda_inf = ship.y + camera.height/2;
            // e soh entao desenha na tela

            // calcula as coordenadas em relacao ao canvas menor
            // (cada canvas teu o seu sistema de coordenadas)
        var x0 = x0 - borda_esq;
        var y0 = y0 - borda_sup;
        var x1 = x1 - borda_esq;
        var y1 = y1 - borda_sup;
        ctx_ship.beginPath();
        // move para inicio da linha
        ctx_ship.moveTo(x0,y0);
        // seta largura da linha
        ctx_ship.lineWidth=ship.raio*0.3;
        // cor
        ctx_ship.strokeStyle="rgba(0, 180, 0, 0.7)";
        // coordenada destino
        ctx_ship.lineTo(x1, y1);
        // desenha
        ctx_ship.stroke();

        ctx_ship.beginPath();
        // move para inicio da linha
        ctx_ship.moveTo(x0,y0);
        // seta largura da linha
        ctx_ship.lineWidth=ship.raio*0.1;
        // cor
        ctx_ship.strokeStyle="#00ff00";
        // coordenada destino
        ctx_ship.lineTo(x1, y1);
        // desenha
        ctx_ship.stroke();
        if (hit){
            ctx_ship.beginPath();
            ctx_ship.fillStyle="#00ff00";
            ctx_ship.arc(x1, y1, 10, 0, Math.PI);
            ctx_ship.fill();
            ctx_ship.beginPath();
        }
    };

    module.allLasers = function(){
        for (var i = 0; i < data.players.length; i++){
               var laser = data.lasers[i]; 
               //console.log(laser);
               if (laser != undefined && laser.first != undefined){
                   module.laser(laser.first.x, laser.first.y,
                                laser.last.x,  laser.last.y,
                                laser.hit);
               }
        }
    },
          // desenha os stats na tela
    module.hud = function() {
            ctx_ship.font = "30px Arial";
            ctx_ship.fillStyle="green";
            ctx_ship.fillText("HP: " + ship.vida, camera.width/22, camera.height/18)
            ctx_ship.fillText("Weapon: " + ship.weapon, camera.width/22, camera.height/9)
            ctx_ship.fillStyle='red';
            ctx_ship.fillText('Kills: '+ ship.kills, camera.width/2.2, camera.height/18)
            ctx_ship.fillStyle='blue';
            ctx_ship.fillText('SH: ' + ship.shield, camera.width/22, camera.height/6)
            ctx_ship.fillStyle='#1244AA';
            ctx_ship.fillText('Energy: ' + ship.energy, camera.width/2.3, camera.height/1.05)
    };
    module.camera = function(camera, ctx){
        ctx.drawImage(background.imagem, ship.x - camera.width/2, ship.y - camera.height/2, camera.width, camera.height,0, 0, camera.width, camera.height);
    module.enemy = function(inimigo, cursor){
        /* variaveis auxiliares, pega coordenadas do canvas pequeno
        (os quatro cantos) de um retangulo
        //(ship.x, ship.y) = posicao do ship
        */
        var angulo = calculo.anguloGiro(inimigo, cursor);
        var borda_esq = ship.x - camera.width/2;      
        var borda_dir = ship.x + camera.width/2;
        var borda_sup = ship.y - camera.height/2;
        var borda_inf = ship.y + camera.height/2;
        // confere se inimigoeroide entrou no canvas menor
        if (inimigo.x > borda_esq && inimigo.x < borda_dir && inimigo.y > borda_sup && inimigo.y < borda_inf){
        // e soh entao desenha na tela

        // calcula as coordenadas em relacao ao canvas menor
        // (cada canvas teu o seu sistema de coordenadas)
        var x = inimigo.x - borda_esq;
        var y = inimigo.y - borda_sup;

        // desenha o inimigoeroide
        // comeca desenho
        ctx_ship.beginPath();
        // strokestyle = cor da linha
        ctx_ship.strokeStyle = "#FFFFFF";
        // caminha um circulo nas coordenadas (x,y),
        // de raio inimigo.tam * 5,
        // 0??
        // arco 2pi
        // desenha o caminho
        // fillstyle = cor de preenchimento
        
        ctx_ship.arc(x, y, ship.raio, 0, 2*Math.PI);
        ctx_ship.fillStyle = "#FF0000";
        // preenche
        ctx_ship.stroke();
        ctx_ship.fill();
        ctx_ship.save();
        // desloca origem para as coordendas (x,y)
        ctx_ship.translate(x, y);
        // rotaciona a imagem de acordo o angulo
        ctx_ship.rotate(angulo);
        // move para a origem (que agora eh (x, y))
        ctx_ship.moveTo(0, 0)
        ctx_ship.lineWidth = ship.raio * 0.2;
        ctx_ship.lineTo(ship.raio * 2, 0);
        ctx_ship.stroke();
        // restaura contexto
        ctx_ship.restore();
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
// desenhar uma linha da ship ateh as data.coordenadas do inimigo
// o efeito eh tipo um laser que vai em direcao ao inimigo
    module.blaster = function(blaster, previous){
        var borda_esq = ship.x - camera.width/2;
        var borda_dir = ship.x + camera.width/2;
        var borda_sup = ship.y - camera.height/2;
        var borda_inf = ship.y + camera.height/2;
        // confere se inimigoeroide entrou no canvas menor
        if (blaster.x > borda_esq && blaster.x < borda_dir && blaster.y > borda_sup && blaster.y < borda_inf){
                // e soh entao desenha na tela
                // calcula as data.coordenadas em relacao ao canvas menor
                // (cada canyvas teu o seu sistema de data.coordenadas)
            var x1 = blaster.x - borda_esq;
            var y1 = blaster.y - borda_sup;
            if (blaster.hit == false){
                vx = blaster.versor.x * blaster.speed * 2;
                vy = blaster.versor.y * blaster.speed * 2;
                var y0 = y1 + vy;
                var x0 = x1 + vx;
                ctx_ship.beginPath();
                ctx_ship.strokeStyle= "#FF0000";
                ctx_ship.moveTo(x1, y1);
                ctx_ship.lineTo(x0, y0);
                ctx_ship.stroke();
                var x1 = x1 - vx/3;
                var y1 = y1 - vy/3;
                
                ctx_ship.beginPath();
                ctx_ship.strokeStyle = "rgba(255, 0, 0, 0.5)";
                ctx_ship.moveTo(x1, y1);
                ctx_ship.lineTo(x0, y0);
                ctx_ship.stroke();
            }
            else{
                ctx_ship.beginPath();
                ctx_ship.fillStyle = "rgba(255, 50, 0, 0.5)";
                ctx_ship.arc(x1, y1, 20, 0, Math.PI);
                ctx_ship.fill();
                ctx_ship.beginPath();
                
                for (var i = 0; i < 5; i++){
                    ctx_ship.beginPath();
                    ctx_ship.strokeStyle = "rgba(255, 50, 0, 0.8)";
                    ctx_ship.moveTo(x1, y1);
                    var vx = Math.floor(Math.random() * 60);
                    var vy = Math.floor(Math.random() * 60);
                    var x0 = x1 + vx;
                    var y0 = y1 + vy;
                    ctx_ship.lineTo(x0, y0); 
                    ctx_ship.stroke();
                }
                
            }
        }
    };

    module.allBlasters = function(){
        for (var i = 0; i < data.blasters.length; i++){
            if (data.blasters[i] != undefined)
                module.blaster(data.blasters[i]);
        }
    };
    module.menu= function(){
        console.log("desenhando menu");
        module.camera(camera, ctx_ship);
        ctx_ship.beginPath();
        ctx_ship.fillStyle = "rgba(40, 40, 120, 0.5)";
        console.log(ctx_ship);
        ctx_ship.fillRect(camera.width/4, 0, camera.width - camera.width/2, camera.height);
    };

    return module;
}
