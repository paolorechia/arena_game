// estrutura
// 800x600
// matriz 80x60 - quadrados de 10x10 pixels

var array = [];       

var i;
for (i = 0; i < 80; i++){
        array[i] = [];
}

// canvas
var c = document.getElementById("canvas_turret");
var ctx = c.getContext("2d");
console.log("wtf");
ctx.fillStyle = "#000000";
ctx.fillRect(0,0,800,600);

