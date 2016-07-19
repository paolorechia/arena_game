var background = {
    height : 0,
    width : 0,
}
var height=3000;
var width=5000;

var calc = require('./public/javascripts/turret_server/calculo.js');
var turret = require ('./public/javascripts/turret_server/turret.js')(height,width, calc);
var ast = require('./public/javascripts/turret_server/asteroides.js')(height,width, calc);
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

var port = process.env.PORT || 3000;

server.listen(port, function(){
    console.log('listening on port ' + port);
});

var players = {length : 0};
io.on('connection', function(socket){
    players[socket.id] = turret.cria();
    players.length++;
    socket.emit('myid', socket.id);
    console.log(socket.id + " has connected");
    socket.on('direcao', function(key){
        console.log("recebi direcao: " + key);
        atualizaDirecao(key, socket.id);
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
function atualizaAsteroides(){
    ast.asteroides.atualiza();
    io.sockets.emit('asteroides', ast.asteroides.vetor);
//    console.log("enviando... " + ast.asteroides.vetor);
}

function atualizaDirecao(key, id){
           var turret = players[id];
//           console.log(turret);
           if (key == 'w'){
                if (turret.versor.y > -1)
                    turret.versor.y = (turret.versor.y - turret.turn_rate);
                turret.vel += turret.acel;
            }
            if (key == 's'){
                if (turret.versor.y < 1)
                    turret.versor.y = (turret.versor.y + turret.turn_rate);
                turret.vel += turret.acel;
            }
            if (key == 'd'){
                if (turret.versor.x < 1)
                {
                    turret.versor.x = (turret.versor.x + turret.turn_rate);
                }
                turret.vel += turret.acel;
            }
            if (key == 'a'){
                if (turret.versor.x > -1){
                    turret.versor.x = (turret.versor.x - turret.turn_rate);
                }
                turret.vel += turret.acel;
            }
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
function enviaTurrets(){
    var players_positions = [];
    var j = 0;
    for (var id in io.sockets.connected){
        players_positions[j] = players[id].pos;
        j++;
    }
    io.sockets.emit('movimento', players_positions);
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
        atualizaAsteroides();
        io.sockets.emit('message', i);
    }

    if (i % 10 == 0){
        atualizaTurrets();
        enviaTurrets();
    }

    setTimeout(infinite, 1);
};
infinite();

// module.exports = app;
