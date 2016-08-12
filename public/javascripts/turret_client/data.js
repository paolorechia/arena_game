module.exports = function(stub){
    var module = {};
    module.asteroids = [];
    module.lasers = [];
    module.blasters = [];
    module.players = [];
    module.players_id = [];
    module.players_pointers = [];
    module.gameStates= ["playing", "lobby", "menu"];
    module.gameState = module.gameStates[0];
    module.nextState = function(){
        if(module.gameState == module.gameStates[0])
        {
            module.gameState = module.gameStates[2];
        }
        else
            module.gameState = module.gameStates[0];
        console.log("trying to change State... " + module.gameState);
    }

    module.coord = {
        x:0,
        y:0
    };
    module.Versor = function(){
        this.x = 0;
        this.y = 0;
    }

    module.atirando = 0;
    module.atirou = false;
    module.clicou = false;
    module.my_id = 0;
    module.resetClick = function(){
        module.clicou = false;
    }
    return module;
}
