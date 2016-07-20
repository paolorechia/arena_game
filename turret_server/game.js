// main loop of server-side game
module.exports = function(io){
    var module = {};

    var camera = {
        height : 900,
        width : 1600,
    };
    var height = 3000;
    var width = 5000;
    var background = {
        height: 3000,
        width : 5000,
        borda_superior: height - camera.height,
        borda_inferior: camera.height,
        borda_esquerda: camera.width,
        borda_direita:  width  - camera.width,
    };
    console.log(camera);
    console.log(background);
    var calc = require('./calculo.js');
    var turret = require ('./turret.js')(background, camera, calc);
    var ast = require('./asteroides.js')(background, calc);
    var players = {};
    var net = require('./network.js')(io, players, ast, turret)
    var update = require('./update.js')(players, ast);
    var colisoes = require('./colisoes.js')(ast, background, camera, players, calc);

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
            colisoes.borda();
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
