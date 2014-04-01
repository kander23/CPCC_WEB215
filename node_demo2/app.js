

module.exports = function(flights, db){
	/**
	 * Module dependencies.
	 */

	var express = require('express');
	var MongoStore = require('connect-mongo')(express);
	var passport = require('./auth');
	var routes = require('./routes')(flights);
	var path = require('path');
	
	var app = express();

	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.session({
		secret: 'aabbccrandomstringccddee12345', 
		store : new MongoStore({
			mongoose_connection : db
		})}));
	app.use(express.json());
	app.use(express.urlencoded());
	
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(function(req, res, next){
		res.set('X-Powered-By','Flight Tracker');
		next();
	});
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	app.get('/', routes.login);
	
	app.get('/flight/:number', routes.flight);
	
	app.get('/arrivals', routes.arrivals);

	app.put('/flight/:number/arrived', routes.arrived);

	app.get('/list', routes.list);
	
	app.get('/all', routes.all);
	
	//app.put('/newpart/:type/:name/:qty', routes.newpart);
	app.post('/newpart', routes.newpart);
	
	app.get('/login', routes.login);
	app.post('/login', passport.authenticate('local', {
		failureRedirect: '/login',
		successRedirect: '/showall'
	}));
	
	app.get('/showall', routes.showall);
	
	return app;
	
}

