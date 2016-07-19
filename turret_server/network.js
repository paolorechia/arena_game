// handles the socket communication between server and clients

module.exports = function(io, players, ast, turret){
    var module = {};

    // setup the HTTP connection to use only websocket and deny polling
    io.set('transports', ['websocket']);

    // handles the 
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

    module.enviaTurrets = function(){
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
    module.enviaAsteroides = function(){
        io.sockets.emit('asteroides', ast.asteroides.vetor);
    //    console.log("enviando... " + ast.asteroides.vetor);
    }

    return module;
} 
