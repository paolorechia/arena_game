module.exports = function(stub){
    var module = {};

    // objeto de coorenadas X, Y do cursor do mouse
    // imprimir coordenadas pro console
    module.logCoordenadas= function(){
        var x = coord.x.toString();
        var y = coord.y.toString();
        var string = "x = ";
        string = string.concat(x);
        string = string.concat("; y = ");
        string = string.concat(y);
        console.log(string);
    };
    module.versor = function (v){
        // pega coordenadas e desloca origem para o centro
        var x = coord.x - turret.x;
        var y = coord.y - turret.y;

        // calcula modulo do vetor (x,y)
        var mod = Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
        var a = 1 / mod;

        // calcula versor
        v.x = x * a;
        v.y = y * a;
    };
    module.versor_mobile = function (v){
        var len = mobile_coord.length;
        var x = mobile_coord[len-1].x - mobile_coord[0].x;
        var y = mobile_coord[len-1].y - mobile_coord[0].y;

        var mod = Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
        var a = 1 / mod;
        v.x = x * a;
        v.y = y * a;
    };
    module.distGeometrica = function (x0, y0, x1, y1){
        var x = Math.pow((x0 - x1), 2);
        var y = Math.pow((y0 - y1), 2);
        return Math.sqrt(x + y);
    };
    return module;
}
