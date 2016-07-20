// objeto de funcoes de colisoes
// hmm, isso daqui tah meio porco, eh tudo uma funcao soh
module.exports = function(ast, width, height, players, calculo){
    var module = {};

    // variaveis auxiliares 
    var camera = {
        width : 1600,
        height : 900,
    };
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
            module.bordaAst();
            // depois turrets
            module.bordaTur();
        }
        module.bordaAst = function(){
            var len = ast.asteroides.vetor.length;
            for (i = 0; i < len; i++){
                // puxa coordenadas do asteroide
                x = ast.asteroides.vetor[i].x;
                y = ast.asteroides.vetor[i].y;
                // testa se asteroide saiu do mapa
                if (x > width || x < 0 || y > height || y < 0){
                    // se sim, boom!
                    ast.asteroides.destroi(i, 1);
                    return;
                }
            }
        }
        module.bordaTur = function(){
            for (var k in players){
                var turret = players[k];
        /*      super debug mode
                console.log('\033c');
                console.log(turret);
                console.log("width = " + width);
                console.log("height = " + height);
                console.log("camera.width = " + camera.width/2);
                console.log("camera.height = " + camera.height/2);
                console.log("turret.pos.x = " + turret.pos.x);
                console.log("turret.pos.y = " + turret.pos.y);
        */
                // proximas condicionais testam se turret saiu do board
                // inverte direcao e diminui velocidade pela metade
                if (turret.pos.x >= width - camera.width/2 || turret.pos.x <= camera.width/2){
                    console.log("saiu em x");
                    turret.versor.x = - turret.versor.x;
                    turret.pos.x = turret.pos.x + (turret.versor.x * turret.vel);
                    turret.vel= turret.vel/2;
                }
                if (turret.pos.y >= height - camera.height/2 || turret.pos.y <= camera.height/2){
                    console.log("saiu em y");
                    turret.versor.y = - turret.versor.y;
                    turret.pos.y = turret.pos.y + (turret.versor.y * turret.vel);
                    turret.vel= turret.vel/2;
                }
            }
       }
                
        /*

                //console.log(Math.sqrt(Math.pow(x,2)+Math.pow(.width/2,2)));
                //console.log(Math.sqrt(Math.pow(y,2)+Math.pow(.height/2,2)));

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
        return module;
}

