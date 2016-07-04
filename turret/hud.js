
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
  }
}
