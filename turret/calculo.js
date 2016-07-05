
function Versor(){
    this.x = 0;
    this.y = 0;
}

// versor do canhao
var versor = new Versor();

var calculo = {
    versor : function (v){
        // pega coordenadas e desloca origem para o centro
        var x = coord.x - background.width/2;
        var y = coord.y - background.height/2;

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
