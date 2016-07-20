// colisoes
// hmm, isso daqui tah meio porco, eh tudo uma funcao soh
module.exports = function(ast, background, camera, players, calculo){
    var module = {};

    // variaveis auxiliares 
    var i = 0;
    var x, y;
    var x1, y1;
    var dist;
    // len = ultimo elemento do vetor de asteroides
    // tam = idem do vetor de Laser
//            var tam = turret.vetorLaser.length;
    // percorre vetor de asteroides

// confere se algum objeto atingiu a borda do mapa
        module.borda = function(){
            // primeiro asteroides
            module.asteroides();
            // depois turrets
            module.turrets();
        }

        // funcoes booleanas
        saiuMapa = function(x, y){
            if (x > background.width ||
                x < 0 ||
                y > background.height ||
                y < 0){
                return true;
            }
            else{
                return false;
            }
        }
        bateuBordaY = function(y){
                if (y >= background.height - camera.height/2 || y <= camera.height/2){
                    return true;
                    }
                else
                    return false;
        }
        bateuBordaX = function(x){
                if (x >= background.width - camera.width/2 || x <= camera.width/2){
                    return true;
                }
                else
                    return false;
        }

        module.asteroides = function(){
            var len = ast.asteroides.vetor.length;
            for (i = 0; i < len; i++){
                // testa se asteroide saiu do mapa
                var asteroide = ast.asteroides.vetor[i];
                if (asteroide != undefined){
                    if (saiuMapa(asteroide.x, asteroide.y)){
                            // se sim, boom!
                        ast.asteroides.destroi(i, 1);
                    }
                }

           }
        }
        module.turrets = function(){
            for (var k in players){
                var turret = players[k];
                    if (bateuBordaX(turret.pos.x)){
                        turret.versor.x = - turret.versor.x;
                        turret.pos.x = turret.pos.x + (turret.versor.x * turret.vel);
                        turret.vel= turret.vel/2;
                    }
                    if (bateuBordaY(turret.pos.y)){
                        turret.versor.y = - turret.versor.y;
                        turret.pos.y = turret.pos.y + (turret.versor.y * turret.vel);
                        turret.vel= turret.vel/2;
                    }
            }
        }
        
        return module;
}
        /*      super debug mode
                console.log('\033c');
                console.log(turret);
        */
                // proximas condicionais testam se turret saiu do board
                // inverte direcao e diminui velocidade pela metade
        /*

                //console.log(Math.sqrt(Math.pow(x,2)+Math.pow(.background.width/2,2)));
                //console.log(Math.sqrt(Math.pow(y,2)+Math.pow(.background.height/2,2)));

                // testa se turret acertou asteroide
                // ue, isso nao eh distancia geometrica?? se sim, usar funcao
                if( Math.sqrt(Math.pow(x-(turret.pos.x),2)) < turret.raio*2  && Math.sqrt(Math.pow(y-(turret.pos.y),2)) < turret.raio*2) {
                  //mata asteroide
                  ast.asteroides.destroi(i,1);
        
                  //corta velocidade
                  turret.vel = turret.vel/2;
                  // diminui escudo e vida
                  if(turret.hud.stats.shield > 0) {
                    turret.hud.stats.shield -=1;
                  } else {
                    turret.hud.stats.vida -=1;
                  }
                  return;
                }

                //----------------------

                // confere se laser acertou algum asteroide
                // laser = um conjunto de coordenadas armazenado num vetor
                // o teste consiste em calcular a distancia geometrica de cada ponto
                // do vetorLaser em relacao ao centro de cada asteroide
                for (j = 0; j < tam; j++){
                    x1 = turret.vetorLaser[j].x;
                    y1 = turret.vetorLaser[j].y;
                    dist = calculo.distGeometrica(x, y, x1, y1)
                    // se a distancia for inferior ao diametro do asteroide
                    if (dist < (ast.asteroides.vetor[i].tam * 5)){
                        // o laser acertou, BAM
                        ast.asteroides.destroi(i, 1);
                        // aumenta contador de kills
                        turret.hud.stats.kills += 1;
                        return;
                    }
                }
            */
