# Space Arena - v0.1.0

## 1. Iniciando registro de versões por branch.
## 2. Funcionalidades implementadas até o momento:

### I) Servidor em node.js + socket.io.

a)      Asteroides circulares.

b)      Naves circulares, um único tipo.
        b.1)    Armas de apenas um tipo de dano.
                b.1.1)  Laser: vetor de pontos, dano contínuo ao longo do tempo.
                b.1.2)  Blaster: ponto em movimento, dano único ao contato.
        b.2)    Escudo simples, regeneração constante.
        b.3)    Casco simples, sem regeneração. 
        b.4)    Movimento simples, sem rotação e aceleração.
    
c)      Colisões por distância geométrica.
        c.1)    Estado de disparos/tiros são atualizados de acordo com a colisão.
        c.2)    Contato com asteróides reduz velocidade e inflinge dano no jogador.
        c.3)    Disparos de inimigos infligem dano no jogador.

d)      Troca de informações com clientes por websocket.

e)      Estado do jogo em cálculo constante, não há hibernação quando o servidor está vazio.

f)      Sessão única, todos os jogadores participam da mesma sala.

g)      Inicialização simples do jogo, sem interface de configuração.
        g.1)    Tamanho do mapa.
        g.2)    Número de asteróides.

h)      Único mapa.
        h1)     Morte provoca respawn em 3s.
        

### II) Cliente portado para CommonJS

a)      Input recebido por eventos. Código cru, sem abstrações.
        a.1)    Movimento por AWSD.
        a.2)    Mira por movimento do mouse.
        a.3)    Disparo por manter botão 1 do mouse pressionado.
        a.4)    Troca de arma no espaço.

b)      Desenhos. Muitos desenhos. Consiste no principal papel do cliente. A vasta maioria das informações vem do servidor.
        b.1)    Asteroides simples, sem textura.
        b.2)    Naves simples, sem textura.
                b.2.1)  Escudo com efeito de desenho, tamanho proporcional à quantidade de pontos restantes.
                b.2.2)  Canhão desenhado por uma simples linha.
        b.3)    Inimigos simples, sem textura.
                b.3.1)  Sem demonstração de escudo.
                b.3.2)  Canhão atualizado de acordo com o servidor, desenhado por uma simples linha.
        b.4)    Disparos
                b.4.1)  Laser
                        b.4.1.1) Pequeno efeito gráfico, desenho de 2 linhas, uma mais escura e outra mais clara.
                        b.4.1.2) Ao colidir, desenha-se um círculo na posição.
                b.4.2)  Blaster
                        b.4.2.1) Efeito gráfico de sombra, também desenham-se 2 linhas.
                        b.4.2.2) Colisão provoca desenho de círculo e linhas aleatórias. 
        b.5)    Background
                b.5.1)  Bordas desenhadas supondo resolução 1600x900. Desenhadas no lugar errado para outras resoluções.
                b.5.2)  Background preto, populado com estrelas.
                        b.5.2.1)    Estrelas
                                    b.5.2.1.1) Cor aleatória
                                    b.5.2.1.2) Efeito gráfico de vários círculos com transparência para dar sensação de iluminação.
--------------------------
Sat Aug 6 11:46:43 BRT 2016
