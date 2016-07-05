var colisoes = {
    'confere' : function(){
        var i = 0;
        var x, y;
        var x1, y1;
        var dist;
        var len = vetorAsteroide.length;
        var tam = turret.vetorLaser.length;
        for (i = 0; i < len; i++){
            x = vetorAsteroide[i].x;
            y = vetorAsteroide[i].y;
            // testa se asteroide saiu do board
            if (x > background.width || x < 0 || y > background.height || y < 0){
                asteroides.destroi(i, 1);
                return;
            }


            //console.log(Math.sqrt(Math.pow(x,2)+Math.pow(background.width/2,2)));
            //console.log(Math.sqrt(Math.pow(y,2)+Math.pow(background.height/2,2)));

            if( Math.sqrt(Math.pow(x-(background.width/2),2)) < turret.raio*2  && Math.sqrt(Math.pow(y-(background.height/2),2)) < turret.raio*2) {
              asteroides.destroi(i,1);

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
                if (dist < (vetorAsteroide[i].tam * 5)){
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
