var background = {
    //redesenha o background
    imagem : 0,
    width : 0,
    height : 0,
    'grava' : function(ctx, width, height){
        this.imagem = ctx.getImageData(0,0,width, height);
    },
    'blit' : function(background){
        ctx.putImageData(background, 0, 0);
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
        background.width = 800;
        background.height = 600;
        // Preenche background com preto
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,0,background.width,background.height);
        // e com estrelas
        background.populaEstrelas(ctx, 200);
        // salva background criado
        background.grava(ctx, background.width, background.height);
    },
}
