// main loop of server-side game
module.exports = function(io){
    var module = {};
    var background = {
        height : 0,
        width : 0,
    }
    var height=3000;
    var width=5000;

    var calc = require('./calculo.js');
    var turret = require ('./turret.js')(height,width, calc);
    var ast = require('./asteroides.js')(height,width, calc);

    io.set('transports', ['websocket']);
    var players = {length : 0};
    io.on('connection', function(socket){
        players[socket.id] = turret.cria();
        players.length++;
        socket.emit('myid', socket.id);
        console.log(socket.id + " has connected");
        socket.on('direcao', function(key){
            console.log("recebi direcao: " + key);
            turret.atualizaDirecao(key, socket.id, players);
            socket.emit('direcao', (key));
        });
        socket.on('disconnect', function(){
            console.log(socket.id + " has disconnected");
            delete players[socket.id];
            players.length--;
            console.log(players);

        });
        socket.on('myid', function(id){
            console.log(players.length);
        });
        console.log(players);
    });

    console.log(background);
    var i = 0;
    var j = 0;
    function enviaAsteroides(){
        io.sockets.emit('asteroides', ast.asteroides.vetor);
    //    console.log("enviando... " + ast.asteroides.vetor);
    }

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


    // algoritmo horrível, repensar de um jeito mais eficiente
    function enviaTurrets(){
        var players_positions = [];
        var players_id = [];
        var aux;
        var j = 0;
        // monta vetor de posicoes
        // e manda a posicao do jogador para ele mesmo 
        for (var id in io.sockets.connected){
            players_positions[j] = players[id].pos;
            players_id[j] = id;
            var socket = io.sockets.connected[id];
            socket.emit('movimento', players_positions[j]);
            j++;
        }
        // manda a posicao dos outros jogadores
            io.sockets.emit('players', players_positions);
    }


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
            enviaTurrets();
            enviaAsteroides();
        }

        setTimeout(module.start, 1);
    };
    return module;
}
