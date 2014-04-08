
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
			if ('TYPE' in req_data && 'NAME' in req_data && 'QTY' in req_data){
				PartSchema.savePart(req_data['TYPE'],req_data['NAME'] ,req_data['QTY'], res);
			}
			else{
				res.json(500, {status: 'error', msg:"invalid parameters"});
		
			}
			
		}
		else{
			res.json(500, {status: 'error', msg:"missing parameters"});
		
		}
	};
	
	functions.login = function(req, res){
		var mode = req.param("mode") || "showall";
		console.log("test outer: "+(typeof mode));
		if (typeof mode === "string"){
			console.log("test: "+mode);
		}
		res.render('login', {'title':'Log In', 'target': mode});
	};

	functions.showall = function(req, res){
		if (req.session.passport.user === 'undefined'){
			res.redirect('/login');
		}else{
			res.render('showall', {title: 'Welcome!', user:req.user});
		}
		 
	};
	
	functions.crud = function(req, res){
		if (req.session.passport.user === 'undefined'){
			res.redirect('/login');
		}else{
			res.render('crud', {title: 'Welcome!', user:req.user});
		}
		 
	};
	
	functions.delete = function(req, res){
		var el_id = req.param('id');
		if (typeof el_id === "string"){
			PartSchema.deletePart(el_id, res);

		}
		else{
			res.json(500, {status: 'error', msg:"missing parameters"});
		}
				 
	};

	return functions;
}

 
