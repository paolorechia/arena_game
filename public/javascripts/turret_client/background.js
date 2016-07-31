module.exports = function(camera){
    var module = {};
    
    // objeto module, contem informacoes do canvas maior
    // declaracao de variaveis internas
    module.imagem = new Image();
    imagem2 = 0;
    width = 0;
    height = 0;
    // funcoes
    // grava -> recebe um canvas, gera uma imagem .png e salva o link
    // em module.imagem.src
    grava = function(ctx, width, height){
        module.imagem.src = ctx.canvas.toDataURL("image/png");
    };
    // blit -> redesenha o module no canvas menor (camera)
    // nao eh necessaria no momento
    blit = function(module){
        ctx_turret.drawImage(module, 0, 0);
    };

    // preenche module com pontos brancos que representam estrelas
    populaEstrelas = function(ctx, num){
        var i;
        ctx.fillStyle = "#FFFFFF";
        for (i=0; i<num; i++){
            var x = Math.floor((Math.random() * module.width) + 1);
            var y = Math.floor((Math.random() * module.height) + 1);
            var width = Math.floor(Math.random() * 3 + 1);
            ctx.fillRect(x, y, width, width);
        }
    };
    desenhaBorda = function(ctx, camera){
        ctx.beginPath();
        ctx.strokeStyle = "#00002F";
        ctx.lineWidth = 800;
        var largura = ctx.lineWidth/2;
        ctx.rect(camera.width/2 - largura, camera.height/2 - largura, module.width - camera.width + ctx.lineWidth, module.height - camera.height + ctx.lineWidth);
        ctx.stroke();
    };
    // inicializa as variaveis internas ao module
    module.inicia = function (ctx, canvas){
        module.width = canvas.width;
        module.height = canvas.height;
        // Preenche module com preto
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,0,module.width,module.height);
        // e com estrelas
        populaEstrelas(ctx, module.width/4);
// salva module criado
        desenhaBorda(ctx, camera);
        grava(ctx, module.width, module.height);
    };    
    return module;
}
