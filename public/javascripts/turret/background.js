var background = {
    //redesenha o background
    imagem : new Image(), 
    imagem2 : 0,
    width : 5000,
    height : 3000 ,
    resx : 800,
    resy: 600,
    'grava' : function(ctx, width, height){
        background.imagem.src = ctx.canvas.toDataURL("image/png");
    },
    'blit' : function(background){
        ctx_turret.drawImage(background, 0, 0);
    },
    'blit_turret' : function(){
        ctx_turret.drawImage(background.imagem, turret.x-400, turret.y - 300, 800, 600,0, 0, 800, 600);
    },
    // preenche background com pontos brancos que representam estrelas
    'populaEstrelas' : function(ctx, num){
        var i;
        ctx.fillStyle = "#FFFFFF";
        for (i=0; i<num; i++){
            var x = Math.floor((Math.random() * background.width) + 1);
            var y = Math.floor((Math.random() * background.height) + 1);
            ctx.fillRect(x, y, 1, 1);
        }
    },
    inicia : function(ctx){
        // Preenche background com preto
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,0,background.width,background.height);
        // e com estrelas
        background.populaEstrelas(ctx, 800);
        // salva background criado
        background.grava(ctx, background.width, background.height);
    },
}
