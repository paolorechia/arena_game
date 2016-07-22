// turret.versor do canhao
// pseudo-classe
module.exports = function(background, camera, calc){
    var module = {};
    module.Laser = function (){
        this.atirando = 0;
        this.versor = new calc.Versor();
        this.vetor = []; 
        this.range = 14;
        this.damage = 5;
        this.cost = 1;
    }
    module.Blaster = function(){
        this.on_cooldown = false;
        this.atirando = 0;
        this.versor = new calc.Versor();
        this.vetor = [];
        this.damage = 10;
        this.speed = 20;
        this.duration = 2;
        this.cost = 5;
        this.cooldown_time = 50; // time between shots, AKA rate of fire
    }
    module.Shield = function(){
        this.up = true;
        this.points;
        this.max= 20;
        this.recharge_rate = 1;
        this.cooldown = 3;
    }
    module.Energy = function(){
        this.overheat = false;
        this.points;
        this.max= 100;
        this.recharge_rate = 2;
        this.overheat_threshold = 10;
        this.overheat_cooldown = 3;
    }
    module.Hull = function(){
        this.max = 100;
        this.points;
        this.resistance = 0;
    }
    
    module.Turret = function (x, y){
        this.versor = new calc.Versor();
        this.pos = new calc.Coordenadas();
        this.cursor = new calc.Coordenadas();
        this.laser = new module.Laser();
        this.blaster = new module.Blaster();
        this.shield = new module.Shield();
        this.energy = new module.Energy();
        this.hull = new module.Hull();
        this.armas = ["laser", "blaster"]
        this.arma_atual ="laser";
        this.raio = 15;
        this.vel = 0;
        this.acel= 4;
        this.turn_rate= 1;
        this.max_speed = 4;
        this.ast_kills = 0;
        this.player_kills = 0;
    }
    module.blasterResetCooldown = function (blaster){
            blaster.on_cooldown = false;
    }
    module.blasterSetCooldown = function(blaster){
            blaster.on_cooldown = true;
            setTimeout(function(){module.blasterResetCooldown(blaster);}, blaster.cooldown_time);
    }
    module.cria = function (){
        var turret = new module.Turret();
        // Math.random() * (max - min) + min
        turret.hull.points = turret.hull.max;
        turret.shield.points = turret.shield.max;
        turret.energy.points = turret.energy.max;
        turret.pos.x = Math.floor(Math.random() * (background.borda_direita - background.borda_esquerda) + background.borda_esquerda);
        turret.pos.y = Math.floor(Math.random() * (background.borda_superior - background.borda_inferior) + background.borda_inferior);
        return turret;
    }
    module.rechargeShield = function (turret){
        if (turret.shield.points <= turret.shield.max && 
            turret.shield.up == true)
            turret.shield.points += turret.shield.recharge_rate;
    };
    module.disableShield = function (turret){
        turret.shield.up = false;
        module.restartShield(turret);
    }
    module.restartShield = function (turret){
        setTimeout(function(){turret.shield.up = true;},
                   turret.shield.cooldown * 1000);
    }
    module.sofreDano = function(turret, dano){
        if (turret.shield.points > 0){
            if (dano > turret.shield.points){
                dano = dano - turret.shield.points;
                turret.shield.points = 0;
                module.disableShield(turret);
                
                turret.hull.points -= dano;
            }
            else
                turret.shield.points -= dano; 
        }
        else {
            turret.hull.points -= dano;
        }
    }
    module.rechargeEnergy = function (turret){
        if (turret.energy.points < turret.energy.max)
            turret.energy.points += turret.energy.recharge_rate;
        if (turret.energy.points >= turret.energy.max)
            turret.energy.points = turret.energy.max;
    };
    module.cooldownEnergy = function (turret){
        turret.energy.overheat = false;
    }
    module.overheatEnergy = function (turret){
        if (turret.energy.points < turret.energy.overheat_threshold){
            turret.energy.overheat = true;
            setTimeout(function(){module.cooldownEnergy(turret);},
                   turret.energy.overheat_cooldown * 1000);
        }
    };
    module.trocaArma = function(nave){
        var i = nave.armas.indexOf(nave.arma_atual);
        i = (i + 1) % (nave.armas.length);
        nave.arma_atual = nave.armas[i];
        console.log("troquei! agora uso: ", nave.arma_atual);
    }
    module.atira = function (nave, atirou){
        if (nave.arma_atual == "laser")
            nave.laser.atirando = atirou;
        else if (nave.arma_atual =="blaster")
            nave.blaster.atirando = atirou;
        else
            console.log("arma invalida!! le bugz");
    }
    module.morte = function (turret){
        turret.pos.x = -1600;
        turret.pos.y = -900;
        
    }
    module.respawn = function (turret){
        turret.ast_kills = 0;
        turret.player_kills = 0;
        turret.hull.points = turret.hull.max;
        turret.shield.points = turret.shield.max;
        turret.energy.points = turret.energy.max;
        turret.pos.x = Math.floor(Math.random() * (background.borda_direita - background.borda_esquerda) + background.borda_esquerda);
        turret.pos.y = Math.floor(Math.random() * (background.borda_superior - background.borda_inferior) + background.borda_inferior);
    }
    module.respawnInTime = function(turret, time){
        time = time * 1000;
        setTimeout(function(){module.respawn(turret);}, time);
    }
    module.matouNave = function (turret, alvo){
        turret.player_kills++;
        module.morte(alvo);
    }
    module.para = function(){
                this.vel = 0;
                this.versor.x= 0;
                this.versor.y= 0;
    }
    module.processaInput= function (key, id, players){
           var turret = players[id];
//           console.log(turret);
           if (key == 'w'){
                if (turret.versor.y > -1)
                    turret.versor.y = (turret.versor.y - turret.turn_rate);
                turret.vel += turret.acel;
            }
            if (key == 's'){
                if (turret.versor.y < 1)
                    turret.versor.y = (turret.versor.y + turret.turn_rate);
                turret.vel += turret.acel;
            }
            if (key == 'd'){
                if (turret.versor.x < 1)
                {
                    turret.versor.x = (turret.versor.x + turret.turn_rate);
                }
                turret.vel += turret.acel;
            }
            if (key == 'a'){
                if (turret.versor.x > -1){
                    turret.versor.x = (turret.versor.x - turret.turn_rate);
                }
                turret.vel += turret.acel;
            }
            if (key == ' '){
                module.trocaArma(turret);
            }
    }

    return module;
};
