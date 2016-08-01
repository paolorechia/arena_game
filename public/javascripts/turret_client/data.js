module.exports = function(stub){
    var module = {};
    module.asteroids = [];
    module.lasers = [];
    module.blasters = [];
    module.players = [];
    module.players_id = [];
    module.players_pointers = [];

    module.coord = {
        x:0,
        y:0
    };
    module.Versor = function(){
        this.x = 0;
        this.y = 0;
    }

    module.atirou = 0;
    module.my_id = 0;
    return module;
}
