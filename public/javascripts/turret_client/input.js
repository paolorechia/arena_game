module.exports = function(socket, data, c_ship){
    var module = {};
    // funcoes de evento
    function pegaCoordenadas(event){
        data.coord.x = event.clientX;
        data.coord.y = event.clientY;
        socket.emit('coord', data.coord);
    }
    function pegaCoordenadasMobile(event){
        data.coord.x = event.touches[0].clientX;
        data.coord.y = event.touches[0].clientY;
        socket.emit('coord', data.coord);
    }
    /* conjunto de eventos lidos a partir do mouse e do teclado,
    na falta de um lugar melhor ainda estao aqui
    A cada escuta de evento é associada uma acao + uma funcao
    */



    //Nova forma de controlar o evento ---------------------------------------------
    /*
    var mousemove = document.createEvent('Event');
    mousemove.initEvent('mousemove', true, true);
    c_ship.addEventListener('mousemove', function(e) {
      pegaCoordenadas(e);
    }, false)
    */


    var mobile_coord = [];
    //------------------------------------------------------------------------------
    c_ship.addEventListener("touchstart", pegaCoordenadasMobile, false);
    c_ship.addEventListener("touchstart", function(){ atirou(1); 
                                                       sound.currentTime = 0.07;
                                                       sound.play();},
                                                       false);
    c_ship.addEventListener("touchend", function(){ atirou(0)}, false);
    //c_ship.addEventListener("touchmove", pegaCoordenadasMobile, false);
    c_ship.addEventListener("touchmove", input.atualizaMobile, false);
    c_ship.addEventListener("mousemove", pegaCoordenadas, false);
    c_ship.addEventListener("mousedown", function(){ input.mousePress(1); 
                                                       sound.currentTime = 0.07;
                                                       sound.play();},
                                                       false);
    c_ship.addEventListener("mouseup", function(){ input.mousePress(0)}, false);
    window.addEventListener("keydown", function(event){ input.atualiza(event)}, false);

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
    /* retirado do codigo principal, repensar caso suporte ao mobile
     * for necessario
    if (tempo % 10 == 0){
//        socket.emit('inputmobile', mobile_data.coord.length);
//        socket.emit('inputmobile', mobile_data.coord);
        if (mobile_coord != undefined && mobile_coord[0] != undefined){
            calculo.versor_mobile(ship.versor_mobile);
            socket.emit('inputmobile', ship.versor_mobile);
            mobile_coord = [];
        }
    */
    return module;
}
