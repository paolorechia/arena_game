var background = {
    //redesenha o background
    'grava' : function(ctx, width, height){
        var imagem = ctx.getImageData(0,0,width, height);
        return imagem;
    },
    'blit' : function(background){
        ctx.putImageData(background, 0, 0);
    },
    // preenche background com pontos brancos que representam estrelas
    'populaEstrelas' : function(ctx, num){
        var i;
        ctx.fillStyle = "#FFFFFF";
        for (i=0; i<num; i++){
            var x = Math.floor((Math.random() * width) + 1);
            var y = Math.floor((Math.random() * height) + 1);
            ctx.fillRect(x, y, 1, 1);
        }
    },
}
