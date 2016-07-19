// turret.versor do canhao
// pseudo-classe
function Laser(x, y){
    this.x;
    this.y;
}


var turret = {
    // declaracao/incializacao de variaveis
    versor : new Versor(),
    vetorLaser : [],
    raio : 15,
    vel : 0,
    acel: 4,
    turn_rate: 1,
    max_speed : 4,
    vx : 0,
    vy : 0,
    x : 0,
    y : 0,
    // inicializa posicao do turret
    'inicia' : function(){
        turret.x = background.width/2;
        turret.y = background.height/2;
     },
    
    // pega o evento de teclado, confere qual eh, atualiza o versor do turret
    // e incrementa velocidade
    'atualizaDirecao' : function (event){
        if (event.key == 'w'){
            socket.emit('direcao', 'w');
        }
        if (event.key == 's'){
            socket.emit('direcao', 's');
        }
        if (event.key == 'd'){
            socket.emit('direcao', 'd');
        }
        if (event.key == 'a'){
            socket.emit('direcao', 'a');
        }
    },
    // sempre executada no loop principal, move turret na direcao atual 
    'move' : function(x, y){
            turret.x = x;
            turret.y = y;
    },
    // desenha o canhao (APENAS o canhao, o risco da onde sai o laser)
    'desenhaCanhao' : function (ctx, raio, angulo){
        var x = camera.width/2;
        var y = camera.height/2;
        // salva contexto (necessario em funcao da translacao)
        ctx.save();
        // desloca origem para as coordendas (x,y)
        ctx.translate(x, y);
        // rotaciona a imagem de acordo o angulo
        ctx.rotate(angulo);
        // move para a origem (que agora eh (x, y))
        ctx.moveTo(0, 0)
        ctx.lineWidth = raio * 0.2;
        ctx.lineTo(raio * 2, 0);
        ctx.stroke();
        // restaura contexto
        ctx.restore();
    },

    // desenha o corpo do turret e chama a funcao desenhaCanhao
    'desenha' : function (ctx, raio, angulo){
        var x = camera.width/2;
        var y = camera.height/2;
        ctx.strokeStyle = "#f0470e";
        ctx.beginPath();
        ctx.arc(x, y, raio, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fillStyle = "#005252";
        ctx.fill();
        turret.desenhaCanhao(ctx, raio, angulo);
        //Se tem shield, desenha o shield----------
        if(this.hud.stats.shield > 0) {
          ctx.strokeStyle = "#1244AA";
          ctx.beginPath();
          ctx.arc(x, y, raio*1.3, 0, 2*Math.PI);
          ctx.stroke();
        }
    },

    // atualiza o angulo utilizando trigonometria
    // a partir das coordenadas do cursor do mouse
    // e chama a função de desenhar o turret
    'gira' : function (){

        var ca = (turret.x - coord.x);
        var co = (turret.y - coord.y);

        tangente = (co/ca);
        atan = Math.round(Math.atan(tangente)*100)/100;

        deg = atan * 180/3.14;
        // console.log(deg);
        //Falta tratar quando coord = background.height
        if(coord.x > turret.x) {
            if(coord.y >= turret.y) {
    //            console.log('DireitaBaixo');
            } else if(coord.x < turret.x){
    //            console.log('DireitaCima');
            }
        } else {
            atan+=4*180/3.14;
            if(coord.y >= turret.y) {
    //            console.log('EsquerdaBaixo');
            } else {
    //           console.log('EsquerdaCima');
            }
        }
        turret.desenha(ctx_turret, turret.raio, atan);
    },
    // desenha laser (uma linha)
    'desenhaLaser' : function(x0, y0, x1, y1){
        ctx_turret.beginPath();
        // move para inicio da linha
        ctx_turret.moveTo(x0,y0);
        // seta largura da linha
        ctx_turret.lineWidth=turret.raio*0.2;
        // cor
        ctx_turret.strokeStyle="#00FF00";
        // coordenada destino
        ctx_turret.lineTo(x1, y1);
        // desenha
        ctx_turret.stroke();
    },
    //atira o laser se a energia eh maior do que 0
    'atira' : function (){

        // confere se a energia eh adequada
        // e se nao estah em tempo de recarga
        if(this.hud.stats.energy <= 1) {
          this.hud.cooldown_time = true;
          bool = 0;
        }

        if(this.hud.stats.energy >= 20 && this.hud.cooldown_time ==true) {
          this.hud.cooldown_time = false;
        }

        if (this.hud.cooldown_time) {
          return;
        }

        this.hud.descarregar_energia(1);

        if(bool == 0)
          return;

        // se tudo estiver ok, atira
        var tam = 14;
        var base = 2;
        var x0 = turret.x + turret.versor.x * turret.raio * base;
        var x1 = turret.x + turret.versor.x * turret.raio * (tam + base);
        var y0 = turret.y + turret.versor.y * turret.raio * base;
        var y1 = turret.y + turret.versor.y * turret.raio * (tam + base);
        var i;
        // cria um vetor de coordenadas para testar nas colisoes
        for (i = 0; i< tam; i++){
            turret.vetorLaser[i] = new Laser(0,0);
            turret.vetorLaser[i].x = (x0 + turret.versor.x * turret.raio * i);
            turret.vetorLaser[i].y = (y0 + turret.versor.y * turret.raio * i);
        }
        // e passa coordenadas adaptadas pro canvas menor pra funcao de desenhar
        var x = camera.width/2;
        var y = camera.height/2;
        x0 = x + turret.versor.x * turret.raio * base;
        x1 = x + turret.versor.x * turret.raio * (tam + base);
        y0 = y + turret.versor.y * turret.raio * base;
        y1 = y + turret.versor.y * turret.raio * (tam + base);
        turret.desenhaLaser(x0, y0, x1, y1);
    },

    // atualiza status do tiro de acordo com o evento de mouse
    "atirou" : function(status_tiro){
      bool = status_tiro;
    },

    // hud
     'hud' : {
      // stats deveria estar em outro lugar...
      'stats' : {
        vida: 10,
        shield: 2,
        kills: 0,
        energy: 100
      },
      // desenha os stats na tela
      'desenhar' : function(stats) {
        ctx_turret.font = "30px Arial";
        ctx_turret.fillStyle="green";
        ctx_turret.fillText("HP: " + this.stats.vida, camera.width/22, camera.height/18)
        ctx_turret.fillStyle='red';
        ctx_turret.fillText('Kills: '+ this.stats.kills, camera.width/2.2, camera.height/18)
        ctx_turret.fillStyle='blue';
        ctx_turret.fillText('SH: ' + this.stats.shield, camera.width/22, camera.height/9)
        ctx_turret.fillStyle='#1244AA';
        ctx_turret.fillText('Energy: ' + this.stats.energy, camera.width/2.3, camera.height/1.05)
        this.passivos();
      },
      // funcoes abaixo nao sei como funcionam, nao li ainda
      // mas parece que deveriam fazer parte do turret e nao do hud
      carregar_energia : function(rate) {
        var min_energy = 0;
        var max_energy = 100;
        var that = this;
        if(that.stats.energy >= min_energy && that.stats.energy < max_energy) {
            if(that.prevent_energy == true) {
              that.prevent_energy = false;
              //setTimeout workaround

              window.setTimeout(function(){
                that.stats.energy+=1*rate;
                that.prevent_energy = true;
              }, 100);
            }
        }

      },
      descarregar_energia : function(rate) {
        var max_energy = 100;
        var min_energy = 0;
        if(this.stats.energy > min_energy) {
          this.stats.energy -= 1*rate;
        } else {
            //bloqueia Laser até chegar em x% energia.

        }
      },
      carregar_shield : function(rate){
        var max_shield = 2;
        var min_shield = 0;
        var that = this;

        if(that.stats.shield >= min_shield && that.stats.shield < max_shield) {
            if(that.prevent_shield == true) {
              that.prevent_shield = false;

              window.setTimeout(function(){
                that.stats.shield+=1*rate;
                that.prevent_shield = true;

              },5000);
            }
        }
      },
      descarregar_shield : function(quantidade) {
        var max_shield = 3;
        var min_shield = 0;
        if(this.stats.shield <= max_shield && this.stats.shield > min_shield) {
          this.stats.shield -= quantidade;
        }

      },
      descarregar_vida : function(quantidade){
        this.stats.vida -= quantidade;
      },
      tomar_dano : function(quantidade) {
        if(quantidade <= this.stats.shield) {
          this.descarregar_shield(quantidade);
        } else {
          this.descarregar_vida(quantidade - this.stats.shield);
          this.descarregar_shield(this.stats.shield);
        }
      },
      passivos : function() {

        this.carregar_shield(1);
        this.carregar_energia(1);

      },
      prevent_shield : true,
      prevent_energy : true,
      cooldown_time : false
    }
}
