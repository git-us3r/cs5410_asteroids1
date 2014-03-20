var express = require('express'),
	http = require('http'),
	path = require('path'),
	scores = require('./routes/scores'),
	app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(__dirname + 'views'));
app.use('/scripts', express.static(__dirname + '/scripts'));

//development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', function(request, response) {
	response.render('index.html');
});

app.get('/high-scores', scores.all);
app.put('/high-scores', scores.add);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
