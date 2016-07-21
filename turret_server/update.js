// that is, this code calculates what will happen in the
// next iteration of the main loop, thus updating the game state

module.exports = function(players, asteroides){
   var module = {};

   module.turrets = function(){
        for (var id in players){
                turret = players[id]; 
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
        }
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
 
