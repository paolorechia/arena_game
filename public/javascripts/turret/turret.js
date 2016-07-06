// turret.versor do canhao
function Laser(x, y){
    this.x;
    this.y;
}



var turret = {
    versor : new Versor(),
    vetorLaser : [],
    raio : 15,
    x : background.width/2,
    y : background.height/2,
    vel : 0,
    acel: 4,
    turn_rate: 1,
    max_speed : 4,
    vx : 0,
    vy : 0,
    
    'atualizaDirecao' : function (event){
        if (event.key == 'w'){
            if (turret.vy > -1)
                turret.vy = (turret.vy - turret.turn_rate);
            turret.vel += turret.acel;
        }
        if (event.key == 's'){
            if (turret.vy < 1)
                turret.vy = (turret.vy + turret.turn_rate);
            turret.vel += turret.acel;
        }
        if (event.key == 'd'){
            if (turret.vx < 1)
            {
                turret.vx = (turret.vx + turret.turn_rate);
            }
            turret.vel += turret.acel;
        }
        if (event.key == 'a'){
            if (turret.vx > -1){ 
                turret.vx = (turret.vx - turret.turn_rate);
            }
            turret.vel += turret.acel;
        }
    },
    'move' : function(){
        if (turret.vel >= turret.max_speed){
            turret.vel = turret.max_speed;
        }
        if (turret.vel > 0){
            turret.x += turret.vx * turret.vel;
            turret.y += turret.vy * turret.vel;
        }
        if (turret.vel <= 0){
            turret.para();
        }
    },
    'para' : function(){
            turret.vel = 0;
            turret.vx = 0;
            turret.vy = 0;
    },
    'desenhaCanhao' : function (ctx, raio, angulo){
        var x = 800/2;
        var y = 600/2;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angulo);
        ctx.moveTo(0, 0)
        ctx.lineWidth = raio * 0.2;
        ctx.lineTo(raio * 2, 0);
        ctx.stroke();
        ctx.restore();
    },

    'desenha' : function (ctx, raio, angulo){
        var x = 800/2;
        var y = 600/2;
        ctx.strokeStyle = "#f0470e";
        ctx.beginPath();
        ctx.arc(x, y, raio, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fillStyle = "#005252";
        ctx.fill();
        turret.desenhaCanhao(ctx, raio, angulo);
        //Se tem shield, desenha o shield----------
        if(this.hud.stats.shield > 0) {
          ctx.strokeStyle = "#1244AA";
          ctx.beginPath();
          ctx.arc(x, y, raio*1.3, 0, 2*Math.PI);
          ctx.stroke();
        }
    },

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
        turret.desenha(ctx_turret, turret.raio, atan);
    },
    'desenhaLaser' : function(x0, y0, x1, y1){
        ctx_turret.beginPath();
        ctx_turret.moveTo(x0,y0);
        ctx_turret.lineWidth=turret.raio*0.2;
        ctx_turret.strokeStyle="#00FF00";
        ctx_turret.lineTo(x1, y1);
        ctx_turret.stroke();
    },
    'atira' : function (){

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

        // desenha linha usando turret.versor (apenas para ilustrar)
        this.hud.descarregar_energia(1);

        if(bool == 0)
          return;

    //    console.log("atirei");
        var tam = 14;
        var base = 2;
        var x0 = turret.x + turret.versor.x * turret.raio * base;
        var x1 = turret.x + turret.versor.x * turret.raio * (tam + base);
        var y0 = turret.y + turret.versor.y * turret.raio * base;
        var y1 = turret.y + turret.versor.y * turret.raio * (tam + base);
        var i;
        for (i = 0; i< tam; i++){
            turret.vetorLaser[i] = new Laser(0,0);
            turret.vetorLaser[i].x = (x0 + turret.versor.x * turret.raio * i);
            turret.vetorLaser[i].y = (y0 + turret.versor.y * turret.raio * i);
        }
        var x = 400;
        var y = 300;
        x0 = x + turret.versor.x * turret.raio * base;
        x1 = x + turret.versor.x * turret.raio * (tam + base);
        y0 = y + turret.versor.y * turret.raio * base;
        y1 = y + turret.versor.y * turret.raio * (tam + base);
        turret.desenhaLaser(x0, y0, x1, y1);
    },

    "atirou" : function(status_tiro){
      bool = status_tiro;
    },

     'hud' : {
      'stats' : {
        vida: 10,
        shield: 2,
        kills: 0,
        energy: 100
      },
      'desenhar' : function(stats) {
        ctx_turret.font = "30px Arial";
        ctx_turret.fillStyle="green";
        ctx_turret.fillText("HP: " + this.stats.vida, 30, 35)
        ctx_turret.fillStyle='red';
        ctx_turret.fillText('Kills: '+ this.stats.kills, 350, 35)
        ctx_turret.fillStyle='blue';
        ctx_turret.fillText('SH: ' + this.stats.shield, 30,65)
        ctx_turret.fillStyle='#1244AA';
        ctx_turret.fillText('Energy: ' + this.stats.energy, 350, 570)
        this.passivos();
      },
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

              }, 5000);
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
