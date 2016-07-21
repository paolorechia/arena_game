// that is, this code calculates what will happen in the
// next iteration of the main loop, thus updating the game state

module.exports = function(players, asteroides, calc){
   var module = {};

   module.turrets = function(){
        // atualiza posicao do turret
        for (var id in players){
                var turret = players[id]; 
                if (turret.vel >= turret.max_speed){
                    turret.vel = turret.max_speed;
                }
                if (turret.vel > 0){
                    turret.pos.x += turret.versor.x * turret.vel;
                    turret.pos.y += turret.versor.y * turret.vel;
                }
                if (turret.vel <= 0){
                //    turret.para();
                }

        // confere se estah atirando
        }
    }
    // atualiza estado do laser de todos os jogadores
    module.laserTodos = function(){
        for (var id in players){
            module.laser(players[id]);
        }
    }
    module.laser = function (turret){
        if (turret.laser.atirando == 0){
           turret.laser.vetor = [];
           return; 
        }
//        console.log("ATIRAAAANDO");
        calc.laserVersor(turret);
        
        var base = 2;
        var x0 = turret.pos.x + turret.laser.versor.x * turret.raio * base;
        var x1 = turret.pos.x + turret.laser.versor.x * turret.raio * (turret.laser.range + base);
        var y0 = turret.pos.y + turret.laser.versor.y * turret.raio * base;
        var y1 = turret.pos.y + turret.laser.versor.y * turret.raio * (turret.laser.range + base);
        var i;
        // cria um vetor de coordenadas para testar nas colisoes
        for (i = 0; i < turret.laser.range; i++){
            turret.laser.vetor[i] = new calc.Coordenadas(0,0);
            turret.laser.vetor[i].x = (x0 + turret.laser.versor.x * turret.raio * i);
            turret.laser.vetor[i].y = (y0 + turret.laser.versor.y * turret.raio * i);
        }
//        console.log(turret.laser.vetor);
    } 
    module.asteroides = function(){
        var i = 0;
        var len = asteroides.vetor.length;
        for (i = 0; i < len; i++){
            // a cada interacao as coordenadas de um asteroide sao puxadas
            // e multiplacadas pelo versor desse asteroide
            asteroides.vetor[i].x += asteroides.vetor[i].v.x * asteroides.vetor[i].vel;
            asteroides.vetor[i].y += asteroides.vetor[i].v.y * asteroides.vetor[i].vel;
        }
    }

    return module;
}
 
