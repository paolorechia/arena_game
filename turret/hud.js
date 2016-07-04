
//Global, temporariamente
//------Exemplo--------


var hud = {
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
    if(this.stats.energy >= min_energy && this.stats.energy < max_energy) {
        if(hud.prevent_energy == true) {
          hud.prevent_energy = false;
          window.setTimeout(function(){
            hud.stats.energy+=1*rate;
            hud.prevent_energy = true;
          }, 100);
        }
    }

  },
  descarregar_energia : function(rate) {
    var max_energy = 100;
    var min_energy = 0;
    if(this.stats.energy >= min_energy) {
      this.stats.energy -= 1*rate;
    } else {
        //bloqueia laser até chegar em x% energia.

    }
  },
  carregar_shield : function(rate){
    var max_shield = 2;
    var min_shield = 0;
    if(this.stats.shield >= min_shield && this.stats.shield < max_shield) {
        if(hud.prevent_shield == true) {
          hud.prevent_shield = false;
          window.setTimeout(function(){
            hud.stats.shield+=1*rate;
            hud.prevent_shield = true;

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
    console.log('DANO');
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
