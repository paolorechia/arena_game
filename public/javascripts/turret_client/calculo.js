module.exports = function(camera, data, ship){
    var module = {};

    // objeto de coorenadas X, Y do cursor do mouse
    // imprimir data.coordenadas pro console
    module.logCoordenadas= function(){
        var x = data.coord.x.toString();
        var y = data.coord.y.toString();
        var string = "x = ";
        string = string.concat(x);
        string = string.concat("; y = ");
        string = string.concat(y);
        console.log(string);
    };
    module.versor = function (v){
        // pega data.coordenadas e desloca origem para o centro
        var x = data.coord.x - ship.x;
        var y = data.coord.y - ship.y;

        // calcula modulo do vetor (x,y)
        var mod = Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
        var a = 1 / mod;

        // calcula versor
        v.x = x * a;
        v.y = y * a;
    };
    module.versor_mobile = function (v){
        var len = mobile_data.coord.length;
        var x = mobile_data.coord[len-1].x - mobile_data.coord[0].x;
        var y = mobile_data.coord[len-1].y - mobile_data.coord[0].y;

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
    module.anguloGiro = function (ship, cursor){

        var cx = cursor.x + ship.x - camera.width/2;
        var cy = cursor.y + ship.y - camera.height/2;

        var ca = (ship.x - cx);
        var co = (ship.y - cy);

        tangente = (co/ca);
        atan = Math.round(Math.atan(tangente)*100)/100;

        deg = atan * 180/3.14;
     // console.log(deg);
        //Falta tratar quando cursor = background.height
        if(cx > ship.x) {
            if(cy >= ship.y) {
    //            console.log('DireitaBaixo');
            } else if(cx < ship.x){
    //            console.log('DireitaCima');
            }
        } else {
            atan+=4*180/3.14;
            if(cy >= ship.y) {
    //            console.log('EsquerdaBaixo');
            } else {
    //           console.log('EsquerdaCima');
            }
        }
        //console.log(ship);
        return atan;
    };

    return module;
}
