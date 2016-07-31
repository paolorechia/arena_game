module.exports = function(stub){
    var module = {};
    module.asteroids = [];
    module.coord = {
        x:0,
        y:0
    };
    module.Versor = function(){
        this.x = 0;
        this.y = 0;
    }
    return module;
}
