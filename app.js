var background = {
    height : 0,
    width : 0,
}
var height=3000;
var width=5000;

var calc = require('./turret_server/calculo.js');
var turret = require ('./turret_server/turret.js')(height,width, calc);
var ast = require('./turret_server/asteroides.js')(height,width, calc);
var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
io.set('transports', ['websocket']);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
app.use('/modules',  express.static( path.join(__dirname, '/node_modules'))); 

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

server.listen(3000, function(){
    console.log('listening on port 3000');
});

var players = {length : 0};
io.on('connection', function(socket){
    players[socket.id] = turret.cria();
    players.length++;
    socket.emit('myid', socket.id);
    console.log(socket.id + " has connected");
    socket.on('direcao', function(key){
        console.log("recebi direcao: " + key);
        turret.atualizaDirecao(key, socket.id, players);
        socket.emit('direcao', (key));
    });
    socket.on('disconnect', function(){
        console.log(socket.id + " has disconnected");
        delete players[socket.id];
        players.length--;
        console.log(players);
        
    });
    socket.on('myid', function(id){
        console.log(players.length);
    });
    console.log(players);
});

console.log(background);
var i = 0;
var j = 0;
function enviaAsteroides(){
    io.sockets.emit('asteroides', ast.asteroides.vetor);
//    console.log("enviando... " + ast.asteroides.vetor);
}

function atualizaTurrets(){
    for (var id in io.sockets.connected){ 
            var turret = players[id];
            //console.log(turret);
            if (turret.vel >= turret.max_speed){
                turret.vel = turret.max_speed;
            }
            if (turret.vel > 0){
                turret.pos.x += turret.versor.x * turret.vel;
                turret.pos.y += turret.versor.y * turret.vel;
            }
            if (turret.vel <= 0){
            //    turret.para();
            }
/*
        socket = io.sockets.connected[player[i].id];
        turret.atualiza(players[i].turret.pos);
*/
    }
}        

// algoritmo horrível, repensar de um jeito mais eficiente
function enviaTurrets(){
    var players_positions = [];
    var players_id = [];
    var aux;
    var j = 0;
    // monta vetor de posicoes
    // e manda a posicao do jogador para ele mesmo 
    for (var id in io.sockets.connected){ 
        players_positions[j] = players[id].pos;
        players_id[j] = id;
        var socket = io.sockets.connected[id];
        socket.emit('movimento', players_positions[j]);
        j++;
    }
    // manda a posicao dos outros jogadores
        io.sockets.emit('players', players_positions);
}
function infinite(){
    i++;
/*
    if (i % 10000 == 0){
        console.log('\033c');
        console.log("----------------------");
        console.log("A thousand thousands ticks tick!");
        console.log(players);
        console.log("----------------------");
    }
*/
    if (i % 10 == 0){
        if (ast.asteroides.vetor.length < 40){ 
//            console.log("criei..." + ast.asteroides.vetor[ast.asteroides.vetor.length - 1]);
            ast.asteroides.cria();
//            console.log(ast.asteroides.vetor);
        }
    }
    if (i % 10 == 0){
        ast.asteroides.atualiza();
        atualizaTurrets();
        io.sockets.emit('message', i);
    }

    if (i % 20 == 0){
        enviaTurrets();
        enviaAsteroides();
    }

    setTimeout(infinite, 1);
};
infinite();

// module.exports = app;
