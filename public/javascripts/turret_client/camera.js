module.exports = function(socket){
    var module = {};
    // objeto camera, contem dimensoes do canvas menor
    module.width = 0;
    module.height = 0;
        // seta tamanho do canvas menor
    module.updateResEvent = function(canvas) {
          window.addEventListener('resize', function(event) {

            //--- Para alterar a resolução mantendo a res. do jogo (buga a mira)
            //$(canvas).css('width', window.innerWidth-3)
            //$(canvas).css('height', window.innerHeight-3)
            //-------------------------
            
            canvas.width = window.innerWidth-3;
            canvas.height = window.innerHeight-3;
            module.width = window.innerWidth-3;
            module.height =  window.innerHeight-3;
            var camera = { width: module.width, height: module.height};
            socket.emit('camera', camera);

          });
    };
    module.setRes = function (width, height, canvas){
            //Atua no canvas '#canvas_turret'
            canvas.width = width;
            canvas.height = height;
            //--- Para alterar a resolução mantendo a res. do jogo (buga a mira)
            //$(canvas).css('width', window.innerWidth-3)
            //$(canvas).css('height', window.innerHeight-3)
            //-------------------------
            module.width = width;
            module.height = height;
            module.updateResEvent(canvas);


    };
    return module;
}
