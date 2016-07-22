// colisoes
module.exports = function(asteroides, background, camera, players, calc, turret, blasters){
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

// confere todas as colisoes
        module.tudo= function(){
            // primeiro asteroides
            module.asteroides();
            // depois turrets
            module.naves();
            module.shots();
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
            for (i = 0; i < asteroides.vetor.length; i++){
                // pega um asteroide do vetor
                var asteroide = asteroides.vetor[i];
                // verifica se eh valido 
                // se nao for, pula para proximo asteroide
                // testa se asteroide saiu do mapa
                if (saiuMapa(asteroide.x, asteroide.y)){
                        // se sim, boom!
                    asteroides.destroi(i, 1);
                }
                // testa se asteroide colidiu com algum turret
                for (var k in players){
                    var nave = players[k];
                    dist = calc.distGeometrica(asteroide.x, asteroide.y, nave.pos.x, nave.pos.y);
                    var raio_ast = asteroide.tam * 5;
                    if (dist < (raio_ast + nave.raio)){
//                      console.log("to matando");
                      //mata asteroide
                        asteroides.destroi(i,1);
                        //corta velocidade
                        nave.vel = nave.vel/2;
                        // diminui escudo e vida
                        turret.sofreDano(nave, (asteroide.tam * asteroide.tam));
                        if (nave.hull.points < 0)
                        {
                            turret.morte(nave);
                            turret.respawnInTime(nave, 5);
                        }
                    }
                       
                 // e com algum laser das naves
                     if (nave.laser.vetor[0] != undefined){
                            for (var j = 0; j < nave.laser.range; j++){
                                x1 = nave.laser.vetor[j].x;
                                y1 = nave.laser.vetor[j].y;
                                dist = calc.distGeometrica(asteroide.x, asteroide.y, x1, y1)
                                // se a distancia for inferior ao diametro do asteroide
                                if (asteroides.vetor[i] != undefined){
                                    if (dist < (asteroides.vetor[i].tam * 5)){
                                        // o laser acertou, BAM
                                        asteroides.vetor[i].hp--;
//                                        console.log("its a hit!", 
//                                        asteroides.vetor[i].hp);
                                        if (asteroides.vetor[i].hp <= 0){
                                            asteroides.destroi(i, 1);
                                        }
                                        // aumenta contador de kills
                                        nave.ast_kills += 1;
                                    }
                                }
                            }
                     }
                }
            }
        }
        module.naves= function(){
            for (var k in players){
                var nave = players[k];
                    if (bateuBordaX(nave.pos.x)){
                        nave.versor.x = - nave.versor.x;
                        nave.pos.x = nave.pos.x + (nave.versor.x * nave.vel);
                        nave.vel= nave.vel/2;
                    }
                    if (bateuBordaY(nave.pos.y)){
                        nave.versor.y = - nave.versor.y;
                        nave.pos.y = nave.pos.y + (nave.versor.y * nave.vel);
                        nave.vel= nave.vel/2;
                    }
                    if (nave.laser.vetor[0] != undefined){
                        for (var j in players){
                            var alvo = players[j];
                            if (alvo != nave){
                                for (var j = 0; j < nave.laser.range; j++){
                                    x1 = nave.laser.vetor[j].x;
                                    y1 = nave.laser.vetor[j].y;
                                    dist = calc.distGeometrica(alvo.pos.x, alvo.pos.y, x1, y1)
                            
                                    if (dist < (alvo.raio)){
                                       turret.sofreDano(alvo, nave.laser.damage);  
                                       if (alvo.hull.points < 0){
                                         turret.matouNave(nave, alvo)
                                         turret.respawnInTime(alvo, 5);
                                       } 
                                    } 
                                }
                 
                            }
                        }
                   }
            }
        }
        module.shots = function(){
            for (var i = 0; i < blasters.vetor.length; i++){
//            console.log("im checking blasters colisions...");
                shot = blasters.vetor[i];
                if (shot != undefined){
//                console.log("im checking if blaster left board...");
                    if (saiuMapa(shot.x, shot.y)){
                        console.log("blaster left board...");
                        blasters.vetor.splice(i, 1);
                    }
                    else{
                        for (var j = 0; j < asteroides.vetor.length; j++){
//                         console.log("im checking if blaster hits an ast...");
                            if (asteroides.vetor[j] != undefined){
//                                console.log("found an ast candidate");
                                dist = calc.distGeometrica(shot.x, shot.y,
                                                           asteroides.vetor[j].x,
                                                           asteroides.vetor[j].y);
//                                console.log("distance is: ", dist);
                                if (dist < asteroides.vetor[j].tam * 5){
//                                   console.log("acertei um ast");
                                   if (players[shot.owner] != undefined){
                                   asteroides.vetor[j].hp -= players[shot.owner].blaster.damage;
                                   blasters.vetor.splice(i, 1);
                                   if (asteroides.vetor[j].hp <= 0){
                                       asteroides.destroi(j);
                                    }
                                   }
                                }
                            }
                        }
                    }
                    if (shot != undefined){
                        for (var id in players){
                                if (id != shot.owner){
                                    var alvo = players[id];
/*
                                console.log('\033c');
                                console.log(alvo);
                                console.log(alvo.raio);
*/
                                dist = calc.distGeometrica(shot.x, shot.y,
                                                           alvo.pos.x, alvo.pos.y);
//                               console.log("distance is: ", dist);
                                if (dist < alvo.raio){
                                    turret.sofreDano(alvo, players[shot.owner].blaster.damage);
                                    console.log("acertei uma nave ");
                                    blasters.vetor.splice(i, 1);
                                    if (alvo.hull.points < 0){
                                         turret.matouNave(players[shot.owner], alvo)
                                         turret.respawnInTime(alvo, 5);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return module;
}
