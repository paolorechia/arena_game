// turret.versor do canhao
// pseudo-classe
module.exports = function(height, width, calc){
    var module = {};
    module.Laser = function (x, y){
        this.x;
        this.y;
    }
    module.Pos = function(){
        this.x;
        this.y;
    }
    module.Turret = function (x, y){
        this.versor = new calc.Versor();
        this.pos = new module.Pos();
        this.vetorLaser = [];
        this.raio = 15;
        this.vel = 0;
        this.acel= 4;
        this.turn_rate= 1;
        this.max_speed = 4;
    }
    module.cria = function (){
        var turret = new module.Turret();
        turret.pos.x = Math.floor((Math.random() * width)/2);
        turret.pos.y = Math.floor((Math.random() * height)/2);
        return turret;
    }
    module.para = function(){
                this.vel = 0;
                this.versor.x= 0;
                this.versor.y= 0;
    }
    module.atualizaDirecao = function (key, id, players){
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
    }

    return module;
};
        
var inutil = {
        // atualiza o angulo utilizando trigonometria
        // a partir das coordenadas do cursor do mouse
        // e chama a função de desenhar o turret
        'gira' : function (){

            var ca = (turret.x - coord.x);
            var co = (turret.y - coord.y);

            tangente = (co/ca);
            atan = Math.round(Math.atan(tangente)*100)/100;

            deg = atan * 180/3.14;
            // console.log(deg);
            //Falta tratar quando coord = background.height
            if(coord.x > turret.x) {
                if(coord.y >= turret.y) {
        //            console.log('DireitaBaixo');
                } else if(coord.x < turret.x){
        //            console.log('DireitaCima');
                }
            } else {
                atan+=4*180/3.14;
                if(coord.y >= turret.y) {
        //            console.log('EsquerdaBaixo');
                } else {
        //           console.log('EsquerdaCima');
                }
            }
        },
        //atira o laser se a energia eh maior do que 0
        'atira' : function (){

            // confere se a energia eh adequada
            // e se nao estah em tempo de recarga
            if(this.hud.stats.energy <= 1) {
              this.hud.cooldown_time = true;
              bool = 0;
            }

            if(this.hud.stats.energy >= 20 && this.hud.cooldown_time ==true) {
              this.hud.cooldown_time = false;
            }

            if (this.hud.cooldown_time) {
              return;
            }

            this.hud.descarregar_energia(1);

            if(bool == 0)
              return;

            // se tudo estiver ok, atira
            var tam = 14;
            var base = 2;
            var x0 = turret.x + turret.versor.x * turret.raio * base;
            var x1 = turret.x + turret.versor.x * turret.raio * (tam + base);
            var y0 = turret.y + turret.versor.y * turret.raio * base;
            var y1 = turret.y + turret.versor.y * turret.raio * (tam + base);
            var i;
            // cria um vetor de coordenadas para testar nas colisoes
            for (i = 0; i< tam; i++){
                turret.vetorLaser[i] = new Laser(0,0);
                turret.vetorLaser[i].x = (x0 + turret.versor.x * turret.raio * i);
                turret.vetorLaser[i].y = (y0 + turret.versor.y * turret.raio * i);
            }
            // e passa coordenadas adaptadas pro canvas menor pra funcao de desenhar
            var x = camera.width/2;
            var y = camera.height/2;
            x0 = x + turret.versor.x * turret.raio * base;
            x1 = x + turret.versor.x * turret.raio * (tam + base);
            y0 = y + turret.versor.y * turret.raio * base;
            y1 = y + turret.versor.y * turret.raio * (tam + base);
            turret.desenhaLaser(x0, y0, x1, y1);
        },

        // atualiza status do tiro de acordo com o evento de mouse
        "atirou" : function(status_tiro){
          bool = status_tiro;
        },

        // hud
         'hud' : {
          // stats deveria estar em outro lugar...
          'stats' : {
            vida: 10,
            shield: 2,
            kills: 0,
            energy: 100
          },
          // desenha os stats na tela
          'desenhar' : function(stats) {
            ctx_turret.font = "30px Arial";
            ctx_turret.fillStyle="green";
            ctx_turret.fillText("HP: " + this.stats.vida, camera.width/22, camera.height/18)
            ctx_turret.fillStyle='red';
            ctx_turret.fillText('Kills: '+ this.stats.kills, camera.width/2.2, camera.height/18)
            ctx_turret.fillStyle='blue';
            ctx_turret.fillText('SH: ' + this.stats.shield, camera.width/22, camera.height/9)
            ctx_turret.fillStyle='#1244AA';
            ctx_turret.fillText('Energy: ' + this.stats.energy, camera.width/2.3, camera.height/1.05)
            this.passivos();
          },
          // funcoes abaixo nao sei como funcionam, nao li ainda
          // mas parece que deveriam fazer parte do turret e nao do hud
          carregar_energia : function(rate) {
            var min_energy = 0;
            var max_energy = 100;
            var that = this;
            if(that.stats.energy >= min_energy && that.stats.energy < max_energy) {
                if(that.prevent_energy == true) {
                  that.prevent_energy = false;
                  //setTimeout workaround

                  window.setTimeout(function(){
                    that.stats.energy+=1*rate;
                    that.prevent_energy = true;
                  }, 100);
                }
            }

          },
          descarregar_energia : function(rate) {
            var max_energy = 100;
            var min_energy = 0;
            if(this.stats.energy > min_energy) {
              this.stats.energy -= 1*rate;
            } else {
                //bloqueia Laser até chegar em x% energia.

            }
          },
          carregar_shield : function(rate){
            var max_shield = 2;
            var min_shield = 0;
            var that = this;

            if(that.stats.shield >= min_shield && that.stats.shield < max_shield) {
                if(that.prevent_shield == true) {
                  that.prevent_shield = false;

                  window.setTimeout(function(){
                    that.stats.shield+=1*rate;
                    that.prevent_shield = true;

                  },5000);
                }
            }
          },
          descarregar_shield : function(quantidade) {
            var max_shield = 3;
            var min_shield = 0;
            if(this.stats.shield <= max_shield && this.stats.shield > min_shield) {
              this.stats.shield -= quantidade;
            }

          },
          descarregar_vida : function(quantidade){
            this.stats.vida -= quantidade;
          },
          tomar_dano : function(quantidade) {
            if(quantidade <= this.stats.shield) {
              this.descarregar_shield(quantidade);
            } else {
              this.descarregar_vida(quantidade - this.stats.shield);
              this.descarregar_shield(this.stats.shield);
            }
          },
          passivos : function() {

            this.carregar_shield(1);
            this.carregar_energia(1);

          },
          prevent_shield : true,
          prevent_energy : true,
          cooldown_time : false
        }
    }
