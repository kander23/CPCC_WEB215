
/*
 * GET home page.
 */
 
var FlightSchema = require('../schemas/flights');
var PartSchema = require('../schemas/parts');

 
module.exports = function(flights){

	var flight = require('../flight');
	 
	 for (var number in flights){
		flights[number] = flight(flights[number]);
	 }
	 
	 var functions = {};
	 
	 functions.flight = function(req, res){
	   var number = req.param('number');
	   
	   req.session.lastNumber = number;
	   
	   if(typeof flights[number] === "undefined"){
			res.status(404).json({status:"error"});
	   }
	   else{
			res.json(flights[number].getInfo());
	   }

	};

	functions.arrived = function(req, res){
	var number = req.param('number');
	   if(typeof flights[number] === "undefined"){
			res.status(404).json({status:"error"});
	   }
	   else{
			flights[number].triggerArrive();
			
			var record = new FlightSchema(flights[number].getInfo());
			
			record.save(function(err){
				if (err){
					console.log(err);
					res.status(500).json({status: 'failure'});
				}
				else{
					res.json({status: 'success'});
				}
			})
			
			res.json({status: 'done'});
	   }

	};
	
	functions.arrivals = function(req, res){
		FlightSchema.find()
		.setOptions({sort: 'actualArrive'})
		.exec(function(err, arrivals){
			if (err){
				console.log(err);
				res.status(500).json({status: 'failure'});
			}
			else{
				res.render('arrivals', {
					title: "Arrivals",
					arrivals: arrivals,
					lastNumber: req.session.lastNumber
				});
			}
		
		});
	};

	
	 
	functions.list = function(req, res){
		res.render('list', {'title':'All Inventory', flights:flights});
	};
	
	functions.all = function(req, res){
		var db_resp = PartSchema.getParts(res);
		res.json(db_resp);
	};
	
	functions.newpart = function(req, res){
		var req_data = req.body;
		if (req_data && typeof req_data === "object" && (Object.keys(req_data)).length > 0){
			console.log(req_data)
			if ('type' in req_data && 'name' in req_data && 'qty' in req_data){
				PartSchema.savePart(req_data['type'],req_data['name'] ,req_data['qty']);
			}
			else{
				res.json(500, {status: 'error', msg:"invalid parameters"});
		
			}
			res.json({status: 'done'});
		}
		else{
			res.json(500, {status: 'error', msg:"missing parameters"});
		
		}
	};
	
	functions.login = function(req, res){
		res.render('login', {'title':'Log In'});
	};

	functions.showall = function(req, res){
		if (req.session.passport.user === 'undefined'){
			res.redirect('/login');
		}else{
			res.render('showall', {title: 'Welcome!', user:req.user});
		}
		 
	};

	return functions;
}

 
