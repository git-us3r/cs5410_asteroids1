
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	user = require('./routes/user'),
	http = require('http'),
	path = require('path'),
	app = express();

// all environments
app.set('port', process.env.PORT || 3000);
// app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Copied from Web Service (cs5410).
app.use('/views', express.static(__dirname + 'views'));
app.use('/scripts', express.static(__dirname + '/scripts'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);
// app.get('/users', user.list);
app.get('/', function(request, response) {
	response.render('index.html');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
