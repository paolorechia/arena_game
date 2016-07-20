// main loop of server-side game
module.exports = function(io){
    var module = {};

    var height=3000;
    var width=5000;

    var calc = require('./calculo.js');
    var turret = require ('./turret.js')(height,width, calc);
    var ast = require('./asteroides.js')(height,width, calc);
    var players = {};
    var net = require('./network.js')(io, players, ast, turret)
    var update = require('./update.js')(players, ast);

    var i = 0;
    // loop principal (infinito)
    module.start = function(){
        i++;

        if (i % 10 == 0){
            if (ast.asteroides.vetor.length < 40){
                ast.asteroides.cria();
            }
        }
        if (i % 10 == 0){
            update.asteroides();
            update.turrets();
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
