function desenhaCanhao(ctx, raio, angulo){
    ctx.save();
    ctx.translate(width/2, height/2);
    ctx.rotate(angulo);
    ctx.moveTo(0, 0)
    ctx.lineWidth = raio * 0.2;
    ctx.lineTo(raio * 2, 0);
    ctx.stroke();
    ctx.restore();

}

// desenha o circulo e o canhao
function desenhaTurret(ctx, raio, angulo){
    ctx.strokeStyle = "#f0470e";
    ctx.beginPath();
    ctx.arc(width/2, height/2, raio, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = "#005252";
    ctx.fill();
    desenhaCanhao(ctx, raio, angulo);
    //Se tem shield, desenha o shield----------
    if(hud_stats.shield > 0) {
      ctx.strokeStyle = "#1244AA";
      ctx.beginPath();
      ctx.arc(width/2, height/2, raio*1.3, 0, 2*Math.PI);
      ctx.stroke();

    }
    //------------------------------------------


}
function giraCanhao(){

    var ca = (width/2 - coord.x);
    var co = (height/2 - coord.y);

    tangente = (co/ca);
    atan = Math.round(Math.atan(tangente)*100)/100;

    deg = atan * 180/3.14;
    // console.log(deg);
    //Falta tratar quando coord = height
    if(coord.x > width/2) {
        if(coord.y >= height/2) {
//            console.log('DireitaBaixo');
        } else if(coord.x < width/2){
//            console.log('DireitaCima');
        }
    } else {
        atan+=4*180/3.14;
        if(coord.y >= height/2) {
//            console.log('EsquerdaBaixo');
        } else {
//           console.log('EsquerdaCima');
        }
    }
    desenhaTurret(ctx, raio, atan);
}
function atiraCanhao(){ 
    // desenha linha usando versor (apenas para ilustrar) 
 
//    console.log("atirei"); 
    var tam = 14; 
    var base = 2; 
    var x0 = width/2 + versor.x * raio * base; 
    var x1 = width/2 + versor.x * raio * (tam + base); 
    var y0 = height/2 + versor.y * raio * base; 
    var y1 = height/2 +versor.y * raio * (tam + base); 
    ctx.beginPath(); 
    ctx.moveTo(x0,y0); 
    ctx.lineWidth=raio*0.2; 
    ctx.strokeStyle="#00FF00"; 
    ctx.lineTo(x1, y1); 
    ctx.stroke(); 
    var i; 
    for (i = 0; i< tam; i++){ 
        vetorLaser[i] = new laser(0,0); 
        vetorLaser[i].x = (x0 + versor.x * raio * i); 
        vetorLaser[i].y = (y0 + versor.y * raio * i); 
    } 
} 

