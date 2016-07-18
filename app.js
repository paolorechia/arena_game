var background = {
    height : 0,
    width : 0,
}
var height=3000;
var width=5000;

var calc = require('./public/javascripts/turret_server/calculo.js');
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

server.listen(3000, function(){
    console.log('listening on port 3000');
});

var players = [];

io.on('connection', function(socket){
    players[players.length] = socket.id; 
    players.length++;
    console.log(socket.id + " has connected");
    socket.on('direcao', function(dir){
        console.log("recebi direcao: " + dir);
        socket.emit('direcao', (dir));
    });
    socket.on('disconnect', function(){
        players--;
        console.log(socket.id + " has disconnected");
    });
    console.log(players);
});

console.log(background);
var i = 0;
var j = 0;
function atualizaAst(){
    ast.asteroides.atualiza();
    io.sockets.emit('asteroides', ast.asteroides.vetor);
//    console.log("enviando... " + ast.asteroides.vetor);
}
function infinite(){
    i++;
    if (i % 10 == 0){
        if (ast.asteroides.vetor.length < 40){ 
            console.log("criei..." + ast.asteroides.vetor[ast.asteroides.vetor.length - 1]);
            ast.asteroides.cria();
            console.log(ast.asteroides.vetor);
        }
    }
    if (i % 10 == 0){
        atualizaAst();
        io.sockets.emit('message', i);
    }
    setTimeout(infinite, 1);
};
infinite();

// module.exports = app;
