// handles the socket communication between server and clients

module.exports = function(io, players, asteroides, turret, update, blasters, camera){
    var module = {};

    // setup the HTTP connection to use only websocket and deny polling
    io.set('transports', ['websocket']);

    // handles the 
    io.on('connection', function(socket){
        players[socket.id] = turret.cria();
        socket.emit('myid', socket.id);
        console.log(socket.id + " has connected");
        socket.on('input', function(key){
        //    console.log("recebi input: " + key);
            turret.processaInput(key, socket.id, players);
        });
        socket.on('inputmobile', function(direcao_mobile){
            //console.log(direcao_mobile);
            turret.processaInputMobile(direcao_mobile, socket.id, players);
        });
        socket.on('disconnect', function(){
            console.log(socket.id + " has disconnected");
            delete players[socket.id];
            console.log(players);

        });
        socket.on('myid', function(id){
            console.log("find an use for myid socket.on or delete it");
        });
        socket.on('camera', function(camera){
            console.log(camera);
            players[socket.id].camera = camera;
            console.log(players[socket.id].camera);
        });
        socket.on('coord', function(coord){
            var nave = players[socket.id];
            players[socket.id].cursor.x = coord.x;
            players[socket.id].cursor.y = coord.y; 
//           console.log(players[socket.id].cursor);
        });
        socket.on('tiro', function(atirou){
//            console.log(atirou);
            turret.atira(players[socket.id], atirou);
            if (atirou == 1){
                console.log("TAC TACC TAC");
            }
        });
            
        console.log(players);
    });

    module.enviaTurrets = function(){
        var players_positions = [];
        var players_id = [];
        var players_pointers = [];
        var aux;
        var j = 0;
        // monta vetor de posicoes
        // e manda a posicao do jogador para ele mesmo 
        for (var id in io.sockets.connected){
            players_positions[j] = players[id].pos;
            players_id[j] = id;
            players_pointers[j] = players[id].cursor
            var socket = io.sockets.connected[id];
            socket.emit('movimento', players_positions[j]);
            j++;
        }
        // manda a posicao dos jogadores
        io.sockets.emit('players', players_positions);
        io.sockets.emit('players_id', players_id);
        io.sockets.emit('players_pointers', players_pointers);
    }
    module.enviaAsteroides = function(){
        io.sockets.emit('asteroides', asteroides.vetor);
    //    console.log("enviando... " + asteroides.vetor);
    }
    module.enviaBlasters = function(){
        io.sockets.emit('blasters', blasters.vetor);
    }
    module.enviaLasers = function (){
        var lasers = [];
        for (var id in io.sockets.connected){
            var first = players[id].laser.vetor[0];
            var hit = players[id].laser.hit;
            if (hit){
                var first = players[id].laser.vetor[0];
                var j = players[id].laser.hitnumber;
                var last = players[id].laser.vetor[j];
            }
            else{
                var range = players[id].laser.range;
                var last = players[id].laser.vetor[range-1];
            }     
            lasers.push({first, last, hit}); 
    }
                
  //          console.log("sending lasers... ", lasers); 
            io.sockets.emit('lasers', lasers);
    }
    module.enviaStatus = function (){
        for (var id in io.sockets.connected){
            var estado = {hp:           players[id].hull.points,
                          shield:       players[id].shield.points, 
                          energy:       players[id].energy.points,
                          ast_kills:    players[id].ast_kills,
                          player_kills: players[id].player_kills,
                          weapon:       players[id].arma_atual};
            socket = io.sockets.connected[id];
            socket.emit('status', estado); 
        }  
    }
    return module;
}
