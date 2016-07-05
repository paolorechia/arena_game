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
    
    'move' : function (event){
        if (event.key == 'w'){
            turret.y = turret.y + 1;;
            console.log(turret.y);
        }
    },
    'desenhaCanhao' : function (ctx, raio, angulo){
        ctx.save();
        ctx.translate(background.width/2, background.height/2);
        ctx.rotate(angulo);
        ctx.moveTo(0, 0)
        ctx.lineWidth = raio * 0.2;
        ctx.lineTo(raio * 2, 0);
        ctx.stroke();
        ctx.restore();
    },

    'desenha' : function (ctx, raio, angulo){
        ctx.strokeStyle = "#f0470e";
        ctx.beginPath();
        ctx.arc(background.width/2, background.height/2, raio, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fillStyle = "#005252";
        ctx.fill();
        turret.desenhaCanhao(ctx, raio, angulo);
        //Se tem shield, desenha o shield----------
        if(this.hud.stats.shield > 0) {
          ctx.strokeStyle = "#1244AA";
          ctx.beginPath();
          ctx.arc(background.width/2, background.height/2, raio*1.3, 0, 2*Math.PI);
          ctx.stroke();
        }
    },

    'gira' : function (){

        var ca = (background.width/2 - coord.x);
        var co = (background.height/2 - coord.y);

        tangente = (co/ca);
        atan = Math.round(Math.atan(tangente)*100)/100;

        deg = atan * 180/3.14;
        // console.log(deg);
        //Falta tratar quando coord = background.height
        if(coord.x > background.width/2) {
            if(coord.y >= background.height/2) {
    //            console.log('DireitaBaixo');
            } else if(coord.x < background.width/2){
    //            console.log('DireitaCima');
            }
        } else {
            atan+=4*180/3.14;
            if(coord.y >= background.height/2) {
    //            console.log('EsquerdaBaixo');
            } else {
    //           console.log('EsquerdaCima');
            }
        }
        turret.desenha(ctx, turret.raio, atan);
    },

    'atira' : function (){
        // desenha linha usando turret.versor (apenas para ilustrar)
        this.hud.descarregar_energia(1);



    //    console.log("atirei");
        var tam = 14;
        var base = 2;
        var x0 = background.width/2 + turret.versor.x * turret.raio * base;
        var x1 = background.width/2 + turret.versor.x * turret.raio * (tam + base);
        var y0 = background.height/2 + turret.versor.y * turret.raio * base;
        var y1 = background.height/2 +turret.versor.y * turret.raio * (tam + base);
        ctx.beginPath();
        ctx.moveTo(x0,y0);
        ctx.lineWidth=turret.raio*0.2;
        ctx.strokeStyle="#00FF00";
        ctx.lineTo(x1, y1);
        ctx.stroke();
        var i;
        for (i = 0; i< tam; i++){
            turret.vetorLaser[i] = new Laser(0,0);
            turret.vetorLaser[i].x = (x0 + turret.versor.x * turret.raio * i);
            turret.vetorLaser[i].y = (y0 + turret.versor.y * turret.raio * i);
        }
    },

    "atirou" : function(status_tiro){
      //mudar para this
      var cooldown_time = true;
      if(turret.hud.stats.energy == 0) {

      }
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
        ctx.font = "30px Arial";
        ctx.fillStyle="green";
        ctx.fillText("HP: " + this.stats.vida, 30, 35)
        ctx.fillStyle='red';
        ctx.fillText('Kills: '+ this.stats.kills, 350, 35)
        ctx.fillStyle='blue';
        ctx.fillText('SH: ' + this.stats.shield, 30,65)
        ctx.fillStyle='#1244AA';
        ctx.fillText('Energy: ' + this.stats.energy, 350, 570)
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
      prevent_energy : true
    }
}
