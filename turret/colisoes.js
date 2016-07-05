var colisoes = {
    'confere' : function(){
        var i = 0;
        var x, y;
        var x1, y1;
        var dist;
        var len = asteroides.vetor.length;
        var tam = turret.vetorLaser.length;
        for (i = 0; i < len; i++){
            x = asteroides.vetor[i].x;
            y = asteroides.vetor[i].y;
            // testa se asteroide saiu do board
            if (x > background.width || x < 0 || y > background.height || y < 0){
                asteroides.destroi(i, 1);
                return;
            }
            // testa se turret saiu do board
            // inverte direcao e diminui velocidade pela metade
            if (turret.x >= background.width || turret.x <= 0){
                turret.vx = - turret.vx;
                turret.x = turret.x + (turret.vx * turret.vel);
                turret.vel= turret.vel/2;
            }
            if (turret.y >= background.height || turret.y <= 0){
                turret.vy = - turret.vy;
                turret.y = turret.y + (turret.vy * turret.vel);
                turret.vel= turret.vel/2;
            }
            


            //console.log(Math.sqrt(Math.pow(x,2)+Math.pow(background.width/2,2)));
            //console.log(Math.sqrt(Math.pow(y,2)+Math.pow(background.height/2,2)));

            // testa se turret acertou asteroide
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

            for (j = 0; j < tam; j++){
                x1 = turret.vetorLaser[j].x;
                y1 = turret.vetorLaser[j].y;
                dist = calculo.distGeometrica(x, y, x1, y1)
                if (dist < (asteroides.vetor[i].tam * 5)){
                    asteroides.destroi(i, 1);


                    //------Exemplo--------
                    turret.hud.stats.kills += 1;
                    //----------------------

                    return;
                }
            }
        }
    }
}
