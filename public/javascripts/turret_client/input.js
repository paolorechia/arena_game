module.exports = function(socket, data){
    var module = {};
    module.atualiza = function (event){
        if (event.key == 'w'){
            socket.emit('input', 'w');
        }
        if (event.key == 's'){
            socket.emit('input', 's');
        }
        if (event.key == 'd'){
            socket.emit('input', 'd');
        }
        if (event.key == 'a'){
            socket.emit('input', 'a');
        }
        if (event.key == ' '){
            socket.emit('input', ' ');
        }
        if (event.key == 'Escape'){
            socket.emit('input', 'Esc');
            data.nextState();
        }
    };
    module.atualizaMobile = function(event){
        var coord = { x: event.touches[0].clientX,
                      y: event.touches[0].clientY};
        mobile_coord.push(coord);
    };
    module.mousePress = function(status_tiro){
          data.atirou = status_tiro;
          socket.emit('tiro', data.atirou);
    };
    return module;
}
