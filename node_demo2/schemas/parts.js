
var mongoose = require('mongoose');

var partSchema = mongoose.Schema({
	qty : Number,
	type: String,
	name: String,
});

var Part = mongoose.model('Inventory', partSchema);


// stack overflow mongoose find

module.exports = {
	getParts : function(res){
		console.log("here");
		var all_records = function(res){
			return function(err,data){
				if (err){
					console.log("error occurred");
					return;
				}
				console.log("query:"+data);
				res.send(data);
			}
		
		
		}
		Part.find({},'type name qty', all_records(res));
	},
	savePart : function(p_type, p_name, p_qty, res){
		var part = new Part({type:p_type,name:p_name,qty:p_qty});
		part.save(function(err,p_part){
			if (err){
				console.log("save failed");
			}
			res.json(p_part);
		});
	
	},
	deletePart : function(p_id, res){
		var deleted_record = function(res){
			return function(err,data){
				if (err){
					console.log("error occurred");
					res.statusCode = 500;
					res.send({result:"error", msg:err});
				}
				res.send({result:"success"});
			}
				
		}
		
		Part.findByIdAndRemove(p_id, deleted_record);
			
	}
}