// main loop of server-side game
module.exports = function(io){
    var module = {};

    var height=3000;
    var width=5000;

    var calc = require('./calculo.js');
    var turret = require ('./turret.js')(height,width, calc);
    var ast = require('./asteroides.js')(height,width, calc);
    var players = {length : 0};
    var net = require('./network.js')(io, players, ast, turret)
    function atualizaTurrets(){
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
    /*
            socket = io.sockets.connected[player[i].id];
            turret.atualiza(players[i].turret.pos);
    */
        }
    }


    var i = 0;
    // loop principal (infinito)
    module.start = function(){
        i++;
    /*
        if (i % 10000 == 0){
            console.log('\033c');
            console.log("----------------------");
            console.log("A thousand thousands ticks tick!");
            console.log(players);
            console.log("----------------------");
        }
    */
        if (i % 10 == 0){
            if (ast.asteroides.vetor.length < 40){
    //            console.log("criei..." + ast.asteroides.vetor[ast.asteroides.vetor.length - 1]);
                ast.asteroides.cria();
    //            console.log(ast.asteroides.vetor);
            }
        }
        if (i % 10 == 0){
            ast.asteroides.atualiza();
            atualizaTurrets();
            io.sockets.emit('message', i);
        }

        if (i % 20 == 0){
            net.enviaTurrets();
            net.enviaAsteroides();
        }

        setTimeout(module.start, 1);
    };
    return module;
}
