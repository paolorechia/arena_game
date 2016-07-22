module.exports = function(stub){
    var module = {};
    module.Shot = function(x, y, speed, size, versor){
        this.x = x;
        this.y = y;
        this.speed=  speed;
        this.size = size;
        this.versor = versor;
    }
    module.vetor=[];
    return module;
}
