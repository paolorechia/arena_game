module.exports = function (camera, background, data){
    var module = {};

    module.turret = {
        versor : new data.Versor(),
        versor_mobile : new data.Versor(),
        vetorLaser : [],
        raio : 15,
        vel : 0,
        acel: 4,
        turn_rate: 1,
        max_speed : 4,
        vx : 0,
        vy : 0,
        x : 0,
        y : 0,
        vida: 10,
        shield: 2,
        kills: 0,
        energy: 100,
        weapon: 'laser',
        weapon_cooldown : false,
    };
        // inicializa posicao do turret
    module.inicia = function(){
            module.x = background.width/2;
            module.y = background.height/2;
    };
        // atualiza status do tiro de acordo com o evento de mouse
    module.atirou = function(status_tiro){
            bool = status_tiro;
    };
    // blit_turret -> 1. corta o module gigantesco na posicao certa;
    // 2. desenha ele na tela
    return module;
}

