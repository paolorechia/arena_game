module.exports = function (camera, background, data){
    var module = {};

    module.versor = new data.Versor(),
    module.versor_mobile = new data.Versor(),
    module.raio = 15,
    module.vel = 0,
    module.acel= 4,
    module.x = 0,
    module.y = 0,
    module.vida= 10,
    module.shield= 2,
    module.kills= 0,
    module.energy= 100,
    module.weapon= 'laser',
    module.weapon_cooldown = false,
        // inicializa posicao do ship
    module.inicia = function(){
            module.x = background.width/2;
            module.y = background.height/2;
            
    };
    return module;
}

