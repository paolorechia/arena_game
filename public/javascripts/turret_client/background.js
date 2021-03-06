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
        ctx_ship.drawImage(module, 0, 0);
    };

    // preenche module com pontos brancos que representam estrelas
    populaEstrelas = function(ctx, num){
        var i;
        for (i=0; i<num; i++){
            var color1 = Math.floor(Math.random() * 254 + 1);
            var color2 = Math.floor(Math.random() * 254 + 1);
            var color3 = Math.floor(Math.random() * 254 + 1);
            var alpha = 0.1;
            var x = Math.floor((Math.random() * module.width) + 1);
            var y = Math.floor((Math.random() * module.height) + 1);
            var width = Math.floor(Math.random() * 2 + 1);

            ctx.beginPath();
            ctx.fillStyle = "rgba(" + color1 + "," + color2 + "," + color3 + "," + alpha+ ")";
            ctx.arc(x, y, width * 5, 0, 2*Math.PI);

            ctx.fill();


            ctx.beginPath();
            ctx.fillStyle = "rgba(" + color1 + "," + color2 + "," + color3 + "," + alpha * 2+ ")";
            ctx.arc(x, y, width * 3, 0, 2*Math.PI);

            ctx.fill();

            ctx.beginPath(); 
            ctx.fillStyle = "rgba(" + color1 + "," + color2 + "," + color3 + +"," + 1 + ")";
            ctx.arc(x, y, width/2, 0, 2*Math.PI);
            ctx.fill();
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
