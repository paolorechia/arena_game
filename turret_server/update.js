// that is, this code calculates what will happen in the
// next iteration of the main loop, thus updating the game state

module.exports = function(players, asteroides, blasters, calc, turret){
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
    module.lasers = function(){
        for (var id in players){
            module.laser(players[id]);
        }
    }
    module.shields = function(){
        for (var id in players){
            var nave = players[id];
            turret.rechargeShield(nave);
        }
    } 
    module.energies = function(){
        for (var id in players){
            var nave = players[id];
            turret.overheatEnergy(nave); // apply overheat before recharging
            turret.rechargeEnergy(nave);
        }
    } 
    module.blasters = function(){
        
    module.blaster = function(nave){
        if (nave.blaster.atirando == 0 || turret.energy.overheat == true){
            return;
        }
        nave.blaster.atirando = 0;
        console.log("shot a blaster!");
        nave.blaster.versor = calc.versorArma(turret);
        var base = 2;
        var x0 = nave.pos.x + nave.blaster.versor.x * nave.raio * base;
        var y0 = nave.pos.y + nave.blaster.versor.y * nave.raio * base;
        tiro = new blasters.shot(x0, y0, 
                                nave.blaster.speed, 
                                nave.blaster.size,
                                nave.blaster.versor
                                );
        blasters.vetor.push(tiro);
    }
        var i = 0;
        var len = asteroides.vetor.length;
        for (i = 0; i < len; i++){
            // a cada interacao as coordenadas de um asteroide sao puxadas
            // e multiplacadas pelo versor desse asteroide
            asteroides.vetor[i].x += asteroides.vetor[i].v.x * asteroides.vetor[i].vel;
            asteroides.vetor[i].y += asteroides.vetor[i].v.y * asteroides.vetor[i].vel;
        }
    }
    module.laser = function (turret){
        if (turret.laser.atirando == 0 || turret.energy.overheat == true){
           turret.laser.vetor = [];
           return; 
        }
//        console.log("ATIRAAAANDO meu LAAAAASER");
        turret.laser.versor = calc.versorArma(turret);
        turret.energy.points -= turret.laser.cost;
        var base = 2;
        var x0 = turret.pos.x + turret.laser.versor.x * turret.raio * base;
        var y0 = turret.pos.y + turret.laser.versor.y * turret.raio * base;
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
 
