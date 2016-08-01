module.exports = function(stub){
    var module = {};
    module.Shot = function(x, y, speed, versor, duration){
        this.x = x;
        this.y = y;
        this.speed=  speed;
        this.versor = versor;
        this.duration = duration;
        this.hit = false;
    }
    module.vetor=[];
    return module;
}
