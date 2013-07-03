
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , routes = require('./routes')
  , api = require('./routes/api')
  , path = require('path');

var app = express()
  , server = http.Server(app)
  , io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/api/takeoff', api.takeoff);
app.get('/api/land', api.land);
app.get('/api/stop', api.stop);
app.get('/api/frontCam', api.frontCam);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

require('./lib/control')(io);