
//Global, temporariamente
//------Exemplo--------
var hud_stats =  {
  vida: 10,
  shield: 2,
  kills: 0,
  energy: 100
}
//----------------------

function desenhaHud (stats) {
  ctx.font = "30px Arial";
  ctx.fillStyle="green";
  ctx.fillText("HP: " + stats.vida, 30, 35)
  ctx.fillStyle='red';
  ctx.fillText('Kills: '+ stats.kills, 350, 35)
  ctx.fillStyle='blue';
  ctx.fillText('SH: ' + hud_stats.shield, 30,65)
  ctx.fillStyle='#1244AA';
  ctx.fillText('Energy: ' + hud_stats.energy, 350, 570)
}
