module.exports = function (camera, background){
    var module = {};

    module.turret = {
        versor : new Versor(),
        versor_mobile : new Versor(),
        vetorLaser : [],
        raio : 15,
        vel : 0,
        acel: 4,
        turn_rate: 1,
        max_speed : 4,
        vx : 0,
        vy : 0,
        x : 0,
        y : 0,
        weapon_cooldown : false,
    };
        // inicializa posicao do turret
    module.inicia = function(){
            turret.x = background.width/2;
            turret.y = background.height/2;
    };
        },
        //atira o laser se a energia eh maior do que 0
        'atira' : function (){
            for (i = 0; i < players.length; i++){
                if (players_id[i] == my_id){
                    var laser = lasers[i];
                    if (laser != undefined && laser.first != undefined){
                        x0 = laser.first.x;
                        y0 = laser.first.y;
                        x1 = laser.last.x;
                        y1 = laser.last.y;
                        inimigo.desenhaLaser(x0, y0, x1, y1);
                    }
                }
            }
        },
        // atualiza status do tiro de acordo com o evento de mouse
        "atirou" : function(status_tiro){
            bool = status_tiro;
        },

        // hud
        'hud' : {
              // stats deveria estar em outro lugar...
              'stats' : {
                vida: 10,
                shield: 2,
                kills: 0,
                energy: 100,
                weapon: 'laser'
              },
              // desenha os stats na tela
              'desenhar' : function(stats) {
                ctx_turret.font = "30px Arial";
                ctx_turret.fillStyle="green";
                ctx_turret.fillText("HP: " + this.stats.vida, camera.width/22, camera.height/18)
                ctx_turret.fillText("Weapon: " + this.stats.weapon, camera.width/22, camera.height/9)
                ctx_turret.fillStyle='red';
                ctx_turret.fillText('Kills: '+ this.stats.kills, camera.width/2.2, camera.height/18)
                ctx_turret.fillStyle='blue';
                ctx_turret.fillText('SH: ' + this.stats.shield, camera.width/22, camera.height/6)
                ctx_turret.fillStyle='#1244AA';
                ctx_turret.fillText('Energy: ' + this.stats.energy, camera.width/2.3, camera.height/1.05)
              },
        },
        'trocaArmaClique' : function(){
            var button = ctx_turret.measureText("Weapon: " 
                                                    + turret.hud.stats.weapon);
            var top_side = camera.height/9 - 20;
            /*
            console.log(coord.x, coord.y);
            console.log(camera.width/22, camera.width/22 + button.width);
            console.log(camera.height/9, camera.height/7);
            */
            if (coord.x > camera.width/22 && 
                coord.x < camera.width/22 + button.width){
    //                console.log("entre os X's"); 
                    if (coord.y > top_side && coord.y < camera.height/9){
                        
                        if (!turret.weapon_cooldown){
                            turret.weapon_cooldown = true;
                        
                            setTimeout(function(){turret.weapon_cooldown = false;}, 4000);
                        
                            bool = 0;
                            socket.emit('input', ' ');   //manda um espaço para o servidor
                        }
                    }
            }
                                            //sinaliza a troca de arma
        }
             
    }
    return module;
}
