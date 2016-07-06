// objeto de funcoes de colisoes
// hmm, isso daqui tah meio porco, eh tudo uma funcao soh
var colisoes = {
    'confere' : function(){
        // variaveis auxiliares 
        var i = 0;
        var x, y;
        var x1, y1;
        var dist;
        // len = ultimo elemento do vetor de asteroides
        var len = asteroides.vetor.length;
        // tam = idem do vetor de Laser
        var tam = turret.vetorLaser.length;
        // percorre vetor de asteroides
        for (i = 0; i < len; i++){
            // puxa coordenadas do asteroide
            x = asteroides.vetor[i].x;
            y = asteroides.vetor[i].y;
            // testa se asteroide saiu do mapa
            if (x > background.width || x < 0 || y > background.height || y < 0){
                // se sim, boom!
                asteroides.destroi(i, 1);
                return;
            }

            // proximas condicionais testam se turret saiu do board
            // inverte direcao e diminui velocidade pela metade
            if (turret.x >= background.width - camera.width/2 || turret.x <= camera.width/2){
                turret.vx = - turret.vx;
                turret.x = turret.x + (turret.vx * turret.vel);
                turret.vel= turret.vel/2;
            }
            if (turret.y >= background.height - camera.height/2 || turret.y <= camera.height/2){
                turret.vy = - turret.vy;
                turret.y = turret.y + (turret.vy * turret.vel);
                turret.vel= turret.vel/2;
            }
            


            //console.log(Math.sqrt(Math.pow(x,2)+Math.pow(background.width/2,2)));
            //console.log(Math.sqrt(Math.pow(y,2)+Math.pow(background.height/2,2)));

            // testa se turret acertou asteroide
            // ue, isso nao eh distancia geometrica?? se sim, usar funcao
            if( Math.sqrt(Math.pow(x-(turret.x),2)) < turret.raio*2  && Math.sqrt(Math.pow(y-(turret.y),2)) < turret.raio*2) {
              //mata asteroide
              asteroides.destroi(i,1);
    
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
                if (dist < (asteroides.vetor[i].tam * 5)){
                    // o laser acertou, BAM
                    asteroides.destroi(i, 1);
                    // aumenta contador de kills
                    turret.hud.stats.kills += 1;
                    return;
                }
            }
        }
    }
}
