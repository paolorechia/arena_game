// objeto camera, contem dimensoes do canvas menor
var camera = {
    width : 0,
    height : 0,
    // seta tamanho do canvas menor
    setRes: function (width, height, canvas){
        //Atua no canvas '#canvas_turret'
        canvas.width = width;
        canvas.height = height;
        //--- Para alterar a resolução mantendo a res. do jogo (buga a mira)
        //$(canvas).css('width', window.innerWidth-3)
        //$(canvas).css('height', window.innerHeight-3)
        //-------------------------
        camera.width = width;
        camera.height = height;
        camera.updateResEvent(canvas);


    },
    updateResEvent: function(canvas) {
      window.addEventListener('resize', function(event) {

        //--- Para alterar a resolução mantendo a res. do jogo (buga a mira)
        //$(canvas).css('width', window.innerWidth-3)
        //$(canvas).css('height', window.innerHeight-3)
        //-------------------------
        
        canvas.width = window.innerWidth-3;
        canvas.height = window.innerHeight-3;
        camera.width = window.innerWidth-3;
        camera.height =  window.innerHeight-3;

      });
    }
}

// objeto background, contem informacoes do canvas maior
var background = {
    // declaracao de variaveis internas
    imagem : new Image(),
    imagem2 : 0,
    width : 0,
    height : 0,
    // funcoes
    // grava -> recebe um canvas, gera uma imagem .png e salva o link
    // em background.imagem.src
    'grava' : function(ctx, width, height){
        background.imagem.src = ctx.canvas.toDataURL("image/png");
    },
    // blit -> redesenha o background no canvas menor (camera)
    // nao eh necessaria no momento
    'blit' : function(background){
        ctx_turret.drawImage(background, 0, 0);
    },
    // blit_turret -> 1. corta o background gigantesco na posicao certa;
    // 2. desenha ele na tela
    'blit_turret' : function(){
        ctx_turret.drawImage(background.imagem, turret.x - camera.width/2, turret.y - camera.height/2, camera.width, camera.height,0, 0, camera.width, camera.height);
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
    'desenhaBorda' : function(ctx, camera){
        ctx.strokeStyle = "#00002F";
        ctx.lineWidth = 800;
        var largura = ctx.lineWidth/2;
        ctx.rect(camera.width/2 - largura, camera.height/2 - largura, background.width - camera.width + ctx.lineWidth, background.height - camera.height + ctx.lineWidth);
        ctx.stroke();
    },
    // inicializa as variaveis internas ao background
    inicia: function (ctx, canvas){
        background.width = canvas.width;
        background.height = canvas.height;
        // Preenche background com preto
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,0,background.width,background.height);
        // e com estrelas
        background.populaEstrelas(ctx, background.width/4);
        // salva background criado
        background.desenhaBorda(ctx, camera);
        background.grava(ctx, background.width, background.height);
    },
}
