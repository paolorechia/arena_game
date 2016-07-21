// objeto de coorenadas X, Y do cursor do mouse
module.exports = function(stub){
    var module = {};
    var coord = {
        x:0,
        y:0
    };

    module.Coordenadas = function(){
        this.x;
        this.y;
    }
    module.Versor = function(){
        this.x = 0;
        this.y = 0;
    }
    module.laserVersor= function(turret){
            // pega coordenadas e desloca origem para o centro
            
            var x = turret.cursor.x - turret.pos.x;
            var y = turret.cursor.y - turret.pos.y;

            // calcula modulo do vetor (x,y)
            var mod = Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
            var a = 1 / mod;

            // calcula versor
            turret.laser.versor.x = x * a;
            turret.laser.versor.y = y * a;
    }
    module.distGeometrica = function(x0, y0, x1, y1){
            var x = Math.pow((x0 - x1), 2);
            var y = Math.pow((y0 - y1), 2);
            return Math.sqrt(x + y);
    }

    return module;
}
    // funcao para pegar as coordenadas do mouse
    // atualiza coord.x e coord.y
    function pegaCoordenadas(event){
        coord.x = event.clientX;
        coord.x -= c_turret.offsetLeft;
        coord.x += turret.x - camera.width/2;
        coord.y = event.clientY;
        coord.y -= c_turret.offsetTop;
        coord.y += turret.y - camera.height/2;
    //    return coord;
    }

    // imprimir coordenadas pro console
    function logCoordenadas(){
        var x = coord.x.toString();
        var y = coord.y.toString();
        var string = "x = ";
        string = string.concat(x);
        string = string.concat("; y = ");
        string = string.concat(y);
        console.log(string);
    }
