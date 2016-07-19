// that is, this code calculates what will happen in the
// next iteration of the main loop, thus updating the game state

module.exports = function(io, players, ast){
   var module = {};

   module.turrets = function(){
        for (var id in io.sockets.connected){
                var turret = players[id];
                //console.log(turret);
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
        var len = ast.asteroides.vetor.length;
        for (i = 0; i < len; i++){
            // a cada interacao as coordenadas de um asteroide sao puxadas
            // e multiplacadas pelo versor desse asteroide
            ast.asteroides.vetor[i].x += ast.asteroides.vetor[i].v.x * ast.asteroides.vetor[i].vel;
            ast.asteroides.vetor[i].y += ast.asteroides.vetor[i].v.y * ast.asteroides.vetor[i].vel;
        }
    }

    return module;
}
 
