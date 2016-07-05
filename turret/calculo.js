// obj coorenadas X, Y
var coord = {
    x:0,
    y:0
}

// funcao para pegar as coordenadas do mouse
function pegaCoordenadas(event){
    coord.x = event.clientX;
    coord.x -= c.offsetLeft;
    coord.y = event.clientY;
    coord.y -= c.offsetTop;
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


function Versor(){
    this.x = 0;
    this.y = 0;
}

var calculo = {
    versor : function (v){
        // pega coordenadas e desloca origem para o centro
        var x = coord.x - turret.x;
        var y = coord.y - turret.y;

        // calcula modulo do vetor (x,y)
        var mod = Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
        var a = 1 / mod;

        // calcula versor
        v.x = x * a;
        v.y = y * a;
    },
    distGeometrica : function (x0, y0, x1, y1){
        var x = Math.pow((x0 - x1), 2);
        var y = Math.pow((y0 - y1), 2);
        return Math.sqrt(x + y);
    }
}
