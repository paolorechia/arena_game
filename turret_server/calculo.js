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
    module.versorArma= function(turret){
            // pega coordenadas e desloca origem para o centro
            
            var x = turret.cursor.x - turret.pos.x;
            var y = turret.cursor.y - turret.pos.y;

            // calcula modulo do vetor (x,y)
            var mod = Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
            var a = 1 / mod;

            // calcula versor
            versor = new module.Versor;
            versor.x = x * a;
            versor.y = y * a;
            return versor;
    }
    module.distGeometrica = function(x0, y0, x1, y1){
            var x = Math.pow((x0 - x1), 2);
            var y = Math.pow((y0 - y1), 2);
            return Math.sqrt(x + y);
    }

    return module;
}
