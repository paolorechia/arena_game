// handles the socket communication between server and clients

module.exports = function(io, players, asteroides, turret, update){
    var module = {};

    // setup the HTTP connection to use only websocket and deny polling
    io.set('transports', ['websocket']);

    // handles the 
    io.on('connection', function(socket){
        players[socket.id] = turret.cria();
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
            console.log(players);

        });
        socket.on('myid', function(id){
            console.log("find an use for myid socket.on or delete it");
        });
        socket.on('coord', function(coord){
            players[socket.id].cursor.x = coord.x; 
            players[socket.id].cursor.y = coord.y; 
        });
        socket.on('tiro', function(atirou){
//            console.log(atirou);
            players[socket.id].laser.atirando = atirou;
            update.laser(players[socket.id]);
            if (atirou == 1){
                console.log("TAC TACC TAC");
            }
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
        // manda a posicao dos jogadores
        io.sockets.emit('players', players_positions);
        io.sockets.emit('players_id', players_id);
    }
    module.enviaAsteroides = function(){
        io.sockets.emit('asteroides', asteroides.vetor);
    //    console.log("enviando... " + asteroides.vetor);
    }
    return module;
} 
